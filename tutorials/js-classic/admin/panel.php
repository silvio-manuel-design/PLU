<?php
// panel.php — Lösungs-Übersicht (12 Labs, Akkordeons)
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

$loesungen = [];
$loesungenPath = __DIR__ . '/data/loesungen.php';
if (is_readable($loesungenPath)) {
    $data = require $loesungenPath;
    $loesungen = is_array($data) ? $data : [];
}
?>
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Musterlösungen · js-classic (PLU)</title>
    <link rel="stylesheet" href="admin.css" />
    <script src="admin.js" defer></script>
  </head>
  <body>
    <main class="wrap">
      <header class="top">
        <h1>Musterlösungen · JavaScript Classic</h1>
        <p class="meta">
          Eingeloggt als Lehrkraft. <a href="logout.php">Abmelden</a>
        </p>
      </header>
      <?php if (!$loesungen): ?>
        <p class="notice">Lösungen sind noch nicht hinterlegt.</p>
      <?php else: ?>
        <?php foreach ($loesungen as $lab): ?>
          <details class="lab">
            <summary>
              <?= htmlspecialchars((string) $lab['title'], ENT_QUOTES, 'UTF-8') ?>
              <span><?= htmlspecialchars((string) $lab['file'], ENT_QUOTES, 'UTF-8') ?></span>
            </summary>
            <pre><code><?= htmlspecialchars((string) $lab['code'], ENT_QUOTES, 'UTF-8') ?></code></pre>
            <button type="button" class="copy" data-copy>Kopieren</button>
          </details>
        <?php endforeach; ?>
      <?php endif; ?>
    </main>
  </body>
</html>
