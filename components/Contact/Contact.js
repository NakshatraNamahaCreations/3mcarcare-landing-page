'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './Contact.module.css';

const STUDIO = {
  name: 'Kanakapura Road',
  address: '2nd Block, B No 1124, 80 Feet Rd, Banashankari Stage 6, Kariyana Palya, Bengaluru 560098',
  phone: '+91 91672 53584',
  tel: '+919167253584',
  wa: '919167253584',
  email: '3mcarcarestudiokrrr@gmail.com',
  directions: 'https://www.google.com/maps/dir/?api=1&destination=3M+Car+Care+Studio+Kanakapura+Road+Bengaluru',
  map: 'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3890.303942072537!2d77.4750061!3d12.8921908!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3fe9991cafd7%3A0x61cc40c45badad8a!2sKanakapura%20Road!5e0!3m2!1sen!2sin!4v1739427000000'
};

const PinIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M12 22s-7-7.5-7-13a7 7 0 1 1 14 0c0 5.5-7 13-7 13z" />
    <circle cx="12" cy="9" r="2.5" />
  </svg>
);
const PhoneIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.9 19.9 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6A19.9 19.9 0 0 1 2.12 4.18 2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.13.95.36 1.88.7 2.77a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.31-1.27a2 2 0 0 1 2.11-.45c.89.34 1.82.57 2.77.7a2 2 0 0 1 1.72 2.03z" />
  </svg>
);
const MailIcon = () => (
  <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 7 9-7" />
  </svg>
);
const WaIcon = () => (
  <svg viewBox="0 0 24 24" width="15" height="15" fill="currentColor" aria-hidden="true">
    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.05 0C5.5 0 .17 5.33.17 11.88c0 2.1.55 4.15 1.6 5.96L0 24l6.32-1.66a11.88 11.88 0 0 0 5.72 1.46h.01c6.55 0 11.88-5.33 11.89-11.88a11.83 11.83 0 0 0-3.42-8.44zM12.05 21.78a9.85 9.85 0 0 1-5.03-1.38l-.36-.21-3.75.98 1-3.65-.24-.38a9.83 9.83 0 0 1-1.51-5.27c0-5.44 4.43-9.87 9.89-9.87 2.64 0 5.12 1.03 6.99 2.9a9.81 9.81 0 0 1 2.89 6.98c0 5.44-4.43 9.87-9.88 9.9zm5.42-7.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.39-1.47-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.21-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48 0 1.47 1.07 2.88 1.22 3.08.15.2 2.1 3.21 5.08 4.49.71.31 1.26.49 1.7.62.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.41.25-.7.25-1.29.18-1.42-.08-.13-.27-.2-.57-.35z"/>
  </svg>
);

export default function Contact() {
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 80%' };
    gsap.from(`.${styles.title}`, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.card}`, { y: 60, opacity: 0, duration: 1.1, delay: 0.2, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="panel" id="contact" ref={root} style={{ background: 'var(--black)' }}>
      <span className="v-edge l" /><span className="v-edge r" />
      <div className="inner">
        <div className={styles.head}>
          <span className="eyebrow center">Contact</span>
          <h2 className={styles.title}>Visit Our <span className={styles.it}>Studio</span></h2>
          <p className={styles.intro}>Walk in for a consultation or book ahead — our team is on site to walk you through every option.</p>
        </div>

        <article className={styles.card}>
          <span className={styles.num} aria-hidden="true">01</span>

          <div className={styles.left}>
            <span className={styles.kicker}>Bengaluru · South</span>
            <h3 className={styles.name}>{STUDIO.name}</h3>

            <div className={styles.info}>
              <div className={styles.line}>
                <span className={styles.icon}><PinIcon /></span>
                <span>{STUDIO.address}</span>
              </div>
              <a href={`tel:${STUDIO.tel}`} className={styles.line}>
                <span className={styles.icon}><PhoneIcon /></span>
                <span>{STUDIO.phone}</span>
              </a>
              <a href={`mailto:${STUDIO.email}`} className={styles.line}>
                <span className={styles.icon}><MailIcon /></span>
                <span className={styles.email}>{STUDIO.email}</span>
              </a>
            </div>
          </div>

          <div className={styles.right}>
            <div className={styles.mapWrap}>
              <iframe className={styles.map} loading="lazy" src={STUDIO.map} title={`Map — ${STUDIO.name}`} />
              <div className={styles.mapVeil} aria-hidden="true" />
            </div>

            <div className={styles.actions}>
              <a href={STUDIO.directions} target="_blank" rel="noopener noreferrer" className={styles.primaryBtn}>
                <span>Get Directions</span>
                <i className={styles.arr} />
              </a>
              <a href={`https://wa.me/${STUDIO.wa}`} target="_blank" rel="noopener noreferrer" className={styles.ghostBtn}>
                <WaIcon /><span>WhatsApp Us</span>
              </a>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
