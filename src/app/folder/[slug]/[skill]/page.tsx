"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ExternalLink } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { CopyButton } from "@/components/CopyButton";
import { logout } from "@/lib/auth";
import { loadData } from "@/lib/store";
import type { Skill, Folder } from "@/lib/types";
import { useState, useEffect } from "react";

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

export default function SkillDetailPage() {
  const params = useParams<{ slug: string; skill: string }>();
  const router = useRouter();
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
  };

  useEffect(() => {
    loadData().then(({ skills, folders }) => {
      setAllSkills(skills);
      setAllFolders(folders);
    });
  }, []);

  const folderSlug = params.slug;
  const skillSlug = params.skill;

  const folder = allFolders.find((f) => f.slug === folderSlug);
  const skill = allSkills.find((s) => s.folder === folderSlug && s.slug === skillSlug);

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
          onFolderClick={(s) => router.push(`/folder/${s}`)}
          onLogout={handleLogout}
        />
        <main
          style={{
            marginLeft: 240,
            padding: "28px 40px",
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

  const installCommand = `curl -sL https://raw.githubusercontent.com/guillonl/skills-library/main/${skill.category}/${folderSlug}/${skill.slug}.md -o ~/.claude/skills/${skill.slug}.md`;
  const repoUrl = `https://github.com/guillonl/skills-library/blob/main/${skill.category}/${folderSlug}/${skill.slug}.md`;
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
        onFolderClick={(s) => router.push(`/folder/${s}`)}
        onLogout={handleLogout}
      />

      <main
        style={{
          marginLeft: 240,
          padding: "28px 40px",
          flex: 1,
          minWidth: 0,
        }}
      >
        {/* Breadcrumb — stays left-aligned */}
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
              style={{
                color: "#999",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#999";
              }}
            >
              Home
            </Link>
            <span style={{ color: "#ddd" }}>/</span>
            <Link
              href={`/folder/${folderSlug}`}
              style={{
                color: "#999",
                textDecoration: "none",
                transition: "color 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = "#1a1a1a";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = "#999";
              }}
            >
              {folder.name}
            </Link>
            <span style={{ color: "#ddd" }}>/</span>
            <span style={{ color: "#666" }}>{skill.name}</span>
        </nav>

        {/* Centered content area */}
        <div style={{ maxWidth: 680, margin: "0 auto" }}>
          {/* Title row: title + GitHub link */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              gap: 16,
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
            <a
              href={externalUrl || repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 6,
                padding: "6px 14px",
                background: "#2e2e30",
                color: "#fff",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                textDecoration: "none",
                whiteSpace: "nowrap",
                flexShrink: 0,
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "#444";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "#2e2e30";
              }}
            >
              <ExternalLink size={14} />
              {externalUrl ? "Voir la source" : "Voir sur GitHub"}
            </a>
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 6,
              marginBottom: 16,
            }}
          >
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

          {/* Meta info */}
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
              <span style={{ color: "#666", fontWeight: 500 }}>
                {skill.author}
              </span>
            </span>
            <span style={{ color: "#e0e0e0" }}>|</span>
            <span>{skill.date}</span>
          </div>

          {/* Install command */}
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

          {/* Full content */}
          <div style={{ position: "relative" }}>
            <div
              style={{
                position: "absolute",
                top: 12,
                right: 12,
                zIndex: 2,
              }}
            >
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
