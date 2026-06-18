'use client';
import { useRef } from 'react';
import Link from 'next/link';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './page.module.css';

export default function ThankYouView() {
  const root = useRef(null);

  useGSAP(
    () => {
      gsap.timeline()
        .to(`.${styles.mark}`, { opacity: 1, scale: 1, duration: 0.8, ease: 'power3.out' }, 0)
        .to(`.${styles.eyebrow}`, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 0.15)
        .to(`.${styles.line} > span`, { y: 0, duration: 1.05, stagger: 0.12, ease: 'power4.out' }, 0.25)
        .to(`.${styles.sub}`, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, '-=.55')
        .to(`.${styles.ctas} > *`, { opacity: 1, y: 0, duration: 0.7, stagger: 0.08, ease: 'power3.out' }, '-=.5')
        .to(`.${styles.brand}`, { opacity: 1, duration: 0.8, ease: 'power2.out' }, '-=.4')
        .to(`.${styles.meta} > *`, { opacity: 1, y: 0, duration: 0.6, stagger: 0.06, ease: 'power2.out' }, '-=.6');
    },
    { scope: root }
  );

  return (
    <main className={styles.wrap} ref={root}>
      <div className={styles.glow} />
      <div className={styles.vignette} />

      <div className={styles.hairlines}>
        <i style={{ left: '8%', top: '0', height: '60%' }} />
        <i style={{ left: '24%', top: '20%', height: '70%' }} />
        <i style={{ right: '18%', top: '10%', height: '80%' }} />
        <i style={{ right: '6%', top: '30%', height: '55%' }} />
      </div>

      <div className={styles.content}>
        <div className={styles.mark} aria-hidden="true">
          <svg viewBox="0 0 64 64" width="100%" height="100%">
            <circle cx="32" cy="32" r="30" fill="none" stroke="currentColor" strokeWidth="1" opacity=".5" />
            <circle cx="32" cy="32" r="22" fill="none" stroke="currentColor" strokeWidth="1.2" />
            <path d="M22 33 L29 40 L43 25" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        <span className={`eyebrow center ${styles.eyebrow}`}>Enquiry received</span>

        <h1 className={styles.title}>
          <span className={styles.line}><span>Thank you for</span></span>
          <span className={styles.line}><span>reaching <em className={styles.it}>out</em>.</span></span>
        </h1>

        <p className={styles.sub}>
          A studio specialist will get back to you within <strong>one business day</strong>.
          For anything urgent, the line below is the fastest way to reach us.
        </p>

        <div className={styles.ctas}>
          <Link href="/" className={`btn-gold ${styles.cta}`} data-cursor="hover">
            <span>Back to Home</span><i className="arr" />
          </Link>
          <a href="tel:+919167253584" className={styles.ctaGhost} data-cursor="hover">
            <span>Call +91 91672 53584</span>
          </a>
        </div>

        <ul className={styles.meta}>
          <li>
            <span>WhatsApp</span>
            <a href="https://wa.me/919167253584" target="_blank" rel="noopener noreferrer">
              wa.me/919167253584
            </a>
          </li>
          <li>
            <span>Studio</span>
            <a href="/#contact">Kanakapura Road, Bengaluru</a>
          </li>
          <li>
            <span>Email</span>
            <a href="mailto:3mcarcarestudiokrrr@gmail.com">3mcarcarestudiokrrr@gmail.com</a>
          </li>
        </ul>
      </div>

      <div className={styles.brand} aria-hidden="true">3M Car Care Studio · Bengaluru</div>
    </main>
  );
}
