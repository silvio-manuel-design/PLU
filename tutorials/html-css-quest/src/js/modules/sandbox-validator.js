import { t } from './i18n.js';

/**
 * Sandbox Validator — HTML-Fehlererkennung für den Code-Editor
 * Standard-Level: Ungeschlossene Tags, fehlende Attribute, ungültige Tags
 * Keine externen Abhängigkeiten — rein clientseitig
 */

/** Selbstschließende Tags (benötigen kein schließendes Tag) */
const SELF_CLOSING = new Set([
  'area', 'base', 'br', 'col', 'embed', 'hr', 'img', 'input',
  'link', 'meta', 'param', 'source', 'track', 'wbr'
]);

/** Ungültige Tags (nic-standard oder falsch geschrieben) */
const INVALID_TAGS = new Set([
  'h7', 'h8', 'h9', 'h10',
  'b1', 'b2', 'b3', 'i1', 'i2', 'i3',
  'image', 'divs', 'spans', 'paragraph', 'header1',
]);

/** Tags, die Pflichtattribute haben */
const REQUIRED_ATTRS = {
  img: ['alt'],
  button: ['type'],
  input: ['type'],
};

/**
 * Parst HTML-Code und gibt Fehler-Array zurück
 * @param {string} code — Der HTML-Code aus der Sandbox
 * @returns {Array<{line: number, type: 'error'|'warning', message: string}>}
 */
