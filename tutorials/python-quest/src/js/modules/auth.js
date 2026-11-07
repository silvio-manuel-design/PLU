/**
 * PYTHON QUEST — Auth System (lokal, ohne Supabase)
 * Name + Klassencode werden in localStorage gespeichert
 * Wird später durch PHP-Backend ersetzt
 */

import { t } from './i18n.js';

const AUTH_MODAL_ID = 'auth-modal';
const AUTH_SETUP_KEY = 'pyquest-auth-setup-v2';
const AUTH_USER_KEY = 'pyquest-user';

function generateUUID() {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

function getOrCreateUser() {
  const stored = localStorage.getItem(AUTH_USER_KEY);
  if (stored) {
    try {
      return JSON.parse(stored);
    } catch {
      // corrupted, create new
    }
  }
  const user = {
    id: generateUUID(),
    display_name: '',
    class_code: '',
    role: 'student',
    created_at: new Date().toISOString()
  };
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
  return user;
}

/**
 * Initialisiert Auth: Lokale User-Erstellung + Setup-Modal
 */
export async function initAuth() {
  try {
    const user = getOrCreateUser();
    console.log('[Auth] Local user:', user.id);

    if (!localStorage.getItem(AUTH_SETUP_KEY)) {
      showAuthSetup();
    }
  } catch (err) {
    console.warn('[Auth] Initialization failed:', err.message);
  }
}

/**
 * Gibt den aktuellen User zurück (oder null)
 */
export async function getCurrentUser() {
  return getOrCreateUser();
}

/**
 * Gibt die aktuelle Session zurück (lokal immer true)
 */
export async function getSession() {
  return { user: getOrCreateUser() };
}

/**
 * Zeigt das Setup-Modal für Name + Klassencode
 */
function showAuthSetup() {
  if (document.getElementById(AUTH_MODAL_ID)) return;

  const modal = document.createElement('div');
  modal.id = AUTH_MODAL_ID;
  modal.className = 'py-quest-modal is-open';
  modal.setAttribute('role', 'dialog');
  modal.setAttribute('aria-modal', 'true');
  modal.innerHTML = `
    <div class="py-quest-modal__backdrop"></div>
    <div class="py-quest-modal__content" style="max-width: 420px;">
      <div class="py-quest-modal__icon">
        <i class="ph ph-user-circle" aria-hidden="true"></i>
      </div>
      <h2 class="py-quest-modal__title">Willkommen bei Python Quest!</h2>
      <p class="py-quest-modal__text">Gib deinen Namen und optional einen Klassencode ein, um deinen Fortschritt zu speichern.</p>
      <form id="auth-setup-form" style="display: flex; flex-direction: column; gap: 1rem; margin-top: 1.5rem;">
        <input type="text" id="auth-name" class="py-quest-input" placeholder="Dein Name" required maxlength="30" style="padding: 0.75rem 1rem; border-radius: var(--py-radius-lg); border: 1px solid var(--py-border-color); background: var(--py-bg-card); color: var(--py-text-primary); font-size: var(--py-text-base);">
        <input type="text" id="auth-class" class="py-quest-input" placeholder="Klassencode (optional)" maxlength="20" style="padding: 0.75rem 1rem; border-radius: var(--py-radius-lg); border: 1px solid var(--py-border-color); background: var(--py-bg-card); color: var(--py-text-primary); font-size: var(--py-text-base);">
        <button type="submit" class="py-quest-btn py-quest-btn--accent" style="width: 100%;">
          <i class="ph ph-arrow-right" aria-hidden="true"></i> Los geht's
        </button>
      </form>
      <p style="font-size: var(--py-text-xs); color: var(--py-text-muted); margin-top: 1rem; text-align: center;">
        Dein Fortschritt wird lokal gespeichert. Keine E-Mail nötig.
      </p>
    </div>
  `;

  document.body.appendChild(modal);

  modal.querySelector('#auth-setup-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = modal.querySelector('#auth-name').value.trim();
    const classCode = modal.querySelector('#auth-class').value.trim();

    if (!name) return;

    await updateProfile(null, { display_name: name, class_code: classCode || null });

    localStorage.setItem(AUTH_SETUP_KEY, 'true');
    modal.remove();
  });
}

/**
 * Profil aktualisieren (lokal in localStorage)
 */
export async function updateProfile(userId, updates) {
  const user = getOrCreateUser();
  Object.assign(user, updates);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
}

/**
 * Klassencode für aktuellen User setzen
 */
export async function setClassCode(classCode) {
  await updateProfile(null, { class_code: classCode });
  return true;
}

/**
 * Zeigt Auth-Setup erneut
 */
export function resetAuthSetup() {
  localStorage.removeItem(AUTH_SETUP_KEY);
  showAuthSetup();
}

/**
 * Logout + Daten löschen
 */
export async function signOut() {
  localStorage.removeItem(AUTH_USER_KEY);
  localStorage.removeItem(AUTH_SETUP_KEY);
}
