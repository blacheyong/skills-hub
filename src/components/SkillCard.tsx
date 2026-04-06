'use client';

import type { ReactNode } from 'react';
import Link from 'next/link';
import type { Skill } from '@/lib/types';

interface SkillCardProps {
  skill: Skill;
  href: string;
  copyButton?: ReactNode;
}

export function SkillCard({ skill, href, copyButton }: SkillCardProps) {
  return (
    <div
      className="group relative flex flex-col gap-3 bg-white p-4 outline-none"
      style={{
        borderRadius: 12,
        boxShadow: 'var(--card-shadow)',
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
        e.currentTarget.style.boxShadow = 'var(--card-shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = 'var(--card-shadow)';
      }}
    >
      {/* Header: name + copy */}
      <div className="flex items-start justify-between gap-2">
        <Link
          href={href}
          style={{ fontSize: 14, fontWeight: 560, color: '#2e2e30', textDecoration: 'none', letterSpacing: '-0.01em' }}
        >
          {skill.name}
        </Link>
        {copyButton && (
          <div className="shrink-0 opacity-0 transition-opacity duration-150 group-hover:opacity-100">
            {copyButton}
          </div>
        )}
      </div>

      {/* Description (2 lines max) */}
      <Link href={href} style={{ textDecoration: 'none' }}>
        <p className="line-clamp-2" style={{ fontSize: 13, lineHeight: 1.45, color: '#8a8a8f' }}>
          {skill.description}
        </p>
      </Link>

      {/* Tags */}
      {skill.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {skill.tags.map((tag) => (
            <span
              key={tag}
              style={{
                display: 'inline-block',
                borderRadius: 999,
                background: 'rgba(0,0,0,0.04)',
                padding: '2px 8px',
                fontSize: 11,
                fontWeight: 500,
                color: '#8a8a8f',
              }}
            >
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Footer: author + date */}
      <div className="mt-auto flex items-center justify-between pt-1" style={{ fontSize: 11, color: '#b8b8bc' }}>
        <span>{skill.author}</span>
        <span>{skill.date}</span>
      </div>
    </div>
  );
}

export default SkillCard;
