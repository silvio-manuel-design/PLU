/**
 * Missions System - Phase 3
 * Central API for XP, Level, Mission Status, Side Quests
 */

const MissionsAPI = {
  keys: {
    level: 'bt.level',
    xp: 'bt.xp',
    missionStatus: 'bt.missionStatus',
    missionProgress: 'bt.missionProgress',
    sideQuestStatus: 'bt.sideQuestStatus',
    sideQuestProgress: 'bt.sideQuestProgress',
    aiLogs: 'bt.aiLogs',
    abgabeChecks: 'bt.abgabeChecks'
  },

  // Level Configuration
  levels: [
    { level: 1, min: 0, max: 99, title: 'Script Kiddie' },
    { level: 2, min: 100, max: 249, title: 'Backend Recruit' },
    { level: 3, min: 250, max: 499, title: 'Server Operator' },
    { level: 4, min: 500, max: Infinity, title: 'TechOps Specialist' }
  ],

  // Main Missions (01-08)
  missions: {
    '01': { xp: 50, title: 'Server erkennen', duration: '~10 Min', next: '02', path: 'kapitel/01-was-ist-backend.html' },
    '02': { xp: 50, title: 'Ersten Code schreiben', duration: '~15 Min', next: '03', path: 'kapitel/02-nodejs-grundlagen.html' },
    '03': { xp: 75, title: 'Express Server', duration: '~20 Min', next: '04', path: 'kapitel/03-express-webserver.html' },
    '04': { xp: 50, title: 'PHP Basics', duration: '~15 Min', next: '05', path: 'kapitel/04-php-xampp.html' },
    '05': { xp: 75, title: 'Datenbank verbinden', duration: '~20 Min', next: '06', path: 'kapitel/05-formulare-datenbank.html' },
    '06': { xp: 50, title: 'Node vs PHP', duration: '~10 Min', next: '07', path: 'kapitel/06-vergleich-node-php.html' },
    '07': { xp: 50, title: 'Sicherheit', duration: '~15 Min', next: '08', path: 'kapitel/07-sicherheit.html' },
    '08': { xp: 100, title: 'Mini API bauen', duration: '~25 Min', next: null, path: 'kapitel/08-projekt-mini-api.html' }
  },

  // Side Quests (U00-U05)
  sideQuests: {
    'U00': { xp: 25, title: 'Server einrichten', duration: '~20 Min', path: 'uebungen/00-server-einrichten.html' },
    'U01': { xp: 35, title: 'Node.js Basics', duration: '~15 Min', path: 'uebungen/01-node-grundlagen.html' },
    'U02': { xp: 40, title: 'Express Routing', duration: '~20 Min', path: 'uebungen/02-express-routing.html' },
    'U03': { xp: 35, title: 'PHP Formular', duration: '~15 Min', path: 'uebungen/03-php-formular.html' },
    'U04': { xp: 40, title: 'DB Abfrage', duration: '~20 Min', path: 'uebungen/04-datenbank-abfrage.html' },
    'U05': { xp: 50, title: 'DB Verwaltung', duration: '~25 Min', path: 'uebungen/05-datenbank-verwaltung.html' }
  },

  init() {
    console.log('[MissionsAPI] Initializing...');
    this.migrate();
    console.log('[MissionsAPI] Ready. Level:', this.getLevel(), 'XP:', this.getXP());
  },

  migrate() {
    // Initialize defaults if empty
    if (!localStorage.getItem(this.keys.level)) {
      localStorage.setItem(this.keys.level, '1');
    }
    if (!localStorage.getItem(this.keys.xp)) {
      localStorage.setItem(this.keys.xp, '0');
    }
    if (!localStorage.getItem(this.keys.missionStatus)) {
      const status = { '01': 'active' };
      for (let i = 2; i <= 8; i++) {
        status[i.toString().padStart(2, '0')] = 'locked';
      }
      localStorage.setItem(this.keys.missionStatus, JSON.stringify(status));
    }
    if (!localStorage.getItem(this.keys.missionProgress)) {
      const progress = {};
      for (let i = 1; i <= 8; i++) {
        progress[i.toString().padStart(2, '0')] = 0;
      }
      localStorage.setItem(this.keys.missionProgress, JSON.stringify(progress));
    }
    if (!localStorage.getItem(this.keys.sideQuestStatus)) {
      const sqStatus = {};
      for (let i = 0; i <= 5; i++) {
        sqStatus['U' + i.toString().padStart(2, '0')] = 'available';
      }
      localStorage.setItem(this.keys.sideQuestStatus, JSON.stringify(sqStatus));
    }
    if (!localStorage.getItem(this.keys.aiLogs)) {
      localStorage.setItem(this.keys.aiLogs, JSON.stringify({}));
    }
    if (!localStorage.getItem(this.keys.abgabeChecks)) {
      localStorage.setItem(this.keys.abgabeChecks, JSON.stringify({}));
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
  
  getSideQuestStatus() { 
    try {
      return JSON.parse(localStorage.getItem(this.keys.sideQuestStatus)) || {}; 
    } catch {
      return {};
    }
  },
  
  getAbgabeChecks(id) {
    try {
      const all = JSON.parse(localStorage.getItem(this.keys.abgabeChecks)) || {};
      return all[id] || { code: false, screenshot: false, kilog: false, readme: false };
    } catch {
      return { code: false, screenshot: false, kilog: false, readme: false };
    }
  },

  // Setters
  setLevel(l) { 
    localStorage.setItem(this.keys.level, l.toString()); 
  },
  
  setXP(xp) { 
    localStorage.setItem(this.keys.xp, xp.toString()); 
    this.checkLevelUp();
  },

  checkLevelUp() {
    const xp = this.getXP();
    const currentLevel = this.getLevel();
    let newLevel = currentLevel;

    // Finde das höchste Level, das der XP entspricht
    for (let i = 0; i < this.levels.length; i++) {
      if (xp >= this.levels[i].min) {
        newLevel = this.levels[i].level;
      }
    }

    if (newLevel > currentLevel) {
      this.setLevel(newLevel);
      const levelInfo = this.levels.find(l => l.level === newLevel);
      console.log('[MissionsAPI] Level Up!', newLevel, levelInfo.title);
      
      // Dispatch Event für UI
      if (typeof window !== 'undefined') {
        window.dispatchEvent(new CustomEvent('levelup', { 
          detail: { level: newLevel, title: levelInfo.title } 
        }));
      }
    }
  },

  completeMission(id) {
    console.log('[MissionsAPI] Completing mission:', id);
    
    const mission = this.missions[id];
    if (!mission) {
      console.error('[MissionsAPI] Unknown mission:', id);
      return false;
    }

    // Prüfe ob bereits abgeschlossen
    const currentStatus = this.getMissionStatus()[id];
    if (currentStatus === 'completed') {
      console.log('[MissionsAPI] Mission already completed');
      return true; // Nicht als Fehler behandeln
    }

    // Update status
    const status = this.getMissionStatus();
    status[id] = 'completed';
    localStorage.setItem(this.keys.missionStatus, JSON.stringify(status));
    console.log('[MissionsAPI] Status set to completed');

    // Add XP
    const oldXP = this.getXP();
    const newXP = oldXP + mission.xp;
    this.setXP(newXP);
    console.log('[MissionsAPI] XP updated:', oldXP, '->', newXP);

    // Unlock next
    if (mission.next) {
      if (status[mission.next] === 'locked') {
        status[mission.next] = 'active';
        localStorage.setItem(this.keys.missionStatus, JSON.stringify(status));
        console.log('[MissionsAPI] Unlocked next mission:', mission.next);
      }
    }

    // Dispatch completion event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('missioncompleted', { 
        detail: { id, xp: mission.xp, next: mission.next } 
      }));
    }

    return true;
  },

  completeSideQuest(id) {
    console.log('[MissionsAPI] Completing side quest:', id);
    
    const sq = this.sideQuests[id];
    if (!sq) {
      console.error('[MissionsAPI] Unknown side quest:', id);
      return false;
    }

    // Prüfe ob bereits abgeschlossen
    const currentStatus = this.getSideQuestStatus()[id];
    if (currentStatus === 'completed') {
      console.log('[MissionsAPI] Side quest already completed');
      return true;
    }

    // Update status
    const status = this.getSideQuestStatus();
    status[id] = 'completed';
    localStorage.setItem(this.keys.sideQuestStatus, JSON.stringify(status));
    console.log('[MissionsAPI] Side quest status set to completed');

    // Add XP
    const oldXP = this.getXP();
    const newXP = oldXP + sq.xp;
    this.setXP(newXP);
    console.log('[MissionsAPI] XP updated:', oldXP, '->', newXP);

    // Dispatch event
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('sidequestcompleted', { 
        detail: { id, xp: sq.xp } 
      }));
    }

    return true;
  },

  setAbgabeCheck(id, field, value) {
    const all = JSON.parse(localStorage.getItem(this.keys.abgabeChecks)) || {};
    if (!all[id]) all[id] = {};
    all[id][field] = value;
    localStorage.setItem(this.keys.abgabeChecks, JSON.stringify(all));
  },

  getAILog(id) {
    try {
      const logs = JSON.parse(localStorage.getItem(this.keys.aiLogs)) || {};
      return logs[id] || { prompt: '', response: '' };
    } catch {
      return { prompt: '', response: '' };
    }
  },

  setAILog(id, prompt, response) {
    const logs = JSON.parse(localStorage.getItem(this.keys.aiLogs)) || {};
    logs[id] = { prompt, response, timestamp: new Date().toISOString() };
    localStorage.setItem(this.keys.aiLogs, JSON.stringify(logs));
  },

  exportAILog(id) {
    const log = this.getAILog(id);
    const mission = this.missions[id] || this.sideQuests[id];
    const data = {
      mission: id,
      title: mission?.title || id,
      date: new Date().toLocaleDateString('de-DE'),
      prompt: log.prompt,
      response: log.response
    };
    return JSON.stringify(data, null, 2);
  },

  getActiveMission() {
    const status = this.getMissionStatus();
    for (let i = 1; i <= 8; i++) {
      const id = i.toString().padStart(2, '0');
      if (status[id] === 'active') {
        return { id, ...this.missions[id] };
      }
    }
    return null;
  },

  getOverallProgress() {
    const status = this.getMissionStatus();
    const completed = Object.values(status).filter(s => s === 'completed').length;
    return Math.round((completed / 8) * 100);
  },

  resetAll() {
    console.log('[MissionsAPI] Resetting all data...');
    Object.values(this.keys).forEach(key => localStorage.removeItem(key));
    this.init();
    if (typeof window !== 'undefined') {
      window.dispatchEvent(new CustomEvent('missionsreset'));
    }
  },

  debug() {
    console.log({
      level: this.getLevel(),
      xp: this.getXP(),
      missionStatus: this.getMissionStatus(),
      sideQuestStatus: this.getSideQuestStatus(),
      overallProgress: this.getOverallProgress()
    });
  }
};

// Auto-initialize when script loads
if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => MissionsAPI.init());
  } else {
    MissionsAPI.init();
  }
}

// Expose globally
window.MissionsAPI = MissionsAPI;
