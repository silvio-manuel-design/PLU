// Kapitel 6: Arrays

function demoArrayGrundlagen() {
    const farben = ["rot", "grün", "blau"];
    const ersteFarbe = farben[0];
    const letzteFarbe = farben[2];
  
    farben[1] = "gelb";
  
    document.getElementById("ausgabe-array-grund").innerHTML = 
      `<p>Array: [<em>"${farben.join('", "')}"</em>]</p>
       <p>Erste Farbe (Index 0): <strong>${ersteFarbe}</strong></p>
       <p>Letzte Farbe (Index 2): <strong>${letzteFarbe}</strong></p>
       <p>Nach Änderung: [<em>"${farben.join('", "')}"</em>]</p>`;
  }
  
  function demoArrayMethoden() {
    let liste = ["Anna", "Ben"];
    
    liste.push("Chloé");
    liste.unshift("David");
    const letzter = liste.pop();
  
    document.getElementById("ausgabe-array-methoden").innerHTML = 
      `<p>Start: ["Anna", "Ben"]</p>
       <p>Nach .push("Chloé"): [<em>"${liste.join('", "')}"</em>]</p>
       <p>Nach .unshift("David"): [<em>"${liste.join('", "')}"</em>]</p>
       <p>.pop() → entfernt: <strong>${letzter}</strong></p>
       <p>Endstand: [<em>"${liste.join('", "')}"</em>]</p>`;
  }
  
  function demoArraySchleife() {
    const tiere = ["Hund", "Katze", "Vogel"];
    let ausgabe = "<ul>";
    
    for (let i = 0; i < tiere.length; i++) {
      ausgabe += `<li>Index ${i}: ${tiere[i]}</li>`;
    }
    ausgabe += "</ul>";
  
    document.getElementById("ausgabe-array-schleife").innerHTML = ausgabe;
  }
  
  function demoNotenDurchschnitt() {
    const noten = [2, 3, 1, 4, 2];
    let summe = 0;
    
    for (let i = 0; i < noten.length; i++) {
      summe += noten[i];
    }
    const durchschnitt = (summe / noten.length).toFixed(2);
  
    document.getElementById("ausgabe-noten").innerHTML = 
      `<p>Noten: [<em>${noten.join(", ")}</em>]</p>
       <p>Summe: ${summe}</p>
       <p>Durchschnitt: <strong>${durchschnitt}</strong></p>`;
  }