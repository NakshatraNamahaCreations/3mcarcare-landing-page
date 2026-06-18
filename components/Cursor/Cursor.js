'use client';
import { useEffect, useRef } from 'react';
import { gsap } from '@/lib/gsap';
import styles from './Cursor.module.css';

export default function Cursor() {
  const dot = useRef(null);
  const ring = useRef(null);

  useEffect(() => {
    if (!window.matchMedia('(hover:hover)').matches) return;

    const setDot = gsap.quickSetter(dot.current, 'css');
    const setRing = gsap.quickSetter(ring.current, 'css');
    let x = 0, y = 0, rx = 0, ry = 0;

    const onMove = (e) => {
      x = e.clientX; y = e.clientY;
      setDot({ x, y });
    };
    const tick = () => {
      rx += (x - rx) * 0.15;
      ry += (y - ry) * 0.15;
      setRing({ x: rx, y: ry });
    };

    window.addEventListener('mousemove', onMove);
    gsap.ticker.add(tick);

    const hoverEls = document.querySelectorAll('a, button, [data-cursor="hover"]');
    const enter = () => ring.current && ring.current.classList.add(styles.hover);
    const leave = () => ring.current && ring.current.classList.remove(styles.hover);
    hoverEls.forEach((el) => {
      el.addEventListener('mouseenter', enter);
      el.addEventListener('mouseleave', leave);
    });

    return () => {
      window.removeEventListener('mousemove', onMove);
      gsap.ticker.remove(tick);
      hoverEls.forEach((el) => {
        el.removeEventListener('mouseenter', enter);
        el.removeEventListener('mouseleave', leave);
      });
    };
  }, []);

  return (
    <>
      <div className={styles.cursor} ref={dot} />
      <div className={styles.cursorD} ref={ring} />
    </>
  );
}
