'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import styles from './Locations.module.css';

const LOCS = [
  { region: 'North Bangalore', title: '3M Car Care — Nagasandra', desc: 'Expert 3M car care and coatings, beside IKEA on the 14th Main Road.', img: 'https://3mcarcarebangalore.com/assets/images/resources/location-banner-2.webp' },
  { region: 'South Bangalore', title: '3M Car Care — Kanakapura Rd', desc: 'Premium car detailing and protection in Banashankari Stage 6.', img: 'https://3mcarcarebangalore.com/assets/images/resources/location-banner-2.jpeg' }
];

export default function Locations() {
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 80%' };
    gsap.from(`.${styles.title}`, { y: 40, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.intro}`, { y: 30, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.card}`, { x: (i) => (i % 2 === 0 ? -80 : 80), opacity: 0, duration: 1, stagger: 0.15, delay: 0.3, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="panel" id="studios" ref={root} style={{ background: 'var(--panel)' }}>
      <span className="v-edge l" /><span className="v-edge r" />
      <span className="section-tag">02 — Studios</span>
      <div className="inner">
        <div className={styles.head}>
          <h2 className={styles.title}>
            World-class care,<br />across <span className={styles.italGold}>Bangalore.</span>
          </h2>
          <p className={styles.intro}>Backed by a century of 3M innovation, our certified experts deliver lasting protection at both North and South Bangalore locations.</p>
        </div>
        

        <div className={styles.grid}>
          {LOCS.map((l) => (
            <a href="#contact" key={l.title} className={styles.card} data-cursor="hover">
              <div className={styles.cardImg} style={{ backgroundImage: `url('${l.img}')` }} />
              <div className={styles.cardBody}>
                <small>{l.region}</small>
                <h3>{l.title}</h3>
                <p>{l.desc}</p>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
