/* ─── LOADING SCREEN ─────────────────────────────────── */

window.addEventListener('DOMContentLoaded', () => {
  const loadingScreen = document.getElementById('loading-screen');
  document.body.classList.add('loading');

  setTimeout(() => {
    loadingScreen.classList.add('hidden');
    document.body.classList.remove('loading');
  }, 1600);
});

/* ─── NAVBAR ─────────────────────────────────────────── */

const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}, { passive: true });

/* ─── MOBILE MENU ────────────────────────────────────── */

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.contains('open');
  if (isOpen) {
    closeMobileMenu();
  } else {
    openMobileMenu();
  }
});

function openMobileMenu() {
  mobileMenu.classList.add('open');
  hamburger.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeMobileMenu() {
  mobileMenu.classList.remove('open');
  hamburger.classList.remove('active');
  document.body.style.overflow = '';
}

/* ─── SMOOTH SCROLL ──────────────────────────────────── */

function scrollToSection(id) {
  const el = document.getElementById(id);
  if (!el) return;
  closeMobileMenu();
  const offset = 72;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: 'smooth' });
}

document.querySelectorAll('[data-scroll]').forEach(link => {
  link.addEventListener('click', e => {
    e.preventDefault();
    const target = link.getAttribute('data-scroll');
    scrollToSection(target);
  });
});

/* ─── SCROLL REVEAL ──────────────────────────────────── */

const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.08,
  rootMargin: '0px 0px -40px 0px'
});

revealElements.forEach(el => revealObserver.observe(el));

/* ─── GALLERY LIGHTBOX ───────────────────────────────── */

const lightbox      = document.getElementById('lightbox');
const lightboxImg   = document.getElementById('lightbox-img');
const lightboxClose = document.getElementById('lightbox-close');

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.querySelector('img').src;
    lightboxImg.src = src;
    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
});

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
  setTimeout(() => { lightboxImg.src = ''; }, 400);
}

lightboxClose.addEventListener('click', closeLightbox);

lightbox.addEventListener('click', e => {
  if (e.target === lightbox) closeLightbox();
});

/* ─── VIDEO MODAL ────────────────────────────────────── */

const videoModal  = document.getElementById('video-modal');
const videoClose  = document.getElementById('video-close');
const playBtn     = document.getElementById('play-video-btn');

if (playBtn) {
  playBtn.addEventListener('click', () => {
    videoModal.classList.add('active');
    document.body.style.overflow = 'hidden';
  });
}

function closeVideoModal() {
  videoModal.classList.remove('active');
  document.body.style.overflow = '';
}

videoClose.addEventListener('click', closeVideoModal);
videoModal.addEventListener('click', e => {
  if (e.target === videoModal) closeVideoModal();
});

/* ─── CONTACT FORM VALIDATION ────────────────────────── */

const form        = document.getElementById('contact-form');
const successMsg  = document.getElementById('form-success');

function getField(id)     { return document.getElementById(id); }
function getError(id)     { return document.getElementById(id + '-error'); }
function showError(id, msg) {
  const field = getField(id);
  const err   = getError(id);
  field.classList.add('error');
  err.textContent = msg;
  err.classList.add('visible');
}
function clearError(id) {
  const field = getField(id);
  const err   = getError(id);
  field.classList.remove('error');
  err.classList.remove('visible');
}

function validateEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

['form-name', 'form-email', 'form-message'].forEach(id => {
  const el = document.getElementById(id);
  if (el) {
    el.addEventListener('input', () => clearError(id));
  }
});

form.addEventListener('submit', e => {
  e.preventDefault();
  let valid = true;

  const name    = getField('form-name').value.trim();
  const email   = getField('form-email').value.trim();
  const message = getField('form-message').value.trim();

  clearError('form-name');
  clearError('form-email');
  clearError('form-message');

  if (name.length < 2) {
    showError('form-name', 'Please enter your name (min 2 characters).');
    valid = false;
  }
  if (!validateEmail(email)) {
    showError('form-email', 'Please enter a valid email address.');
    valid = false;
  }
  if (message.length < 10) {
    showError('form-message', 'Message must be at least 10 characters.');
    valid = false;
  }

  if (!valid) return;

  const submitBtn = form.querySelector('.btn-submit');
  submitBtn.textContent = 'Sending…';
  submitBtn.disabled = true;

  setTimeout(() => {
    form.style.display = 'none';
    successMsg.classList.add('visible');
  }, 900);
});

/* ─── KEYBOARD SHORTCUTS ─────────────────────────────── */

document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    closeLightbox();
    closeVideoModal();
    closeMobileMenu();
  }
});
