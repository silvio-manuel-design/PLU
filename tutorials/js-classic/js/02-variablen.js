// Kapitel 2: Variablen und Datentypen

function demoConstLet() {
    const name = "Anna";
    let alter = 16;
  
    // name = "Ben"; // ❌ Fehler! const-Werte dürfen nicht geändert werden.
    alter = 17; // ✅ Erlaubt bei let.
  
    document.getElementById("ausgabe-const-let").innerHTML =
      `<p>Name: <strong>${name}</strong> (const – unveränderlich)</p>` +
      `<p>Alter: <strong>${alter}</strong> (let – veränderlich)</p>`;
  }
  
  function demoDatentypen() {
    const text = "Hallo Welt";        // string
    const zahl = 42;                  // number
    const punktzahl = 3.14;           // number
    const istSchueler = true;         // boolean
    const nichts = null;              // null
    let undefiniert;                  // undefined
  
    document.getElementById("ausgabe-daten").innerHTML = 
      `<ul>
        <li><code>text</code>: "${text}" → <em>${typeof text}</em></li>
        <li><code>zahl</code>: ${zahl} → <em>${typeof zahl}</em></li>
        <li><code>punktzahl</code>: ${punktzahl} → <em>${typeof punktzahl}</em></li>
        <li><code>istSchueler</code>: ${istSchueler} → <em>${typeof istSchueler}</em></li>
        <li><code>nichts</code>: ${nichts} → <em>${typeof nichts}</em> (⚠️ Sonderfall!)</li>
        <li><code>undefiniert</code>: ${undefiniert} → <em>${typeof undefiniert}</em></li>
      </ul>`;
  }

  function demoTemplate() {
  const schueler = ["Anna", "Ben", "Chloé"];
  const html = `<ul>
  ${schueler.map(name => `<li>Hallo, ${name}!</li>`).join('')}
</ul>`;
  document.getElementById("ausgabe-template").innerHTML = html;
}