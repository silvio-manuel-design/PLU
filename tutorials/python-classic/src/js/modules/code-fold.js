/**
 * PYTHON CLASSIC — Code Folding
 * Automatically folds long code blocks (15+ lines) with a toggle button.
 * Respects prefers-reduced-motion.
 */

const FOLD_THRESHOLD_LINES = 8;
const FOLDED_MAX_HEIGHT_REM = 14; // approx 8 lines + padding

export function initCodeFold() {
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lang = document.documentElement.lang || 'de';
  const showText = lang === 'en' ? 'Show code' : 'Code anzeigen';
  const hideText = lang === 'en' ? 'Hide code' : 'Code ausblenden';

  document.querySelectorAll('.py-classic-code-block').forEach(block => {
    const pre = block.querySelector('.py-classic-code-block__pre');
    const code = pre?.querySelector('code');
    if (!code) return;

    // Count lines by newline characters in the HTML/text content
    const textContent = code.textContent || '';
    const lineCount = textContent.split('\n').length;
    if (lineCount <= FOLD_THRESHOLD_LINES) return;

    // Mark as foldable
    block.classList.add('is-foldable');
    block.classList.add('is-folded');

    // Create toggle button
    const toggleBtn = document.createElement('button');
    toggleBtn.className = 'py-classic-code-block__fold-toggle';
    toggleBtn.type = 'button';
    toggleBtn.setAttribute('aria-expanded', 'false');
    toggleBtn.setAttribute('aria-label', showText);
    toggleBtn.innerHTML = `<span class="py-classic-code-block__fold-icon"><i class="ph ph-caret-down"></i></span> <span>${showText}</span>`;

    toggleBtn.addEventListener('click', () => {
      const isFolded = block.classList.toggle('is-folded');
      block.classList.toggle('is-unfolded', !isFolded);
      toggleBtn.setAttribute('aria-expanded', String(!isFolded));
      toggleBtn.setAttribute('aria-label', isFolded ? showText : hideText);
      toggleBtn.innerHTML = isFolded
        ? `<span class="py-classic-code-block__fold-icon"><i class="ph ph-caret-down"></i></span> <span>${showText}</span>`
        : `<span class="py-classic-code-block__fold-icon"><i class="ph ph-caret-up"></i></span> <span>${hideText}</span>`;
    });

    // Insert into header (before copy button if present)
    const header = block.querySelector('.py-classic-code-block__header');
    if (header) {
      const copyBtn = header.querySelector('.py-classic-code-block__copy');
      if (copyBtn) {
        header.insertBefore(toggleBtn, copyBtn);
      } else {
        header.appendChild(toggleBtn);
      }
    }
  });
}
