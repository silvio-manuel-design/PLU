<?php
// index.php — Login-Formular + Login-Handler (eine Datei)
require __DIR__ . '/auth.php';

$cfg = jsc_config();
$error = '';

// Bereits eingeloggt → direkt zum Panel
if (!empty($_SESSION['jsc_admin'])) {
    header('Location: panel.php');
    exit;
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (!csrf_check()) {
        $error = 'Sitzung abgelaufen – bitte erneut versuchen.';
    } else {
        $restSec = 0;
        if (jsc_rate_locked($restSec)) {
            $min = max(1, (int) ceil($restSec / 60));
            $error = "Zu viele Fehlversuche. Bitte in {$min} Minuten erneut versuchen.";
        } else {
            $user = (string) ($_POST['user'] ?? '');
            $pw   = (string) ($_POST['pw'] ?? '');
            $okUser = hash_equals((string) ($cfg['user'] ?? ''), $user);
            $okPw   = password_verify($pw, (string) ($cfg['hash'] ?? ''));
            if ($okUser && $okPw) {
                session_regenerate_id(true);
                $_SESSION['jsc_admin'] = true;
                $_SESSION['idle'] = time();
                jsc_rate_clear();
                header('Location: panel.php');
                exit;
            }
            jsc_rate_fail();
            $error = 'Zugang verweigert.';
        }
    }
}

$token = csrf_token();
?>
<!doctype html>
<html lang="de">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="robots" content="noindex, nofollow" />
    <title>Lehrer-Area · js-classic (PLU)</title>
    <link rel="stylesheet" href="admin.css" />
    <script src="admin.js" defer></script>
  </head>
  <body>
    <main class="wrap">
      <h1>PLU Lehrer-Area</h1>
      <?php if ($error !== ''): ?>
        <p class="error" role="alert"><?= htmlspecialchars($error, ENT_QUOTES, 'UTF-8') ?></p>
      <?php endif; ?>
      <form method="post" action="index.php" class="card">
        <label for="user">Benutzername</label>
        <input
          id="user"
          name="user"
          type="text"
          required
          autocomplete="username"
          autocapitalize="none"
          spellcheck="false"
          autofocus
        />
        <label for="pw">Passwort</label>
        <input id="pw" name="pw" type="password" required autocomplete="current-password" />
        <label class="toggle">
          <input type="checkbox" data-pwtoggle="pw" />
          Passwort anzeigen
        </label>
        <button type="submit">Anmelden</button>
        <p class="hint">Zugang nur für Lehrkräfte.</p>
        <input type="hidden" name="csrf" value="<?= htmlspecialchars($token, ENT_QUOTES, 'UTF-8') ?>" />
      </form>
    </main>
  </body>
</html>
