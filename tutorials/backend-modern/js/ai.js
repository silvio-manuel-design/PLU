/**
 * AI Collaboration Panel - Phase 3
 * Plan -> Code -> Self-Test workflow
 */

const AIPanel = {
  missionContext: {},

  init(missionId, title, goal) {
    this.missionContext = { id: missionId, title, goal };
    this.render();
    this.loadLog();
  },

  buildPrompt() {
    const { id, title, goal } = this.missionContext;
    return `[Mission ${id}: ${title}]
Ziel: ${goal}

Gib mir:
1. Einen 5-Schritte-Plan (kurz, bulletpoints)
2. Minimierten Code für diesen Schritt (keine Frameworks, Vanilla JS/PHP)
3. Einen Self-Test (was muss ich prüfen, erwarteter Output)

Regeln:
- Kurze Snippets (<20 Zeilen)
- Korrekte HTTP-Statuscodes
- Keine externen Dependencies
- Kommentare auf Deutsch`;
  },

  render() {
    const container = document.getElementById('ai-panel');
    if (!container) return;

    container.innerHTML = `
      <div class="ai-panel-header">
        <h3>[KI] Plan → Code → Test</h3>
        <button class="ai-btn-copy" id="ai-copy-prompt" aria-label="Prompt kopieren">
          [Prompt kopieren]
        </button>
      </div>
      
      <div class="ai-log-area">
        <label class="ai-label" for="ai-prompt">Dein Prompt (klicken zum Kopieren)</label>
        <textarea id="ai-prompt" class="ai-textarea ai-prompt" readonly rows="4"></textarea>
        
        <label class="ai-label" for="ai-response">KI-Antwort (hier einfügen)</label>
        <textarea id="ai-response" class="ai-textarea" rows="8" placeholder="Füge hier die KI-Antwort ein..."></textarea>
        
        <div class="ai-actions">
          <button class="ai-btn-save" id="ai-save-log">[Log speichern]</button>
          <button class="ai-btn-export" id="ai-export-log">[Als .json herunterladen]</button>
        </div>
      </div>
      
      <div class="ai-status" id="ai-status"></div>
    `;

    // Bind events
    const promptArea = document.getElementById('ai-prompt');
    const responseArea = document.getElementById('ai-response');
    
    promptArea.value = this.buildPrompt();
    
    document.getElementById('ai-copy-prompt').addEventListener('click', () => {
      navigator.clipboard.writeText(promptArea.value).then(() => {
        this.showStatus('Prompt kopiert!');
      });
    });

    promptArea.addEventListener('click', () => {
      navigator.clipboard.writeText(promptArea.value).then(() => {
        this.showStatus('Prompt kopiert!');
      });
    });

    document.getElementById('ai-save-log').addEventListener('click', () => {
      if (typeof MissionsAPI !== 'undefined') {
        MissionsAPI.setAILog(this.missionContext.id, promptArea.value, responseArea.value);
        this.showStatus('Log gespeichert!');
      }
    });

    document.getElementById('ai-export-log').addEventListener('click', () => {
      if (typeof MissionsAPI !== 'undefined') {
        const data = MissionsAPI.exportAILog(this.missionContext.id);
        const blob = new Blob([data], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `ki-log-${this.missionContext.id}.json`;
        a.click();
        URL.revokeObjectURL(url);
      }
    });

    responseArea.addEventListener('input', () => {
      // Auto-save draft
      if (typeof MissionsAPI !== 'undefined') {
        MissionsAPI.setAILog(this.missionContext.id, promptArea.value, responseArea.value);
      }
    });
  },

  loadLog() {
    if (typeof MissionsAPI !== 'undefined') {
      const log = MissionsAPI.getAILog(this.missionContext.id);
      const responseArea = document.getElementById('ai-response');
      if (responseArea && log.response) {
        responseArea.value = log.response;
      }
    }
  },

  showStatus(msg) {
    const status = document.getElementById('ai-status');
    if (status) {
      status.textContent = `[${msg}]`;
      setTimeout(() => status.textContent = '', 2000);
    }
  }
};

window.AIPanel = AIPanel;
