/**
 * Abgabe-Assistent - Phase 3
 * OneDrive + Moodle workflow
 */

const AbgabePanel = {
  missionId: '',
  missionTitle: '',

  init(id, title) {
    this.missionId = id;
    this.missionTitle = title;
    this.render();
    this.loadState();
  },

  render() {
    const container = document.getElementById('abgabe-panel');
    if (!container) return;

    const folderPath = `OneDrive/Medientechnik/Backend/Mission${this.missionId}/`;

    container.innerHTML = `
      <div class="abgabe-header">
        <h3>[Abgabe] OneDrive + Moodle</h3>
      </div>
      
      <div class="abgabe-path">
        <label class="abgabe-label">Ordnerstruktur (kopieren)</label>
        <div class="abgabe-path-box" id="abgabe-path-text">${folderPath}</div>
        <button class="abgabe-btn" id="abgabe-copy-path">[Pfad kopieren]</button>
      </div>
      
      <div class="abgabe-checklist">
        <label class="abgabe-label">Checkliste (abhaken wenn erledigt)</label>
        
        <label class="abgabe-check-item">
          <input type="checkbox" id="check-code" data-field="code">
          <span>Code-Dateien gespeichert</span>
        </label>
        
        <label class="abgabe-check-item">
          <input type="checkbox" id="check-screenshot" data-field="screenshot">
          <span>Self-Test Screenshot gespeichert</span>
        </label>
        
        <label class="abgabe-check-item">
          <input type="checkbox" id="check-kilog" data-field="kilog">
          <span>KI-Log (.json) gespeichert</span>
        </label>
        
        <label class="abgabe-check-item">
          <input type="checkbox" id="check-readme" data-field="readme">
          <span>README.md erstellt</span>
        </label>
      </div>
      
      <div class="abgabe-actions">
        <button class="abgabe-btn" id="abgabe-copy-checklist">[Checkliste kopieren]</button>
        <button class="abgabe-btn abgabe-btn-primary" id="abgabe-download-readme">[README.md herunterladen]</button>
      </div>
      
      <div class="abgabe-hint">
        <strong>Hinweis:</strong> Erstelle einen Freigabelink im OneDrive-Ordner 
        und füge diesen im Moodle als Abgabe ein.
      </div>
      
      <div class="abgabe-status" id="abgabe-status"></div>
    `;

    // Bind events
    document.getElementById('abgabe-copy-path').addEventListener('click', () => {
      navigator.clipboard.writeText(folderPath).then(() => {
        this.showStatus('Pfad kopiert!');
      });
    });

    document.querySelectorAll('.abgabe-check-item input').forEach(cb => {
      cb.addEventListener('change', (e) => {
        const field = e.target.dataset.field;
        const checked = e.target.checked;
        if (typeof MissionsAPI !== 'undefined') {
          MissionsAPI.setAbgabeCheck(this.missionId, field, checked);
        }
        this.showStatus('Gespeichert');
      });
    });

    document.getElementById('abgabe-copy-checklist').addEventListener('click', () => {
      const checks = this.getChecklistText();
      navigator.clipboard.writeText(checks).then(() => {
        this.showStatus('Checkliste kopiert!');
      });
    });

    document.getElementById('abgabe-download-readme').addEventListener('click', () => {
      this.downloadReadme();
    });
  },

  loadState() {
    if (typeof MissionsAPI !== 'undefined') {
      const checks = MissionsAPI.getAbgabeChecks(this.missionId);
      document.getElementById('check-code').checked = checks.code || false;
      document.getElementById('check-screenshot').checked = checks.screenshot || false;
      document.getElementById('check-kilog').checked = checks.kilog || false;
      document.getElementById('check-readme').checked = checks.readme || false;
    }
  },

  getChecklistText() {
    const checks = [
      '[ ] Code-Dateien gespeichert',
      '[ ] Self-Test Screenshot gespeichert',
      '[ ] KI-Log (.json) gespeichert',
      '[ ] README.md erstellt'
    ];
    return `Mission ${this.missionId}: ${this.missionTitle}
Ordner: OneDrive/Medientechnik/Backend/Mission${this.missionId}/

${checks.join('\n')}`;
  },

  downloadReadme() {
    const content = `# Mission ${this.missionId}: ${this.missionTitle}

## Abgabe

- **Erstellt am:** ${new Date().toLocaleDateString('de-DE')}
- **Pfad:** OneDrive/Medientechnik/Backend/Mission${this.missionId}/

## Inhalt

- [ ] Code-Dateien
- [ ] Self-Test Screenshot
- [ ] KI-Log (.json)
- [ ] README.md

## Hinweise

Freigabelink im Moodle abgeben.
`;
    const blob = new Blob([content], { type: 'text/markdown' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `README-Mission${this.missionId}.md`;
    a.click();
    URL.revokeObjectURL(url);
    this.showStatus('README.md heruntergeladen!');
  },

  showStatus(msg) {
    const status = document.getElementById('abgabe-status');
    if (status) {
      status.textContent = `[${msg}]`;
      setTimeout(() => status.textContent = '', 2000);
    }
  }
};

window.AbgabePanel = AbgabePanel;
