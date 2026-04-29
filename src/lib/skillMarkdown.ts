import type { Skill } from './types';

export function buildSkillMarkdown(skill: Skill): string {
  const fm: string[] = ['---'];
  fm.push(`name: ${skill.name}`);
  fm.push(`description: ${skill.description}`);
  if (skill.tags && skill.tags.length > 0) {
    fm.push(`tags: [${skill.tags.join(', ')}]`);
  }
  if (skill.author) fm.push(`author: ${skill.author}`);
  if (skill.date) fm.push(`date: ${skill.date}`);
  if (skill.color) fm.push(`color: ${skill.color}`);
  fm.push('---', '', skill.content);
  return fm.join('\n');
}
