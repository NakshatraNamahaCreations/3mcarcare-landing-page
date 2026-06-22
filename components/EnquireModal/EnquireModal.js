'use client';
import { useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { useRouter } from 'next/navigation';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './EnquireModal.module.css';

const SERVICES = [
  '3M Paint Protection Film (PPF)',
  '3M Sun Control Film',
  '3M Graphene Coating',
  '3M Ceramic Coating',
  '3M Interior GermKleen Treatment',
  '3M Anti-Corrosion Treatment',
  '3M Car Wraps & Custom Styling',
  '3M Nomad Floor Mats'
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const PHONE_RE = /^[6-9]\d{9}$/;

function ServiceSelect({ value, options, onChange, onBlur, error, placeholder = 'Choose a service' }) {
  const [open, setOpen] = useState(false);
  const [activeIdx, setActiveIdx] = useState(-1);
  const [placement, setPlacement] = useState({ direction: 'down', maxHeight: 260 });
  const wrap = useRef(null);
  const triggerRef = useRef(null);
  const listRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e) => {
      if (!wrap.current?.contains(e.target)) {
        setOpen(false);
        onBlur?.();
      }
    };
    document.addEventListener('mousedown', onDoc);
    return () => document.removeEventListener('mousedown', onDoc);
  }, [open, onBlur]);

  useEffect(() => {
    if (!open) return;
    setActiveIdx(Math.max(0, options.indexOf(value)));
  }, [open, options, value]);

  // Auto-flip: measure available space and pick the side with more room.
  useEffect(() => {
    if (!open || !triggerRef.current) return;
    const compute = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const margin = 12;
      const vh = window.innerHeight;
      const spaceBelow = vh - rect.bottom - margin;
      const spaceAbove = rect.top - margin;
      const desired = 260;
      if (spaceBelow >= desired || spaceBelow >= spaceAbove) {
        setPlacement({ direction: 'down', maxHeight: Math.min(desired, Math.max(140, spaceBelow)) });
      } else {
        setPlacement({ direction: 'up', maxHeight: Math.min(desired, Math.max(140, spaceAbove)) });
      }
    };
    compute();
    window.addEventListener('resize', compute);
    return () => window.removeEventListener('resize', compute);
  }, [open]);

  const choose = (v) => {
    onChange(v);
    setOpen(false);
  };

  const onKey = (e) => {
    if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
      if (!open) { e.preventDefault(); setOpen(true); return; }
    }
    if (!open) return;
    if (e.key === 'Escape') { e.preventDefault(); setOpen(false); }
    else if (e.key === 'ArrowDown') { e.preventDefault(); setActiveIdx((i) => Math.min(options.length - 1, i + 1)); }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setActiveIdx((i) => Math.max(0, i - 1)); }
    else if (e.key === 'Enter') { e.preventDefault(); if (options[activeIdx]) choose(options[activeIdx]); }
    else if (e.key === 'Tab') { setOpen(false); onBlur?.(); }
  };

  return (
    <div ref={wrap} className={styles.selectWrap}>
      <button
        ref={triggerRef}
        type="button"
        className={`${styles.selectTrigger} ${!value ? styles.placeholder : ''} ${error ? styles.invalid : ''}`.trim()}
        onClick={() => setOpen((o) => !o)}
        onKeyDown={onKey}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-invalid={!!error}
      >
        <span className={styles.selectValue}>{value || placeholder}</span>
        <span className={`${styles.caret} ${open ? styles.caretOpen : ''}`} aria-hidden="true" />
      </button>
      {open && (
        <ul
          ref={listRef}
          role="listbox"
          className={`${styles.selectMenu} ${placement.direction === 'up' ? styles.selectMenuUp : ''}`.trim()}
          style={{ maxHeight: `${placement.maxHeight}px` }}
        >
          {options.map((opt, i) => (
            <li
              key={opt}
              role="option"
              aria-selected={value === opt}
              className={`${styles.selectOption} ${i === activeIdx ? styles.selectOptionActive : ''} ${value === opt ? styles.selectOptionSelected : ''}`.trim()}
              onMouseEnter={() => setActiveIdx(i)}
              onMouseDown={(e) => { e.preventDefault(); choose(opt); }}
            >
              {opt}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

const validate = (form) => {
  const errs = {};
  if (!form.name.trim()) errs.name = 'Please enter your name.';
  if (!form.phone) errs.phone = 'Phone number is required.';
  else if (!PHONE_RE.test(form.phone)) errs.phone = 'Enter a valid 10-digit mobile number.';
  if (!form.email.trim()) errs.email = 'Email is required.';
  else if (!EMAIL_RE.test(form.email.trim())) errs.email = 'Enter a valid email address.';
  if (!form.service) errs.service = 'Please choose a service.';
  return errs;
};

export default function EnquireModal({ open, onClose }) {
  const router = useRouter();
  const overlay = useRef(null);
  const card = useRef(null);
  const firstField = useRef(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);
  const [form, setForm] = useState({
    name: '',
    phone: '',
    email: '',
    service: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [serverError, setServerError] = useState('');

  useGSAP(
    () => {
      if (!open) return;
      gsap.set(overlay.current, { autoAlpha: 0 });
      gsap.set(card.current, { y: 40, opacity: 0, scale: 0.98 });
      gsap.timeline()
        .to(overlay.current, { autoAlpha: 1, duration: 0.35, ease: 'power2.out' })
        .to(card.current, { y: 0, opacity: 1, scale: 1, duration: 0.55, ease: 'power3.out' }, '-=.15');
    },
    { dependencies: [open] }
  );

  useEffect(() => {
    if (!open) return;
    const onKey = (e) => { if (e.key === 'Escape') onClose(); };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKey);
    const t = setTimeout(() => firstField.current?.focus(), 350);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKey);
      clearTimeout(t);
    };
  }, [open, onClose]);

  useEffect(() => {
    if (!open) {
      setForm({ name: '', phone: '', email: '', service: '', message: '' });
      setErrors({});
      setTouched({});
      setSubmitting(false);
      setServerError('');
    }
  }, [open]);

  if (!open || !mounted) return null;

  const update = (k) => (e) => {
    let value = e.target.value;
    if (k === 'phone') value = value.replace(/\D/g, '').slice(0, 10);
    setForm((f) => {
      const next = { ...f, [k]: value };
      if (touched[k] || errors[k]) {
        const nextErrs = validate(next);
        setErrors((prev) => ({ ...prev, [k]: nextErrs[k] }));
      }
      return next;
    });
  };

  const handleBlur = (k) => () => {
    setTouched((t) => ({ ...t, [k]: true }));
    const nextErrs = validate(form);
    setErrors((prev) => ({ ...prev, [k]: nextErrs[k] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const nextErrs = validate(form);
    setErrors(nextErrs);
    setTouched({ name: true, phone: true, email: true, service: true });
    if (Object.keys(nextErrs).length > 0) return;

    setSubmitting(true);
    setServerError('');
    try {
      const res = await fetch(process.env.NEXT_PUBLIC_ENQUIRE_URL || '/api/enquire', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify(form)
      });

      // Require a real JSON response — a static host returning the SPA fallback
      // HTML used to look like "200 OK" here and produce a false success redirect.
      const contentType = res.headers.get('content-type') || '';
      const data = contentType.includes('application/json')
        ? await res.json().catch(() => null)
        : null;

      if (!res.ok || !data || data.ok !== true) {
        setServerError(
          (data && data.error) ||
            'We could not send your enquiry right now. Please call us or try again shortly.'
        );
        setSubmitting(false);
        return;
      }
      onClose?.();
      router.push('/thank-you');
    } catch {
      setServerError('Network error. Please check your connection and try again.');
      setSubmitting(false);
    }
  };

  return createPortal(
    <div
      ref={overlay}
      className={styles.overlay}
      onMouseDown={(e) => { if (e.target === overlay.current) onClose(); }}
      role="dialog"
      aria-modal="true"
      aria-labelledby="enquireTitle"
    >
      <div ref={card} className={styles.card}>
        <button className={styles.close} onClick={onClose} aria-label="Close enquiry form">
          <span /><span />
        </button>

        <div className={styles.head}>
          <span className="eyebrow">Enquire</span>
          <h2 id="enquireTitle" className={styles.title}>
            Let&apos;s talk about your <span className={styles.it}>car</span>.
          </h2>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <label className={styles.field}>
              <span>Name</span>
              <input
                ref={firstField}
                type="text"
                value={form.name}
                onChange={update('name')}
                onBlur={handleBlur('name')}
                placeholder="Your full name"
                aria-invalid={!!errors.name}
                className={errors.name ? styles.invalid : ''}
              />
              {errors.name && <small className={styles.err}>{errors.name}</small>}
            </label>
            <label className={styles.field}>
              <span>Phone</span>
              <input
                type="tel"
                inputMode="numeric"
                autoComplete="tel-national"
                maxLength={10}
                value={form.phone}
                onChange={update('phone')}
                onBlur={handleBlur('phone')}
                placeholder="10-digit mobile number"
                aria-invalid={!!errors.phone}
                className={errors.phone ? styles.invalid : ''}
              />
              {errors.phone && <small className={styles.err}>{errors.phone}</small>}
            </label>
          </div>

          <div className={styles.row}>
            <label className={styles.field}>
              <span>Email</span>
              <input
                type="email"
                value={form.email}
                onChange={update('email')}
                onBlur={handleBlur('email')}
                placeholder="you@example.com"
                aria-invalid={!!errors.email}
                className={errors.email ? styles.invalid : ''}
              />
              {errors.email && <small className={styles.err}>{errors.email}</small>}
            </label>
            <div className={styles.field}>
              <span>Service</span>
              <ServiceSelect
                value={form.service}
                options={SERVICES}
                error={errors.service}
                onChange={(v) => {
                  setForm((f) => ({ ...f, service: v }));
                  setTouched((t) => ({ ...t, service: true }));
                  setErrors((prev) => ({ ...prev, service: undefined }));
                }}
                onBlur={() => handleBlur('service')()}
              />
              {errors.service && <small className={styles.err}>{errors.service}</small>}
            </div>
          </div>

          <label className={styles.field}>
            <span>Message <em>(optional)</em></span>
            <textarea
              rows={2}
              value={form.message}
              onChange={update('message')}
              placeholder="Car make / model, preferred studio, anything else…"
            />
          </label>

          {serverError && <div className={styles.serverErr} role="alert">{serverError}</div>}

          <button
            type="submit"
            className={`btn-gold ${styles.submit}`}
            disabled={submitting}
            aria-busy={submitting}
          >
            <span>{submitting ? 'Sending…' : 'Send Enquiry'}</span>
            {!submitting && <i className="arr" />}
          </button>
        </form>
      </div>
    </div>,
    document.body
  );
}
