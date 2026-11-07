// Kapitel 1: Einführung & Ausgabe – JavaScript-Grundlagen

function demoConsole() {
    console.log("Hallo aus der Konsole! 👋");
  }
  
  function demoAlert() {
    alert("Hallo aus einem Popup! ⚠️\n(Dieses Blockieren der Seite ist oft unerwünscht.)");
  }
  
  function demoDocumentWrite() {
    // Warnung: document.write löscht die Seite, wenn sie nach dem Laden aufgerufen wird!
    if (document.readyState === 'loading') {
      document.write("<h2>Neue Seite durch document.write!</h2>");
    } else {
      alert("❌ document.write() funktioniert nur während des Seitenladens!\n(Deshalb verwenden wir es nicht.)");
    }
  }
  
  function demoInnerHTML() {
    const bereich = document.getElementById("ausgabe-bereich");
    bereich.innerHTML = "<p style='color: #27ae60;'><strong>Erfolg!</strong> Dieser Text wurde dynamisch mit JavaScript eingefügt. 🎉</p>";
  }

  function demoPrompt() {
  const name = prompt("Wie heißt du?");
  if (name) {
    document.getElementById("ausgabe-prompt").innerHTML = 
      `<p>Hallo, <strong>${name}</strong>! Schön, dich kennenzulernen. 😊</p>`;
  } else {
    document.getElementById("ausgabe-prompt").innerHTML = 
      "<p>Du hast keinen Namen eingegeben. 😕</p>";
  }
}