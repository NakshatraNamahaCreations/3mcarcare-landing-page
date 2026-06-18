'use client';
import { useRef } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import car2 from '@/assets/car-2.png';
import logo from '@/assets/logo-1.png';
import styles from './Preloader.module.css';

export default function Preloader({ onComplete }) {
  const root = useRef(null);
  const brand = useRef(null);
  const car = useRef(null);

  useGSAP(
    () => {
      const tl = gsap.timeline({ onComplete });

      // 1. Logo fades + slides in from below
      tl.fromTo(
        brand.current,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.9, ease: 'power3.out', delay: 0.2 }
      );

      // 2. Car drives in from the LEFT while the progress bar fills — same duration,
      //    same start time, so the car appears to be filling the line as it moves across.
      tl.fromTo(
        car.current,
        { xPercent: -120, opacity: 0 },
        { xPercent: 0, opacity: 1, duration: 1.3, ease: 'power2.out' },
        '-=.4'
      );
      tl.to(`.${styles.lbar} i`, { scaleX: 1, duration: 1.3, ease: 'power2.inOut' }, '<');

      // 3. Brief beat, then car exits to the RIGHT (off-screen)
      tl.to(car.current, { xPercent: 120, opacity: 0, duration: 0.7, ease: 'power3.in' }, '+=.15');

      // 4. Loader slides up and unmounts
      tl.to(root.current, { yPercent: -100, duration: 0.9, ease: 'power4.inOut' }, '-=.2');
      tl.set(root.current, { display: 'none' });
    },
    { scope: root }
  );

  return (
    <div className={styles.loader} ref={root}>
      <div className={styles.lwrap}>
        <img ref={brand} className={styles.brand} src={logo.src} alt="3M Car Care" />
        <div className={styles.preCarWrap}>
          <img ref={car} className={styles.preCar} src={car2.src} alt="" />
          <div className={styles.preGlow} />
        </div>
      </div>
      <div className={styles.lbar}><i /></div>
    </div>
  );
}
