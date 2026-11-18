// Kapitel 9: DOM-Manipulation

function demoSuchen() {
    const h1 = document.querySelector("h1");
    const button = document.querySelector("button");
    
    document.getElementById("demo-suchen-ausgabe").innerHTML = 
      `<p>Gefunden: <code>h1</code>-Text = „${h1.textContent}“</p>
       <p>Button-Text = „${button.textContent}“</p>`;
  }
  
  function demoInhalt() {
    const bereich = document.getElementById("demo-inhalt-ausgabe");
    
    bereich.textContent = "Dieser Text enthält <strong>kein HTML</strong>!";
    setTimeout(() => {
      bereich.innerHTML = "Dieser Text enthält <strong>fettes HTML</strong>!";
    }, 1500);
  }
  
  function demoErstellen() {
    const liste = document.getElementById("demo-erstellen-liste");
    
    const neuesLi = document.createElement("li");
    neuesLi.textContent = "🕗 " + new Date().toLocaleTimeString();
    
    if (liste.children.length === 0) {
      const ul = document.createElement("ul");
      ul.appendChild(neuesLi);
      liste.appendChild(ul);
    } else {
      liste.querySelector("ul").appendChild(neuesLi);
    }
  }
  
  function demoStil() {
    const div = document.getElementById("demo-stil-ziel");
    div.style.backgroundColor = "#" + Math.floor(Math.random()*16777215).toString(16);
  }
  
  function demoAttribut() {
    const div = document.getElementById("demo-stil-ziel");
    div.setAttribute("data-geaendert", "ja");
    div.textContent = "Attribut 'data-geaendert' wurde gesetzt!";
  }