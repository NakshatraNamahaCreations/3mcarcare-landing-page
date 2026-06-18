'use client';
import logo from '@/assets/logo-1.png';
import styles from './Footer.module.css';

const SERVICES = ['Paint Protection Film', 'Sun Control Film', 'Graphene & Ceramic Coating', 'Interior GermKleen', 'Anti-Corrosion Treatment', 'Car Wraps & Styling'];

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.cta}>
        <span className="eyebrow center">Appointment</span>
        <h2 className={styles.ctaTitle}>Book Your Service Today</h2>
        <p>Book online, call our studio, or visit us in Bangalore to experience premium 3M Car Care services.</p>
        <a href="tel:+919167253584" className="btn-gold" data-cursor="hover"><span>Call +91 91672 53584</span><i className="arr" /></a>
      </div>

      <div className={styles.main}>
        <div className={`${styles.col} ${styles.brand}`}>
          <a href="#hero" className={styles.logo} aria-label="3M Car Care — home">
            <img src={logo.src} alt="3M Car Care" />
          </a>
          <p>World-class vehicle protection and detailing backed by 100 years of 3M innovation — at Kanakapura Road, Bangalore.</p>
          <div className={styles.socials}>
            <a href="https://www.facebook.com/people/3M-CarCare-Nagasandra/61557047811961/" target="_blank" rel="noopener noreferrer">Fb</a>
            <a href="https://www.instagram.com/3m_carcare_nagasandra/" target="_blank" rel="noopener noreferrer">Ig</a>
            <a href="https://www.youtube.com/@3MCarCareNagasandra" target="_blank" rel="noopener noreferrer">Yt</a>
            <a href="https://wa.me/919167253584" target="_blank" rel="noopener noreferrer">Wa</a>
          </div>
        </div>

        <div className={styles.col}>
          <h5>Services</h5>
          <ul>{SERVICES.map((s) => <li key={s}><a href="#services">{s}</a></li>)}</ul>
        </div>

        <div className={styles.col}>
          <h5>Studios</h5>
          <ul>
            <li><a href="#contact">Kanakapura Rd — South BLR</a></li>
            <li><a href="tel:+919167253584">+91 91672 53584</a></li>
            <li><a href="tel:+918892888336">+91 88928 88336</a></li>
            <li><a href="mailto:3mcarcarestudiokrrr@gmail.com">3mcarcarestudiokrrr@gmail.com</a></li>
            <li><a href="#hero">Back to Top</a></li>
          </ul>
        </div>
      </div>

      <div className={styles.bottom}>
        <span>© 2025 3M Car Care Studio — Bangalore. All rights reserved.</span>
        <span>Premium PPF · Ceramic Coating · Detailing</span>
      </div>
    </footer>
  );
}
