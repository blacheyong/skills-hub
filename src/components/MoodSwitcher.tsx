'use client';

import { useState } from 'react';
import type { MoodPalette } from '@/lib/types';

const PALETTES: { id: MoodPalette; label: string; gradient: string }[] = [
  { id: 'default', label: 'Original', gradient: 'conic-gradient(from 120deg, #e4e4e9, #8494e2, #f0d060, #5ac488, #e88070)' },
  { id: 'sunset', label: 'Sunset', gradient: 'conic-gradient(from 120deg, #ffb870, #f07888, #ffd470, #ffa8c8)' },
  { id: 'ocean', label: 'Ocean', gradient: 'conic-gradient(from 120deg, #80c0e0, #90d0b8, #a8c0f0, #68c8c0)' },
  { id: 'mono', label: 'Mono', gradient: 'conic-gradient(from 120deg, #d8d8dc, #bbbbc2, #c4c4ca, #e0e0e4)' },
];

interface MoodSwitcherProps {
  mood: MoodPalette;
  onMoodChange: (mood: MoodPalette) => void;
}

export function MoodSwitcher({ mood, onMoodChange }: MoodSwitcherProps) {
  const [hovered, setHovered] = useState<MoodPalette | null>(null);
  const [panelHovered, setPanelHovered] = useState(false);

  const activePalette = PALETTES.find((p) => p.id === mood) || PALETTES[0];
  const expanded = panelHovered;

  return (
    <div
      onMouseEnter={() => setPanelHovered(true)}
      onMouseLeave={() => setPanelHovered(false)}
      style={{
        position: 'fixed',
        right: 16,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 100,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: expanded ? 3 : 0,
        padding: 5,
        background: 'rgba(255,255,255,0.5)',
        backdropFilter: 'blur(20px) saturate(1.4)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.4)',
        border: '1px solid rgba(255,255,255,0.6)',
        borderRadius: 14,
        boxShadow: '0 0 0 0.5px rgba(0,0,0,0.04), 0 2px 8px rgba(0,0,0,0.04), 0 8px 20px rgba(0,0,0,0.03), inset 0 1px 0 rgba(255,255,255,0.7)',
        transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
        cursor: 'pointer',
        overflow: 'hidden',
      }}
    >
      {expanded ? (
        // Expanded: show all palettes
        PALETTES.map((p) => {
          const isActive = mood === p.id;
          const isHovered = hovered === p.id;

          return (
            <button
              key={p.id}
              type="button"
              onClick={() => onMoodChange(p.id)}
              onMouseEnter={() => setHovered(p.id)}
              onMouseLeave={() => setHovered(null)}
              aria-label={`Palette ${p.label}`}
              style={{
                width: 28,
                height: 28,
                borderRadius: 8,
                border: 'none',
                background: 'transparent',
                cursor: 'pointer',
                position: 'relative',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                transition: 'all 0.15s cubic-bezier(0.23, 1, 0.32, 1)',
              }}
            >
              {/* Tooltip */}
              {isHovered && (
                <span
                  style={{
                    position: 'absolute',
                    right: 38,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    background: '#2e2e30',
                    color: '#fff',
                    fontSize: 11,
                    fontWeight: 540,
                    padding: '3px 8px',
                    borderRadius: 6,
                    whiteSpace: 'nowrap',
                    pointerEvents: 'none',
                  }}
                >
                  {p.label}
                </span>
              )}

              {/* Dot */}
              <div
                style={{
                  width: 14,
                  height: 14,
                  borderRadius: '50%',
                  background: p.gradient,
                  boxShadow: isActive
                    ? '0 0 0 2px #fff, 0 0 0 3.5px rgba(0,0,0,0.12)'
                    : '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s cubic-bezier(0.23, 1, 0.32, 1)',
                  transform: isHovered ? 'scale(1.12)' : 'scale(1)',
                }}
              />
            </button>
          );
        })
      ) : (
        // Collapsed: show only active palette dot as a thin vertical pill
        <div
          style={{
            width: 6,
            height: 28,
            borderRadius: 3,
            background: activePalette.gradient,
            transition: 'all 0.25s cubic-bezier(0.23, 1, 0.32, 1)',
          }}
        />
      )}
    </div>
  );
}

export default MoodSwitcher;
