/**
 * MODULE 09 - ABSCHLUSS & ZERTIFIZIERUNG
 * Final project selection and certificate generation
 */

document.addEventListener('DOMContentLoaded', () => {
  initFinalProject();
  initCertificate();
  initDate();
  initCertificateId();
  markAcademyComplete();
});

// Project configurations
const PROJECTS = {
  family: {
    title: 'Familien-KI-Assistent',
    icon: '👨‍👩‍👧‍👦',
    steps: [
      'Listen Sie auf, welche Mahlzeiten Ihre Familie besonders mag',
      'Notieren Sie Allergien oder Unverträglichkeiten',
      'Überlegen Sie: Wie viele Tage im Voraus planen Sie?'
    ],
    prompts: [
      {
        label: 'Der Einstieg',
        text: 'Ich möchte einen Essensplan für meine Familie erstellen. Wir sind [X] Personen, mögen [Lieblingsgerichte], und müssen beachten: [Allergien/Besonderheiten]. Erstelle einen 7-Tage-Plan mit Frühstück, Mittag- und Abendessen.'
      },
      {
        label: 'Die Einkaufsliste',
        text: 'Basierend auf diesem Essensplan, erstelle eine organisierte Einkaufsliste, sortiert nach Supermarkt-Abteilungen (Obst/Gemüse, Fleisch/Fisch, Trockenprodukte, etc.).'
      },
      {
        label: 'Varianten erstellen',
        text: 'Erstelle zwei alternative Essenspläne: Einen günstigen Budget-Plan und einen schnellen Plan für stressige Wochen (max. 30 Min. Zubzeit pro Gericht).'
      }
    ]
  },
  work: {
    title: 'Berufliche Optimierung',
    icon: '💼',
    steps: [
      'Identifizieren Sie eine wiederkehrende Aufgabe (Emails, Berichte, Recherche)',
      'Schätzen Sie: Wie viel Zeit kostet diese Aufgabe aktuell?',
      'Definieren Sie: Was wäre das ideale Ergebnis?'
    ],
    prompts: [
      {
        label: 'Die Analyse',
        text: 'Ich verbringe wöchentlich etwa [X Stunden] mit [Aufgabe]. Diese Aufgabe beinhaltet: [Beschreibung]. Wie könnte KI mir hier helfen? Nenne konkrete Anwendungsmöglichkeiten.'
      },
      {
        label: 'Der Lösungsansatz',
        text: 'Erstelle mir einen Schritt-für-Schritt-Plan, wie ich diese Aufgabe mit KI-Unterstützung effizienter erledigen kann. Formuliere spezifische Prompts, die ich nutzen kann.'
      },
      {
        label: 'Die Umsetzung',
        text: 'Schreibe mir ein [Email/Template/Struktur], das ich als Vorlage für [spezifische Aufgabe] nutzen kann. Es soll professionell, freundlich und zeitsparend sein.'
      }
    ]
  },
  creative: {
    title: 'Kreatives Vorhaben',
    icon: '🎭',
    steps: [
      'Wählen Sie: Eine Geschichte schreiben oder Bilder erstellen?',
      'Überlegen Sie: Welches Thema oder Genre interessiert Sie?',
      'Definieren Sie Ihren Stil: Humorvoll, dramatisch, pädagogisch?'
    ],
    prompts: [
      {
        label: 'Die Ideenfindung',
        text: 'Ich möchte [eine Kurzgeschichte/ein Gedicht/einen Blogartikel] über [Thema] im Stil von [Vergleich/Genre] schreiben. Gib mir 5 kreative Ansätze oder Plot-Ideen.'
      },
      {
        label: 'Die Ausarbeitung',
        text: 'Entwickle Idee Nummer [X] weiter. Schreibe eine Gliederung mit Hauptcharakteren, Wendepunkten und einem überraschenden Ende.'
      },
      {
        label: 'Das Feintuning',
        text: 'Schreibe nun [den ersten Absatz/die Einleitung/die Zusammenfassung]. Achte auf [bestimmten Stil/bestimmte Stimmung] und verwende bildhafte Sprache.'
      }
    ]
  }
};

