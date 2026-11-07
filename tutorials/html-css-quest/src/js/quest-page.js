import { initTheme } from './modules/theme.js';
import { loadProgress, completeQuest, isQuestComplete } from './modules/progress.js';
import { updateXPDisplay, showXPGain, showLevelUp } from './modules/xp-system.js';
import { worlds } from './modules/quest-data.js';
import { ClassroomManager, initBackToTop, initMobileMenu } from './modules/classroom.js';
import { validateHTML } from './modules/sandbox-validator.js';
import { initI18n, t, tOr, onLangChange, getLanguage } from './modules/i18n.js';
import de from './translations/de.js';
import en from './translations/en.js';

let currentQuest = null;
let currentWorld = null;
let autoSaveInterval = null;
let sandboxLog = [];

/* ================================================================
   UTILITIES
   ================================================================ */

function escapeHtml(text) {
  const div = document.createElement('div');
  div.textContent = text;
  return div.innerHTML;
}

function debounce(fn, delay) {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => fn(...args), delay);
  };
}

function showToast(message, icon = 'ph-check-circle') {
  const toast = document.getElementById('quest-toast');
  const text = document.getElementById('quest-toast-text');
  if (!toast || !text) return;
  text.textContent = message;
  toast.querySelector('i').className = `ph ${icon}`;
  toast.classList.add('quest-toast--show');
  setTimeout(() => toast.classList.remove('quest-toast--show'), 3000);
}

/* ================================================================
   WORLD COLOR HELPERS
   ================================================================ */

function getWorldRGB(worldId) {
  const map = {
    'welt-1': '230, 126, 34',
    'welt-2': '39, 174, 96',
    'welt-3': '41, 128, 185',
    'welt-4': '142, 68, 173'
  };
  return map[worldId] || '243, 156, 18';
}

function getWorldColor(worldId) {
  const map = {
    'welt-1': '#E67E22',
    'welt-2': '#27AE60',
    'welt-3': '#2980B9',
    'welt-4': '#8E44AD'
  };
  return map[worldId] || '#F39C12';
}

function applyWorldTheme() {
  const rgb = getWorldRGB(currentWorld?.id);
  const color = getWorldColor(currentWorld?.id);
  document.documentElement.style.setProperty('--world-accent', color);
  document.documentElement.style.setProperty('--world-accent-rgb', rgb);

  // Hero accent bar & sidebar use CSS var --world-accent from above
}

/* ================================================================
   SIDEBAR
   ================================================================ */

function renderSidebar() {
  const progress = loadProgress();
  const worldQuests = currentWorld.quests;
  const completedInWorld = worldQuests.filter(q => progress.completedQuests.includes(q.id));
  const percent = Math.round((completedInWorld.length / worldQuests.length) * 100);

  // World info
  const worldIcon = document.querySelector('#sidebar-world .quest-sidebar__world-icon');
  const worldTitle = document.querySelector('#sidebar-world .quest-sidebar__world-info h4');
  const worldMeta = document.querySelector('#sidebar-world .quest-sidebar__world-info p');

  if (worldIcon) {
    worldIcon.innerHTML = `<i class="ph ${currentWorld.icon}"></i>`;
  }
  if (worldTitle) worldTitle.textContent = t('world.' + currentWorld.id + '.title') || currentWorld.title;
  if (worldMeta) worldMeta.textContent = `${completedInWorld.length}/${worldQuests.length} ${t('quest.quests')}`;

  // Progress
  const progressText = document.getElementById('sidebar-progress-text');
  const progressFill = document.getElementById('sidebar-progress-fill');
  if (progressText) progressText.textContent = `${percent}%`;
  if (progressFill) progressFill.style.setProperty('--progress-width', `${percent}%`);

  // Quest list
  const list = document.getElementById('sidebar-list');
  if (!list) return;

  list.innerHTML = worldQuests.map((q, idx) => {
    const isDone = progress.completedQuests.includes(q.id);
    const isCurrent = q.id === currentQuest.id;
    const isLocked = idx > 0 && !progress.completedQuests.includes(worldQuests[idx - 1].id) && !isDone && !isCurrent;
    const classes = [
      'quest-sidebar__item',
      isCurrent ? 'quest-sidebar__item--current' : '',
      isDone ? 'quest-sidebar__item--done' : '',
      isLocked ? 'quest-sidebar__item--locked' : ''
    ].filter(Boolean).join(' ');

    const dotClass = isDone ? 'quest-sidebar__dot--done' : (isCurrent ? 'quest-sidebar__dot--current' : '');

    if (isLocked) {
      return `
        <li class="${classes}">
          <span class="quest-sidebar__dot"></span>
          <span class="quest-sidebar__item-text">${escapeHtml(tOr('quest.' + q.id + '.title') || q.title)}</span>
          <i class="ph ph-lock-key u-text-xs u-text-muted"></i>
        </li>
      `;
    }

    const questTitle = tOr('quest.' + q.id + '.title') || q.title;
    return `
      <li class="${classes}" data-quest-link="?world=${currentWorld.id}&quest=${q.id}">
        <span class="quest-sidebar__dot ${dotClass}"></span>
        <span class="quest-sidebar__item-text">${escapeHtml(questTitle)}</span>
        ${isDone ? '<i class="ph ph-check u-text-xs u-text-success"></i>' : `<span class="quest-sidebar__item-xp">+${q.xp} XP</span>`}
      </li>
    `;
  }).join('');
}

/* ================================================================
   HERO
   ================================================================ */

