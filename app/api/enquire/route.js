import nodemailer from 'nodemailer';

export const runtime = 'nodejs';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

const ALLOWED_ORIGINS = new Set([
  'https://3mcarcarestudios.in',
  'https://www.3mcarcarestudios.in'
]);

const corsHeaders = (origin) => {
  const allow = ALLOWED_ORIGINS.has(origin) ? origin : 'https://3mcarcarestudios.in';
  return {
    'Access-Control-Allow-Origin': allow,
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Accept',
    'Access-Control-Max-Age': '86400',
    Vary: 'Origin'
  };
};

const json = (origin, body, status = 200) =>
  Response.json(body, { status, headers: corsHeaders(origin) });

export async function OPTIONS(req) {
  return new Response(null, { status: 204, headers: corsHeaders(req.headers.get('origin')) });
}

const esc = (s = '') =>
  String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));

export async function POST(req) {
  const origin = req.headers.get('origin');
  let body;
  try {
    body = await req.json();
  } catch {
    return json(origin, { error: 'Invalid request body.' }, 400);
  }

  const name = (body.name || '').trim();
  const phone = (body.phone || '').trim();
  const email = (body.email || '').trim();
  const service = (body.service || '').trim();
  const message = (body.message || '').trim();

  if (!name) return json(origin, { error: 'Name is required.' }, 400);
  if (!PHONE_RE.test(phone)) return json(origin, { error: 'Invalid phone number.' }, 400);
  if (!EMAIL_RE.test(email)) return json(origin, { error: 'Invalid email address.' }, 400);
  if (!service) return json(origin, { error: 'Service is required.' }, 400);
  if (message.length > 2000) return json(origin, { error: 'Message too long.' }, 400);

  const {
    SMTP_HOST = 'smtp.hostinger.com',
    SMTP_PORT = '465',
    SMTP_USER,
    SMTP_PASS,
    MAIL_TO,
    MAIL_FROM,
    ENQUIRE_AUTO_REPLY,
    NODE_ENV
  } = process.env;

  // Auto-reply control: explicit env wins, otherwise on in production, off in dev.
  // This stops test submissions from bouncing back to the studio inbox.
  const autoReplyEnabled =
    ENQUIRE_AUTO_REPLY === 'true' ? true :
    ENQUIRE_AUTO_REPLY === 'false' ? false :
    NODE_ENV === 'production';
  if (!SMTP_USER || !SMTP_PASS) {
    console.error('[enquire] Missing SMTP_USER or SMTP_PASS environment variables.');
    return json(origin, { error: 'Mail service is not configured.' }, 500);
  }

  const port = Number(SMTP_PORT);
  const transporter = nodemailer.createTransport({
  host: SMTP_HOST,
  port,
  secure: port === 465,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS
  }
});

