<?php
// auth.php — Shared Bootstrap der PLU js-classic Lehrer-Area (Pilsl-Muster).
// Wird von index.php, panel.php und logout.php jeweils ZUERST eingebunden.

// --- Sicherheitsheader vor jeder Ausgabe (gelten auch, wenn mod_headers fehlt)
header('X-Robots-Tag: noindex, nofollow');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');
header('Referrer-Policy: same-origin');
header("Content-Security-Policy: default-src 'self'; style-src 'self' 'unsafe-inline'; img-src 'self'; script-src 'self'; connect-src 'self'; base-uri 'none'; form-action 'self'; frame-ancestors 'none'");

// --- Session-Härtung (vor session_start)
$https = (!empty($_SERVER['HTTPS']) && $_SERVER['HTTPS'] !== 'off');
ini_set('session.use_strict_mode', '1');
session_set_cookie_params([
    'httponly' => true,
    'samesite' => 'Lax',
    'secure'   => $https, // lokal ohne HTTPS: secure=false (Abweichung im Report)
]);
if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

// --- CSRF (Pilsl-Muster)
function csrf_token(): string
{
    if (empty($_SESSION['csrf'])) {
        $_SESSION['csrf'] = bin2hex(random_bytes(32));
    }
    return $_SESSION['csrf'];
}

function csrf_check(): bool
{
    return isset($_SESSION['csrf'], $_POST['csrf'])
        && hash_equals($_SESSION['csrf'], $_POST['csrf']);
}

// --- Config (config.php liegt NUR auf dem Server, siehe DEPLOYMENT.md P12)
function jsc_config(): array
{
    $path = __DIR__ . '/config.php';
    if (!is_readable($path)) {
        http_response_code(500);
        exit('Konfiguration fehlt (config.php).');
    }
    $cfg = require $path;
    return is_array($cfg) ? $cfg : [];
}

// --- Rate-Limit (Pilsl login-fails.json, hier data/_login_state.json)
// Fail-Open: defekte/nicht lesbare Datei = KEINE Sperre (nur die Bremse fehlt).
define('JSC_LOGIN_STATE', __DIR__ . '/data/_login_state.json');
define('JSC_RATE_WINDOW', 1800); // Fehlversuche zählen innerhalb von 30 Min

function jsc_client_ip(): string
{
    return $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
}

function jsc_rate_state(): array
{
    if (!is_readable(JSC_LOGIN_STATE)) {
        return [];
    }
    $raw = @file_get_contents(JSC_LOGIN_STATE);
    if ($raw === false) {
        return [];
    }
    $state = json_decode($raw, true);
    return is_array($state) ? $state : [];
}

function jsc_rate_save(array $state): void
{
    @file_put_contents(JSC_LOGIN_STATE, json_encode($state, JSON_PRETTY_PRINT));
}

function jsc_rate_maxfails(): int
{
    $cfg = jsc_config();
    return (int) ($cfg['max_fails'] ?? 5);
}

function jsc_rate_locksec(): int
{
    $cfg = jsc_config();
    return (int) ($cfg['lock_min'] ?? 10) * 60;
}

// true = gesperrt; $restSec liefert die Restzeit in Sekunden
function jsc_rate_locked(int &$restSec = null): bool
{
    $state = jsc_rate_state();
    $ip = jsc_client_ip();
    if (isset($state[$ip]['locked_until']) && $state[$ip]['locked_until'] > time()) {
        $restSec = $state[$ip]['locked_until'] - time();
        return true;
    }
    return false;
}

function jsc_rate_fail(): void
{
    $state = jsc_rate_state();
    $ip = jsc_client_ip();
    $now = time();
    $e = $state[$ip] ?? ['first' => $now, 'fails' => 0, 'locked_until' => 0];
    if ($now - (int) $e['first'] > JSC_RATE_WINDOW) {
        $e = ['first' => $now, 'fails' => 0, 'locked_until' => 0];
    }
    $e['fails'] = (int) $e['fails'] + 1;
    if ($e['fails'] >= jsc_rate_maxfails()) {
        $e['locked_until'] = $now + jsc_rate_locksec();
    }
    $state[$ip] = $e;
    jsc_rate_save($state);
}

function jsc_rate_clear(): void
{
    $state = jsc_rate_state();
    unset($state[jsc_client_ip()]);
    jsc_rate_save($state);
}
