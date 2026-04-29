"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Sidebar } from "@/components/Sidebar";
import { SkillCard } from "@/components/SkillCard";
import { SearchBar } from "@/components/SearchBar";
import { SelectionBar } from "@/components/SelectionBar";
import { logout } from "@/lib/auth";
import { loadData } from "@/lib/store";
import { useIsMobile } from "@/lib/useIsMobile";
import { buildSkillMarkdown } from "@/lib/skillMarkdown";
import { buildZip, encodeText } from "@/lib/zip";
import type { Skill, Folder } from "@/lib/types";

export default function FolderPage() {
  const params = useParams<{ slug: string }>();
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [selectedSlugs, setSelectedSlugs] = useState<Set<string>>(new Set());

  const slug = params.slug;
  const isMobile = useIsMobile();

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

  useEffect(() => {
    setSelectedSlugs(new Set());
    setSearch("");
  }, [slug]);

  const folder = allFolders.find((f) => f.slug === slug);
  const skills = allSkills.filter((s) => s.folder === slug);

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

  const isMetier = folder?.type === "metiers";

  const handleToggleSelect = useCallback((skillSlug: string) => {
    setSelectedSlugs((prev) => {
      const next = new Set(prev);
      if (next.has(skillSlug)) next.delete(skillSlug);
      else next.add(skillSlug);
      return next;
    });
  }, []);

  const handleSelectAll = useCallback(() => {
    setSelectedSlugs(new Set(filteredSkills.map((s) => s.slug)));
  }, [filteredSkills]);

  const handleClear = useCallback(() => {
    setSelectedSlugs(new Set());
  }, []);

  const handleDownloadSelection = useCallback(() => {
    if (selectedSlugs.size === 0) return;
    const selected = skills.filter((s) => selectedSlugs.has(s.slug));
    const entries = selected.map((sk) => ({
      name: `${sk.slug}.md`,
      data: encodeText(buildSkillMarkdown(sk)),
    }));
    const zipBytes = buildZip(entries);
    const blob = new Blob([zipBytes], { type: "application/zip" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `${slug}-skills.zip`;
    a.click();
    URL.revokeObjectURL(url);
  }, [selectedSlugs, skills, slug]);

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

  const showSelectionBar = isMetier && selectedSlugs.size > 0;
  const allSelected =
    filteredSkills.length > 0 &&
    filteredSkills.every((s) => selectedSlugs.has(s.slug));

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
        activeBundle={null}
        onBundleClick={(s) => router.push(`/bundle/${s}`)}
        onLogout={handleLogout}
      />

      <main
        style={{
          marginLeft: isMobile ? 0 : 240,
          padding: isMobile ? "68px 16px 16px" : "28px 40px",
          flex: 1,
          minWidth: 0,
        }}
      >
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

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: isMobile ? "stretch" : "center",
            justifyContent: "space-between",
            marginBottom: 28,
            gap: isMobile ? 12 : 16,
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
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 12,
              justifyContent: "flex-end",
              flexWrap: "nowrap",
            }}
          >
            {isMetier && (
              <div
                style={{
                  opacity: showSelectionBar ? 1 : 0,
                  pointerEvents: showSelectionBar ? "auto" : "none",
                  transform: showSelectionBar
                    ? "translateX(0)"
                    : "translateX(6px)",
                  transition:
                    "opacity 0.18s ease-out, transform 0.18s cubic-bezier(0.23, 1, 0.32, 1)",
                }}
              >
                <SelectionBar
                  count={selectedSlugs.size}
                  allSelected={allSelected}
                  onSelectAll={handleSelectAll}
                  onDeselectAll={handleClear}
                  onDownload={handleDownloadSelection}
                  onClear={handleClear}
                />
              </div>
            )}
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Rechercher un skill..."
            />
          </div>
        </div>

        <div
          key={slug}
          className="grid-fade-in"
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
            gap: 16,
          }}
        >
          {filteredSkills.map((skill) => (
            <SkillCard
              key={skill.slug}
              skill={skill}
              href={`/folder/${slug}/${skill.slug}`}
              selectable={isMetier}
              selected={selectedSlugs.has(skill.slug)}
              onToggleSelect={handleToggleSelect}
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
