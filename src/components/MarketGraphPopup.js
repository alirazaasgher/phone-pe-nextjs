import { useEffect, useRef } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
);

// Derive scores from price if missing (normalized 0–100)
function deriveScores(peers) {
  if (!peers?.length) return [];
  const hasSc = peers.every((p) => typeof p.score === "number");
  if (hasSc) return peers;
  const prices = peers.map((p) => p.price);
  const min = Math.min(...prices);
  const max = Math.max(...prices);
  return peers.map((p) => ({
    ...p,
    // Higher price = higher score (proxy for flagship tier)
    score:
      max === min ? 75 : Math.round(((p.price - min) / (max - min)) * 40 + 55),
  }));
}

export default function MarketGraphPopup({
  isOpen,
  onClose,
  marketData,
  primaryPhoneName,
}) {
  const backdropRef = useRef(null);

  // Close on backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === backdropRef.current) onClose();
  };

  // Close on Escape
  useEffect(() => {
    if (!isOpen) return;
    const handler = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  if (!isOpen || !marketData) return null;

  const peers = deriveScores(marketData.peers ?? []);
  const primary = peers.find((p) => p.name === primaryPhoneName);
  const competitors = peers.filter((p) => p.name !== primaryPhoneName);

  // Sort: primary first, then by score desc
  const sorted = [
    ...(primary ? [primary] : []),
    ...[...competitors].sort((a, b) => b.score - a.score),
  ];

  const maxScore = Math.max(...sorted.map((p) => p.score), 100);

  const chartData = {
    labels: sorted.map((p) => p.name),
    datasets: [
      {
        label: "Score",
        data: sorted.map((p) => p.score),
        backgroundColor: sorted.map((p) =>
          p.name === primaryPhoneName
            ? "rgba(59,130,246,0.95)"
            : "rgba(226,232,240,0.7)",
        ),
        borderRadius: 8,
        borderSkipped: false,
        maxBarThickness: 48,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    animation: { duration: 600, easing: "easeOutQuart" },
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "#1e293b",
        titleColor: "#94a3b8",
        bodyColor: "#f1f5f9",
        padding: 12,
        cornerRadius: 10,
        callbacks: {
          title: (ctx) => sorted[ctx[0].dataIndex].name,
          label: (ctx) => {
            const p = sorted[ctx.dataIndex];
            return [`  Score: ${p.score}/100`, `  Price: $${p.price}`];
          },
        },
      },
    },
    scales: {
      x: {
        grid: { display: false },
        border: { display: false },
        ticks: {
          color: "#94a3b8",
          font: { size: 11, family: "'DM Mono', monospace" },
          maxRotation: 0,
        },
      },
      y: {
        beginAtZero: true,
        max: Math.ceil(maxScore / 10) * 10 + 10,
        grid: { color: "rgba(148,163,184,0.1)" },
        border: { display: false },
        ticks: {
          color: "#64748b",
          font: { size: 10 },
          stepSize: 20,
        },
      },
    },
  };

  return (
    <>
      {/* Backdrop */}
      <div
        ref={backdropRef}
        onClick={handleBackdropClick}
        style={{
          position: "fixed",
          inset: 0,
          background: "rgba(2,6,23,0.6)",
          backdropFilter: "blur(4px)",
          zIndex: 1000,
          display: "flex",
          alignItems: "flex-end",
          justifyContent: "center",
          padding: "0",
          animation: "fadeIn 0.2s ease",
        }}
      >
        {/* Sheet */}
        <div
          style={{
            background: "#0f172a",
            borderRadius: "20px 20px 0 0",
            width: "100%",
            maxWidth: 560,
            padding: "28px 24px 32px",
            boxShadow: "0 -8px 40px rgba(0,0,0,0.4)",
            animation: "slideUp 0.3s cubic-bezier(0.34,1.56,0.64,1)",
            position: "relative",
          }}
        >
          {/* Header */}
          <div
            style={{
              display: "flex",
              alignItems: "flex-start",
              justifyContent: "space-between",
              marginBottom: 20,
            }}
          >
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 4,
                }}
              >
                <span
                  style={{
                    background: "rgba(59,130,246,0.15)",
                    color: "#60a5fa",
                    fontSize: 10,
                    fontWeight: 700,
                    letterSpacing: "0.08em",
                    padding: "3px 8px",
                    borderRadius: 99,
                    textTransform: "uppercase",
                    fontFamily: "'DM Mono', monospace",
                  }}
                >
                  Chipset Audit
                </span>
              </div>
              <h2
                style={{
                  margin: 0,
                  color: "#f1f5f9",
                  fontSize: 18,
                  fontWeight: 700,
                  fontFamily: "'DM Sans', sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                {marketData.chipset_name ?? "Chipset"}
              </h2>
              <p
                style={{
                  margin: "4px 0 0",
                  color: "#64748b",
                  fontSize: 13,
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Performance in this price bracket
              </p>
            </div>

            <button
              onClick={onClose}
              aria-label="Close"
              style={{
                background: "#1e293b",
                border: "none",
                borderRadius: 10,
                width: 34,
                height: 34,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "#94a3b8",
                fontSize: 16,
                flexShrink: 0,
              }}
            >
              ✕
            </button>
          </div>

          {/* Chart */}
          <div style={{ height: 180, marginBottom: 20 }}>
            <Bar data={chartData} options={options} />
          </div>

          {/* Legend + peer list */}
          <div style={{ display: "flex", gap: 16, marginBottom: 20 }}>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#94a3b8",
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: "#3b82f6",
                  display: "inline-block",
                }}
              />
              Selected
            </span>
            <span
              style={{
                display: "flex",
                alignItems: "center",
                gap: 6,
                color: "#94a3b8",
                fontSize: 12,
                fontFamily: "'DM Mono', monospace",
              }}
            >
              <span
                style={{
                  width: 10,
                  height: 10,
                  borderRadius: 3,
                  background: "#334155",
                  display: "inline-block",
                }}
              />
              Competitors
            </span>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;600;700&family=DM+Mono:wght@400;600&display=swap');
      `}</style>
    </>
  );
}
