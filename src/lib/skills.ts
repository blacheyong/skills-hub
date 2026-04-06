import { Skill, Folder } from '@/lib/types';

// ---------------------------------------------------------------------------
// Skills data — sourced from skills-library .md files
// ---------------------------------------------------------------------------

const SKILLS: Skill[] = [
  // ===== design-ui (metier) =====
  {
    slug: 'bolder',
    name: 'Bolder',
    description:
      'Amplify safe or boring designs to make them more visually interesting and stimulating',
    tags: ['design', 'visual-impact'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'coral',
    content: `Identify elements that feel timid, generic, or indistinguishable from default component library output. Push visual decisions further: increase size contrasts, use bolder type weights, introduce asymmetry, and add unexpected visual treatments.

Amplify the hero elements — make headlines larger, give CTAs more presence, add depth with layering or shadows. Break out of the grid occasionally to create visual tension and interest.

Maintain usability while increasing impact. Bold design is not loud design — it is confident, intentional, and memorable. Every amplification should serve a purpose: guiding attention, establishing brand voice, or creating emotional resonance.

Validate that boldness does not compromise readability or navigation. Test at multiple viewport sizes to ensure impact scales appropriately.`,
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'colorize',
    name: 'Colorize',
    description:
      'Add strategic color to monochromatic features, making interfaces more engaging',
    tags: ['design', 'color', 'theme'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'purple',
    content: `Analyze the current interface to identify areas that are overly monochromatic, gray, or visually flat. Introduce color strategically — not everywhere, but where it creates meaning, draws attention, or reinforces hierarchy.

Use color to differentiate states (success, warning, error), highlight primary actions, and create visual anchors. Ensure a minimum contrast ratio of 4.5:1 for text and 3:1 for interactive elements per WCAG AA standards.

Build a cohesive palette: one primary, one secondary, and neutrals. Use HSL for fine-tuned adjustments. Apply tints and shades rather than opacity to maintain vibrancy on different backgrounds.

Test color choices against both light and dark modes. Validate with a color blindness simulator to ensure accessibility for deuteranopia, protanopia, and tritanopia users.`,
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'delight',
    name: 'Delight',
    description:
      'Add moments of joy, personality, and unexpected touches that make interfaces memorable',
    tags: ['design', 'ux', 'animation'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'gold',
    content: `Identify moments in the user journey where small, unexpected touches can transform a functional interaction into a memorable one. Focus on transition points: loading states, empty states, success confirmations, and micro-interactions.

Add personality through motion (subtle bounces, smooth reveals), playful copy (witty empty states, encouraging progress messages), and visual surprises (confetti on completion, animated illustrations, Easter eggs for power users).

Keep delight proportional to context. A banking app needs restrained elegance; a creative tool can be more expressive. Never let delight obstruct task completion or slow down repeat users.

Use CSS animations and lightweight JS for effects. Respect prefers-reduced-motion for accessibility. Every delightful moment should feel earned — triggered by user action, not forced upon entry.`,
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'distill',
    name: 'Distill',
    description:
      'Strip designs to their essence by removing unnecessary complexity',
    tags: ['design', 'simplification'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'silver',
    content: `Audit the interface for visual and structural noise. Identify elements that do not directly serve user goals: redundant labels, decorative dividers, excessive iconography, unnecessary card wrappers, and over-nested layouts.

Apply progressive disclosure — show only what is needed at each step. Move secondary actions behind menus or expandable sections. Consolidate related controls and eliminate duplicate pathways to the same outcome.

Simplify does not mean strip bare. Retain visual hierarchy, breathing room, and enough context for users to orient themselves. The goal is clarity, not emptiness.

Test the simplified version against the original with real tasks. If users complete tasks faster with fewer errors, the distillation succeeded. Measure cognitive load reduction, not just element count.`,
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'frontend-design',
    name: 'Frontend Design',
    description:
      'Create distinctive, production-grade frontend interfaces with high design quality',
    tags: ['design', 'frontend', 'ui'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'blue',
    content: `When building frontend interfaces, prioritize visual distinctiveness over generic patterns. Avoid default component library aesthetics — instead, craft layouts with intentional whitespace, bold typographic hierarchy, and cohesive color systems.

Use semantic HTML paired with utility-first CSS (Tailwind preferred). Every component should feel considered: spacing should follow a consistent scale, interactive elements must have clear hover/focus/active states, and transitions should be smooth (200-300ms ease).

Before writing code, assess the design intent: is this a data-heavy dashboard, a marketing page, or an app shell? Each requires different density, rhythm, and visual weight. Adapt accordingly.

Always deliver production-ready code — no placeholder content, no TODO comments, no broken responsive behavior. The output should be deployable as-is.`,
    category: 'metier',
    folder: 'design-ui',
  },

  // ===== graphisme (metier) =====
  {
    slug: 'animate',
    name: 'Animate',
    description:
      'Enhance features with purposeful animations, micro-interactions, and motion effects',
    tags: ['animation', 'motion', 'design'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'blue',
    content: `Review the interface for static transitions that would benefit from motion. Focus on state changes (open/close, show/hide, enter/exit), feedback moments (button presses, form submissions), and spatial navigation (page transitions, drawer slides).

Apply the principle of meaningful motion: every animation must communicate something — direction, hierarchy, causality, or state. Avoid motion for decoration alone. Use easing curves that feel natural (ease-out for entrances, ease-in for exits).

Keep durations between 150-400ms for UI elements. Stagger related elements by 50-100ms for sequential reveals. Use CSS transitions for simple state changes and JavaScript animation libraries (Framer Motion, GSAP) for complex orchestration.

Always implement prefers-reduced-motion media query to disable or simplify animations for users who need it. Test on low-end devices to ensure animations maintain 60fps.`,
    category: 'metier',
    folder: 'graphisme',
  },
  {
    slug: 'arrange',
    name: 'Arrange',
    description:
      'Improve layout, spacing, and visual rhythm for better visual hierarchy',
    tags: ['layout', 'spacing', 'design'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'teal',
    content: `Analyze the current layout for spacing inconsistencies, alignment issues, and weak visual grouping. Apply Gestalt principles: proximity groups related items, alignment creates order, and consistent spacing establishes rhythm.

Use an 8px base grid for all spacing decisions. Define a spacing scale (4, 8, 12, 16, 24, 32, 48, 64, 96) and apply it rigorously. Larger gaps between sections, tighter gaps within groups. White space is not wasted space — it is a structural element.

Fix layout monotony by varying content density across sections. Alternate between full-width, constrained, and multi-column layouts. Use CSS Grid for two-dimensional layouts and Flexbox for one-dimensional alignment.

Validate layout at all breakpoints. Ensure touch targets are minimum 44x44px on mobile. Check that the visual hierarchy guides the eye in the correct reading order (F-pattern for content, Z-pattern for landing pages).`,
    category: 'metier',
    folder: 'graphisme',
  },
  {
    slug: 'typeset',
    name: 'Typeset',
    description:
      'Improves typography by fixing font choices, hierarchy, sizing, weight, and readability',
    tags: ['typography', 'design'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'green',
    content: `Audit the typographic system: check font pairing coherence, size scale consistency, weight distribution, and line-height/letter-spacing values. A well-set interface uses no more than 2-3 font families with a clear purpose for each.

Establish a modular type scale (e.g., 1.25 or 1.333 ratio) and apply it consistently. Headlines should create clear hierarchy — each level must be visually distinct without relying solely on bold weight. Use size, weight, color, and spacing together.

Optimize readability: body text at 16-18px minimum, line-height at 1.5-1.7 for paragraphs, max line length of 65-75 characters. Avoid center-aligned body text and ensure sufficient contrast between text and background.

Verify font loading strategy (font-display: swap), subset fonts for performance, and test rendering across OS/browser combinations. Typography should feel intentional, not incidental.`,
    category: 'metier',
    folder: 'graphisme',
  },

  // ===== ux-research (metier) =====
  {
    slug: 'clarify',
    name: 'Clarify',
    description:
      'Improve unclear UX copy, error messages, microcopy, labels and instructions',
    tags: ['ux', 'copy', 'content'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'blue',
    content: `Audit all user-facing text for clarity, consistency, and helpfulness. Focus on: button labels (use specific verbs over generic ones), form labels (unambiguous field names), error messages (explain what happened and how to fix it), empty states (guide next action), and tooltips (add context without clutter).

Apply the clarity hierarchy: what happened > why it matters > what to do next. Every message should pass the "stranger test" — would someone unfamiliar with the product understand it immediately?

Eliminate jargon, internal terminology, and ambiguous pronouns. Use active voice, present tense, and second person ("You" not "The user"). Keep sentences under 20 words for instructional text.

Maintain a consistent tone across all touchpoints. Create a microcopy style guide if one does not exist: define voice attributes (e.g., helpful, direct, warm), banned words, and patterns for common message types (confirmation, error, loading, success).`,
    category: 'metier',
    folder: 'ux-research',
  },
  {
    slug: 'critique',
    name: 'Critique',
    description:
      'Evaluate design from a UX perspective with quantitative scoring and persona-based testing',
    tags: ['ux', 'review', 'audit'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'purple',
    content: `Conduct a structured UX evaluation across five dimensions: visual hierarchy (clarity of information architecture), cognitive load (complexity vs. user capacity), task efficiency (steps to complete primary goals), emotional resonance (brand alignment and user sentiment), and accessibility compliance (WCAG AA minimum).

Score each dimension on a 1-10 scale with specific justifications. Identify the top 3 strengths and top 3 issues, ranked by user impact severity (P0 critical, P1 high, P2 medium, P3 low).

Run persona-based walkthroughs: simulate a first-time user, a power user, and an accessibility-dependent user navigating the primary flows. Document friction points, confusion moments, and drop-off risks for each persona.

Deliver actionable recommendations with estimated effort (quick win, medium, major refactor) and expected impact. Prioritize fixes that improve task completion rate and reduce user error.`,
    category: 'metier',
    folder: 'ux-research',
  },
  {
    slug: 'onboard',
    name: 'Onboard',
    description:
      'Design and improve onboarding flows, empty states, and first-run experiences',
    tags: ['ux', 'onboarding', 'activation'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'green',
    content: `Map the first-run experience from signup to first value moment. Identify the critical activation metric (first task completed, first content created, first connection made) and design the shortest path to reach it.

Design progressive onboarding: reveal features as users need them, not all at once. Use contextual tooltips, inline guidance, and interactive walkthroughs over passive tutorials. Every onboarding step must deliver immediate value or visible progress.

Craft empty states that inspire action: show what the populated state will look like, provide a clear primary CTA, and offer sample data or templates to reduce the blank-page problem. Never leave a user staring at an empty screen without guidance.

Measure onboarding effectiveness with activation rate (% who reach value moment), time-to-value (duration from signup to activation), and drop-off points (where users abandon the flow). Iterate on the highest-drop-off step first.`,
    category: 'metier',
    folder: 'ux-research',
  },

  // ===== motion (metier) =====
  {
    slug: 'adapt',
    name: 'Adapt',
    description:
      'Adapt designs across screen sizes, devices, and platforms with breakpoints and fluid layouts',
    tags: ['responsive', 'design', 'layout'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'teal',
    content: `Audit the current design for responsive behavior across five breakpoints: mobile (320-480px), tablet portrait (481-768px), tablet landscape (769-1024px), desktop (1025-1440px), and large screens (1441px+). Identify elements that break, overflow, or lose usability at each threshold.

Use fluid design techniques: clamp() for typography and spacing, min()/max() for container widths, and CSS Grid auto-fit/auto-fill for adaptive column layouts. Minimize hard breakpoints by designing fluid-first.

Adapt interaction patterns per device: swipe gestures on touch, hover states on pointer, keyboard navigation on desktop. Ensure touch targets are minimum 44x44px and interactive elements have adequate spacing to prevent accidental taps.

Test on real devices when possible, and use browser device emulation as a baseline. Validate that content reflow preserves reading order, navigation remains accessible, and no horizontal scrolling occurs at any viewport width.`,
    category: 'metier',
    folder: 'motion',
  },
  {
    slug: 'overdrive',
    name: 'Overdrive',
    description:
      'Push interfaces past conventional limits with shaders, spring physics, scroll-driven reveals',
    tags: ['animation', 'advanced', 'performance'],
    author: 'Superpowers',
    date: '2026-03-15',
    color: 'coral',
    content: `Identify opportunities to elevate the interface beyond standard CSS transitions into technically ambitious territory. Consider WebGL shaders for backgrounds and transitions, spring-based physics for natural-feeling interactions, and scroll-driven animations for cinematic storytelling.

Implement scroll-triggered reveals using Intersection Observer or CSS scroll-timeline. Use spring physics (via Framer Motion or React Spring) instead of cubic-bezier for interactions that need organic, responsive feel — especially drag, resize, and gesture-driven UI.

For hero sections and immersive experiences, explore canvas-based effects: particle systems, noise-driven distortions, gradient mesh animations, or 3D transforms with perspective. Use requestAnimationFrame for smooth 60fps rendering.

Performance is non-negotiable: profile GPU usage, avoid layout thrashing, use will-change sparingly, and implement progressive enhancement. Extraordinary experiences must degrade gracefully on lower-end devices and respect prefers-reduced-motion.`,
    category: 'metier',
    folder: 'motion',
  },

  // ===== energir (project) =====
  {
    slug: 'brand-guidelines',
    name: 'Brand Guidelines \u00c9nergir',
    description:
      'Appliquer les guidelines de marque \u00c9nergir dans les interfaces',
    tags: ['brand', 'guidelines', 'energir'],
    author: '\u00c9quipe Design',
    date: '2026-03-15',
    color: 'orange',
    content: `Respecter la charte graphique \u00c9nergir dans toutes les interfaces produites. La palette principale repose sur le orange \u00c9nergir (#F47920) comme couleur d\u2019accent, le bleu fonc\u00e9 (#1A3A5C) pour les \u00e9l\u00e9ments de confiance, et des gris neutres pour le contenu secondaire.

Utiliser la typographie corporative (famille sans-serif) avec une hi\u00e9rarchie claire : titres en bold, sous-titres en medium, corps de texte en regular. Les tailles doivent suivre l\u2019\u00e9chelle d\u00e9finie dans le design system (14, 16, 18, 24, 32, 48px).

Le ton de voix \u00c9nergir est chaleureux, accessible et professionnel. \u00c9viter le jargon technique dans les interfaces client. Privil\u00e9gier les formulations positives et orient\u00e9es vers l\u2019action.

Tous les composants doivent int\u00e9grer le border-radius standard (8px), les ombres l\u00e9g\u00e8res pour la profondeur, et respecter les espacements du grid 8px. Valider la conformit\u00e9 avec l\u2019\u00e9quipe marque avant livraison.`,
    category: 'project',
    folder: 'energir',
  },
  {
    slug: 'design-system',
    name: 'Design System \u00c9nergir',
    description:
      'Composants et tokens du design system \u00c9nergir',
    tags: ['design-system', 'components', 'tokens'],
    author: '\u00c9quipe Design',
    date: '2026-03-15',
    color: 'blue',
    content: `Utiliser les composants standardis\u00e9s du design system \u00c9nergir. Chaque composant poss\u00e8de des variantes document\u00e9es (primary, secondary, ghost, danger) et des tailles pr\u00e9d\u00e9finies (sm, md, lg). Ne jamais cr\u00e9er de composant ad hoc si un \u00e9quivalent existe dans le syst\u00e8me.

Les design tokens sont organis\u00e9s en trois niveaux : primitives (couleurs brutes, tailles), semantiques (couleur-action-primary, spacing-section), et composants (button-padding, card-border-radius). Toujours r\u00e9f\u00e9rencer les tokens s\u00e9mantiques dans le code, jamais les valeurs brutes.

Les composants principaux incluent : Button, Input, Select, Card, Modal, Toast, Table, Badge, Avatar, et Navigation. Chacun supporte les th\u00e8mes clair et sombre, les \u00e9tats interactifs (hover, focus, active, disabled), et les variantes responsive.

Avant d\u2019ajouter un nouveau composant, v\u00e9rifier le registre existant et proposer une extension plut\u00f4t qu\u2019une cr\u00e9ation. Documenter toute nouvelle variante dans Storybook avec des exemples d\u2019utilisation et des guidelines d\u2019accessibilit\u00e9.`,
    category: 'project',
    folder: 'energir',
  },

  // ===== bell (project) =====
  {
    slug: 'accessibility',
    name: 'Accessibilit\u00e9 Bell',
    description:
      'Standards d\u2019accessibilit\u00e9 WCAG pour les interfaces Bell',
    tags: ['a11y', 'wcag', 'bell'],
    author: '\u00c9quipe UX',
    date: '2026-03-15',
    color: 'blue',
    content: `Toutes les interfaces Bell doivent respecter les normes WCAG 2.1 niveau AA minimum. Cela inclut un ratio de contraste de 4.5:1 pour le texte normal et 3:1 pour le texte large (18px+ bold ou 24px+ regular), ainsi que pour les \u00e9l\u00e9ments interactifs.

Chaque \u00e9l\u00e9ment interactif doit \u00eatre navigable au clavier avec un indicateur de focus visible et un ordre de tabulation logique. Les formulaires requi\u00e8rent des labels explicites, des messages d\u2019erreur associ\u00e9s par aria-describedby, et des instructions claires pour chaque champ.

Les images et ic\u00f4nes n\u00e9cessitent un texte alternatif descriptif (alt pour les images informatives, aria-hidden="true" pour les ic\u00f4nes d\u00e9coratives). Les composants dynamiques (modals, accord\u00e9ons, menus) doivent impl\u00e9menter les patterns ARIA correspondants avec gestion correcte du focus trap.

Tester avec un lecteur d\u2019\u00e9cran (VoiceOver sur macOS, NVDA sur Windows) et l\u2019outil axe DevTools avant chaque livraison. Documenter les r\u00e9sultats d\u2019audit dans le rapport d\u2019accessibilit\u00e9 du projet.`,
    category: 'project',
    folder: 'bell',
  },

  // ===== desjardins (project) =====
  {
    slug: 'mobile-patterns',
    name: 'Patterns Mobile Desjardins',
    description:
      'Patterns de navigation et d\u2019interaction mobile pour Desjardins',
    tags: ['mobile', 'patterns', 'desjardins'],
    author: '\u00c9quipe Mobile',
    date: '2026-03-15',
    color: 'green',
    content: `Les interfaces mobiles Desjardins suivent une architecture de navigation par onglets (bottom tab bar) avec un maximum de 5 items. La navigation principale utilise les ic\u00f4nes standardis\u00e9es du design system avec labels textuels toujours visibles \u2014 jamais d\u2019ic\u00f4nes seules.

Les interactions tactiles respectent les zones de confort : boutons principaux en bas de l\u2019\u00e9cran (zone du pouce), actions destructives prot\u00e9g\u00e9es par une confirmation modale, et gestes de swipe uniquement en compl\u00e9ment d\u2019actions visibles (jamais comme seul moyen d\u2019interaction).

Les formulaires mobiles utilisent le clavier appropri\u00e9 par type de champ (num\u00e9rique pour les montants, email pour les adresses), le remplissage automatique quand possible, et la validation en temps r\u00e9el avec messages inline. Les \u00e9tapes longues sont d\u00e9coup\u00e9es en flux multi-\u00e9crans avec indicateur de progression.

Optimiser pour les performances mobiles : lazy loading des images, squelettes de chargement pour les listes, et mise en cache agressive des donn\u00e9es fr\u00e9quemment consult\u00e9es. Tester sur les appareils de r\u00e9f\u00e9rence (iPhone SE, iPhone 15, Samsung Galaxy A54) avec des connexions r\u00e9seau simul\u00e9es (3G, 4G).`,
    category: 'project',
    folder: 'desjardins',
  },

  // ===== hydro-quebec (project) =====
  {
    slug: 'data-viz',
    name: 'Data Visualization HQ',
    description:
      'Guidelines de visualisation de donn\u00e9es pour Hydro-Qu\u00e9bec',
    tags: ['dataviz', 'charts', 'hydro-quebec'],
    author: '\u00c9quipe Data',
    date: '2026-03-15',
    color: 'teal',
    content: `Les visualisations de donn\u00e9es Hydro-Qu\u00e9bec privil\u00e9gient la clart\u00e9 et la pr\u00e9cision. Utiliser des graphiques en barres pour les comparaisons, des courbes pour les tendances temporelles, et des graphiques en aires empil\u00e9es pour les compositions \u00e9volutives. \u00c9viter les camemberts sauf pour 2-3 segments maximum.

La palette de donn\u00e9es suit une progression s\u00e9quentielle du bleu clair au bleu fonc\u00e9 pour les valeurs continues, et une palette cat\u00e9gorielle de 6 couleurs distinctes pour les s\u00e9ries multiples. Chaque couleur doit rester diff\u00e9renciable en niveaux de gris pour l\u2019impression.

Chaque graphique doit inclure : un titre descriptif (pas de titre g\u00e9n\u00e9rique comme "Graphique 1"), des axes clairement labellis\u00e9s avec unit\u00e9s, une l\u00e9gende positionn\u00e9e de mani\u00e8re coh\u00e9rente, et des annotations pour les points de donn\u00e9es remarquables (pics, anomalies, seuils).

Impl\u00e9menter les graphiques avec D3.js ou Recharts selon le contexte technique. Assurer l\u2019accessibilit\u00e9 avec des descriptions textuelles alternatives, la navigation clavier entre les points de donn\u00e9es, et un tableau de donn\u00e9es accessible en alternative au graphique visuel.`,
    category: 'project',
    folder: 'hydro-quebec',
  },
];

// ---------------------------------------------------------------------------
// Folders — derived from skills, with display names and folder indices
// ---------------------------------------------------------------------------

const FOLDER_DISPLAY_NAMES: Record<string, string> = {
  'design-ui': 'Design UI',
  'graphisme': 'Graphisme',
  'ux-research': 'UX Research',
  'motion': 'Motion',
  'energir': '\u00c9nergir',
  'bell': 'Bell',
  'desjardins': 'Desjardins',
  'hydro-quebec': 'Hydro-Qu\u00e9bec',
};

const FOLDER_TYPES: Record<string, 'metier' | 'project'> = {
  'design-ui': 'metier',
  'graphisme': 'metier',
  'ux-research': 'metier',
  'motion': 'metier',
  'energir': 'project',
  'bell': 'project',
  'desjardins': 'project',
  'hydro-quebec': 'project',
};

const FOLDER_ORDER: string[] = [
  'design-ui',
  'graphisme',
  'ux-research',
  'motion',
  'energir',
  'bell',
  'desjardins',
  'hydro-quebec',
];

const FOLDERS: Folder[] = FOLDER_ORDER.map((slug, index) => {
  const skillCount = SKILLS.filter((s) => s.folder === slug).length;
  const firstSkill = SKILLS.find((s) => s.folder === slug);
  return {
    slug,
    name: FOLDER_DISPLAY_NAMES[slug],
    skillCount,
    type: FOLDER_TYPES[slug],
    color: firstSkill?.color ?? 'blue',
    folderIndex: index,
  };
});

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export function getSkills(): Skill[] {
  return SKILLS;
}

export function getFolders(): Folder[] {
  return FOLDERS;
}

export function getSkillsByFolder(slug: string): Skill[] {
  return SKILLS.filter((s) => s.folder === slug);
}

export function getSkillBySlug(
  folder: string,
  skill: string,
): Skill | undefined {
  return SKILLS.find((s) => s.folder === folder && s.slug === skill);
}

export function getFolderBySlug(slug: string): Folder | undefined {
  return FOLDERS.find((f) => f.slug === slug);
}

export function searchSkills(query: string): Skill[] {
  const q = query.toLowerCase().trim();
  if (!q) return SKILLS;
  return SKILLS.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.tags.some((t) => t.toLowerCase().includes(q)) ||
      s.content.toLowerCase().includes(q),
  );
}
