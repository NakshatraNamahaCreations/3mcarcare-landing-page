'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { testimonials } from '@/data/testimonials';
import styles from './Testimonials.module.css';

export default function Testimonials() {
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 80%' };
    gsap.from(`.${styles.title}`, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.card}`, { y: 60, opacity: 0, scale: 0.95, duration: 0.9, stagger: 0.12, delay: 0.2, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="panel" id="testimonials" ref={root} style={{ background: 'var(--panel)' }}>
      <span className="v-edge l" /><span className="v-edge r" />
      <div className="inner">
        <div className={styles.head}>
          <span className="eyebrow center">Testimonial</span>
          <h2 className={styles.title}>Clients <span className={styles.it}>Testimonial</span></h2>
        </div>
        <div className={styles.grid}>
          {testimonials.map((t) => (
            <div className={styles.card} key={t.name}>
              <div className={styles.q}>&ldquo;</div>
              <div className={styles.stars}>★★★★★</div>
              <p>{t.text}</p>
              <div className={styles.who}>
                <span className={styles.av}>{t.initial}</span>
                <div><b>{t.name}</b><small>{t.role}</small></div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
