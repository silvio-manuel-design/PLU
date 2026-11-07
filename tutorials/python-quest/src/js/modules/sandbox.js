/**
 * PYTHON QUEST — Sandbox Component
 * Python Code Editor mit Pyodide-Ausführung
 */

import { initPyodide, runPython, isPyodideReady } from './pyodide-sandbox.js';
import { validatePython, formatValidationProblems } from './py-validator.js';
import { showToast } from './toast.js';
import { t } from './i18n.js';

let pyodideLoading = false;

export async function renderSandbox(container, quest) {
  if (!container) return;
  
  const code = quest?.codeTemplate || `# ${t('sandbox.empty')}\nprint("Python Quest!")`;
  
  const sandbox = document.createElement('div');
  sandbox.className = 'py-quest-sandbox';
  sandbox.innerHTML = `
    <div class="py-quest-sandbox__editor">
      <div class="py-quest-sandbox__header">
        <span class="py-quest-sandbox__lang">
          <i class="ph ph-code" aria-hidden="true"></i>
          ${t('sandbox.lang')}
        </span>
        <div class="py-quest-sandbox__actions">
          <button class="py-quest-sandbox__btn" data-action="reset" title="${t('sandbox.resetTitle')}">
            <i class="ph ph-arrow-counter-clockwise" aria-hidden="true"></i>
            ${t('sandbox.reset')}
          </button>
          <button class="py-quest-sandbox__btn py-quest-sandbox__btn--primary" data-action="run" title="${t('sandbox.runTitle')}">
            <i class="ph ph-play" aria-hidden="true"></i>
            <span class="py-quest-sandbox__run-text">${t('sandbox.run')}</span>
          </button>
        </div>
      </div>
      <div class="py-quest-sandbox__editor-body">
        <div class="py-quest-sandbox__line-numbers" id="line-numbers">1</div>
        <textarea class="py-quest-sandbox__textarea" 
          id="sandbox-code"
          spellcheck="false" 
          placeholder="# ${t('sandbox.empty')}"
          rows="12">${escapeHtml(code)}</textarea>
      </div>
    </div>
    
    <div class="py-quest-sandbox__output">
      <div class="py-quest-sandbox__output-header">
        <span class="py-quest-sandbox__output-label">
          <i class="ph ph-terminal" aria-hidden="true"></i>
          ${t('sandbox.console')}
        </span>
        <button class="py-quest-sandbox__btn" data-action="clear" title="${t('sandbox.clearTitle')}">
          <i class="ph ph-trash" aria-hidden="true"></i>
          ${t('sandbox.clear')}
        </button>
      </div>
      
      <!-- Problem Panel -->
      <div class="py-quest-sandbox__problems" id="problems-panel" style="display: none;"></div>
      
      <!-- Output Content -->
      <div class="py-quest-sandbox__output-content" id="sandbox-output">
        <div class="py-quest-sandbox__output-empty">
          <i class="ph ph-terminal" aria-hidden="true"></i>
          <span>${t('sandbox.empty')}</span>
          <small>${t('sandbox.loadingNote')}</small>
        </div>
      </div>
    </div>
    
    <!-- Loading Overlay -->
    <div class="py-quest-sandbox__loading" id="sandbox-loading" style="display: none;">
      <div class="py-quest-sandbox__loading-spinner"></div>
      <span>${t('sandbox.loading')}</span>
      <small>${t('sandbox.loadingTime')}</small>
    </div>
  `;
  
  container.innerHTML = '';
  container.appendChild(sandbox);
  
  const textarea = sandbox.querySelector('#sandbox-code');
  const output = sandbox.querySelector('#sandbox-output');
  const problemsPanel = sandbox.querySelector('#problems-panel');
  const lineNumbers = sandbox.querySelector('#line-numbers');
  const loadingOverlay = sandbox.querySelector('#sandbox-loading');
  
  // Line numbers sync
  function updateLineNumbers() {
    const lines = textarea.value.split('\n').length;
    lineNumbers.innerHTML = Array.from({ length: Math.max(lines, 1) }, (_, i) => i + 1).join('<br>');
  }
  
  textarea.addEventListener('input', updateLineNumbers);
  textarea.addEventListener('scroll', () => {
    lineNumbers.scrollTop = textarea.scrollTop;
  });
  
  // Tab handling
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 4;
      updateLineNumbers();
    }
  });
  
  // Button handlers
  sandbox.querySelectorAll('[data-action]').forEach(btn => {
    btn.addEventListener('click', async () => {
      const action = btn.dataset.action;
      
      switch (action) {
        case 'run':
          await runCode(textarea.value, output, problemsPanel, loadingOverlay, btn);
          break;
        case 'reset':
          textarea.value = code;
          updateLineNumbers();
          problemsPanel.style.display = 'none';
          showToast({ type: 'info', title: t('sandbox.resetTitle'), text: t('sandbox.resetDone'), duration: 2000 });
          break;
        case 'clear':
          output.innerHTML = `
            <div class="py-quest-sandbox__output-empty">
              <i class="ph ph-terminal" aria-hidden="true"></i>
              <span>${t('sandbox.cleared')}</span>
            </div>
          `;
          problemsPanel.style.display = 'none';
          break;
      }
    });
  });
  
  updateLineNumbers();
}

