<?php
// panel.php — Lösungs-Übersicht V2 (P63): Labs 01–12 / Projekte 1–3 / Abschlussprojekt.
// Liest Gruppen-Array aus data/loesungen.php. auth.php-Bootstrap unverändert.
require __DIR__ . '/auth.php';

$cfg = jsc_config();
$idleSec = (int) ($cfg['idle_sec'] ?? 7200);

// Nicht eingeloggt oder untätig → raus
if (empty($_SESSION['jsc_admin']) || (time() - (int) ($_SESSION['idle'] ?? 0)) > $idleSec) {
    $_SESSION = [];
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
    header('Location: index.php');
    exit;
}
$_SESSION['idle'] = time();

$data = [];
$loesungenPath = __DIR__ . '/data/loesungen.php';
if (is_readable($loesungenPath)) {
    $loaded = require $loesungenPath;
    $data = is_array($loaded) ? $loaded : [];
}
$labs = $data['labs'] ?? [];
$projekte = $data['projekte'] ?? [];
$abschluss = $data['abschluss'] ?? [];
$raster = is_array($abschluss) ? ($abschluss['raster'] ?? []) : [];

$h = static function ($s): string {
    return htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
};

// Mehrere Dateien zu EINEM Code-Block mit =====-Trennern verbinden (Copy-Button greift erstes pre code)
$joinFiles = static function (array $files): string {
    $out = '';
    foreach ($files as $name => $inhalt) {
        $out .= '===== ' . $name . " =====\n" . rtrim((string) $inhalt, "\n") . "\n\n";
    }
    return rtrim($out, "\n");
};
?>
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Musterlösungen · JavaScript V2 (PLU)</title>
    <link rel="stylesheet" href="admin.css" />
    <script src="admin.js" defer></script>
  </head>
  <body>
    <main class="wrap">
      <header class="top">
        <h1>Musterlösungen · JavaScript V2</h1>
        <p class="meta">
          Eingeloggt als Lehrkraft. <a href="logout.php">Abmelden</a>
        </p>
      </header>

      <?php if (!$labs && !$projekte && !$abschluss): ?>
        <p class="notice">Lösungen sind noch nicht hinterlegt.</p>
      <?php else: ?>

        <?php if ($labs): ?>
          <h2 class="gruppe">Labs 01–12</h2>
          <?php foreach ($labs as $lab): ?>
            <?php if (!is_array($lab)) { continue; } ?>
            <details class="lab">
              <summary>
                <?= $h($lab['title'] ?? 'Lab') ?>
                <span><?= $h($lab['folder'] ?? '') ?></span>
              </summary>
              <pre><code><?= $h($joinFiles($lab['files'] ?? [])) ?></code></pre>
              <button type="button" class="copy" data-copy>Kopieren</button>
            </details>
          <?php endforeach; ?>
        <?php endif; ?>

        <?php if ($projekte): ?>
          <h2 class="gruppe">Projekte 1–3</h2>
          <?php foreach ($projekte as $projekt): ?>
            <?php if (!is_array($projekt)) { continue; } ?>
            <details class="lab">
              <summary>
                <?= $h($projekt['title'] ?? 'Projekt') ?>
                <span><?= $h($projekt['file'] ?? '') ?></span>
              </summary>
              <pre><code><?= $h(rtrim((string) ($projekt['code'] ?? ''), "\n")) ?></code></pre>
              <button type="button" class="copy" data-copy>Kopieren</button>
            </details>
          <?php endforeach; ?>
        <?php endif; ?>

        <?php if ($abschluss): ?>
          <h2 class="gruppe">Abschlussprojekt</h2>

          <?php if (!empty($abschluss['raster_intro']) || $raster): ?>
            <details class="lab" open>
              <summary>
                Bewertungsraster · Fachgespräch
                <span>alle drei Projektoptionen</span>
              </summary>
              <?php if (!empty($abschluss['raster_intro'])): ?>
                <p class="raster-intro"><?= nl2br($h($abschluss['raster_intro'])) ?></p>
              <?php endif; ?>
              <?php if ($raster): ?>
                <div class="raster-scroll">
                  <table class="raster">
                    <thead>
                      <tr>
                        <th scope="col">Kriterium</th>
                        <th scope="col">Erfüllt</th>
                        <th scope="col">Teilweise</th>
                        <th scope="col">Nicht erfüllt</th>
                      </tr>
                    </thead>
                    <tbody>
                      <?php foreach ($raster as $zeile): ?>
                        <?php if (!is_array($zeile)) { continue; } ?>
                        <tr>
                          <td>
                            <strong><?= $h($zeile['kriterium'] ?? '') ?></strong><br />
                            <span class="raster-desc"><?= $h($zeile['beschreibung'] ?? '') ?></span>
                          </td>
                          <td><?= $h($zeile['erfuellt'] ?? '') ?></td>
                          <td><?= $h($zeile['teilweise'] ?? '') ?></td>
                          <td><?= $h($zeile['nicht'] ?? '') ?></td>
                        </tr>
                      <?php endforeach; ?>
                    </tbody>
                  </table>
                </div>
              <?php endif; ?>
            </details>
          <?php endif; ?>

          <?php if (!empty($abschluss['muster']) && is_array($abschluss['muster'])): ?>
            <details class="lab">
              <summary>
                <?= $h($abschluss['muster']['title'] ?? 'Musterbeispiel') ?>
                <span><?= $h($abschluss['muster']['folder'] ?? '') ?></span>
              </summary>
              <pre><code><?= $h($joinFiles($abschluss['muster']['files'] ?? [])) ?></code></pre>
              <button type="button" class="copy" data-copy>Kopieren</button>
            </details>
          <?php endif; ?>
        <?php endif; ?>

      <?php endif; ?>
    </main>
  </body>
</html>
