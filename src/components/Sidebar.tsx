'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Search,
  Folder,
  Palette,
  PenTool,
  Compass,
  Clapperboard,
  LogOut,
  Menu,
  X,
  HelpCircle,
  ExternalLink,
} from 'lucide-react';
import type { Folder as FolderType } from '@/lib/types';
import { METIER_ICONS } from '@/lib/types';
import { clickPulse } from '@/lib/animations';
import { useIsMobile } from '@/lib/useIsMobile';
import { HelpModal } from '@/components/HelpModal';
import gsap from 'gsap';

interface SidebarProps {
  folders: FolderType[];
  activeFolder: string | null;
  onFolderClick: (slug: string) => void;
  onLogout?: () => void;
  onHelpClick?: () => void;
}

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

export function Sidebar({ folders, activeFolder, onFolderClick, onLogout, onHelpClick }: SidebarProps) {
  const [searchValue, setSearchValue] = useState('');
  const [mobileOpen, setMobileOpen] = useState(false);
  const [helpOpen, setHelpOpen] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);
  const isMobile = useIsMobile();
  const drawerRef = useRef<HTMLElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  // Cmd+K shortcut to focus search
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchInputRef.current?.focus();
      }
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, []);

  const projectFolders = folders.filter((f) => f.type === 'projects');
  const metierFolders = folders.filter((f) => f.type === 'metiers');

  const filterFolders = (list: FolderType[]) => {
    if (!searchValue.trim()) return list;
    const q = searchValue.toLowerCase();
    return list.filter((f) => f.name.toLowerCase().includes(q));
  };

  const filteredProjects = filterFolders(projectFolders);
  const filteredMetiers = filterFolders(metierFolders);

  // Animate drawer open/close
  useEffect(() => {
    if (!isMobile) return;
    const drawer = drawerRef.current;
    const overlay = overlayRef.current;
    if (!drawer || !overlay) return;

    if (mobileOpen) {
      gsap.to(overlay, { opacity: 1, duration: 0.25, ease: 'power2.out' });
      gsap.to(drawer, { x: 0, duration: 0.3, ease: 'power3.out' });
      overlay.style.pointerEvents = 'auto';
    } else {
      gsap.to(overlay, { opacity: 0, duration: 0.2, ease: 'power2.in' });
      gsap.to(drawer, { x: -260, duration: 0.25, ease: 'power2.in' });
      overlay.style.pointerEvents = 'none';
    }
  }, [mobileOpen, isMobile]);

  const handleFolderClick = (slug: string) => {
    onFolderClick(slug);
    if (isMobile) setMobileOpen(false);
  };

  const sidebarContent = (
    <>
      {/* Mobile close button */}
      {isMobile && (
        <div className="flex items-center justify-between px-3 pt-3 pb-1">
          <span style={{ fontSize: 14, fontWeight: 600, color: '#2e2e30', letterSpacing: '-0.02em' }}>
            Skills Hub
          </span>
          <button
            type="button"
            onClick={() => setMobileOpen(false)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#8a8a8f',
              display: 'flex',
              padding: 4,
              borderRadius: 6,
            }}
          >
            <X size={18} />
          </button>
        </div>
      )}

      {/* Search box */}
      <div className="px-3 pt-3 pb-2">
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
            ref={searchInputRef}
            type="text"
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)}
            placeholder="Rechercher..."
            className="w-full bg-transparent py-[6px] pl-8 pr-10 text-[13px] text-[#2e2e30] placeholder-[#b8b8bc] outline-none"
          />
          {!isMobile && (
            <kbd className="absolute right-2 flex items-center gap-0.5 rounded-[4px] border border-black/[0.06] bg-white/60 px-1.5 py-[1px] text-[10px] font-medium text-[#b8b8bc] pointer-events-none">
              <span className="text-[11px]">&#x2318;</span>K
            </kbd>
          )}
        </div>
      </div>

      {/* Navigation sections */}
      <nav className="flex-1 px-2 py-2 overflow-y-auto">
        {filteredProjects.length > 0 && (
          <div className="mb-3">
            <SectionLabel>Skills Projet</SectionLabel>
            <ul className="flex flex-col gap-px">
              {filteredProjects.map((folder) => (
                <NavItem
                  key={folder.slug}
                  folder={folder}
                  isActive={activeFolder === folder.slug}
                  onClick={() => handleFolderClick(folder.slug)}
                  icon={Folder}
                />
              ))}
            </ul>
          </div>
        )}

        {filteredMetiers.length > 0 && (
          <div className="mb-3">
            <SectionLabel>Skills M&eacute;tier</SectionLabel>
            <ul className="flex flex-col gap-px">
              {filteredMetiers.map((folder) => (
                <NavItem
                  key={folder.slug}
                  folder={folder}
                  isActive={activeFolder === folder.slug}
                  onClick={() => handleFolderClick(folder.slug)}
                  icon={getMetierIcon(folder.slug)}
                />
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Bottom */}
      <div className="px-3 pb-4 pt-2" style={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
        <button
          type="button"
          onClick={() => { setHelpOpen(true); if (isMobile) setMobileOpen(false); }}
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium text-[#8a8a8f] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[#2e2e30]"
        >
          <HelpCircle size={15} strokeWidth={1.8} />
          Comment ajouter un skill
        </button>
        <a
          href="https://github.com/blacheyong/skills-library"
          target="_blank"
          rel="noopener noreferrer"
          className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-[13px] font-medium text-[#8a8a8f] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[#2e2e30]"
          style={{ textDecoration: 'none' }}
        >
          <ExternalLink size={15} strokeWidth={1.8} />
          GitHub
        </a>
        <div style={{ height: 1, background: 'rgba(0,0,0,0.04)', margin: '4px 0' }} />
        <button
          type="button"
          onClick={onLogout}
          className="flex w-full items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-[12px] font-medium text-[#b8b8bc] transition-colors duration-150 hover:bg-black/[0.03] hover:text-[#8a8a8f]"
        >
          <LogOut size={14} strokeWidth={1.8} />
          Se déconnecter
        </button>
      </div>
    </>
  );

  // Mobile: hamburger + drawer
  if (isMobile) {
    return (
      <>
        {/* Mobile header bar */}
        <header
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            height: 52,
            background: '#f8f7f7',
            borderBottom: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            padding: '0 16px',
            gap: 12,
            zIndex: 90,
          }}
        >
          <button
            type="button"
            onClick={() => setMobileOpen(true)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#2e2e30',
              display: 'flex',
              padding: 4,
            }}
          >
            <Menu size={22} strokeWidth={1.8} />
          </button>
          <span style={{ fontSize: 15, fontWeight: 600, color: '#2e2e30', letterSpacing: '-0.02em' }}>
            Skills Hub
          </span>
        </header>

        {/* Overlay */}
        <div
          ref={overlayRef}
          onClick={() => setMobileOpen(false)}
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.2)',
            backdropFilter: 'blur(2px)',
            zIndex: 98,
            opacity: 0,
            pointerEvents: 'none',
          }}
        />

        {/* Drawer */}
        <aside
          ref={drawerRef}
          className="fixed left-0 top-0 flex h-full flex-col"
          style={{
            width: 260,
            background: '#f8f7f7',
            zIndex: 99,
            transform: 'translateX(-260px)',
            boxShadow: '4px 0 24px rgba(0,0,0,0.08)',
          }}
        >
          {sidebarContent}
        </aside>

        <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
      </>
    );
  }

  // Desktop: fixed sidebar
  return (
    <>
      <aside
        className="fixed left-0 top-0 flex h-full flex-col overflow-y-auto"
        style={{
          width: 240,
          minWidth: 240,
          background: '#f8f7f7',
          borderRight: '1px solid rgba(0,0,0,0.04)',
        }}
      >
        {sidebarContent}
      </aside>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </>
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
  const btnRef = useRef<HTMLButtonElement>(null);

  const handleClick = () => {
    clickPulse(btnRef.current);
    onClick();
  };

  return (
    <li>
      <button
        ref={btnRef}
        type="button"
        onClick={handleClick}
        className="flex w-full items-center text-left transition-colors duration-150"
        style={{
          gap: 9,
          padding: '6px 8px',
          borderRadius: 6,
          cursor: 'pointer',
          fontSize: 14,
          fontWeight: isActive ? 480 : 440,
          color: isActive ? '#2e2e30' : '#8a8a8f',
          background: isActive ? 'rgba(0,0,0,0.045)' : 'transparent',
        }}
        onMouseEnter={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'rgba(0,0,0,0.03)';
            e.currentTarget.style.color = '#2e2e30';
          }
        }}
        onMouseLeave={(e) => {
          if (!isActive) {
            e.currentTarget.style.background = 'transparent';
            e.currentTarget.style.color = '#8a8a8f';
          }
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
