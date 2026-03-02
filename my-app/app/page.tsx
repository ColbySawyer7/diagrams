"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import {
  Database,
  FileCode,
  TrendingUp,
  ScanSearch,
  Brain,
  Sparkles,
  LayoutDashboard,
  Bell,
  Smartphone,
  Sun,
  Moon,
} from "lucide-react";
import { cn } from "@/lib/utils";

const THEME_KEY = "crag-diagram-theme";

function useTheme() {
  const [theme, setThemeState] = useState<"light" | "dark">("light");

  useEffect(() => {
    const stored = localStorage.getItem(THEME_KEY) as "light" | "dark" | null;
    if (stored === "dark" || stored === "light") {
      setThemeState(stored);
      document.documentElement.classList.remove("light", "dark");
      document.documentElement.classList.add(stored);
    } else {
      const dark = typeof window !== "undefined" && window.matchMedia("(prefers-color-scheme: dark)").matches;
      setThemeState(dark ? "dark" : "light");
    }
  }, []);

  const setTheme = (next: "light" | "dark") => {
    setThemeState(next);
    document.documentElement.classList.remove("light", "dark");
    document.documentElement.classList.add(next);
    localStorage.setItem(THEME_KEY, next);
  };

  return [theme, setTheme] as const;
}

/* Data inputs to Crag — primary/purple */
const DATA_SOURCES = [
  { label: "Time-Series Data", icon: Database, angle: 30 },
  { label: "Novel Token Compression", icon: FileCode, angle: 102 },
  { label: "Forecasting", icon: TrendingUp, angle: 174 },
  { label: "Outlier Detection", icon: ScanSearch, angle: 246 },
  { label: "Active Learning", icon: Brain, angle: 318 },
] as const;

/* From PITON app — active/green */
const PITON_NODES = [
  { label: "Insights", icon: Sparkles, angle: 60 },
  { label: "Dashboards", icon: LayoutDashboard, angle: 180 },
  { label: "Alerts", icon: Bell, angle: 300 },
] as const;

/* Crag communicates to end devices — warning/orange */
const DEVICE_NODES = [{ label: "End Devices", icon: Smartphone, angle: 270 }] as const;

function getLinePath(
  fromAngleDeg: number,
  radius: number,
  cx: number,
  cy: number,
  endX: number,
  endY: number
) {
  const rad = (fromAngleDeg * Math.PI) / 180;
  const x1 = cx + radius * Math.cos(rad);
  const y1 = cy + radius * Math.sin(rad);
  return `M ${x1} ${y1} L ${endX} ${endY}`;
}