function renderHero() {
  const heroWorld = document.getElementById('quest-hero-world');
  const heroTitle = document.getElementById('quest-hero-title');
  const heroMeta = document.getElementById('quest-hero-meta');
  const heroBg = document.querySelector('.quest-hero--detail .quest-hero__bg picture');

  if (heroWorld) {
    heroWorld.innerHTML = `
      <i class="ph ${currentWorld.icon}"></i>
      <span>${t('world.' + currentWorld.id + '.title') || currentWorld.title}</span>
    `;
    heroWorld.style.setProperty('--hero-border', `rgba(${getWorldRGB(currentWorld.id)}, 0.3)`);
    heroWorld.style.setProperty('--hero-bg', `rgba(${getWorldRGB(currentWorld.id)}, 0.12)`);
  }

  if (heroTitle) heroTitle.textContent = tOr('quest.' + currentQuest.id + '.title') || currentQuest.title;

  if (heroMeta) {
    heroMeta.innerHTML = `
      <span class="quest-hero__meta-tag"><i class="ph ph-clock"></i> ${currentQuest.duration}</span>
      <span class="quest-hero__meta-tag"><i class="ph ph-star"></i> ${currentQuest.xp} XP</span>
      <span class="quest-hero__meta-tag">${getTypeLabel(currentQuest.type)}</span>
      ${isQuestComplete(currentQuest.id) ? `<span class="quest-hero__meta-tag quest-hero__meta-tag--success"><i class="ph ph-check-circle"></i> ${t('quest.completed')}</span>` : ''}
    `;
  }

  if (heroBg) {
    heroBg.innerHTML = `
      <source srcset="../assets/images/quests/${currentQuest.id}.webp" type="image/webp">
      <img src="../assets/images/quests/${currentQuest.id}.jpg" alt="" loading="eager" data-hero-img-fallback>
    `;
  }

  // Hero image error fallback (replaces inline onerror)
  const heroImg = document.querySelector('[data-hero-img-fallback]');
  if (heroImg) {
    heroImg.addEventListener('error', () => {
      if (heroBg) {
        heroBg.innerHTML = `
          <source srcset="../assets/images/quests/quest-bg.webp" type="image/webp">
          <img src="../assets/images/quests/quest-bg.jpg" alt="" loading="eager">
        `;
      }
    }, { once: true });
  }
}

function getTypeLabel(type) {
  const key = 'quest.type.' + type;
  const translated = t(key);
  return translated !== key ? translated : type;
}

/* ================================================================
   CHECKLIST
   ================================================================ */

function getChecklistKey() {
  return `quest-checklist-${currentQuest.id}`;
}

function loadChecklist() {
  try {
    return JSON.parse(localStorage.getItem(getChecklistKey())) || [];
  } catch { return []; }
}

function saveChecklist(checked) {
  localStorage.setItem(getChecklistKey(), JSON.stringify(checked));
}

function initChecklist() {
  const items = document.querySelectorAll('.quest-checklist__item');
  const checked = loadChecklist();
  const progressBar = document.getElementById('checklist-progress-fill');
  const progressText = document.getElementById('checklist-progress-text');

  function updateProgress() {
    const total = items.length;
    const done = document.querySelectorAll('.quest-checklist__item--checked').length;
    const pct = Math.round((done / total) * 100);
    if (progressBar) progressBar.style.setProperty('--checklist-progress', `${pct}%`);
    if (progressText) progressText.textContent = `${done}/${total}`;
  }

  items.forEach((item, idx) => {
    if (checked.includes(idx)) item.classList.add('quest-checklist__item--checked');

    item.addEventListener('click', () => {
      item.classList.toggle('quest-checklist__item--checked');
      const newChecked = Array.from(items)
        .map((el, i) => el.classList.contains('quest-checklist__item--checked') ? i : -1)
        .filter(i => i !== -1);
      saveChecklist(newChecked);
      updateProgress();
    });
  });

  updateProgress();
}

/* ================================================================
   SANDBOX — IDE Style + Auto-Save
   ================================================================ */

function getSandboxKey() {
  return `quest-sandbox-v2-${currentQuest.id}`;
}

function getSandboxLogKey() {
  return `quest-sandbox-log-v2-${currentQuest.id}`;
}

function loadSandboxCode() {
  const saved = localStorage.getItem(getSandboxKey());
  if (saved) return saved;
  return getDefaultCode();
}

function saveSandboxCode(code) {
  localStorage.setItem(getSandboxKey(), code);
  // Log entry
  const logKey = getSandboxLogKey();
  let log = [];
  try { log = JSON.parse(localStorage.getItem(logKey)) || []; } catch {}
  log.push({ time: Date.now(), length: code.length });
  // Keep last 50 entries
  if (log.length > 50) log = log.slice(-50);
  localStorage.setItem(logKey, JSON.stringify(log));
}

