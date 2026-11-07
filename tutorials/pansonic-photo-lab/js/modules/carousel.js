/**
 * Pansonic Photo Lab — Hero Image Carousel
 * Auto-play carousel with fade transitions, touch swipe, and keyboard nav
 */

export function initCarousel() {
  const container = document.querySelector('.photo-hero-carousel');
  if (!container) return;

  const track = container.querySelector('.photo-hero-carousel__track');
  const slides = container.querySelectorAll('.photo-hero-carousel__slide');
  const dotsContainer = container.querySelector('.photo-hero-carousel__dots');
  const prevBtn = container.querySelector('.photo-hero-carousel__arrow--prev');
  const nextBtn = container.querySelector('.photo-hero-carousel__arrow--next');

  if (slides.length <= 1) {
    if (prevBtn) prevBtn.hidden = true;
    if (nextBtn) nextBtn.hidden = true;
    if (dotsContainer) dotsContainer.hidden = true;
    return;
  }

  let currentIndex = 0;
  let autoplayInterval;
  let isHovered = false;
  const autoplayDelay = 5000; // 5 seconds

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, i) => {
      const dot = document.createElement('button');
      dot.className = 'photo-hero-carousel__dot';
      dot.setAttribute('aria-label', `Slide ${i + 1}`);
      dot.setAttribute('aria-current', i === 0 ? 'true' : 'false');
      dot.addEventListener('click', () => goTo(i));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.photo-hero-carousel__dot') : [];

  function updateSlides() {
    slides.forEach((slide, i) => {
      slide.classList.toggle('is-active', i === currentIndex);
      slide.setAttribute('aria-hidden', i !== currentIndex ? 'true' : 'false');
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('is-active', i === currentIndex);
      dot.setAttribute('aria-current', i === currentIndex ? 'true' : 'false');
    });

    // Announce slide change to screen readers
    const liveRegion = container.querySelector('.photo-hero-carousel__live');
    if (liveRegion) {
      const caption = slides[currentIndex].querySelector('.photo-hero-carousel__caption');
      liveRegion.textContent = caption ? caption.textContent : `Slide ${currentIndex + 1}`;
    }
  }

  function goTo(index) {
    currentIndex = index;
    if (currentIndex < 0) currentIndex = slides.length - 1;
    if (currentIndex >= slides.length) currentIndex = 0;
    updateSlides();
    resetAutoplay();
  }

  function next() { goTo(currentIndex + 1); }
  function prev() { goTo(currentIndex - 1); }

  function startAutoplay() {
    if (autoplayInterval) clearInterval(autoplayInterval);
    autoplayInterval = setInterval(() => {
      if (!isHovered && document.visibilityState === 'visible') {
        next();
      }
    }, autoplayDelay);
  }

  function resetAutoplay() {
    startAutoplay();
  }

  function stopAutoplay() {
    if (autoplayInterval) {
      clearInterval(autoplayInterval);
      autoplayInterval = null;
    }
  }

  // Event listeners
  if (prevBtn) prevBtn.addEventListener('click', () => { prev(); });
  if (nextBtn) nextBtn.addEventListener('click', () => { next(); });

  container.addEventListener('mouseenter', () => { isHovered = true; });
  container.addEventListener('mouseleave', () => { isHovered = false; });

  // Keyboard navigation
  container.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); }
    if (e.key === 'ArrowRight') { e.preventDefault(); next(); }
  });

  // Touch / swipe support
  let touchStartX = 0;
  let touchEndX = 0;

  container.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
  }, { passive: true });

  container.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
  }, { passive: true });

  function handleSwipe() {
    const diff = touchStartX - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) next();
      else prev();
    }
  }

  // Pause when tab is hidden
  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      stopAutoplay();
    } else {
      startAutoplay();
    }
  });

  // Initialize
  updateSlides();
  startAutoplay();
}
