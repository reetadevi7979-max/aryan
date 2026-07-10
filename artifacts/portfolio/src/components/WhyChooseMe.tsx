import { useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useMotionTemplate,
  useMotionValueEvent,
} from "framer-motion";

// ─── Types ────────────────────────────────────────────────────────────────────
interface StepData {
  step: string;
  headline: string[];
  sub: string;
  tags: string[];
  accent: string;
}

// ─── Frame sequences — 4 Unsplash frames per step ────────────────────────────
const FRAMES: string[][] = [
  // Step 1 — Speed: circuit / light trails / data center
  [
    "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&q=80&fit=crop",
  ],
  // Step 2 — Precision: design tools / UI interfaces
  [
    "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1547658719-da2b51169166?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&q=80&fit=crop",
  ],
  // Step 3 — AI: neural / generative / network
  [
    "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1655393001768-d946c97d6fd1?w=1200&q=80&fit=crop",
    "https://images.unsplash.com/photo-1504639725590-34d0984388bd?w=1200&q=80&fit=crop",
  ],
];

const STEPS: StepData[] = [
  {
    step: "01",
    headline: ["Speed &", "Conversion", "First."],
    sub: "Every millisecond costs you money. Sites I build load in under 2 s, ace Core Web Vitals, and are engineered from pixel one to turn visitors into paying clients.",
    tags: ["< 2 s Load", "Core Web Vitals A+", "CRO-Engineered"],
    accent: "oklch(0.65 0.22 250)",
  },
  {
    step: "02",
    headline: ["Obsessive", "Pixel", "Precision."],
    sub: "Spacing, kerning, contrast, motion — nothing ships until it's exactly right. I design at the pixel level until every UI feels like it was carved from glass.",
    tags: ["Pixel-Perfect UI", "Design Systems", "Motion-Native"],
    accent: "oklch(0.72 0.18 200)",
  },
  {
    step: "03",
    headline: ["Deep Custom", "AI", "Integrations."],
    sub: "Not just ChatGPT buttons. I wire real AI flows — personalization engines, smart forms, content pipelines — woven directly into your product's core experience.",
    tags: ["LLM-Powered", "Smart Automation", "Custom Pipelines"],
    accent: "oklch(0.68 0.20 280)",
  },
];