function getDefaultCode() {
  const defaults = {
    'q1-1': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine erste Seite</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <!-- Dein erster Code kommt hier rein -->
  <h1>Hallo Welt!</h1>
  <p>Ich lerne HTML und das ist meine erste Webseite.</p>
</body>
</html>`,

    'q1-2': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Über mich</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Mein Lieblingsthema</h1>

  <h2>Warum ich es mag</h2>
  <p>Hier steht ein Absatz über mein Hobby.</p>
  <p>Noch ein Absatz mit einem <strong>wichtigen</strong> Wort und einem <em>betonten</em> Wort.</p>

  <!-- Teste: Was passiert mit h7? -->
</body>
</html>`,

    'q1-3': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine Bilder</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Mein Hobby</h1>

  <!-- Bildeinbindung: src = Quelle, alt = Beschreibung für blinde Menschen -->
  <img src="images/hobby.jpg"
       alt="Beschreibe hier, was auf dem Bild zu sehen ist"
       width="400">

  <p>Ein Bild sagt mehr als tausend Worte!</p>

  <!-- Teste: Was passiert, wenn du alt weglässt? -->
  <!-- Teste: Was passiert bei src="images/falsch.jpg"? -->
</body>
</html>`,

    'q1-4': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine Links</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Meine erste Website</h1>

  <h2>Wichtige Links</h2>

  <!-- Relativer Link: führt zu einer Seite im selben Ordner -->
  <p><a href="kontakt.html">Kontaktseite besuchen</a></p>

  <!-- Absoluter Link: führt zu einer anderen Webseite -->
  <!-- WICHTIG: rel="noopener noreferrer" bei target="_blank"! -->
  <p><a href="https://www.w3schools.com"
        target="_blank"
        rel="noopener noreferrer">
     W3Schools besuchen (öffnet neuen Tab)
     </a></p>

  <!-- Bonus: E-Mail-Link -->
  <p><a href="mailto:dein.name@schule.at">E-Mail schreiben</a></p>
</body>
</html>`,

    'q1-5': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine Hobby-Seite</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Mein Hobby: [Dein Thema hier]</h1>

  <h2>Warum ich es liebe</h2>
  <p>Schreibe hier, warum dich das Thema begeistert.</p>

  <h2>Meine Top 5</h2>
  <ul>
    <li>Punkt 1</li>
    <li>Punkt 2</li>
    <li>Punkt 3</li>
  </ul>

  <img src="images/hobby.jpg" alt="Beschreibung" width="400">

  <p><a href="ueber-mich.html">Mehr über mich erfahren</a></p>
</body>
</html>`,

    'q2-1': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Farben</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      background-color: #f5f5f5;
    }
  </style>
</head>
<body>

  <h1 style="color: #E67E22;">Meine farbige Überschrift</h1>

  <p style="color: #2980B9; font-size: 18px;">
    Dieser Text ist blau und größer.
  </p>

  <p style="background-color: #D5F5E3; padding: 15px; border-radius: 8px;">
    Dieser Absatz hat einen grünen Hintergrund!
  </p>

  <!-- Probiere aus:
       - rgb(255, 100, 50)
       - hsl(200, 70%, 50%)
       - #FF5733
  -->

</body>
</html>`,

    'q2-2': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Schriften</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      padding: 20px;
    }
    h1 {
      font-size: 36px;
      text-align: center;
      color: #2C3E50;
    }
    .einfuehrung {
      font-size: 18px;
      text-align: center;
      color: #666;
    }
  </style>
</head>
<body>

  <h1>Willkommen auf meiner Seite</h1>
  <p class="einfuehrung">
    Dieser Text ist zentriert, größer und hat eine andere Farbe.
  </p>
  <p>
    Normaler Fließtext mit guter Lesbarkeit dank line-height.
  </p>

</body>
</html>`,

    'q2-3': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Box-Modell</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
    .kiste {
      padding: 20px;
      border: 3px solid #27AE60;
      margin: 20px;
      background: #E8F8F5;
      border-radius: 8px;
    }
    .kiste-rot {
      padding: 20px;
      border: 3px dashed #E74C3C;
      margin: 20px;
      background: #FDEDEC;
      border-radius: 8px;
    }
  </style>
</head>
<body>

  <div class="kiste">
    Das ist eine Box mit Padding, Border und Margin!
  </div>

  <div class="kiste-rot">
    Diese Box hat einen gestrichelten Rahmen.
  </div>

  <!-- Experimentiere:
       - padding: 40px
       - border: 10px dashed red
       - margin: 0
  -->

</body>
</html>`,

    'q2-4': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Klassen und IDs</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      background: #f5f5f5;
    }
    /* Klasse: kann mehrfach verwendet werden */
    .highlight {
      background-color: #F9E79F;
      padding: 2px 6px;
      border-radius: 4px;
    }
    /* ID: einmalig pro Seite */
    #spezial {
      color: #E74C3C;
      font-size: 28px;
      border-bottom: 3px solid #E74C3C;
    }
    .karte {
      background: white;
      padding: 20px;
      margin: 20px;
      border-radius: 10px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>

  <h1>Klassen vs. IDs</h1>

  <div class="karte">
    <h2 id="spezial">Das ist einzigartig</h2>
    <p>Dieser Text hat ein <span class="highlight">wichtiges</span> Wort.</p>
    <p>Noch ein <span class="highlight">highlighted</span> Wort.</p>
  </div>

  <!-- Merke: .highlight = mehrfach, #spezial = einmal -->

</body>
</html>`,

    'q2-5': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine gestylte Seite</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      background: #f8f9fa;
      margin: 0;
      padding: 20px;
    }
    .karte {
      background: white;
      max-width: 600px;
      margin: 20px auto;
      padding: 30px;
      border-radius: 12px;
      box-shadow: 0 4px 16px rgba(0,0,0,0.1);
    }
    h1 {
      color: #E67E22;
      text-align: center;
    }
    p {
      color: #555;
      line-height: 1.6;
    }
    a {
      color: #2980B9;
      text-decoration: none;
    }
    a:hover {
      text-decoration: underline;
    }
  </style>
</head>
<body>

  <div class="karte">
    <h1>Meine Hobby-Seite</h1>
    <p>Hier steht ein beschreibender Text über dein Hobby.</p>
    <p><a href="kontakt.html">Kontakt</a></p>
  </div>

</body>
</html>`,

    'q3-1': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Flexbox</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
    .flexbox {
      display: flex;
      gap: 20px;
      justify-content: center;
      padding: 20px;
      background: #f0f0f0;
    }
    .box {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 40px;
      border-radius: 12px;
      text-align: center;
      flex: 1;
    }
  </style>
</head>
<body>

  <h1>Flexbox-Layout</h1>

  <div class="flexbox">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
  </div>

  <!-- Probiere aus:
       - justify-content: space-between
       - justify-content: flex-start
       - align-items: center
  -->

</body>
</html>`,

    'q3-2': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CSS Grid</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
      background: #f5f5f5;
    }
    .grid {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      padding: 20px;
    }
    .karte {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    .karte h3 {
      color: #667eea;
      margin-top: 0;
    }
  </style>
</head>
<body>

  <h1>Mein Grid-Layout</h1>

  <div class="grid">
    <div class="karte">
      <h3>Karte 1</h3>
      <p>Inhalt der ersten Karte.</p>
    </div>
    <div class="karte">
      <h3>Karte 2</h3>
      <p>Inhalt der zweiten Karte.</p>
    </div>
    <div class="karte">
      <h3>Karte 3</h3>
      <p>Inhalt der dritten Karte.</p>
    </div>
  </div>

  <!-- Bonus: Probiere grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)) -->

</body>
</html>`,

    'q3-3': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
    .container {
      display: grid;
      grid-template-columns: 1fr 1fr 1fr;
      gap: 20px;
      padding: 20px;
    }
    .box {
      background: #3498db;
      color: white;
      padding: 40px;
      text-align: center;
      border-radius: 12px;
    }

    /* Ab 768px Bildschirmbreite: 2 Spalten */
    @media (max-width: 768px) {
      .container {
        grid-template-columns: 1fr 1fr;
      }
      .box {
        background: #e74c3c;
      }
    }

    /* Ab 480px Bildschirmbreite: 1 Spalte */
    @media (max-width: 480px) {
      .container {
        grid-template-columns: 1fr;
      }
      .box {
        background: #27ae60;
      }
    }
  </style>
</head>
<body>

  <h1>Zieh das Browserfenster schmaler!</h1>

  <div class="container">
    <div class="box">Box 1</div>
    <div class="box">Box 2</div>
    <div class="box">Box 3</div>
    <div class="box">Box 4</div>
  </div>

</body>
</html>`,

    'q3-4': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Seite</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      margin: 0;
      background: #f5f5f5;
    }
    header { background: #333; color: white; padding: 20px; text-align: center; }
    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
      gap: 20px;
      padding: 20px;
      max-width: 1000px;
      margin: 0 auto;
    }
    .karte {
      background: white;
      padding: 20px;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    footer { background: #333; color: white; padding: 20px; text-align: center; margin-top: 20px; }

    @media (max-width: 768px) {
      header h1 { font-size: 24px; }
    }
  </style>
</head>
<body>

  <header>
    <h1>Meine responsive Website</h1>
  </header>

  <div class="grid">
    <div class="karte"><h2>Karte 1</h2><p>Inhalt...</p></div>
    <div class="karte"><h2>Karte 2</h2><p>Inhalt...</p></div>
    <div class="karte"><h2>Karte 3</h2><p>Inhalt...</p></div>
  </div>

  <footer>© 2025 Meine Website</footer>

</body>
</html>`,

    'q4-1': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Kontaktformular</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      max-width: 500px;
      margin: 40px auto;
      padding: 20px;
    }
    label { display: block; margin-top: 15px; font-weight: bold; }
    input, textarea {
      width: 100%; padding: 10px; margin-top: 5px;
      border: 1px solid #ccc; border-radius: 6px;
      font-family: inherit;
    }
    button {
      margin-top: 20px; padding: 12px 24px;
      background: #3498db; color: white;
      border: none; border-radius: 6px; cursor: pointer;
      font-family: inherit;
    }
    button:hover { background: #2980b9; }
  </style>
</head>
<body>

  <h1>Kontakt</h1>

  <form action="#">
    <label for="name">Name:</label>
    <input type="text" id="name" name="name" placeholder="Dein Name">

    <label for="email">E-Mail:</label>
    <input type="email" id="email" name="email" placeholder="dein.name@schule.at">

    <label for="nachricht">Nachricht:</label>
    <textarea id="nachricht" name="nachricht" rows="4" placeholder="Deine Nachricht..."></textarea>

    <button type="submit">Absenden</button>
  </form>

</body>
</html>`,

    'q4-2': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Highscore</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
    table {
      width: 100%;
      border-collapse: collapse;
    }
    th, td {
      padding: 12px;
      text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th {
      background: #2C3E50;
      color: white;
    }
    tr:hover { background: #f5f5f5; }
    .top { color: #27AE60; font-weight: bold; }
  </style>
</head>
<body>

  <h1>Spiel-Highscore</h1>

  <table>
    <tr>
      <th>Name</th>
      <th>Punkte</th>
      <th>Level</th>
      <th>Status</th>
    </tr>
    <tr>
      <td>Lisa</td>
      <td>9.850</td>
      <td>12</td>
      <td class="top">Online</td>
    </tr>
    <tr>
      <td>Max</td>
      <td>7.200</td>
      <td>8</td>
      <td>Offline</td>
    </tr>
    <tr>
      <td>Sarah</td>
      <td>6.400</td>
      <td>7</td>
      <td>Offline</td>
    </tr>
  </table>

</body>
</html>`,

    'q4-3': `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Event-Anmeldung</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      max-width: 800px;
      margin: 40px auto;
      padding: 20px;
      background: #f5f5f5;
    }
    .karte {
      background: white;
      padding: 30px;
      border-radius: 12px;
      margin-bottom: 20px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
    h1 { color: #2C3E50; }
    label { display: block; margin-top: 15px; font-weight: bold; }
    input, select, textarea {
      width: 100%; padding: 10px; margin-top: 5px;
      border: 1px solid #ccc; border-radius: 6px;
      font-family: inherit;
    }
    button {
      margin-top: 20px; padding: 12px 24px;
      background: #27AE60; color: white;
      border: none; border-radius: 6px; cursor: pointer;
      font-family: inherit;
    }
    table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    th, td {
      padding: 12px; text-align: left;
      border-bottom: 1px solid #ddd;
    }
    th { background: #2C3E50; color: white; }
  </style>
</head>
<body>

  <div class="karte">
    <h1>Gaming-Turnier Anmeldung</h1>

    <form action="#">
      <label for="name">Spielername:</label>
      <input type="text" id="name" name="name" placeholder="Dein Name">

      <label for="spiel">Lieblingsspiel:</label>
      <select id="spiel" name="spiel">
        <option>Minecraft</option>
        <option>Fortnite</option>
        <option>Rocket League</option>
      </select>

      <label for="level">Level:</label>
      <input type="number" id="level" name="level" placeholder="z. B. 15">

      <button type="submit">Anmelden</button>
    </form>
  </div>

  <div class="karte">
    <h2>Bereits angemeldet</h2>
    <table>
      <tr><th>Name</th><th>Spiel</th><th>Level</th></tr>
      <tr><td>MaxPower</td><td>Minecraft</td><td>42</td></tr>
      <tr><td>PixelQueen</td><td>Fortnite</td><td>28</td></tr>
    </table>
  </div>

</body>
</html>`
  };
  return defaults[currentQuest.id] || `<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Meine Seite</title>
  <style>
    body {
      font-family: 'Segoe UI', Arial, sans-serif;
      line-height: 1.6;
      padding: 20px;
    }
  </style>
</head>
<body>
  <h1>Hallo Welt!</h1>
  <p>Schreibe hier deinen HTML-Code...</p>
</body>
</html>`;
}

