# 08 — GitHub-Workflow

> **Gültig ab:** Paket P0 (07.11.2026) · **Rollen:** Kimi Work (Konzept/Pakete) · Kimi Code (Code + Git/GitHub) · Martin (Deployment + Freigaben)

---

## 1. Repo-Struktur

Das GitHub-Repo `silvio-manuel-design/PLU` ist das **Mono-Repo** für das gesamte PANTAM Learning Universe. Alle Tutorials (Pansonic Video Lab, KI-Academies, html-css-classic, js-classic, Backend, Grafik, Audio, …) sind **Satelliten im selben Repo** — kein separates Repo pro Tutorial. Die Gesamtarchitektur steht in [`01-ARCHITECTURE.md`](01-ARCHITECTURE.md).

## 2. Branches

| Branch | Zweck |
|--------|-------|
| `main` | Immer deployfähiger Stand. Geschützt: **kein Force-Push**, nur saubere, geprüfte Stände. |
| `feature/pN-kurzname` | Paket-Arbeitsbranches, z. B. `feature/p1-js-classic-setup`. Pro Paket ein Branch. |
| `fix/…` | Hotfixes, die direkt auf `main` zurückfließen. |

Ablauf: Paket wird auf `feature/pN-…` umgesetzt → Abnahme durch Martin → Merge auf `main`. Kimi Code führt Merge und Push aus; Martin deployt vom Server-Stand.

## 3. Commits

- **Conventional Commits:** `feat(…)`, `fix(…)`, `chore(…)`, `docs(…)` — Schema: `type(scope): kurzbeschreibung`.
- **Ein Commit pro Paket** — der PROJEKT-/Doku-Nachtrag gehört zum selben Commit dazu.
- Beispiele: `chore(repo): plu-mono-repo-fresh-start`, `docs(github): workflow-doku-08-angelegt`.

## 4. Rollen

| Rolle | Aufgabe | Repo-Zugriff |
|-------|---------|--------------|
| **Kimi Work** | Konzept, Pakete, Dokumentation | **kein** Repo-Zugriff |
| **Kimi Code** | Code-Umsetzung, Commits, Push, Git/GitHub-Operationen | ja (committet/pusht) |
| **Martin** | Deployment vom Server-Stand, Freigaben, Abnahme | ja (Konto-Eigentümer) |

## 5. Verboten im Repo

- `DEPLOYMENT.md` (Server-Secrets) — liegt **nur lokal**, dauerhaft per `.gitignore` ausgeschlossen.
- `node_modules/`, `dist/` — Build-Artefakte, lokal generiert.
- Große Videos (`*.mp4`, `*.webm`) und Fremd-Software (`*.zip`, `*.exe`) — werden vom Produktiv-Server ausgeliefert.
- Echte E-Mail-Adressen und PayPal-Business-IDs — im Code **immer** den Platzhalter `deine-email@domain.at` verwenden (Server ersetzt ihn beim Deployment).

## 6. Push-Disziplin

1. Vor jedem Push: `git status` **clean**.
2. **Kein Force-Push auf `main`** — niemals (Ausnahme war einmalig Paket P0: Remote-Ersetzung mit ausdrücklicher Freigabe).
3. Keine Secrets, keine persönlichen Daten in Commits — was einmal gepusht ist, ist nachverfolgbar.
4. Nach dem Push: `git ls-remote origin` prüfen, ob `main` den erwarteten Hash trägt.
