// Scroll-triggered reveals
const revealElements = document.querySelectorAll('.reveal, .reveal-stagger');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.15 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

// KPI Counters
const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;

const animateCounter = (el, endValue) => {
  const startValue = 0;
  const duration = 1600;
  const startTime = performance.now();

  const easeOutQuart = (x) => 1 - Math.pow(1 - x, 4);

  const update = (currentTime) => {
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);
    const easedProgress = easeOutQuart(progress);
    
    const value = Math.floor(startValue + (endValue - startValue) * easedProgress);
    el.textContent = value;
    
    if (progress < 1) {
      requestAnimationFrame(update);
    }
  };

  requestAnimationFrame(update);
};

if (counters.length > 0) {
  const counterHost = document.querySelector('.hero-panel') || document.querySelector('.hero');
  if (counterHost) {
    const counterObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !countersStarted) {
            countersStarted = true;
            counters.forEach((counter) => {
              const target = Number(counter.dataset.counter || 0);
              animateCounter(counter, target);
            });
            counterObserver.disconnect();
          }
        });
      },
      { threshold: 0.4 }
    );

    counterObserver.observe(counterHost);
  }
}

// Subtle Parallax Effect for Hero
window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxEl = document.querySelector('.hero-panel');
  if (parallaxEl && window.innerWidth > 1024) {
    const speed = 0.08;
    parallaxEl.style.transform = `translateY(${scrolled * speed}px)`;
  }
});

// Mobile Menu
const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const opened = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });
}

// Video Slider
const track = document.getElementById('videoTrack');
const prevBtn = document.getElementById('prevBtn');
const nextBtn = document.getElementById('nextBtn');

if (track && prevBtn && nextBtn) {
  const getStep = () => {
    const card = track.querySelector('.video-card');
    if (!card) return 420;
    const gap = parseInt(getComputedStyle(track).gap, 10) || 16;
    return card.getBoundingClientRect().width + gap;
  };

  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getStep(), behavior: 'smooth' });
  });

  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getStep(), behavior: 'smooth' });
  });
}

// Theme Management
const themeToggle = document.getElementById('themeToggle');
const currentTheme = localStorage.getItem('theme') || 'dark';

if (currentTheme === 'light') {
  document.documentElement.setAttribute('data-theme', 'light');
  updateThemeIcon('light');
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const theme = document.documentElement.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    updateThemeIcon(theme);
  });
}

function updateThemeIcon(theme) {
  const icon = themeToggle.querySelector('i');
  if (icon && typeof lucide !== 'undefined') {
    if (theme === 'light') {
      icon.setAttribute('data-lucide', 'moon');
    } else {
      icon.setAttribute('data-lucide', 'sun');
    }
    lucide.createIcons();
  }
}

// Contact Form
const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const isEnglish = document.documentElement.lang === 'en';
      submitBtn.textContent = isEnglish ? 'Request Received' : 'Talebiniz alındı';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';
    }
  });
}

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}
