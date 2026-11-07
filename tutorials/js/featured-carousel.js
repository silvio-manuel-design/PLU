/**
 * PLU Featured Carousel
 * Auto-rotating banner carousel for the hero section
 * Policy: 0 Inline-Scripts — external module only
 */
(function() {
  const carousel = document.querySelector('.featured-carousel');
  if (!carousel) return;

  const slides = carousel.querySelectorAll('.featured-banner--slide');
  const dots = carousel.querySelectorAll('.featured-carousel__dot');
  const interval = parseInt(carousel.dataset.autoplay, 10) || 5000;

  let current = 0;
  let timer = null;

  function goToSlide(index) {
    slides[current].classList.remove('is-active');
    dots[current].classList.remove('is-active');
    dots[current].setAttribute('aria-selected', 'false');

    current = index;

    slides[current].classList.add('is-active');
    dots[current].classList.add('is-active');
    dots[current].setAttribute('aria-selected', 'true');
  }

  function nextSlide() {
    goToSlide((current + 1) % slides.length);
  }

  function start() {
    timer = setInterval(nextSlide, interval);
  }

  function stop() {
    clearInterval(timer);
  }

  dots.forEach((dot, i) => {
    dot.addEventListener('click', () => {
      stop();
      goToSlide(i);
      start();
    });
  });

  carousel.addEventListener('mouseenter', stop);
  carousel.addEventListener('mouseleave', start);

  start();
})();
