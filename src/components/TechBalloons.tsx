import { type ReactElement } from "react";
import { Reveal } from "./Reveal";
import logo from "@/assets/logo.png.asset.json";

type Planet = {
  label: string;
  sub: string;
  icon: ReactElement;
  color: string;
  /** orbit radius as % of container (half-width) */
  orbit: number;
  /** seconds per full revolution */
  duration: number;
  /** starting angle offset (deg) */
  offset: number;
  /** orbit direction */
  reverse?: boolean;
  /** planet size in px */
  size: number;
};

const planets: Planet[] = [
  {
    label: "React",
    sub: "Modern web apps",
    color: "#61DAFB",
    orbit: 18,
    duration: 22,
    offset: 0,
    size: 84,
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
    color: "#21759B",
    orbit: 28,
    duration: 32,
    offset: 120,
    reverse: true,
    size: 88,
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
    orbit: 38,
    duration: 42,
    offset: 240,
    size: 92,
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
    orbit: 46,
    duration: 52,
    offset: 60,
    reverse: true,
    size: 88,
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
    orbit: 54,
    duration: 64,
    offset: 200,
    size: 90,
    icon: (
      <svg viewBox="0 0 24 24" className="w-9 h-9" fill="#BB7CFA">
        <path d="M6 2h12v6H12L6 2Zm0 6h6l6 6H6V8Zm0 6h6v6l-6-6Z" />
      </svg>
    ),
  },
];

export function TechBalloons() {
  return (
    <section id="skills" className="py-24 md:py-32 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Tech Stack</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            Aryan's Solar System
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            Every tool I build with — orbiting one calm center.
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
                  style={{
                    width: `${p.orbit * 2}%`,
                    height: `${p.orbit * 2}%`,
                  }}
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
                className="absolute left-1/2 top-1/2 w-0 h-0 z-20"
                style={{
                  animation: `orbit-spin ${p.duration}s linear infinite ${p.reverse ? "reverse" : ""}`,
                  transform: `rotate(${p.offset}deg)`,
                }}
              >
                {/* planet placed on orbit radius */}
                <div
                  className="absolute top-1/2 -translate-y-1/2"
                  style={{ left: `${p.orbit}%` }}
                >
                  {/* counter-rotate so label stays upright */}
                  <div
                    style={{
                      animation: `orbit-spin ${p.duration}s linear infinite ${p.reverse ? "" : "reverse"}`,
                    }}
                  >
                    <div className="relative -translate-x-1/2 group">
                      <div
                        className="rounded-full glass flex items-center justify-center transition-transform duration-500 group-hover:scale-110"
                        style={{
                          width: p.size,
                          height: p.size,
                          boxShadow: `0 14px 40px -10px ${p.color}55, inset 0 0 22px ${p.color}22, 0 0 0 1px ${p.color}33`,
                        }}
                      >
                        {p.icon}
                      </div>
                      <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 text-center whitespace-nowrap">
                        <div className="text-xs md:text-sm font-semibold">{p.label}</div>
                        <div className="text-[10px] md:text-[11px] text-foreground/55">
                          {p.sub}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
