/**
 * PYTHON QUEST — Pyodide Sandbox
 * Echte Python-Ausführung im Browser via WebAssembly
 */

let pyodide = null;
let pyodideReady = false;
let loadPromise = null;

const PYODIDE_VERSION = '0.25.1';
const PYODIDE_URL = `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/pyodide.mjs`;

/**
 * Lädt Pyodide lazy (erst bei Bedarf)
 */
export async function initPyodide() {
  if (pyodideReady) return pyodide;
  if (loadPromise) return loadPromise;
  
  loadPromise = loadPyodideInternal();
  return loadPromise;
}

async function loadPyodideInternal() {
  try {
    const { loadPyodide } = await import(PYODIDE_URL);
    
    pyodide = await loadPyodide({
      indexURL: `https://cdn.jsdelivr.net/pyodide/v${PYODIDE_VERSION}/full/`,
      stdout: () => {}, // Wird später überschrieben
      stderr: () => {}
    });
    
    // Python-Packages vorladen, die wir brauchen
    await pyodide.loadPackage(['micropip']);
    await pyodide.runPythonAsync(`
      import micropip
      await micropip.install('matplotlib')
    `);
    
    // Matplotlib-Backend konfigurieren (nicht-interaktiv)
    await pyodide.runPythonAsync(`
      import matplotlib
      matplotlib.use('agg')
      import matplotlib.pyplot as plt
    `);
    
    pyodideReady = true;
    console.log('[Pyodide] Ready');
    return pyodide;
    
  } catch (error) {
    console.error('[Pyodide] Load failed:', error);
    pyodideReady = false;
    loadPromise = null;
    throw new Error(t('error.pyodideLoad'));
  }
}

/**
 * Führt Python-Code aus und gibt Output zurück
 */
export async function runPython(code, callbacks = {}) {
  const { onOutput, onError, onImage, onResult } = callbacks;
  
  if (!pyodideReady) {
    await initPyodide();
  }
  
  const outputs = [];
  const errors = [];
  
  // stdout/stderr umleiten
  pyodide.setStdout({ batched: (msg) => {
    outputs.push({ type: 'stdout', content: msg });
    if (onOutput) onOutput(msg);
  }});
  
  pyodide.setStderr({ batched: (msg) => {
    errors.push({ type: 'stderr', content: msg });
    if (onError) onError(msg);
  }});
  
  try {
    // Matplotlib-Figuren vor Ausführung zurücksetzen
    await pyodide.runPythonAsync('import matplotlib.pyplot as plt; plt.close("all")');
    
    // Code ausführen
    const result = await pyodide.runPythonAsync(code);
    
    // Ergebnis verarbeiten
    if (result !== undefined && result !== null) {
      let resultStr;
      try {
        resultStr = String(result);
      } catch {
        resultStr = '<Objekt kann nicht angezeigt werden>';
      }
      if (onResult) onResult(resultStr);
    }
    
    // Matplotlib-Bilder extrahieren
    const images = await extractMatplotlibImages();
    for (const img of images) {
      if (onImage) onImage(img);
    }
    
    return { outputs, errors, images, success: true };
    
  } catch (error) {
    const errorMsg = error.message || String(error);
    if (onError) onError(errorMsg);
    return { outputs, errors: [...errors, { type: 'error', content: errorMsg }], images: [], success: false };
  }
}

/**
 * Extrahiert Matplotlib-Bilder als Base64-Data-URLs
 */
async function extractMatplotlibImages() {
  if (!pyodide) return [];
  
  try {
    const images = await pyodide.runPythonAsync(`
import matplotlib.pyplot as plt
import base64
from io import BytesIO

images = []
for i, fig_num in enumerate(plt.get_fignums()):
    fig = plt.figure(fig_num)
    buf = BytesIO()
    fig.savefig(buf, format='png', dpi=100, bbox_inches='tight')
    buf.seek(0)
    img_base64 = base64.b64encode(buf.read()).decode('utf-8')
    images.append(f'data:image/png;base64,{img_base64}')
    plt.close(fig)

images
    `);
    
    return images.toJs ? images.toJs() : images;
  } catch {
    return [];
  }
}

/**
 * Prüft, ob Pyodide geladen ist
 */
export function isPyodideReady() {
  return pyodideReady;
}

/**
 * Gibt Ladefortschritt zurück (0-100)
 * Pyodide hat leider keinen nativen Progress-Callback,
 * daher simulieren wir einen
 */
export function getLoadProgress() {
  if (pyodideReady) return 100;
  if (loadPromise) return 50; // Lädt gerade
  return 0;
}
