import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  listEntries,
  createEntry,
  getWeeklySummary,
  getMe,
  deleteEntry,
  updateEntry,
} from "../api/client";


const chakraStyles = {
  root: "border-chakra-root/40 shadow-[0_0_25px_rgba(239,68,68,0.25)]",
  sacral: "border-chakra-sacral/40 shadow-[0_0_25px_rgba(249,115,22,0.25)]",
  solar: "border-chakra-solar/40 shadow-[0_0_25px_rgba(234,179,8,0.25)]",
  heart: "border-chakra-heart/40 shadow-[0_0_25px_rgba(34,197,94,0.25)]",
  throat: "border-chakra-throat/40 shadow-[0_0_25px_rgba(59,130,246,0.25)]",
  third: "border-chakra-third/40 shadow-[0_0_25px_rgba(99,102,241,0.25)]",
  crown: "border-chakra-crown/40 shadow-[0_0_25px_rgba(168,85,247,0.25)]",
};

const chakras = ["root", "sacral", "solar", "heart", "throat", "third", "crown"];

function startOfDayLocal(d) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

function buildLast7DaysSeries(entries) {
  // 7 dagar inkl idag (lokal tid)
  const today = startOfDayLocal(new Date());
  const days = Array.from({ length: 7 }, (_, i) => {
    const day = new Date(today);
    day.setDate(today.getDate() - (6 - i)); // oldest -> newest
    return day;
  });

  const totals = days.map((day) => {
    const next = new Date(day);
    next.setDate(day.getDate() + 1);

    const minutes = entries
      .filter((e) => {
        const t = new Date(e.created_at);
        return t >= day && t < next;
      })
      .reduce((sum, e) => sum + (Number(e.minutes) || 0), 0);

    const label = day.toLocaleDateString(undefined, { weekday: "short" });
    return { label, minutes };
  });

  return totals;
}

function TrendChart({ entries }) {
  const data = buildLast7DaysSeries(entries);
  const width = 680;
  const height = 180;
  const padX = 24;
  const padY = 26;

  const maxVal = Math.max(10, ...data.map((d) => d.minutes));
  const xStep = (width - padX * 2) / (data.length - 1);
  const yScale = (height - padY * 2) / maxVal;

  const points = data.map((d, i) => {
    const x = padX + i * xStep;
    const y = height - padY - d.minutes * yScale;
    return { ...d, x, y };
  });

  const path = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const area = `${path} L ${points[points.length - 1].x} ${height - padY} L ${
    points[0].x
  } ${height - padY} Z`;

  return (
    <div className="mt-6">
      <div className="flex items-center justify-between mb-3">
        <div className="text-sm text-gray-300">7-day energy trend</div>
        <div className="text-xs text-gray-500">minutes / day</div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
        <svg
          viewBox={`0 0 ${width} ${height}`}
          className="w-full h-[180px]"
          role="img"
          aria-label="7-day energy trend chart"
        >
          <defs>
            <linearGradient id="soulcodeLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="rgb(249,115,22)" stopOpacity="0.95" />
              <stop offset="35%" stopColor="rgb(234,179,8)" stopOpacity="0.95" />
              <stop offset="65%" stopColor="rgb(34,197,94)" stopOpacity="0.95" />
              <stop offset="100%" stopColor="rgb(168,85,247)" stopOpacity="0.95" />
            </linearGradient>

            <linearGradient id="soulcodeFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(168,85,247)" stopOpacity="0.22" />
              <stop offset="100%" stopColor="rgb(0,0,0)" stopOpacity="0" />
            </linearGradient>

            <filter id="glow" x="-30%" y="-30%" width="160%" height="160%">
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* baseline */}
          <line
            x1={padX}
            y1={height - padY}
            x2={width - padX}
            y2={height - padY}
            stroke="rgba(255,255,255,0.08)"
            strokeWidth="1"
          />

          {/* area */}
          <path d={area} fill="url(#soulcodeFill)" />

          {/* line glow */}
          <path
            d={path}
            fill="none"
            stroke="url(#soulcodeLine)"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
            filter="url(#glow)"
            opacity="0.9"
          />
          {/* crisp line on top */}
          <path
            d={path}
            fill="none"
            stroke="url(#soulcodeLine)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* points */}
          {points.map((p, idx) => (
            <g key={idx}>
              <circle cx={p.x} cy={p.y} r="5" fill="rgba(0,0,0,0.6)" />
              <circle cx={p.x} cy={p.y} r="3" fill="url(#soulcodeLine)" />
            </g>
          ))}

          {/* labels */}
          {points.map((p, idx) => (
            <text
              key={`t-${idx}`}
              x={p.x}
              y={height - 8}
              textAnchor="middle"
              fontSize="11"
              fill="rgba(255,255,255,0.45)"
            >
              {p.label}
            </text>
          ))}
        </svg>
      </div>
    </div>
  );
}

