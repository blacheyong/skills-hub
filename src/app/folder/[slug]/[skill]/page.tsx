"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink, Download } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { CopyButton } from "@/components/CopyButton";
import { logout } from "@/lib/auth";
import { useIsMobile } from "@/lib/useIsMobile";
import { buildSkillMarkdown } from "@/lib/skillMarkdown";
import { navigateWithTransition } from "@/lib/navigate";
import { useData } from "@/components/DataProvider";
import { useState, useEffect, useCallback } from "react";

const TAG_COLORS: Record<string, { bg: string; text: string }> = {
  design: { bg: "#f0e6ff", text: "#7c3aed" },
  code: { bg: "#dbeafe", text: "#2563eb" },
  ux: { bg: "#fce7f3", text: "#db2777" },
  motion: { bg: "#fef3c7", text: "#d97706" },
  research: { bg: "#d1fae5", text: "#059669" },
  strategy: { bg: "#fee2e2", text: "#dc2626" },
  default: { bg: "#f3f4f6", text: "#6b7280" },
};

function getTagColor(tag: string) {
  const key = tag.toLowerCase();
  for (const [k, v] of Object.entries(TAG_COLORS)) {
    if (key.includes(k)) return v;
  }
  return TAG_COLORS.default;
}

const btnBase: React.CSSProperties = {
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  padding: "6px 14px",
  borderRadius: 8,
  fontSize: 13,
  fontWeight: 500,
  whiteSpace: "nowrap",
  transition: "background 0.15s",
};

