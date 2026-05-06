 /* ═══════════════════════════════════════════════
   common.js — Логика меню, слайдера и форм
════════════════════════════════════════════════ */
 
document.addEventListener('DOMContentLoaded', () => {
 
  /* ── Инициализация EmailJS ── */
  if (typeof emailjs !== 'undefined') {
    emailjs.init("gVG3uJSKnmmEg95ex"); // Ваш Public Key
  } else {
    console.error("Ошибка: Библиотека EmailJS не загружена. Проверьте подключение в HTML.");
  }
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
      if (!mobileMenu || !mobileOverlay) return;
      mobileMenu.classList.add('is-open');
      mobileOverlay.classList.add('is-active');
      burger.classList.add('is-open');
      burger.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
    }
 
    function closeMenu() {
      if (!mobileMenu || !mobileOverlay) return;
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
      headerEl.style.boxShadow = window.scrollY > 10
        ? '0 2px 12px rgba(30,43,29,0.08)'
        : 'none';
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
    new Swiper('.reviews-slider', {
      slidesPerView: 3,
      spaceBetween: 80,
      loop: true,
      grabCursor: true,
      speed: 800,
      navigation: {
        /* FIX: передаём DOM-элементы, а не строки-селекторы,
           потому что кнопки находятся вне .swiper-контейнера */
        nextEl: document.querySelector('.reviews__btn--next'),
        prevEl: document.querySelector('.reviews__btn--prev'),
        disabledClass: 'reviews__btn--disabled',
      },
      breakpoints: {
        320:  { slidesPerView: 1, spaceBetween: 20 },
        768:  { slidesPerView: 2, spaceBetween: 40 },
        1200: { slidesPerView: 3, spaceBetween: 80 }
      }
    });
  }
 
 
  /* ── Валидация формы и отправка через EmailJS ── */
  const phoneInput = document.querySelector('input[name="user_phone"]');
  let phoneMask;
 
  // Маска телефона — только если IMask подключён в HTML
  if (phoneInput && typeof IMask !== 'undefined') {
    phoneMask = IMask(phoneInput, {
      mask: '+{7} (000) 000-00-00'
    });
  }
 
  const contactForm = document.getElementById('contact-form');
 
  if (contactForm) {
    contactForm.addEventListener('submit', function(event) {
      event.preventDefault();
 
      // FIX: защита от null если id="submit-btn" не добавлен в HTML
      const btn = document.getElementById('submit-btn');
      if (!btn) {
        console.error('Кнопка с id="submit-btn" не найдена в HTML');
        return;
      }
 
      // Проверка имени
      const nameInput = document.querySelector('input[name="user_name"]');
      if (nameInput && nameInput.value.trim().length < 2) {
        alert('Пожалуйста, введите ваше имя.');
        nameInput.focus();
        return;
      }
 
      // Проверка телефона
      if (phoneMask) {
        // Если IMask подключён — проверяем через маску
        if (!phoneMask.masked.isComplete) {
          alert('Пожалуйста, введите номер телефона полностью.');
          phoneInput.focus();
          return;
        }
      } else if (phoneInput) {
        // FIX: резервная проверка если IMask не подключён
        const cleaned = phoneInput.value.replace(/\D/g, '');
        if (cleaned.length < 11) {
          alert('Пожалуйста, введите корректный номер телефона.');
          phoneInput.focus();
          return;
        }
      }
 
      // Блокируем кнопку на время отправки
      btn.innerText = 'ОТПРАВКА...';
      btn.disabled = true;
 
      // Отправка через EmailJS
      emailjs.sendForm('service_6h5azal', 'template_fzqtn7s', this)
        .then(() => {
          alert('Спасибо! Заявка успешно отправлена.');
          contactForm.reset();
          if (phoneMask) phoneMask.updateValue();
          btn.innerText = 'ОТПРАВИТЬ ЗАЯВКУ';
          btn.disabled = false;
        })
        .catch(error => {
          alert('Ошибка при отправке: ' + JSON.stringify(error));
          btn.innerText = 'ОТПРАВИТЬ ЗАЯВКУ';
          btn.disabled = false;
        });
    });
  }
 
});