function generateInsight(summary) {
  if (!summary) return "";

  const chakra = summary.dominant_chakra;
  const total = summary.total_minutes || 0;
  const med = summary.minutes_meditation || 0;
  const yoga = summary.minutes_yoga || 0;

  const focus =
    med > yoga ? "inner stillness" : yoga > med ? "body alignment" : "balance";

  const intensity =
    total >= 120 ? "high" : total >= 60 ? "steady" : total > 0 ? "gentle" : "quiet";

  const chakraLines = {
    root: "Grounding and stability were your theme. Build safety in small rituals.",
    sacral: "Creativity and emotional flow were activated. Let pleasure be healing.",
    solar: "Confidence and personal power expanded. Choose one brave action daily.",
    heart: "Heart energy was strongest—connection, compassion and emotional balance.",
    throat: "Expression was highlighted. Speak your truth with softness and clarity.",
    third: "Intuition and insight were active. Trust the signals, write them down.",
    crown: "Spiritual connection was emphasized. Make space for silence and surrender.",
  };

  const base = chakra ? chakraLines[chakra] : "Your energy is gathering—log more sessions to see patterns.";
  const add =
    total > 0
      ? ` This week was ${intensity}, with a focus on ${focus}.`
      : "";

  return base + add;
}

export default function Dashboard() {
  const navigate = useNavigate();
  const [summary, setSummary] = useState(null);

  const [email, setEmail] = useState("");
  const [entries, setEntries] = useState([]);
  const [loadingEntries, setLoadingEntries] = useState(true);

  const [entryType, setEntryType] = useState("meditation");
  const [minutes, setMinutes] = useState(15);
  const [chakra, setChakra] = useState("heart");
  const [note, setNote] = useState("");

  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  const [editingEntry, setEditingEntry] = useState(null);

  function logout() {
    localStorage.removeItem("soulcode_token");
    navigate("/login");
  }

  async function loadAll() {
    setError("");
    setLoadingEntries(true);
    try {
      const me = await getMe();
      setEmail(me.email);
      const list = await listEntries();
      const weekly = await getWeeklySummary();
      setSummary(weekly);
      setEntries(list);
    } catch {
      localStorage.removeItem("soulcode_token");
      navigate("/login");
    } finally {
      setLoadingEntries(false);
    }
  }

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  async function handleDelete(entryId) {
   const confirmed = window.confirm("Are you sure you want to delete this entry?");

  if (!confirmed) return;

  try {
    await deleteEntry(entryId);
    setEntries((prev) => prev.filter((entry) => entry.id !== entryId));
  } catch (error) {
    alert(error.message || "Failed to delete entry");
  }
}

function handleEdit(entry) {
  setEntryType(entry.entry_type);
  setMinutes(entry.minutes);
  setChakra(entry.chakra);
  setNote(entry.note || "");
  setEditingEntry(entry);
}
  async function handleCreate(e) {
  e.preventDefault();
  setError("");
  setSaving(true);

  try {
    const payload = {
      entry_type: entryType,
      minutes: Number(minutes),
      chakra,
      note: note.trim() ? note.trim() : null,
    };

    if (editingEntry) {
      // UPDATE
      const updated = await updateEntry(editingEntry.id, payload);

      setEntries((prev) =>
        prev.map((entry) =>
          entry.id === updated.id ? updated : entry
        )
      );

      setEditingEntry(null);

    } else {
      // CREATE
      const created = await createEntry(payload);
      setEntries((prev) => [created, ...prev]);
    }

    // reset form
    setEntryType("meditation");
    setMinutes("");
    setChakra("");
    setNote("");

  } catch (error) {
    alert(error.message || "Failed to save entry");
  } finally {
    setSaving(false);
  }
}

  return (
    <div className="relative min-h-screen bg-black text-white px-6 overflow-hidden animate-fadeIn">
      <div className="absolute w-[750px] h-[750px] bg-purple-600/20 rounded-full blur-[180px] animate-pulse -z-10 top-1/3"></div>
      <div className="absolute w-[520px] h-[520px] bg-indigo-600/20 rounded-full blur-[150px] -z-10 top-1/4 right-1/4"></div>

      <div className="max-w-5xl mx-auto pt-14 pb-20">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
          <div>
            <h1 className="text-4xl font-semibold tracking-wide">
              SoulCode Dashboard
            </h1>
            <p className="text-gray-300 mt-2">
              Signed in as{" "}
              <span className="text-purple-200">{email || "..."}</span>
            </p>
          </div>

          <button
            onClick={logout}
            className="px-6 py-2 rounded-full border border-purple-400/40 bg-white/5 hover:bg-white/10 transition"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="mb-6 rounded-2xl border border-red-500/30 bg-red-500/10 px-5 py-4 text-sm text-red-200">
            {error}
          </div>
        )}
{summary && (
  <div className="mb-10 bg-white/5 border border-purple-400/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_50px_rgba(168,85,247,0.25)]">
    <h2 className="text-2xl font-semibold mb-6">
      Weekly Energy Insight
    </h2>

    <div className="grid md:grid-cols-3 gap-6 text-center">
        <p className="mt-6 text-gray-300 leading-relaxed">
          {generateInsight(summary)}
        </p>
        <TrendChart entries={entries} />
      <div>
        <div className="text-3xl font-bold bg-chakra-gradient bg-clip-text text-transparent">
          {summary.total_minutes}
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Total Minutes (7 days)
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold text-purple-200">
          {summary.entries}
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Total Sessions
        </div>
      </div>

      <div>
        <div className="text-3xl font-bold capitalize text-purple-300">
          {summary.dominant_chakra || "—"}
        </div>
        <div className="text-gray-400 text-sm mt-2">
          Dominant Chakra
        </div>
      </div>
    </div>
  </div>
)}