export default function Home() {
  const size = 600;
  const center = size / 2;
  const dataRadius = 260;
  const pitonRadius = 205;
  const deviceRadius = 205;
  const cragOffsetX = 40;
  const cragOffsetY = 0;
  const cragX = center + cragOffsetX;
  const cragY = center + cragOffsetY;

  const dataPaths = DATA_SOURCES.map((_, i) =>
    getLinePath(DATA_SOURCES[i].angle, dataRadius, center, center, cragX, cragY)
  );
  const pitonPaths = PITON_NODES.map((_, i) =>
    getLinePath(PITON_NODES[i].angle, pitonRadius, center, center, cragX, cragY)
  );
  const devicePaths = DEVICE_NODES.map((_, i) =>
    getLinePath(DEVICE_NODES[i].angle, deviceRadius, center, center, cragX, cragY)
  );

  const [theme, setTheme] = useTheme();

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 font-sans relative"
      style={{ background: "var(--diagram-bg)", color: "var(--diagram-text)" }}
    >
      <div
        className="absolute top-4 right-4 flex items-center gap-1 rounded-full border p-1 shadow-sm"
        style={{ borderColor: "var(--diagram-card-border)", background: "var(--diagram-card-bg)" }}
      >
        <button
          type="button"
          onClick={() => setTheme("light")}
          className="rounded-full p-2 transition-colors hover:opacity-80"
          style={{
            background: theme === "light" ? "hsl(var(--piton-primary) / 0.15)" : "transparent",
          }}
          aria-label="Light mode"
        >
          <Sun className="h-4 w-4" style={{ color: "var(--diagram-text)" }} />
        </button>
        <button
          type="button"
          onClick={() => setTheme("dark")}
          className="rounded-full p-2 transition-colors hover:opacity-80"
          style={{
            background: theme === "dark" ? "hsl(var(--piton-primary) / 0.15)" : "transparent",
          }}
          aria-label="Dark mode"
        >
          <Moon className="h-4 w-4" style={{ color: "var(--diagram-text)" }} />
        </button>
      </div>

      <div className="max-w-xl w-full text-center mb-12">
        <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight mb-2" style={{ color: "var(--foreground)" }}>
          Connect With Your Data
        </h1>
        <p className="text-sm sm:text-base" style={{ color: "var(--diagram-text-muted)" }}>
          Crag sits at the center of your ecosystem—ingesting, understanding,
          and activating your data in real time.
        </p>
      </div>

      <div className="relative" style={{ width: size, height: size }}>
        <svg
          className="absolute inset-0 w-full h-full pointer-events-none"
          viewBox={`0 0 ${size} ${size}`}
        >
          <defs>
            <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--diagram-line)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--diagram-line)" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="lineGradPiton" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--diagram-line-out)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--diagram-line-out)" stopOpacity="0.35" />
            </linearGradient>
            <linearGradient id="lineGradDevice" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="var(--diagram-line-device)" stopOpacity="1" />
              <stop offset="100%" stopColor="var(--diagram-line-device)" stopOpacity="0.35" />
            </linearGradient>
          </defs>
          {dataPaths.map((d, i) => (
            <path
              key={`data-${i}`}
              d={d}
              fill="none"
              stroke="url(#lineGrad)"
              strokeWidth="1.5"
              strokeDasharray="10 8"
              strokeLinecap="round"
              className="animate-flow-in"
              style={{ animationDelay: `${i * 100}ms` }}
            />
          ))}
          {pitonPaths.map((d, i) => (
            <path
              key={`piton-${i}`}
              d={d}
              fill="none"
              stroke="url(#lineGradPiton)"
              strokeWidth="1.25"
              strokeDasharray="8 6"
              strokeLinecap="round"
              className="animate-flow-out"
              style={{ animationDelay: `${(dataPaths.length + i) * 100}ms` }}
            />
          ))}
          {devicePaths.map((d, i) => (
            <path
              key={`device-${i}`}
              d={d}
              fill="none"
              stroke="url(#lineGradDevice)"
              strokeWidth="1.25"
              strokeDasharray="8 6"
              strokeLinecap="round"
              className="animate-flow-in"
              style={{ animationDelay: `${(dataPaths.length + pitonPaths.length + i) * 100}ms` }}
            />
          ))}
        </svg>

        {DATA_SOURCES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = center + dataRadius * Math.cos(rad);
          const y = center + dataRadius * Math.sin(rad);
          const Icon = node.icon;
          return (
            <div
              key={`data-${node.label}`}
              className="absolute flex flex-col items-center gap-2 animate-fade-in"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${i * 120}ms`,
              }}
            >
              <div
                className={cn(
                  "rounded-xl border-2 backdrop-blur-sm",
                  "px-4 py-3 flex flex-col items-center gap-2 min-w-0 max-w-[140px]",
                  "transition-all duration-200 hover:shadow-[0_0_12px_hsl(var(--piton-primary)/.2)]"
                )}
                style={{
                  background: "var(--diagram-card-bg)",
                  borderColor: "var(--diagram-border-primary)",
                  boxShadow: "0 0 0 1px hsl(var(--piton-primary) / 0.15)",
                }}
              >
                <Icon
                  className="w-6 h-6 shrink-0"
                  strokeWidth={1.75}
                  style={{ color: "hsl(var(--piton-primary))" }}
                />
                <span
                  className="text-xs font-medium text-center leading-tight"
                  style={{ color: "var(--diagram-text)" }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        {PITON_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = center + pitonRadius * Math.cos(rad);
          const y = center + pitonRadius * Math.sin(rad);
          const Icon = node.icon;
          return (
            <div
              key={`piton-${node.label}`}
              className="absolute flex flex-col items-center gap-2 animate-fade-in"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${(DATA_SOURCES.length + i) * 120}ms`,
              }}
            >
              <div
                className={cn(
                  "rounded-xl border-2 backdrop-blur-sm",
                  "px-4 py-3 flex flex-col items-center gap-2",
                  "transition-all duration-200 hover:shadow-[0_0_12px_hsl(var(--piton-active)/.25)]"
                )}
                style={{
                  background: "var(--diagram-card-bg)",
                  borderColor: "var(--diagram-border-active)",
                  boxShadow: "0 0 0 1px hsl(var(--piton-active) / 0.12)",
                }}
              >
                <Icon
                  className="w-6 h-6"
                  strokeWidth={1.75}
                  style={{ color: "hsl(var(--piton-active))" }}
                />
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: "var(--diagram-text)" }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        {DEVICE_NODES.map((node, i) => {
          const rad = (node.angle * Math.PI) / 180;
          const x = center + deviceRadius * Math.cos(rad);
          const y = center + deviceRadius * Math.sin(rad);
          const Icon = node.icon;
          return (
            <div
              key={`device-${node.label}`}
              className="absolute flex flex-col items-center gap-2 animate-fade-in"
              style={{
                left: x,
                top: y,
                transform: "translate(-50%, -50%)",
                animationDelay: `${(DATA_SOURCES.length + PITON_NODES.length + i) * 120}ms`,
              }}
            >
              <div
                className={cn(
                  "rounded-xl border-2 backdrop-blur-sm",
                  "px-4 py-3 flex flex-col items-center gap-2",
                  "transition-all duration-200 hover:shadow-[0_0_12px_hsl(var(--piton-warning)/.25)]"
                )}
                style={{
                  background: "var(--diagram-card-bg)",
                  borderColor: "var(--diagram-border-device)",
                  boxShadow: "0 0 0 1px hsl(var(--piton-warning) / 0.15)",
                }}
              >
                <Icon
                  className="w-6 h-6"
                  strokeWidth={1.75}
                  style={{ color: "hsl(var(--piton-warning))" }}
                />
                <span
                  className="text-xs font-medium whitespace-nowrap"
                  style={{ color: "var(--diagram-text)" }}
                >
                  {node.label}
                </span>
              </div>
            </div>
          );
        })}

        <div
          className="absolute flex flex-col items-center justify-center animate-scale-in"
          style={{
            left: cragX,
            top: cragY,
            transform: "translate(-50%, -50%)",
            animationDelay: "180ms",
          }}
        >
          <div
            className={cn(
              "rounded-2xl border-2 backdrop-blur-md",
              "p-4 flex flex-col items-center justify-center",
              "animate-pulse-glow"
            )}
            style={{
              background: "var(--diagram-card-bg)",
              borderColor: "hsl(var(--piton-primary))",
              boxShadow:
                "0 0 0 1px hsl(var(--piton-secondary) / 0.35), inset 0 0 20px hsl(var(--piton-primary) / 0.08)",
            }}
          >
            <Image
              src="/crag.png"
              alt="Crag"
              width={88}
              height={88}
              className="object-contain"
              priority
            />
            <span
              className="mt-1 text-[10px] uppercase tracking-widest font-medium"
              style={{ color: "var(--diagram-text-muted)" }}
            >
              One Brain. All Your Data.
            </span>
          </div>
        </div>
      </div>

      <p
        className="mt-12 text-sm max-w-md text-center"
        style={{ color: "var(--diagram-text-muted)" }}
      >
        Crag is your intelligent data nerve center. It connects to your sensors,
        databases, APIs, and platforms—transforming raw streams into clear,
        actionable insight.
      </p>
    </div>
  );
}
