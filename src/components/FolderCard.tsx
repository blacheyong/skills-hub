'use client';

import Link from 'next/link';
import type { Folder } from '@/lib/types';

interface FolderCardProps {
  folder: Folder;
  href: string;
}

export function FolderCard({ folder, href }: FolderCardProps) {
  const colorClass = `f${((folder.folderIndex ?? 0) % 8) + 1}`;

  return (
    <Link
      href={href}
      className="group flex flex-col items-center gap-2.5 bg-white p-5 outline-none no-underline"
      style={{
        borderRadius: 12,
        boxShadow: 'var(--card-shadow)',
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
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
      onMouseDown={(e) => {
        e.currentTarget.style.transform = 'scale(0.98)';
      }}
      onMouseUp={(e) => {
        e.currentTarget.style.transform = 'translateY(-2px)';
      }}
    >
      {/* 3D CSS Folder — uses classes from globals.css */}
      <div className={`folder ${colorClass}`}>
        <div className="tab" />
        <div className="back" />
        <div className="front" />
      </div>

      {/* Labels */}
      <div className="flex flex-col items-center gap-0.5">
        <span style={{ fontSize: 14, fontWeight: 560, color: '#2e2e30', letterSpacing: '-0.01em' }}>
          {folder.name}
        </span>
        <span style={{ fontSize: 12, color: '#a0a0a5', fontWeight: 420 }}>
          {folder.skillCount} skill{folder.skillCount !== 1 ? 's' : ''}
        </span>
      </div>
    </Link>
  );
}

export default FolderCard;
