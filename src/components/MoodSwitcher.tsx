'use client';

import { useState } from 'react';
import type { MoodPalette } from '@/lib/types';

const PALETTES: { id: MoodPalette; label: string; colors: string[] }[] = [
  {
    id: 'default',
    label: 'Default',
    colors: ['#f97316', '#3b82f6', '#a855f7', '#22c55e'],
  },
  {
    id: 'sunset',
    label: 'Sunset',
    colors: ['#f97316', '#ef4444', '#ec4899', '#f59e0b'],
  },
  {
    id: 'ocean',
    label: 'Ocean',
    colors: ['#0ea5e9', '#3b82f6', '#6366f1', '#14b8a6'],
  },
  {
    id: 'mono',
    label: 'Mono',
    colors: ['#525252', '#737373', '#a3a3a3', '#d4d4d4'],
  },
];

interface MoodSwitcherProps {
  mood: MoodPalette;
  onMoodChange: (mood: MoodPalette) => void;
}

export function MoodSwitcher({ mood, onMoodChange }: MoodSwitcherProps) {
  const [hoveredPalette, setHoveredPalette] = useState<MoodPalette | null>(null);

  return (
    <div
      className="flex items-center gap-2.5 rounded-2xl px-2.5 py-2"
      style={{
        background: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(20px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(20px) saturate(1.6)',
        boxShadow:
          '0 1px 4px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04), inset 0 1px 0 rgba(255,255,255,0.5)',
      }}
    >
      {PALETTES.map((palette) => {
        const isActive = mood === palette.id;
        const isHovered = hoveredPalette === palette.id;

        // Build conic gradient from palette colors
        const conicStops = palette.colors
          .map((color, i) => {
            const startDeg = (i / palette.colors.length) * 360;
            const endDeg = ((i + 1) / palette.colors.length) * 360;
            return `${color} ${startDeg}deg ${endDeg}deg`;
          })
          .join(', ');

        return (
          <div key={palette.id} className="relative">
            {/* Tooltip */}
            {isHovered && (
              <div
                className="absolute bottom-full left-1/2 mb-2 -translate-x-1/2 whitespace-nowrap rounded-md bg-[#2e2e30] px-2.5 py-1 text-[11px] font-medium text-white shadow-lg"
                style={{
                  opacity: 1,
                }}
              >
                {palette.label}
              </div>
            )}

            <button
              type="button"
              onClick={() => onMoodChange(palette.id)}
              onMouseEnter={() => setHoveredPalette(palette.id)}
              onMouseLeave={() => setHoveredPalette(null)}
              className="relative flex items-center justify-center transition-transform duration-150"
              style={{
                width: 24,
                height: 24,
                transitionTimingFunction: 'cubic-bezier(0.23, 1, 0.32, 1)',
              }}
              aria-label={`Palette ${palette.label}`}
            >
              {/* Active ring */}
              {isActive && (
                <div
                  className="absolute inset-[-3px] rounded-full"
                  style={{
                    border: '2px solid white',
                    boxShadow: '0 0 0 1px rgba(0,0,0,0.08)',
                  }}
                />
              )}

              {/* Dot with conic gradient preview */}
              <div
                className="rounded-full"
                style={{
                  width: 16,
                  height: 16,
                  background: `conic-gradient(${conicStops})`,
                  boxShadow: '0 0.5px 2px rgba(0,0,0,0.12)',
                }}
              />
            </button>
          </div>
        );
      })}
    </div>
  );
}

export default MoodSwitcher;
