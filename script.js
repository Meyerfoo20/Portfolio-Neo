const themeToggleBtn = document.getElementById('theme-toggle');
const savedTheme = localStorage.getItem('theme') || 'light';

document.documentElement.setAttribute('data-theme', savedTheme);

themeToggleBtn.addEventListener('click', () => {
  const currentTheme = document.documentElement.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
  
  document.documentElement.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
});

const langBtns = document.querySelectorAll('.lang-btn');
const savedLang = localStorage.getItem('lang') || 'sv';

function setLanguage(lang) {
  document.documentElement.setAttribute('lang', lang);
  localStorage.setItem('lang', lang);

  langBtns.forEach(btn => {
    if (btn.getAttribute('data-lang-btn') === lang) {
      btn.classList.add('active');
    } else {
      btn.classList.remove('active');
    }
  });
}

setLanguage(savedLang);

langBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const lang = btn.getAttribute('data-lang-btn');
    setLanguage(lang);
  });
});

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('show');
      }
    });
  }, { threshold: 0.1 });
  
  document.querySelectorAll('.skill-card, .project-card').forEach(el => observer.observe(el));

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const navLinks = document.getElementById('nav-links');
  
  if (mobileMenuToggle && navLinks) {
    mobileMenuToggle.addEventListener('click', () => {
      mobileMenuToggle.classList.toggle('active');
      navLinks.classList.toggle('active');
    });
  
    document.querySelectorAll('.nav-links a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenuToggle.classList.remove('active');
        navLinks.classList.remove('active');
      });
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    const headerElements = document.querySelectorAll('.hero-main .location-tag, .hero-main h1, .hero-main .hero-italic');
    const bio = document.querySelector('.hero-bio');
    const buttons = document.querySelector('.hero-buttons');
  
    const svEl = bio ? bio.querySelector('.lang-sv') : null;
    const enEl = bio ? bio.querySelector('.lang-en') : null;
  
    let svText = '';
    let enText = '';
  
    // Spara texten och töm den DIREKT vid laddning så att den inte syns alls
    if (svEl && enEl) {
      svText = svEl.textContent;
      enText = enEl.textContent;
      svEl.textContent = '';
      enEl.textContent = '';
    }
  
    setTimeout(() => {
      headerElements.forEach(el => el.classList.add('fade-in'));
    }, 100);
  
    setTimeout(() => {
      if (bio) bio.classList.add('is-typing');
      
      startBioTypewriter(bio, svEl, enEl, svText, enText, () => {
        if (buttons) buttons.classList.add('fade-in');
      });
    }, 900);
  });
  
  function startBioTypewriter(container, svEl, enEl, svText, enText, onComplete) {
    if (!svEl || !enEl) return;
  
    container.classList.add('typing-active');
  
    let index = 0;
    const maxLen = Math.max(svText.length, enText.length);
  
    const interval = setInterval(() => {
      if (index < svText.length) svEl.textContent += svText[index];
      if (index < enText.length) enEl.textContent += enText[index];
  
      index++;
  
      if (index >= maxLen) {
        clearInterval(interval);
        container.classList.remove('typing-active');
        if (onComplete) onComplete();
      }
    }, 18);
  }