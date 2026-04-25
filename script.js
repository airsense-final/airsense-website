const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    },
    { threshold: 0.14 }
  );

  revealElements.forEach((el) => revealObserver.observe(el));
}

const counters = document.querySelectorAll('[data-counter]');
let countersStarted = false;

const animateCounter = (el, endValue) => {
  const startValue = 0;
  const duration = 1200;
  const startTime = performance.now();

  const update = (currentTime) => {
    const progress = Math.min((currentTime - startTime) / duration, 1);
    const value = Math.floor(startValue + (endValue - startValue) * progress);
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
      { threshold: 0.45 }
    );

    counterObserver.observe(counterHost);
  }
}

const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');

if (menuToggle && mainNav) {
  menuToggle.addEventListener('click', () => {
    const opened = mainNav.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(opened));
  });
}

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

const form = document.querySelector('.contact-form');
if (form) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const submitBtn = form.querySelector('button[type="submit"]');
    if (submitBtn) {
      const isEnglish = document.documentElement.lang === 'en';
      submitBtn.textContent = isEnglish ? 'Request Received' : 'Talebiniz alindi';
      submitBtn.disabled = true;
      submitBtn.style.opacity = '0.8';
    }
  });
}

if (typeof lucide !== "undefined") {
  lucide.createIcons();
}

