import { useState, type CSSProperties, type ReactElement } from "react";
import { Reveal } from "./Reveal";
import logo from "@/assets/logo.png.asset.json";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Planet = {
  label: string;
  sub: string;
  icon: ReactElement;
  color: string;
  orbit: number;
  duration: number;
  offset: number;
  reverse?: boolean;
  size: number;
  spin: number; // self-rotation seconds
  description: string;
  highlights: string[];
};

const planets: Planet[] = [
  {
    label: "React",
    sub: "Modern web apps",
    color: "#61DAFB",
    orbit: 22,
    duration: 22,
    offset: 0,
    size: 84,
    spin: 8,
    description:
      "Component-based SPAs and dashboards built with React 18, hooks and modern state patterns.",
    highlights: ["Next.js / TanStack", "TypeScript", "Hooks & Context", "Performance tuning"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#61DAFB" strokeWidth="1.2">
        <circle cx="12" cy="12" r="2" fill="#61DAFB" />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: "WordPress",
    sub: "CMS & blogs",
    color: "#4FA3D1",
    orbit: 27,
    duration: 32,
    offset: 120,
    reverse: true,
    size: 88,
    spin: 12,
    description:
      "Custom WordPress themes and headless setups — fast, SEO-friendly, easy for clients to manage.",
    highlights: ["Custom themes", "WooCommerce", "Elementor / Gutenberg", "Headless CMS"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#4FA3D1">
        <circle cx="12" cy="12" r="10" fill="none" stroke="#4FA3D1" strokeWidth="1.4" />
        <path d="M5 11h14M5 13h14M9 5l6 14M15 5l-6 14" stroke="#4FA3D1" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Custom Website",
    sub: "Bespoke builds",
    color: "#60A5FA",
    orbit: 32,
    duration: 42,
    offset: 240,
    size: 92,
    spin: 10,
    description:
      "From-scratch builds tailored to your brand — pixel-perfect, accessible and blazing fast.",
    highlights: ["Design systems", "Tailwind CSS", "Animations", "Lighthouse 95+"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="none" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M3 9h18" />
        <path d="m8 14 2 2 4-4" />
      </svg>
    ),
  },
  {
    label: "Shopify",
    sub: "E-commerce",
    color: "#96BF48",
    orbit: 37,
    duration: 52,
    offset: 60,
    reverse: true,
    size: 88,
    spin: 14,
    description:
      "Conversion-focused Shopify stores with custom Liquid themes and seamless checkout flows.",
    highlights: ["Liquid theming", "App integrations", "Checkout UX", "Speed optimization"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#96BF48">
        <path d="M15.3 4.4c-.1 0-1.7.1-1.7.1s-1.1-1-1.2-1.1c-.1-.1-.4-.1-.5-.1l-.7 9.6 4.6-1-.5-7.5ZM9 17.4l-2.6.7L4 6.6c0-.1.1-.2.2-.2l1.5-.5c.2.1.4 0 .6-.1l1.5-.5c.2 0 .3 0 .5.1L9 6.1l0 11.3Zm6-3.6c-.6-.3-1-.5-1-.9 0-.4.3-.6.8-.6.4 0 .8.1 1.2.3l.5-1.5s-.4-.3-1.6-.3c-1.7 0-2.9 1-2.9 2.4 0 .8.5 1.4 1.3 1.8.6.3.8.6.8.9 0 .4-.3.7-.8.7-.6 0-1.4-.3-1.8-.6l-.5 1.5c.4.2 1.3.5 2.2.5 1.8 0 3-.9 3-2.4 0-1-.5-1.5-1.2-1.8Z" />
      </svg>
    ),
  },
  {
    label: "Framer Motion",
    sub: "Animations",
    color: "#BB7CFA",
    orbit: 42,
    duration: 64,
    offset: 200,
    size: 90,
    spin: 16,
    description:
      "Cinematic motion design — scroll-linked animations, page transitions and micro-interactions.",
    highlights: ["Scroll animations", "Gestures", "Layout transitions", "GSAP integration"],
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#BB7CFA">
        <path d="M6 2h12v6H12L6 2Zm0 6h6l6 6H6V8Zm0 6h6v6l-6-6Z" />
      </svg>
    ),
  },
];

export function TechBalloons() {
  const [active, setActive] = useState<Planet | null>(null);

  return (
    <section id="skills" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Tech Stack</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            Aryan Tool System
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            Tap a planet — every tool I build with, orbiting one calm center.
          </p>
        </Reveal>

        <Reveal>
          <div className="relative mt-16 md:mt-24 mx-auto aspect-square w-full max-w-[680px]">
            {/* orbit rings */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              {planets.map((p) => (
                <div
                  key={`ring-${p.label}`}
                  className="absolute rounded-full border border-white/[0.06]"
                  style={{ width: `${p.orbit * 2}%`, height: `${p.orbit * 2}%` }}
                />
              ))}
            </div>

            {/* soft sun glow */}
            <div
              aria-hidden
              className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[55%] h-[55%] rounded-full pointer-events-none"
              style={{
                background:
                  "radial-gradient(circle, oklch(0.65 0.22 250 / 0.28), transparent 65%)",
                filter: "blur(20px)",
              }}
            />

            {/* sun = logo hub */}
            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-30">
              <div
                className="relative w-[26vw] h-[26vw] max-w-[180px] max-h-[180px] min-w-[120px] min-h-[120px] rounded-full glass-blue flex items-center justify-center"
                style={{
                  boxShadow:
                    "0 0 80px oklch(0.65 0.22 250 / 0.55), inset 0 0 40px oklch(0.65 0.22 250 / 0.25)",
                }}
              >
                <img
                  src={logo.url}
                  alt="Aryan Patel logo"
                  className="w-[78%] h-[78%] object-contain rounded-full drop-shadow-[0_10px_40px_oklch(0.65_0.22_250/0.6)]"
                  style={{ animation: "orbit-spin 40s linear infinite" }}
                />
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full animate-pulse-soft"
                  style={{ boxShadow: "0 0 0 1px oklch(0.65 0.22 250 / 0.5)" }}
                />
              </div>
            </div>

            {/* orbiting planets */}
            {planets.map((p) => (
              <div
                key={p.label}
                className={`absolute inset-0 z-20 pointer-events-none orbit-revolve ${p.reverse ? "orbit-revolve-reverse" : ""}`}
                style={{
                  "--orbit-duration": `${p.duration}s`,
                  "--orbit-offset": `${p.offset}deg`,
                } as CSSProperties}
              >
                <div
                  className="absolute"
                  style={{
                    left: `calc(50% + ${p.orbit}%)`,
                    top: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  {/* counter-rotate group so label stays upright */}
                  <div
                    className={`pointer-events-auto orbit-counter ${p.reverse ? "orbit-counter-reverse" : ""}`}
                    style={{
                      "--orbit-duration": `${p.duration}s`,
                      "--counter-offset": `${-p.offset}deg`,
                    } as CSSProperties}
                  >
                    <div className="relative group flex flex-col items-center">
                      <button
                        type="button"
                        onClick={() => setActive(p)}
                        aria-label={`${p.label} — view details`}
                        className="rounded-full glass flex items-center justify-center planet-spin cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                        style={{
                          width: p.size,
                          height: p.size,
                          boxShadow: `0 14px 40px -10px ${p.color}55, inset 0 0 22px ${p.color}22, 0 0 0 1px ${p.color}33`,
                          "--planet-spin-duration": `${p.spin}s`,
                        } as CSSProperties}
                      >
                        {p.icon}
                      </button>
                      <div className="mt-2 text-center whitespace-nowrap pointer-events-none">
                        <div className="text-xs md:text-sm font-semibold">{p.label}</div>
                        <div className="text-[10px] md:text-[11px] text-foreground/55">{p.sub}</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <Dialog open={!!active} onOpenChange={(o) => !o && setActive(null)}>
        <DialogContent className="glass border-white/10 sm:max-w-md">
          {active && (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <div
                    className="rounded-full glass flex items-center justify-center shrink-0"
                    style={{
                      width: 64,
                      height: 64,
                      boxShadow: `0 14px 40px -10px ${active.color}55, inset 0 0 22px ${active.color}22, 0 0 0 1px ${active.color}33`,
                    }}
                  >
                    {active.icon}
                  </div>
                  <div className="text-left">
                    <DialogTitle className="text-xl">{active.label}</DialogTitle>
                    <DialogDescription className="text-xs uppercase tracking-[0.18em] mt-1" style={{ color: active.color }}>
                      {active.sub}
                    </DialogDescription>
                  </div>
                </div>
              </DialogHeader>
              <p className="text-sm text-foreground/75 leading-relaxed">{active.description}</p>
              <div className="flex flex-wrap gap-2 pt-1">
                {active.highlights.map((h) => (
                  <span
                    key={h}
                    className="text-[11px] px-2.5 py-1 rounded-full border"
                    style={{ borderColor: `${active.color}44`, color: active.color, background: `${active.color}10` }}
                  >
                    {h}
                  </span>
                ))}
              </div>
              <a
                href="#contact"
                onClick={() => setActive(null)}
                className="mt-2 inline-flex items-center justify-center w-full h-11 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
              >
                Start a {active.label} project →
              </a>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  );
}
