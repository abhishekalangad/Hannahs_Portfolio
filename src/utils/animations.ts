import { useEffect, useRef } from 'react';

/**
 * 3D Tilt Card Effect
 * Tilts element relative to mouse cursor coordinates on hover.
 */
export const useTilt = <T extends HTMLElement = HTMLDivElement>(active = false) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      const xc = rect.width / 2;
      const yc = rect.height / 2;
      
      const dx = x - xc;
      const dy = y - yc;
      
      // Max tilt angle: 6 degrees for subtle elegant performance
      const tiltX = -(dy / yc) * 6;
      const tiltY = (dx / xc) * 6;

      el.style.transform = `perspective(1000px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) translateY(-2px) scale(1.005)`;
      el.style.transition = 'transform 0.08s ease, background-color 0.3s ease, border-color 0.3s ease';
    };

    const handleMouseLeave = () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active]);

  return ref;
};

/**
 * Magnetic Pull Interaction
 * Gently pulls interactive items (buttons, icons, menu links) toward the cursor position.
 */
export const useMagnetic = <T extends HTMLElement = HTMLButtonElement>(active = false) => {
  const ref = useRef<T>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !active) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;

      // Gently pull target up to 8px in both directions
      const pullX = x * 0.32;
      const pullY = y * 0.32;

      el.style.transform = `translate3d(${pullX}px, ${pullY}px, 0)`;
      el.style.transition = 'transform 0.1s ease';
    };

    const handleMouseLeave = () => {
      el.style.transform = '';
      el.style.transition = 'transform 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)';
    };

    el.addEventListener('mousemove', handleMouseMove);
    el.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      el.removeEventListener('mousemove', handleMouseMove);
      el.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [active]);

  return ref;
};

/**
 * Scroll Reveal Hook
 * Fades and slides elements into view from a blurred state when they intersect.
 */
export const useScrollReveal = (threshold = 0.1) => {
  useEffect(() => {
    const reveals = document.querySelectorAll('.reveal');
    if (reveals.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('active');
          }
        });
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px', // Trigger slightly before element enters fully
      }
    );

    reveals.forEach((el) => observer.observe(el));

    return () => {
      reveals.forEach((el) => observer.unobserve(el));
    };
  }, []);
};
