import { Skill, Folder } from './types';

// ---------------------------------------------------------------------------
// Mock data -- will be replaced by GitHub API calls later
// ---------------------------------------------------------------------------

const SKILLS: Skill[] = [
  // ===== design-ui (metier) =====
  {
    slug: 'frontend-design',
    name: 'Frontend Design',
    description:
      'Create distinctive, production-grade frontend interfaces with high design quality. Generates creative, polished code that avoids generic AI aesthetics. Ideal for building web components, pages, and applications with a strong visual identity.',
    tags: ['ui', 'frontend', 'design', 'production'],
    author: 'leo',
    date: '2025-11-15',
    color: 'blue',
    content:
      'Frontend Design transforms AI-generated interfaces from cookie-cutter templates into distinctive, opinionated designs. It enforces a creative brief, applies intentional color palettes, sophisticated typography, and spatial rhythm so every output feels crafted rather than generated.',
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'colorize',
    name: 'Colorize',
    description:
      'Add strategic color to features that are too monochromatic or lack visual interest, making interfaces more engaging and expressive. Turns flat, gray UIs into vibrant, purposeful compositions.',
    tags: ['color', 'palette', 'visual', 'design'],
    author: 'leo',
    date: '2025-12-02',
    color: 'coral',
    content:
      'Colorize analyzes the current color usage of a component or page and injects a harmonious, accessible palette. It considers contrast ratios, semantic meaning, and brand alignment to produce a result that is vivid without being garish.',
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'bolder',
    name: 'Bolder',
    description:
      'Amplify safe or boring designs to make them more visually interesting and stimulating. Increases impact while maintaining usability and good taste.',
    tags: ['bold', 'impact', 'visual', 'design'],
    author: 'leo',
    date: '2025-12-10',
    color: 'purple',
    content:
      'Bolder takes timid layouts -- oversized whitespace, muted colors, uniform type sizes -- and dials up the contrast, scale, and energy. It pushes designs past the "safe default" zone while keeping them functional and readable.',
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'delight',
    name: 'Delight',
    description:
      'Add moments of joy, personality, and unexpected touches that make interfaces memorable and enjoyable to use. Elevates functional UI to delightful experiences.',
    tags: ['animation', 'micro-interaction', 'joy', 'ux'],
    author: 'leo',
    date: '2026-01-05',
    color: 'gold',
    content:
      'Delight sprinkles purposeful animations, playful copy, and micro-interactions throughout an interface. Hover states feel alive, transitions guide the eye, and empty states become moments of personality rather than dead ends.',
    category: 'metier',
    folder: 'design-ui',
  },
  {
    slug: 'distill',
    name: 'Distill',
    description:
      'Strip designs to their essence by removing unnecessary complexity. Great design is simple, powerful, and clean. Reduces noise while preserving meaning.',
    tags: ['simplify', 'minimal', 'clean', 'focus'],
    author: 'leo',
    date: '2026-01-18',
    color: 'silver',
    content:
      'Distill audits every element on screen and asks: does this serve the user goal? Redundant borders, excessive labels, decorative clutter, and over-engineered layouts are removed or consolidated until only the essential remains.',
    category: 'metier',
    folder: 'design-ui',
  },

  // ===== graphisme (metier) =====
  {
    slug: 'typeset',
    name: 'Typeset',
    description:
      'Improve typography by fixing font choices, hierarchy, sizing, weight, and readability so text feels intentional. Makes every line of copy a deliberate design decision.',
    tags: ['typography', 'fonts', 'hierarchy', 'readability'],
    author: 'leo',
    date: '2025-11-20',
    color: 'white',
    content:
      'Typeset evaluates the typographic stack of a page or component: font pairings, size scale, line heights, letter spacing, and weight distribution. It tightens headlines, opens up body text, and ensures a clear visual hierarchy from H1 to caption.',
    category: 'metier',
    folder: 'graphisme',
  },
  {
    slug: 'animate',
    name: 'Animate',
    description:
      'Review a feature and enhance it with purposeful animations, micro-interactions, and motion effects that improve usability and communicate state changes clearly.',
    tags: ['animation', 'motion', 'transitions', 'ux'],
    author: 'leo',
    date: '2025-12-08',
    color: 'mint',
    content:
      'Animate adds CSS and JS-driven motion to static interfaces. Enter/exit transitions, scroll-triggered reveals, loading skeletons, and hover feedback are introduced with consistent easing curves and durations that respect user motion preferences.',
    category: 'metier',
    folder: 'graphisme',
  },
  {
    slug: 'arrange',
    name: 'Arrange',
    description:
      'Improve layout, spacing, and visual rhythm. Fixes monotonous grids, inconsistent spacing, and weak visual hierarchy so every element has a clear place.',
    tags: ['layout', 'spacing', 'grid', 'rhythm'],
    author: 'leo',
    date: '2026-01-12',
    color: 'teal',
    content:
      'Arrange restructures page layouts by applying modular spacing scales, balanced column ratios, and intentional alignment. It breaks up monotonous grids with varied row heights and introduces breathing room where content feels cramped.',
    category: 'metier',
    folder: 'graphisme',
  },

  // ===== ux-research (metier) =====
  {
    slug: 'critique',
    name: 'Critique',
    description:
      'Evaluate design from a UX perspective, assessing visual hierarchy, information architecture, emotional resonance, cognitive load, and overall quality with quantitative scoring.',
    tags: ['ux', 'review', 'scoring', 'feedback'],
    author: 'leo',
    date: '2025-11-25',
    color: 'blue',
    content:
      'Critique runs a multi-lens evaluation: visual hierarchy scoring, cognitive load estimation, Gestalt principle compliance, accessibility audit, and persona-based walkthrough. It produces a numbered scorecard with actionable improvement items ranked by impact.',
    category: 'metier',
    folder: 'ux-research',
  },
  {
    slug: 'clarify',
    name: 'Clarify',
    description:
      'Improve unclear UX copy, error messages, microcopy, labels, and instructions to make interfaces easier to understand and navigate.',
    tags: ['copy', 'microcopy', 'ux-writing', 'clarity'],
    author: 'leo',
    date: '2026-01-08',
    color: 'gold',
    content:
      'Clarify rewrites interface text with the user in mind. Jargon becomes plain language, error messages explain what went wrong and what to do next, button labels describe their outcome, and empty states guide rather than confuse.',
    category: 'metier',
    folder: 'ux-research',
  },
  {
    slug: 'onboard',
    name: 'Onboard',
    description:
      'Design and improve onboarding flows, empty states, and first-run experiences to help users reach value quickly and build lasting engagement.',
    tags: ['onboarding', 'first-run', 'empty-state', 'activation'],
    author: 'leo',
    date: '2026-02-01',
    color: 'mint',
    content:
      'Onboard maps the critical path from sign-up to first success moment. It designs progressive disclosure sequences, contextual tooltips, skeleton previews, and celebratory milestones that reduce time-to-value without overwhelming new users.',
    category: 'metier',
    folder: 'ux-research',
  },

  // ===== motion (metier) =====
  {
    slug: 'overdrive',
    name: 'Overdrive',
    description:
      'Push interfaces past conventional limits with technically ambitious implementations -- shaders, spring physics, scroll-driven reveals, and 60fps animations that create extraordinary experiences.',
    tags: ['animation', 'webgl', 'physics', 'performance'],
    author: 'leo',
    date: '2026-02-10',
    color: 'purple',
    content:
      'Overdrive deploys advanced animation techniques: GPU-accelerated transforms, spring-based motion systems, WebGL shaders, scroll-driven animation timelines, and fluid particle effects. Every animation targets 60fps with graceful fallbacks for low-power devices.',
    category: 'metier',
    folder: 'motion',
  },
  {
    slug: 'adapt',
    name: 'Adapt',
    description:
      'Adapt designs to work across different screen sizes, devices, contexts, or platforms. Implements breakpoints, fluid layouts, and responsive motion.',
    tags: ['responsive', 'mobile', 'breakpoints', 'fluid'],
    author: 'leo',
    date: '2026-02-20',
    color: 'teal',
    content:
      'Adapt transforms fixed-width designs into fluid, responsive layouts. It establishes breakpoint strategies, converts absolute units to relative ones, implements container queries, and ensures touch targets meet mobile accessibility guidelines.',
    category: 'metier',
    folder: 'motion',
  },

  // ===== energir (project) =====
  {
    slug: 'brand-guidelines',
    name: 'Brand Guidelines',
    description:
      'Comprehensive brand identity reference for Energir, including logo usage, color palette, typography rules, tone of voice, and visual language standards.',
    tags: ['brand', 'identity', 'guidelines', 'energir'],
    author: 'leo',
    date: '2025-10-15',
    color: 'blue',
    content:
      'The Energir brand guidelines define the complete visual and verbal identity: primary and secondary color palettes, logo clear-space rules, approved typefaces (headings and body), iconography style, photography direction, and editorial tone. Every deliverable should align with these standards.',
    category: 'project',
    folder: 'energir',
  },
  {
    slug: 'design-system',
    name: 'Design System',
    description:
      'Component library and design token reference for the Energir digital ecosystem. Covers spacing scale, color tokens, component specs, and interaction patterns.',
    tags: ['design-system', 'tokens', 'components', 'energir'],
    author: 'leo',
    date: '2025-11-01',
    color: 'mint',
    content:
      'The Energir design system provides a shared vocabulary of reusable components: buttons, form controls, cards, navigation, modals, and data tables. Each component is documented with usage guidelines, accessibility notes, and responsive behavior specs.',
    category: 'project',
    folder: 'energir',
  },
  {
    slug: 'accessibility',
    name: 'Accessibility',
    description:
      'Accessibility standards and testing protocols specific to Energir projects. Covers WCAG 2.2 AA compliance, screen reader flows, and keyboard navigation patterns.',
    tags: ['a11y', 'wcag', 'accessibility', 'energir'],
    author: 'leo',
    date: '2025-11-10',
    color: 'gold',
    content:
      'This skill documents the accessibility requirements for all Energir digital products. It covers semantic HTML structure, ARIA landmark roles, focus management, color contrast minimums, reduced-motion support, and automated testing with axe-core integration.',
    category: 'project',
    folder: 'energir',
  },

  // ===== bell (project) =====
  {
    slug: 'design-tokens',
    name: 'Design Tokens',
    description:
      'Centralized design token reference for Bell digital products. Maps brand colors, type scale, spacing, and elevation to platform-specific implementations.',
    tags: ['tokens', 'design-system', 'bell'],
    author: 'leo',
    date: '2025-12-01',
    color: 'blue',
    content:
      'Bell design tokens bridge the gap between design and engineering. Tokens are organized in tiers: global primitives (raw values), semantic aliases (purpose-based names), and component-specific overrides. The system supports light/dark modes and high-contrast accessibility themes.',
    category: 'project',
    folder: 'bell',
  },

  // ===== desjardins (project) =====
  {
    slug: 'mobile-patterns',
    name: 'Mobile Patterns',
    description:
      'Mobile-first interaction patterns and navigation standards for Desjardins banking applications. Covers gesture handling, bottom sheets, and secure input flows.',
    tags: ['mobile', 'patterns', 'banking', 'desjardins'],
    author: 'leo',
    date: '2026-01-15',
    color: 'mint',
    content:
      'Desjardins mobile patterns define interaction paradigms for financial apps: secure PIN entry sequences, biometric authentication flows, bottom-sheet navigation, swipe-to-act gestures, and transaction confirmation modals. Each pattern addresses both usability and security requirements.',
    category: 'project',
    folder: 'desjardins',
  },

  // ===== hydro-quebec (project) =====
  {
    slug: 'data-visualization',
    name: 'Data Visualization',
    description:
      'Data visualization standards for Hydro-Quebec energy dashboards. Covers chart types, color encoding, responsive sizing, and accessibility for complex data.',
    tags: ['dataviz', 'charts', 'dashboard', 'hydro-quebec'],
    author: 'leo',
    date: '2026-02-05',
    color: 'teal',
    content:
      'Hydro-Quebec data visualization guidelines specify chart type selection (line for trends, bar for comparisons, area for volume), color encoding rules for energy categories, axis labeling standards, tooltip behavior, and responsive breakpoints that collapse multi-series charts into summary views on mobile.',
    category: 'project',
    folder: 'hydro-quebec',
  },
];

