// Kapitel 4: Bedingungen

function demoIf() {
    const punkte = 85;
    let nachricht = "Prüfung beendet.";
  
    if (punkte >= 50) {
      nachricht += " Du hast bestanden! 🎉";
    }
  
    document.getElementById("ausgabe-if").innerHTML = 
      `<p>Punkte: <strong>${punkte}</strong></p>
       <p>${nachricht}</p>`;
  }
  
  function demoIfElse() {
    const alter = 16;
  
    let zugang;
    if (alter >= 18) {
      zugang = "Zugang erlaubt. 🍺";
    } else {
      zugang = "Zugang verweigert. 🧃";
    }
  
    document.getElementById("ausgabe-if-else").innerHTML = 
      `<p>Alter: <strong>${alter}</strong></p>
       <p>${zugang}</p>`;
  }
  
  function demoIfElseIf() {
    const punkte = 72;
    let bewertung;
  
    if (punkte >= 90) {
      bewertung = "Sehr gut (1)";
    } else if (punkte >= 80) {
      bewertung = "Gut (2)";
    } else if (punkte >= 70) {
      bewertung = "Befriedigend (3)";
    } else if (punkte >= 60) {
      bewertung = "Genügend (4)";
    } else {
      bewertung = "Nicht genügend (5) ❌";
    }
  
    document.getElementById("ausgabe-if-elseif").innerHTML = 
      `<p>Punkte: <strong>${punkte}</strong></p>
       <p>Bewertung: <strong>${bewertung}</strong></p>`;
  }
  
  function demoLogikInIf() {
    const alter = 17;
    const hatEintrittskarte = true;
  
    let resultat;
    if (alter >= 18 && hatEintrittskarte) {
      resultat = "Eintritt erlaubt.";
    } else if (alter < 18 && hatEintrittskarte) {
      resultat = "Eintritt nur mit Erziehungsberechtigtem.";
    } else {
      resultat = "Kein Eintritt – fehlende Karte oder Alter.";
    }
  
    document.getElementById("ausgabe-logik-if").innerHTML = 
      `<p>Alter: ${alter}, Karte: ${hatEintrittskarte ? 'ja' : 'nein'}</p>
       <p>${resultat}</p>`;
  }