function updateLineNumbers(textarea) {
  const lineNums = document.getElementById('sandbox-line-numbers');
  if (!lineNums || !textarea) return;
  const lines = textarea.value.split('\n').length;
  lineNums.innerHTML = Array.from({ length: Math.max(lines, 1) }, (_, i) =>
    `<div>${i + 1}</div>`
  ).join('');
}

function setupSandbox() {
  const textarea = document.getElementById('sandbox-code');
  const runBtn = document.getElementById('sandbox-run');
  const copyBtn = document.getElementById('sandbox-copy');
  const statusEl = document.getElementById('sandbox-status');

  if (!textarea) return;

  // Load saved code
  textarea.value = loadSandboxCode();
  updateLineNumbers(textarea);
  runSandbox();

  // Initial validation
  renderProblems(validateHTML(textarea.value, currentQuest?.id));

  // Re-render on language change
  onLangChange(() => {
    renderProblems(validateHTML(textarea.value, currentQuest?.id));
  });

  // Auto-run on input (debounced)
  const debouncedRun = debounce(() => {
    runSandbox();
    saveSandboxCode(textarea.value);
    if (statusEl) {
      statusEl.textContent = t('quest.status.saved');
      statusEl.classList.remove('quest-sandbox__editor-status--unsaved');
    }
  }, 800);

  // Validator — debounced
  const debouncedValidate = debounce(() => {
    const errors = validateHTML(textarea.value, currentQuest?.id);
    renderProblems(errors);
  }, 1000);

  textarea.addEventListener('input', () => {
    updateLineNumbers(textarea);
    if (statusEl) {
      statusEl.textContent = t('quest.status.unsaved');
      statusEl.classList.add('quest-sandbox__editor-status--unsaved');
    }
    debouncedRun();
    debouncedValidate();
  });

  // Tab support
  textarea.addEventListener('keydown', (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      textarea.value = textarea.value.substring(0, start) + '  ' + textarea.value.substring(end);
      textarea.selectionStart = textarea.selectionEnd = start + 2;
      updateLineNumbers(textarea);
      debouncedRun();
    }
  });

  if (runBtn) runBtn.addEventListener('click', runSandbox);

  if (copyBtn) {
    copyBtn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(textarea.value);
        showToast(t('common.copy'), 'ph-copy');
      } catch {
        showToast(t('common.copyFail'), 'ph-warning');
      }
    });
  }

  // Auto-save every 30 seconds
  if (autoSaveInterval) clearInterval(autoSaveInterval);
  autoSaveInterval = setInterval(() => {
    saveSandboxCode(textarea.value);
    const timeEl = document.getElementById('sandbox-autosave-time');
    if (timeEl) {
      timeEl.textContent = new Date().toLocaleTimeString(getLanguage() === 'de' ? 'de-DE' : 'en-GB', { hour: '2-digit', minute: '2-digit' });
    }
  }, 30000);
}