export default function SkillDetailPage() {
  const params = useParams<{ slug: string; skill: string }>();
  const router = useRouter();
  const { skills: allSkills, folders: allFolders, loading } = useData();
  const [installCommand, setInstallCommand] = useState("");
  const isMobile = useIsMobile();

  const folderSlug = params.slug;
  const skillSlug = params.skill;

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  const folder = allFolders.find((f) => f.slug === folderSlug);
  const skill = allSkills.find((s) => s.folder === folderSlug && s.slug === skillSlug);

  useEffect(() => {
    if (!skill) return;
    const controller = new AbortController();
    const path = `${skill.category}/${folderSlug}/${skill.slug}.md`;
    fetch(`/api/install-cmd?path=${encodeURIComponent(path)}`, { signal: controller.signal })
      .then((r) => r.json())
      .then((data) => setInstallCommand(data.cmd || ""))
      .catch((err) => { if (err.name !== "AbortError") throw err; });
    return () => controller.abort();
  }, [skill, folderSlug]);

  const handleDownload = useCallback(() => {
    if (!skill) return;
    const markdown = buildSkillMarkdown(skill);
    const blob = new Blob([markdown], { type: "text/markdown;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${skill.slug}.md`;
    a.click();
    URL.revokeObjectURL(url);
  }, [skill]);

  if (loading) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f8f7f7",
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
        }}
      >
        <Sidebar
          folders={allFolders}
          activeFolder={folderSlug}
          onFolderClick={(s) => navigateWithTransition(router, `/folder/${s}`)}
          activeBundle={null}
          onBundleClick={(s) => navigateWithTransition(router, `/bundle/${s}`)}
          onLogout={handleLogout}
        />
        <main
          style={{
            marginLeft: isMobile ? 0 : 240,
            padding: isMobile ? "68px 16px 16px" : "28px 40px",
            flex: 1,
            minWidth: 0,
          }}
        />
      </div>
    );
  }

  if (!folder || !skill) {
    return (
      <div
        style={{
          display: "flex",
          minHeight: "100vh",
          background: "#f8f7f7",
          fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
        }}
      >
        <Sidebar
          folders={allFolders}
          activeFolder={null}
          onFolderClick={(s) => navigateWithTransition(router, `/folder/${s}`)}
          onLogout={handleLogout}
        />
        <main
          style={{
            marginLeft: isMobile ? 0 : 240,
            padding: isMobile ? "68px 16px 16px" : "28px 40px",
            flex: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div style={{ textAlign: "center" }}>
            <p style={{ fontSize: 16, color: "#666", marginBottom: 16 }}>
              Skill introuvable
            </p>
            <Link
              href="/"
              style={{
                fontSize: 14,
                color: "#1a1a1a",
                textDecoration: "underline",
                textUnderlineOffset: 3,
              }}
            >
              Retour &agrave; l&apos;accueil
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const repoUrl = `https://github.com/blacheyong/skills-library/blob/main/${skill.category}/${folderSlug}/${skill.slug}.md`;
  const externalUrl = skill.source_url || null;

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#f8f7f7",
        fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
      }}
    >
      <Sidebar
        folders={allFolders}
        activeFolder={folderSlug}
        onFolderClick={(s) => navigateWithTransition(router, `/folder/${s}`)}
        activeBundle={null}
        onBundleClick={(s) => navigateWithTransition(router, `/bundle/${s}`)}
        onLogout={handleLogout}
      />

      <main
        style={{
          marginLeft: isMobile ? 0 : 240,
          padding: isMobile ? "68px 16px 16px" : "28px 40px",
          flex: 1,
          minWidth: 0,
          overflowX: "hidden",
        }}
      >
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 28,
            fontSize: 13,
            color: "#999",
          }}
        >
          <Link
            href="/"
            style={{ color: "#999", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#1a1a1a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; }}
          >
            Home
          </Link>
          <span style={{ color: "#ddd" }}>/</span>
          <Link
            href={`/folder/${folderSlug}`}
            style={{ color: "#999", textDecoration: "none", transition: "color 0.15s" }}
            onMouseEnter={(e) => { e.currentTarget.style.color = "#1a1a1a"; }}
            onMouseLeave={(e) => { e.currentTarget.style.color = "#999"; }}
          >
            {folder.name}
          </Link>
          <span style={{ color: "#ddd" }}>/</span>
          <span style={{ color: "#666" }}>{skill.name}</span>
        </nav>

        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          <div
            style={{
              display: "flex",
              flexDirection: isMobile ? "column" : "row",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: isMobile ? 12 : 16,
              marginBottom: 16,
            }}
          >
            <h1
              style={{
                fontSize: 26,
                fontWeight: 650,
                letterSpacing: "-0.03em",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {skill.name}
            </h1>
            <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
              <button
                onClick={handleDownload}
                style={{
                  ...btnBase,
                  background: "transparent",
                  color: "#2e2e30",
                  border: "1px solid rgba(0,0,0,0.14)",
                  cursor: "pointer",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = "#f0f0f0";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.22)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = "transparent";
                  e.currentTarget.style.borderColor = "rgba(0,0,0,0.14)";
                }}
              >
                <Download size={14} />
                Télécharger .md
              </button>
              <a
                href={externalUrl || repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  ...btnBase,
                  background: "#2e2e30",
                  color: "#fff",
                  textDecoration: "none",
                }}
                onMouseEnter={(e) => { e.currentTarget.style.background = "#444"; }}
                onMouseLeave={(e) => { e.currentTarget.style.background = "#2e2e30"; }}
              >
                <ExternalLink size={14} />
                {externalUrl ? "Voir la source" : "Voir sur GitHub"}
              </a>
            </div>
          </div>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginBottom: 16 }}>
            {skill.tags.map((tag) => {
              const color = getTagColor(tag);
              return (
                <span
                  key={tag}
                  style={{
                    display: "inline-block",
                    padding: "3px 10px",
                    borderRadius: 20,
                    fontSize: 12,
                    fontWeight: 500,
                    background: color.bg,
                    color: color.text,
                    letterSpacing: "-0.01em",
                  }}
                >
                  {tag}
                </span>
              );
            })}
          </div>

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 16,
              marginBottom: 28,
              fontSize: 13,
              color: "#999",
            }}
          >
            <span>
              Par{" "}
              <span style={{ color: "#666", fontWeight: 500 }}>{skill.author}</span>
            </span>
            <span style={{ color: "#e0e0e0" }}>|</span>
            <span>{skill.date}</span>
          </div>

          <div
            style={{
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.06)",
              borderRadius: 10,
              padding: "14px 18px",
              marginBottom: 24,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <code
              style={{
                fontSize: 13,
                fontFamily: "monospace",
                color: "#444",
                overflow: "hidden",
                textOverflow: "ellipsis",
                whiteSpace: "nowrap",
                flex: 1,
              }}
            >
              {installCommand}
            </code>
            <CopyButton text={installCommand} />
          </div>

          <div style={{ position: "relative" }}>
            <div style={{ position: "absolute", top: 12, right: 12, zIndex: 2 }}>
              <CopyButton text={skill.content} />
            </div>
            <div
              style={{
                background: "#ffffff",
                border: "1px solid rgba(0,0,0,0.06)",
                borderRadius: 10,
                padding: "28px",
                fontSize: 14,
                lineHeight: 1.75,
                color: "#444",
                whiteSpace: "pre-wrap",
              }}
            >
              {skill.content}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
