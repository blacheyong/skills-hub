'use client';

import { useState } from 'react';
import { X } from 'lucide-react';

interface NewProjectModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string, color: string) => void;
}

const COLORS = [
  { name: 'Orange', value: 'orange', bg: '#f0a070' },
  { name: 'Bleu', value: 'blue', bg: '#6ea8f0' },
  { name: 'Vert', value: 'green', bg: '#5cc890' },
  { name: 'Teal', value: 'teal', bg: '#58c4b8' },
  { name: 'Violet', value: 'purple', bg: '#a088e8' },
  { name: 'Coral', value: 'coral', bg: '#f08888' },
  { name: 'Or', value: 'gold', bg: '#e8c060' },
  { name: 'Gris', value: 'silver', bg: '#b8b8c0' },
];

export function NewProjectModal({ isOpen, onClose, onSubmit }: NewProjectModalProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState('blue');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      onSubmit(name.trim(), color);
      setName('');
      setColor('blue');
      onClose();
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.2)',
        backdropFilter: 'blur(4px)',
      }}
      onClick={onClose}
    >
      <form
        onSubmit={handleSubmit}
        onClick={(e) => e.stopPropagation()}
        style={{
          background: '#fff',
          borderRadius: 14,
          padding: '24px',
          width: 380,
          boxShadow: '0 8px 32px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
          <h2 style={{ fontSize: 16, fontWeight: 620, color: '#2e2e30', letterSpacing: '-0.02em' }}>
            Nouveau projet
          </h2>
          <button
            type="button"
            onClick={onClose}
            style={{
              border: 'none',
              background: 'rgba(0,0,0,0.04)',
              borderRadius: 6,
              width: 28,
              height: 28,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              color: '#8a8a8f',
            }}
          >
            <X size={14} strokeWidth={2} />
          </button>
        </div>

        <div style={{ marginBottom: 16 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#8a8a8f', marginBottom: 6 }}>
            Nom du projet
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ex: BNC, Vidéotron..."
            autoFocus
            style={{
              width: '100%',
              padding: '8px 12px',
              fontSize: 14,
              borderRadius: 8,
              border: '1px solid rgba(0,0,0,0.08)',
              outline: 'none',
              fontFamily: 'inherit',
              color: '#2e2e30',
              transition: 'border-color 0.15s',
            }}
            onFocus={(e) => { e.currentTarget.style.borderColor = '#5e6ad2'; }}
            onBlur={(e) => { e.currentTarget.style.borderColor = 'rgba(0,0,0,0.08)'; }}
          />
        </div>

        <div style={{ marginBottom: 24 }}>
          <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#8a8a8f', marginBottom: 8 }}>
            Couleur du dossier
          </label>
          <div style={{ display: 'flex', gap: 6 }}>
            {COLORS.map((c) => (
              <button
                key={c.value}
                type="button"
                onClick={() => setColor(c.value)}
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: '50%',
                  border: 'none',
                  background: c.bg,
                  cursor: 'pointer',
                  boxShadow: color === c.value
                    ? `0 0 0 2px #fff, 0 0 0 3.5px ${c.bg}`
                    : '0 1px 3px rgba(0,0,0,0.1)',
                  transition: 'box-shadow 0.15s',
                }}
                title={c.name}
              />
            ))}
          </div>
        </div>

        <button
          type="submit"
          disabled={!name.trim()}
          style={{
            width: '100%',
            padding: '8px 16px',
            fontSize: 14,
            fontWeight: 550,
            borderRadius: 8,
            border: 'none',
            background: name.trim() ? '#2e2e30' : '#e4e4e7',
            color: name.trim() ? '#fff' : '#a0a0a5',
            cursor: name.trim() ? 'pointer' : 'not-allowed',
            fontFamily: 'inherit',
            transition: 'all 0.15s',
          }}
        >
          Créer le projet
        </button>
      </form>
    </div>
  );
}
