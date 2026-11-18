/**
 * js/modules/dom-tree.js — „Vom HTML zum Baum" (kap09)
 *
 * Code-Zeilen und Baum-Knoten spiegeln sich gegenseitig:
 * Hover oder Fokus hebt beide Seiten hervor. Keine Bewertung,
 * kein Zustand — nur die Brücke zwischen zwei Darstellungen.
 */

export function initDomTree() {
  document.querySelectorAll('[data-component="jsc-domtree"]').forEach((root) => {
    const items = root.querySelectorAll('[data-node]');
    const status = root.querySelector('.jsc-domtree__status');

    const activate = (el) => {
      const ids = (el.dataset.node || '').split(/\s+/);
      items.forEach((it) => {
        const own = (it.dataset.node || '').split(/\s+/);
        it.classList.toggle('is-linked', own.some((n) => ids.includes(n)));
      });
      if (status) status.textContent = el.dataset.nodeLabel || '';
    };

    const deactivate = () => {
      items.forEach((it) => it.classList.remove('is-linked'));
      if (status) status.textContent = '';
    };

    items.forEach((el) => {
      el.addEventListener('mouseenter', () => activate(el));
      el.addEventListener('mouseleave', deactivate);
      el.addEventListener('focus', () => activate(el));
      el.addEventListener('blur', deactivate);
    });
  });
}
