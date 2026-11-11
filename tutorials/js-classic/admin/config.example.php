<?php
// config.php — auf dem Server anlegen (NICHT in Git, siehe DEPLOYMENT.md P12)
// Hash erzeugen: php -r "echo password_hash('DEIN_PASSWORT', PASSWORD_DEFAULT);"
return [
    'user'     => 'lehrer',
    'hash'     => '$2y$10$…HIER_HASH…',
    'idle_sec' => 7200,        // Session läuft nach 2 h Untätigkeit ab
    'lock_min' => 10,          // Sperrzeit nach Fehlversuchen
    'max_fails'=> 5,           // Fehlversuche vor Sperrung
];
