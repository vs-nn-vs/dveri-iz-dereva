/* ── Инициализация EmailJS (перенесено из email-sender.js) ── */
(function() {
    // Ваш Public Key для связи с сервисом EmailJS
    emailjs.init("gVG3uJSKnmmEg95ex");[cite: 6]
})();

/* ═══════════════════════════════════════════════
   common.js — Логика меню, слайдера и форм
════════════════════════════════════════════════ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Burger menu (мобильная навигация) ───────── */
  const header = document.querySelector('.header__inner');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileOverlay = document.getElementById('mobileOverlay');

  if (header) {
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

    if (mobileOverlay) mobileOverlay.addEventListener('click', closeMenu);

    if (mobileMenu) {
      mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', closeMenu);
      });
    }

    document.addEventListener('keydown', e => {
      if (e.key === 'Escape') closeMenu();
    });
  }


  /* ── Тень шапки при скролле ─────────────────── */
  const headerEl = document.querySelector('.header');

  const handleScroll = () => {
    if (headerEl) {
      if (window.scrollY > 10) {
        headerEl.style.boxShadow = '0 2px 12px rgba(30,43,29,0.08)';
      } else {
        headerEl.style.boxShadow = 'none';
      }
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });


  /* ── Плавный скролл по якорям ───────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (!target || !headerEl) return;
      e.preventDefault();
      const headerH = headerEl.offsetHeight;
      const top = target.getBoundingClientRect().top + window.scrollY - headerH;
      window.scrollTo({ top, behavior: 'smooth' });
    });
  });


  /* ── Swiper Slider (Отзывы) ─────────────────── */
  if (document.querySelector('.reviews-slider')) {
    const swiper = new Swiper('.reviews-slider', {
      slidesPerView: 3,
      spaceBetween: 80,
      loop: true,
      grabCursor: true,
      speed: 800,
      navigation: {
        nextEl: '.reviews__btn--next',
        prevEl: '.reviews__btn--prev',
        disabledClass: 'reviews__btn--disabled',
      },
      breakpoints: {
        320: { slidesPerView: 1, spaceBetween: 20 },
        768: { slidesPerView: 2, spaceBetween: 40 },
        1200: { slidesPerView: 3, spaceBetween: 80 }
      }
    });
  }

 
  /* ── Валидация формы и отправка через EmailJS ── */
  const phoneInput = document.querySelector('input[name="user_phone"]');[cite: 5]
  let phoneMask;
  
  // Применяем маску к полю телефона, если библиотека IMask подключена
  if (phoneInput && typeof IMask !== 'undefined') {
      phoneMask = IMask(phoneInput, {
          mask: '+{7} (000) 000-00-00'
      });[cite: 5]
  }

  const contactForm = document.getElementById('contact-form');[cite: 5]
  
  if (contactForm) {
      contactForm.addEventListener('submit', function(event) {
          event.preventDefault();
          const btn = document.getElementById('submit-btn');[cite: 5]
          
          // Проверка на корректность заполнения маски
          if (phoneMask && !phoneMask.masked.isComplete) {[cite: 5]
              alert('Пожалуйста, введите номер телефона полностью.');
              phoneInput.focus();
              return;
          }

          // Визуальное состояние кнопки при отправке
          btn.innerText = 'ОТПРАВКА...';[cite: 5]
          btn.disabled = true;[cite: 5]

          // Отправка данных формы через ваши Service ID и Template ID
          emailjs.sendForm('service_6h5azal', 'template_fzqtn7s', this)[cite: 5, 6]
            .then(() => {
                alert('Спасибо! Заявка успешно отправлена.');[cite: 5]
                contactForm.reset(); // Очистка всех полей
                if (phoneMask) phoneMask.updateValue(); // Сброс маски
                btn.innerText = 'ОТПРАВИТЬ ЗАЯВКУ';
                btn.disabled = false;
            }, (error) => {
                alert('Ошибка при отправке: ' + JSON.stringify(error));[cite: 5]
                btn.innerText = 'ОТПРАВИТЬ ЗАЯВКУ';
                btn.disabled = false;
            });
      });
  }
});
