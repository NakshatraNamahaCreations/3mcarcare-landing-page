'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import car1 from '@/assets/car1.png';
import styles from './Showcase.module.css';

export default function Showcase() {
  const root = useRef(null);
  const car = useRef(null);
  const maskTop = useRef(null);
  const maskBot = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add('(min-width:981px)', () => {
        // Initial state — car off-screen left, eyebrow + title hidden
        gsap.set(car.current, { xPercent: -130, scale: 0.6, rotate: -8, opacity: 0 });
        gsap.set(`.${styles.eyebrow}`, { opacity: 0, y: 20 });
        gsap.set(`.${styles.title}`, { opacity: 0, y: 30 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: 'top top', end: '+=300%', pin: true, scrub: 0.5 }
        });

        // 0 → .06 — top curtain rises
        tl.fromTo(maskTop.current, { yPercent: 0 }, { yPercent: -100, ease: 'none' }, 0);

        // .05 → .28 — car drives in from off-screen left, levels out, scales up
        tl.to(car.current, { xPercent: 0, scale: 1, rotate: 0, opacity: 1, ease: 'power3.out' }, 0.05);
        // .08 → .35 — glow blooms with the arrival
        tl.fromTo(`.${styles.glow}`, { scale: 0.7, opacity: 0 }, { scale: 1.1, opacity: 0.8, ease: 'power2.out' }, 0.08);

        // .15 → .32 — eyebrow + title fade in alongside
        tl.to(`.${styles.eyebrow}`, { opacity: 1, y: 0, ease: 'power2.out' }, 0.15);
        tl.to(`.${styles.title}`, { opacity: 1, y: 0, ease: 'power2.out' }, 0.20);

        // .35 → .65 — HOLD with subtle parallax hover (car bobs + glow pulses)
        tl.to(car.current, { y: -14, scale: 1.04, ease: 'sine.inOut' }, 0.35);
        tl.to(`.${styles.glow}`, { scale: 1.25, opacity: 0.95, ease: 'sine.inOut' }, 0.35);
        tl.to(car.current, { y: 0, scale: 1, ease: 'sine.inOut' }, 0.55);

        // .70 → .90 — car exits to the right with rotation + scale-down
        tl.to(car.current, { xPercent: 130, scale: 0.65, rotate: 12, opacity: 0, ease: 'power2.in' }, 0.70);
        tl.to(`.${styles.glow}`, { opacity: 0, scale: 0.6, ease: 'power2.in' }, 0.72);
        tl.to(`.${styles.eyebrow}`, { opacity: 0, y: -20, ease: 'power2.in' }, 0.75);
        tl.to(`.${styles.title}`, { opacity: 0, y: -30, ease: 'power2.in' }, 0.78);

        // .92 → 1 — bottom curtain falls
        tl.fromTo(maskBot.current, { yPercent: 100 }, { yPercent: 0, ease: 'none' }, 0.92);
      });

      mm.add('(max-width:980px)', () => {
        // Mobile: simple reveal — no pin choreography
        gsap.set(car.current, { opacity: 0, y: 40 });
        gsap.set([`.${styles.eyebrow}`, `.${styles.title}`], { opacity: 0, y: 30 });
        gsap.to(`.${styles.eyebrow}`, { opacity: 1, y: 0, duration: 0.8, ease: 'power3.out', scrollTrigger: { trigger: root.current, start: 'top 80%' } });
        gsap.to(`.${styles.title}`, { opacity: 1, y: 0, duration: 0.9, ease: 'power3.out', delay: 0.1, scrollTrigger: { trigger: root.current, start: 'top 80%' } });
        gsap.to(car.current, { opacity: 1, y: 0, duration: 1, ease: 'power3.out', delay: 0.2, scrollTrigger: { trigger: root.current, start: 'top 80%' } });
      });
    },
    { scope: root }
  );

  return (
    <section className={`panel ${styles.section}`} id="showcase" ref={root}>
      <div className={`mask-top ${styles.maskTop}`} ref={maskTop} />
      <div className={styles.glow} />
      <div className={styles.inner}>
        <span className={`eyebrow center ${styles.eyebrow}`}>The 3M Promise</span>
        <h2 className={styles.title}>Engineered to <span className={styles.it}>protect.</span></h2>
        <img ref={car} src={car1.src} alt="Premium car protected by 3M" className={styles.car} loading="eager" />
      </div>
      <div className={`mask-bot ${styles.maskBot}`} ref={maskBot} />
    </section>
  );
}
