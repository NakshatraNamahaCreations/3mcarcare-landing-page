'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './Gallery.module.css';

const base = 'https://3mcarcarebangalore.com/assets/images';
const COLS = [
  { top: false, imgs: ['gallery/gallery-3-1.jpg', 'gallery/gallery-3-4.jpg', 'gallery/gallery-3-7.jpg'] },
  { top: true,  imgs: ['gallery/gallery-3-2.jpg', 'gallery/gallery-3-5.jpg', 'gallery/gallery-3-8.jpg'] },
  { top: false, imgs: ['gallery/gallery-3-3.jpg', 'gallery/gallery-3-6.jpg', 'our-works/person-working-car-wrapping.jpg'] }
];

export default function Gallery() {
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 80%' };
    gsap.from(`.${styles.title}`, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.intro}`, { y: 30, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out', scrollTrigger: st });
    // Stagger each image with slight zoom-in
    gsap.from(`.${styles.gi}`, { y: 60, opacity: 0, scale: 0.92, duration: 0.9, stagger: 0.08, delay: 0.3, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="panel" id="gallery" ref={root} style={{ background: 'var(--black)' }}>
      <span className="section-tag">05 — Gallery</span>
      <div className="inner">
        <div className={styles.head}>
          <span className="eyebrow center">Gallery</span>
          <h2 className={styles.title}>See the Shine, <span className={styles.it}>Feel</span> the Difference</h2>
          <p className={styles.intro}>A glimpse of how we bring every car back to life with 3M&apos;s advanced car care solutions.</p>
        </div>

        <div className={styles.cols}>
          {COLS.map((c, ci) => (
            <div className={styles.col} key={ci} style={c.top ? { marginTop: '2.4rem' } : undefined}>
              {c.imgs.map((src, i) => (
                <div className={styles.gi} key={i}>
                  <img src={`${base}/${src}`} alt="3M detailing work" loading="lazy" />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
