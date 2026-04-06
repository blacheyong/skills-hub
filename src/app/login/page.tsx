"use client";

import Link from "next/link";
import { Zap } from "lucide-react";

export default function LoginPage() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "linear-gradient(145deg, #f8f7f7 0%, #f0eded 50%, #ebe8e8 100%)",
        fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 400,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)",
          padding: "48px 40px",
          display: "flex",
          flexDirection: "column" as const,
          alignItems: "center",
          gap: 32,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column" as const,
            alignItems: "center",
            gap: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <Zap
              size={20}
              strokeWidth={2.2}
              style={{ color: "#1a1a1a" }}
            />
            <h1
              style={{
                fontSize: 22,
                fontWeight: 650,
                letterSpacing: "-0.03em",
                color: "#1a1a1a",
                margin: 0,
              }}
            >
              Skills Hub
            </h1>
          </div>
          <p
            style={{
              fontSize: 14,
              color: "#888",
              margin: 0,
              letterSpacing: "-0.01em",
            }}
          >
            Accédez aux skills de votre équipe
          </p>
        </div>

        <Link
          href="/"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 10,
            width: "100%",
            height: 44,
            background: "#1a1a1a",
            color: "#ffffff",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 500,
            letterSpacing: "-0.01em",
            textDecoration: "none",
            border: "none",
            cursor: "pointer",
            transition: "background 0.2s cubic-bezier(0.23, 1, 0.32, 1)",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#333";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.background = "#1a1a1a";
          }}
        >
          <svg
            width="18"
            height="18"
            viewBox="0 0 24 24"
            fill="currentColor"
            aria-hidden="true"
          >
            <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
          Se connecter avec GitHub
        </Link>

        <p
          style={{
            fontSize: 12,
            color: "#bbb",
            margin: 0,
            textAlign: "center" as const,
            lineHeight: 1.5,
          }}
        >
          Bibliothèque interne de skills Claude Code
        </p>
      </div>
    </div>
  );
}