// ─── SVG Overlay 1 — Speed / Node-graph + Speedometer ────────────────────────
function SpeedViz({ p }: { p: number }) {
  const cx = 210, cy = 200, r = 88;
  const startDeg = -135;
  const currentDeg = startDeg + p * 270;
  const startRad = (startDeg * Math.PI) / 180;
  const currentRad = (currentDeg * Math.PI) / 180;
  const sx = cx + r * Math.cos(startRad);
  const sy = cy + r * Math.sin(startRad);
  const nx = cx + r * Math.cos(currentRad);
  const ny = cy + r * Math.sin(currentRad);
  // track end at +135°
  const endRad = (135 * Math.PI) / 180;
  const ex = cx + r * Math.cos(endRad);
  const ey = cy + r * Math.sin(endRad);
  const largeFill = p * 270 > 180 ? 1 : 0;

  const nodes: [number, number][] = [
    [52, 55], [152, 32], [288, 58], [348, 118], [200, 160], [72, 168], [342, 210],
  ];
  const edges: [number, number][] = [[0,1],[1,2],[2,3],[3,4],[4,5],[1,4],[2,5],[3,6]];

  return (
    <svg viewBox="0 0 420 300" fill="none" className="w-full h-full">
      {/* Connections */}
      {edges.map(([a, b], i) => (
        <line key={i}
          x1={nodes[a][0]} y1={nodes[a][1]}
          x2={nodes[b][0]} y2={nodes[b][1]}
          stroke={`oklch(0.65 0.22 250 / ${0.15 + p * 0.45})`}
          strokeWidth="1.2" strokeDasharray="6 4"
        />
      ))}
      {/* Nodes */}
      {nodes.map(([x, y], i) => (
        <g key={i}>
          {i === 0 && (
            <circle cx={x} cy={y} r="18"
              stroke={`oklch(0.65 0.22 250 / ${0.3 * p})`}
              strokeWidth="1" fill="none"
            />
          )}
          <circle cx={x} cy={y} r={i === 0 ? 10 : 6}
            fill="oklch(0.65 0.22 250 / 0.14)"
            stroke="oklch(0.78 0.16 250 / 0.9)"
            strokeWidth="1.5"
          >
            <animate
              attributeName="r"
              values={`${i === 0 ? 10 : 6};${i === 0 ? 13 : 8};${i === 0 ? 10 : 6}`}
              dur={`${1.3 + i * 0.19}s`}
              repeatCount="indefinite"
            />
          </circle>
        </g>
      ))}
      {/* Speedometer track */}
      <path
        d={`M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 1 1 ${ex.toFixed(2)} ${ey.toFixed(2)}`}
        stroke="oklch(1 0 0 / 0.06)" strokeWidth="16" strokeLinecap="round" fill="none"
      />
      {/* Speedometer fill */}
      {p > 0.015 && (
        <path
          d={`M ${sx.toFixed(2)} ${sy.toFixed(2)} A ${r} ${r} 0 ${largeFill} 1 ${nx.toFixed(2)} ${ny.toFixed(2)}`}
          stroke="oklch(0.65 0.22 250)"
          strokeWidth="16" strokeLinecap="round" fill="none"
          style={{ filter: "drop-shadow(0 0 12px oklch(0.65 0.22 250 / 0.75))" }}
        />
      )}
      {/* Tick marks */}
      {[0, 0.25, 0.5, 0.75, 1].map((t, i) => {
        const a = (startDeg + t * 270) * Math.PI / 180;
        return (
          <line key={i}
            x1={cx + (r - 11) * Math.cos(a)} y1={cy + (r - 11) * Math.sin(a)}
            x2={cx + (r + 3) * Math.cos(a)}  y2={cy + (r + 3) * Math.sin(a)}
            stroke={`oklch(1 0 0 / ${t <= p ? 0.5 : 0.12})`}
            strokeWidth="2" strokeLinecap="round"
          />
        );
      })}
      {/* Needle */}
      <line
        x1={cx} y1={cy}
        x2={nx.toFixed(2)} y2={ny.toFixed(2)}
        stroke="oklch(0.92 0.08 245)" strokeWidth="2.5" strokeLinecap="round"
        style={{ filter: "drop-shadow(0 0 6px oklch(0.92 0.08 245 / 0.9))" }}
      />
      <circle cx={cx} cy={cy} r="6"
        fill="oklch(0.12 0.02 250)" stroke="oklch(0.78 0.16 250 / 0.6)" strokeWidth="1.5"
      />
      {/* Score */}
      <text x={cx} y={cy + 52} textAnchor="middle"
        fill="white" fontSize="28" fontWeight="700" fontFamily="Satoshi, sans-serif"
        opacity={Math.min(1, p * 2.5)}
      >
        {Math.round(p * 100)}
      </text>
      <text x={cx} y={cy + 68} textAnchor="middle"
        fill="oklch(0.78 0.16 250)" fontSize="8" fontFamily="monospace" letterSpacing="0.2em"
      >
        PERF SCORE
      </text>
    </svg>
  );
}

