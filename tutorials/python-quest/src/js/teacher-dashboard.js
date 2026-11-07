/**
 * PYTHON QUEST — Teacher Dashboard
 * Supabase-first mit localStorage-Fallback
 */

import { loadProgress, getWorldProgress } from './modules/progress.js';
import { WORLDS, BADGES } from './modules/quest-data.js';
import { t } from './modules/i18n.js';
// import { isSupabaseReady } from './modules/supabase-client.js';
// import { fetchClassProgress, fetchClassReflections } from './modules/teacher-api.js';

const CLASS_STORAGE_KEY = 'pyquest-class-data';

/* ── Helpers ─────────────────────────────────────────────────────────── */

function loadClassData() {
  try {
    const stored = localStorage.getItem(CLASS_STORAGE_KEY);
    return stored ? JSON.parse(stored) : { students: [] };
  } catch {
    return { students: [] };
  }
}

function saveClassData(data) {
  localStorage.setItem(CLASS_STORAGE_KEY, JSON.stringify(data));
}

function getReflections() {
  const reflections = {};
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key?.startsWith('pyquest-reflection:')) {
      reflections[key.replace('pyquest-reflection:', '')] = localStorage.getItem(key);
    }
  }
  return reflections;
}

function getCurrentStudent() {
  const progress = loadProgress();
  return {
    id: 'local-' + Date.now(),
    name: 'Lokaler Schüler',
    progress,
    reflections: getReflections(),
    importedAt: new Date().toISOString()
  };
}

function formatDate(iso) {
  if (!iso) return '—';
  try {
    return new Date(iso).toLocaleDateString('de-DE');
  } catch {
    return iso;
  }
}

/* ── Rendering ───────────────────────────────────────────────────────── */

function renderOverview(students) {
  const totalQuests = WORLDS.reduce((sum, w) => sum + w.quests.length, 0);
  const totalCompleted = students.reduce((sum, s) => sum + (s.progress.completedQuests?.length || 0), 0);
  const avgLevel = students.length ? Math.round(students.reduce((sum, s) => sum + (s.progress.level || 1), 0) / students.length) : 1;
  const totalBadges = students.reduce((sum, s) => sum + (s.progress.earnedBadges?.length || 0), 0);
  const avgProgress = students.length ? Math.round((totalCompleted / (students.length * totalQuests)) * 100) : 0;

  const grid = document.getElementById('teacher-stats-grid');
  if (!grid) return;

  grid.innerHTML = `
    <div class="py-quest-feature-card" data-color="primary">
      <div class="py-quest-feature-card__icon"><i class="ph ph-chart-pie" aria-hidden="true"></i></div>
      <h3 class="py-quest-feature-card__title">${avgProgress}%</h3>
      <p class="py-quest-feature-card__text">${t('teacher.totalProgress')}</p>
    </div>
    <div class="py-quest-feature-card" data-color="orange">
      <div class="py-quest-feature-card__icon"><i class="ph ph-check-circle" aria-hidden="true"></i></div>
      <h3 class="py-quest-feature-card__title">${totalCompleted} / ${totalQuests * students.length}</h3>
      <p class="py-quest-feature-card__text">${t('teacher.questsCompleted')}</p>
    </div>
    <div class="py-quest-feature-card" data-color="green">
      <div class="py-quest-feature-card__icon"><i class="ph ph-trend-up" aria-hidden="true"></i></div>
      <h3 class="py-quest-feature-card__title">${avgLevel}</h3>
      <p class="py-quest-feature-card__text">${t('teacher.avgLevel')}</p>
    </div>
    <div class="py-quest-feature-card" data-color="purple">
      <div class="py-quest-feature-card__icon"><i class="ph ph-trophy" aria-hidden="true"></i></div>
      <h3 class="py-quest-feature-card__title">${totalBadges}</h3>
      <p class="py-quest-feature-card__text">${t('teacher.totalBadges')}</p>
    </div>
  `;
}

function renderStudentsTable(students) {
  const tbody = document.getElementById('teacher-students-body');
  if (!tbody) return;

  if (students.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" class="py-quest-teacher__empty">${t('teacher.noData')}</td></tr>`;
    return;
  }

  tbody.innerHTML = students.map(s => {
    const totalQuests = WORLDS.reduce((sum, w) => sum + w.quests.length, 0);
    const completed = s.progress.completedQuests?.length || 0;
    const badges = s.progress.earnedBadges?.length || 0;
    const streak = s.progress.streak?.count || 0;
    const isActive = s.progress.stats?.questsStarted > 0;

    return `
      <tr>
        <td><strong>${s.name || '—'}</strong></td>
        <td>${s.progress.level || 1}</td>
        <td>${s.progress.xp || 0}</td>
        <td>${completed} / ${totalQuests}</td>
        <td>${badges}</td>
        <td><span class="py-quest-teacher__streak ${streak > 1 ? 'is-hot' : ''}"><i class="ph ph-fire" aria-hidden="true"></i> ${streak}</span></td>
        <td><span class="py-quest-teacher__status ${isActive ? 'is-active' : 'is-inactive'}">${isActive ? t('teacher.statusActive') : t('teacher.statusInactive')}</span></td>
      </tr>
    `;
  }).join('');
}

