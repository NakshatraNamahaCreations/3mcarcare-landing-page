'use client';
import { useRef } from 'react';
import { services } from '@/data/services';
import styles from './Services.module.css';

export default function Services() {
  const trackRef = useRef(null);

  const scrollByOne = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector(`.${styles.card}`);
    const gap = 16;
    const step = card ? card.offsetWidth + gap : 400;
    track.scrollBy({ left: dir * step, behavior: 'smooth' });
  };

  return (
    <section className="panel" id="services" style={{ background: 'var(--black)' }}>
      <span className="section-tag">03 — Services</span>
      <div className={`inner ${styles.inner}`}>
        <div className={styles.head}>
          <div className={styles.headLeft}>
            <span className="eyebrow">Our Craft</span>
            <h2 className={styles.title}>
              Premium Care,<br />
              <em>Engineered</em> for Excellence
            </h2>
            <p className={styles.intro}>From paint protection and coatings to interior hygiene, styling, and floor mats — every service is designed to protect, enhance, and transform your vehicle.</p>
          </div>
          <div className={styles.headRight}>
            <span className={styles.scrollHint}>
              <span className={styles.scrollDot} />
              Drag or scroll
            </span>
            <div className={styles.navBtns}>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Previous service"
                onClick={() => scrollByOne(-1)}
                data-cursor="hover"
              >
                <span aria-hidden="true">←</span>
              </button>
              <button
                type="button"
                className={styles.navBtn}
                aria-label="Next service"
                onClick={() => scrollByOne(1)}
                data-cursor="hover"
              >
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>

        <div className={styles.trackWrap}>
          <div className={styles.track} ref={trackRef}>
            {services.map((s) => (
              <a className={styles.card} href="#contact" key={s.no} data-cursor="hover">
                <div className={styles.cardImg} style={{ backgroundImage: `url('${s.img}')` }} />
                <div className={styles.cardOverlay} />
                <span className={styles.cornerTL} aria-hidden="true" />
                <span className={styles.cornerBR} aria-hidden="true" />
                <span className={styles.no}>{s.no}</span>
                <div className={styles.cardBody}>
                  <span className={styles.kicker}>Signature Service</span>
                  <h3 className={styles.cardTitle}>{s.title}</h3>
                  <p className={styles.cardDesc}>{s.desc}</p>
                  <span className={styles.go}>
                    <span>Discover</span>
                    <span className={styles.goArrow}>→</span>
                  </span>
                </div>
              </a>
            ))}
            <div className={styles.trailSpacer} aria-hidden="true" />
          </div>
          <div className={styles.trackEdge} aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}
