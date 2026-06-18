'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './Cta.module.css';

export default function Cta() {
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 80%' };
    gsap.from(`.${styles.inner} > *`, { y: 50, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className={`panel ${styles.section}`} id="cta" ref={root} style={{ background: 'var(--panel)', textAlign: 'center' }}>
      <div className={styles.bg} />
      <div className={`${styles.inner} inner`}>
        <span className="eyebrow center">Get In Touch</span>
        <h2 className={styles.title}>Ready for the best <span className={styles.it}>Ceramic Coating</span> in the world?</h2>
        <p className={styles.quote}>&ldquo;Give Your Car The Ultimate Protection Available&rdquo;</p>
        <a href="#contact" className="btn-gold" data-cursor="hover"><span>Get In Touch</span><i className="arr" /></a>
      </div>
    </section>
  );
}
