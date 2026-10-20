(() => {
  'use strict';

  const root = document.documentElement;
  const menuToggle = document.querySelector('.menu-toggle');
  const mainNav = document.querySelector('#main-nav');
  const themeToggle = document.querySelector('.theme-toggle');
  const themeMenu = document.querySelector('#theme-menu');
  const themeOptions = [...document.querySelectorAll('[data-theme-choice]')];
  const colorPicker = document.querySelector('.custom-option input[type="color"]');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Mobile navigation stays keyboard accessible and closes after a choice.
  const closeNav = () => {
    mainNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open navigation menu');
  };
  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    menuToggle.setAttribute('aria-label', expanded ? 'Open navigation menu' : 'Close navigation menu');
    mainNav.classList.toggle('is-open', !expanded);
  });
  mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', closeNav));

  // Theme selection and both storage accesses are guarded for private browsing.
  const saveTheme = (theme, accent) => {
    try {
      localStorage.setItem('dcasa-theme', theme);
      if (accent) localStorage.setItem('dcasa-accent', accent);
    } catch (_) { /* The current page theme still works without persistence. */ }
  };
  const updateThemeUI = () => {
    themeOptions.forEach(option => option.setAttribute('aria-pressed', String(option.dataset.themeChoice === root.dataset.theme)));
  };
  const applyTheme = (theme, accent) => {
    root.dataset.theme = theme;
    if (theme === 'custom' && /^#[0-9a-f]{6}$/i.test(accent || '')) {
      root.style.setProperty('--accent', accent);
      colorPicker.value = accent;
    } else {
      root.style.removeProperty('--accent');
    }
    saveTheme(theme, theme === 'custom' ? (accent || colorPicker.value) : null);
    updateThemeUI();
  };
  const closeThemeMenu = () => {
    themeMenu.hidden = true;
    themeToggle.setAttribute('aria-expanded', 'false');
  };
  themeToggle.addEventListener('click', () => {
    const open = themeToggle.getAttribute('aria-expanded') === 'true';
    themeToggle.setAttribute('aria-expanded', String(!open));
    themeMenu.hidden = open;
  });
  themeOptions.forEach(option => option.addEventListener('click', () => {
    if (option.dataset.themeChoice) applyTheme(option.dataset.themeChoice);
  }));
  colorPicker.addEventListener('input', event => applyTheme('custom', event.target.value));
  document.addEventListener('click', event => {
    if (!event.target.closest('.theme-wrap')) closeThemeMenu();
  });
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeNav();
      closeThemeMenu();
    }
  });
  updateThemeUI();

  // Reveal only when motion is allowed; unsupported browsers show all content.
  const revealItems = document.querySelectorAll('.reveal');
  if (!reduceMotion && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: 0.12 });
    revealItems.forEach(item => observer.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('is-visible'));
  }

  // Track visible page sections and mark the corresponding navigation link.
  const navLinks = [...document.querySelectorAll('.main-nav a')];
  const sections = [...document.querySelectorAll('main section[id]')];
  if ('IntersectionObserver' in window) {
    const navObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${entry.target.id}`) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-28% 0px -62% 0px' });
    sections.forEach(section => navObserver.observe(section));
  }

  const year = document.querySelector('#current-year');
  year.textContent = new Date().getFullYear();
})();
