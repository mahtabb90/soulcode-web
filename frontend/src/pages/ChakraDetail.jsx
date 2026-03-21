import React from "react";
import { useNavigate, useParams } from "react-router-dom";

const chakraData = {
  root: {
    name: "Root",
    color: "#ff4d4d",
    emoji: "❤️",
    theme: "Grounding, safety, stability",
    description:
      "The Root Chakra is connected to security, survival, and feeling grounded in life. It helps you feel safe in your body and supported by your environment.",
    imbalance:
      "When out of balance, you may feel anxious, disconnected, fearful, restless, or lacking stability.",
    practices: [
      "Grounding meditation",
      "Slow yoga and standing poses",
      "Walking in nature",
      "Breathing deeply into the lower body",
    ],
    affirmation: "I am safe, grounded, and supported.",
    locationText: "Located at the base of the spine and pelvic floor.",
    imagePosition: { top: "85%", left: "50%" },
  },
  sacral: {
    name: "Sacral",
    color: "#ff944d",
    emoji: "🧡",
    theme: "Creativity, pleasure, emotions",
    description:
      "The Sacral Chakra relates to emotional flow, pleasure, sensuality, and creative energy. It supports joy, movement, and healthy emotional expression.",
    imbalance:
      "When out of balance, you may feel emotionally blocked, numb, overly reactive, uninspired, or disconnected from joy.",
    practices: [
      "Hip-opening yoga",
      "Creative journaling",
      "Dance or free movement",
      "Breathwork for emotional release",
    ],
    affirmation: "I allow myself to feel, create, and enjoy life.",
    locationText: "Located in the lower abdomen, just below the navel.",
    imagePosition: { top: "73.5%", left: "50%" },
  },
  solar: {
    name: "Solar",
    color: "#ffd11a",
    emoji: "💛",
    theme: "Confidence, power, motivation",
    description:
      "The Solar Plexus Chakra is the center of personal power, self-worth, discipline, and motivation. It supports healthy ambition and inner strength.",
    imbalance:
      "When out of balance, you may struggle with low confidence, indecision, frustration, perfectionism, or lack of motivation.",
    practices: [
      "Core-strength yoga",
      "Power poses",
      "Goal setting",
      "Motivational affirmations",
    ],
    affirmation: "I trust myself and step into my power.",
    locationText: "Located in the upper abdomen, above the navel.",
     imagePosition: { top: "61.5%", left: "50%" },
  },
  heart: {
    name: "Heart",
    color: "#33cc99",
    emoji: "💚",
    theme: "Love, compassion, connection",
    description:
      "The Heart Chakra is connected to love, compassion, forgiveness, empathy, and emotional healing. It helps you connect with yourself and others from a place of openness.",
    imbalance:
      "When out of balance, you may feel lonely, guarded, overly dependent, emotionally heavy, or disconnected from love and trust.",
    practices: [
      "Heart-opening yoga",
      "Loving-kindness meditation",
      "Gratitude journaling",
      "Breathing into the chest area",
    ],
    affirmation: "I give and receive love with openness and trust.",
    locationText: "Located in the center of the chest.",
    imagePosition:  { top: "51%", left: "50%" },
  },
  throat: {
    name: "Throat",
    color: "#3399ff",
    emoji: "🩵",
    theme: "Communication, truth",
    description:
      "The Throat Chakra supports clear communication, honest expression, and speaking your truth. It helps your inner voice become outer clarity.",
    imbalance:
      "When out of balance, you may feel unheard, afraid to speak, talk too much, hold things in, or struggle with honesty.",
    practices: [
      "Journaling your truth",
      "Chanting or humming",
      "Breathing exercises",
      "Practicing honest communication",
    ],
    affirmation: "I express myself clearly and truthfully.",
    locationText: "Located at the throat.",
    imagePosition: { top: "39%", left: "50%" },
  },
  "third-eye": {
    name: "Third Eye",
    color: "#9966ff",
    emoji: "💜",
    theme: "Intuition, awareness",
    description:
      "The Third Eye Chakra is linked to intuition, perception, wisdom, and inner vision. It helps you trust your insight and see beyond surface reality.",
    imbalance:
      "When out of balance, you may feel mentally foggy, disconnected from intuition, overthinking, doubtful, or spiritually blocked.",
    practices: [
      "Silent meditation",
      "Visualization exercises",
      "Mindfulness practice",
      "Reducing overstimulation",
    ],
    affirmation: "I trust my intuition and inner wisdom.",
    locationText: "Located between the eyebrows in the center of the forehead.",
      imagePosition:  { top: "24%", left: "50%" },
  },
  crown: {
    name: "Crown",
    color: "#cc66ff",
    emoji: "🤍",
    theme: "Spiritual connection, higher self",
    description:
      "The Crown Chakra is connected to spiritual awareness, meaning, higher consciousness, and connection to something greater than yourself.",
    imbalance:
      "When out of balance, you may feel disconnected, spiritually empty, confused, cynical, or lacking purpose.",
    practices: [
      "Meditation in silence",
      "Prayer or reflection",
      "Time in stillness",
      "Contemplative journaling",
    ],
    affirmation: "I am connected to wisdom, presence, and peace.",
    locationText: "Located at the top of the head.",
    imagePosition: { top: "8.5%", left: "50%" },
  },
};

