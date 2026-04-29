'use client';

import { Download, X } from 'lucide-react';

interface SelectionBarProps {
  count: number;
  allSelected: boolean;
  onSelectAll: () => void;
  onDeselectAll: () => void;
  onDownload: () => void;
  onClear: () => void;
}

export function SelectionBar({
  count,
  allSelected,
  onSelectAll,
  onDeselectAll,
  onDownload,
  onClear,
}: SelectionBarProps) {
  const btnBase: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 6,
    padding: '6px 12px',
    fontSize: 13,
    fontWeight: 500,
    background: 'transparent',
    border: 'none',
    cursor: 'pointer',
    color: '#2e2e30',
    transition: 'background 0.15s',
    height: 34,
    whiteSpace: 'nowrap',
  };
  const divider: React.CSSProperties = {
    width: 1,
    height: 18,
    background: 'rgba(0,0,0,0.08)',
    flexShrink: 0,
  };
  return (
    <div
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        background: '#fff',
        border: '1px solid rgba(0,0,0,0.08)',
        borderRadius: 999,
        boxShadow: '0 1px 2px rgba(0,0,0,0.04)',
        overflow: 'hidden',
        height: 34,
      }}
    >
      <button
        type="button"
        style={btnBase}
        onClick={allSelected ? onDeselectAll : onSelectAll}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        {allSelected ? 'Tout désélectionner' : 'Tout sélectionner'}
      </button>
      <span style={divider} />
      <button
        type="button"
        style={{ ...btnBase, fontWeight: 560 }}
        onClick={onDownload}
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <Download size={13} />
        {count} sélectionné{count > 1 ? 's' : ''}
      </button>
      <span style={divider} />
      <button
        type="button"
        style={{ ...btnBase, padding: '6px 10px' }}
        onClick={onClear}
        aria-label="Annuler la sélection"
        onMouseEnter={(e) => {
          e.currentTarget.style.background = '#f5f5f5';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.background = 'transparent';
        }}
      >
        <X size={14} />
      </button>
    </div>
  );
}

export default SelectionBar;
