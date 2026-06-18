'use client';
import { useRef, useState } from 'react';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';
import { faqs } from '@/data/faqs';
import styles from './Faq.module.css';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const root = useRef(null);

  useGSAP(() => {
    const st = { trigger: root.current, start: 'top 80%' };
    // Title slides from left, items slide from right
    gsap.from(`.${styles.title}`, { x: -60, opacity: 0, duration: 0.9, ease: 'power3.out', scrollTrigger: st });
    gsap.from(`.${styles.item}`, { x: 60, opacity: 0, duration: 0.7, stagger: 0.1, delay: 0.2, ease: 'power3.out', scrollTrigger: st });
  }, { scope: root });

  return (
    <section className="panel" id="faq" ref={root} style={{ background: 'var(--black)' }}>
      <span className="section-tag">07 — FAQ</span>
      <div className="inner">
        <div className={styles.wrap}>
          <div>
            <span className="eyebrow">Ask Question</span>
            <h2 className={styles.title}>Got Questions?<br />We&apos;ve <span className={styles.it}>Got</span> Answers</h2>
          </div>

          <div className={styles.list}>
            {faqs.map((f, i) => {
              const isOpen = open === i;
              return (
                <div className={`${styles.item} ${isOpen ? styles.active : ''}`} key={i}>
                  <button className={styles.q} onClick={() => setOpen(isOpen ? -1 : i)}>
                    <h4>{f.q}</h4>
                    <span className={styles.pm} />
                  </button>
                  <div className={styles.a}><div><p>{f.a}</p></div></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
