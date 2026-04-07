import { NextResponse } from 'next/server';
import type { Skill, Folder } from '@/lib/types';

const REPO_OWNER = 'guillonl';
const REPO_NAME = 'skills-library';
const BRANCH = 'main';
const API_BASE = `https://api.github.com/repos/${REPO_OWNER}/${REPO_NAME}`;

function displayName(slug: string): string {
  const map: Record<string, string> = {
    'design-ui': 'Design UI',
    'ux-research': 'UX Research',
    'hydro-quebec': 'Hydro-Québec',
  };
  return map[slug] || slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
}

function parseFrontmatter(content: string): { meta: Record<string, string | string[]>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { meta: {}, body: content };

  const meta: Record<string, string | string[]> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let value = line.slice(colonIdx + 1).trim();
    if (value.startsWith('[') && value.endsWith(']')) {
      meta[key] = value.slice(1, -1).split(',').map(s => s.trim());
    } else {
      meta[key] = value;
    }
  }
  return { meta, body: match[2].trim() };
}

export async function GET() {
  const skills: Skill[] = [];
  const folderMap = new Map<string, { type: 'metiers' | 'projects'; skills: number; color: string }>();

  try {
    const treeRes = await fetch(`${API_BASE}/git/trees/${BRANCH}?recursive=1`, {
      headers: { 'Accept': 'application/vnd.github.v3+json' },
      next: { revalidate: 120 },
    });

    if (!treeRes.ok) throw new Error(`GitHub API: ${treeRes.status}`);
    const tree = await treeRes.json();

    // Detect all subfolders
    const subFolders = tree.tree.filter((f: { path: string; type: string }) =>
      f.type === 'tree' &&
      (f.path.startsWith('metiers/') || f.path.startsWith('projects/')) &&
      f.path.split('/').length === 2
    );

    for (const sf of subFolders) {
      const [category, slug] = sf.path.split('/');
      if (!folderMap.has(slug)) {
        folderMap.set(slug, { type: category as 'metiers' | 'projects', skills: 0, color: 'blue' });
      }
    }

    // Get .md files
    const mdFiles = tree.tree.filter((f: { path: string; type: string }) =>
      f.type === 'blob' &&
      f.path.endsWith('.md') &&
      (f.path.startsWith('metiers/') || f.path.startsWith('projects/')) &&
      f.path.split('/').length === 3
    );

    // Fetch all file contents in parallel
    const results = await Promise.all(
      mdFiles.map(async (file: { path: string }) => {
        const parts = file.path.split('/');
        const category = parts[0] as 'metiers' | 'projects';
        const folder = parts[1];
        const slug = parts[2].replace('.md', '');

        try {
          const raw = await fetch(
            `https://raw.githubusercontent.com/${REPO_OWNER}/${REPO_NAME}/${BRANCH}/${file.path}`,
            { next: { revalidate: 120 } }
          );
          if (!raw.ok) return null;

          const content = await raw.text();
          const { meta, body } = parseFrontmatter(content);

          return {
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
          } as Skill;
        } catch {
          return null;
        }
      })
    );

    for (const skill of results) {
      if (!skill) continue;
      skills.push(skill);
      if (!folderMap.has(skill.folder)) {
        folderMap.set(skill.folder, { type: skill.category as 'metiers' | 'projects', skills: 0, color: skill.color });
      }
      folderMap.get(skill.folder)!.skills++;
    }
  } catch (error) {
    console.error('GitHub fetch error:', error);
  }

  // Build folders
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

  return NextResponse.json({ skills, folders });
}
