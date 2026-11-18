<?php
// Musterlösungen js-classic Labs 01–12 — NUR SERVERSEITIG, nie in Git.
// Inhalte wortfertig aus PAKET-P10-uebungen-labs.md §5 (Nowdoc, kein Escaping-Bruch).
// return, damit panel.php den Array direkt aus require erhält.
$loesungen = [
  1 => [
    'title' => 'Lab 01 — Erste Ausgaben',
    'file'  => 'uebung-01.html',
    'code'  => <<<'CODE'
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <title>Übung 01</title>
    <script src="main.js" defer></script>
  </head>
  <body>
    <h1>Meine erste Seite</h1>
    <p id="gruss"></p>
  </body>
</html>

<!-- ===== main.js ===== -->
console.log("Mein Lieblingsfach ist Mathe.");
document.getElementById("gruss").innerHTML = "Hallo, ich bin Martin!";
alert("Willkommen auf meiner Seite!");
CODE
  ],
  2 => [
    'title' => 'Lab 02 — Steckbrief-Generator',
    'file'  => 'uebung-02.html',
    'code'  => <<<'CODE'
<p id="ausgabe"></p>
<button id="fuellen" type="button">Steckbrief anzeigen</button>

<!-- ===== main.js ===== -->
let name = "Martin";      // dein Name
let alter = 15;           // dein Alter
let hobby = "Fotografie"; // dein Hobby
let essen = "Kaiserschmarrn"; // dein Lieblingsessen

function steckbriefAnzeigen() {
  document.getElementById("ausgabe").textContent =
    `Ich heiße ${name}, bin ${alter} und liebe ${hobby}.`;
}
document.getElementById("fuellen").addEventListener("click", steckbriefAnzeigen);
CODE
  ],
  3 => [
    'title' => 'Lab 03 — Warenkorb-Rechner',
    'file'  => 'uebung-03.html',
    'code'  => <<<'CODE'
let preis1 = 4.5, preis2 = 12.99, preis3 = 3.25;
let code = "RABATT10";
let summe = preis1 + preis2 + preis3;
let steuer = summe * 0.2;
let gesamt = summe + steuer;

if (code === "RABATT10") {
  gesamt = gesamt * 0.9;
}

document.getElementById("bon").innerHTML =
  `<p>Zwischensumme: ${summe.toFixed(2)} €</p>` +
  `<p>Steuer 20 %: ${steuer.toFixed(2)} €</p>` +
  `<p>Gesamt: ${gesamt.toFixed(2)} €</p>`;
CODE
  ],
  4 => [
    'title' => 'Lab 04 — Noten-Rechner',
    'file'  => 'uebung-04.html',
    'code'  => <<<'CODE'
let punkte = 41, maxPunkte = 50;
let prozent = punkte / maxPunkte * 100;

if (isNaN(punkte) || punkte < 0 || punkte > maxPunkte) {
  document.getElementById("ausgabe").textContent = "Ungültige Eingabe.";
} else if (prozent >= 88) {
  document.getElementById("ausgabe").textContent = "Sehr gut — stark gearbeitet.";
} else if (prozent >= 75) {
  document.getElementById("ausgabe").textContent = "Gut — solide Leistung.";
} else if (prozent >= 60) {
  document.getElementById("ausgabe").textContent = "Befriedigend — übe weiter.";
} else {
  document.getElementById("ausgabe").textContent = "Nicht genügend — frag nach.";
}
CODE
  ],
  5 => [
    'title' => 'Lab 05 — Countdown & Tabelle',
    'file'  => 'uebung-05.html',
    'code'  => <<<'CODE'
const liste = document.getElementById("countdown");
for (let i = 10; i >= 0; i--) {
  const li = document.createElement("li");
  li.textContent = i;
  liste.appendChild(li);
}

const reihe = document.getElementById("reihe");
for (let i = 1; i <= 10; i++) {
  const li = document.createElement("li");
  li.textContent = `1 × ${i} = ${1 * i}`;
  reihe.appendChild(li);
}

let zeilen = 0, zaehler = 0;
while (zaehler < 30 && zeilen < 20) {
  zeilen++; zaehler++;
}
document.getElementById("summe").textContent = `Zeilen gesamt: ${zeilen}`;
CODE
  ],
  6 => [
    'title' => 'Lab 06 — Einkaufsliste Pro',
    'file'  => 'uebung-06.html',
    'code'  => <<<'CODE'
let einkauf = ["Apfel", "Brot", "Butter", "Milch", "Eier"];
const container = document.getElementById("liste");

function anzeigen(liste) {
  container.innerHTML = "";
  for (const artikel of liste) {
    const li = document.createElement("li");
    li.textContent = artikel;
    container.appendChild(li);
  }
}
anzeigen(einkauf);

document.getElementById("add").addEventListener("click", () => {
  const wert = document.getElementById("neu").value.trim();
  if (wert) { einkauf.push(wert); anzeigen(einkauf); }
});
document.getElementById("sort").addEventListener("click", () => {
  anzeigen([...einkauf].sort());
});
document.getElementById("filter").addEventListener("input", (e) => {
  anzeigen(einkauf.filter(a => a.toLowerCase().includes(e.target.value.toLowerCase())));
});
CODE
  ],
  7 => [
    'title' => 'Lab 07 — Mini-Umrechner',
    'file'  => 'uebung-07.html',
    'code'  => <<<'CODE'
/** Wandelt Grad Celsius in Fahrenheit um. */
function celsiusToFahrenheit(c) {
  return c * 9 / 5 + 32;
}
/** Rechnet km/h in m/s um, gerundet auf 2 Stellen. */
function kmhToMs(k) {
  return (k / 3.6).toFixed(2);
}
/** Formatiert einen Betrag als Preis-String. */
function formatPreis(betrag) {
  return `${betrag.toFixed(2)} €`;
}
document.getElementById("ausgabe").innerHTML =
  `<p>100 °C = ${celsiusToFahrenheit(100)} °F</p>` +
  `<p>50 km/h = ${kmhToMs(50)} m/s</p>` +
  `<p>Betrag: ${formatPreis(3.1415)}</p>`;
CODE
  ],
  8 => [
    'title' => 'Lab 08 — Deine Mediathek',
    'file'  => 'uebung-08.html',
    'code'  => <<<'CODE'
const film = { titel: "Inception", jahr: 2010, bewertung: 5,
  beschreibung() { return `${this.titel} (${this.jahr})`; } };
const buch  = { titel: "Die Verwandlung", jahr: 1915, bewertung: 4 };
const lied  = { titel: "Moon River", jahr: 1961, bewertung: 4 };
const mediathek = [film, buch, lied];

const topWert = Math.max(...mediathek.map(m => m.bewertung));
const liste = document.getElementById("mediathek");
for (const m of mediathek) {
  const li = document.createElement("li");
  li.textContent = `${m.titel} (${m.jahr}) — ${m.bewertung} von 5`;
  if (m.bewertung === topWert) li.textContent += " · Top";
  liste.appendChild(li);
}
CODE
  ],
  9 => [
    'title' => 'Lab 09 — Klick-Zähler',
    'file'  => 'uebung-09.html',
    'code'  => <<<'CODE'
let zaehler = 0;
const stand = document.getElementById("stand");
const knopf = document.getElementById("knopf");

knopf.addEventListener("click", () => {
  zaehler++;
  stand.textContent = zaehler;
  stand.classList.toggle("is-hot", zaehler >= 10);
  document.getElementById("meistertext").hidden = zaehler < 20;
});
document.getElementById("reset").addEventListener("click", () => {
  zaehler = 0;
  stand.textContent = zaehler;
  stand.classList.remove("is-hot");
  document.getElementById("meistertext").hidden = true;
});
CODE
  ],
  10 => [
    'title' => 'Lab 10 — Reaktions-Test',
    'file'  => 'uebung-10.html',
    'code'  => <<<'CODE'
const feld = document.getElementById("feld");
let start = 0, bereit = false, timer = null;

feld.addEventListener("click", () => {
  if (!bereit && timer) {
    clearTimeout(timer);
    feld.textContent = "Zu früh! Nochmal.";
    return;
  }
  if (bereit) {
    const ms = Date.now() - start;
    document.getElementById("ergebnis").textContent =
      `Reaktionszeit: ${(ms / 1000).toFixed(2)} s`;
    bereit = false;
  }
});
document.getElementById("start").addEventListener("click", () => {
  bereit = false;
  feld.textContent = "Warte auf Grün …";
  timer = setTimeout(() => {
    bereit = true;
    start = Date.now();
    feld.classList.add("is-green");
    feld.textContent = "Jetzt!";
  }, 1000 + Math.random() * 3000);
});
CODE
  ],
  11 => [
    'title' => 'Lab 11 — Anmelde-Formular',
    'file'  => 'uebung-11.html',
    'code'  => <<<'CODE'
<form id="anmeldung">
  <p><label>Name: <input name="name" required minlength="3" /></label></p>
  <p class="fehler" id="fehler-name" aria-live="polite"></p>
  <p><label>E-Mail: <input name="email" type="email" required /></label></p>
  <p class="fehler" id="fehler-email" aria-live="polite"></p>
  <p><label>Passwort: <input name="passwort" type="password" required minlength="8" /></label></p>
  <p class="fehler" id="fehler-passwort" aria-live="polite"></p>
  <p><button type="submit">Anmelden</button></p>
</form>
<p id="erfolg" aria-live="polite"></p>

<!-- ===== main.js ===== -->
const formular = document.getElementById("anmeldung");
formular.addEventListener("submit", (event) => {
  event.preventDefault();
  const name = formular.name.value.trim();
  const mail = formular.email.value.trim();
  const pass = formular.passwort.value;
  let ok = true;

  formular.querySelectorAll(".fehler").forEach(e => e.textContent = "");
  if (name.length < 3) {
    document.getElementById("fehler-name").textContent = "Name braucht mindestens 3 Zeichen.";
    ok = false;
  }
  if (!mail.includes("@")) {
    document.getElementById("fehler-email").textContent = "E-Mail sieht nicht gültig aus.";
    ok = false;
  }
  if (pass.length < 8) {
    document.getElementById("fehler-passwort").textContent = "Passwort: mindestens 8 Zeichen.";
    ok = false;
  }
  if (ok) {
    formular.reset();
    document.getElementById("erfolg").textContent = "Anmeldung geprüft — alles passt!";
  }
});
CODE
  ],
  12 => [
    'title' => 'Lab 12 — XSS-Labor',
    'file'  => 'uebung-12.html',
    'code'  => <<<'CODE'
const eingabe = document.getElementById("eingabe");
document.getElementById("sendenA").addEventListener("click", () => {
  document.getElementById("anzeigeA").innerHTML = eingabe.value; // GEFÄHRLICH
});
document.getElementById("sendenB").addEventListener("click", () => {
  document.getElementById("anzeigeB").textContent = eingabe.value; // SICHER
});
document.getElementById("test").addEventListener("click", () => {
  eingabe.value = '<img src=x onerror=alert(1)>';
  document.getElementById("anzeigeA").innerHTML = eingabe.value;
  document.getElementById("anzeigeB").textContent = eingabe.value;
});
CODE
  ],
];

return $loesungen;
