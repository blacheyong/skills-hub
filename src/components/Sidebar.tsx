'use client';

import { useState } from 'react';
import {
  Search,
  Folder,
  Palette,
  PenTool,
  Compass,
  Clapperboard,
  LogOut,
} from 'lucide-react';
import type { Folder as FolderType } from '@/lib/types';
import { METIER_ICONS } from '@/lib/types';

interface SidebarProps {
  folders: FolderType[];
  activeFolder: string | null;
  onFolderClick: (slug: string) => void;
  onLogout?: () => void;
}

/** Maps metier icon name to Lucide component */
const ICON_MAP: Record<string, typeof Palette> = {
  palette: Palette,
  'pen-tool': PenTool,
  compass: Compass,
  clapperboard: Clapperboard,
};

function getMetierIcon(slug: string) {
  const iconName = METIER_ICONS[slug];
  if (iconName && ICON_MAP[iconName]) {
    return ICON_MAP[iconName];
  }
  return Folder;
}

export function Sidebar({ folders, activeFolder, onFolderClick, onLogout }: SidebarProps) {
  const [searchValue, setSearchValue] = useState('');

  const projectFolders = folders.filter((f) => f.type === 'projects');
  const metierFolders = folders.filter((f) => f.type === 'metiers');

  // Filter by search
  const filterFolders = (list: FolderType[]) => {
    if (!searchValue.trim()) return list;
    const q = searchValue.toLowerCase();
    return list.filter((f) => f.name.toLowerCase().includes(q));
  };

  const filteredProjects = filterFolders(projectFolders);
  const filteredMetiers = filterFolders(metierFolders);

  return (
    <aside
      className="fixed left-0 top-0 flex h-full flex-col overflow-y-auto"
      style={{
        width: 240,
        minWidth: 240,
        background: '#f8f7f7',
        borderRight: '1px solid rgba(0,0,0,0.04)',
      }}
    >
      {/* Search box */}
      <div className="px-3 pt-4 pb-2">
        <div
          className="relative flex items-center"
          style={{ background: 'rgba(0,0,0,0.03)', borderRadius: 7 }}
        >
          <Search
            size={14}
            strokeWidth={1.8}
            className="absolute left-2.5 text-[#c2c2c6] pointer-events-none"
          />
          <input
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-transparent py-[6px] pl-8 pr-10 text-[13px] text-[#2e2e30] placeholder-[#b8b8bc] outline-none"
          />
          <kbd className="absolute right-2 flex items-center gap-0.5 rounded-[4px] border border-black/[0.06] bg-white/60 px-1.5 py-[1px] text-[10px] font-medium text-[#b8b8bc] pointer-events-none">
            <span className="text-[11px]">&#x2318;</span>K
          </kbd>
        </div>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 px-2 py-2">
        {/* Skills Projet */}
        {filteredProjects.length > 0 && (
          <div className="mb-3">
            <SectionLabel>Skills Projet</SectionLabel>
            <ul className="flex flex-col gap-px">
              {filteredProjects.map((folder) => (
                <NavItem
                  key={folder.slug}
                  folder={folder}
                  isActive={activeFolder === folder.slug}
                  onClick={() => onFolderClick(folder.slug)}
                  icon={Folder}
                />
              ))}
            </ul>
          </div>
        )}

        {/* Skills Metier */}
        {filteredMetiers.length > 0 && (
          <div className="mb-3">
            <SectionLabel>Skills M&eacute;tier</SectionLabel>
            <ul className="flex flex-col gap-px">
              {filteredMetiers.map((folder) => (
                <NavItem
                  key={folder.slug}
                  folder={folder}
                  isActive={activeFolder === folder.slug}
                  onClick={() => onFolderClick(folder.slug)}
                  icon={getMetierIcon(folder.slug)}
                />
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Bottom: New project button */}
      <div className="px-3 pb-4 pt-2">
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-[#b8b8bc] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[#8a8a8f]"
        >
          <LogOut size={14} strokeWidth={1.8} />
          Se déconnecter
        </button>
      </div>
    </aside>
  );
}

export default Sidebar;

/* ---- Sub-components ---- */

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-2 pb-1.5 pt-2 select-none"
      style={{
        fontSize: 11,
        fontWeight: 500,
        textTransform: 'uppercase',
        letterSpacing: '0.3px',
        color: '#b8b8bc',
      }}
    >
      {children}
    </div>
  );
}

interface NavItemProps {
  folder: FolderType;
  isActive: boolean;
  onClick: () => void;
  icon: typeof Folder;
}

function NavItem({ folder, isActive, onClick, icon: Icon }: NavItemProps) {
  return (
    <li>
      <button
        type="button"
        onClick={onClick}
        className="flex w-full items-center text-left transition-colors duration-150"
        style={{
          gap: 9,
          padding: '6px 8px',
          borderRadius: 6,
          fontSize: 14,
          fontWeight: isActive ? 480 : 440,
          color: isActive ? '#2e2e30' : '#8a8a8f',
          background: isActive ? 'rgba(0,0,0,0.045)' : 'transparent',
        }}
      >
        <Icon
          size={18}
          strokeWidth={1.8}
          className="shrink-0"
          style={{ color: isActive ? '#8a8a8f' : '#c2c2c6' }}
        />
        <span className="flex-1 truncate">{folder.name}</span>
        <span
          className="shrink-0 text-[11px] tabular-nums"
          style={{ color: '#c2c2c6' }}
        >
          {folder.skillCount}
        </span>
      </button>
    </li>
  );
}
