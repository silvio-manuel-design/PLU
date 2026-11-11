<?php
// logout.php — Session beenden, zurück zum Login
require __DIR__ . '/auth.php';

$_SESSION = [];
if (session_status() === PHP_SESSION_ACTIVE) {
    session_destroy();
}
header('Location: index.php');
exit;
