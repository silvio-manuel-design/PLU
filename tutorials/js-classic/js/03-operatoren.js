// Kapitel 3: Operatoren

function demoArithmetik() {
    const zahl1 = 10;
    const zahl2 = 3;
    const text1 = "Hallo";
    const text2 = "Welt";
  
    document.getElementById("ausgabe-arithmetik").innerHTML = 
      `<ul>
        <li>${zahl1} + ${zahl2} = <strong>${zahl1 + zahl2}</strong> (Addition)</li>
        <li>${zahl1} - ${zahl2} = <strong>${zahl1 - zahl2}</strong> (Subtraktion)</li>
        <li>${zahl1} * ${zahl2} = <strong>${zahl1 * zahl2}</strong> (Multiplikation)</li>
        <li>${zahl1} / ${zahl2} = <strong>${zahl1 / zahl2}</strong> (Division)</li>
        <li>${zahl1} % ${zahl2} = <strong>${zahl1 % zahl2}</strong> (Rest bei Division)</li>
        <li>"${text1}" + "${text2}" = <strong>"${text1 + text2}"</strong> (Textverkettung!)</li>
        <li class="warnung">⚠️ "5" + 3 = "${"5" + 3}" (nicht 8!) – Vorsicht bei gemischten Typen!</li>
      </ul>`;
  }
  
  function demoZuweisung() {
    let x = 5;
    x += 3;
    let y = 10;
    y *= 2;
  
    document.getElementById("ausgabe-zuweisung").innerHTML = 
      `<ul>
        <li>Start: x = 5 → nach <code>x += 3</code>: <strong>${x}</strong></li>
        <li>Start: y = 10 → nach <code>y *= 2</code>: <strong>${y}</strong></li>
      </ul>`;
  }
  
  function demoVergleich() {
    const ergebnis1 = (5 == "5");
    const ergebnis2 = (5 === "5");
  
    document.getElementById("ausgabe-vergleich").innerHTML = 
      `<ul>
        <li><code>5 == "5"</code> → <strong>${ergebnis1}</strong> (⚠️ Typumwandlung!)</li>
        <li><code>5 === "5"</code> → <strong>${ergebnis2}</strong> (✅ sicherer Vergleich)</li>
        <li class="regel">💡 Immer <code>===</code> und <code>!==</code> verwenden!</li>
      </ul>`;
  }
  
  function demoLogik() {
    const a = true;
    const b = false;
  
    document.getElementById("ausgabe-logik").innerHTML = 
      `<ul>
        <li><code>${a} && ${b}</code> (UND) → <strong>${a && b}</strong></li>
        <li><code>${a} || ${b}</code> (ODER) → <strong>${a || b}</strong></li>
        <li><code>!${a}</code> (NICHT) → <strong>${!a}</strong></li>
      </ul>`;
  }
  
  function demoTernaer() {
    const alter = 17;
    const zugang = (alter >= 18) ? "erlaubt" : "nicht erlaubt";
  
    document.getElementById("ausgabe-ternär").innerHTML = 
      `<p>Alter: <strong>${alter}</strong></p>
       <p>Zugang: <strong>${zugang}</strong> (mit ternärem Operator)</p>`;
  }