/**
 * Zeige HTML-Validierungsfehler im Problem-Panel
 */
function renderProblems(errors) {
  const panel = document.getElementById('sandbox-problems');
  const statusEl = document.getElementById('sandbox-status');
  const lineNums = document.getElementById('sandbox-line-numbers');

  if (!panel) return;

  // Zeilennummern zurücksetzen
  if (lineNums) {
    lineNums.querySelectorAll('.is-error').forEach(el => el.classList.remove('is-error'));
  }

  if (errors.length === 0) {
    panel.innerHTML = `
      <div class="quest-sandbox__problems-empty">
        <i class="ph ph-check-circle"></i>
        <span>${t('validator.ok')}</span>
      </div>
    `;
    if (statusEl) {
      statusEl.classList.remove('quest-sandbox__editor-status--error');
      statusEl.classList.add('quest-sandbox__editor-status--ok');
    }
    return;
  }

  // Fehlerhafte Zeilen markieren
  if (lineNums) {
    const lineDivs = lineNums.querySelectorAll('div');
    errors.forEach(err => {
      const div = lineDivs[err.line - 1];
      if (div) div.classList.add('is-error');
    });
  }

  // Status aktualisieren
  if (statusEl) {
    const errorCount = errors.filter(e => e.type === 'error').length;
    const warningCount = errors.filter(e => e.type === 'warning').length;
    let statusText = '';
    if (errorCount > 0) statusText += t('validator.error', { count: errorCount });
    if (warningCount > 0) statusText += (statusText ? ', ' : '') + t(warningCount > 1 ? 'validator.warnings' : 'validator.warning', { count: warningCount });
    statusEl.textContent = statusText || t('validator.problems');
    statusEl.classList.add('quest-sandbox__editor-status--error');
    statusEl.classList.remove('quest-sandbox__editor-status--ok');
  }

  // Panel rendern
  const errorItems = errors.map(err => `
    <div class="quest-sandbox__problem-item quest-sandbox__problem-item--${err.type}">
      <span class="quest-sandbox__problem-icon"><i class="ph ph-${err.type === 'error' ? 'x-circle' : 'warning'}"></i></span>
      <span class="quest-sandbox__problem-line">${err.line}</span>
      <span class="quest-sandbox__problem-text">${escapeHtml(err.message)}</span>
    </div>
  `).join('');

  panel.innerHTML = `
    <div class="quest-sandbox__problems-header">
      <i class="ph ph-warning-circle"></i>
      <span>${t(errors.length > 1 ? 'validator.problemsCount' : 'validator.problem', { count: errors.length })}</span>
    </div>
    ${errorItems}
  `;
}