function initFinalProject() {
  const projectCards = document.querySelectorAll('.project-card');
  const workspace = document.getElementById('project-workspace');
  const closeBtn = document.getElementById('close-workspace');

  projectCards.forEach(card => {
    card.addEventListener('click', () => {
      const projectType = card.dataset.project;
      selectProject(projectType);
    });
  });

  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      workspace.style.display = 'none';
      projectCards.forEach(c => c.classList.remove('selected'));
    });
  }
}

function selectProject(type) {
  const project = PROJECTS[type];
  if (!project) return;

  // Highlight selected card
  document.querySelectorAll('.project-card').forEach(card => {
    card.classList.toggle('selected', card.dataset.project === type);
  });

  // Show workspace
  const workspace = document.getElementById('project-workspace');
  const title = document.getElementById('workspace-title');
  const steps = document.getElementById('workspace-steps');
  const prompts = document.getElementById('workspace-prompts');

  title.textContent = `${project.icon} ${project.title}`;
  
  // Build steps
  steps.innerHTML = `
    <h4>Ihre Schritte:</h4>
    <ol class="project-steps-list">
      ${project.steps.map(step => `<li>${step}</li>`).join('')}
    </ol>
  `;

  // Build prompts
  prompts.innerHTML = `
    <h4>Prompts zum Ausprobieren:</h4>
    ${project.prompts.map((prompt, idx) => `
      <div class="workspace-prompt-card">
        <span class="workspace-prompt-label">${prompt.label}</span>
        <p class="workspace-prompt-text">${prompt.text}</p>
        <button class="workspace-copy-btn" data-prompt="${encodeURIComponent(prompt.text)}">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            <rect x="9" y="9" width="13" height="13" rx="2" ry="2"/>
            <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>
          </svg>
          Kopieren
        </button>
      </div>
    `).join('')}
  `;

  // Add copy listeners
  prompts.querySelectorAll('.workspace-copy-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const text = decodeURIComponent(btn.dataset.prompt);
      copyToClipboard(text, btn);
    });
  });

  workspace.style.display = 'block';
  workspace.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

async function copyToClipboard(text, button) {
  try {
    await navigator.clipboard.writeText(text);
    const originalText = button.innerHTML;
    button.innerHTML = `
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
        <polyline points="20 6 9 17 4 12"/>
      </svg>
      Kopiert!
    `;
    button.classList.add('copied');
    
    setTimeout(() => {
      button.innerHTML = originalText;
      button.classList.remove('copied');
    }, 2000);
  } catch (err) {
    console.error('Copy failed:', err);
  }
}

function initCertificate() {
  const nameInput = document.getElementById('cert-name-input');
  const certName = document.getElementById('cert-name');
  const downloadBtn = document.getElementById('download-cert');
  const shareBtn = document.getElementById('share-cert');

  // Load saved name
  const savedName = localStorage.getItem('ki_academy_certificate_name');
  if (savedName) {
    nameInput.value = savedName;
    certName.textContent = savedName;
  }

  // Update name on input
  nameInput.addEventListener('input', () => {
    const name = nameInput.value.trim() || '[Ihr Name]';
    certName.textContent = name;
    localStorage.setItem('ki_academy_certificate_name', nameInput.value.trim());
  });

  // Download certificate
  if (downloadBtn) {
    downloadBtn.addEventListener('click', downloadCertificate);
  }

  // Share certificate
  if (shareBtn) {
    shareBtn.addEventListener('click', shareCertificate);
  }
}

function initDate() {
  const dateEl = document.getElementById('cert-date');
  if (dateEl) {
    const today = new Date();
    dateEl.textContent = today.toLocaleDateString('de-DE', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });
  }
}

