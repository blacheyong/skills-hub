'use client';

import Link from 'next/link';
import type { Bundle } from '@/lib/types';

interface BundleCardProps {
  bundle: Bundle;
  href: string;
}

export function BundleCard({ bundle, href }: BundleCardProps) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-3 bg-white p-4 outline-none no-underline"
      style={{
        borderRadius: 12,
        boxShadow: 'var(--card-shadow)',
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
      {/* Name */}
      <span style={{ fontSize: 14, fontWeight: 560, color: '#2e2e30', letterSpacing: '-0.01em' }}>
        {bundle.name}
      </span>

      {/* Description (2 lines max) */}
      <p className="line-clamp-2" style={{ fontSize: 13, lineHeight: 1.45, color: '#8a8a8f', margin: 0 }}>
        {bundle.description}
      </p>

      {/* Tags */}
      {bundle.tags.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {bundle.tags.map((tag) => (
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

      {/* Footer: author + skill count */}
      <div className="mt-auto flex items-center justify-between pt-1" style={{ fontSize: 11, color: '#b8b8bc' }}>
        <span>{bundle.author}</span>
        <span>{bundle.skills.length} skills</span>
      </div>
    </Link>
  );
}

export default BundleCard;