function runSandbox() {
  const code = document.getElementById('sandbox-code')?.value || '';
  const frame = document.getElementById('sandbox-frame');
  if (!frame) return;

  const fullHTML = code.includes('<!DOCTYPE') || code.includes('<html')
    ? code
    : `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>body{font-family:sans-serif;padding:20px;color:#333;}</style>
</head>
<body>${code}</body>
</html>`;

  frame.srcdoc = fullHTML;
}

/* ================================================================
   CONFETTI
   ================================================================ */

function fireConfetti() {
  const canvas = document.getElementById('confetti-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const particles = [];
  const colors = ['#F39C12', '#E74C3C', '#27AE60', '#3498DB', '#9B59B6', '#F1C40F', '#E67E22'];

  for (let i = 0; i < 150; i++) {
    particles.push({
      x: canvas.width / 2,
      y: canvas.height / 2,
      vx: (Math.random() - 0.5) * 20,
      vy: (Math.random() - 1) * 20 - 5,
      size: Math.random() * 8 + 4,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      rotationSpeed: (Math.random() - 0.5) * 10,
      gravity: 0.3,
      drag: 0.98,
      life: 1
    });
  }

  let frame = 0;
  function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    let alive = false;

    particles.forEach(p => {
      if (p.life <= 0) return;
      alive = true;
      p.x += p.vx;
      p.y += p.vy;
      p.vy += p.gravity;
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.rotation += p.rotationSpeed;
      p.life -= 0.008;

      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate((p.rotation * Math.PI) / 180);
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
      ctx.restore();
    });

    if (alive && frame < 300) {
      frame++;
      requestAnimationFrame(animate);
    } else {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
    }
  }

  animate();
}

/* ================================================================
   REFLECTION — Anti-Cheat
   ================================================================ */

function getReflectionKey() {
  return `quest-reflection-${currentQuest.id}`;
}

function loadReflection() {
  try {
    return localStorage.getItem(getReflectionKey()) || '';
  } catch { return ''; }
}

function saveReflection(text) {
  localStorage.setItem(getReflectionKey(), text);
}

function getReflectionQuestion() {
  return tOr('quest.' + currentQuest.id + '.reflectionQuestion') ||
    t('quest.reflectionQuestionFallback');
}

/* ================================================================
   COMPLETION
   ================================================================ */

function onCompleteQuest(e) {
  const btn = e.target.closest('#btn-complete');
  if (!btn) return;

  // Anti-cheat: Check reflection
  const reflection = document.getElementById('reflection-text');
  if (reflection && reflection.value.trim().length < 20) {
    showToast(t('quest.reflectionRequired'), 'ph-warning');
    reflection.focus();
    reflection.classList.add('is-error');
    setTimeout(() => { reflection.classList.remove('is-error'); }, 3000);
    return;
  }

  btn.disabled = true;
  btn.innerHTML = `<i class="ph ph-spinner ph-spin"></i> ${t('quest.saving')}`;

  const oldProgress = loadProgress();
  const progress = completeQuest(currentQuest.id, currentQuest.xp);

  // XP Animation
  const rect = btn.getBoundingClientRect();
  showXPGain(currentQuest.xp, rect.left + rect.width / 2, rect.top);

  // Confetti
  fireConfetti();

  setTimeout(() => {
    // Show complete section
    const completeMsg = document.getElementById('complete-message');
    if (completeMsg) completeMsg.classList.remove('hidden');

    // Update displays
    updateXPDisplay();
    renderSidebar();
    renderHero();

    // Level up check
    if (progress.level > oldProgress.level) {
      showLevelUp(progress.level);
    }

    // Replace button with next quest
    const nextQuest = currentWorld.quests[
      currentWorld.quests.indexOf(currentQuest) + 1
    ];
    if (nextQuest) {
      const nextTitle = t('quest.' + nextQuest.id + '.title') || nextQuest.title;
      btn.outerHTML = `<a href="?world=${currentWorld.id}&quest=${nextQuest.id}" class="quest-btn quest-btn--primary">${nextTitle} →</a>`;
    } else {
      btn.outerHTML = `<a href="index.html" class="quest-btn quest-btn--primary"><i class="ph ph-house"></i> ${t('quest.backToHub')}</a>`;
    }

    showToast(t('quest.completeToast', { xp: currentQuest.xp }), 'ph-trophy');
  }, 800);
}

/* ================================================================
   MAIN RENDER
   ================================================================ */