// ─── SVG Overlay 2 — Precision / Wireframe UI with zoom + ruler ──────────────
function PrecisionViz({ p }: { p: number }) {
  const zoom = 1 + p * 0.52;
  const panY = p * -6;

  return (
    <svg viewBox="0 0 420 300" fill="none" className="w-full h-full">
      {/* Background grid */}
      {Array.from({ length: 9 }).map((_, i) => (
        <g key={i}>
          <line x1={i * 52.5} y1={0} x2={i * 52.5} y2={300} stroke="oklch(1 0 0 / 0.035)" strokeWidth="1" />
          <line x1={0} y1={i * 37.5} x2={420} y2={i * 37.5} stroke="oklch(1 0 0 / 0.035)" strokeWidth="1" />
        </g>
      ))}

      {/* Zooming UI card */}
      <g style={{ transform: `translate(0,${panY}px) scale(${zoom})`, transformOrigin: "210px 150px" }}>
        {/* Card */}
        <rect x="82" y="48" width="256" height="190" rx="14"
          stroke="oklch(0.72 0.18 200 / 0.65)" strokeWidth="1.5"
          fill="oklch(0.72 0.18 200 / 0.04)"
        />
        {/* Title bar */}
        <rect x="82" y="48" width="256" height="38" rx="14"
          fill="oklch(0.72 0.18 200 / 0.09)"
        />
        <rect x="82" y="70" width="256" height="16" fill="oklch(0.72 0.18 200 / 0.04)" />
        {/* Traffic lights */}
        {[0, 1, 2].map((d) => (
          <circle key={d} cx={100 + d * 16} cy={67} r="4.5"
            fill={d === 0 ? "oklch(0.65 0.24 25 / 0.75)" : d === 1 ? "oklch(0.72 0.2 80 / 0.75)" : "oklch(0.65 0.22 145 / 0.75)"}
          />
        ))}
        {/* Content */}
        <rect x="102" y="100" width="118" height="9" rx="4" fill="oklch(0.72 0.18 200 / 0.8)" />
        <rect x="102" y="115" width="192" height="5" rx="2" fill="oklch(1 0 0 / 0.18)" />
        <rect x="102" y="125" width="165" height="5" rx="2" fill="oklch(1 0 0 / 0.13)" />
        <rect x="102" y="135" width="140" height="5" rx="2" fill="oklch(1 0 0 / 0.08)" />
        {/* Image placeholder */}
        <rect x="244" y="98" width="76" height="64" rx="8"
          fill="oklch(0.72 0.18 200 / 0.1)" stroke="oklch(0.72 0.18 200 / 0.3)" strokeWidth="1"
        />
        <line x1="244" y1="98" x2="320" y2="162" stroke="oklch(0.72 0.18 200 / 0.2)" strokeWidth="1" />
        <line x1="320" y1="98" x2="244" y2="162" stroke="oklch(0.72 0.18 200 / 0.2)" strokeWidth="1" />
        {/* Buttons */}
        <rect x="102" y="158" width="78" height="28" rx="8" fill="oklch(0.72 0.18 200 / 0.85)" />
        <rect x="190" y="158" width="78" height="28" rx="8"
          stroke="oklch(0.72 0.18 200 / 0.5)" strokeWidth="1.5" fill="none"
        />
        {/* Divider + footer */}
        <line x1="82" y1="210" x2="338" y2="210" stroke="oklch(0.72 0.18 200 / 0.18)" strokeWidth="1" />
        <rect x="102" y="218" width="52" height="5" rx="2" fill="oklch(1 0 0 / 0.07)" />
        <rect x="270" y="218" width="52" height="5" rx="2" fill="oklch(1 0 0 / 0.07)" />
      </g>

      {/* Measurement overlay (fades in with scroll) */}
      <g opacity={Math.min(1, p * 2)}>
        {/* Top dimension */}
        <line x1="82" y1="34" x2="338" y2="34" stroke="oklch(0.72 0.18 200 / 0.5)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="82" y1="30" x2="82" y2="38"   stroke="oklch(0.72 0.18 200 / 0.8)" strokeWidth="1.5" />
        <line x1="338" y1="30" x2="338" y2="38" stroke="oklch(0.72 0.18 200 / 0.8)" strokeWidth="1.5" />
        <rect x="168" y="24" width="84" height="16" rx="4" fill="oklch(0.12 0.02 250 / 0.85)" />
        <text x="210" y="35" textAnchor="middle" fill="oklch(0.72 0.18 200)" fontSize="9" fontFamily="monospace">256px wide</text>
        {/* Left dimension */}
        <line x1="66" y1="48" x2="66" y2="238" stroke="oklch(0.72 0.18 200 / 0.5)" strokeWidth="1" strokeDasharray="3 2" />
        <line x1="62" y1="48"  x2="70" y2="48"  stroke="oklch(0.72 0.18 200 / 0.8)" strokeWidth="1.5" />
        <line x1="62" y1="238" x2="70" y2="238" stroke="oklch(0.72 0.18 200 / 0.8)" strokeWidth="1.5" />
        <text x="56" y="148" textAnchor="middle" fill="oklch(0.72 0.18 200)" fontSize="8" fontFamily="monospace"
          transform="rotate(-90,56,148)">190px</text>
        {/* Corner crosshair */}
        <circle cx="338" cy="48" r="3.5" fill="oklch(0.72 0.18 200 / 0.8)" />
        <line x1="338" y1="42" x2="338" y2="54" stroke="oklch(0.72 0.18 200 / 0.5)" strokeWidth="1" />
        <line x1="332" y1="48" x2="344" y2="48" stroke="oklch(0.72 0.18 200 / 0.5)" strokeWidth="1" />
      </g>

      {/* Zoom badge */}
      <g opacity={Math.min(1, p * 3)}>
        <rect x="4" y="4" width="78" height="18" rx="5"
          fill="oklch(0.10 0.02 250 / 0.9)" stroke="oklch(0.72 0.18 200 / 0.35)" strokeWidth="1"
        />
        <text x="12" y="16" fill="oklch(0.72 0.18 200)" fontSize="8.5" fontFamily="monospace">
          {zoom.toFixed(2)}× zoom
        </text>
      </g>
      <text x="6" y="296" fill="oklch(1 0 0 / 0.18)" fontSize="8" fontFamily="monospace">1px grid active</text>
    </svg>
  );
}

