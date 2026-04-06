import type { Skill, Folder } from '@/lib/types';
import { fetchSkillsFromGitHub } from '@/lib/github';

// In-memory cache (client-side)
let cachedSkills: Skill[] | null = null;
let cachedFolders: Folder[] | null = null;
let fetchPromise: Promise<void> | null = null;

export async function loadData(): Promise<{ skills: Skill[]; folders: Folder[] }> {
  if (cachedSkills && cachedFolders) {
    return { skills: cachedSkills, folders: cachedFolders };
  }

  if (!fetchPromise) {
    fetchPromise = fetchSkillsFromGitHub().then(({ skills, folders }) => {
      cachedSkills = skills;
      cachedFolders = folders;
    });
  }

  await fetchPromise;
  return { skills: cachedSkills!, folders: cachedFolders! };
}

export function getCachedData(): { skills: Skill[]; folders: Folder[] } | null {
  if (cachedSkills && cachedFolders) {
    return { skills: cachedSkills, folders: cachedFolders };
  }
  return null;
}

export function invalidateCache() {
  cachedSkills = null;
  cachedFolders = null;
  fetchPromise = null;
}
