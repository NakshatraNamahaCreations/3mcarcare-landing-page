'use client';
import { useEffect, useState, useCallback } from 'react';
import logo from '@/assets/logo-1.png';
import EnquireModal from '@/components/EnquireModal/EnquireModal';
import styles from './Navbar.module.css';

const LINKS = [
  { id: 'locations', label: 'Studios' },
  { id: 'services', label: 'Services' },
  { id: 'why', label: 'Why 3M' },
  { id: 'gallery', label: 'Gallery' },
  { id: 'faq', label: 'FAQ' },
  { id: 'contact', label: 'Contact' }
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [enquireOpen, setEnquireOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const goTo = useCallback((e, id) => {
    e.preventDefault();
    setOpen(false);
    const target = document.getElementById(id);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, []);

  return (
    <nav className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <a href="#hero" className={styles.logo} onClick={(e) => goTo(e, 'hero')} aria-label="3M Car Care — home">
        <img src={logo.src} alt="3M Car Care" />
      </a>

      <div className={`${styles.navLinks} ${open ? styles.open : ''}`}>
        {LINKS.map((l) => (
          <a key={l.id} href={`#${l.id}`} onClick={(e) => goTo(e, l.id)}>{l.label}</a>
        ))}
      </div>

      <button
        type="button"
        className={styles.navCta}
        onClick={() => { setOpen(false); setEnquireOpen(true); }}
      >
        <span>Enquire Now</span>
      </button>

      <button
        className={`${styles.burger} ${open ? styles.burgerOpen : ''}`}
        onClick={() => setOpen((v) => !v)}
        aria-label="Toggle menu"
      >
        <span /><span /><span />
      </button>

      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} />
    </nav>
  );
}
