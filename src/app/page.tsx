"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { FolderCard } from "@/components/FolderCard";
import { MoodSwitcher } from "@/components/MoodSwitcher";
import { SearchBar } from "@/components/SearchBar";
import { isAuthenticated, logout } from "@/lib/auth";
import { loadData } from "@/lib/store";
import type { Skill, Folder, MoodPalette } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [mood, setMood] = useState<MoodPalette>("default");
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!isAuthenticated()) { router.push("/login"); return; }
    loadData().then(({ skills, folders }) => {
      setAllSkills(skills);
      setAllFolders(folders);
      setLoading(false);
    });
  }, [router]);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  const q = search.toLowerCase().trim();

  // When searching, also search inside skills
  const matchingSkills = useMemo(() => {
    if (!q) return [];
    return allSkills.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [q]);

  const filteredFolders = useMemo(() => {
    let result = allFolders;
    if (activeFolder) {
      result = result.filter((f) => f.slug === activeFolder);
    }
    if (q) {
      // Show folders that match by name OR contain matching skills
      const foldersWithMatchingSkills = new Set(matchingSkills.map((s) => s.folder));
      result = result.filter(
        (f) => f.name.toLowerCase().includes(q) || foldersWithMatchingSkills.has(f.slug)
      );
    }
    return result;
  }, [q, activeFolder, matchingSkills]);

  const activeFolderData = activeFolder
    ? allFolders.find((f) => f.slug === activeFolder)
    : null;

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
        activeFolder={activeFolder}
        onFolderClick={(slug) =>
          setActiveFolder(slug === activeFolder ? null : slug)
        }
        onLogout={handleLogout}
      />

      <MoodSwitcher mood={mood} onMoodChange={setMood} />

      <main
        style={{
          marginLeft: 240,
          padding: "28px 40px",
          flex: 1,
          minWidth: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 28,
            gap: 16,
          }}
        >
          <h1
            style={{
              fontSize: 18,
              fontWeight: 620,
              letterSpacing: "-0.02em",
              color: "#2e2e30",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {activeFolderData ? activeFolderData.name : "Tous les skills"}
          </h1>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Rechercher..."
          />
        </div>

        <div
          data-mood-target=""
          className={`pal-${mood}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(190px, 1fr))",
            gap: 14,
          }}
        >
          {filteredFolders.map((folder) => (
            <FolderCard
              key={folder.slug}
              folder={folder}
              href={`/folder/${folder.slug}`}
            />
          ))}
        </div>

        {/* Show matching skills when searching */}
        {q && matchingSkills.length > 0 && (
          <div style={{ marginTop: 32 }}>
            <h2
              style={{
                fontSize: 14,
                fontWeight: 550,
                color: "#8a8a8f",
                marginBottom: 14,
                letterSpacing: "-0.01em",
              }}
            >
              Skills correspondants
            </h2>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
                gap: 12,
              }}
            >
              {matchingSkills.map((skill) => (
                <Link
                  key={`${skill.folder}-${skill.slug}`}
                  href={`/folder/${skill.folder}/${skill.slug}`}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: 6,
                    background: "#fff",
                    borderRadius: 10,
                    padding: "14px 16px",
                    textDecoration: "none",
                    color: "inherit",
                    boxShadow: "var(--card-shadow)",
                    transition: "all 0.25s cubic-bezier(0.23, 1, 0.32, 1)",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translateY(-1px)";
                    e.currentTarget.style.boxShadow = "var(--card-shadow-hover)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "";
                    e.currentTarget.style.boxShadow = "var(--card-shadow)";
                  }}
                >
                  <span style={{ fontSize: 14, fontWeight: 560, color: "#2e2e30" }}>
                    {skill.name}
                  </span>
                  <span style={{ fontSize: 12, color: "#8a8a8f", lineHeight: 1.4 }} className="line-clamp-2">
                    {skill.description}
                  </span>
                  <div style={{ display: "flex", gap: 4, marginTop: 2 }}>
                    {skill.tags.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        style={{
                          fontSize: 10,
                          fontWeight: 500,
                          color: "#a0a0a5",
                          background: "rgba(0,0,0,0.03)",
                          padding: "1px 6px",
                          borderRadius: 999,
                        }}
                      >
                        {tag}
                      </span>
                    ))}
                    <span style={{ fontSize: 10, color: "#b8b8bc", marginLeft: "auto" }}>
                      {skill.folder}
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {filteredFolders.length === 0 && matchingSkills.length === 0 && (
          <p
            style={{
              textAlign: "center",
              color: "#999",
              fontSize: 14,
              padding: "40px 0",
            }}
          >
            Aucun résultat trouvé
          </p>
        )}
      </main>
    </div>
  );
}