// ─── SVG Overlay 3 — AI / Neural network mesh ─────────────────────────────────
function AINetworkViz({ p }: { p: number }) {
  type Pt = [number, number];
  const layers: Pt[][] = [
    [[72, 68], [72, 148], [72, 225]],
    [[188, 44], [188, 105], [188, 164], [188, 222]],
    [[302, 72], [302, 148], [302, 222]],
    [[388, 148]],
  ];

  type Conn = { x1: number; y1: number; x2: number; y2: number; idx: number };
  const conns: Conn[] = [];
  let ci = 0;
  for (let l = 0; l < layers.length - 1; l++) {
    for (const [ax, ay] of layers[l]) {
      for (const [bx, by] of layers[l + 1]) {
        conns.push({ x1: ax, y1: ay, x2: bx, y2: by, idx: ci++ });
      }
    }
  }

  return (
    <svg viewBox="0 0 420 300" fill="none" className="w-full h-full">
      {/* Connections */}
      {conns.map((c) => {
        const phase = (c.idx * 0.073 + p * 1.4) % 1;
        const on = phase > 0.44;
        return (
          <line key={c.idx}
            x1={c.x1} y1={c.y1} x2={c.x2} y2={c.y2}
            stroke={`oklch(0.65 0.22 250 / ${on ? 0.55 : 0.08})`}
            strokeWidth={on ? 1.6 : 0.7}
          />
        );
      })}

      {/* Nodes */}
      {layers.map((layer, li) =>
        layer.map(([x, y], ni) => {
          const isOut = li === 3;
          const col = isOut ? "oklch(0.88 0.12 245)" : "oklch(0.78 0.16 250)";
          const gr = isOut ? 13 : 9;
          const dur = `${1.3 + li * 0.25 + ni * 0.18}s`;
          return (
            <g key={`${li}-${ni}`}>
              {/* Outer ring */}
              <circle cx={x} cy={y} r={gr + 9}
                stroke={`${col.slice(0, -1)} / ${0.18 * p})`}
                strokeWidth="1" fill="none"
              >
                <animate attributeName="r" values={`${gr+9};${gr+15};${gr+9}`} dur={dur} repeatCount="indefinite" />
              </circle>
              {/* Main node */}
              <circle cx={x} cy={y} r={gr}
                fill={`oklch(0.65 0.22 250 / ${0.08 + p * 0.12})`}
                stroke={`${col.slice(0, -1)} / 0.88)`}
                strokeWidth="1.5"
                style={{ filter: `drop-shadow(0 0 ${isOut ? 14 : 8}px ${col.slice(0, -1)} / ${0.5 + p * 0.35}))` }}
              >
                <animate attributeName="r" values={`${gr};${gr+2};${gr}`} dur={dur} repeatCount="indefinite" />
              </circle>
              {isOut && (
                <text x={x} y={y + 4} textAnchor="middle" fill="white" fontSize="6.5" fontFamily="monospace">AI</text>
              )}
            </g>
          );
        })
      )}

      {/* Layer labels */}
      {(["INPUT", "HIDDEN ×2", "OUTPUT", "MODEL"] as const).map((lbl, li) => {
        const xs = [72, 188, 302, 388];
        return (
          <text key={lbl} x={xs[li]} y={268} textAnchor="middle"
            fill="oklch(1 0 0 / 0.22)" fontSize="7.5" fontFamily="monospace"
          >{lbl}</text>
        );
      })}

      {/* Travelling signal packet A */}
      <circle r="5" fill="oklch(0.88 0.12 245)"
        style={{ filter: "drop-shadow(0 0 10px oklch(0.78 0.16 250))" }}
      >
        <animateMotion dur="2s" repeatCount="indefinite"
          path="M 72,148 C 130,100 140,160 188,105 C 245,48 255,162 302,148 C 344,134 360,148 388,148"
        />
      </circle>
      {/* Travelling signal packet B */}
      <circle r="3.5" fill="oklch(0.78 0.16 250 / 0.65)"
        style={{ filter: "drop-shadow(0 0 6px oklch(0.65 0.22 250))" }}
      >
        <animateMotion dur="2s" begin="1s" repeatCount="indefinite"
          path="M 72,68 C 130,58 140,50 188,44 C 244,38 254,76 302,72 C 345,68 364,108 388,148"
        />
      </circle>

      {/* Accuracy badge — appears mid-scroll */}
      <g opacity={Math.min(1, Math.max(0, (p - 0.35) * 4))}>
        <rect x="308" y="92" width="66" height="16" rx="5"
          fill="oklch(0.10 0.02 250 / 0.88)" stroke="oklch(0.68 0.20 280 / 0.45)" strokeWidth="1"
        />
        <text x="341" y="103" textAnchor="middle" fill="oklch(0.78 0.16 250)" fontSize="7.5" fontFamily="monospace">99.2% acc.</text>
      </g>
    </svg>
  );
}

