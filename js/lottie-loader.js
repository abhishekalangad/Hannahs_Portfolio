/**
 * Hannah Elangovan Portfolio — Lottie Animations Loader
 * High-performance viewport-aware Lottie animation controller
 */

(function () {
  'use strict';

  const lottieInstances = new Map();

  function initLottieContainers() {
    if (typeof lottie === 'undefined') {
      console.warn('Lottie library not yet loaded. Retrying in 100ms...');
      setTimeout(initLottieContainers, 100);
      return;
    }

    const containers = document.querySelectorAll('[data-lottie-path]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const container = entry.target;
          const anim = lottieInstances.get(container);

          if (!anim) {
            if (entry.isIntersecting) {
              const path = container.getAttribute('data-lottie-path');
              if (path) {
                const animation = lottie.loadAnimation({
                  container: container,
                  renderer: 'svg',
                  loop: true,
                  autoplay: true,
                  path: path
                });
                lottieInstances.set(container, animation);

                // Hover micro-interaction: subtle speed up
                const card = container.closest('.glass-card') || container.closest('.venture-card') || container;
                card.addEventListener('mouseenter', () => {
                  animation.setSpeed(1.35);
                });
                card.addEventListener('mouseleave', () => {
                  animation.setSpeed(1.0);
                });
              }
            }
          } else {
            if (entry.isIntersecting) {
              anim.play();
            } else {
              anim.pause();
            }
          }
        });
      },
      { rootMargin: '100px 0px 100px 0px', threshold: 0.1 }
    );

    containers.forEach((container) => {
      observer.observe(container);
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initLottieContainers);
  } else {
    initLottieContainers();
  }
})();
