/**
 * Landscape Time Playground — M08
 * Interactive landscape time-of-day simulator
 * Reads content from data-* attributes on buttons for i18n support
 */

export function initLandscapeTimePlayground() {
  const container = document.querySelector('[data-landscape-playground]');
  if (!container) return;

  const stage = container.querySelector('.photo-landscape-playground__stage');
  const infoTitle = container.querySelector('.photo-landscape-playground__info-title');
  const infoText = container.querySelector('.photo-landscape-playground__info-text');
  const infoSmartphone = container.querySelector('.photo-landscape-playground__info-smartphone span');
  const controls = container.querySelector('.photo-landscape-playground__controls');

  if (!stage || !infoTitle || !infoText || !infoSmartphone || !controls) return;

  controls.addEventListener('click', (e) => {
    const btn = e.target.closest('[data-time]');
    if (!btn) return;

    const key = btn.dataset.time;
    const title = btn.dataset.title;
    const text = btn.dataset.text;
    const smartphone = btn.dataset.smartphone;

    if (!title || !text) return;

    // Update stage state
    stage.className = 'photo-landscape-playground__stage is-' + key;

    // Update info
    infoTitle.textContent = title;
    infoText.textContent = text;
    if (smartphone) {
      infoSmartphone.textContent = smartphone;
    }

    // Update buttons
    controls.querySelectorAll('button').forEach(b => {
      b.classList.remove('is-active');
      b.setAttribute('aria-pressed', 'false');
    });
    btn.classList.add('is-active');
    btn.setAttribute('aria-pressed', 'true');
  });
}
