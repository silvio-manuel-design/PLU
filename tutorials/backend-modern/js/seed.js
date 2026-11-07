/**
 * Seed-Helfer - Phase 3
 * Generiert eindeutige Seeds aus persönlichen Daten
 * NUR informativ, speichert nichts
 */

const SeedHelper = {
  init() {
    this.render();
  },

  render() {
    const container = document.getElementById('seed-panel');
    if (!container) return;

    container.innerHTML = `
      <div class="seed-header">
        <h3>[Seed] Eindeutige Kennung</h3>
      </div>
      
      <div class="seed-inputs">
        <label class="seed-label">
          Nachname (oder Initialen)
          <input type="text" id="seed-name" maxlength="20" placeholder="z.B. Mueller">
        </label>
        
        <label class="seed-label">
          Geburtsmonat (1-12)
          <input type="number" id="seed-month" min="1" max="12" placeholder="z.B. 5">
        </label>
        
        <button class="seed-btn" id="seed-generate">[Seed generieren]</button>
      </div>
      
      <div class="seed-output" id="seed-output" style="display: none;">
        <label class="seed-label">Dein Seed (8-stellig)</label>
        <div class="seed-value" id="seed-value"></div>
        
        <div class="seed-hints">
          <strong>Verwendung:</strong>
          <ul>
            <li>Port-Nummer: <code>3xxx</code> (z.B. 3000 + Seed[0-3])</li>
            <li>Tabellen-Präfix: <code>user_xxxx</code></li>
            <li>Secret-Key: Nutze vollständigen Seed</li>
          </ul>
        </div>
      </div>
    `;

    document.getElementById('seed-generate').addEventListener('click', () => {
      this.generate();
    });
  },

  generate() {
    const name = document.getElementById('seed-name').value.trim().toLowerCase();
    const month = parseInt(document.getElementById('seed-month').value) || 0;

    if (!name || !month) {
      alert('Bitte Nachname und Geburtsmonat eingeben');
      return;
    }

    // Simple hash function
    let hash = 0;
    const str = name + month.toString();
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32bit integer
    }

    // Convert to positive 8-digit hex
    const seed = Math.abs(hash).toString(16).padStart(8, '0').substring(0, 8);

    document.getElementById('seed-value').textContent = seed;
    document.getElementById('seed-output').style.display = 'block';
  }
};

window.SeedHelper = SeedHelper;