function initCertificateId() {
  const idEl = document.getElementById('cert-id');
  if (idEl) {
    // Generate or retrieve certificate ID
    let certId = localStorage.getItem('ki_academy_certificate_id');
    if (!certId) {
      certId = 'KIA-' + new Date().getFullYear() + '-' + Math.random().toString(36).substr(2, 6).toUpperCase();
      localStorage.setItem('ki_academy_certificate_id', certId);
    }
    idEl.textContent = `ID: ${certId}`;
  }
}

function downloadCertificate() {
  const name = document.getElementById('cert-name-input').value.trim() || 'Teilnehmer';
  const date = document.getElementById('cert-date').textContent;
  const certId = localStorage.getItem('ki_academy_certificate_id') || 'KIA-2026-XXXX';

  // Create certificate content
  const certContent = `
KI ACADEMY - ZERTIFIKAT
========================================

Zertifikat: KI-Partner

Hiermit wird bestätigt, dass

${name}

erfolgreich alle Module der KI Academy absolviert hat.

Datum: ${date}
Zertifikats-ID: ${certId}

Ausgestellt von: Pantam Learning Universe
Lizenz: GNU GPL v3.0

========================================
https://pantam.at/ki-academy
  `;

  // Create and download file
  const blob = new Blob([certContent], { type: 'text/plain;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `KI-Academy-Zertifikat-${name.replace(/\s+/g, '-')}.txt`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);

  // Show success message
  showToast('📜 Zertifikat wurde heruntergeladen!');
}

async function shareCertificate() {
  const name = document.getElementById('cert-name-input').value.trim() || 'Ich';
  const shareData = {
    title: 'KI Academy Abschluss',
    text: `${name} hat die KI Academy erfolgreich abgeschlossen und ist jetzt zertifizierter KI-Partner! 🎓`,
    url: 'https://pantam.at/ki-academy'
  };

  if (navigator.share) {
    try {
      await navigator.share(shareData);
    } catch (err) {
      console.log('Share cancelled');
    }
  } else {
    // Fallback: copy to clipboard
    const text = `${shareData.text}\n${shareData.url}`;
    try {
      await navigator.clipboard.writeText(text);
      showToast('📋 In Zwischenablage kopiert!');
    } catch (err) {
      console.error('Share failed:', err);
    }
  }
}

function markAcademyComplete() {
  // Mark all modules as completed
  const allModules = ['00', '01', '02', '03', '04', '05', '06', '07', '08', '09'];
  allModules.forEach(mod => {
    localStorage.setItem(`ki_academy_module_${mod}_completed`, 'true');
    localStorage.setItem(`celebrated_module_${mod}`, 'true');
  });
  
  // Mark all sprints as completed
  ['sprint1', 'sprint2', 'sprint3'].forEach(sprint => {
    localStorage.setItem(`celebrated_${sprint}`, 'true');
  });

  // Mark academy as completed
  localStorage.setItem('ki_academy_completed', 'true');
  localStorage.setItem('ki_academy_completion_date', new Date().toISOString());
}

function showToast(message) {
  const toast = document.createElement('div');
  toast.style.cssText = `
    position: fixed;
    bottom: 2rem;
    left: 50%;
    transform: translateX(-50%) translateY(100px);
    background: var(--color-anthracite);
    color: white;
    padding: 1rem 2rem;
    border-radius: 9999px;
    font-size: 1rem;
    font-weight: 500;
    z-index: 1000;
    opacity: 0;
    transition: all 0.3s ease;
    box-shadow: 0 4px 20px rgba(0,0,0,0.2);
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateX(-50%) translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(-50%) translateY(100px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

// Add workspace styles dynamically
const workspaceStyles = document.createElement('style');
workspaceStyles.textContent = `
  .project-workspace {
    background: white;
    border: 2px solid var(--color-apricot);
    border-radius: 20px;
    margin-top: 2rem;
    overflow: hidden;
    animation: slideDown 0.3s ease;
  }
  
  @keyframes slideDown {
    from { opacity: 0; transform: translateY(-20px); }
    to { opacity: 1; transform: translateY(0); }
  }
  
  .workspace-header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1.25rem 1.5rem;
    background: linear-gradient(135deg, rgba(244, 162, 97, 0.1) 0%, rgba(245, 213, 71, 0.05) 100%);
    border-bottom: 1px solid rgba(244, 162, 97, 0.2);
  }
  
  .workspace-header h3 {
    font-size: 1.1rem;
    font-weight: 600;
    color: var(--color-anthracite);
    margin: 0;
  }
  
  .workspace-close {
    width: 32px;
    height: 32px;
    background: rgba(0,0,0,0.05);
    border: none;
    border-radius: 8px;
    font-size: 1.5rem;
    color: var(--color-gray-dark);
    cursor: pointer;
    transition: all 0.2s ease;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .workspace-close:hover {
    background: rgba(231, 111, 81, 0.1);
    color: var(--color-terracotta);
  }
  
  .workspace-content {
    padding: 1.5rem;
  }
  
  .workspace-content h4 {
    font-size: 1rem;
    font-weight: 600;
    color: var(--color-anthracite);
    margin: 1.5rem 0 1rem;
  }
  
  .workspace-content h4:first-child {
    margin-top: 0;
  }
  
  .project-steps-list {
    list-style: none;
    padding: 0;
    margin: 0;
    counter-reset: step;
  }
  
  .project-steps-list li {
    display: flex;
    align-items: flex-start;
    gap: 1rem;
    padding: 0.875rem 0;
    border-bottom: 1px solid rgba(0,0,0,0.05);
  }
  
  .project-steps-list li::before {
    counter-increment: step;
    content: counter(step);
    width: 28px;
    height: 28px;
    background: linear-gradient(135deg, #F4A261 0%, #F5D547 100%);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    font-weight: 700;
    color: white;
    flex-shrink: 0;
  }
  
  .workspace-prompt-card {
    background: linear-gradient(135deg, #f8faf7 0%, #ffffff 100%);
    border: 1px solid rgba(144, 169, 85, 0.2);
    border-radius: 12px;
    padding: 1.25rem;
    margin-bottom: 1rem;
  }
  
  .workspace-prompt-label {
    display: inline-block;
    font-size: 0.75rem;
    font-weight: 700;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: var(--color-sage);
    margin-bottom: 0.5rem;
  }
  
  .workspace-prompt-text {
    font-family: 'SF Mono', Monaco, monospace;
    font-size: 0.9rem;
    line-height: 1.5;
    color: var(--color-anthracite);
    margin: 0 0 1rem;
  }
  
  .workspace-copy-btn {
    display: inline-flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.625rem 1rem;
    background: rgba(144, 169, 85, 0.1);
    border: 1px solid rgba(144, 169, 85, 0.2);
    border-radius: 8px;
    font-size: 0.875rem;
    font-weight: 500;
    color: var(--color-sage);
    cursor: pointer;
    transition: all 0.2s ease;
  }
  
  .workspace-copy-btn:hover,
  .workspace-copy-btn.copied {
    background: var(--color-sage);
    border-color: var(--color-sage);
    color: white;
  }
  
  .workspace-copy-btn svg {
    stroke: currentColor;
  }
  
  @media (prefers-color-scheme: dark) {
    .project-workspace,
    .workspace-prompt-card {
      background: linear-gradient(135deg, #1e2130 0%, #1a1d2b 100%);
    }
    
    .workspace-header {
      background: linear-gradient(135deg, rgba(244, 162, 97, 0.1) 0%, rgba(245, 213, 71, 0.05) 100%);
    }
    
    .workspace-header h3,
    .workspace-content h4 {
      color: #F7FAFC;
    }
    
    .workspace-prompt-text {
      color: #E2E8F0;
    }
    
    .project-steps-list li {
      border-color: rgba(255,255,255,0.05);
    }
  }
`;
document.head.appendChild(workspaceStyles);
