'use client';
import { useGSAP } from '@gsap/react';
import { gsap } from '@/lib/gsap';

// Animates every `.reveal` element inside the given scope ref.
// useGSAP auto-reverts these tweens + their ScrollTriggers on unmount.
export function useReveal(scope) {
  useGSAP(
    () => {
      if (!scope.current) return;
      const els = scope.current.querySelectorAll('.reveal');
      els.forEach((el) => {
        gsap.to(el, {
          opacity: 1,
          y: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: { trigger: el, start: 'top 88%' }
        });
      });
    },
    { scope }
  );
}
