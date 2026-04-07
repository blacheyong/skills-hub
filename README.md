# Skills Hub

Plateforme interne de skills Claude Code pour l'equipe Blache Yong.

Le hub affiche automatiquement les skills depuis le repo [skills-library](https://github.com/blacheyong/skills-library).

---

## Lancer en local

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

---

## Ajouter un skill

### Option 1 : Avec Claude Code (recommande)

Installe le skill "add-skill" dans Claude Code :

```bash
curl -sL https://raw.githubusercontent.com/blacheyong/skills-library/main/skills/add-skill.md -o ~/.claude/commands/add-skill.md
```

Ensuite, dis simplement a Claude :
- *"Ajoute ce skill dans Design UI"* + colle le contenu
- *"Va chercher ce skill : [lien web]"*
- *"Cree un skill a partir de cette page : [url]"*

Claude va le formater et le push automatiquement.

### Option 2 : Manuellement sur GitHub

1. Va dans le repo [skills-library](https://github.com/blacheyong/skills-library)
2. Cree un fichier `.md` dans le bon dossier (`metiers/` ou `projects/`)
3. Ajoute le frontmatter requis (name, description, tags, author, date, color)
4. Commit sur main — le skill apparait automatiquement sur le hub

---

## Architecture

- **skills-hub** (ce repo) — App Next.js qui affiche les skills
- **[skills-library](https://github.com/blacheyong/skills-library)** — Fichiers `.md` des skills

L'app fetch les skills depuis l'API GitHub du repo skills-library.

---

## Stack

- Next.js 16 + React 19
- Tailwind CSS 4
- GSAP (animations)
- TypeScript
