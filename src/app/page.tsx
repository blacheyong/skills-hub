"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { HelpCircle, ExternalLink } from "lucide-react";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/lib/useIsMobile";
import { FolderCard } from "@/components/FolderCard";
import { HelpModal } from "@/components/HelpModal";
import { MoodSwitcher } from "@/components/MoodSwitcher";
import { SearchBar } from "@/components/SearchBar";
import { logout } from "@/lib/auth";
import { loadData } from "@/lib/store";
import type { Skill, Folder, MoodPalette } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState<MoodPalette>("default");
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [helpOpen, setHelpOpen] = useState(false);
  const isMobile = useIsMobile();

  useEffect(() => {
    loadData().then(({ skills, folders }) => {
      setAllSkills(skills);
      setAllFolders(folders);
      setLoading(false);
    });
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push("/login");
    router.refresh();
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
  }, [q, allSkills]);

  const filteredFolders = useMemo(() => {
    if (!q) return allFolders;
    const foldersWithMatchingSkills = new Set(matchingSkills.map((s) => s.folder));
    return allFolders.filter(
      (f) => f.name.toLowerCase().includes(q) || foldersWithMatchingSkills.has(f.slug)
    );
  }, [q, allFolders, matchingSkills]);

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
        onFolderClick={(slug) => router.push(`/folder/${slug}`)}
        onLogout={handleLogout}
      />

      <MoodSwitcher mood={mood} onMoodChange={setMood} />

      <main
        style={{
          marginLeft: isMobile ? 0 : 240,
          paddingTop: isMobile ? 68 : 28,
          padding: isMobile ? "68px 16px 16px" : "28px 40px",
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
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
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
              Tous les skills
            </h1>
            <button
              type="button"
              onClick={() => setHelpOpen(true)}
              title="Comment ajouter un skill"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px 4px 7px",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: 7,
                cursor: "pointer",
                color: "#a0a0a5",
                fontSize: 12,
                fontWeight: 480,
                fontFamily: "inherit",
                letterSpacing: "-0.01em",
                transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(124, 107, 196, 0.08)";
                e.currentTarget.style.borderColor = "rgba(124, 107, 196, 0.2)";
                e.currentTarget.style.color = "#7c6bc4";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                e.currentTarget.style.color = "#a0a0a5";
              }}
            >
              <HelpCircle size={14} strokeWidth={2} />
              Ajouter un skill
            </button>
            <a
              href="https://github.com/blacheyong/skills-library"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 5,
                padding: "4px 10px 4px 7px",
                background: "rgba(0,0,0,0.03)",
                border: "1px solid rgba(0,0,0,0.05)",
                borderRadius: 7,
                color: "#a0a0a5",
                fontSize: 12,
                fontWeight: 480,
                fontFamily: "inherit",
                letterSpacing: "-0.01em",
                textDecoration: "none",
                transition: "all 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.06)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.1)";
                e.currentTarget.style.color = "#2e2e30";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(0,0,0,0.03)";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.05)";
                e.currentTarget.style.color = "#a0a0a5";
              }}
            >
              <ExternalLink size={14} strokeWidth={2} />
              GitHub
            </a>
          </div>
          <SearchBar
            value={search}
            onChange={setSearch}
            placeholder="Rechercher..."
          />
        </div>

        {loading ? (
          <p style={{ color: "#b8b8bc", fontSize: 14, padding: "40px 0", textAlign: "center" }}>
            Chargement des skills...
          </p>
        ) : (
        <>
        <div
          data-mood-target=""
          className={`pal-${mood}`}
          style={{
            display: "grid",
            gridTemplateColumns: isMobile ? "repeat(2, 1fr)" : "repeat(auto-fill, minmax(190px, 1fr))",
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
                gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
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
        </>
        )}
      </main>

      <HelpModal open={helpOpen} onClose={() => setHelpOpen(false)} />
    </div>
  );
}
