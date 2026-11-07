/**
 * PYTHON QUEST — Teacher API (Stub)
 * Wird später durch PHP-Backend ersetzt
 * Aktuell nur localStorage-Fallback
 */

/**
 * Lädt alle Schüler einer Klasse mit deren Fortschritt
 * (PHP-Backend folgt)
 */
export async function fetchClassProgress(classCode) {
  console.log('[TeacherAPI] fetchClassProgress — PHP backend coming soon');
  return { students: [], error: null };
}

/**
 * Lädt Reflexionen einer Klasse
 * (PHP-Backend folgt)
 */
export async function fetchClassReflections(classCode) {
  console.log('[TeacherAPI] fetchClassReflections — PHP backend coming soon');
  return { reflections: [], error: null };
}

/**
 * Erstellt eine neue Klasse
 * (PHP-Backend folgt)
 */
export async function createClass(code, name) {
  console.log('[TeacherAPI] createClass — PHP backend coming soon');
  return { data: null, error: null };
}

/**
 * Prüft, ob der aktuelle User ein Teacher ist
 * (PHP-Backend folgt)
 */
export async function isTeacher() {
  return false;
}

/**
 * Lädt Klassen des aktuellen Teachers
 * (PHP-Backend folgt)
 */
export async function fetchTeacherClasses() {
  console.log('[TeacherAPI] fetchTeacherClasses — PHP backend coming soon');
  return { classes: [], error: null };
}
