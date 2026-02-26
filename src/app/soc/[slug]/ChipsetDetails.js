import React from "react";
import Image from "next/image";
import {
  Cpu,
  Gamepad2,
  Zap,
  Wifi,
  Camera,
  Database,
  Microscope,
  BarChart3,
  MonitorSmartphone,
} from "lucide-react";
import Link from "next/link";
import PhoneCard from "@/components/PhoneCard";

// ─── Accent colors per card ───────────────────────────────────────────────────
const CARD_ACCENTS = {
  cpu: { glow: "rgba(59,130,246,0.15)", border: "#3b82f6", text: "#60a5fa" },
  gpu: { glow: "rgba(236,72,153,0.15)", border: "#ec4899", text: "#f472b6" },
  ai: { glow: "rgba(245,158,11,0.15)", border: "#f59e0b", text: "#fbbf24" },
  benchmarks: {
    glow: "rgba(99,102,241,0.15)",
    border: "#6366f1",
    text: "#818cf8",
  },
  memory: { glow: "rgba(16,185,129,0.15)", border: "#10b981", text: "#34d399" },
  connectivity: {
    glow: "rgba(14,165,233,0.15)",
    border: "#0ea5e9",
    text: "#38bdf8",
  },
  multimedia: {
    glow: "rgba(244,63,94,0.15)",
    border: "#f43f5e",
    text: "#fb7185",
  },
};