const FOLDERS: Folder[] = [
  // Metiers
  {
    slug: 'design-ui',
    name: 'Design UI',
    skillCount: 5,
    type: 'metier',
    color: 'blue',
    folderIndex: 2,
  },
  {
    slug: 'graphisme',
    name: 'Graphisme',
    skillCount: 3,
    type: 'metier',
    color: 'gold',
    folderIndex: 3,
  },
  {
    slug: 'ux-research',
    name: 'UX Research',
    skillCount: 3,
    type: 'metier',
    color: 'mint',
    folderIndex: 5,
  },
  {
    slug: 'motion',
    name: 'Motion',
    skillCount: 2,
    type: 'metier',
    color: 'purple',
    folderIndex: 7,
  },

  // Projects
  {
    slug: 'energir',
    name: 'Energir',
    skillCount: 3,
    type: 'project',
    color: 'white',
    folderIndex: 1,
  },
  {
    slug: 'bell',
    name: 'Bell',
    skillCount: 1,
    type: 'project',
    color: 'blue',
    folderIndex: 2,
  },
  {
    slug: 'desjardins',
    name: 'Desjardins',
    skillCount: 1,
    type: 'project',
    color: 'silver',
    folderIndex: 4,
  },
  {
    slug: 'hydro-quebec',
    name: 'Hydro-Quebec',
    skillCount: 1,
    type: 'project',
    color: 'teal',
    folderIndex: 8,
  },
];

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

export function getFoldersByType(type: 'project' | 'metier'): Folder[] {
  return FOLDERS.filter((f) => f.type === type);
}
