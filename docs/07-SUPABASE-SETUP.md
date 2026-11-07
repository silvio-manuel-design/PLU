# Python Quest × Supabase — Schritt-für-Schritt-Anleitung

> **Ziel:** Python Quest von localStorage-only auf Supabase umstellen.  
> **Stack:** Supabase (PostgreSQL + Auth + Realtime) · Vanilla JS · Vite  
> **Priorität:** Schüler-Fortschritt persistent + Lehrer-Dashboard mit Live-Daten

---

## Phase 1: Supabase-Konfiguration (Du machst das)

### Schritt 1.1 — Auth-Provider einrichten

1. In deinem Supabase-Projekt → **Authentication** → **Providers**
2. Aktiviere **Email** (Magic Link / Passwordless)
   - "Confirm email" = **OFF** (Schüler sollen nicht ihre E-Mail bestätigen müssen)
   - "Enable Signup" = **ON**
3. Aktiviere **Anonymous Sign-Ins** (wichtig!)
   - Das ermöglicht Schülern, sofort loszulegen ohne Account
   - Später können sie den Account "claimen" (upgrade auf echten User)

### Schritt 1.2 — Datenbank-Tabellen anlegen

Gehe zu **Table Editor** und lege folgende Tabellen an:

#### Tabelle: `profiles`
```sql
CREATE TABLE profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  display_name TEXT,
  role TEXT CHECK (role IN ('student', 'teacher', 'admin')) DEFAULT 'student',
  class_code TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**RLS Policy:**
```sql
-- Jeder User darf sein eigenes Profil lesen
CREATE POLICY "Users can read own profile" ON profiles
  FOR SELECT USING (auth.uid() = id);

-- Jeder User darf sein eigenes Profil updaten
CREATE POLICY "Users can update own profile" ON profiles
  FOR UPDATE USING (auth.uid() = id);
```

#### Tabelle: `progress`
```sql
CREATE TABLE progress (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  xp INTEGER DEFAULT 0,
  level INTEGER DEFAULT 1,
  completed_quests TEXT[] DEFAULT '{}',
  completed_worlds TEXT[] DEFAULT '{}',
  earned_badges TEXT[] DEFAULT '{}',
  streak_count INTEGER DEFAULT 0,
  streak_last_active DATE,
  streak_freezes_available INTEGER DEFAULT 1,
  streak_freeze_week TEXT,
  stats JSONB DEFAULT '{}',
  current_quest TEXT,
  current_world TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id)
);
```

**RLS Policies:**
```sql
-- User darf eigenen Fortschritt lesen
CREATE POLICY "Users can read own progress" ON progress
  FOR SELECT USING (auth.uid() = user_id);

-- User darf eigenen Fortschritt ändern
CREATE POLICY "Users can update own progress" ON progress
  FOR UPDATE USING (auth.uid() = user_id);

-- User darf eigenen Fortschritt erstellen
CREATE POLICY "Users can insert own progress" ON progress
  FOR INSERT WITH CHECK (auth.uid() = user_id);

-- Lehrer dürfen Fortschritte ihrer Klasse lesen
CREATE POLICY "Teachers can read class progress" ON progress
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'teacher'
      AND p.class_code = (SELECT class_code FROM profiles WHERE id = progress.user_id)
    )
  );
```

#### Tabelle: `reflections`
```sql
CREATE TABLE reflections (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  quest_id TEXT NOT NULL,
  world_id TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(user_id, quest_id)
);
```

**RLS Policies:**
```sql
CREATE POLICY "Users can read own reflections" ON reflections
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own reflections" ON reflections
  FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own reflections" ON reflections
  FOR UPDATE USING (auth.uid() = user_id);

CREATE POLICY "Teachers can read class reflections" ON reflections
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM profiles p
      WHERE p.id = auth.uid() AND p.role = 'teacher'
      AND p.class_code = (SELECT class_code FROM profiles WHERE id = reflections.user_id)
    )
  );
```

#### Tabelle: `classes`
```sql
CREATE TABLE classes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  code TEXT UNIQUE NOT NULL, -- z.B. "HTL-2026-A"
  name TEXT NOT NULL,
  teacher_id UUID REFERENCES auth.users ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);
