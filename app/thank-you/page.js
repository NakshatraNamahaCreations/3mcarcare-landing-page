import ThankYouView from './ThankYouView';

export const metadata = {
  title: 'Thank You — 3M Car Care Studio',
  description:
    'Thanks for reaching out to 3M Car Care Studio. Our studio team will get back to you within one business day.',
  robots: { index: false, follow: false }
};

export default function ThankYouPage() {
  return <ThankYouView />;
}
