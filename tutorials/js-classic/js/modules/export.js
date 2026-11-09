/**
 * js/modules/export.js — „Meine Antworten" (kopieren / .md-Download / Gesamtexport)
 *
 * Liest Reflexion/Checkliste/Quiz aus storage.js (bestehende Keys) und
 * erzeugt das wortfertige Export-Format. Beiblatt-Charakter: unvollständige
 * Antworten werden markiert, aber nicht entfernt.
 */

import { get } from './storage.js';
import { t, getLanguage, onLangChange } from './i18n.js';
import { isReflectionOk } from './reflection.js';

function pad2(n) {
  return String(n).padStart(2, '0');
}

function stamp() {
  const d = new Date();
  const date = `${pad2(d.getDate())}.${pad2(d.getMonth() + 1)}.${d.getFullYear()}`;
  const time = `${pad2(d.getHours())}:${pad2(d.getMinutes())}`;
  return `${date}, ${time}`;
}

function fileStamp() {
  const d = new Date();
  return `${d.getFullYear()}-${pad2(d.getMonth() + 1)}-${pad2(d.getDate())}`;
}

function readChapter(section) {
  const reflectKey = section.dataset.storageKey;
  const checkKey = section.dataset.exportChecklist;
  const quizKey = section.dataset.exportQuiz;
  const answers = get(reflectKey, []);

  const questions = [...section.querySelectorAll('.jsc-reflection__item')].map((item) => ({
    q: item.querySelector('span')?.textContent.trim() || '',
    a: typeof answers[[...section.querySelectorAll('.jsc-reflection__item')].indexOf(item)] === 'string'
      ? answers[[...section.querySelectorAll('.jsc-reflection__item')].indexOf(item)]
      : '',
  }));

  const checkArr = checkKey ? get(checkKey, []) : null;
  const checkDone = Array.isArray(checkArr) ? checkArr.filter(Boolean).length : null;
  const quiz = quizKey ? get(quizKey, null) : null;

  return {
    title: section.dataset.exportTitle || '',
    questions,
    check: { done: checkDone, total: Array.isArray(checkArr) ? checkArr.length : 0 },
    quiz: quiz && typeof quiz.correct === 'number' ? quiz : null,
  };
}

function buildText(chapter, opts) {
  const lang = getLanguage();
  const lines = [];
  lines.push('# PLU JavaScript Classic — ' + (lang === 'de' ? 'Meine Antworten' : 'My answers'));
  lines.push(`${lang === 'de' ? 'Kapitel' : 'Chapter'} ${opts.nr}: ${chapter.title}`);
  lines.push(`${lang === 'de' ? 'Exportiert am' : 'Exported on'}: ${stamp()}`);
  lines.push('');
  lines.push('## ' + (lang === 'de' ? 'Reflexion' : 'Reflection'));
  chapter.questions.forEach((item, i) => {
    const ok = isReflectionOk(item.a);
    const count = item.a.trim().length;
    const status = ok
      ? `✅ (${count} ${lang === 'de' ? 'Zeichen' : 'characters'})`
      : `⚠️ ${lang === 'de' ? 'offen' : 'open'} (${count} ${lang === 'de' ? 'Zeichen' : 'characters'})`;
    lines.push(`${i + 1}) ${item.q} ${status}`);
    lines.push(item.a.trim() || (lang === 'de' ? '(leer)' : '(empty)'));
    lines.push('');
  });
  if (chapter.check.done !== null && chapter.check.total > 0) {
    lines.push(`## ${lang === 'de' ? 'Checkliste' : 'Checklist'} (${chapter.check.done}/${chapter.check.total})`);
  }
  if (chapter.quiz) {
    const total = 4; // Quiz-Fragenzahl je Kapitel (Kap. 01)
    lines.push(`## Quiz (${chapter.quiz.correct}/${total} ${lang === 'de' ? 'richtig' : 'correct'})`);
  }
  return lines.join('\n');
}

async function copyText(text, noteEl) {
  try {
    await navigator.clipboard.writeText(text);
    noteEl.textContent = t('ui.export.copied');
  } catch {
    // Fallback: Download auslösen
    downloadFile(text);
    noteEl.textContent = t('ui.export.unsupported');
  }
  setTimeout(() => (noteEl.textContent = ''), 2500);
}

function downloadFile(text, nr) {
  const blob = new Blob([text], { type: 'text/markdown;charset=utf-8' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `plu-kap${nr}-reflexion-${fileStamp()}.md`;
  document.body.append(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

function buildButtons(section, nr) {
  const wrap = document.createElement('p');
  wrap.className = 'jsc-export-actions';

  const note = document.createElement('span');
  note.className = 'jsc-export-note';
  note.setAttribute('aria-live', 'polite');

  const copyBtn = document.createElement('button');
  copyBtn.type = 'button';
  copyBtn.className = 'jsc-button jsc-button--outline jsc-button--sm';
  copyBtn.dataset.i18n = 'ui.export.copy';
  copyBtn.textContent = t('ui.export.copy');

  const fileBtn = document.createElement('button');
  fileBtn.type = 'button';
  fileBtn.className = 'jsc-button jsc-button--ghost jsc-button--sm';
  fileBtn.dataset.i18n = 'ui.export.file';
  fileBtn.textContent = t('ui.export.file');

  copyBtn.addEventListener('click', () => {
    const data = readChapter(section);
    copyText(buildText(data, { nr }), note);
  });
  fileBtn.addEventListener('click', () => {
    const data = readChapter(section);
    downloadFile(buildText(data, { nr }), nr);
  });

  wrap.append(copyBtn, fileBtn, note);
  onLangChange(() => {
    copyBtn.textContent = t('ui.export.copy');
    fileBtn.textContent = t('ui.export.file');
  });
  return wrap;
}

export function initExport() {
  // Pro Kapitel: unten in der Reflexion-Sektion
  document.querySelectorAll('[data-component="jsc-reflection"][data-export-chapter]').forEach((section) => {
    if (section.querySelector('.jsc-export-actions')) return;
    const nr = section.dataset.exportChapter;
    section.append(buildButtons(section, nr));
  });

  // Gesamtexport (Homepage)
  const allMount = document.querySelector('[data-export-all]');
  if (allMount && !allMount.querySelector('button')) {
    const note = document.createElement('span');
    note.className = 'jsc-export-note';
    note.setAttribute('aria-live', 'polite');

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'jsc-button jsc-button--outline jsc-button--sm';
    btn.dataset.i18n = 'ui.export.all';
    btn.textContent = t('ui.export.all');

    btn.addEventListener('click', () => {
      const lang = getLanguage();
      const sections = [...document.querySelectorAll('[data-component="jsc-reflection"][data-export-chapter]')];
      const parts = sections.map((s) => {
        const data = readChapter(s);
        return buildText(data, { nr: s.dataset.exportChapter });
      });
      const header =
        '# PLU JavaScript Classic — ' +
        (lang === 'de' ? 'Meine Antworten (Gesamtexport)' : 'My answers (all chapters)') +
        `\n${lang === 'de' ? 'Exportiert am' : 'Exported on'}: ${stamp()}\n`;
      const text = header + '\n\n' + parts.join('\n\n---\n\n');
      copyText(text, note);
    });

    allMount.append(btn, note);
  }
}
