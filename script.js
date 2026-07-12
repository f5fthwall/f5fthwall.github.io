// Пятая Стена · Сайт студии · скрипты
// Минимум: подсветка активной точки в навигации при скролле

(function () {
  const dots = document.querySelectorAll('.dot-nav .dot');
  const sections = Array.from(dots).map(d => document.querySelector(d.getAttribute('href')));

  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const idx = sections.indexOf(entry.target);
      if (idx < 0) return;
      dots.forEach(d => d.classList.remove('active'));
      dots[idx].classList.add('active');
    });
  }, {
    rootMargin: '-40% 0px -55% 0px',
    threshold: 0,
  });

  sections.forEach(s => s && observer.observe(s));

  // плавная прокрутка по клику (поверх стандартного scroll-behavior — для надёжности)
  dots.forEach(dot => {
    dot.addEventListener('click', (e) => {
      e.preventDefault();
      const target = document.querySelector(dot.getAttribute('href'));
      if (!target) return;
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
})();
