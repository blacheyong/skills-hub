"use client";

import { useState, useMemo } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { SkillCard } from "@/components/SkillCard";
import { SearchBar } from "@/components/SearchBar";
import { MoodSwitcher } from "@/components/MoodSwitcher";
import { CopyButton } from "@/components/CopyButton";
import { getFolders, getSkillsByFolder } from "@/lib/skills";
import type { Folder, MoodPalette } from "@/lib/types";

const allFolders: Folder[] = getFolders();

export default function FolderPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState<MoodPalette>("default");

  const slug = params.slug;
  const folder = allFolders.find((f) => f.slug === slug);
  const skills = getSkillsByFolder(slug);

  const filteredSkills = useMemo(() => {
    if (!search.trim()) return skills;
    const q = search.toLowerCase();
    return skills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [skills, search]);

  if (!folder) {
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
          onLogout={() => router.push("/login")}
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
              Dossier introuvable
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
        activeFolder={slug}
        onFolderClick={(s) => router.push(`/folder/${s}`)}
          onLogout={() => router.push("/login")}
      />

      <main
        style={{
          marginLeft: 240,
          padding: "28px 40px",
          flex: 1,
          minWidth: 0,
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
          <span style={{ color: "#666" }}>{folder.name}</span>
        </nav>

        {/* Header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            gap: 16,
          }}
        >
          <div style={{ display: "flex", alignItems: "baseline", gap: 10 }}>
            <h1
              style={{
                fontSize: 18,
                fontWeight: 620,
                letterSpacing: "-0.02em",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              {folder.name}
            </h1>
            <span
              style={{
                fontSize: 13,
                color: "#999",
                fontWeight: 450,
              }}
            >
              {filteredSkills.length} skill{filteredSkills.length !== 1 ? "s" : ""}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Rechercher un skill..."
            />
            <MoodSwitcher mood={mood} onMoodChange={setMood} />
          </div>
        </div>

        {/* Skills Grid */}
        <div
          data-mood-target=""
          className={`pal-${mood}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.slug}
              skill={skill}
              href={`/folder/${slug}/${skill.slug}`}
              copyButton={
                <CopyButton
                  text={`claude skill install github.com/guillonl/skills-library/${skill.category}/${slug}/${skill.slug}`}
                />
              }
            />
          ))}

          {filteredSkills.length === 0 && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#999",
                fontSize: 14,
                padding: "40px 0",
              }}
            >
              Aucun skill trouvé
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
