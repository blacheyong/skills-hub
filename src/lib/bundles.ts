import type { Bundle } from './types';

export const BUNDLES: Bundle[] = [
  {
    slug: 'superpowers',
    name: 'Superpowers',
    description:
      'Framework complet de développement agentique : TDD, debugging systématique, brainstorming et sous-agents autonomes.',
    longDescription: `Superpowers transforme votre agent de code en développeur structuré et méthodique. Au lieu de foncer dans le code, il commence par comprendre ce que vous voulez construire, propose un design, puis exécute méthodiquement avec des sous-agents.

Le workflow complet :
1. Brainstorming — L'agent pose des questions pour comprendre votre besoin, explore les alternatives et propose un design validé avant d'écrire une seule ligne de code.
2. Plan d'implémentation — Découpe le travail en tâches de 2-5 minutes, chacune avec les fichiers exacts, le code complet et les étapes de vérification.
3. Exécution par sous-agents — Chaque tâche est déléguée à un sous-agent frais, avec double review (conformité au spec, puis qualité du code).
4. TDD strict — RED → GREEN → REFACTOR. Le test est écrit avant le code, toujours.
5. Code review automatique — Entre chaque tâche, review contre le plan avec blocage sur les issues critiques.
6. Merge propre — Vérification des tests, options (merge/PR/keep/discard), nettoyage du worktree.

Idéal pour : développement structuré, projets complexes, travail autonome de longue durée (plusieurs heures sans intervention).`,
    skills: [
      'Brainstorming',
      'Test-Driven Development',
      'Systematic Debugging',
      'Writing Plans',
      'Executing Plans',
      'Subagent-Driven Development',
      'Dispatching Parallel Agents',
      'Requesting Code Review',
      'Receiving Code Review',
      'Using Git Worktrees',
      'Finishing a Development Branch',
      'Verification Before Completion',
      'Writing Skills',
      'Using Superpowers',
    ],
    installCommand: '/plugin install superpowers@claude-plugins-official',
    author: 'Superpowers',
    repoUrl: 'https://github.com/obra/superpowers',
    tags: ['workflow', 'tdd', 'debugging', 'collaboration', 'agents'],
    color: 'purple',
  },
];

export function getBundles(): Bundle[] {
  return BUNDLES;
}

export function getBundleBySlug(slug: string): Bundle | undefined {
  return BUNDLES.find((b) => b.slug === slug);
}