function renderQuest() {
  const container = document.getElementById('quest-detail');
  const progress = loadProgress();
  const isDone = isQuestComplete(currentQuest.id);
  const questIndex = currentWorld.quests.indexOf(currentQuest);
  const prevQuest = currentWorld.quests[questIndex - 1];
  const nextQuest = currentWorld.quests[questIndex + 1];

  // Update sidebar & hero
  renderSidebar();
  renderHero();
  applyWorldTheme();

  // Story content (i18n via t())
  const worldTitleTranslated = t('world.' + currentWorld.id + '.title') || currentWorld.title;
  const story = {
    intro: t('world.' + currentWorld.id + '.intro', { world: worldTitleTranslated }),
    context: t('world.' + currentWorld.id + '.context', { world: worldTitleTranslated })
  };

  // Steps as checklist (i18n)
  const fallbackSteps = [
    'Lies dir die Aufgabe durch',
    'Öffne VS Code und erstelle die nötigen Dateien',
    'Nutze den Sandbox unten, um schnell zu testen',
    'Prüfe dein Ergebnis im Browser mit Live Server',
    'Klicke "Quest abschließen", wenn du fertig bist!'
  ];
  const steps = (currentQuest.steps || fallbackSteps).map((s, i) =>
    escapeHtml(tOr('quest.' + currentQuest.id + '.step' + (i + 1)) || s)
  );

  const stepsHtml = steps.map((s, i) => `
    <li class="quest-checklist__item">
      <span class="quest-checklist__checkbox"><i class="ph ph-check"></i></span>
      <span class="quest-checklist__text">${s}</span>
    </li>
  `).join('');

  // Reflection saved text
  const savedReflection = loadReflection();

  // Build optional content blocks
  const whyHtml = currentQuest.why ? `
    <div class="quest-card quest-card--why">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-lightbulb"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.why')}</h3>
      </div>
      <p>${escapeHtml(tOr('quest.' + currentQuest.id + '.why') || currentQuest.why)}</p>
    </div>
  ` : '';

  const mistakesHtml = currentQuest.commonMistakes ? `
    <div class="quest-card quest-card--mistakes">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-warning"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.mistakes')}</h3>
      </div>
      <ul class="quest-mistakes__list">
        ${currentQuest.commonMistakes.map((m, i) => `<li>${escapeHtml(tOr('quest.' + currentQuest.id + '.mistake' + (i + 1)) || m)}</li>`).join('')}
      </ul>
    </div>
  ` : '';

  const proTipHtml = currentQuest.proTip ? `
    <div class="quest-card quest-card--protip">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-lightning"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.proTip')}</h3>
      </div>
      <p class="quest-protip__text">${escapeHtml(tOr('quest.' + currentQuest.id + '.proTip') || currentQuest.proTip)}</p>
    </div>
  ` : '';

  const successHtml = currentQuest.successCriteria ? `
    <div class="quest-success">
      <div class="quest-success__title">
        <i class="ph ph-check-circle"></i> ${t('quest.success')}
      </div>
      <p class="quest-success__text">${escapeHtml(tOr('quest.' + currentQuest.id + '.successCriteria') || currentQuest.successCriteria)}</p>
    </div>
  ` : '';

  container.innerHTML = `
    <!-- Story -->
    <div class="quest-card quest-card--story">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-book-open"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.mission')}</h3>
      </div>
      <p>${story.intro}</p>
      <p><strong>${story.context}</strong></p>
    </div>

    ${whyHtml}

    <!-- Task -->
    <div class="quest-card">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-target"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.task')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed u-mb-4">${escapeHtml(tOr('quest.' + currentQuest.id + '.description') || currentQuest.description)}</p>
      <h4 class="u-text-base u-text-primary u-mb-3">${t('quest.steps')}:</h4>
      <ul class="quest-checklist">
        ${stepsHtml}
      </ul>
      <div class="quest-checklist__progress">
        <div class="quest-checklist__progress-bar">
          <div class="quest-checklist__progress-fill" id="checklist-progress-fill"></div>
        </div>
        <span class="quest-checklist__progress-text" id="checklist-progress-text">0/${steps.length}</span>
      </div>
      ${successHtml}
    </div>

    ${mistakesHtml}

    ${proTipHtml}

    <!-- Sandbox -->
    <div class="quest-sandbox u-mb-6">
      <div class="quest-sandbox__header">
        <div class="quest-sandbox__tabs">
          <button class="quest-sandbox__tab quest-sandbox__tab--active">
            <i class="ph ph-file-html"></i> index.html
          </button>
        </div>
        <div class="quest-sandbox__actions">
          <button class="quest-sandbox__btn" id="sandbox-copy" title="Code kopieren" aria-label="${t('quest.copy')}">
            <i class="ph ph-copy"></i> <span class="quest-sandbox__btn-text">${t('quest.copy')}</span>
          </button>
          <button class="quest-sandbox__btn quest-sandbox__btn--run" id="sandbox-run" aria-label="${t('quest.run')}">
            <i class="ph ph-play"></i> <span class="quest-sandbox__btn-text">${t('quest.run')}</span>
          </button>
        </div>
      </div>
      <div class="quest-sandbox__body">
        <div class="quest-sandbox__editor-wrap">
          <div class="quest-sandbox__editor-header">
            <span class="quest-sandbox__editor-label">${t('quest.editor')}</span>
            <span class="quest-sandbox__editor-status" id="sandbox-status">${t('quest.status.ready')}</span>
          </div>
          <div class="quest-sandbox__editor">
            <div class="quest-sandbox__line-numbers" id="sandbox-line-numbers">1</div>
            <textarea id="sandbox-code" class="quest-sandbox__textarea" placeholder="${t('quest.sandboxPlaceholder')}" spellcheck="false"></textarea>
          </div>
          <div class="quest-sandbox__autosave">
            <span><i class="ph ph-floppy-disk"></i> ${t('quest.autosave')}</span>
            <span class="quest-sandbox__autosave-time" id="sandbox-autosave-time">--:--</span>
          </div>
          <div class="quest-sandbox__problems" id="sandbox-problems"></div>
        </div>
        <div class="quest-sandbox__preview">
          <div class="quest-sandbox__preview-header">
            <span class="quest-sandbox__preview-label">${t('quest.preview')}</span>
            <span class="quest-sandbox__preview-url">${t('quest.previewUrl')}</span>
          </div>
          <iframe id="sandbox-frame" class="quest-sandbox__preview-frame" sandbox="allow-scripts"></iframe>
        </div>
      </div>
    </div>

    <!-- Screenshot Reminder -->
    <div class="quest-card quest-screenshot">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-camera"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.screenshot')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed">
        ${t('quest.screenshotDesc')}
      </p>
      <ol class="quest-screenshot__steps">
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep1')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep2')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep3')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep4')}</span></li>
        <li><span class="quest-screenshot__step-text">${t('quest.screenshotStep5')}</span></li>
      </ol>
    </div>

    <!-- W3Schools -->
    <div class="quest-card quest-w3schools">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-book-open-text"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.w3schools')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed u-mb-4">
        ${t('quest.w3schoolsDesc')}
      </p>
      <a href="${currentQuest.w3schools}" target="_blank" class="quest-w3schools__btn">
        <i class="ph ph-arrow-square-out"></i> ${t('quest.w3schoolsBtn', { title: tOr('quest.' + currentQuest.id + '.title') || currentQuest.title })}
      </a>
    </div>

    <!-- Reflection (Anti-Cheat) -->
    <div class="quest-card quest-reflection">
      <div class="quest-card__header">
        <div class="quest-card__icon">
          <i class="ph ph-brain"></i>
        </div>
        <h3 class="quest-card__title">${t('quest.reflection')}</h3>
      </div>
      <p class="u-text-secondary u-leading-relaxed u-mb-4">
        ${t('quest.reflectionDesc')}
      </p>
      <div class="quest-reflection__hint">
        <div class="quest-reflection__hint-title">
          <i class="ph ph-question"></i> ${t('quest.yourQuestion')}
        </div>
        <p class="quest-reflection__hint-text">${escapeHtml(getReflectionQuestion())}</p>
      </div>
      <textarea
        id="reflection-text"
        class="quest-reflection__textarea"
        placeholder="${t('quest.reflectionPlaceholder')}"
      >${escapeHtml(savedReflection)}</textarea>
      <p class="u-text-xs u-text-muted u-mt-2">
        <i class="ph ph-info"></i> ${t('quest.reflectionPrivacy')}
      </p>
    </div>

    <!-- Complete Message -->
    <div class="quest-complete ${isDone ? '' : 'hidden'}" id="complete-message">
      <div class="quest-complete__icon"><i class="ph ph-confetti"></i></div>
      <h2 class="quest-complete__title">${t('quest.completeTitle')}</h2>
      <p class="quest-complete__xp">${t('quest.completeXp', { xp: currentQuest.xp })}</p>
    </div>

    <!-- Navigation -->
    <div class="quest-nav">
      ${prevQuest
        ? `<a href="?world=${currentWorld.id}&quest=${prevQuest.id}" class="quest-btn quest-btn--secondary quest-nav__back" aria-label="${tOr('quest.' + prevQuest.id + '.title') || prevQuest.title}"><i class="ph ph-arrow-left"></i> <span class="quest-nav__back-text">${tOr('quest.' + prevQuest.id + '.title') || prevQuest.title}</span></a>`
        : `<a href="index.html" class="quest-btn quest-btn--secondary quest-nav__back" aria-label="${t('quest.toHub')}"><i class="ph ph-arrow-left"></i> <span class="quest-nav__back-text">${t('quest.toHub')}</span></a>`
      }

      ${!isDone
        ? `<button class="quest-btn quest-btn--success" id="btn-complete"><i class="ph ph-check-circle"></i> <span class="quest-nav__btn-label">${t('quest.completeBtn', { xp: currentQuest.xp })}</span></button>`
        : nextQuest
          ? `<a href="?world=${currentWorld.id}&quest=${nextQuest.id}" class="quest-btn quest-btn--primary quest-nav__forward">${tOr('quest.' + nextQuest.id + '.title') || nextQuest.title} <i class="ph ph-arrow-right"></i></a>`
          : `<a href="index.html" class="quest-btn quest-btn--primary quest-nav__forward"><i class="ph ph-house"></i> <span class="quest-nav__back-text">${t('quest.backToHub')}</span></a>`
      }
    </div>
  `;

  // Init interactive elements
  setupSandbox();
  initChecklist();

  // Reflection auto-save
  const reflectionText = document.getElementById('reflection-text');
  if (reflectionText) {
    reflectionText.addEventListener('input', debounce(() => {
      saveReflection(reflectionText.value);
    }, 500));
  }

  // Complete button
  if (!isDone) {
    const completeBtn = document.getElementById('btn-complete');
    if (completeBtn) completeBtn.addEventListener('click', onCompleteQuest);
  }
}