<div className="mt-6 p-6 rounded-2xl border border-purple-400/20 bg-white/5 backdrop-blur-md">
  <h2 className="text-2xl font-semibold mb-2">Explore Chakra System 🔮</h2>

  <p className="text-gray-300 mb-4">
    Learn more about your energy centers and how they affect your balance.
  </p>

  <button
    onClick={() => navigate("/chakra")}
    className="px-6 py-2 rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400 text-white hover:opacity-90 transition"
  >
    Open Chakra Guide
  </button>
</div>
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white/5 border border-purple-400/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.25)]">
            <h2 className="text-2xl font-semibold mb-6">Log an entry</h2>

            <form className="space-y-4" onSubmit={handleCreate}>
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-300">Type</label>
                  <select
                    value={entryType}
                    onChange={(e) => setEntryType(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
                  >
                    <option value="meditation">Meditation</option>
                    <option value="yoga">Yoga</option>
                  </select>
                </div>

                <div>
                  <label className="text-sm text-gray-300">Minutes</label>
                  <input
                    type="number"
                    min="1"
                    max="600"
                    value={minutes}
                    onChange={(e) => setMinutes(e.target.value)}
                    className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
                  />
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Chakra</label>
                <div className="mt-3 grid grid-cols-4 gap-3">
                  {chakras.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => setChakra(c)}
                      className={`rounded-2xl px-3 py-3 border bg-white/5 hover:bg-white/10 transition ${
                        chakra === c
                          ? `${chakraStyles[c]} scale-[1.02]`
                          : "border-white/10"
                      }`}
                      title={c}
                    >
                      <div className="text-xs text-gray-300 capitalize">{c}</div>
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm text-gray-300">Note (optional)</label>
                <input
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-2 w-full rounded-xl bg-black/40 border border-white/10 px-4 py-3 outline-none focus:border-purple-400/60"
                  placeholder="How did it feel?"
                />
              </div>

              <button
                disabled={saving}
                className="w-full mt-2 px-8 py-3 rounded-full bg-chakra-gradient text-black font-semibold tracking-wide shadow-[0_0_25px_rgba(168,85,247,0.6)] transition duration-300 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(168,85,247,0.9)] disabled:opacity-60 disabled:hover:scale-100"
              >
                {editingEntry ? "Update entry" : "Save entry"}
              </button>
            </form>
          </div>

          {/* List */}
          <div className="bg-white/5 border border-purple-400/30 rounded-3xl p-8 backdrop-blur-xl shadow-[0_0_40px_rgba(168,85,247,0.25)]">
            <h2 className="text-2xl font-semibold mb-6">Your entries</h2>

            {loadingEntries ? (
              <p className="text-gray-400">Loading...</p>
            ) : entries.length === 0 ? (
              <p className="text-gray-400">No entries yet. Create your first.</p>
            ) : (
              <div className="space-y-4">
                {entries.map((e) => (
                  <div
                    key={e.id}
                    className={`rounded-3xl p-5 border bg-black/30 ${
                      chakraStyles[e.chakra] || "border-white/10"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="text-lg font-semibold capitalize">
                        {e.entry_type} • {e.minutes} min
                      </div>
                      <div className="text-xs text-gray-400 capitalize">
                        {e.chakra}
                      </div>
                    </div>

                    {e.note && (
                      <div className="mt-2 text-gray-300 text-sm">{e.note}</div>
                    )}

                    <div className="mt-3 text-xs text-gray-500">
                      {new Date(e.created_at).toLocaleString()}
                    </div>
                      
                      <div className="mt-4 flex gap-2">
  <button
    onClick={() => handleEdit(e)}
    className="px-4 py-2 rounded-full border border-blue-400/30 bg-blue-500/10 text-blue-200 hover:bg-blue-500/20 transition text-sm"
  >
    Edit
  </button>

  <button
    onClick={() => handleDelete(e.id)}
    className="px-4 py-2 rounded-full border border-red-400/30 bg-red-500/10 text-red-200 hover:bg-red-500/20 transition text-sm"
  >
    Delete
  </button>
</div>
                    </div>
                  
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}