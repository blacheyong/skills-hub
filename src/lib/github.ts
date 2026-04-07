import type { Skill, Folder } from '@/lib/types';

const REPO_OWNER = 'blacheyong';
const REPO_NAME = 'skills-library';
const BRANCH = 'main';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || '';

function ghHeaders(): Record<string, string> {
  const h: Record<string, string> = { 'Accept': 'application/vnd.github.v3+json' };
  if (GITHUB_TOKEN) h['Authorization'] = `Bearer ${GITHUB_TOKEN}`;
  return h;
}

// Display name mapping — auto-generated from slug if not found
function displayName(slug: string): string {
  const map: Record<string, string> = {
    'design-ui': 'Design UI',
    'ux-research': 'UX Research',
    'data-analytics': 'Data Analytics',
  };
  return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}

// Strip surrounding quotes from a string
function stripQuotes(s: string): string {
  if ((s.startsWith('"') && s.endsWith('"')) || (s.startsWith("'") && s.endsWith("'"))) {
    return s.slice(1, -1);
  }
  return s;
}

// Parse frontmatter from .md content
function parseFrontmatter(content: string): { meta: Record<string, string | string[]>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta: Record<string, string | string[]> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    const value = line.slice(colonIdx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value.slice(1, -1).split(',').map(s => stripQuotes(s.trim()));
    } else {
      meta[key] = stripQuotes(value);
    }
  }
  return { meta, body: match[2].trim() };
}

export async function fetchSkillsFromGitHub(): Promise<{ skills: Skill[]; folders: Folder[] }> {
  const skills: Skill[] = [];
  const folderMap = new Map<string, { type: 'metiers' | 'projects'; skills: number; color: string }>();

  try {
    const treeRes = await fetch(`${API_BASE}/git/trees/${BRANCH}?recursive=1`, {
      headers: ghHeaders(),
      next: { revalidate: 60 },
    });

    if (!treeRes.ok) throw new Error(`GitHub API error: ${treeRes.status}`);

    const tree = await treeRes.json();

    const subFolders = tree.tree.filter((f: { path: string; type: string }) =>
      f.type === 'tree' &&
      (f.path.startsWith('metiers/') || f.path.startsWith('projects/')) &&
      f.path.split('/').length === 2
    );

    for (const sf of subFolders) {
      const parts = sf.path.split('/');
      const category = parts[0] as 'metiers' | 'projects';
      const slug = parts[1];
      if (!folderMap.has(slug)) {
        folderMap.set(slug, { type: category, skills: 0, color: 'blue' });
      }
    }

    const mdFiles = tree.tree.filter((f: { path: string; type: string }) =>
      f.type === 'blob' &&
      f.path.endsWith('.md') &&
      (f.path.startsWith('metiers/') || f.path.startsWith('projects/')) &&
      f.path.split('/').length === 3
    );

    const fetchPromises = mdFiles.map(async (file: { path: string; sha: string }) => {
      const parts = file.path.split('/');
      const category = parts[0] as 'metiers' | 'projects';
      const folder = parts[1];
      const slug = parts[2].replace('.md', '');

      try {
        const contentRes = await fetch(`${API_BASE}/contents/${file.path}?ref=${BRANCH}`, {
          headers: ghHeaders(),
          next: { revalidate: 60 },
        });

        if (!contentRes.ok) return null;

        const data = await contentRes.json();
        const rawContent = atob(data.content.replace(/\n/g, ''));
        const decoded = new TextDecoder().decode(
          Uint8Array.from(rawContent, c => c.charCodeAt(0))
        );
        const { meta, body } = parseFrontmatter(decoded);

        const skill: Skill = {
          slug,
          name: (meta.name as string) || slug,
          description: (meta.description as string) || '',
          tags: Array.isArray(meta.tags) ? meta.tags : [],
          author: (meta.author as string) || 'Inconnu',
          date: (meta.date as string) || '',
          color: (meta.color as string) || 'blue',
          content: body,
          category,
          folder,
          source_url: (meta.source_url as string) || undefined,
        };

        if (!folderMap.has(folder)) {
          folderMap.set(folder, { type: category, skills: 0, color: skill.color });
        }
        folderMap.get(folder)!.skills++;

        return skill;
      } catch {
        return null;
      }
    });

    const results = await Promise.all(fetchPromises);
    skills.push(...results.filter((s): s is Skill => s !== null));
  } catch (error) {
    console.error('Failed to fetch skills from GitHub:', error);
  }

  const folderEntries = Array.from(folderMap.entries());
  folderEntries.sort((a, b) => {
    if (a[1].type !== b[1].type) return a[1].type === 'metiers' ? -1 : 1;
    return a[0].localeCompare(b[0]);
  });

  const folders: Folder[] = folderEntries.map(([slug, data], index) => ({
    slug,
    name: displayName(slug),
    skillCount: data.skills,
    type: data.type,
    color: data.color,
    folderIndex: index,
  }));

  return { skills, folders };
}
