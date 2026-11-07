/**
 * Progress System - Phase 2
 * XP, Level, Mission Status Management
 * localStorage based, DSGVO-konform (nur lokal)
 */

const ProgressSystem = {
  // Keys
  keys: {
    level: 'bt.level',
    xp: 'bt.xp',
    missionStatus: 'bt.missionStatus',
    missionProgress: 'bt.missionProgress'
  },

  // Level Thresholds
  levels: [
    { level: 1, min: 0, max: 99, title: 'Script Kiddie' },
    { level: 2, min: 100, max: 249, title: 'Backend Recruit' },
    { level: 3, min: 250, max: 499, title: 'Server Operator' },
    { level: 4, min: 500, max: Infinity, title: 'TechOps Specialist' }
  ],

  // Mission Config
  missions: {
    '01': { xp: 50, title: 'Server erkennen', duration: '~10 Min', next: '02' },
    '02': { xp: 50, title: 'Ersten Code schreiben', duration: '~15 Min', next: '03' },
    '03': { xp: 75, title: 'Express Server', duration: '~20 Min', next: '04' },
    '04': { xp: 50, title: 'PHP Basics', duration: '~15 Min', next: '05' },
    '05': { xp: 75, title: 'Datenbank verbinden', duration: '~20 Min', next: '06' },
    '06': { xp: 50, title: 'Node vs PHP', duration: '~10 Min', next: '07' },
    '07': { xp: 50, title: 'Sicherheit', duration: '~15 Min', next: '08' },
    '08': { xp: 100, title: 'Mini API bauen', duration: '~25 Min', next: null }
  },

  // Initialize
  init() {
    this.migrate();
    this.updateUI();
  },

  // Migration: Set defaults if empty
  migrate() {
    if (localStorage.getItem(this.keys.level) === null) {
      localStorage.setItem(this.keys.level, '1');
    }
    if (localStorage.getItem(this.keys.xp) === null) {
      localStorage.setItem(this.keys.xp, '0');
    }
    if (localStorage.getItem(this.keys.missionStatus) === null) {
      const defaultStatus = {
        '01': 'active',
        '02': 'locked', '03': 'locked', '04': 'locked',
        '05': 'locked', '06': 'locked', '07': 'locked', '08': 'locked'
      };
      localStorage.setItem(this.keys.missionStatus, JSON.stringify(defaultStatus));
    }
    if (localStorage.getItem(this.keys.missionProgress) === null) {
      const defaultProgress = {
        '01': 0, '02': 0, '03': 0, '04': 0,
        '05': 0, '06': 0, '07': 0, '08': 0
      };
      localStorage.setItem(this.keys.missionProgress, JSON.stringify(defaultProgress));
    }
  },

  // Getters
  getLevel() {
    return parseInt(localStorage.getItem(this.keys.level)) || 1;
  },

  getXP() {
    return parseInt(localStorage.getItem(this.keys.xp)) || 0;
  },

  getMissionStatus() {
    try {
      return JSON.parse(localStorage.getItem(this.keys.missionStatus)) || {};
    } catch {
      return {};
    }
  },

  getMissionProgress() {
    try {
      return JSON.parse(localStorage.getItem(this.keys.missionProgress)) || {};
    } catch {
      return {};
    }
  },

  // Setters
  setLevel(level) {
    localStorage.setItem(this.keys.level, level.toString());
  },

  setXP(xp) {
    localStorage.setItem(this.keys.xp, xp.toString());
    this.checkLevelUp();
  },

  setMissionStatus(missionId, status) {
    const statuses = this.getMissionStatus();
    statuses[missionId] = status;
    localStorage.setItem(this.keys.missionStatus, JSON.stringify(statuses));
  },

  setMissionProgress(missionId, percent) {
    const progresses = this.getMissionProgress();
    progresses[missionId] = Math.min(100, Math.max(0, percent));
    localStorage.setItem(this.keys.missionProgress, JSON.stringify(progresses));
  },

  // Check Level Up
  checkLevelUp() {
    const xp = this.getXP();
    const currentLevel = this.getLevel();
    let newLevel = currentLevel;

    for (let i = this.levels.length - 1; i >= 0; i--) {
      if (xp >= this.levels[i].min) {
        newLevel = this.levels[i].level;
        break;
      }
    }

    if (newLevel > currentLevel) {
      this.setLevel(newLevel);
      this.showLevelUpNotification(newLevel);
    }
  },

  // Show Level Up (non-intrusive)
  showLevelUpNotification(level) {
    const levelInfo = this.levels.find(l => l.level === level);
    console.log(`[Level Up] Level ${level}: ${levelInfo.title}`);
    
    // Dispatch custom event for UI
    window.dispatchEvent(new CustomEvent('levelup', { 
      detail: { level, title: levelInfo.title } 
    }));
  },

  // Complete Mission
  completeMission(missionId) {
    const mission = this.missions[missionId];
    if (!mission) return false;

    // Mark as completed
    this.setMissionStatus(missionId, 'completed');
    this.setMissionProgress(missionId, 100);

    // Add XP
    const currentXP = this.getXP();
    this.setXP(currentXP + mission.xp);

    // Unlock next mission
    if (mission.next) {
      const nextStatus = this.getMissionStatus()[mission.next];
      if (nextStatus === 'locked') {
        this.setMissionStatus(mission.next, 'active');
      }
    }

    this.updateUI();
    return true;
  },

  // Get Active Mission
  getActiveMission() {
    const statuses = this.getMissionStatus();
    for (let i = 1; i <= 8; i++) {
      const id = i.toString().padStart(2, '0');
      if (statuses[id] === 'active') {
        return { id, ...this.missions[id] };
      }
    }
    return null;
  },

  // Calculate Overall Progress
  getOverallProgress() {
    const progresses = this.getMissionProgress();
    const values = Object.values(progresses);
    const sum = values.reduce((a, b) => a + b, 0);
    return Math.round(sum / values.length);
  },

  // Update UI Elements
  updateUI() {
    this.updateProfileBadge();
    this.updateActiveMission();
    this.updateMissionDeck();
  },

  // Update Profile Badge
  updateProfileBadge() {
    const level = this.getLevel();
    const xp = this.getXP();
    
    const levelEl = document.querySelector('.profile-badge .level');
    const xpEl = document.querySelector('.profile-badge .xp');
    
    if (levelEl) levelEl.textContent = `Lvl ${level}`;
    if (xpEl) xpEl.textContent = `${xp} XP`;
  },

  // Update Active Mission Section
  updateActiveMission() {
    const active = this.getActiveMission();
    if (!active) return;

    const statusTitle = document.querySelector('.mission-status h2');
    const statusMeta = document.querySelector('.mission-meta');
    const progressBar = document.querySelector('.progress-bar');
    const rewardXP = document.querySelector('.reward-xp');
    const rewardBadge = document.querySelector('.reward-badge');
    const startBtn = document.querySelector('.btn-primary');

    if (statusTitle) statusTitle.textContent = `${active.id} – ${active.title}`;
    if (statusMeta) statusMeta.textContent = `${active.duration} • Schritt ${active.id} von 8`;
    if (rewardXP) rewardXP.textContent = `+${active.xp} XP`;
    if (rewardBadge) rewardBadge.textContent = `Badge: ${this.levels[this.getLevel() - 1].title}`;
    
    // Progress Bar
    const progress = this.getMissionProgress()[active.id] || 0;
    if (progressBar) progressBar.style.width = `${progress}%`;

    // Start Button Link
    if (startBtn) {
      startBtn.href = `kapitel/${active.id}-was-ist-backend.html`.replace('01-was-ist-backend', '01-was-ist-backend');
      // Fix for different file naming
      const linkMap = {
        '01': 'kapitel/01-was-ist-backend.html',
        '02': 'kapitel/02-nodejs-grundlagen.html',
        '03': 'kapitel/03-express-webserver.html',
        '04': 'kapitel/04-php-xampp.html',
        '05': 'kapitel/05-formulare-datenbank.html',
        '06': 'kapitel/06-vergleich-node-php.html',
        '07': 'kapitel/07-sicherheit.html',
        '08': 'kapitel/08-projekt-mini-api.html'
      };
      startBtn.href = linkMap[active.id] || '#';
    }
  },

  // Update Mission Deck Cards
  updateMissionDeck() {
    const statuses = this.getMissionStatus();
    const progresses = this.getMissionProgress();

    document.querySelectorAll('.mission-card').forEach(card => {
      const missionId = card.querySelector('.mission-number')?.textContent;
      if (!missionId) return;

      const status = statuses[missionId];
      const progress = progresses[missionId] || 0;

      // Remove old state classes
      card.classList.remove('active', 'locked', 'completed');
      card.classList.add(status);

      // Update state label
      const stateEl = card.querySelector('.mission-state');
      if (stateEl) {
        stateEl.textContent = status === 'completed' ? 'Done' : status;
      }

      // Add progress indicator for completed
      if (status === 'completed') {
        card.style.borderColor = 'var(--accent)';
      }
    });
  },

  // Reset All (for testing)
  reset() {
    localStorage.removeItem(this.keys.level);
    localStorage.removeItem(this.keys.xp);
    localStorage.removeItem(this.keys.missionStatus);
    localStorage.removeItem(this.keys.missionProgress);
    this.init();
    console.log('[Progress] Reset complete');
  },

  // Debug Info
  debug() {
    console.log({
      level: this.getLevel(),
      xp: this.getXP(),
      missions: this.getMissionStatus(),
      progress: this.getMissionProgress(),
      overall: this.getOverallProgress()
    });
  }
};

// Initialize on DOM ready
document.addEventListener('DOMContentLoaded', () => {
  ProgressSystem.init();
});

// Expose globally for inline handlers
window.ProgressSystem = ProgressSystem;
