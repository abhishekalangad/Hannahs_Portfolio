/**
 * Hannah Elangovan Portfolio — Horizontal Scroll Card Showcase
 * Smooth drag-to-scroll, wheel translation, navigation controls & progress bar
 */

(function () {
  'use strict';

  function initHorizontalScroll() {
    const scrollContainer = document.getElementById('horizontal-showcase-container');
    const prevBtn = document.getElementById('showcase-prev-btn');
    const nextBtn = document.getElementById('showcase-next-btn');
    const progressBar = document.getElementById('showcase-progress-bar');

    if (!scrollContainer) return;

    let isDown = false;
    let startX = 0;
    let scrollLeft = 0;
    let velocity = 0;
    let momentumID = null;

    // Update Progress Indicator
    function updateProgress() {
      if (!progressBar) return;
      const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
      if (maxScroll <= 0) {
        progressBar.style.width = '100%';
        return;
      }
      const scrollPercent = (scrollContainer.scrollLeft / maxScroll) * 100;
      const clampedPercent = Math.max(10, Math.min(100, scrollPercent));
      progressBar.style.width = `${clampedPercent}%`;
    }

    scrollContainer.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    setTimeout(updateProgress, 300);

    // Mouse Dragging
    scrollContainer.addEventListener('mousedown', (e) => {
      isDown = true;
      scrollContainer.classList.add('is-dragging');
      startX = e.pageX - scrollContainer.offsetLeft;
      scrollLeft = scrollContainer.scrollLeft;
      cancelAnimationFrame(momentumID);
    });

    window.addEventListener('mouseup', () => {
      if (!isDown) return;
      isDown = false;
      scrollContainer.classList.remove('is-dragging');
    });

    scrollContainer.addEventListener('mouseleave', () => {
      if (isDown) {
        isDown = false;
        scrollContainer.classList.remove('is-dragging');
      }
    });

    scrollContainer.addEventListener('mousemove', (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - scrollContainer.offsetLeft;
      const walk = (x - startX) * 1.6; // Scroll speed factor
      scrollContainer.scrollLeft = scrollLeft - walk;
    });

    // Mouse Wheel to Horizontal Translation
    scrollContainer.addEventListener('wheel', (e) => {
      if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) {
        // If scrolling vertically inside horizontal showcase, translate deltaY to horizontal scroll
        const maxScroll = scrollContainer.scrollWidth - scrollContainer.clientWidth;
        const atStart = scrollContainer.scrollLeft <= 5 && e.deltaY < 0;
        const atEnd = scrollContainer.scrollLeft >= maxScroll - 5 && e.deltaY > 0;

        if (!atStart && !atEnd) {
          e.preventDefault();
          scrollContainer.scrollLeft += e.deltaY * 0.9;
        }
      }
    }, { passive: false });

    // Buttons
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        const cardWidth = scrollContainer.querySelector('.venture-card')?.offsetWidth || 380;
        scrollContainer.scrollBy({ left: -(cardWidth + 32), behavior: 'smooth' });
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        const cardWidth = scrollContainer.querySelector('.venture-card')?.offsetWidth || 380;
        scrollContainer.scrollBy({ left: cardWidth + 32, behavior: 'smooth' });
      });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initHorizontalScroll);
  } else {
    initHorizontalScroll();
  }
})();