try {
  await transporter.verify();

  console.log(
    "SMTP connected successfully"
  );

} catch (err) {

  console.error(
    "SMTP CONNECTION FAILED:"
  );

  console.error({
    code: err.code,
    command: err.command,
    response: err.response,
    message: err.message
  });

  return json(origin, { error: 'SMTP connection failed' }, 500);
}

  const recipient = MAIL_TO || SMTP_USER;
  const from =SMTP_USER;

  const text = `New enquiry from 3M Car Care website

Name:    ${name}
Phone:   ${phone}
Email:   ${email}
Service: ${service}

Message:
${message || '(none)'}
`;

  const html = `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;margin:0">
  <table cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden">
    <tr><td style="background:#e4002b;color:#fff;padding:18px 24px;font-size:14px;letter-spacing:.2em;text-transform:uppercase">New Enquiry</td></tr>
    <tr><td style="padding:24px;color:#222;font-size:14px;line-height:1.6">
      <p style="margin:0 0 16px;font-size:16px"><strong>${esc(name)}</strong> has sent an enquiry from the website.</p>
      <table cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse">
        <tr><td style="color:#666;width:90px">Phone</td><td><a href="tel:+91${esc(phone)}" style="color:#e4002b;text-decoration:none">+91 ${esc(phone)}</a></td></tr>
        <tr><td style="color:#666">Email</td><td><a href="mailto:${esc(email)}" style="color:#e4002b;text-decoration:none">${esc(email)}</a></td></tr>
        <tr><td style="color:#666">Service</td><td>${esc(service)}</td></tr>
        <tr><td style="color:#666;vertical-align:top">Message</td><td style="white-space:pre-wrap">${esc(message) || '<em style="color:#999">(none)</em>'}</td></tr>
      </table>
    </td></tr>
    <tr><td style="background:#fafafa;padding:14px 24px;color:#888;font-size:12px;border-top:1px solid #eee">Sent automatically from the 3M Car Care website enquiry form.</td></tr>
  </table>
</body></html>`;

  try {
    await transporter.sendMail({
      from,
      to: recipient,
      replyTo: email,
      subject: `Enquiry — ${service} — ${name}`,
      text,
      html
    });
  } catch (err) {
    console.error('[enquire] sendMail failed:', err);
    return json(origin, { error: 'Could not send your enquiry. Please try again or call us.' }, 502);
  }

  const replyText = `Hi ${name},

Thanks for reaching out to 3M Car Care Studio. We've received your enquiry about ${service} and our team will get back to you within one business day.

For anything urgent, you can reach us directly:

  Phone     +91 91672 53584 / +91 88928 88336
  WhatsApp  https://wa.me/919167253584
  Studio    Kanakapura Road, Bengaluru

Here's a copy of what you sent:

  Service   ${service}
  Phone     +91 ${phone}
  Message   ${message || '(none)'}

— 3M Car Care Studio
  ${recipient}
`;

  const replyHtml = `<!doctype html><html><body style="font-family:Arial,sans-serif;background:#f5f5f5;padding:24px;margin:0">
  <table cellpadding="0" cellspacing="0" width="100%" style="max-width:560px;margin:0 auto;background:#fff;border-radius:8px;overflow:hidden">
    <tr><td style="background:#08080a;padding:22px 24px">
      <div style="color:#e4002b;font-size:11px;letter-spacing:.32em;text-transform:uppercase;font-weight:600">3M Car Care Studio</div>
      <div style="color:#fff;font-size:22px;margin-top:6px;font-weight:500">Thanks, ${esc(name)} — we got your enquiry.</div>
    </td></tr>
    <tr><td style="padding:24px;color:#222;font-size:14px;line-height:1.65">
      <p style="margin:0 0 14px">Our team will get back to you within <strong>one business day</strong>. We're already reviewing what you sent and will reach out with the next steps.</p>
      <p style="margin:0 0 18px;color:#666">If anything is urgent, you can reach us directly using the details below.</p>

      <table cellpadding="8" cellspacing="0" style="width:100%;border-collapse:collapse;background:#fafafa;border-radius:6px">
        <tr><td style="color:#666;width:90px;border-bottom:1px solid #eee">Phone</td><td style="border-bottom:1px solid #eee"><a href="tel:+919167253584" style="color:#e4002b;text-decoration:none">+91 91672 53584</a> &nbsp;·&nbsp; <a href="tel:+918892888336" style="color:#e4002b;text-decoration:none">+91 88928 88336</a></td></tr>
        <tr><td style="color:#666;border-bottom:1px solid #eee">WhatsApp</td><td style="border-bottom:1px solid #eee"><a href="https://wa.me/919167253584" style="color:#e4002b;text-decoration:none">Chat on WhatsApp</a></td></tr>
        <tr><td style="color:#666">Studio</td><td>Kanakapura Road, Bengaluru</td></tr>
      </table>

      <p style="margin:22px 0 8px;color:#888;font-size:12px;letter-spacing:.16em;text-transform:uppercase">Your enquiry</p>
      <table cellpadding="6" cellspacing="0" style="width:100%;border-collapse:collapse;font-size:13px">
        <tr><td style="color:#666;width:90px;vertical-align:top">Service</td><td>${esc(service)}</td></tr>
        <tr><td style="color:#666;vertical-align:top">Phone</td><td>+91 ${esc(phone)}</td></tr>
        <tr><td style="color:#666;vertical-align:top">Message</td><td style="white-space:pre-wrap">${esc(message) || '<em style="color:#999">(none)</em>'}</td></tr>
      </table>
    </td></tr>
    <tr><td style="background:#08080a;padding:14px 24px;color:#888;font-size:12px;text-align:center">
      3M Car Care Studio · Kanakapura Road · Bengaluru<br/>
      You're receiving this because you submitted an enquiry on our website.
    </td></tr>
  </table>
</body></html>`;

  // Non-blocking — if the auto-reply fails, the studio notification has already
  // gone through, so we don't want to surface an error to the user.
  if (autoReplyEnabled) {
    try {
      await transporter.sendMail({
        from,
        to: email,
        replyTo: recipient,
        subject: 'We received your enquiry — 3M Car Care Studio',
        text: replyText,
        html: replyHtml
      });
    } catch (err) {
      console.error('[enquire] auto-reply failed (non-fatal):', err);
    }
  } else {
    console.log(`[enquire] auto-reply skipped for ${email} (ENQUIRE_AUTO_REPLY disabled)`);
  }

  return json(origin, { ok: true });
}
