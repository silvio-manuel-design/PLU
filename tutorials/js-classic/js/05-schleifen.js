// Kapitel 5: Schleifen

function demoFor() {
    let ausgabe = "<ol>";
    for (let i = 1; i <= 5; i++) {
      ausgabe += `<li>Durchlauf ${i}</li>`;
    }
    ausgabe += "</ol>";
    document.getElementById("ausgabe-for").innerHTML = ausgabe;
  }
  
  function demoWhile() {
    let i = 3;
    let ausgabe = "<ul>";
    while (i > 0) {
      ausgabe += `<li>Noch ${i} Sekunden...</li>`;
      i--; // Update – sonst Endlosschleife!
    }
    ausgabe += "<li>Start! 🚀</li></ul>";
    document.getElementById("ausgabe-while").innerHTML = ausgabe;
  }
  
  function demoDoWhile() {
    let versuch = 0;
    let zahl;
    let ausgabe = "";
  
    do {
      versuch++;
      zahl = Math.floor(Math.random() * 10) + 1; // Zufallszahl 1–10
      ausgabe += `Versuch ${versuch}: Zahl = ${zahl}<br>`;
    } while (zahl !== 7 && versuch < 5);
  
    ausgabe += (zahl === 7)
      ? "🎉 Erfolg! Die Zahl 7 wurde gefunden!"
      : "❌ Kein Glück – 5 Versuche ohne 7.";
  
    document.getElementById("ausgabe-do-while").innerHTML = ausgabe;
  }

  function demoSwitch() {
  const tag = 3; // 1=Mo, 2=Di, ..., 7=So
  let wochentag;

  switch (tag) {
    case 1:
      wochentag = "Montag";
      break;
    case 2:
      wochentag = "Dienstag";
      break;
    case 3:
      wochentag = "Mittwoch";
      break;
    case 4:
      wochentag = "Donnerstag";
      break;
    case 5:
      wochentag = "Freitag";
      break;
    case 6:
      wochentag = "Samstag";
      break;
    case 7:
      wochentag = "Sonntag";
      break;
    default:
      wochentag = "Ungültiger Tag";
  }

  document.getElementById("ausgabe-switch").innerHTML = 
    `<p>Tag-Nummer: <strong>${tag}</strong></p>
     <p>Wochentag: <strong>${wochentag}</strong></p>`;
}