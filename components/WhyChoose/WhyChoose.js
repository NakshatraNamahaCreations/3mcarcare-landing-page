'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './WhyChoose.module.css';

const POINTS = [
  "3M's century-long expertise delivers truly world-class solutions.",
  'Paint protection, coatings, films, wraps, mats & anti-corrosion under one roof.',
  'Certified technicians ensure precise application and the highest quality.',
  'Protects vehicle paint & interior — enhancing long-term value.',
  'Services customized for sedans, SUVs, sports & luxury cars.'
];

export default function WhyChoose() {
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 75%' };
    // Classic split: image from left, content from right
    gsap.from(`.${styles.imgWrap}`, { x: -100, opacity: 0, duration: 1.1, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.content} > *`, { x: 80, opacity: 0, duration: 0.9, stagger: 0.12, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.list} li`, { x: 40, opacity: 0, duration: 0.7, stagger: 0.1, delay: 0.4, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="panel" id="why" ref={root} style={{ background: 'var(--panel)' }}>
      <span className="v-edge l" /><span className="v-edge r" />
      <span className="section-tag">04 — Why 3M</span>
      <div className="inner">
        <div className={styles.grid}>
          <div className={styles.imgWrap}>
            <div className={styles.img} />
            <div className={styles.badge}><b>100</b><small>Years of Innovation</small></div>
          </div>

          <div className={styles.content}>
            <span className={`eyebrow ${styles.eyebrow}`}>Trusted Expertise</span>
            <h2 className={styles.title}>Why Choose 3M<br />Car Care Studio?</h2>
            <ul className={styles.list}>
              {POINTS.map((p, i) => (
                <li key={i}><span className={styles.i}>✦</span><p>{p}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
