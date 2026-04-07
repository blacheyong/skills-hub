import type { Skill, Folder } from '@/lib/types';

let cachedSkills: Skill[] | null = null;
let cachedFolders: Folder[] | null = null;
let fetchPromise: Promise<void> | null = null;

export async function loadData(): Promise<{ skills: Skill[]; folders: Folder[] }> {
  if (cachedSkills && cachedFolders) {
    return { skills: cachedSkills, folders: cachedFolders };
  }

  if (!fetchPromise) {
    fetchPromise = fetch('/api/skills')
      .then(async (res) => {
        if (res.status === 401) {
          if (typeof window !== 'undefined') {
            window.location.assign('/login');
          }
          throw new Error('Unauthorized');
        }

        if (!res.ok) {
          throw new Error(`Failed to load skills: ${res.status}`);
        }

        return res.json();
      })
      .then(({ skills, folders }) => {
        cachedSkills = skills;
        cachedFolders = folders;
      })
      .catch((err) => {
        console.error('Failed to load skills:', err);
        cachedSkills = [];
        cachedFolders = [];
      });
  }

  await fetchPromise;
  return { skills: cachedSkills!, folders: cachedFolders! };
}

export function invalidateCache() {
  cachedSkills = null;
  cachedFolders = null;
  fetchPromise = null;
}
