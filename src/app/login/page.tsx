"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Zap, Eye, EyeOff } from "lucide-react";
import { login } from "@/lib/auth";

export default function LoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  const getRedirectTarget = () => {
    if (typeof window === "undefined") {
      return "/";
    }

    const nextPath = new URLSearchParams(window.location.search).get("next");
    return nextPath && nextPath.startsWith("/") && !nextPath.startsWith("//") ? nextPath : "/";
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setSubmitting(true);

    try {
      await login(username, password);
      router.push(getRedirectTarget());
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Identifiants incorrects");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background:
          "linear-gradient(145deg, #f8f7f7 0%, #f0eded 50%, #ebe8e8 100%)",
        fontFamily: "var(--font-inter), system-ui, -apple-system, sans-serif",
      }}
    >
      <form
        onSubmit={handleSubmit}
        style={{
          width: "100%",
          maxWidth: 380,
          background: "#ffffff",
          borderRadius: 16,
          boxShadow:
            "0 0 0 1px rgba(0,0,0,0.03), 0 2px 4px rgba(0,0,0,0.02), 0 8px 24px rgba(0,0,0,0.06), 0 24px 48px rgba(0,0,0,0.04)",
          padding: "44px 36px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 28,
        }}
      >
        {/* Logo */}
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
            <Zap size={20} strokeWidth={2.2} style={{ color: "#2e2e30" }} />
            <h1
              style={{
                fontSize: 22,
                fontWeight: 650,
                letterSpacing: "-0.03em",
                color: "#2e2e30",
                margin: 0,
              }}
            >
              Skills Hub
            </h1>
          </div>
          <p style={{ fontSize: 14, color: "#8a8a8f", margin: 0, letterSpacing: "-0.01em" }}>
            Accédez aux skills de votre équipe
          </p>
        </div>

        {/* Fields */}
        <div style={{ width: "100%", display: "flex", flexDirection: "column", gap: 12 }}>
          <div>
            <label
              style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8a8a8f", marginBottom: 5 }}
            >
              Identifiant
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => { setUsername(e.target.value); setError(""); }}
              placeholder="Entrez votre identifiant"
              autoFocus
              autoComplete="username"
              style={{
                width: "100%",
                padding: "9px 12px",
                fontSize: 14,
                borderRadius: 8,
                border: "1px solid rgba(0,0,0,0.08)",
                outline: "none",
                fontFamily: "inherit",
                color: "#2e2e30",
                transition: "border-color 0.15s",
              }}
              onFocus={(e) => { e.currentTarget.style.borderColor = "#5e6ad2"; }}
              onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
            />
          </div>
          <div>
            <label
              style={{ display: "block", fontSize: 12, fontWeight: 500, color: "#8a8a8f", marginBottom: 5 }}
            >
              Mot de passe
            </label>
            <div style={{ position: "relative" }}>
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(""); }}
                placeholder="Entrez votre mot de passe"
                autoComplete="current-password"
                style={{
                  width: "100%",
                  padding: "9px 40px 9px 12px",
                  fontSize: 14,
                  borderRadius: 8,
                  border: "1px solid rgba(0,0,0,0.08)",
                  outline: "none",
                  fontFamily: "inherit",
                  color: "#2e2e30",
                  transition: "border-color 0.15s",
                }}
                onFocus={(e) => { e.currentTarget.style.borderColor = "#5e6ad2"; }}
                onBlur={(e) => { e.currentTarget.style.borderColor = "rgba(0,0,0,0.08)"; }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "#b8b8bc",
                  display: "flex",
                }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>
        </div>

        {/* Error */}
        {error && (
          <p style={{ fontSize: 13, color: "#e54d4d", margin: "-8px 0 0", fontWeight: 500 }}>
            {error}
          </p>
        )}

        {/* Submit */}
        <button
          type="submit"
          disabled={submitting}
          style={{
            width: "100%",
            height: 42,
            background: submitting ? "#666" : "#2e2e30",
            color: "#fff",
            borderRadius: 10,
            fontSize: 14,
            fontWeight: 550,
            letterSpacing: "-0.01em",
            border: "none",
            cursor: "pointer",
            fontFamily: "inherit",
            transition: "background 0.15s",
          }}
          onMouseEnter={(e) => { e.currentTarget.style.background = submitting ? "#666" : "#444"; }}
          onMouseLeave={(e) => { e.currentTarget.style.background = submitting ? "#666" : "#2e2e30"; }}
        >
          {submitting ? "Connexion..." : "Se connecter"}
        </button>

        <p style={{ fontSize: 11, color: "#c2c2c6", margin: 0, textAlign: "center", lineHeight: 1.5 }}>
          Bibliothèque interne de skills Claude Code
        </p>
      </form>
    </div>
  );
}
