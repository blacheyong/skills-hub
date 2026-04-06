"use client";

import { useState, useMemo } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/components/Sidebar";
import { FolderCard } from "@/components/FolderCard";
import { MoodSwitcher } from "@/components/MoodSwitcher";
import { SearchBar } from "@/components/SearchBar";
import { getFolders } from "@/lib/skills";
import type { Folder, MoodPalette } from "@/lib/types";

const allFolders: Folder[] = getFolders();

export default function HomePage() {
  const router = useRouter();
  const [search, setSearch] = useState("");
  const [activeFolder, setActiveFolder] = useState<string | null>(null);
  const [mood, setMood] = useState<MoodPalette>("default");

  const filteredFolders = useMemo(() => {
    let result = allFolders;

    if (activeFolder) {
      result = result.filter((f) => f.slug === activeFolder);
    }

    if (search.trim()) {
      const q = search.toLowerCase();
      result = result.filter((f) => f.name.toLowerCase().includes(q));
    }

    return result;
  }, [search, activeFolder]);

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
      />

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
              color: "#1a1a1a",
              margin: 0,
              whiteSpace: "nowrap",
            }}
          >
            {activeFolderData ? activeFolderData.name : "Tous les skills"}
          </h1>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <SearchBar
              value={search}
              onChange={setSearch}
              placeholder="Rechercher un dossier..."
            />
            <MoodSwitcher mood={mood} onMoodChange={setMood} />
          </div>
        </div>

        <div
          data-mood-target=""
          className={`pal-${mood}`}
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))",
            gap: 16,
          }}
        >
          {filteredFolders.map((folder) => (
            <FolderCard
              key={folder.slug}
              folder={folder}
              href={`/folder/${folder.slug}`}
            />
          ))}

          {filteredFolders.length === 0 && (
            <p
              style={{
                gridColumn: "1 / -1",
                textAlign: "center",
                color: "#999",
                fontSize: 14,
                padding: "40px 0",
              }}
            >
              Aucun dossier trouvé
            </p>
          )}
        </div>
      </main>
    </div>
  );
}
