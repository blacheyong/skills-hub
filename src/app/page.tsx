"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { useIsMobile } from "@/lib/useIsMobile";
import { FolderCard } from "@/components/FolderCard";
import { MoodSwitcher } from "@/components/MoodSwitcher";
import { SearchBar } from "@/components/SearchBar";
import { logout } from "@/lib/auth";
import { loadData } from "@/lib/store";
import { BUNDLES } from "@/lib/bundles";
import type { Skill, Folder, MoodPalette } from "@/lib/types";

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [mood, setMood] = useState<MoodPalette>("default");
  const [allFolders, setAllFolders] = useState<Folder[]>([]);
  const [allSkills, setAllSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
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

  const projectFolders = filteredFolders.filter((f) => f.type === "projects");
  const metierFolders = filteredFolders.filter((f) => f.type === "metiers");

  const filteredBundles = useMemo(() => {
    if (!q) return BUNDLES;
    return BUNDLES.filter(
      (b) =>
        b.name.toLowerCase().includes(q) ||
        b.description.toLowerCase().includes(q) ||
        b.tags.some((t) => t.toLowerCase().includes(q))
    );
  }, [q]);

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
        activeBundle={null}
        onBundleClick={(slug) => router.push(`/bundle/${slug}`)}
        onLogout={handleLogout}
      />

      {!isMobile && <MoodSwitcher mood={mood} onMoodChange={setMood} />}

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
                fontSize: isMobile ? 16 : 18,
                fontWeight: 620,
                letterSpacing: "-0.02em",
                color: "#2e2e30",
                margin: 0,
                whiteSpace: "nowrap",
              }}
            >
              Tous les skills
            </h1>
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
        {/* Section: Projets */}
        {projectFolders.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
              color: "#b8b8bc",
              marginBottom: 14,
              paddingLeft: 2,
            }}>
              Projets
            </h2>
            <div
              data-mood-target=""
              className={`pal-${mood}`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 190px), 1fr))",
                gap: 14,
              }}
            >
              {projectFolders.map((folder) => (
                <FolderCard key={folder.slug} folder={folder} href={`/folder/${folder.slug}`} />
              ))}
            </div>
          </div>
        )}

        {/* Section: Skills Métier */}
        {metierFolders.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
              color: "#b8b8bc",
              marginBottom: 14,
              paddingLeft: 2,
            }}>
              Skills M&eacute;tier
            </h2>
            <div
              data-mood-target=""
              className={`pal-${mood}`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 190px), 1fr))",
                gap: 14,
              }}
            >
              {metierFolders.map((folder) => (
                <FolderCard key={folder.slug} folder={folder} href={`/folder/${folder.slug}`} />
              ))}
            </div>
          </div>
        )}

        {/* Section: Packs */}
        {filteredBundles.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
              color: "#b8b8bc",
              marginBottom: 14,
              paddingLeft: 2,
            }}>
              Packs
            </h2>
            <div
              data-mood-target=""
              className={`pal-${mood}`}
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 190px), 1fr))",
                gap: 14,
              }}
            >
              {filteredBundles.map((bundle, index) => (
                <FolderCard
                  key={bundle.slug}
                  folder={{
                    slug: bundle.slug,
                    name: bundle.name,
                    skillCount: 0,
                    type: 'metiers',
                    color: bundle.color,
                    folderIndex: allFolders.length + index,
                  }}
                  href={`/bundle/${bundle.slug}`}
                  hideCount
                />
              ))}
            </div>
          </div>
        )}

        {/* Show matching skills when searching */}
        {q && matchingSkills.length > 0 && (
          <div style={{ marginBottom: 36 }}>
            <h2 style={{
              fontSize: 11,
              fontWeight: 500,
              textTransform: "uppercase",
              letterSpacing: "0.3px",
              color: "#b8b8bc",
              marginBottom: 14,
              paddingLeft: 2,
            }}>
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

        {projectFolders.length === 0 && metierFolders.length === 0 && filteredBundles.length === 0 && matchingSkills.length === 0 && (
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

    </div>
  );
}
