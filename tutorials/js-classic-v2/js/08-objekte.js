// Kapitel 8: Objekte

function demoObjektAnlegen() {
    const schueler = {
      name: "Anna",
      alter: 16,
      klasse: "2AIT",
      noten: [2, 3, 1]
    };
  
    document.getElementById("ausgabe-objekt").innerHTML = 
      `<p>Name: <strong>${schueler.name}</strong></p>
       <p>Alter: ${schueler.alter}</p>
       <p>Klasse: ${schueler.klasse}</p>
       <p>Noten: [${schueler.noten.join(", ")}]</p>`;
  }
  
  function demoEigenschaften() {
    const auto = { marke: "Tesla", farbe: "rot" };
    
    auto.farbe = "blau";
    auto.baujahr = 2023;
    auto.fahren = function() {
      return "Brummm! 🚗";
    };
  
    document.getElementById("ausgabe-eigenschaften").innerHTML = 
      `<p>Marke: ${auto.marke}</p>
       <p>Farbe: <strong>${auto.farbe}</strong> (geändert)</p>
       <p>Baujahr: ${auto.baujahr} (neu hinzugefügt)</p>
       <p>${auto.fahren()}</p>`;
  }
  
  const rechteck = {
    breite: 5,
    hoehe: 3,
    flaeche: function() {
      return this.breite * this.hoehe;
    },
    info: function() {
      return `Rechteck ${this.breite}×${this.hoehe} = ${this.flaeche()} cm²`;
    }
  };
  
  function demoMethoden() {
    document.getElementById("ausgabe-methoden").innerHTML = 
      `<p>${rechteck.info()}</p>`;
  }
  
  const schueler = {
    name: "Ben",
    noten: [2, 3, 1, 4],
    berechneDurchschnitt: function() {
      let summe = 0;
      for (let i = 0; i < this.noten.length; i++) {
        summe += this.noten[i];
      }
      return (summe / this.noten.length).toFixed(2);
    },
    info: function() {
      return `${this.name} hat einen Notendurchschnitt von ${this.berechneDurchschnitt()}.`;
    }
  };
  
  function demoSchuelerObjekt() {
    document.getElementById("ausgabe-schueler").innerHTML = 
      `<p>${schueler.info()}</p>`;
  }