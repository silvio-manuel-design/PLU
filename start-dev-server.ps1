# ============================================================
# PLU Futur II — Local Development Server
# ============================================================
# Root-relative paths (/tutorials/...) require a web server.
# This script starts one automatically on port 8080.
#
# Usage:
#   .\start-dev-server.ps1
#   → Open http://localhost:8080/tutorials/ki-academy-premium/
#
# Press Ctrl+C to stop the server.
# ============================================================

param(
    [int]$Port = 8080
)

$root = Get-Location
Write-Host "`n🚀 Starting PLU development server..." -ForegroundColor Cyan
Write-Host "   Root: $root" -ForegroundColor Gray
Write-Host "   Port: $Port" -ForegroundColor Gray
Write-Host "`n   Academy URL: http://localhost:$Port/tutorials/ki-academy-premium/" -ForegroundColor Green
Write-Host "   Module example: http://localhost:$Port/tutorials/ki-academy-premium/modules/de/00-willkommen/module-00.html" -ForegroundColor Green
Write-Host "`n   Press Ctrl+C to stop.`n" -ForegroundColor Yellow

# Try Python first (most reliable)
$python = Get-Command python -ErrorAction SilentlyContinue
if (-not $python) { $python = Get-Command python3 -ErrorAction SilentlyContinue }

if ($python) {
    & $python.Source -m http.server $Port
    exit
}

# Fallback: Node.js serve
$npx = Get-Command npx -ErrorAction SilentlyContinue
if ($npx) {
    & npx serve . -p $Port --single
    exit
}

# Fallback: PHP built-in server
$php = Get-Command php -ErrorAction SilentlyContinue
if ($php) {
    & php -S "localhost:$Port" -t .
    exit
}

Write-Host "❌ No suitable server found." -ForegroundColor Red
Write-Host "   Please install one of the following:" -ForegroundColor Yellow
Write-Host "   • Python: https://python.org" -ForegroundColor Yellow
Write-Host "   • Node.js: https://nodejs.org (then run: npm i -g serve)" -ForegroundColor Yellow
Write-Host "   • Or use VS Code 'Live Server' extension" -ForegroundColor Yellow
