"use client";

import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { CopyButton } from "@/components/CopyButton";
import { MoodSwitcher } from "@/components/MoodSwitcher";
import { getFolders, getSkillBySlug } from "@/lib/skills";
import type { Folder, MoodPalette } from "@/lib/types";
import { useState } from "react";

const allFolders: Folder[] = getFolders();

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
  const [mood, setMood] = useState<MoodPalette>("default");

  const folderSlug = params.slug;
  const skillSlug = params.skill;

  const folder = allFolders.find((f) => f.slug === folderSlug);
  const skill = getSkillBySlug(folderSlug, skillSlug);

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
              Retour à l&apos;accueil
            </Link>
          </div>
        </main>
      </div>
    );
  }

  const installCommand = `claude skill install github.com/guillonl/skills-library/${skill.category}/${folderSlug}/${skill.slug}`;
  const githubUrl = `https://github.com/guillonl/skills-library/tree/main/${skill.category}/${folderSlug}/${skill.slug}`;

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
      />

      <main
        style={{
          marginLeft: 240,
          padding: "28px 40px",
          flex: 1,
          minWidth: 0,
          maxWidth: 800,
        }}
      >
        {/* Breadcrumb */}
        <nav
          style={{
            display: "flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 20,
            fontSize: 13,
            color: "#999",
          }}
        >
          <Link
            href="/"
            style={{
              color: "#999",
              textDecoration: "none",
              transition: "color 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#999";
            }}
          >
            Home
          </Link>
          <span style={{ color: "#ccc" }}>/</span>
          <Link
            href={`/folder/${folderSlug}`}
            style={{
              color: "#999",
              textDecoration: "none",
              transition: "color 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.color = "#999";
            }}
          >
            {folder.name}
          </Link>
          <span style={{ color: "#ccc" }}>/</span>
          <span style={{ color: "#666" }}>{skill.name}</span>
        </nav>

        {/* Back button */}
        <button
          onClick={() => router.push(`/folder/${folderSlug}`)}
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            fontSize: 13,
            color: "#888",
            background: "none",
            border: "none",
            cursor: "pointer",
            padding: 0,
            marginBottom: 24,
            transition: "color 0.15s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#1a1a1a";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#888";
          }}
        >
          <ArrowLeft size={14} />
          Retour au dossier
        </button>

        {/* Title */}
        <h1
          style={{
            fontSize: 26,
            fontWeight: 650,
            letterSpacing: "-0.03em",
            color: "#1a1a1a",
            margin: "0 0 16px 0",
          }}
        >
          {skill.name}
        </h1>

        {/* Tags */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: 6,
            marginBottom: 20,
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
            Par <span style={{ color: "#666", fontWeight: 500 }}>{skill.author}</span>
          </span>
          <span style={{ color: "#e0e0e0" }}>|</span>
          <span>{skill.date}</span>
        </div>

        {/* Install command */}
        <div
          style={{
            background: "#ffffff",
            border: "1px solid #eee",
            borderRadius: 12,
            padding: "16px 20px",
            marginBottom: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 12,
          }}
        >
          <code
            style={{
              fontSize: 13,
              fontFamily: "var(--font-geist-mono), monospace",
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

        {/* Content */}
        <div
          data-mood-target=""
          className={`pal-${mood}`}
          style={{
            background: "#ffffff",
            border: "1px solid #eee",
            borderRadius: 12,
            padding: "28px 28px",
            marginBottom: 28,
            fontSize: 14,
            lineHeight: 1.7,
            color: "#444",
            whiteSpace: "pre-wrap",
          }}
        >
          {skill.content}
        </div>

        {/* Actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 12,
          }}
        >
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              padding: "8px 16px",
              background: "#1a1a1a",
              color: "#fff",
              borderRadius: 8,
              fontSize: 13,
              fontWeight: 500,
              textDecoration: "none",
              transition: "background 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#333";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
            }}
          >
            <ExternalLink size={14} />
            Voir sur GitHub
          </a>

          <MoodSwitcher mood={mood} onMoodChange={setMood} />
        </div>
      </main>
    </div>
  );
}
