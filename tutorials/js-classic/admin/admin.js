// Lehrer-Area js-classic — Copy-Buttons + Passwort-Toggle (CSP: kein Inline-JS)

// Copy: Code des zugehörigen Akkordeons in die Zwischenablage legen
document.querySelectorAll('[data-copy]').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const block = btn.closest('details')?.querySelector('pre code');
    if (!block) return;
    try {
      await navigator.clipboard.writeText(block.textContent);
      const original = btn.textContent;
      btn.textContent = 'Kopiert';
      setTimeout(() => {
        btn.textContent = original;
      }, 1500);
    } catch {
      // Zwischenablage nicht verfügbar — Seite bleibt nutzbar
    }
  });
});

// Passwort-Toggle: Checkbox mit data-pwtoggle="ZIEL-ID" steuert den Input
const pwToggle = document.querySelector('[data-pwtoggle]');
if (pwToggle) {
  const target = document.getElementById(pwToggle.dataset.pwtoggle);
  if (target) {
    pwToggle.addEventListener('change', () => {
      target.type = pwToggle.checked ? 'text' : 'password';
    });
  }
}
