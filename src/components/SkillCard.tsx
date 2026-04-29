'use client';

import Link from 'next/link';
import { Check } from 'lucide-react';
import type { Skill } from '@/lib/types';

interface SkillCardProps {
  skill: Skill;
  href: string;
  selectable?: boolean;
  selected?: boolean;
  onToggleSelect?: (slug: string) => void;
}

export function SkillCard({
  skill,
  href,
  selectable = false,
  selected = false,
  onToggleSelect,
}: SkillCardProps) {
  const handleCheckboxClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onToggleSelect?.(skill.slug);
  };

  return (
    <Link
      href={href}
      className="flex flex-col gap-3 bg-white p-4 outline-none no-underline"
      style={{
        position: 'relative',
        borderRadius: 12,
        boxShadow: 'var(--card-shadow)',
        outline: selected ? '2px solid #2e2e30' : 'none',
        outlineOffset: '-2px',
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        textDecoration: 'none',
        color: 'inherit',
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
      {selectable && (
        <button
          type="button"
          onClick={handleCheckboxClick}
          aria-label={selected ? 'Désélectionner' : 'Sélectionner'}
          aria-pressed={selected}
          style={{
            position: 'absolute',
            top: 10,
            right: 10,
            width: 20,
            height: 20,
            borderRadius: 5,
            border: selected ? '1px solid #2e2e30' : '1px solid rgba(0,0,0,0.18)',
            background: selected ? '#2e2e30' : '#fff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.15s',
            padding: 0,
            zIndex: 2,
          }}
        >
          {selected && <Check size={12} strokeWidth={3} color="#fff" />}
        </button>
      )}

      <span
        style={{
          fontSize: 14,
          fontWeight: 560,
          color: '#2e2e30',
          letterSpacing: '-0.01em',
          paddingRight: selectable ? 28 : 0,
        }}
      >
        {skill.name}
      </span>

      <p className="line-clamp-2" style={{ fontSize: 13, lineHeight: 1.45, color: '#8a8a8f', margin: 0 }}>
        {skill.description}
      </p>

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

      <div className="mt-auto flex items-center justify-between pt-1" style={{ fontSize: 11, color: '#b8b8bc' }}>
        <span>{skill.author}</span>
        <span>{skill.date}</span>
      </div>
    </Link>
  );
}

export default SkillCard;