// ─── Shared step text content ─────────────────────────────────────────────────
function StepText({ data }: { data: StepData }) {
  return (
    <div className="max-w-xl">
      <p className="label-tiny mb-4" style={{ color: data.accent }}>
        {data.step} — Why Choose Me
      </p>
      <h2
        className="font-bold leading-[1.0] tracking-[-0.04em] mb-6"
        style={{ fontSize: "clamp(36px, 6.5vw, 90px)" }}
      >
        {data.headline.map((line, i) => (
          <span key={i} className={`block${i === 1 ? " text-gradient" : ""}`}>{line}</span>
        ))}
      </h2>
      <p className="text-foreground/65 text-base md:text-lg leading-[1.74] max-w-md mb-8">
        {data.sub}
      </p>
      <div className="flex flex-wrap gap-2">
        {data.tags.map((tag) => (
          <span
            key={tag}
            className="px-3 py-1.5 rounded-full text-[10.5px] font-semibold tracking-[0.07em] uppercase"
            style={{
              background: `${data.accent.replace("oklch(", "oklch(").replace(")", " / 0.12)")}`,
              border: `1px solid ${data.accent.replace(")", " / 0.32)")}`,
              color: data.accent,
            }}
          >
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export function WhyChooseMe() {
  const containerRef = useRef<HTMLDivElement>(null);

  const [activeStep, setActiveStep] = useState(0);
  const [frameIdx, setFrameIdx] = useState(0);
  const [vizProgress, setVizProgress] = useState(0);

  // Track previous discrete values so we only commit state when they change,
  // keeping scroll-time re-renders to a minimum on the heavy visual tree.
  const prevStepRef  = useRef(0);
  const prevFrameRef = useRef(0);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const smooth = useSpring(scrollYProgress, { stiffness: 58, damping: 18, mass: 0.5 });

  useMotionValueEvent(smooth, "change", (v) => {
    const step = v < 1 / 3 ? 0 : v < 2 / 3 ? 1 : 2;
    const localP = Math.min(
      1,
      Math.max(
        0,
        step === 0 ? v * 3 : step === 1 ? (v - 1 / 3) * 3 : (v - 2 / 3) * 3.04,
      ),
    );
    const frame = Math.min(3, Math.floor(localP * 4));

    // Only commit discrete state when values actually change to minimize re-renders
    if (step !== prevStepRef.current) {
      prevStepRef.current = step;
      setActiveStep(step);
    }
    if (frame !== prevFrameRef.current) {
      prevFrameRef.current = frame;
      setFrameIdx(frame);
    }
    // vizProgress updates every frame for smooth SVG animation (intentional)
    setVizProgress(localP);
  });

  // ── Step 1 — HORIZONTAL SLIDE ──────────────────────────────────────────────
  const s1op = useTransform(smooth, [0, 0.04, 0.27, 0.34], [0, 1, 1, 0]);
  const s1x  = useTransform(smooth, [0, 0.04, 0.27, 0.34], [96, 0, 0, -96]);

  // ── Step 2 — 3D ROTATE (Y-axis perspective flip) ───────────────────────────
  const s2op    = useTransform(smooth, [0.34, 0.42, 0.60, 0.67], [0, 1, 1, 0]);
  const s2rotY  = useTransform(smooth, [0.34, 0.42, 0.60, 0.67], [58, 0, 0, -58]);
  const s2scale = useTransform(smooth, [0.34, 0.42], [0.88, 1.0]);

  // ── Step 3 — EMERGE (blur + lift + scale) ─────────────────────────────────
  const s3op       = useTransform(smooth, [0.67, 0.78, 0.93, 1], [0, 1, 1, 1]);
  const s3y        = useTransform(smooth, [0.67, 0.78], [72, 0]);
  const s3scale    = useTransform(smooth, [0.67, 0.78], [0.84, 1.0]);
  const s3blurNum  = useTransform(smooth, [0.67, 0.78], [22, 0]);
  const s3blur     = useMotionTemplate`blur(${s3blurNum}px)`;

  // ── Background image crossfade ─────────────────────────────────────────────
  const bgOp0 = useTransform(smooth, [0, 0.04, 0.30, 0.38], [0.55, 1, 1, 0]);
  const bgOp1 = useTransform(smooth, [0.32, 0.40, 0.62, 0.68], [0, 1, 1, 0]);
  const bgOp2 = useTransform(smooth, [0.64, 0.72, 1], [0, 1, 1]);

  // Ken Burns per step
  const kb0 = useTransform(smooth, [0, 0.35], [1.0, 1.13]);
  const kb1 = useTransform(smooth, [0.33, 0.68], [1.0, 1.10]);
  const kb2 = useTransform(smooth, [0.66, 1.0], [1.0, 1.08]);

  // Progress track (vertical bar)
  const trackH = useTransform(smooth, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={containerRef}
      aria-label="Why Choose Me"
      style={{ height: "300vh" }}
      className="relative"
    >
      {/* ── Sticky viewport ───────────────────────────────────────────────── */}
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Blend into surrounding dark sections */}
        <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-20 z-20"
          style={{ background: "linear-gradient(to bottom, oklch(0.04 0.01 260), transparent)" }}
        />
        <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 h-20 z-20"
          style={{ background: "linear-gradient(to top, oklch(0.04 0.01 260), transparent)" }}
        />

        <div className="h-full flex flex-col md:grid md:grid-cols-2">

          {/* ──────────────────────────────────────────────────────────────── */}
          {/* LEFT — Typography panel                                          */}
          {/* ──────────────────────────────────────────────────────────────── */}
          <div
            className="relative flex flex-col justify-center overflow-hidden order-2 md:order-1 min-h-[50vh] md:min-h-0"
            style={{ perspective: "1400px" }}
          >
            {/* Section label — top */}
            <div className="absolute top-8 left-8 md:left-12 lg:left-16 z-10">
              <p className="label-tiny">Why Choose Me</p>
            </div>

            {/* Mobile step dots */}
            <div className="absolute top-8 right-8 flex gap-2 md:hidden z-10">
              {STEPS.map((s, i) => (
                <div key={i}
                  className="h-1 rounded-full transition-all duration-500"
                  style={{
                    width: i === activeStep ? 32 : 8,
                    background: i === activeStep ? s.accent : "oklch(1 0 0 / 0.18)",
                  }}
                />
              ))}
            </div>

            {/* Desktop vertical progress track */}
            <div className="absolute hidden md:block right-0 top-[15%] bottom-[15%] w-[1px] bg-white/[0.05] z-10">
              <motion.div
                className="absolute top-0 left-0 right-0 rounded-full"
                style={{
                  height: trackH,
                  background: `linear-gradient(to bottom, ${STEPS[activeStep].accent}, oklch(0.78 0.16 250))`,
                  boxShadow: `0 0 8px ${STEPS[activeStep].accent.replace(")", " / 0.6)")}`,
                  transition: "background 0.5s, box-shadow 0.5s",
                }}
              />
            </div>

            {/* ── STEP 1 TEXT — HORIZONTAL SLIDE ──────────────────────────── */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-16"
              style={{ opacity: s1op, x: s1x }}
            >
              <StepText data={STEPS[0]} />
            </motion.div>

            {/* ── STEP 2 TEXT — 3D ROTATE ─────────────────────────────────── */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-16"
              style={{ opacity: s2op, rotateY: s2rotY, scale: s2scale }}
            >
              <StepText data={STEPS[1]} />
            </motion.div>

            {/* ── STEP 3 TEXT — EMERGE FROM BLUR ──────────────────────────── */}
            <motion.div
              className="absolute inset-0 flex flex-col justify-center px-8 md:px-12 lg:px-16 pt-16"
              style={{
                opacity: s3op,
                y: s3y,
                scale: s3scale,
                filter: s3blur as any,
              }}
            >
              <StepText data={STEPS[2]} />
            </motion.div>

            {/* Desktop bottom — step counter + progress dashes */}
            <div className="absolute bottom-10 left-8 md:left-12 lg:left-16 hidden md:flex items-center gap-3 z-10">
              <span className="text-[13px] font-bold tracking-[0.14em]"
                style={{ color: STEPS[activeStep].accent, transition: "color 0.5s" }}>
                {STEPS[activeStep].step}
              </span>
              <span className="text-[11px] text-foreground/28">/ 03</span>
              <div className="flex gap-1.5 ml-1">
                {STEPS.map((s, i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-500"
                    style={{
                      width: i === activeStep ? 32 : 8,
                      background: i === activeStep ? s.accent : "oklch(1 0 0 / 0.15)",
                    }}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* ──────────────────────────────────────────────────────────────── */}
          {/* RIGHT — Cinematic visual player                                  */}
          {/* ──────────────────────────────────────────────────────────────── */}
          <div className="relative overflow-hidden order-1 md:order-2 min-h-[50vh] md:min-h-0">

            {/* ── Background images (3 steps × 4 frames) ───────────────── */}
            {([bgOp0, bgOp1, bgOp2] as const).map((bgOp, si) => (
              <motion.div key={si} className="absolute inset-0" style={{ opacity: bgOp }}>
                <motion.div className="absolute inset-0" style={{ scale: [kb0, kb1, kb2][si] }}>
                  {FRAMES[si].map((src, fi) => (
                    <img
                      key={fi} src={src} alt="" loading="lazy"
                      className="absolute inset-0 w-full h-full object-cover"
                      style={{ opacity: fi === frameIdx ? 1 : 0, transition: "opacity 0.32s ease" }}
                    />
                  ))}
                </motion.div>
              </motion.div>
            ))}

            {/* ── Overlays ─────────────────────────────────────────────── */}
            {/* Edge gradient — blends into left panel */}
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "linear-gradient(to right, oklch(0.04 0.01 260 / 0.6), transparent 45%, oklch(0.04 0.01 260 / 0.12))" }}
            />
            {/* Vignette */}
            <div aria-hidden className="absolute inset-0 pointer-events-none"
              style={{ background: "radial-gradient(ellipse at center, transparent 38%, oklch(0 0 0 / 0.58))" }}
            />
            {/* Accent colour tint per step */}
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background: `radial-gradient(ellipse 80% 60% at 60% 50%, ${STEPS[activeStep].accent.replace(")", " / 0.14)")}, transparent)`,
                transition: "background 0.7s ease",
                mixBlendMode: "color",
              }}
            />
            {/* CRT scan-lines */}
            <div aria-hidden className="absolute inset-0 pointer-events-none opacity-[0.025]"
              style={{ backgroundImage: "repeating-linear-gradient(0deg, oklch(1 0 0), oklch(1 0 0) 1px, transparent 1px, transparent 3px)" }}
            />

            {/* ── SVG Overlay (decorative — hidden from assistive tech) ─── */}
            <div aria-hidden className="absolute inset-0 flex items-center justify-center p-6">
              <div className="relative w-full h-full max-w-[500px] max-h-[340px] m-auto">
                {[SpeedViz, PrecisionViz, AINetworkViz].map((Viz, si) => (
                  <div key={si}
                    className="absolute inset-0 transition-opacity duration-500"
                    style={{ opacity: si === activeStep ? 1 : 0 }}
                  >
                    <Viz p={vizProgress} />
                  </div>
                ))}
              </div>
            </div>

            {/* ── HUD: frame counter top-right ──────────────────────────── */}
            <div aria-hidden className="absolute top-5 right-5 z-10 flex items-center gap-2">
              <div className="flex gap-1">
                {[0, 1, 2, 3].map((f) => (
                  <div key={f}
                    className="rounded-full transition-all duration-200"
                    style={{
                      width: f === frameIdx ? 6 : 4,
                      height: f === frameIdx ? 6 : 4,
                      background: f === frameIdx ? "oklch(0.78 0.16 250)" : "oklch(1 0 0 / 0.2)",
                    }}
                  />
                ))}
              </div>
              <span className="text-[9px] font-mono tracking-[0.22em] text-white/30 uppercase">Frame</span>
              <span className="text-[10px] font-mono" style={{ color: STEPS[activeStep].accent }}>
                {String(activeStep * 4 + frameIdx + 1).padStart(3, "0")}
              </span>
            </div>

            {/* ── HUD: giant step watermark ─────────────────────────────── */}
            <div
              aria-hidden
              className="absolute bottom-4 right-6 select-none pointer-events-none leading-none"
              style={{
                fontSize: "clamp(72px, 14vw, 148px)",
                fontWeight: 900,
                color: "oklch(1 0 0 / 0.04)",
                fontFamily: "Satoshi, sans-serif",
                transition: "color 0.5s",
              }}
            >
              {STEPS[activeStep].step}
            </div>

            {/* ── HUD: active label bottom-left ─────────────────────────── */}
            <div className="absolute bottom-6 left-5 z-10">
              <p className="label-tiny transition-colors duration-500"
                style={{ color: STEPS[activeStep].accent }}
              >
                {STEPS[activeStep].step} — {STEPS[activeStep].headline.join(" ")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
