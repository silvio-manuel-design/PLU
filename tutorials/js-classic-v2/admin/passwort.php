<?php
// passwort.php — Passwort ändern (P65). Eingeloggt, aktuelles Passwort zwingend,
// schreibt neuen Hash in config.php (var_export + LOCK_EX). Pilsl-Komfort ohne User-Verwaltung.
require __DIR__ . '/auth.php';

$cfg = jsc_config();
$idleSec = (int) ($cfg['idle_sec'] ?? 7200);

// Nicht eingeloggt oder untätig → raus (gleicher Gate wie panel.php)
if (empty($_SESSION['jsc_admin']) || (time() - (int) ($_SESSION['idle'] ?? 0)) > $idleSec) {
    $_SESSION = [];
    if (session_status() === PHP_SESSION_ACTIVE) {
        session_destroy();
    }
    header('Location: index.php');
    exit;
}
$_SESSION['idle'] = time();

$error = '';
$ok = false;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_check()) {
        $error = 'Sitzung abgelaufen – bitte erneut versuchen.';
    } else {
        $aktuell = (string) ($_POST['aktuell'] ?? '');
        $neu     = (string) ($_POST['neu'] ?? '');
        $neu2    = (string) ($_POST['neu2'] ?? '');

        if (!password_verify($aktuell, (string) ($cfg['hash'] ?? ''))) {
            jsc_rate_fail();
            $error = 'Das aktuelle Passwort stimmt nicht.';
        } elseif (strlen($neu) < 8) {
            $error = 'Das neue Passwort braucht mindestens 8 Zeichen.';
        } elseif ($neu !== $neu2) {
            $error = 'Die Wiederholung stimmt nicht überein.';
        } elseif ($neu === $aktuell) {
            $error = 'Das neue Passwort muss sich vom aktuellen unterscheiden.';
        } else {
            $inhalt = "<?php\n"
                . "// config.php — SERVER/LOKAL (gitignored, niemals committen).\n"
                . "// Wird von passwort.php neu geschrieben (P65). Einmalig Initial-Hash manuell setzen.\n"
                . "return " . var_export([
                    'user'      => (string) ($cfg['user'] ?? 'lehrer'),
                    'hash'      => password_hash($neu, PASSWORD_DEFAULT),
                    'idle_sec'  => (int) ($cfg['idle_sec'] ?? 7200),
                    'lock_min'  => (int) ($cfg['lock_min'] ?? 10),
                    'max_fails' => (int) ($cfg['max_fails'] ?? 5),
                ], true) . ";\n";
            if (@file_put_contents(__DIR__ . '/config.php', $inhalt, LOCK_EX) === false) {
                $error = 'Speichern fehlgeschlagen — config.php ist nicht beschreibbar.';
            } else {
                jsc_rate_clear();
                $ok = true;
            }
        }
    }
}

$token = csrf_token();
$h = static fn ($s): string => htmlspecialchars((string) $s, ENT_QUOTES, 'UTF-8');
?>
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Passwort ändern · JavaScript V2 (PLU)</title>
    <link rel="stylesheet" href="admin.css" />
  </head>
  <body>
    <main class="wrap">
      <p><a href="panel.php">← Zurück zu den Musterlösungen</a></p>
      <h1>Passwort ändern</h1>
      <?php if ($error !== ''): ?>
        <p class="error" role="alert"><?= $h($error) ?></p>
      <?php endif; ?>
      <?php if ($ok): ?>
        <p class="notice">Passwort geändert. Es gilt ab sofort für künftige Logins.</p>
      <?php else: ?>
        <form method="post" action="passwort.php" class="card">
          <label for="aktuell">Aktuelles Passwort</label>
          <input id="aktuell" name="aktuell" type="password" required autocomplete="current-password" />
          <label for="neu">Neues Passwort (mindestens 8 Zeichen)</label>
          <input id="neu" name="neu" type="password" required minlength="8" autocomplete="new-password" />
          <label for="neu2">Neues Passwort wiederholen</label>
          <input id="neu2" name="neu2" type="password" required minlength="8" autocomplete="new-password" />
          <button type="submit">Passwort ändern</button>
          <p class="hint">Nach dem Wechsel gilt das neue Passwort sofort — du bleibst eingeloggt.</p>
          <input type="hidden" name="csrf" value="<?= $h($token) ?>" />
        </form>
      <?php endif; ?>
    </main>
  </body>
</html>
