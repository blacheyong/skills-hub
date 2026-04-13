export interface Skill {
  slug: string;
  name: string;
  description: string;
  tags: string[];
  author: string;
  date: string;
  color: string;
  content: string;
  category: string;
  folder: string;
  source_url?: string;
}

export interface Folder {
  slug: string;
  name: string;
  skillCount: number;
  type: 'projects' | 'metiers';
  color: string;
  folderIndex: number;
}

export interface Bundle {
  slug: string;
  name: string;
  description: string;
  longDescription: string;
  skills: string[];
  installCommand: string;
  author: string;
  repoUrl: string;
  tags: string[];
  color: string;
}

export type MoodPalette = 'default' | 'sunset' | 'ocean' | 'mono';

export const FOLDER_COLORS = ['white', 'blue', 'gold', 'silver', 'mint', 'coral', 'purple', 'teal'] as const;

export const METIER_ICONS: Record<string, string> = {
  'design-ui': 'palette',
  'graphisme': 'pen-tool',
  'ux-research': 'compass',
  'motion': 'clapperboard',
  'heuristiques': 'search-check',
  'workshops': 'users',
  'data-analytics': 'bar-chart-3',
  'templates': 'file-text',
  'business-analyst': 'briefcase',
};
