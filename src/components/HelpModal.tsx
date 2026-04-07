'use client';

import { useEffect, useRef, useState } from 'react';
import { HelpCircle, X, Copy, Check } from 'lucide-react';
import gsap from 'gsap';

interface HelpModalProps {
  open: boolean;
  onClose: () => void;
}

const INSTALL_CMD =
  'curl -sL https://raw.githubusercontent.com/guillonl/skills-library/main/skills/add-skill.md -o ~/.claude/commands/add-skill.md';

export function HelpModal({ open, onClose }: HelpModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!open) return;

    const overlay = overlayRef.current;
    const panel = panelRef.current;
    const content = contentRef.current;
    if (!overlay || !panel || !content) return;

    const tl = gsap.timeline();
    tl.fromTo(overlay, { opacity: 0 }, { opacity: 1, duration: 0.25, ease: 'power2.out' });
    tl.fromTo(
      panel,
      { opacity: 0, y: 24, scale: 0.97 },
      { opacity: 1, y: 0, scale: 1, duration: 0.35, ease: 'back.out(1.4)' },
      '-=0.15'
    );
    tl.fromTo(
      content.children,
      { opacity: 0, x: -12 },
      { opacity: 1, x: 0, duration: 0.3, stagger: 0.06, ease: 'power2.out' },
      '-=0.15'
    );

    return () => { tl.kill(); };
  }, [open]);

  const handleClose = () => {
    const overlay = overlayRef.current;
    const panel = panelRef.current;
    if (!overlay || !panel) { onClose(); return; }

    const tl = gsap.timeline({ onComplete: onClose });
    tl.to(panel, { opacity: 0, y: 12, scale: 0.97, duration: 0.2, ease: 'power2.in' });
    tl.to(overlay, { opacity: 0, duration: 0.15 }, '-=0.1');
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(INSTALL_CMD);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (!open) return null;

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === e.currentTarget) handleClose(); }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 1000,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'rgba(0,0,0,0.18)',
        backdropFilter: 'blur(4px)',
      }}
    >
      <div
        ref={panelRef}
        style={{
          width: '100%',
          maxWidth: 520,
          background: '#fff',
          borderRadius: 16,
          boxShadow: '0 24px 48px rgba(0,0,0,0.12), 0 0 0 1px rgba(0,0,0,0.04)',
          padding: '32px',
          position: 'relative',
        }}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={handleClose}
          style={{
            position: 'absolute',
            top: 16,
            right: 16,
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: '#b8b8bc',
            display: 'flex',
            padding: 4,
            borderRadius: 6,
            transition: 'color 0.15s, background 0.15s',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.color = '#666';
            e.currentTarget.style.background = 'rgba(0,0,0,0.04)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.color = '#b8b8bc';
            e.currentTarget.style.background = 'none';
          }}
        >
          <X size={18} />
        </button>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 28 }}>
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #f0edff 0%, #e8e4ff 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <HelpCircle size={18} strokeWidth={2} style={{ color: '#7c6bc4' }} />
          </div>
          <div>
            <h2
              style={{
                fontSize: 17,
                fontWeight: 620,
                letterSpacing: '-0.02em',
                color: '#2e2e30',
                margin: 0,
              }}
            >
              Ajouter un skill
            </h2>
            <p style={{ fontSize: 12, color: '#a0a0a5', margin: 0, marginTop: 2 }}>
              Avec Claude Code (recommande)
            </p>
          </div>
        </div>

        {/* Content */}
        <div ref={contentRef} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {/* Step 1: Install */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 520, color: '#2e2e30', margin: 0, marginBottom: 10 }}>
              Installe le skill &quot;add-skill&quot; dans Claude Code :
            </p>
            <div
              style={{
                background: '#1e1e20',
                borderRadius: 10,
                padding: '14px 16px',
                display: 'flex',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <code
                style={{
                  flex: 1,
                  fontSize: 12,
                  fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, monospace',
                  color: '#e0e0e4',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                  lineHeight: 1.5,
                }}
              >
                {INSTALL_CMD}
              </code>
              <button
                type="button"
                onClick={handleCopy}
                style={{
                  background: 'rgba(255,255,255,0.08)',
                  border: 'none',
                  borderRadius: 6,
                  padding: 6,
                  cursor: 'pointer',
                  color: copied ? '#4ade80' : '#8a8a8f',
                  display: 'flex',
                  flexShrink: 0,
                  transition: 'color 0.15s, background 0.15s',
                }}
                onMouseEnter={(e) => {
                  if (!copied) e.currentTarget.style.background = 'rgba(255,255,255,0.14)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                }}
              >
                {copied ? <Check size={14} /> : <Copy size={14} />}
              </button>
            </div>
          </div>

          {/* Step 2: Prompts */}
          <div>
            <p style={{ fontSize: 14, fontWeight: 520, color: '#2e2e30', margin: 0, marginBottom: 10 }}>
              Ensuite, dis simplement a Claude :
            </p>
            <ul
              style={{
                margin: 0,
                paddingLeft: 20,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              <li style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                <em style={{ color: '#7c6bc4' }}>&quot;Ajoute ce skill dans Design UI&quot;</em> + colle le contenu
              </li>
              <li style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                <em style={{ color: '#7c6bc4' }}>&quot;Va chercher ce skill : [lien web]&quot;</em>
              </li>
              <li style={{ fontSize: 13, color: '#666', lineHeight: 1.5 }}>
                <em style={{ color: '#7c6bc4' }}>&quot;Cree un skill a partir de cette page : [url]&quot;</em>
              </li>
            </ul>
          </div>

          {/* Result */}
          <p style={{ fontSize: 13, color: '#8a8a8f', margin: 0, lineHeight: 1.5 }}>
            Claude va le formater et le push automatiquement.
          </p>
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 24,
            paddingTop: 16,
            borderTop: '1px solid rgba(0,0,0,0.05)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <p style={{ fontSize: 12, color: '#b8b8bc', margin: 0 }}>
            Besoin d&apos;aide ? Demande a Leo
          </p>
          <a
            href="https://github.com/guillonl/skills-library"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontSize: 12,
              fontWeight: 520,
              color: '#7c6bc4',
              textDecoration: 'none',
              transition: 'opacity 0.15s',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.opacity = '0.7'; }}
            onMouseLeave={(e) => { e.currentTarget.style.opacity = '1'; }}
          >
            Voir le repo &rarr;
          </a>
        </div>
      </div>
    </div>
  );
}
