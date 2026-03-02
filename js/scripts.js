/* ============================================================
   scripts.js — Maatoug Guenaoui Portfolio
   Dark Mode | Scroll Animations | Navbar | Typing Effect
   ============================================================ */

(function () {

  /* ── 1. Theme (Dark / Light Mode) ────────────────────────── */
  const THEME_KEY = 'mg-theme';

  function getPreferredTheme() {
    const saved = localStorage.getItem(THEME_KEY);
    if (saved) return saved;
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem(THEME_KEY, theme);

    const btn = document.getElementById('theme-toggle');
    if (!btn) return;
    const icon = btn.querySelector('i');
    if (!icon) return;

    if (theme === 'dark') {
      icon.className = 'bi bi-sun-fill';
      btn.setAttribute('aria-label', 'Activer le mode clair');
      btn.title = 'Mode clair';
    } else {
      icon.className = 'bi bi-moon-stars-fill';
      btn.setAttribute('aria-label', 'Activer le mode sombre');
      btn.title = 'Mode sombre';
    }
  }

  function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme') || 'light';
    applyTheme(current === 'dark' ? 'light' : 'dark');
  }

  // Apply on load
  applyTheme(getPreferredTheme());

  document.addEventListener('DOMContentLoaded', function () {
    /* ── Attach theme toggle ── */
    const toggleBtn = document.getElementById('theme-toggle');
    if (toggleBtn) toggleBtn.addEventListener('click', toggleTheme);


    /* ── 2. Navbar: scroll effect & hamburger ─────────────── */
    const navbar = document.querySelector('.navbar');
    const hamburger = document.getElementById('nav-hamburger');
    const navLinks = document.getElementById('nav-links');

    if (navbar) {
      window.addEventListener('scroll', function () {
        if (window.scrollY > 20) {
          navbar.classList.add('scrolled');
        } else {
          navbar.classList.remove('scrolled');
        }
      }, { passive: true });
    }

    if (hamburger && navLinks) {
      hamburger.addEventListener('click', function () {
        const open = navLinks.classList.toggle('open');
        hamburger.classList.toggle('open', open);
        hamburger.setAttribute('aria-expanded', open);
      });

      // Close on link click
      navLinks.querySelectorAll('a').forEach(function (link) {
        link.addEventListener('click', function () {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        });
      });

      // Close on outside click
      document.addEventListener('click', function (e) {
        if (!navbar || (!navbar.contains(e.target))) {
          navLinks.classList.remove('open');
          hamburger.classList.remove('open');
          hamburger.setAttribute('aria-expanded', 'false');
        }
      });
    }


    /* ── 3. Active nav link ───────────────────────────────── */
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-links a').forEach(function (link) {
      const href = link.getAttribute('href');
      if (href === currentPage || (currentPage === '' && href === 'index.html')) {
        link.classList.add('active');
      }
    });


    /* ── 4. Scroll Reveal (IntersectionObserver) ──────────── */
    const revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.12,
      rootMargin: '0px 0px -40px 0px'
    });

    document.querySelectorAll('.reveal, .reveal-left').forEach(function (el) {
      revealObserver.observe(el);
    });


    /* ── 5. Typing Effect (Hero) ──────────────────────────── */
    const typingTarget = document.getElementById('typing-text');
    if (typingTarget) {
      const phrases = [
        'des applications web',
        'des interfaces modernes',
        'des expériences utilisateur',
        'des APIs performantes'
      ];
      let phraseIndex = 0;
      let charIndex = 0;
      let isDeleting = false;
      let typingSpeed = 80;

      function type() {
        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
          typingTarget.textContent = currentPhrase.substring(0, charIndex - 1);
          charIndex--;
          typingSpeed = 40;
        } else {
          typingTarget.textContent = currentPhrase.substring(0, charIndex + 1);
          charIndex++;
          typingSpeed = 80;
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = 2000; // pause before delete
        } else if (isDeleting && charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % phrases.length;
          typingSpeed = 500;
        }

        setTimeout(type, typingSpeed);
      }

      setTimeout(type, 1200);
    }


    /* ── 6. Page entrance animation ──────────────────────── */
    document.body.classList.add('page-enter');


    /* ── 7. Year in footer ────────────────────────────────── */
    const yearEls = document.querySelectorAll('.footer-year');
    yearEls.forEach(function (el) {
      el.textContent = new Date().getFullYear();
    });

  }); // DOMContentLoaded

})();