async function runCode(code, outputEl, problemsPanel, loadingOverlay, runBtn) {
  const runText = runBtn.querySelector('.py-quest-sandbox__run-text');
  
  // Validierung
  const problems = validatePython(code);
  if (problems.length > 0) {
    problemsPanel.innerHTML = formatValidationProblems(problems);
    problemsPanel.style.display = 'block';
  } else {
    problemsPanel.style.display = 'none';
  }
  
  // Loading
  if (!isPyodideReady()) {
    loadingOverlay.style.display = 'flex';
  }
  
  runBtn.disabled = true;
  if (runText) runText.textContent = t('sandbox.running');
  
  outputEl.innerHTML = `<span style="color: var(--py-text-muted)">${t('sandbox.runningStatus')}</span>`;
  
  try {
    const result = await runPython(code, {
      onOutput: (msg) => appendOutput(outputEl, msg, 'stdout'),
      onError: (msg) => appendOutput(outputEl, msg, 'stderr'),
      onImage: (imgData) => appendImage(outputEl, imgData),
      onResult: (res) => {
        if (res && res !== 'None') {
          appendOutput(outputEl, `=> ${res}`, 'result');
        }
      }
    });
    
    loadingOverlay.style.display = 'none';
    
    if (!result.success) {
      outputEl.innerHTML += `<div class="py-quest-sandbox__error"><i class="ph ph-x" aria-hidden="true"></i> ${escapeHtml(result.errors[result.errors.length - 1]?.content || t('sandbox.unknownError'))}</div>`;
    } else if (result.outputs.length === 0 && result.images.length === 0 && !result.errors.length) {
      outputEl.innerHTML = `<span style="color: var(--py-text-muted)">${t('sandbox.noOutput')}</span>`;
    }
    
  } catch (error) {
    loadingOverlay.style.display = 'none';
    outputEl.innerHTML = `<div class="py-quest-sandbox__error"><i class="ph ph-x" aria-hidden="true"></i> ${escapeHtml(error.message)}</div>`;
    showToast({ type: 'error', title: t('sandbox.errorTitle'), text: error.message });
  }
  
  runBtn.disabled = false;
  if (runText) runText.textContent = t('sandbox.run');
}

function appendOutput(container, text, type) {
  const runningText = t('sandbox.runningStatus');
  const span = container.querySelector('span');
  if (span && span.textContent === runningText) {
    container.innerHTML = '';
  }
  
  const div = document.createElement('div');
  div.className = `py-quest-sandbox__output-line py-quest-sandbox__output-line--${type}`;
  div.textContent = text;
  container.appendChild(div);
  container.scrollTop = container.scrollHeight;
}

function appendImage(container, imgData) {
  const runningText = t('sandbox.runningStatus');
  const span = container.querySelector('span');
  if (span && span.textContent === runningText) {
    container.innerHTML = '';
  }
  
  const img = document.createElement('img');
  img.src = imgData;
  img.className = 'py-quest-sandbox__output-image';
  img.alt = 'Matplotlib Plot';
  container.appendChild(img);
  container.scrollTop = container.scrollHeight;
}

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

export function initSandbox() {
  window.renderSandbox = renderSandbox;
}