function renderQuestDetails(students) {
  const container = document.getElementById('teacher-quest-details');
  if (!container) return;

  if (students.length === 0) {
    container.innerHTML = '';
    return;
  }

  const student = students[0];
  const completed = new Set(student.progress.completedQuests || []);

  container.innerHTML = WORLDS.map(world => {
    const worldCompleted = world.quests.filter(q => completed.has(`${world.id}:${q.id}`)).length;
    return `
      <div class="py-quest-teacher__world">
        <h4 class="py-quest-teacher__world-title">${world.title}</h4>
        <div class="py-quest-teacher__world-bar">
          <div class="py-quest-teacher__world-fill" style="width: ${(worldCompleted / world.quests.length) * 100}%"></div>
        </div>
        <span class="py-quest-teacher__world-count">${worldCompleted} / ${world.quests.length}</span>
      </div>
    `;
  }).join('');
}

function renderReflections(reflections) {
  const container = document.getElementById('teacher-reflections');
  if (!container) return;

  if (reflections.length === 0) {
    container.innerHTML = `<p class="py-quest-teacher__empty">${t('teacher.noReflections')}</p>`;
    return;
  }

  container.innerHTML = reflections.map(r => `
    <div class="py-quest-teacher__reflection">
      <div class="py-quest-teacher__reflection-header">
        <span class="py-quest-teacher__reflection-student">${r.student}</span>
        <span class="py-quest-teacher__reflection-quest">${r.questId || r.quest_id}</span>
      </div>
      <p class="py-quest-teacher__reflection-text">${r.text || r.content}</p>
    </div>
  `).join('');
}

/* ── Data Loading ────────────────────────────────────────────────────── */

async function loadFromSupabase(classCode) {
  // PHP-Backend folgt
  return null;
}

function loadFromLocalStorage() {
  const classData = loadClassData();
  const current = getCurrentStudent();
  const existingIdx = classData.students.findIndex(s => s.id === current.id);
  if (existingIdx >= 0) {
    classData.students[existingIdx] = current;
  } else {
    classData.students.push(current);
  }
  saveClassData(classData);

  const reflections = [];
  classData.students.forEach(s => {
    if (s.reflections) {
      Object.entries(s.reflections).forEach(([questId, text]) => {
        reflections.push({ student: s.name, questId, text });
      });
    }
  });

  return { students: classData.students, reflections };
}

/* ── Main Dashboard Render ───────────────────────────────────────────── */

async function renderDashboard() {
  const classCodeInput = document.getElementById('teacher-class-code');
  const classCode = classCodeInput?.value?.trim() || '';

  const data = loadFromLocalStorage();

  renderOverview(data.students);
  renderStudentsTable(data.students);
  renderQuestDetails(data.students);
  renderReflections(data.reflections);

  // Update source indicator
  const sourceEl = document.getElementById('teacher-source-indicator');
  if (sourceEl) {
    sourceEl.textContent = classCode
      ? `Datenquelle: Lokaler Speicher (Klasse: ${classCode})`
      : 'Datenquelle: Lokaler Speicher';
  }
}

/* ── Export / Import ─────────────────────────────────────────────────── */

function setupExportImport() {
  const exportBtn = document.getElementById('teacher-export');
  const importBtn = document.getElementById('teacher-import');
  const importFile = document.getElementById('teacher-import-file');

  if (exportBtn) {
    exportBtn.addEventListener('click', () => {
      const classData = loadClassData();
      const blob = new Blob([JSON.stringify(classData, null, 2)], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `python-quest-class-${new Date().toISOString().split('T')[0]}.json`;
      a.click();
      URL.revokeObjectURL(url);
    });
  }

  if (importBtn && importFile) {
    importBtn.addEventListener('click', () => importFile.click());
    importFile.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;
      const reader = new FileReader();
      reader.onload = (ev) => {
        try {
          const data = JSON.parse(ev.target.result);
          if (data.students && Array.isArray(data.students)) {
            const classData = loadClassData();
            data.students.forEach(newStudent => {
              const idx = classData.students.findIndex(s => s.id === newStudent.id);
              if (idx >= 0) {
                classData.students[idx] = newStudent;
              } else {
                classData.students.push(newStudent);
              }
            });
            saveClassData(classData);
            renderDashboard();
          }
        } catch (err) {
          console.warn('Import failed:', err);
        }
      };
      reader.readAsText(file);
    });
  }
}

function setupClassCodeFilter() {
  const input = document.getElementById('teacher-class-code');
  const loadBtn = document.getElementById('teacher-load-class');

  if (loadBtn) {
    loadBtn.addEventListener('click', () => renderDashboard());
  }

  if (input) {
    input.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') renderDashboard();
    });
  }
}

/* ── Init ────────────────────────────────────────────────────────────── */

export function initTeacherDashboard() {
  // Insert class code filter if not present
  const noteEl = document.querySelector('.py-quest-teacher__note');
  if (noteEl && !document.getElementById('teacher-class-filter')) {
    const filterHtml = `
      <div id="teacher-class-filter" style="display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap;">
        <input type="text" id="teacher-class-code" placeholder="Klassencode eingeben..." 
          style="flex: 1; min-width: 200px; padding: 0.5rem 0.75rem; border-radius: var(--py-radius-lg); border: 1px solid var(--py-border-color); background: var(--py-bg-card); color: var(--py-text-primary);">
        <button id="teacher-load-class" class="py-quest-btn py-quest-btn--primary">
          <i class="ph ph-magnifying-glass" aria-hidden="true"></i> Laden
        </button>
      </div>
      <p id="teacher-source-indicator" style="font-size: var(--py-text-xs); color: var(--py-text-muted); margin-bottom: 0.5rem;">Datenquelle: Lokaler Speicher</p>
    `;
    noteEl.insertAdjacentHTML('beforebegin', filterHtml);
  }

  setupClassCodeFilter();
  setupExportImport();
  renderDashboard();
}
