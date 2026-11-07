/**
 * 🎮 GRAFIK QUEST - Gamification System
 * Progress Tracking, XP System, Badges & Quizze
 */

const GrafikQuest = (function() {
  'use strict';

  // ============================================================================
  // KONFIGURATION
  // ============================================================================
  const CONFIG = {
    XP_PER_MODULE: 100,
    XP_PER_EXERCISE: 50,
    XP_PER_QUIZ_CORRECT: 25,
    XP_PER_QUIZ_PERFECT: 100,
    LEVEL_THRESHOLDS: [0, 300, 700, 1200, 1800, 2500, 3300, 4200, 5200, 6300],
    STORAGE_KEY: 'grafik_quest_progress',
    BADGES: {
      first_steps: { id: 'first_steps', name: 'Erste Schritte', icon: '👣', desc: 'Schließe das erste Modul ab' },
      pixel_master: { id: 'pixel_master', name: 'Pixel Meister', icon: '🎨', desc: 'Meistere das Pixel-Modul' },
      vector_hero: { id: 'vector_hero', name: 'Vektor Held', icon: '📐', desc: 'Erstelle deine erste SVG' },
      tool_expert: { id: 'tool_expert', name: 'Werkzeug Experte', icon: '🛠️', desc: 'Nutze GIMP & Inkscape' },
      quiz_champion: { id: 'quiz_champion', name: 'Quiz Champion', icon: '🏆', desc: 'Erreiche 100% in einem Quiz' },
      streak_3: { id: 'streak_3', name: 'Auf Feuer', icon: '🔥', desc: '3 Tage am Stück lernen' },
      completionist: { id: 'completionist', name: 'Perfektionist', icon: '💎', desc: 'Schließe alle Module ab' },
      logo_legend: { id: 'logo_legend', name: 'Logo Legend', icon: '👑', desc: 'Schließe das Boss Level Logo Design ab' }
    }
  };

  // ============================================================================
  // DATEN-MANAGEMENT
  // ============================================================================
  function getProgress() {
    const stored = localStorage.getItem(CONFIG.STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
    return {
      xp: 0,
      level: 1,
      completedModules: [],
      completedExercises: [],
      quizResults: {},
      badges: [],
      streak: 0,
      lastVisit: null,
      totalTime: 0
    };
  }

  function saveProgress(progress) {
    localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(progress));
  }

  // ============================================================================
  // XP & LEVEL SYSTEM
  // ============================================================================
  function calculateLevel(xp) {
    for (let i = CONFIG.LEVEL_THRESHOLDS.length - 1; i >= 0; i--) {
      if (xp >= CONFIG.LEVEL_THRESHOLDS[i]) {
        return i + 1;
      }
    }
    return 1;
  }

  function getNextLevelXP(level) {
    if (level >= CONFIG.LEVEL_THRESHOLDS.length) {
      return CONFIG.LEVEL_THRESHOLDS[CONFIG.LEVEL_THRESHOLDS.length - 1] * 2;
    }
    return CONFIG.LEVEL_THRESHOLDS[level];
  }

  function addXP(amount, reason = '') {
    const progress = getProgress();
    const oldLevel = progress.level;
    progress.xp += amount;
    progress.level = calculateLevel(progress.xp);
    saveProgress(progress);

    // XP Gain Notification
    showXPGain(amount, reason);

    // Level Up Notification
    if (progress.level > oldLevel) {
      setTimeout(() => {
        showAchievement({
          id: 'level_up',
          name: `Level ${progress.level} erreicht!`,
          icon: '⭐',
          desc: 'Weiter so!'
        });
      }, 600);
    }

    updateXPBar();
    return progress;
  }

  // ============================================================================
  // MODULE & EXERCISES
  // ============================================================================
  function completeModule(moduleId) {
    const progress = getProgress();
    if (!progress.completedModules.includes(moduleId)) {
      progress.completedModules.push(moduleId);
      saveProgress(progress);
      addXP(CONFIG.XP_PER_MODULE, 'Modul abgeschlossen');
      
      // Check badges
      checkBadges(progress);
      
      return true;
    }
    return false;
  }

  function completeExercise(exerciseId) {
    const progress = getProgress();
    if (!progress.completedExercises.includes(exerciseId)) {
      progress.completedExercises.push(exerciseId);
      saveProgress(progress);
      addXP(CONFIG.XP_PER_EXERCISE, 'Quest abgeschlossen');
      
      checkBadges(progress);
      
      return true;
    }
    return false;
  }

  function isModuleCompleted(moduleId) {
    const progress = getProgress();
    return progress.completedModules.includes(moduleId);
  }

  function isExerciseCompleted(exerciseId) {
    const progress = getProgress();
    return progress.completedExercises.includes(exerciseId);
  }

  // ============================================================================
  // QUIZ SYSTEM
  // ============================================================================
  function saveQuizResult(quizId, score, totalQuestions) {
    const progress = getProgress();
    const percentage = Math.round((score / totalQuestions) * 100);
    
    progress.quizResults[quizId] = {
      score: score,
      total: totalQuestions,
      percentage: percentage,
      date: new Date().toISOString()
    };
    
    saveProgress(progress);

    // XP für Quiz
    let xpGained = score * CONFIG.XP_PER_QUIZ_CORRECT;
    if (percentage === 100) {
      xpGained += CONFIG.XP_PER_QUIZ_PERFECT;
      setTimeout(() => {
        unlockBadge('quiz_champion');
      }, 1000);
    }
    
    addXP(xpGained, 'Quiz abgeschlossen');
    checkBadges(progress);
    
    return progress.quizResults[quizId];
  }

  function getQuizResult(quizId) {
    const progress = getProgress();
    return progress.quizResults[quizId] || null;
  }

  // ============================================================================
  // BADGE SYSTEM
  // ============================================================================
  function unlockBadge(badgeId) {
    const progress = getProgress();
    const badge = CONFIG.BADGES[badgeId];
    
    if (badge && !progress.badges.includes(badgeId)) {
      progress.badges.push(badgeId);
      saveProgress(progress);
      showAchievement(badge);
      return true;
    }
    return false;
  }

  function checkBadges(progress) {
    // First Steps
    if (progress.completedModules.length >= 1) {
      unlockBadge('first_steps');
    }
    
    // Pixel Master - Prüft Übung + Quest
    const hasGimpExercise = progress.completedExercises.includes('02-gimp-aufgaben') ||
                           isQuestCompleted('quest-02-gimp');
    if (progress.completedModules.includes('02-gimp-grundlagen') && hasGimpExercise) {
      unlockBadge('pixel_master');
    }
    
    // Vector Hero - Prüft Übung + Quest
    const hasInkscapeExercise = progress.completedExercises.includes('03-inkscape-aufgaben') ||
                               isQuestCompleted('quest-03-inkscape');
    if (progress.completedModules.includes('03-inkscape-grundlagen') && hasInkscapeExercise) {
      unlockBadge('vector_hero');
    }
    
    // Tool Expert
    if (progress.completedModules.includes('02-gimp-grundlagen') && 
        progress.completedModules.includes('03-inkscape-grundlagen')) {
      unlockBadge('tool_expert');
    }
    
    // Logo Legend - Boss Level 05
    if (progress.completedModules.includes('05-projekt-logo')) {
      unlockBadge('logo_legend');
    }
    
    // Completionist - Alle 7 Module
    if (progress.completedModules.length >= 7) {
      unlockBadge('completionist');
    }
  }
  
  // Hilfsfunktion: Prüft ob eine Quest abgeschlossen ist
  function isQuestCompleted(questId) {
    try {
      const questLog = localStorage.getItem('grafik_quest_log');
      if (questLog) {
        const progress = JSON.parse(questLog);
        return progress[questId] && progress[questId].completed;
      }
    } catch (e) {
      console.error('Error checking quest completion:', e);
    }
    return false;
  }

  function hasBadge(badgeId) {
    const progress = getProgress();
    return progress.badges.includes(badgeId);
  }

  // ============================================================================
  // UI KOMPONENTEN
  // ============================================================================
  function createXPBar() {
    const progress = getProgress();
    const currentLevelXP = CONFIG.LEVEL_THRESHOLDS[progress.level - 1] || 0;
    const nextLevelXP = getNextLevelXP(progress.level);
    const xpInLevel = progress.xp - currentLevelXP;
    const xpNeeded = nextLevelXP - currentLevelXP;
    const percentage = Math.min(100, Math.round((xpInLevel / xpNeeded) * 100));

    const container = document.createElement('div');
    container.className = 'gq-xp-bar-container';
    container.innerHTML = `
      <div class="gq-level-badge">Level ${progress.level}</div>
      <div class="gq-xp-wrapper">
        <div class="gq-xp-info">
          <span>${xpInLevel} / ${xpNeeded} XP</span>
          <span>${percentage}%</span>
        </div>
        <div class="gq-xp-bar">
          <div class="gq-xp-fill" style="width: ${percentage}%"></div>
        </div>
      </div>
    `;

    return container;
  }

  function updateXPBar() {
    let xpBar = document.querySelector('.gq-xp-bar-container');
    if (xpBar) {
      const newXPBar = createXPBar();
      xpBar.replaceWith(newXPBar);
    }
  }

  function showXPGain(amount, reason) {
    // Remove existing notification
    const existing = document.querySelector('.gq-xp-gain');
    if (existing) existing.remove();

    const notification = document.createElement('div');
    notification.className = 'gq-xp-gain';
    notification.innerHTML = `+${amount} XP${reason ? ` • ${reason}` : ''}`;
    document.body.appendChild(notification);

    // Trigger animation
    requestAnimationFrame(() => {
      notification.classList.add('show');
    });

    // Remove after delay
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => notification.remove(), 400);
    }, 2500);
  }

  function showAchievement(badge) {
    // Remove existing notification
    const existing = document.querySelector('.gq-achievement');
    if (existing) existing.remove();

    const achievement = document.createElement('div');
    achievement.className = 'gq-achievement';
    achievement.innerHTML = `
      <div class="gq-achievement-icon">${badge.icon}</div>
      <div class="gq-achievement-text">
        <h4>${badge.id === 'level_up' ? 'Level Aufstieg!' : 'Achievement freigeschaltet!'}</h4>
        <p>${badge.name}</p>
      </div>
      <button class="gq-achievement-close" onclick="this.parentElement.remove()">×</button>
    `;
    document.body.appendChild(achievement);

    // Play sound effect (optional - browser policy may block)
    // const audio = new Audio('../assets/sounds/achievement.mp3');
    // audio.play().catch(() => {});

    // Trigger animation
    requestAnimationFrame(() => {
      achievement.classList.add('show');
    });

    // Auto-remove after delay
    setTimeout(() => {
      achievement.classList.remove('show');
      setTimeout(() => achievement.remove(), 600);
    }, 5000);
  }

  // ============================================================================
  // QUIZ UI
  // ============================================================================
  function initQuiz(containerId, quizData) {
    const container = document.getElementById(containerId);
    if (!container) return;

    let currentQuestion = 0;
    let score = 0;
    let selectedOption = null;

    function renderQuestion() {
      const q = quizData.questions[currentQuestion];
      const progress = getProgress();
      
      let dotsHTML = '';
      for (let i = 0; i < quizData.questions.length; i++) {
        let dotClass = 'gq-quiz-dot';
        if (i < currentQuestion) {
          dotClass += ' correct';
        } else if (i === currentQuestion) {
          dotClass += ' active';
        }
        dotsHTML += `<div class="${dotClass}"></div>`;
      }

      let optionsHTML = '';
      q.options.forEach((opt, idx) => {
        optionsHTML += `
          <div class="gq-option" data-index="${idx}">
            <span class="gq-option-indicator">${String.fromCharCode(65 + idx)}</span>
            <span>${opt}</span>
          </div>
        `;
      });

      container.innerHTML = `
        <div class="gq-quiz-container">
          <div class="gq-quiz-header">
            <h3>${quizData.title}</h3>
            <p>Frage ${currentQuestion + 1} von ${quizData.questions.length}</p>
          </div>
          <div class="gq-quiz-progress">
            ${dotsHTML}
          </div>
          <div class="gq-question">
            <p class="gq-question-text">${q.question}</p>
            <div class="gq-options">
              ${optionsHTML}
            </div>
          </div>
          <div class="gq-quiz-feedback" id="quiz-feedback"></div>
          <div class="gq-quiz-actions">
            <button class="nav-button" id="quiz-check" disabled>Überprüfen</button>
          </div>
        </div>
      `;

      // Add event listeners (nur einmal)
      const existingOptions = container.querySelectorAll('.gq-option');
      existingOptions.forEach(opt => {
        opt.replaceWith(opt.cloneNode(true));
      });
      container.querySelectorAll('.gq-option').forEach(opt => {
        opt.addEventListener('click', () => {
          container.querySelectorAll('.gq-option').forEach(o => o.classList.remove('selected'));
          opt.classList.add('selected');
          selectedOption = parseInt(opt.dataset.index);
          document.getElementById('quiz-check').disabled = false;
        });
      });

      const checkBtn = document.getElementById('quiz-check');
      checkBtn.replaceWith(checkBtn.cloneNode(true));
      document.getElementById('quiz-check').addEventListener('click', checkAnswer);
    }

    function checkAnswer() {
      const q = quizData.questions[currentQuestion];
      const feedback = document.getElementById('quiz-feedback');
      const options = container.querySelectorAll('.gq-option');
      const checkBtn = document.getElementById('quiz-check');
      
      // Verhindere Mehrfach-Klicks
      checkBtn.disabled = true;
      checkBtn.removeEventListener('click', checkAnswer);

      options.forEach((opt, idx) => {
        opt.style.pointerEvents = 'none';
        if (idx === q.correct) {
          opt.classList.add('correct');
        } else if (idx === selectedOption && idx !== q.correct) {
          opt.classList.add('wrong');
        }
      });

      const isCorrect = selectedOption === q.correct;
      if (isCorrect) score++;

      feedback.innerHTML = isCorrect 
        ? `<strong>✓ Richtig!</strong> ${q.explanation || ''}`
        : `<strong>✗ Falsch.</strong> ${q.explanation || ''}`;
      feedback.className = `gq-quiz-feedback show ${isCorrect ? 'correct' : 'wrong'}`;

      checkBtn.textContent = currentQuestion < quizData.questions.length - 1 ? 'Weiter →' : 'Ergebnis anzeigen';
      checkBtn.disabled = false;
      checkBtn.onclick = () => {
        if (currentQuestion < quizData.questions.length - 1) {
          currentQuestion++;
          selectedOption = null;
          renderQuestion();
        } else {
          showResult();
        }
      };
    }

    function showResult() {
      const percentage = Math.round((score / quizData.questions.length) * 100);
      const progress = getProgress();
      
      // Save result
      saveQuizResult(quizData.id, score, quizData.questions.length);

      let message = '';
      if (percentage === 100) message = 'Perfekt! Du bist ein Meister! 🎉';
      else if (percentage >= 80) message = 'Sehr gut! Fast perfekt! 👏';
      else if (percentage >= 60) message = 'Gut gemacht! Weiter üben! 💪';
      else message = 'Nicht aufgeben! Übung macht den Meister! 📚';

      let rewardsHTML = '';
      const xpEarned = score * CONFIG.XP_PER_QUIZ_CORRECT;
      rewardsHTML += `<div class="gq-result-reward">⚡ ${xpEarned} XP</div>`;
      if (percentage === 100) {
        rewardsHTML += `<div class="gq-result-reward">🏆 Perfect Badge</div>`;
      }

      container.innerHTML = `
        <div class="gq-quiz-container">
          <div class="gq-quiz-result">
            <div class="gq-result-score">${percentage}%</div>
            <p class="gq-result-message">${message}</p>
            <p>${score} von ${quizData.questions.length} richtig</p>
            <div class="gq-result-rewards">
              ${rewardsHTML}
            </div>
            <button class="nav-button" onclick="location.reload()">Quiz wiederholen</button>
          </div>
        </div>
      `;
    }

    renderQuestion();
  }

  // ============================================================================
  // QUEST CARDS
  // ============================================================================
  function createQuestCard(questData) {
    const isCompleted = isExerciseCompleted(questData.id);
    
    return `
      <div class="gq-quest-card ${isCompleted ? 'completed' : ''}" data-quest="${questData.id}">
        <div class="gq-quest-header">
          <div class="gq-quest-icon">${questData.icon}</div>
          <div class="gq-quest-title">
            <h3>${questData.title}</h3>
          </div>
          <div class="gq-quest-xp">+${questData.xp} XP</div>
          <div class="gq-quest-status">${isCompleted ? '✅' : '⭕'}</div>
        </div>
        <p class="gq-quest-description">${questData.description}</p>
        <div class="gq-quest-reward">
          ${questData.rewards.map(r => `<span class="gq-reward-tag">${r}</span>`).join('')}
        </div>
        ${!isCompleted ? `
          <button class="nav-button" onclick="GrafikQuest.completeExercise('${questData.id}'); this.closest('.gq-quest-card').classList.add('completed'); this.remove();" style="margin-top: 16px;">
            Als abgeschlossen markieren
          </button>
        ` : `
          <div class="gq-checkpoint" style="margin-top: 16px;">Abgeschlossen</div>
        `}
      </div>
    `;
  }

  // ============================================================================
  // DASHBOARD
  // ============================================================================
  function renderDashboard(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const progress = getProgress();
    const currentLevelXP = CONFIG.LEVEL_THRESHOLDS[progress.level - 1] || 0;
    const nextLevelXP = getNextLevelXP(progress.level);
    const xpInLevel = progress.xp - currentLevelXP;

    const modules = [
      { id: '00-welcome', name: 'Willkommen', icon: '🎨' },
      { id: '01-pixel-vs-vektor', name: 'Pixel vs. Vektor', icon: '📊' },
      { id: '02-gimp-grundlagen', name: 'GIMP Grundlagen', icon: '🖌️' },
      { id: '03-inkscape-grundlagen', name: 'Inkscape Grundlagen', icon: '📐' },
      { id: '04-dateiformate-web', name: 'Formate & Web', icon: '🌐' },
      { id: '05-projekt-logo', name: 'Logo Projekt', icon: '🎯' },
      { id: '06-animierte-grafiken', name: 'Animationen', icon: '🎬' }
    ];

    container.innerHTML = `
      <div class="gq-dashboard">
        <div class="gq-dashboard-header">
          <div class="gq-avatar">🎮</div>
          <div class="gq-player-info">
            <h3>Grafik Abenteurer</h3>
            <p>Level ${progress.level} • ${progress.xp} XP gesamt</p>
          </div>
        </div>
        
        <div class="gq-stats-grid">
          <div class="gq-stat-card">
            <div class="gq-stat-value">${progress.completedModules.length}</div>
            <div class="gq-stat-label">Module</div>
          </div>
          <div class="gq-stat-card">
            <div class="gq-stat-value">${progress.completedExercises.length}</div>
            <div class="gq-stat-label">Quests</div>
          </div>
          <div class="gq-stat-card">
            <div class="gq-stat-value">${progress.badges.length}</div>
            <div class="gq-stat-label">Badges</div>
          </div>
          <div class="gq-stat-card">
            <div class="gq-stat-value">${Object.keys(progress.quizResults).length}</div>
            <div class="gq-stat-label">Quizze</div>
          </div>
        </div>

        <h3 style="color: var(--primary); margin-bottom: 16px;">Modul-Fortschritt</h3>
        <div class="gq-modules-progress">
          ${modules.map(m => {
            const isCompleted = progress.completedModules.includes(m.id);
            const moduleProgress = isCompleted ? 100 : 0;
            return `
              <div class="gq-module-item">
                <div class="gq-module-icon">${m.icon}</div>
                <div class="gq-module-info">
                  <h4>${m.name}</h4>
                  <div class="gq-module-bar">
                    <div class="gq-module-fill" style="width: ${moduleProgress}%"></div>
                  </div>
                </div>
                <div class="gq-module-status">${isCompleted ? '✅' : '⭕'}</div>
              </div>
            `;
          }).join('')}
        </div>

        ${progress.badges.length > 0 ? `
          <h3 style="color: var(--primary); margin: 30px 0 16px;">Deine Badges</h3>
          <div style="display: flex; gap: 12px; flex-wrap: wrap;">
            ${progress.badges.map(badgeId => {
              const badge = CONFIG.BADGES[badgeId];
              return badge ? `<span title="${badge.desc}" style="font-size: 2rem; cursor: help;">${badge.icon}</span>` : '';
            }).join('')}
          </div>
        ` : ''}
      </div>
    `;
  }

  // ============================================================================
  // INITIALISIERUNG
  // ============================================================================
  function init() {
    // Add XP Bar to page
    const header = document.querySelector('.header');
    if (header && !document.querySelector('.gq-xp-bar-container')) {
      const xpBar = createXPBar();
      document.body.insertBefore(xpBar, header.nextSibling);
      
      // Adjust main content margin
      const main = document.querySelector('.main-content');
      if (main) {
        main.style.marginTop = '60px';
      }
    }

    // Update streak
    updateStreak();
  }

  function updateStreak() {
    const progress = getProgress();
    const today = new Date().toDateString();
    const lastVisit = progress.lastVisit;
    
    if (lastVisit) {
      const lastDate = new Date(lastVisit);
      const todayDate = new Date();
      const diffDays = Math.floor((todayDate - lastDate) / (1000 * 60 * 60 * 24));
      
      if (diffDays === 1) {
        // Consecutive day
        progress.streak = (progress.streak || 0) + 1;
        if (progress.streak === 3) {
          unlockBadge('streak_3');
        }
      } else if (diffDays > 1) {
        // Streak broken
        progress.streak = 1;
      }
    } else {
      progress.streak = 1;
    }
    
    progress.lastVisit = new Date().toISOString();
    saveProgress(progress);
  }

  // ============================================================================
  // ÖFFENTLICHE API
  // ============================================================================
  return {
    init,
    addXP,
    completeModule,
    completeExercise,
    isModuleCompleted,
    isExerciseCompleted,
    saveQuizResult,
    getQuizResult,
    unlockBadge,
    hasBadge,
    getProgress,
    initQuiz,
    createQuestCard,
    renderDashboard,
    CONFIG
  };
})();

// Auto-initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  GrafikQuest.init();
});
