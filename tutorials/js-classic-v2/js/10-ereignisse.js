// Kapitel 10: Ereignisse & Zeitsteuerung

// 2. Event-Listener
document.getElementById("btn-demo-listener").addEventListener("click", function() {
    const zaehler = parseInt(this.getAttribute("data-anzahl") || "0") + 1;
    this.setAttribute("data-anzahl", zaehler);
    document.getElementById("ausgabe-listener").textContent = 
      "Button wurde " + zaehler + "× geklickt.";
  });
  
  // 3. Event-Objekt
  document.getElementById("input-demo").addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
      document.getElementById("ausgabe-event").innerHTML = 
        "Du hast <strong>Enter</strong> gedrückt! Eingabe: „" + 
        event.target.value + "“";
      event.target.value = "";
    }
  });
  
  // 4. Event-Delegation
  document.getElementById("container-buttons").addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
      document.getElementById("ausgabe-delegation").textContent = 
        "Geklickt: " + event.target.textContent;
    }
  });
  
  document.getElementById("btn-hinzufuegen").addEventListener("click", function() {
    const btn = document.createElement("button");
    btn.textContent = "Dynamisch " + (document.querySelectorAll("#container-buttons button").length + 1);
    document.getElementById("container-buttons").appendChild(btn);
  });
  
  // 5. Timing
  function demoTimeout() {
    const meldung = document.getElementById("meldung-timing");
    meldung.textContent = "✅ Erfolgreich gespeichert!";
    meldung.style.backgroundColor = "#d4edda";
    
    setTimeout(() => {
      meldung.textContent = "";
      meldung.style.backgroundColor = "";
    }, 3000);
  }
  
  let uhrIntervall = null;
  
  function startUhr() {
    if (uhrIntervall) return;
    uhrIntervall = setInterval(() => {
      document.getElementById("uhr-timing").textContent = 
        new Date().toLocaleTimeString();
    }, 1000);
  }
  
  function stopUhr() {
    if (uhrIntervall) {
      clearInterval(uhrIntervall);
      uhrIntervall = null;
    }
  }