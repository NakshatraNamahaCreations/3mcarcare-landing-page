'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import EnquireModal from '@/components/EnquireModal/EnquireModal';
import styles from './Hero.module.css';

export default function Hero({ ready }) {
  const root = useRef(null);
  const cue = useRef(null);
  const [enquireOpen, setEnquireOpen] = useState(false);

  // Intro — time-based, runs once the preloader signals `ready`. No scroll triggers.
  useGSAP(
    () => {
      if (!ready) return;
      gsap.timeline()
        .to(`.${styles.eyebrow}`, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out' }, 0)
        .to(`.${styles.title} .${styles.line} > span`, { y: 0, duration: 1.1, stagger: 0.12, ease: 'power4.out' }, 0.1)
        .from(`.${styles.sub}`, { opacity: 0, y: 24, duration: 0.9, ease: 'power3.out' }, '-=.6')
        .from(`.${styles.cta}`, { opacity: 0, y: 24, duration: 0.8, ease: 'power3.out' }, '-=.6')
        .from(cue.current, { opacity: 0, duration: 0.8 }, '-=.4');
    },
    { scope: root, dependencies: [ready] }
  );

  return (
    <section className="panel" id="hero" ref={root} style={{ height: '100vh' }}>
      <div className={styles.heroBg} />
      <div className={styles.heroGlow} />
      <div className={styles.heroVignette} />

      <div className={styles.hairlines}>
        <i style={{ left: '8%', top: '0', height: '60%' }} />
        <i style={{ left: '24%', top: '20%', height: '70%' }} />
        <i style={{ right: '18%', top: '10%', height: '80%' }} />
        <i style={{ right: '6%', top: '30%', height: '55%' }} />
      </div>

      <div className={styles.heroContent}>
        <span className={`eyebrow center ${styles.eyebrow}`}>100 Years of 3M Innovation</span>

        <h1 className={styles.title}>
          <span className={styles.line}><span>3M PPF The Ultimate</span></span>
          <span className={styles.line}><span><span className={styles.it}>Shield</span> for Your Paint.</span></span>
        </h1>

        <p className={styles.sub}>
          Long-lasting, invisible defense against road debris, weather, and everyday wear — engineered for the cars you love most.
        </p>
        <button
          type="button"
          className={`btn-gold ${styles.cta}`}
          data-cursor="hover"
          onClick={() => setEnquireOpen(true)}
        >
          <span>Book a Slot</span><i className="arr" />
        </button>
      </div>

      <div className={styles.scrollCue} ref={cue}>
        <span>Scroll</span><span className={styles.cueLine} />
      </div>

      <EnquireModal open={enquireOpen} onClose={() => setEnquireOpen(false)} />
    </section>
  );
}