```

**RLS Policies:**
```sql
CREATE POLICY "Teachers can manage own classes" ON classes
  FOR ALL USING (auth.uid() = teacher_id);

CREATE POLICY "Students can read their class" ON classes
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM profiles WHERE id = auth.uid() AND class_code = classes.code)
  );
```

### Schritt 1.3 — Triggers für updated_at

Für jede Tabelle mit `updated_at`:
```sql
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_progress_updated_at
  BEFORE UPDATE ON progress
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER update_profiles_updated_at
  BEFORE UPDATE ON profiles
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
```

### Schritt 1.4 — API Keys an mich übergeben

Gehe zu **Project Settings** → **API** und kopiere folgende Werte in eine sichere Nachricht an mich:

| Wert | Wo finde ich es? |
|------|-----------------|
| `SUPABASE_URL` | Project Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Project Settings → API → anon/public |
| `SUPABASE_SERVICE_ROLE_KEY` | Project Settings → API → service_role (⚠️ nur für Server/Edge Functions) |

> **WICHTIG:** Der `service_role_key` hat volle Rechte und umgeht RLS. Gib ihn nur mir, nicht in den Client-Code.

### Schritt 1.5 — CORS & Redirect URLs

1. **Authentication** → **URL Configuration**
   - Site URL: `https://deine-domain.at` (oder `http://localhost:8080` für Dev)
   - Redirect URLs: `https://deine-domain.at/**`, `http://localhost:8080/**`

---

## Phase 2: Was ich implementiere (Code-Änderungen)

### 2.1 — Supabase Client einrichten

Neue Datei: `src/js/modules/supabase-client.js`
```js
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'DEIN_URL';
const SUPABASE_ANON_KEY = 'DEIN_ANON_KEY';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
```

### 2.2 — Auth-System bauen

- Anonymous Sign-In beim ersten Besuch
- Optional: "Name eingeben" + "Klassencode eingeben"
- Upgrade-Pfad: Anonymous → Email/Magic Link

### 2.3 — Progress-System umbauen

`progress.js` bekommt zwei Modi:
- **Offline-Modus:** localStorage (wie jetzt, als Fallback)
- **Online-Modus:** Supabase mit Sync

Jede Änderung wird:
1. Sofort in localStorage gespeichert (offline-resilient)
2. In eine Sync-Queue gepackt
3. Bei Netzwerkkonnektivität an Supabase gesendet

### 2.4 — Teacher Dashboard umstellen

Statt localStorage liest `teacher-dashboard.js` jetzt:
```js
const { data, error } = await supabase
  .from('progress')
  .select('*, profiles(display_name)')
  .eq('profiles.class_code', 'HTL-2026-A');
```

### 2.5 — Realtime-Updates (optional aber cool)

Der Lehrer sieht Live, wie Schüler Quests abschließen:
```js
supabase
  .channel('class-progress')
  .on('postgres_changes', { event: 'UPDATE', schema: 'public', table: 'progress' }, callback)
  .subscribe();
```

---

## Phase 3: Roadmap & Aufwandsschätzung

| Phase | Task | Aufwand |
|-------|------|---------|
| **1** | Supabase-Setup (Du) | 30–45 Min |
| **2** | Supabase Client + Auth | 2–3 Std |
| **3** | Progress-System umbauen | 3–4 Std |
| **4** | Reflections-Sync | 1–2 Std |
| **5** | Teacher Dashboard Supabase | 2–3 Std |
| **6** | Offline-Fallback + Error Handling | 2–3 Std |
| **7** | Testing & Debugging | 2–3 Std |

**Gesamtaufwand:** ca. 12–18 Stunden Entwicklung

---

## Datenschutz-Checkliste (DGSVO-konform)

- [ ] RLS Policies sind aktiv auf **allen** Tabellen
- [ ] Schüler sehen nur ihre eigenen Daten
- [ ] Lehrer sehen nur Daten ihrer Klasse
- [ ] Keine E-Mail-Pflicht (Anonymous Auth)
- [ ] Löschrecht: `ON DELETE CASCADE` bei user_id
- [ ] Keine Tracking-Daten außer Lernfortschritt

---

## Nächster Schritt

Sobald du die Tabellen in Schritt 1.2 angelegt und mir die API Keys aus Schritt 1.4 geschickt hast, starte ich mit der Client-Implementierung (Phase 2).