/* ================================================================
   URL LOADING & ERROR HANDLING
   ================================================================ */

function loadQuestFromURL() {
  const params = new URLSearchParams(window.location.search);
  const worldId = params.get('world');
  const questId = params.get('quest');

  currentWorld = worlds.find(w => w.id === worldId);
  if (!currentWorld) {
    showError(t('quest.error.world'));
    return;
  }

  if (!questId) {
    const progress = loadProgress();
    currentQuest = currentWorld.quests.find(q => !progress.completedQuests.includes(q.id))
      || currentWorld.quests[0];
  } else {
    currentQuest = currentWorld.quests.find(q => q.id === questId);
  }

  if (!currentQuest) {
    showError(t('quest.error.quest'));
    return;
  }

  renderQuest();
}

function showError(msg) {
  const container = document.getElementById('quest-detail');
  if (container) {
    container.innerHTML = `
      <div class="u-text-center u-p-16">
        <p class="u-text-4xl u-mb-4 u-text-muted"><i class="ph ph-magnifying-glass"></i></p>
        <p class="u-text-xl u-text-muted u-mb-6">${msg}</p>
        <a href="index.html" class="quest-btn quest-btn--primary">${t('quest.backToHub')}</a>
      </div>
    `;
  }
}

/* ================================================================
   INIT
   ================================================================ */

document.addEventListener('DOMContentLoaded', () => {
  initI18n(de, en);
  initTheme();
  updateXPDisplay();
  new ClassroomManager();
  initBackToTop();
  initMobileMenu();
  loadQuestFromURL();

  // Event delegation for quest sidebar links
  document.addEventListener('click', (e) => {
    const link = e.target.closest('[data-quest-link]');
    if (link) {
      e.preventDefault();
      window.location.href = link.dataset.questLink;
    }
  });
});
