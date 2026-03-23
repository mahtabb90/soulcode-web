import React from "react";
import { useNavigate } from "react-router-dom";

const chakras = [
  { name: "Root", color: "#ff4d4d", description: "Grounding, safety, stability" },
  { name: "Sacral", color: "#ff944d", description: "Creativity, pleasure, emotions" },
  { name: "Solar", color: "#ffd11a", description: "Confidence, power, motivation" },
  { name: "Heart", color: "#33cc99", description: "Love, compassion, connection" },
  { name: "Throat", color: "#3399ff", description: "Communication, truth" },
  { name: "Third Eye", color: "#9966ff", description: "Intuition, awareness" },
  { name: "Crown", color: "#cc66ff", description: "Spiritual connection, higher self" },
];

export default function Chakra() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
        background:
          "radial-gradient(circle at top, rgba(120, 0, 255, 0.12), transparent 30%), #000",
      }}
    >
      {/* Top buttons */}
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "2rem" }}>
        <button
          onClick={() => navigate("/dashboard")}
          style={{
            padding: "0.7rem 1.2rem",
            borderRadius: "999px",
            border: "1px solid rgba(180, 120, 255, 0.35)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            cursor: "pointer",
          }}
        >
          ← Back to Dashboard
        </button>
      </div>

      {/* Hero */}
      <div style={{ marginBottom: "1.5rem" }}>
        <h1 style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
          Chakra System 🌈
        </h1>

        <p style={{ color: "#b3b3b3", maxWidth: "680px", lineHeight: "1.7" }}>
          Each chakra represents a different aspect of your inner energy.
          Explore them to better understand your emotional, mental, and spiritual balance.
        </p>
      </div>

      

      {/* Chakra cards */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "1rem",
          marginBottom: "2rem",
        }}
      >
        {chakras.map((chakra) => (
          <div
            key={chakra.name}
            onClick={() =>
              navigate(`/chakra/${chakra.name.toLowerCase().replace(" ", "-")}`)
            }
            style={{
              background: "rgba(255,255,255,0.02)",
              borderRadius: "16px",
              padding: "1rem",
              border: `2px solid ${chakra.color}`,
              cursor: "pointer",
              transition: "transform 0.3s ease, box-shadow 0.3s ease",
              minHeight: "120px",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.transform = "scale(1.04)";
              e.currentTarget.style.boxShadow = `0 0 18px ${chakra.color}33`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.transform = "scale(1)";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            <h2 style={{ color: chakra.color, fontSize: "1.4rem", marginBottom: "0.6rem" }}>
              {chakra.name}
            </h2>
            <p style={{ margin: 0, lineHeight: "1.6", color: "#f2f2f2" }}>
              {chakra.description}
            </p>
          </div>
        ))}
      </div>

      {/* Info section */}
      <div
        style={{
          marginTop: "2rem",
          padding: "1.5rem",
          borderRadius: "20px",
          background: "linear-gradient(135deg, rgba(120, 0, 255, 0.10), rgba(0, 180, 255, 0.06))",
          border: "1px solid rgba(180, 120, 255, 0.22)",
          boxShadow: "0 0 30px rgba(140, 0, 255, 0.08)",
          maxWidth: "1100px",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "0.8rem" }}>
          How to use this guide ✨
        </h2>

        <p style={{ color: "#d1d1d1", lineHeight: "1.8", marginBottom: "1rem" }}>
          Each chakra reflects a different dimension of your wellbeing — from grounding
          and emotional flow to intuition and spiritual connection. This page helps you
          explore the meaning behind each energy center and understand how your inner
          balance may shift over time.
        </p>

        <p style={{ color: "#d1d1d1", lineHeight: "1.8", marginBottom: "1rem" }}>
          Click a chakra card to explore it more deeply. In the next step, each chakra
          can have its own page with emotional themes, signs of imbalance, and simple
          practices such as meditation, yoga, breathing, or affirmations.
        </p>

        <div
          style={{
            marginTop: "1.2rem",
            padding: "1rem",
            borderRadius: "14px",
            background: "rgba(255,255,255,0.03)",
            border: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <p style={{ margin: 0, color: "#f4d3ff", lineHeight: "1.7" }}>
            SoulCode idea: your future dashboard can connect real session data to chakra
            insights, so the guide becomes personal — not just informational.
          </p>
        </div>
      </div>
    </div>
  );
}