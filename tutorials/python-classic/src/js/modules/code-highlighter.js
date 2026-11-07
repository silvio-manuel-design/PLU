/**
 * PYTHON CLASSIC — Code Block Utilities
 * Copy to clipboard + basic syntax highlighting
 */

const PYTHON_KEYWORDS = [
  'and', 'as', 'assert', 'break', 'class', 'continue', 'def', 'del', 'elif',
  'else', 'except', 'False', 'finally', 'for', 'from', 'global', 'if', 'import',
  'in', 'is', 'lambda', 'None', 'nonlocal', 'not', 'or', 'pass', 'raise',
  'return', 'True', 'try', 'while', 'with', 'yield', 'async', 'await'
];

const PYTHON_BUILTINS = [
  'print', 'input', 'len', 'range', 'str', 'int', 'float', 'list', 'dict',
  'set', 'tuple', 'type', 'open', 'sorted', 'sum', 'max', 'min', 'abs',
  'round', 'enumerate', 'zip', 'map', 'filter', 'help', 'dir'
];

/**
 * Initialize all code blocks on the page
 */
export function initCodeBlocks() {
  document.querySelectorAll('[data-code-block]').forEach(block => {
    initCopyButton(block);
    highlightCode(block);
  });
}

/**
 * Add copy functionality to a code block
 */
function initCopyButton(block) {
  const btn = block.querySelector('[data-copy-btn]');
  const pre = block.querySelector('pre');
  if (!btn || !pre) return;

  btn.addEventListener('click', async () => {
    const code = pre.textContent || '';
    try {
      await navigator.clipboard.writeText(code);
      const originalText = btn.innerHTML;
      btn.classList.add('is-copied');
      btn.innerHTML = `<span><i class="ph ph-check"></i></span> <span data-i18n="common.copied">Kopiert!</span>`;
      setTimeout(() => {
        btn.classList.remove('is-copied');
        btn.innerHTML = originalText;
      }, 2000);
    } catch (err) {
      console.warn('[CodeBlock] Copy failed:', err);
    }
  });
}

/**
 * Basic client-side syntax highlighting for Python
 * Lightweight alternative to Prism.js for the skeleton
 */
function highlightCode(block) {
  const codeEl = block.querySelector('code');
  if (!codeEl) return;

  // Skip if already highlighted
  if (codeEl.querySelector('.token-keyword')) return;

  let html = escapeHtml(codeEl.textContent);

  // Comments
  html = html.replace(/(#.+$)/gm, '<span class="token-comment">$1</span>');

  // Strings (single, double, triple)
  html = html.replace(
    /("""[\s\S]*?""")|('''[\s\S]*?''')|("(?:[^"\\]|\\.)*")|('(?:[^'\\]|\\.)*')/g,
    (match) => `<span class="token-string">${match}</span>`
  );

  // Keywords (word boundaries)
  const keywordRegex = new RegExp(
    `\\b(${PYTHON_KEYWORDS.join('|')})\\b`,
    'g'
  );
  html = html.replace(keywordRegex, '<span class="token-keyword">$1</span>');

  // Built-ins
  const builtinRegex = new RegExp(
    `\\b(${PYTHON_BUILTINS.join('|')})\\b`,
    'g'
  );
  html = html.replace(builtinRegex, '<span class="token-builtin">$1</span>');

  // Numbers
  html = html.replace(
    /\b(\d+(?:\.\d+)?)\b/g,
    '<span class="token-number">$1</span>'
  );

  // Function definitions
  html = html.replace(
    /\b(def)\s+(\w+)/g,
    '<span class="token-keyword">$1</span> <span class="token-function">$2</span>'
  );

  // Function calls
  html = html.replace(
    /(\w+)(?=\()/g,
    (match) => {
      if (PYTHON_KEYWORDS.includes(match) || PYTHON_BUILTINS.includes(match)) {
        return match; // Already highlighted
      }
      return `<span class="token-function">${match}</span>`;
    }
  );

  codeEl.innerHTML = html;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}