export default function ChakraDetail() {
  const navigate = useNavigate();
  const { name } = useParams();

  const chakra = chakraData[name];

  if (!chakra) {
    return (
      <div
        style={{
          minHeight: "100vh",
          background: "#000",
          color: "white",
          padding: "2rem",
        }}
      >
        <button
          onClick={() => navigate("/chakra")}
          style={{
            padding: "0.5rem 1rem",
            fontSize: "0.9rem",
            borderRadius: "999px",
            border: "1px solid rgba(180, 120, 255, 0.35)",
            background: "rgba(255,255,255,0.04)",
            color: "white",
            cursor: "pointer",
            marginBottom: "2rem",
          }}
        >
          ← Back to Chakra Guide
        </button>

        <h1>Chakra not found</h1>
        <p>This energy center does not exist in the guide yet.</p>
      </div>
    );
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        padding: "2rem",
        color: "white",
        background: `radial-gradient(circle at top, ${chakra.color}22, transparent 28%), #000`,
      }}
    >
      <button
        onClick={() => navigate("/chakra")}
        style={{
          padding: "0.5rem 1rem",
          fontSize: "0.9rem",
          borderRadius: "999px",
          border: "1px solid rgba(180, 120, 255, 0.35)",
          background: "rgba(255,255,255,0.04)",
          color: "white",
          cursor: "pointer",
          marginBottom: "2rem",
        }}
      >
        ← Back to Chakra Guide
      </button>

      <div
        style={{
          border: `1px solid ${chakra.color}55`,
          background: "rgba(255,255,255,0.03)",
          borderRadius: "24px",
          padding: "2rem",
          maxWidth: "1100px",
          margin: "0 auto",
          boxShadow: `0 0 35px ${chakra.color}18`,
        }}
      >
        <p
          style={{
            color: chakra.color,
            fontWeight: "600",
            letterSpacing: "0.08em",
            marginBottom: "0.6rem",
            textTransform: "uppercase",
          }}
        >
          Chakra detail
        </p>

        <h1 style={{ fontSize: "3rem", marginBottom: "0.5rem" }}>
          {chakra.name} {chakra.emoji}
        </h1>

        <p
          style={{
            color: chakra.color,
            fontSize: "1.2rem",
            marginBottom: "1.5rem",
            fontWeight: "500",
          }}
        >
          {chakra.theme}
        </p>

        <p
          style={{
            color: "#d6d6d6",
            lineHeight: "1.9",
            fontSize: "1.05rem",
            maxWidth: "850px",
            marginBottom: "2rem",
          }}
        >
          {chakra.description}
        </p>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
            gap: "1.2rem",
            marginBottom: "1.5rem",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "1.2rem",
            }}
          >
            <h2 style={{ marginBottom: "0.8rem" }}>Signs of imbalance</h2>
            <p style={{ color: "#d0d0d0", lineHeight: "1.8", margin: 0 }}>
              {chakra.imbalance}
            </p>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "1.2rem",
            }}
          >
            <h2 style={{ marginBottom: "0.8rem" }}>Affirmation</h2>
            <p
              style={{
                color: chakra.color,
                lineHeight: "1.8",
                margin: 0,
                fontSize: "1.05rem",
                fontWeight: "500",
              }}
            >
              “{chakra.affirmation}”
            </p>
          </div>
        </div>

        <div
          style={{
            marginTop: "1.2rem",
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
            gap: "1.2rem",
            alignItems: "stretch",
          }}
        >
          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "1.2rem",
            }}
          >
            <h2 style={{ marginBottom: "1rem" }}>Helpful practices</h2>

            <ul
              style={{
                paddingLeft: "1.2rem",
                margin: 0,
                color: "#d8d8d8",
                lineHeight: "2",
              }}
            >
              {chakra.practices.map((practice) => (
                <li key={practice}>{practice}</li>
              ))}
            </ul>
          </div>

          <div
            style={{
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: "18px",
              padding: "1.2rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <h2 style={{ marginBottom: "1rem", alignSelf: "flex-start" }}>
              Chakra location
            </h2>

            <div
              style={{
                position: "relative",
                width: "100%",
                maxWidth: "360px",
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <img
                src="/body-silhouette.png"
                alt={`${chakra.name} chakra location`}
                style={{
                  width: "100%",
                  maxWidth: "320px",
                  height: "auto",
                  objectFit: "contain",
                  borderRadius: "18px",
                  opacity: 0.95,
                }}
              />

              <div
                style={{
    position: "absolute",
    top: chakra.imagePosition.top,
    left: chakra.imagePosition.left,
    transform: "translate(-50%, -50%)",
    width: "28px",
    height: "28px",
    borderRadius: "999px",
    border: `3px solid ${chakra.color}`,
    background: "transparent",
    boxShadow: `0 0 12px ${chakra.color}, 0 0 25px ${chakra.color}`,
    animation: "chakraPulse 2s ease-in-out infinite",
    pointerEvents: "none",
  }}
              />
            </div>

            <p
              style={{
                margin: 0,
                color: "#d6d6d6",
                lineHeight: "1.8",
                textAlign: "center",
                maxWidth: "320px",
              }}
            >
              {chakra.locationText}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}