// Kapitel 7: Funktionen

function sagHallo() {
    document.getElementById("ausgabe-hallo").innerHTML = 
      "<p>👋 Hallo! Diese Funktion macht immer dasselbe.</p>";
  }
  
  function gruessen(name) {
    return `Hallo, ${name}! Schön, dich zu sehen. 🌟`;
  }
  
  function demoParameter() {
    const nachricht1 = gruessen("Anna");
    const nachricht2 = gruessen("Ben");
    document.getElementById("ausgabe-param").innerHTML = 
      `<p>${nachricht1}</p><p>${nachricht2}</p>`;
  }
  
  function quadrieren(zahl) {
    return zahl * zahl;
  }
  
  function demoReturn() {
    const a = quadrieren(4);
    const b = quadrieren(7);
    document.getElementById("ausgabe-return").innerHTML = 
      `<p>4² = <strong>${a}</strong></p>
       <p>7² = <strong>${b}</strong></p>`;
  }
  
  function demoScope() {
    const global = "Ich bin außen sichtbar";
    
    function innereFunktion() {
      const lokal = "Ich existiere nur hier!";
      return lokal;
    }
    
    document.getElementById("ausgabe-scope").innerHTML = 
      `<p>Außen: <code>global</code> = "${global}"</p>
       <p>Innen: <code>lokal</code> = "${innereFunktion()}"</p>
       <p class="warnung">⚠️ „lokal“ ist außerhalb der Funktion <em>nicht zugreifbar</em>.</p>`;
  }
  
  function formatierePreis(betrag) {
    return `${betrag.toFixed(2)} €`;
  }
  
  function demoPraxisFunktion() {
    const preis1 = formatierePreis(12.9);
    const preis2 = formatierePreis(100);
    const preis3 = formatierePreis(0.5);
    
    document.getElementById("ausgabe-praxis").innerHTML = 
      `<ul>
        <li>Kaffee: <strong>${preis1}</strong></li>
        <li>Laptop: <strong>${preis2}</strong></li>
        <li>Brötchen: <strong>${preis3}</strong></li>
      </ul>`;
  }