export default function ChipsetDetails({ chipset }) {
  const { data } = chipset;
  const getSpec = (key) => {
    const section = data.specifications.find((s) => s[key]);
    return section ? section[key] : {};
  };

  const cpu = getSpec("cpu");
  const gpu = getSpec("gpu");
  const benchmarks = getSpec("benchmarks");
  const process = getSpec("process");
  const ai = getSpec("ai_accelerator");

  return (
    <div className="px-3 text-slate-900 font-mono">
      {/* ── HERO ─────────────────────────────────────────────────────────────── */}
      <div className="relative overflow-hidden border-b border-slate-200 bg-white">
        {/* Grid background */}
        <div
          className="absolute inset-0 opacity-[0.035]"
          style={{
            backgroundImage:
              "linear-gradient(#94a3b8 1px,transparent 1px),linear-gradient(90deg,#94a3b8 1px,transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />
        {/* Glow blob */}
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" />
        <div className="relative max-w-7xl mx-auto px-4 py-8 flex flex-col lg:flex-row gap-10 items-center lg:items-start">
          {/* Chip image */}
          <div className="relative shrink-0 self-center">
            <div
              className="w-44 h-44 lg:w-56 lg:h-56 rounded-2xl flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg,#f1f5f9,#e2e8f0)",
                boxShadow:
                  "0 0 0 1px rgba(0,0,0,0.06), 0 0 60px rgba(59,130,246,0.10)",
              }}
            >
              <Image
                src={data.primary_image}
                alt={data.name}
                fill
                className="object-contain p-6"
              />
            </div>
            {/* Corner decorations */}
            <span className="absolute -top-px -left-px w-4 h-4 border-t-2 border-l-2 border-blue-400 rounded-tl-md" />
            <span className="absolute -top-px -right-px w-4 h-4 border-t-2 border-r-2 border-blue-400 rounded-tr-md" />
            <span className="absolute -bottom-px -left-px w-4 h-4 border-b-2 border-l-2 border-blue-400 rounded-bl-md" />
            <span className="absolute -bottom-px -right-px w-4 h-4 border-b-2 border-r-2 border-blue-400 rounded-br-md" />
          </div>

          {/* Info */}
          <div className="flex-1 min-w-0 text-center lg:text-left">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-4">
              <span
                className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded"
                style={{
                  background: "rgba(59,130,246,0.12)",
                  color: "#60a5fa",
                  border: "1px solid rgba(59,130,246,0.25)",
                }}
              >
                {data.brand} · {data.tier.replace("_", " ")}
              </span>
              <span
                className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] rounded"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#6b7280",
                  border: "1px solid rgba(255,255,255,0.08)",
                }}
              >
                {data.announced_year}
              </span>
            </div>

            {/* Name */}
            <h1
              className="text-3xl lg:text-5xl font-black tracking-tight leading-none mb-2 text-slate-900"
              style={{ fontFamily: "'DM Mono', monospace" }}
            >
              {data.name}
            </h1>
            <p className="text-xs text-zinc-500 uppercase tracking-widest mb-8">
              System-on-Chip · Full Specifications
            </p>

            {/* Quick stat bar */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <QuickStat
                icon={<Microscope size={14} />}
                label="Node"
                value={process.process_node || "N/A"}
                accent="#60a5fa"
              />
              <QuickStat
                icon={<Cpu size={14} />}
                label="Cores"
                value={cpu.cores || "Octa"}
                accent="#f472b6"
              />
              <QuickStat
                icon={<Zap size={14} />}
                label="AnTuTu"
                value={benchmarks.antutu_score || "—"}
                accent="#fbbf24"
              />
              <QuickStat
                icon={<Gamepad2 size={14} />}
                label="GPU"
                value={gpu.gpu_name || "Integrated"}
                accent="#818cf8"
              />
            </div>
          </div>
        </div>
      </div>

      {/* ── SPECS GRID ───────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-2 items-start mt-2">
        {/* Left Column: Processing Power */}
        <div className="lg:col-span-2 space-y-2">
          <SpecCard
            title="CPU Architecture"
            icon={<Cpu size={16} />}
            data={cpu}
            accentKey="cpu"
          />
          <SpecCard
            title="Graphics & Gaming"
            icon={<Gamepad2 size={16} />}
            data={gpu}
            accentKey="gpu"
          />
          <SpecCard
            title="Memory & Storage"
            icon={<Database size={16} />}
            data={getSpec("memory")}
            accentKey="memory"
          />
          <SpecCard
            title="Multimedia"
            icon={<Camera size={16} />}
            data={getSpec("multimedia")}
            accentKey="multimedia"
          />
        </div>

        {/* Right Column: Platform & Metrics */}
        <div className="space-y-2">
          <SpecCard
            title="Benchmarks"
            icon={<BarChart3 size={16} />}
            data={benchmarks}
            accentKey="benchmarks"
          />
          <SpecCard
            title="AI Accelerator"
            icon={<Zap size={16} />}
            data={ai}
            accentKey="ai"
          />
          <SpecCard
            title="Connectivity"
            icon={<Wifi size={16} />}
            data={getSpec("connectivity")}
            accentKey="connectivity"
          />
        </div>
      </div>

      {/* ── SIMILAR MOBILES SECTION ─────────────────────────────────────────── */}
      {data.mobiles?.length > 0 && (
        <div className="mt-6">
          {/* Section Header */}
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 whitespace-nowrap">
              Devices Powered by this SoC
            </span>
            <div className="h-px w-full bg-gradient-to-r from-slate-200 to-transparent" />
          </div>

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-3 xl-grid-cols-3 gap-2">
            {data.mobiles.map((mobile) => (
              <PhoneCard phone={mobile} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

// ─── QuickStat ────────────────────────────────────────────────────────────────
function QuickStat({ icon, label, value, accent }) {
  return (
    <div
      className="rounded-xl p-3 flex flex-col gap-1.5"
      style={{
        background: "rgba(0,0,0,0.03)",
        border: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <div className="flex items-center gap-1.5" style={{ color: accent }}>
        {icon}
        <span className="text-[9px] uppercase tracking-widest font-bold text-zinc-500">
          {label}
        </span>
      </div>
      <div
        className="text-sm font-black leading-tight truncate"
        style={{ color: accent }}
      >
        {value}
      </div>
    </div>
  );
}

// ─── SpecCard ─────────────────────────────────────────────────────────────────
function SpecCard({ title, icon, data, accentKey }) {
  const entries = Object.entries(data || {}).filter(([_, v]) => v !== null);
  const accent = CARD_ACCENTS[accentKey] ?? CARD_ACCENTS.cpu;

  return (
    <div
      className="rounded-xl overflow-hidden"
      style={{
        background: "linear-gradient(160deg,#ffffff,#f8fafc)",
        border: `1px solid rgba(0,0,0,0.07)`,
        boxShadow: `0 1px 12px rgba(0,0,0,0.05)`,
      }}
    >
      {/* Thin accent line at top */}
      <div
        className="h-[2px] w-full"
        style={{ background: accent.border, opacity: 0.7 }}
      />

      {/* Header */}
      <div
        className="px-5 py-3.5 flex items-center gap-3"
        style={{ borderBottom: "1px solid rgba(0,0,0,0.06)" }}
      >
        <div
          className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
          style={{ background: accent.glow, color: accent.text }}
        >
          {icon}
        </div>
        <span
          className="text-xs font-bold uppercase tracking-widest"
          style={{ color: accent.text }}
        >
          {title}
        </span>
      </div>

      {/* Rows */}
      {entries.length > 0 ? (
        <dl>
          {entries.map(([key, value], i) => (
            <div
              key={key}
              className="flex items-center justify-between px-5 py-2.5 gap-6 group transition-colors duration-150"
              style={{
                borderBottom:
                  i < entries.length - 1
                    ? "1px solid rgba(0,0,0,0.05)"
                    : "none",
              }}
            >
              <dt className="text-[11px] text-slate-400 font-medium capitalize shrink-0 tracking-wide">
                {key.replace(/_/g, " ")}
              </dt>
              <dd
                className="text-[11px] font-bold text-right leading-snug max-w-[58%]"
                style={{ color: "#1e293b" }}
              >
                {Array.isArray(value) ? value.join(", ") : String(value)}
              </dd>
            </div>
          ))}
        </dl>
      ) : (
        <p className="px-5 py-8 text-center text-[11px] text-zinc-600 italic">
          No data available.
        </p>
      )}
    </div>
  );
}
