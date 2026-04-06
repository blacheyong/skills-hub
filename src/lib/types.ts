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
}

export interface Folder {
  slug: string;
  name: string;
  skillCount: number;
  type: 'project' | 'metier';
  color: string;
  folderIndex: number;
}

export type MoodPalette = 'default' | 'sunset' | 'ocean' | 'mono';

export const FOLDER_COLORS = ['white', 'blue', 'gold', 'silver', 'mint', 'coral', 'purple', 'teal'] as const;

export const METIER_ICONS: Record<string, string> = {
  'design-ui': 'palette',
  'graphisme': 'pen-tool',
  'ux-research': 'compass',
  'motion': 'clapperboard',
};
