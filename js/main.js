/**
 * Hannah Elangovan Portfolio — Master Application Controller
 * Manages Cursor, Ambient Audio, Perspective Switching, Modals, Animations & Form
 */

(function () {
  'use strict';

  // ==========================================
  // 1. CUSTOM LUXURY MAGNETIC CURSOR
  // ==========================================
  const cursorDot = document.querySelector('.custom-cursor');
  const cursorFollower = document.querySelector('.custom-cursor-follower');

  if (cursorDot && cursorFollower && window.innerWidth > 768) {
    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let followerX = mouseX;
    let followerY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursorDot.style.left = `${mouseX}px`;
      cursorDot.style.top = `${mouseY}px`;
    });

    function animateCursor() {
      followerX += (mouseX - followerX) * 0.15;
      followerY += (mouseY - followerY) * 0.15;
      cursorFollower.style.left = `${followerX}px`;
      cursorFollower.style.top = `${followerY}px`;
      requestAnimationFrame(animateCursor);
    }
    animateCursor();

    const hoverElements = document.querySelectorAll('a, button, input, textarea, .glass-card, .venture-card, .interactive');
    hoverElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursorDot.classList.add('hovering');
        cursorFollower.classList.add('hovering');
      });
      el.addEventListener('mouseleave', () => {
        cursorDot.classList.remove('hovering');
        cursorFollower.classList.remove('hovering');
      });
    });
  }

  // ==========================================
  // 2. AMBIENT LUXURY SOUNDSCAPE (WEB AUDIO API)
  // ==========================================
  const audioBtn = document.getElementById('audio-toggle-btn');
  let audioCtx = null;
  let isPlayingSound = false;
  let synthNodes = [];

  function toggleSoundscape() {
    if (!isPlayingSound) {
      startAmbientSound();
      isPlayingSound = true;
      audioBtn.classList.add('playing');
      const label = audioBtn.querySelector('.audio-label');
      if (label) label.textContent = 'Audio: Atmospheric';
      showToast('Atmospheric Soundscape Activated');
    } else {
      stopAmbientSound();
      isPlayingSound = false;
      audioBtn.classList.remove('playing');
      const label = audioBtn.querySelector('.audio-label');
      if (label) label.textContent = 'Audio: Ambient';
      showToast('Soundscape Muted');
    }
  }

  function startAmbientSound() {
    try {
      const AudioContext = window.AudioContext || window.webkitAudioContext;
      if (!audioCtx) {
        audioCtx = new AudioContext();
      }
      if (audioCtx.state === 'suspended') {
        audioCtx.resume();
      }

      // Create warm harmonic chord (F# Minor 9th — contemplative & luxury)
      const freqs = [185.00, 220.00, 277.18, 329.63, 440.00];
      const masterGain = audioCtx.createGain();
      masterGain.gain.setValueAtTime(0.001, audioCtx.currentTime);
      masterGain.gain.exponentialRampToValueAtTime(0.04, audioCtx.currentTime + 3);

      const filter = audioCtx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(450, audioCtx.currentTime);

      masterGain.connect(filter);
      filter.connect(audioCtx.destination);

      synthNodes = freqs.map((freq, idx) => {
        const osc = audioCtx.createOscillator();
        osc.type = idx % 2 === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, audioCtx.currentTime);

        const oscGain = audioCtx.createGain();
        oscGain.gain.setValueAtTime(0.3 / freqs.length, audioCtx.currentTime);

        // Subtle LFO modulation
        const lfo = audioCtx.createOscillator();
        lfo.frequency.setValueAtTime(0.1 + idx * 0.05, audioCtx.currentTime);
        const lfoGain = audioCtx.createGain();
        lfoGain.gain.setValueAtTime(2.0, audioCtx.currentTime);
        lfo.connect(lfoGain);
        lfoGain.connect(osc.frequency);
        lfo.start();

        osc.connect(oscGain);
        oscGain.connect(masterGain);
        osc.start();

        return { osc, lfo, oscGain, masterGain };
      });
    } catch (e) {
      console.warn('Web Audio could not be started:', e);
    }
  }

  function stopAmbientSound() {
    if (synthNodes.length > 0 && audioCtx) {
      synthNodes.forEach((node) => {
        try {
          node.masterGain.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 1.2);
          setTimeout(() => {
            node.osc.stop();
            node.lfo.stop();
          }, 1200);
        } catch (e) {}
      });
      synthNodes = [];
    }
  }

  if (audioBtn) {
    audioBtn.addEventListener('click', toggleSoundscape);
  }

  // ==========================================
  // 3. PERSPECTIVE TOGGLE (FOUNDER vs SCHOLAR)
  // ==========================================
  const founderBtn = document.getElementById('perspective-founder');
  const scholarBtn = document.getElementById('perspective-scholar');
  const heroBadgeText = document.getElementById('hero-perspective-badge');

  function setPerspective(mode) {
    const isScholar = mode === 'scholar';

    if (founderBtn && scholarBtn) {
      founderBtn.classList.toggle('active', !isScholar);
      scholarBtn.classList.toggle('active', isScholar);
    }

    if (heroBadgeText) {
      heroBadgeText.textContent = isScholar
        ? 'Legal Scholar • Corporate Jurisprudence'
        : 'E-Commerce Founder • Web Mall (Pvt) Ltd';
    }

    // Call 3D Scene updater
    if (window.set3DIdentityMode) {
      window.set3DIdentityMode(isScholar);
    }

    showToast(`Perspective Switched: ${isScholar ? 'The Scholar' : 'The Founder'}`);
  }

  if (founderBtn) {
    founderBtn.addEventListener('click', () => setPerspective('founder'));
  }
  if (scholarBtn) {
    scholarBtn.addEventListener('click', () => setPerspective('scholar'));
  }

  // ==========================================
  // 4. NAVBAR SCROLL & ACTIVE SECTION SPY
  // ==========================================
  const navbar = document.getElementById('main-navbar');
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    // Active spy
    let current = '';
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 120;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  }, { passive: true });

  // Mobile Menu Drawer
  const mobileToggle = document.getElementById('mobile-menu-toggle');
  const mobileDrawer = document.getElementById('mobile-nav-drawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (mobileToggle && mobileDrawer) {
    mobileToggle.addEventListener('click', () => {
      mobileDrawer.classList.toggle('open');
      const icon = mobileToggle.querySelector('i');
      if (icon) {
        icon.className = mobileDrawer.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
      }
    });

    mobileLinks.forEach((link) => {
      link.addEventListener('click', () => {
        mobileDrawer.classList.remove('open');
        const icon = mobileToggle.querySelector('i');
        if (icon) icon.className = 'fas fa-bars';
      });
    });
  }

  // ==========================================
  // 5. SCROLL REVEAL & SKILLS PROGRESS ANIMATION
  // ==========================================
  const revealElements = document.querySelectorAll('.reveal-on-scroll');
  const skillBars = document.querySelectorAll('.skill-progress-fill');

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  const skillObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const bar = entry.target;
          const targetWidth = bar.getAttribute('data-target-width') || '85%';
          bar.style.width = targetWidth;
          observer.unobserve(bar);
        }
      });
    },
    { threshold: 0.2 }
  );

  skillBars.forEach((bar) => skillObserver.observe(bar));

  // ==========================================
  // 6. MODAL DRAWER CASE STUDY VIEWER
  // ==========================================
  const modalOverlay = document.getElementById('luxury-modal-overlay');
  const modalCloseBtn = document.getElementById('modal-close-btn');
  const modalTitle = document.getElementById('modal-title');
  const modalSubtitle = document.getElementById('modal-subtitle');
  const modalBody = document.getElementById('modal-body');
  const modalTags = document.getElementById('modal-tags');
  const modalActionBtn = document.getElementById('modal-action-btn');

  function openModal(data) {
    if (!modalOverlay) return;

    if (modalTitle) modalTitle.textContent = data.title || 'Venture Showcase';
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle || '';
    if (modalBody) {
      if (typeof data.content === 'string') {
        modalBody.innerHTML = `<p class="mb-4">${data.content}</p>`;
      } else if (Array.isArray(data.content)) {
        modalBody.innerHTML = `
          <ul class="space-y-3">
            ${data.content.map((item) => `<li class="flex items-start gap-3 text-secondary"><span class="text-gold font-bold">•</span> <span>${item}</span></li>`).join('')}
          </ul>
        `;
      }
    }

    if (modalTags && data.tags) {
      modalTags.innerHTML = data.tags.map((t) => `<span class="tag-pill">${t}</span>`).join('');
    } else if (modalTags) {
      modalTags.innerHTML = '';
    }

    if (modalActionBtn && data.link) {
      modalActionBtn.href = data.link;
      modalActionBtn.style.display = 'inline-flex';
      modalActionBtn.textContent = data.linkText || 'Explore External Link';
    } else if (modalActionBtn) {
      modalActionBtn.style.display = 'none';
    }

    modalOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeModal();
  });

  // Attach triggers to cards
  document.querySelectorAll('[data-modal-trigger]').forEach((card) => {
    card.addEventListener('click', (e) => {
      const ventureId = card.getAttribute('data-modal-trigger');
      if (typeof portfolioData !== 'undefined' && portfolioData.ventures) {
        const venture = portfolioData.ventures.find((v) => v.id === ventureId);
        if (venture) {
          openModal({
            title: venture.title,
            subtitle: `${venture.role} • ${venture.period}`,
            content: venture.highlights,
            tags: venture.tags,
            link: venture.link,
            linkText: 'Visit Summit / Event Record'
          });
        }
      }
    });
  });

  // Resume / CV Preview Modal Trigger
  const resumeBtn = document.getElementById('view-resume-modal-btn');
  if (resumeBtn) {
    resumeBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal({
        title: 'Hannah Elangovan — Professional Profile & Qualifications',
        subtitle: 'E-Commerce Founder (Web Mall Pvt Ltd) & LL.B Scholar (University of London)',
        content: [
          'Founder & CEO of Web Mall (Pvt) Ltd: 3+ years scaling digital retail, supplier relationships, social commerce, and operations.',
          'Bachelor of Laws (LL.B) at University of London (July 2024 — Present): Corporate jurisprudence, international commercial contracts, and IP law.',
          'Keynote Speaker & Resource Person at ANTHA PRERNA 2025, Kochi Business School, Cochin, Kerala, India.',
          'Dip.LCM (TD) in Drama & Communication Teaching — University of West London (LCME, 2023).',
          'Diploma in Special Needs Education — London School of Business & Social Sciences (2023).',
          'All-Island Winner at British Performing Arts Festivals across diverse speech and rhetorical categories.'
        ],
        tags: ['E-Commerce Founder', 'LL.B University of London', 'Keynote Speaker', 'LCME Teaching Diploma', 'Contract Law', 'Brand Strategy'],
        link: 'https://linkedin.com/in/hannah-elangovan-186a54355',
        linkText: 'Connect on LinkedIn'
      });
    });
  }

  // ==========================================
  // 7. INTERACTIVE CONTACT FORM & TOAST
  // ==========================================
  const contactForm = document.getElementById('consultation-form');
  const toastNotification = document.getElementById('toast-notification');
  let toastTimeout = null;

  function showToast(message) {
    if (!toastNotification) return;
    const msgEl = toastNotification.querySelector('.toast-message');
    if (msgEl) msgEl.textContent = message;
    toastNotification.classList.add('show');
    clearTimeout(toastTimeout);
    toastTimeout = setTimeout(() => {
      toastNotification.classList.remove('show');
    }, 4000);
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = contactForm.querySelector('#contact-name')?.value || 'Inquirer';
      const email = contactForm.querySelector('#contact-email')?.value || '';
      const subject = contactForm.querySelector('#contact-subject')?.value || 'Portfolio Inquiry';
      const message = contactForm.querySelector('#contact-message')?.value || '';

      // Direct mailto bridge
      const mailtoUrl = `mailto:hannahpanthea@gmail.com?subject=${encodeURIComponent(subject + ' - ' + name)}&body=${encodeURIComponent('From: ' + name + ' (' + email + ')\n\n' + message)}`;
      window.open(mailtoUrl, '_blank');

      showToast(`Thank you, ${name}. Your inquiry draft has been prepared!`);
      contactForm.reset();
    });
  }

  window.showToast = showToast;
  window.openModal = openModal;
})();