export function validateHTML(code) {
  const errors = [];
  if (!code || !code.trim()) return errors;

  const lines = code.split('\n');
  const stack = []; // { tag, line, attrs }
  let inComment = false;
  let inScript = false;
  let inStyle = false;

  for (let lineIdx = 0; lineIdx < lines.length; lineIdx++) {
    const lineNum = lineIdx + 1;
    let line = lines[lineIdx];

    // Kommentare überspringen (vereinfacht: pro Zeile)
    if (inComment) {
      if (line.includes('-->')) {
        inComment = false;
        line = line.slice(line.indexOf('-->') + 3);
      } else {
        continue;
      }
    }

    // Script/Style-Blöcke überspringen
    if (inScript) {
      if (/<\/script>/i.test(line)) {
        inScript = false;
      }
      continue;
    }
    if (inStyle) {
      if (/<\/style>/i.test(line)) {
        inStyle = false;
      }
      continue;
    }

    // Zeilenweise Tags finden
    const tagRegex = /<(\/?)([a-zA-Z][a-zA-Z0-9]*)\b([^>]*)>/g;
    let match;

    while ((match = tagRegex.exec(line)) !== null) {
      const isClosing = match[1] === '/';
      const tagName = match[2].toLowerCase();
      const attrString = match[3];

      // Kommentar-Anfang?
      if (line.indexOf('<!--') >= 0 && match.index > line.indexOf('<!--')) break;

      // Script/Style-Anfang?
      if (tagName === 'script') { inScript = true; continue; }
      if (tagName === 'style') { inStyle = true; continue; }

      // Ungültige Tags prüfen
      if (INVALID_TAGS.has(tagName)) {
        errors.push({
          line: lineNum,
          type: 'error',
          message: `<${tagName}> ist kein gültiges HTML-Tag. Meintest du <${suggestValidTag(tagName)}>?`
        });
        continue;
      }

      // Überschriften h1-h6 prüfen
      if (/^h[0-9]$/.test(tagName) && tagName !== 'h1' && tagName !== 'h2' && tagName !== 'h3' && tagName !== 'h4' && tagName !== 'h5' && tagName !== 'h6') {
        errors.push({
          line: lineNum,
          type: 'error',
          message: `<${tagName}> existiert nicht. HTML hat nur <h1> bis <h6> als Überschriften.`
        });
        continue;
      }

      // Selbstschließende Tags
      if (SELF_CLOSING.has(tagName)) {
        // Pflichtattribute prüfen
        if (REQUIRED_ATTRS[tagName]) {
          for (const reqAttr of REQUIRED_ATTRS[tagName]) {
            if (!hasAttribute(attrString, reqAttr)) {
              errors.push({
                line: lineNum,
                type: 'warning',
                message: `<${tagName}> sollte ein \`${reqAttr}\`-Attribut haben. Das ist wichtig für Barrierefreiheit und Funktionalität.`
              });
            }
          }
        }
        continue;
      }

      if (isClosing) {
        // Schließendes Tag — passt es zum Stack?
        const lastOpen = stack.pop();
        if (!lastOpen) {
          errors.push({
            line: lineNum,
            type: 'error',
            message: `</${tagName}> hat kein öffnendes <${tagName}>. Das Tag wurde nirgends geöffnet.`
          });
        } else if (lastOpen.tag !== tagName) {
          // Falsche Verschachtelung
          errors.push({
            line: lineNum,
            type: 'error',
            message: `Falsche Verschachtelung: <${lastOpen.tag}> (Zeile ${lastOpen.line}) wurde nicht geschlossen, bevor </${tagName}> kommt.`
          });
          // Versuchen, im Stack weiter rückwärts zu finden
          let found = false;
          for (let i = stack.length - 1; i >= 0; i--) {
            if (stack[i].tag === tagName) {
              stack.splice(i, 1);
              found = true;
              break;
            }
          }
          if (!found) {
            // Wieder zurücklegen, falls es ein komplett fremdes schließendes Tag war
            stack.push(lastOpen);
          }
        }
      } else {
        // Öffnendes Tag
        stack.push({ tag: tagName, line: lineNum, attrs: attrString });

        // Pflichtattribute prüfen
        if (REQUIRED_ATTRS[tagName]) {
          for (const reqAttr of REQUIRED_ATTRS[tagName]) {
            if (!hasAttribute(attrString, reqAttr)) {
              errors.push({
                line: lineNum,
                type: 'warning',
                message: `<${tagName}> sollte ein \`${reqAttr}\`-Attribut haben.`
              });
            }
          }
        }
      }
    }
  }

  // Verbleibende Tags im Stack = ungeschlossen
  for (const open of stack) {
    errors.push({
      line: open.line,
      type: 'error',
      message: `<${open.tag}> wurde geöffnet, aber nie geschlossen. Füge </${open.tag}> hinzu.`
    });
  }

  // Dokumenten-Weite Prüfungen
  const fullCode = code.toLowerCase();
  if (!fullCode.includes('<!doctype')) {
    errors.push({
      line: 1,
      type: 'warning',
      message: 'Das Dokument hat kein <!DOCTYPE html>. Das sollte die erste Zeile jeder HTML-Datei sein.'
    });
  }
  if (!fullCode.includes('charset')) {
    errors.push({
      line: 1,
      type: 'warning',
      message: '<meta charset="UTF-8"> fehlt. Ohne das werden Umlaute (ä, ö, ü) falsch dargestellt.'
    });
  }
  if (!fullCode.includes('<html')) {
    errors.push({
      line: 1,
      type: 'error',
      message: 'Das <html>-Tag fehlt. Jede Webseite braucht ein <html>-Tag als äußersten Rahmen.'
    });
  }
  if (!fullCode.includes('</html>')) {
    errors.push({
      line: lines.length,
      type: 'error',
      message: 'Das schließende </html>-Tag fehlt am Ende der Datei.'
    });
  }
  if (!fullCode.includes('<head>')) {
    errors.push({
      line: 1,
      type: 'warning',
      message: 'Das <head>-Tag fehlt. Hier gehören Titel, Charset und CSS-Links hin.'
    });
  }
  if (!fullCode.includes('</head>')) {
    errors.push({
      line: lines.length,
      type: 'warning',
      message: 'Das schließende </head>-Tag fehlt.'
    });
  }
  if (!fullCode.includes('<body>')) {
    errors.push({
      line: 1,
      type: 'error',
      message: 'Das <body>-Tag fehlt. Hierhin kommt der gesamte sichtbare Inhalt der Seite.'
    });
  }
  if (!fullCode.includes('</body>')) {
    errors.push({
      line: lines.length,
      type: 'error',
      message: 'Das schließende </body>-Tag fehlt am Ende der Datei.'
    });
  }

  // Sortieren: Nach Zeilennummer
  errors.sort((a, b) => a.line - b.line);

  return errors;
}

/**
 * Prüft, ob ein Attribut im Attribut-String vorhanden ist
 */
function hasAttribute(attrString, attrName) {
  const regex = new RegExp(`\\b${attrName}\\s*=`, 'i');
  return regex.test(attrString);
}

/**
 * Vorschlag für ein gültiges Tag bei Tippfehlern
 */
function suggestValidTag(invalid) {
  const suggestions = {
    image: 'img',
    divs: 'div',
    spans: 'span',
    paragraph: 'p',
    header1: 'h1',
  };
  return suggestions[invalid] || 'div';
}
