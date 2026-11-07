/**
 * ⚔️ QUEST LOG SYSTEM - Gamifizierte Aufgabenverwaltung
 * Schüler können Quests verfolgen, einchecken und Belohnungen erhalten
 */

const QuestLog = (function() {
  'use strict';

  const STORAGE_KEY = 'grafik_quest_log';
  
  const QUESTS = {
    'quest-01-pixel': {
      id: 'quest-01-pixel',
      title: 'Quest 01: Pixel Scout',
      description: 'Verstehe den Unterschied zwischen Pixel und Vektor',
      xp: 50,
      file: '01-pixel-aufgaben.html',
      requirements: [
        'Theorie-Fragen beantwortet',
        'KI-Prompt formuliert',
        'Verständnis-Check bestanden'
      ],
      level: '01'
    },
    'quest-02-gimp': {
      id: 'quest-02-gimp',
      title: 'Quest 02: GIMP Warrior',
      description: 'Erstelle dein erstes Meme in GIMP',
      xp: 50,
      file: '02-gimp-aufgaben.html',
      requirements: [
        'Bild geöffnet',
        'Mindestens 2 Ebenen erstellt',
        'Text hinzugefügt',
        'Als PNG exportiert',
        'XCF-Datei gespeichert'
      ],
      level: '02'
    },
    'quest-03-inkscape': {
      id: 'quest-03-inkscape',
      title: 'Quest 03: Vector Mage',
      description: 'Erstelle ein einfaches Icon in Inkscape',
      xp: 50,
      file: '03-inkscape-aufgaben.html',
      requirements: [
        'Canvas 512x512px erstellt',
        'Formen gezeichnet',
        'Farben angewendet',
        'Als SVG gespeichert',
        'Als PNG exportiert'
      ],
      level: '03'
    },
    'quest-04-animation': {
      id: 'quest-04-animation',
      title: 'Quest 04: Motion Master',
      description: 'Erstelle eine animierte GIF',
      xp: 50,
      file: '04-animations-aufgaben.html',
      requirements: [
        'Mindestens 3 Frames erstellt',
        'Animation getestet',
        'Als GIF exportiert'
      ],
      level: '04'
    }
  };
  
  // Hilfsfunktion: Berechnet den korrekten Pfad zur Quest-Datei
  // basierend auf der aktuellen URL (Root vs. Unterordner)
  function getQuestPath(questFile) {
    const path = window.location.pathname;
    // Prüfe ob wir in einem Unterordner sind (kapitel/, uebungen/, tools/)
    if (path.includes('/kapitel/') || path.includes('/uebungen/') || path.includes('/tools/')) {
      return '../uebungen/' + questFile;
    }
    // Wir sind auf Root-Level (index.html, dashboard.html, etc.)
    return './uebungen/' + questFile;
  }

  function init() {
    // Add Quest Log button to navigation
    addQuestLogButton();
    
    // Initialize quest checklists on quest pages
    initializeQuestChecklists();
    
    // Initialize simple quest completion buttons (Quest 1, 3, 4)
    initializeSimpleQuestCompletion();
    
    // Update quest status indicators
    updateQuestIndicators();
  }
  
  // Einfache Quest-Abschluss Buttons (für Quests ohne detaillierte Checklisten)
  function initializeSimpleQuestCompletion() {
    const completeBtn = document.getElementById('quest-complete-btn');
    if (!completeBtn) return;
    
    // Bestimme Quest-ID basierend auf der aktuellen Seite
    const path = window.location.pathname;
    let questId = null;
    
    if (path.includes('01-pixel-aufgaben')) {
      questId = 'quest-01-pixel';
    } else if (path.includes('03-inkscape-aufgaben')) {
      questId = 'quest-03-inkscape';
    } else if (path.includes('04-animations-aufgaben')) {
      questId = 'quest-04-animation';
    }
    
    if (!questId) return;
    
    const quest = QUESTS[questId];
    const progress = getQuestProgress();
    const questProgress = progress[questId];
    
    // Prüfe ob bereits abgeschlossen
    if (questProgress && questProgress.completed) {
      // Button disablen und Erfolgsmeldung zeigen
      completeBtn.disabled = true;
      completeBtn.style.opacity = '0.5';
      completeBtn.style.cursor = 'not-allowed';
      completeBtn.textContent = '✅ Bereits abgeschlossen';
      
      const msg = document.getElementById('quest-completed-message');
      if (msg) msg.style.display = 'block';
      return;
    }
    
    // Button Click-Handler
    completeBtn.addEventListener('click', () => {
      // Speichere Abschluss
      if (!progress[questId]) {
        progress[questId] = { id: questId, completed: false, requirements: {} };
      }
      progress[questId].completed = true;
      
      // Markiere alle Requirements als erledigt (für 100% Anzeige)
      quest.requirements.forEach((_, index) => {
        progress[questId].requirements[index] = true;
      });
      
      saveQuestProgress(progress);
      
      // XP vergeben und Exercise abschließen (für Badges)
      if (typeof GrafikQuest !== 'undefined') {
        // Wichtig: Für Badge-Freischaltung (pixel_master, vector_hero)
        const exerciseId = questId.replace('quest-', '').replace('pixel', 'pixel-aufgaben').replace('gimp', 'gimp-aufgaben').replace('inkscape', 'inkscape-aufgaben').replace('animation', 'animations-aufgaben');
        GrafikQuest.completeExercise(exerciseId);
        GrafikQuest.addXP(quest.xp, `Quest "${quest.title}" abgeschlossen`);
      }
      
      // UI aktualisieren
      completeBtn.disabled = true;
      completeBtn.style.opacity = '0.5';
      completeBtn.style.cursor = 'not-allowed';
      completeBtn.textContent = '✅ Bereits abgeschlossen';
      
      const msg = document.getElementById('quest-completed-message');
      if (msg) {
        msg.style.display = 'block';
        msg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      // Quest Log Notification aktualisieren
      updateQuestNotification();
    });
  }

  function addQuestLogButton() {
    // Add to header or floating
    const btn = document.createElement('button');
    btn.id = 'quest-log-toggle';
    btn.innerHTML = '⚔️';
    btn.title = 'Quest Log';
    btn.setAttribute('aria-label', 'Quest Log öffnen');
    btn.style.cssText = `
      position: fixed;
      bottom: 148px;
      right: 24px;
      width: 50px;
      height: 50px;
      background: var(--bg-surface);
      border: 2px solid var(--neon-magenta);
      color: var(--neon-magenta);
      border-radius: 50%;
      font-size: 1.3rem;
      cursor: pointer;
      z-index: 996;
      box-shadow: 0 0 20px var(--neon-magenta-glow);
      transition: all 0.3s ease;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0;
      padding: 0;
    `;
    
    btn.addEventListener('click', openQuestLog);
    document.body.appendChild(btn);
    
    // Add notification badge
    updateQuestNotification(btn);
  }

  function openQuestLog() {
    // Remove existing modal
    const existing = document.getElementById('quest-log-modal');
    if (existing) {
      existing.remove();
      return;
    }
    
    const modal = document.createElement('div');
    modal.id = 'quest-log-modal';
    modal.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: var(--bg-card);
      border: 2px solid var(--neon-magenta);
      border-radius: var(--radius-xl);
      padding: 32px;
      max-width: 600px;
      width: 90%;
      max-height: 80vh;
      overflow-y: auto;
      z-index: 10000;
      box-shadow: 0 0 60px rgba(0,0,0,0.8), 0 0 40px var(--neon-magenta-glow);
    `;
    
    const progress = getQuestProgress();
    const completedCount = Object.values(progress).filter(q => q.completed).length;
    const totalXP = Object.values(progress).reduce((sum, q) => sum + (q.completed ? QUESTS[q.id].xp : 0), 0);
    
    modal.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px;">
        <h2 style="color: var(--neon-magenta); margin: 0;">⚔️ Quest Log</h2>
        <button onclick="document.getElementById('quest-log-modal').remove()" style="background: none; border: none; color: var(--text-muted); font-size: 1.5rem; cursor: pointer;">×</button>
      </div>
      
      <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 16px; margin-bottom: 24px;">
        <div style="background: var(--bg-elevated); padding: 16px; border-radius: var(--radius-md); text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--neon-magenta);">${completedCount}/${Object.keys(QUESTS).length}</div>
          <div style="color: var(--text-muted); font-size: 0.9rem;">Quests abgeschlossen</div>
        </div>
        <div style="background: var(--bg-elevated); padding: 16px; border-radius: var(--radius-md); text-align: center;">
          <div style="font-size: 2rem; font-weight: 800; color: var(--neon-cyan);">${totalXP}</div>
          <div style="color: var(--text-muted); font-size: 0.9rem;">XP aus Quests</div>
        </div>
      </div>
      
      <div style="display: flex; flex-direction: column; gap: 16px;">
        ${Object.values(QUESTS).map(quest => {
          const questProgress = progress[quest.id] || { completed: false, requirements: {} };
          const completedReqs = Object.values(questProgress.requirements).filter(Boolean).length;
          const percent = (completedReqs / quest.requirements.length) * 100;
          
          return `
            <div style="background: var(--bg-elevated); padding: 20px; border-radius: var(--radius-lg); border: 2px solid ${questProgress.completed ? 'var(--neon-green)' : 'var(--border-subtle)'};">
              <div style="display: flex; justify-content: space-between; align-items: start; margin-bottom: 12px;">
                <div>
                  <h3 style="color: ${questProgress.completed ? 'var(--neon-green)' : 'var(--neon-magenta)'}; margin: 0 0 4px 0;">${quest.title}</h3>
                  <p style="color: var(--text-secondary); font-size: 0.9rem; margin: 0;">${quest.description}</p>
                </div>
                <div style="background: ${questProgress.completed ? 'var(--neon-green)' : 'var(--neon-magenta)'}; color: var(--bg-void); padding: 4px 12px; border-radius: var(--radius-full); font-weight: 700; font-size: 0.85rem;">
                  ${questProgress.completed ? '✓' : '⚡'} ${quest.xp} XP
                </div>
              </div>
              
              <div style="margin-top: 12px;">
                <div style="display: flex; justify-content: space-between; font-size: 0.8rem; color: var(--text-muted); margin-bottom: 4px;">
                  <span>Fortschritt</span>
                  <span>${completedReqs}/${quest.requirements.length}</span>
                </div>
                <div style="height: 6px; background: rgba(255,255,255,0.1); border-radius: var(--radius-full); overflow: hidden;">
                  <div style="width: ${percent}%; height: 100%; background: ${questProgress.completed ? 'var(--neon-green)' : 'var(--neon-magenta)'}; border-radius: var(--radius-full); transition: width 0.3s ease;"></div>
                </div>
              </div>
              
              ${!questProgress.completed ? `
                <div style="margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-subtle);">
                  <p style="font-size: 0.85rem; color: var(--text-muted); margin: 0;">
                    📍 <a href="${getQuestPath(quest.file)}" style="color: var(--neon-cyan); font-weight: 600;" onclick="document.getElementById('quest-log-modal')?.remove(); document.querySelector('#quest-log-modal + div')?.remove();">Starte Quest ${quest.level} →</a>
                  </p>
                </div>
              ` : ''}
            </div>
          `;
        }).join('')}
      </div>
    `;
    
    // Add overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background: rgba(0,0,0,0.7);
      z-index: 9999;
    `;
    overlay.onclick = () => {
      modal.remove();
      overlay.remove();
    };
    
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

  function initializeQuestChecklists() {
    // Find all quest pages and add checklists
    const questContainers = document.querySelectorAll('.quest-checklist');
    
    questContainers.forEach(container => {
      const questId = container.dataset.questId;
      const quest = QUESTS[questId];
      
      if (!quest) return;
      
      const progress = getQuestProgress();
      const questProgress = progress[questId] || { requirements: {} };
      
      // Build checklist HTML
      container.innerHTML = `
        <h3 style="color: var(--neon-magenta); margin-bottom: 16px;">✅ Quest Checkliste</h3>
        <div class="interactive-checklist" data-quest-id="${questId}">
          ${quest.requirements.map((req, index) => `
            <label style="display: flex; align-items: center; gap: 12px; padding: 12px; background: var(--bg-elevated); border-radius: var(--radius-md); margin-bottom: 8px; cursor: pointer; transition: all 0.2s ease;">
              <input type="checkbox" data-task-id="${questId}-req-${index}" ${questProgress.requirements[index] ? 'checked' : ''} style="width: 20px; height: 20px; accent-color: var(--neon-green);">
              <span style="color: var(--text-secondary);">${req}</span>
            </label>
          `).join('')}
        </div>
        <div class="quest-completion-message" style="display: none; margin-top: 16px; padding: 16px; background: var(--neon-green); color: var(--bg-void); border-radius: var(--radius-md); text-align: center; font-weight: 700;">
          🎉 Quest abgeschlossen! +${quest.xp} XP!
        </div>
      `;
      
      // Add event listeners
      const checkboxes = container.querySelectorAll('input[type="checkbox"]');
      checkboxes.forEach((cb, index) => {
        cb.addEventListener('change', () => {
          updateQuestRequirement(questId, index, cb.checked);
          checkQuestCompletion(questId, container);
        });
      });
      
      // Check initial completion
      checkQuestCompletion(questId, container);
    });
  }

  function updateQuestRequirement(questId, reqIndex, completed) {
    const progress = getQuestProgress();
    if (!progress[questId]) {
      progress[questId] = { id: questId, completed: false, requirements: {} };
    }
    progress[questId].requirements[reqIndex] = completed;
    saveQuestProgress(progress);
  }

  function checkQuestCompletion(questId, container) {
    const progress = getQuestProgress();
    const questProgress = progress[questId];
    const quest = QUESTS[questId];
    
    if (!questProgress || !quest) return;
    
    const completedReqs = Object.values(questProgress.requirements).filter(Boolean).length;
    const allCompleted = completedReqs === quest.requirements.length;
    
    if (allCompleted && !questProgress.completed) {
      // First time completion
      questProgress.completed = true;
      saveQuestProgress(progress);
      
      // Show completion message
      const msg = container.querySelector('.quest-completion-message');
      if (msg) msg.style.display = 'block';
      
      // Award XP
      if (typeof GrafikQuest !== 'undefined') {
        GrafikQuest.addXP(quest.xp, `Quest "${quest.title}" abgeschlossen`);
      }
      
      // Update notification
      updateQuestNotification();
    }
  }

  function getQuestProgress() {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  }

  function saveQuestProgress(progress) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }

  function updateQuestIndicators() {
    // Update any visual indicators on the page
    const progress = getQuestProgress();
    
    // Update quest log button notification
    const btn = document.getElementById('quest-log-toggle');
    if (btn) {
      updateQuestNotification(btn);
    }
  }

  function updateQuestNotification(btn) {
    const progress = getQuestProgress();
    const availableQuests = Object.keys(QUESTS).length;
    const completedQuests = Object.values(progress).filter(q => q.completed).length;
    
    // Remove existing notification
    const existing = btn.querySelector('.quest-notification');
    if (existing) existing.remove();
    
    if (completedQuests < availableQuests) {
      const notif = document.createElement('span');
      notif.className = 'quest-notification';
      notif.textContent = availableQuests - completedQuests;
      notif.style.cssText = `
        position: absolute;
        top: -5px;
        right: -5px;
        background: var(--neon-red);
        color: white;
        font-size: 0.75rem;
        font-weight: 700;
        width: 20px;
        height: 20px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      `;
      btn.appendChild(notif);
    }
  }

  return {
    init,
    getProgress: getQuestProgress,
    reset: function() {
      localStorage.removeItem(STORAGE_KEY);
    },
    QUESTS
  };
})();

// Auto-init
document.addEventListener('DOMContentLoaded', QuestLog.init);
