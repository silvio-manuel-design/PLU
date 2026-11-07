/**
 * KI Academy Premium — Main JavaScript (v3 Experience Engine)
 * ITCSS + BEM compatible
 * Handles: nav, theme, classroom, scroll reveals, command palette,
 *          progress bar, quizzes, mirror test, prompt practice,
 *          localStorage completion tracking, celebration toasts
 */

(function () {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const STORAGE_KEY = 'plu-premium-progress';

  /* ============================================
     UTILITIES
     ============================================ */
  function throttle(fn, limit) {
    let inThrottle;
    return function (...args) {
      if (!inThrottle) {
        fn.apply(this, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  function getStoredProgress() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  function setStoredProgress(data) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (e) {}
  }

  function getCurrentModuleId() {
    const path = window.location.pathname;
    const match = path.match(/module-(\d{2})/);
    return match ? match[1] : null;
  }

  /* ============================================
     HEADER SCROLL EFFECT
     ============================================ */
  function initHeader() {
    const header = document.getElementById('header');
    if (!header) return;

    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          header.classList.toggle('is-scrolled', window.scrollY > 50);
          ticking = false;
        });
        ticking = true;
      }
    }, { passive: true });
  }

  /* ============================================
     MOBILE NAVIGATION
     ============================================ */
  function initMobileNav() {
    const toggle = document.getElementById('mobile-toggle');
    const nav = document.getElementById('mobile-nav');
    const backdrop = document.getElementById('mobile-nav-backdrop');
    const closeBtn = document.getElementById('mobile-nav-close');
    const links = nav?.querySelectorAll('a');

    if (!toggle || !nav) return;

    function open() {
      toggle.setAttribute('aria-expanded', 'true');
      nav.classList.add('is-open');
      nav.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    }

    function close() {
      toggle.setAttribute('aria-expanded', 'false');
      nav.classList.remove('is-open');
      nav.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', () => {
      nav.classList.contains('is-open') ? close() : open();
    });

    closeBtn?.addEventListener('click', close);
    backdrop?.addEventListener('click', close);
    links?.forEach(link => link.addEventListener('click', close));

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('is-open')) close();
    });
  }

  /* ============================================
     MODULE DROPDOWN
     ============================================ */
  function initModuleDropdown() {
    const dropdown = document.getElementById('module-dropdown');
    const toggle = dropdown?.querySelector('.academy-module-dropdown__toggle');
    if (!dropdown || !toggle) return;

    function open() {
      dropdown.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    function close() {
      dropdown.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.contains('is-open') ? close() : open();
    });

    dropdown.querySelectorAll('a').forEach(link => link.addEventListener('click', close));

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) close();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') close();
    });

    // Hover support for desktop (non-touch devices)
    const isTouchDevice = window.matchMedia('(hover: none)').matches;
    if (!isTouchDevice) {
      dropdown.addEventListener('mouseenter', open);
      dropdown.addEventListener('mouseleave', close);
    }
  }

  /* ============================================
     THEME TOGGLE
     ============================================ */
  function initTheme() {
    const toggles = document.querySelectorAll('.theme-toggle-btn');
    const html = document.documentElement;
    let stored = null;
    try {
      stored = localStorage.getItem('plu-theme');
    } catch (e) {
      console.warn('localStorage not available');
    }

    function apply(theme) {
      if (theme === 'light') {
        html.classList.add('light-theme');
        html.setAttribute('data-theme', 'light');
      } else {
        html.classList.remove('light-theme');
        html.setAttribute('data-theme', 'dark');
      }
      toggles.forEach(toggle => {
        const icon = toggle.querySelector('i');
        if (icon) {
          icon.classList.toggle('ph-moon', theme !== 'light');
          icon.classList.toggle('ph-sun', theme === 'light');
        }
      });
    }

    if (stored) {
      apply(stored);
    } else if (window.matchMedia('(prefers-color-scheme: light)').matches) {
      apply('light');
    }

    toggles.forEach(toggle => {
      toggle.addEventListener('click', () => {
        const isLight = html.classList.contains('light-theme');
        const next = isLight ? 'dark' : 'light';
        apply(next);
        try {
          localStorage.setItem('plu-theme', next);
        } catch (e) {}
      });
    });
  }

  /* ============================================
     CLASSROOM MODE
     ============================================ */
  function initClassroom() {
    const toggle = document.getElementById('classroom-toggle');
    if (!toggle) return;

    function updateClassroomState() {
      const isActive = document.documentElement.classList.contains('classroom-mode');
      toggle.classList.toggle('active', isActive);
      try {
        localStorage.setItem('plu-classroom', isActive ? 'true' : 'false');
      } catch (e) {}
    }

    toggle.addEventListener('click', () => {
      document.documentElement.classList.toggle('classroom-mode');
      updateClassroomState();
    });

    try {
      if (localStorage.getItem('plu-classroom') === 'true') {
        document.documentElement.classList.add('classroom-mode');
      }
    } catch (e) {}
    updateClassroomState();
  }

  /* ============================================
     BACK TO TOP
     ============================================ */
  function initBackToTop() {
    const btn = document.getElementById('back-to-top');
    const mobileBtn = document.getElementById('back-to-top-mobile');
    const bottomNav = document.querySelector('.module-nav-footer');

    window.addEventListener('scroll', () => {
      const show = window.scrollY > 500;
      if (btn) btn.classList.toggle('visible', show);
      if (mobileBtn) mobileBtn.classList.toggle('visible', show);
      if (bottomNav) bottomNav.classList.toggle('is-visible', show);
    }, { passive: true });

    function scrollToTop() {
      window.scrollTo({ top: 0, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
    }

    if (btn) {
      btn.addEventListener('click', scrollToTop);
    }
    if (mobileBtn) {
      mobileBtn.addEventListener('click', scrollToTop);
    }
  }

  /* ============================================
     SCROLL REVEAL
     ============================================ */
  function initReveal() {
    if (prefersReducedMotion) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(el => observer.observe(el));

    /* SAFETY NET: In eingeschränkten Umgebungen (Schul-Proxy,
       ältere Browser) feuert der Observer manchmal nicht.
       Nach 3 Sekunden werden alle noch unsichtbaren Elemente
       automatisch sichtbar gemacht. */
    setTimeout(() => {
      document.querySelectorAll('[data-reveal]:not(.is-revealed)').forEach(el => {
        el.classList.add('is-revealed');
      });
    }, 3000);
  }

  /* ============================================
     SMOOTH SCROLL ANCHORS
     ============================================ */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;
        const target = document.querySelector(href);
        if (!target) return;
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });
  }

  /* ============================================
     COMMAND PALETTE
     ============================================ */
  function initCommandPalette() {
    const palette = document.getElementById('command-palette');
    const input = document.getElementById('cmd-input');
    const results = document.getElementById('cmd-results');
    const backdrop = document.getElementById('cmd-backdrop');
    if (!palette || !input || !results) return;

    const isEnglish = document.documentElement.lang === 'en' || window.location.pathname.includes('/en/');

    const itemsDe = [
      { title: 'Startseite', url: 'index.html', section: 'Navigation' },
      { title: 'Willkommen', url: 'modules/de/00-willkommen/module-00.html', section: 'Sprint 1' },
      { title: 'Grundlagen', url: 'modules/de/01-grundlagen/module-01.html', section: 'Sprint 1' },
      { title: 'Alltag', url: 'modules/de/02-alltag/module-02.html', section: 'Sprint 1' },
      { title: 'Kommunikation', url: 'modules/de/03-kommunikation/module-03.html', section: 'Sprint 2' },
      { title: 'Dialog-Basis', url: 'modules/de/04-dialog-grundlagen/module-04.html', section: 'Sprint 2' },
      { title: 'Dialog-Profi', url: 'modules/de/05-dialog-profi/module-05.html', section: 'Sprint 2' },
      { title: 'Kreativität', url: 'modules/de/06-kreativitaet/module-06.html', section: 'Sprint 3' },
      { title: 'Kritisches Denken', url: 'modules/de/07-kritisches-denken/module-07.html', section: 'Sprint 3' },
      { title: 'Glossar', url: 'modules/de/08-glossar/module-08.html', section: 'Sprint 3' },
      { title: 'Zertifikat', url: 'modules/de/09-zertifikat/module-09.html', section: 'Abschluss' },
    ];

    const itemsEn = [
      { title: 'Home', url: 'index-en.html', section: 'Navigation' },
      { title: 'Welcome', url: 'modules/en/00-welcome/module-00.html', section: 'Sprint 1' },
      { title: 'Basics', url: 'modules/en/01-basics/module-01.html', section: 'Sprint 1' },
      { title: 'Everyday', url: 'modules/en/02-everyday/module-02.html', section: 'Sprint 1' },
      { title: 'Communication', url: 'modules/en/03-communication/module-03.html', section: 'Sprint 2' },
      { title: 'Dialog Basics', url: 'modules/en/04-dialog-basics/module-04.html', section: 'Sprint 2' },
      { title: 'Dialog Pro', url: 'modules/en/05-dialog-pro/module-05.html', section: 'Sprint 2' },
      { title: 'Creativity', url: 'modules/en/06-creativity/module-06.html', section: 'Sprint 3' },
      { title: 'Critical Thinking', url: 'modules/en/07-critical-thinking/module-07.html', section: 'Sprint 3' },
      { title: 'Glossary', url: 'modules/en/08-glossary/module-08.html', section: 'Sprint 3' },
      { title: 'Certificate', url: 'modules/en/09-certificate/module-09.html', section: 'Completion' },
    ];

    const items = isEnglish ? itemsEn : itemsDe;
    let selectedIndex = -1;

    function open() {
      palette.hidden = false;
      palette.classList.add('is-open');
      input.value = '';
      input.focus();
      render(items);
    }

    function close() {
      palette.classList.remove('is-open');
      setTimeout(() => { palette.hidden = true; }, 200);
      selectedIndex = -1;
    }

    function render(list) {
      if (!list.length) {
        results.innerHTML = '<div class="command-palette__item"><span class="text-muted">' + (isEnglish ? 'No results' : 'Keine Ergebnisse') + '</span></div>';
        return;
      }
      results.innerHTML = list.map((item, i) => `
        <a href="${item.url}" class="command-palette__item ${i === selectedIndex ? 'is-selected' : ''}" data-index="${i}">
          <svg class="command-palette__item-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 18l6-6-6-6"/></svg>
          <div>
            <div class="command-palette__item-title">${item.title}</div>
            <div class="command-palette__item-desc">${item.section}</div>
          </div>
        </a>
      `).join('');
    }

    document.addEventListener('keydown', (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        palette.hidden ? open() : close();
      }
      if (e.key === 'Escape' && !palette.hidden) {
        e.preventDefault();
        close();
      }
    });

    backdrop?.addEventListener('click', close);

    input.addEventListener('input', () => {
      const q = input.value.toLowerCase();
      const filtered = items.filter(i => i.title.toLowerCase().includes(q) || i.section.toLowerCase().includes(q));
      selectedIndex = -1;
      render(filtered);
    });

    input.addEventListener('keydown', (e) => {
      const visible = results.querySelectorAll('.command-palette__item');
      if (e.key === 'ArrowDown') {
        e.preventDefault();
        selectedIndex = Math.min(selectedIndex + 1, visible.length - 1);
        visible.forEach((el, i) => el.classList.toggle('is-selected', i === selectedIndex));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        selectedIndex = Math.max(selectedIndex - 1, 0);
        visible.forEach((el, i) => el.classList.toggle('is-selected', i === selectedIndex));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = visible[selectedIndex];
        if (selected) {
          window.location.href = selected.getAttribute('href');
        }
      }
    });
  }

  /* ============================================
     TYPEWRITER EFFECT
     ============================================ */
  function initTypewriter() {
    if (prefersReducedMotion) return;
    const texts = document.querySelectorAll('.typewriter-text');
    if (!texts.length) return;

    let delay = 0;
    texts.forEach((el) => {
      const fullText = el.getAttribute('data-text') || el.textContent;
      el.textContent = '';
      let i = 0;
      const speed = 40;
      setTimeout(() => {
        const interval = setInterval(() => {
          el.textContent += fullText.charAt(i);
          i++;
          if (i >= fullText.length) clearInterval(interval);
        }, speed);
      }, delay);
      delay += fullText.length * speed + 300;
    });
  }

  /* ============================================
     PARALLAX CTA BACKGROUND
     ============================================ */
  function initParallax() {
    // Disable parallax on mobile — static cover image is more reliable
    const isMobile = window.matchMedia('(max-width: 1023px)').matches;
    if (isMobile) return;

    // Support both startpage CTA and module parallax sections
    const parallaxImages = document.querySelectorAll('.academy-cta__bg img, .parallax-bg img');
    if (!parallaxImages.length) return;

    window.addEventListener('scroll', () => {
      parallaxImages.forEach(img => {
        const container = img.closest('.academy-cta') || img.closest('.parallax-section') || img.closest('.parallax-bg')?.parentElement;
        if (!container) return;
        const rect = container.getBoundingClientRect();
        const speed = 0.3;
        const rawOffset = rect.top * speed;
        // Limit offset to 10% of image height to prevent gaps
        const maxOffset = img.offsetHeight * 0.10;
        const offset = Math.max(-maxOffset, Math.min(maxOffset, rawOffset));
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          img.style.transform = `translateY(${offset}px)`;
        }
      });
    }, { passive: true });
  }

  /* ============================================
     PROGRESS BAR & MODULE TRACKING
     ============================================ */
  function initProgressAndTracking() {
    const fill = document.getElementById('module-progress-fill');
    const moduleId = getCurrentModuleId();
    if (!moduleId) return;

    const progress = getStoredProgress();
    const key = `m${moduleId}`;

    function updateFill() {
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const pct = docHeight > 0 ? Math.min(100, Math.max(0, (window.scrollY / docHeight) * 100)) : 0;
      if (fill) fill.style.width = pct + '%';
      return pct;
    }

    const throttled = throttle(() => {
      const pct = updateFill();
      progress[key] = Math.max(progress[key] || 0, Math.round(pct));
      setStoredProgress(progress);
      if (pct >= 85) {
        showCelebration(moduleId);
      }
    }, 300);

    window.addEventListener('scroll', throttled, { passive: true });
    updateFill();

    // Mark as visited immediately
    if (!progress.visited) progress.visited = [];
    if (!progress.visited.includes(key)) {
      progress.visited.push(key);
      setStoredProgress(progress);
    }
  }

  /* ============================================
     CELEBRATION TOAST
     ============================================ */
  let celebratedModules = new Set();

  function showCelebration(moduleId) {
    if (celebratedModules.has(moduleId)) return;
    celebratedModules.add(moduleId);

    const isEnglish = document.documentElement.lang === 'en';
    const msg = isEnglish
      ? '🎉 Sprint progress saved! You\'re mastering this.'
      : '🎉 Sprint-Fortschritt gespeichert! Sie meistern das.';

    const toast = document.createElement('div');
    toast.className = 'academy-toast';
    toast.setAttribute('role', 'status');
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<span>${msg}</span>`;
    document.body.appendChild(toast);

    requestAnimationFrame(() => {
      toast.classList.add('is-visible');
    });

    setTimeout(() => {
      toast.classList.remove('is-visible');
      setTimeout(() => toast.remove(), 400);
    }, 3200);
  }

  /* ============================================
     QUIZ ENGINE
     ============================================ */
  function initQuizzes() {
    const cards = document.querySelectorAll('.quiz-card');
    if (!cards.length) return;

    const isEnglish = document.documentElement.lang === 'en';
    const moduleId = getCurrentModuleId();
    const storageKey = moduleId ? `plu-premium-quiz-m${moduleId}` : null;
    let solvedCount = 0;

    cards.forEach((card, cardIndex) => {
      const options = card.querySelectorAll('.quiz-option');
      const explanationBox = card.querySelector('.quiz-explanation');
      if (!options.length) return;

      options.forEach(opt => {
        opt.addEventListener('click', () => {
          if (card.classList.contains('is-answered')) return;
          card.classList.add('is-answered');

          const isCorrect = opt.getAttribute('data-correct') === 'true';
          const explanation = opt.getAttribute('data-explanation') || '';

          options.forEach(o => {
            const correct = o.getAttribute('data-correct') === 'true';
            o.classList.add(correct ? 'is-correct' : 'is-incorrect');
            o.setAttribute('aria-disabled', 'true');
          });

          if (explanationBox) {
            explanationBox.innerHTML = `<p>${explanation}</p>`;
            explanationBox.classList.add('is-visible');
          }

          if (isCorrect) {
            solvedCount++;
            try {
              if (storageKey) {
                const stored = JSON.parse(localStorage.getItem(storageKey) || '[]');
                if (!stored.includes(cardIndex)) stored.push(cardIndex);
                localStorage.setItem(storageKey, JSON.stringify(stored));
              }
            } catch (e) {}
          }

          if (solvedCount === cards.length) {
            setTimeout(() => fireConfetti(), 300);
          }
        });
      });
    });
  }

  /* ============================================
     CONFETTI (lightweight canvas)
     ============================================ */
  function fireConfetti() {
    if (prefersReducedMotion) return;

    const canvas = document.createElement('canvas');
    canvas.style.position = 'fixed';
    canvas.style.inset = '0';
    canvas.style.pointerEvents = 'none';
    canvas.style.zIndex = '9999';
    document.body.appendChild(canvas);

    const ctx = canvas.getContext('2d');
    let width = canvas.width = window.innerWidth;
    let height = canvas.height = window.innerHeight;

    const colors = ['#90A955', '#F4A261', '#E76F51', '#F5D547', '#ffffff'];
    const particles = Array.from({ length: 120 }, () => ({
      x: width / 2,
      y: height / 2,
      vx: (Math.random() - 0.5) * 16,
      vy: (Math.random() - 0.5) * 16 - 4,
      size: Math.random() * 6 + 3,
      color: colors[Math.floor(Math.random() * colors.length)],
      life: 1,
      decay: Math.random() * 0.015 + 0.01,
    }));

    function loop() {
      ctx.clearRect(0, 0, width, height);
      let alive = false;
      particles.forEach(p => {
        if (p.life > 0) {
          alive = true;
          p.x += p.vx;
          p.y += p.vy;
          p.vy += 0.25; // gravity
          p.life -= p.decay;
          ctx.globalAlpha = Math.max(0, p.life);
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      });

      if (alive) {
        requestAnimationFrame(loop);
      } else {
        canvas.remove();
      }
    }

    requestAnimationFrame(loop);
    window.addEventListener('resize', () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    }, { once: true });
  }

  /* ============================================
     MIRROR TEST (Module 00)
     ============================================ */
  function initMirrorTest() {
    const cards = document.querySelectorAll('.mirror-test-card[data-perspective]');
    const resultBox = document.getElementById('mirror-result');
    if (!cards.length || !resultBox) return;

    resultBox.style.display = 'none';

    cards.forEach(card => {
      card.addEventListener('click', () => {
        const perspective = card.getAttribute('data-perspective');
        cards.forEach(c => c.classList.remove('is-selected'));
        card.classList.add('is-selected');

        const isEnglish = document.documentElement.lang === 'en';
        const messages = {
          threat: {
            title: isEnglish ? 'Understandable, but limiting' : 'Verständlich, aber limitierend',
            text: isEnglish
              ? 'This perspective is widespread. But KI is not a force of nature — it is a mirror. The more clearly you think, the better it responds.'
              : 'Diese Perspektive ist weit verbreitet. Aber KI ist keine Naturgewalt — sie ist ein Spiegel. Je klarer Sie denken, desto besser antwortet sie.'
          },
          tool: {
            title: isEnglish ? 'A good start' : 'Ein guter Anfang',
            text: isEnglish
              ? 'KI is indeed a tool. But it is more than a hammer or a calculator. It reflects your thinking and amplifies your clarity.'
              : 'KI ist tatsächlich ein Tool. Aber sie ist mehr als ein Hammer oder Taschenrechner. Sie spiegelt Ihr Denken und verstärkt Ihre Klarheit.'
          },
          partner: {
            title: isEnglish ? 'The Premium Mindset' : 'Die Premium-Mindset',
            text: isEnglish
              ? 'Exactly. KI does not replace you — it mirrors you. Those who approach it as a partner gain the most from it.'
              : 'Genau. KI ersetzt Sie nicht — sie spiegelt Sie. Wer sie als Partner begreift, profitiert am meisten davon.'
          }
        };

        const m = messages[perspective] || messages.tool;
        resultBox.innerHTML = `
          <h4>${m.title}</h4>
          <p>${m.text}</p>
        `;
        resultBox.style.display = 'block';
        resultBox.classList.add('is-visible');
        resultBox.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
      });
    });
  }

  /* ============================================
     PROMPT PRACTICE (Module 02)
     ============================================ */
  function initPromptPractice() {
    window.checkPrompt = function () {
      const textarea = document.getElementById('user-prompt');
      const feedback = document.getElementById('practice-feedback');
      if (!textarea || !feedback) return;

      const value = textarea.value.trim();
      const isEnglish = document.documentElement.lang === 'en';

      if (!value) {
        feedback.innerHTML = `<p class="practice-feedback__text">${isEnglish ? 'Please write a prompt first.' : 'Bitte schreiben Sie zuerst einen Prompt.'}</p>`;
        feedback.classList.remove('hidden');
        return;
      }

      const length = value.length;
      const hasContext = /\b(für|for|als|as|im Kontext|context|ziel|goal|zielgruppe|audience)\b/i.test(value);
      const hasConstraint = /\b(max|min|nicht mehr als|not more than|unter|under|format|struktur|structure)\b/i.test(value);
      const hasExample = /\b(beispiel|example|zum beispiel|for example|wie zum beispiel|such as)\b/i.test(value);

      let score = 0;
      if (length > 60) score += 1;
      if (hasContext) score += 1;
      if (hasConstraint) score += 1;
      if (hasExample) score += 1;

      let title, text, icon;
      if (score >= 3) {
        title = isEnglish ? 'Excellent prompt!' : 'Ausgezeichneter Prompt!';
        text = isEnglish
          ? 'You have provided context, constraints, and detail. This is exactly how professionals talk to AI.'
          : 'Sie haben Kontext, Rahmenbedingungen und Detailtiefe geliefert. Genau so sprechen Profis mit KI.';
        icon = '✓';
        fireConfetti();
      } else if (score >= 2) {
        title = isEnglish ? 'Good start' : 'Guter Anfang';
        text = isEnglish
          ? 'Your prompt is solid. Try adding more context or a specific format to make the result even better.'
          : 'Ihr Prompt ist solide. Versuchen Sie, mehr Kontext oder ein bestimmtes Format hinzuzufügen, um das Ergebnis noch besser zu machen.';
        icon = '↗';
      } else {
        title = isEnglish ? 'Room for improvement' : 'Noch Luft nach oben';
        text = isEnglish
          ? 'Try to be more specific. Who is the output for? What constraints apply? A good prompt is a clear brief.'
          : 'Versuchen Sie, spezifischer zu sein. Für wen ist das Ergebnis? Welche Rahmenbedingungen gelten? Ein guter Prompt ist ein klares Briefing.';
        icon = '⚡';
      }

      feedback.innerHTML = `
        <div class="practice-feedback__header">
          <span class="practice-feedback__icon">${icon}</span>
          <h4>${title}</h4>
        </div>
        <p class="practice-feedback__text">${text}</p>
        <div class="practice-feedback__meta">
          <span>${isEnglish ? 'Length' : 'Länge'}: ${length} ${isEnglish ? 'chars' : 'Zeichen'}</span>
          <span>${isEnglish ? 'Context' : 'Kontext'}: ${hasContext ? '✓' : '—'}</span>
          <span>${isEnglish ? 'Constraints' : 'Rahmen'}: ${hasConstraint ? '✓' : '—'}</span>
          <span>${isEnglish ? 'Example' : 'Beispiel'}: ${hasExample ? '✓' : '—'}</span>
        </div>
      `;
      feedback.classList.remove('hidden');
      feedback.scrollIntoView({ behavior: prefersReducedMotion ? 'auto' : 'smooth', block: 'nearest' });
    };
  }

  /* ============================================
     SPRINT / MODULE BADGES ON LANDING PAGE
     ============================================ */
  function initLandingBadges() {
    if (document.querySelector('.academy-page--module')) return; // only on landing

    const progress = getStoredProgress();
    const visited = new Set(progress.visited || []);
    const isEnglish = document.documentElement.lang === 'en';

    // Map sprint cards to their module IDs
    const sprints = document.querySelectorAll('.academy-sprint');
    const sprintModules = [
      ['m00', 'm01', 'm02'],
      ['m03', 'm04', 'm05'],
      ['m06', 'm07', 'm08']
    ];

    sprints.forEach((card, idx) => {
      const mods = sprintModules[idx];
      if (!mods) return;
      const completed = mods.filter(m => visited.has(m)).length;
      const total = mods.length;
      const pct = Math.round((completed / total) * 100);

      if (completed > 0) {
        const badge = document.createElement('div');
        badge.className = 'sprint-progress-badge' + (pct === 100 ? ' sprint-progress-badge--completed' : '');
        if (pct === 100) {
          badge.innerHTML = (isEnglish ? 'Sprint completed' : 'Sprint abgeschlossen') + ' <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3"><polyline points="20 6 9 17 4 12"/></svg>';
        } else {
          badge.textContent = (isEnglish ? 'Progress' : 'Fortschritt') + ': ' + pct + '%';
        }
        const btn = card.querySelector('.academy-btn');
        if (btn) {
          btn.parentNode.insertBefore(badge, btn);
        }
      }
    });
  }

  /* ============================================
     COPY TO CLIPBOARD (global utility)
     ============================================ */
  function initCopyButtons() {
    document.querySelectorAll('[data-copy-target]').forEach(btn => {
      btn.addEventListener('click', async () => {
        const targetId = btn.getAttribute('data-copy-target');
        const target = document.getElementById(targetId);
        const text = target ? (target.value || target.textContent || '').trim() : '';
        if (!text) return;
        try {
          await navigator.clipboard.writeText(text);
          const original = btn.textContent || btn.innerHTML;
          btn.innerHTML = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="20 6 9 17 4 12"/></svg> ' + (document.documentElement.lang === 'en' ? 'Copied' : 'Kopiert');
          setTimeout(() => { btn.innerHTML = original; }, 1500);
        } catch (e) {
          console.warn('Clipboard copy failed', e);
        }
      });
    });
  }

  /* ============================================
     INIT
     ============================================ */
  document.addEventListener('DOMContentLoaded', () => {
    initHeader();
    initParallax();
    initMobileNav();
    initModuleDropdown();
    initTheme();
    initClassroom();
    initBackToTop();
    initReveal();
    initSmoothScroll();
    initCommandPalette();
    initTypewriter();
    initProgressAndTracking();
    initQuizzes();
    initMirrorTest();
    initPromptPractice();
    initLandingBadges();
    initCopyButtons();
  });
})();
