/* ═══════════════════════════════════════════════
   main.js — Header interactivity & Form Handling
════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Burger menu (mobile) ──────────────────── */
  const header       = document.querySelector('.header__inner');
  const mobileMenu   = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  const burger = document.createElement('button');
  burger.className = 'header__burger';
  burger.setAttribute('aria-label', 'Открыть меню');
  burger.setAttribute('aria-expanded', 'false');
  burger.innerHTML = '<span></span><span></span><span></span>';
  header.appendChild(burger);

  function openMenu() {
    mobileMenu.classList.add('is-open');
    mobileOverlay.classList.add('is-active');
    burger.classList.add('is-open');
    burger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    mobileMenu.classList.remove('is-open');
    mobileOverlay.classList.remove('is-active');
    burger.classList.remove('is-open');
    burger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  burger.addEventListener('click', () => {
    burger.classList.contains('is-open') ? closeMenu() : openMenu();
  });

  mobileOverlay.addEventListener('click', closeMenu);

  mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeMenu);
  });

  document.addEventListener('keydown', e => {
    if (e.key === 'Escape') closeMenu();
  });


  /* ── Header shadow on scroll ───────────────── */
  const headerEl = document.querySelector('.header');

  const handleScroll = () => {
    if (window.scrollY > 10) {
      headerEl.style.boxShadow = '0 2px 12px rgba(30,43,29,0.08)';
    } else {
      headerEl.style.boxShadow = 'none';
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });


  /* ── Smooth anchor scroll ──────────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      const headerH = headerEl.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });

  /* ── Form Validation & EmailJS ──────────────── */
  
  // 1. Инициализация маски телефона (нужна библиотека IMask в HTML)
  const phoneInput = document.querySelector('input[name="user_phone"]');
  let phoneMask;
  
  if (phoneInput && typeof IMask !== 'undefined') {
      phoneMask = IMask(phoneInput, {
          mask: '+{7} (000) 000-00-00'
      });
  }

  const contactForm = document.getElementById('contact-form');
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();

          const btn = document.getElementById('submit-btn');
          
          // Проверка маски телефона
          if (phoneMask && !phoneMask.masked.isComplete) {
              alert('Пожалуйста, введите номер телефона полностью.');
              phoneInput.focus();
              return;
          }

          // Если всё ок — отправляем через EmailJS
          btn.innerText = 'ОТПРАВКА...';
          btn.disabled = true;

          // Замените YOUR_SERVICE_ID и YOUR_TEMPLATE_ID на свои
          emailjs.sendForm('service_6h5azal', 'template_fzqtn7s', this)
            .then(() => {
                alert('Спасибо! Заявка успешно отправлена.');
                contactForm.reset();
                if (phoneMask) phoneMask.updateValue(); // Сброс маски
                btn.innerText = 'ОТПРАВИТЬ ЗАЯВКУ';
                btn.disabled = false;
            }, (error) => {
                alert('Ошибка при отправке: ' + JSON.stringify(error));
                btn.innerText = 'ОТПРАВИТЬ ЗАЯВКУ';
                btn.disabled = false;
            });
      });
  }

}); 