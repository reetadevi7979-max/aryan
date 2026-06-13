import { type CSSProperties, type ReactElement } from "react";
import { Reveal } from "./Reveal";

type Tool = {
  label: string;
  sub: string;
  color: string;
  icon: ReactElement;
};

const ACCENT = "#60A5FA";

const tools: Tool[] = [
  {
    label: "React",
    sub: "Modern web apps",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={ACCENT} strokeWidth="1.2">
        <circle cx="12" cy="12" r="2" fill={ACCENT} />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: "Next.js",
    sub: "SSR & SSG",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill={ACCENT}>
        <circle cx="12" cy="12" r="10" fill="none" stroke={ACCENT} strokeWidth="1.4" />
        <path d="M8 7v10M8 7l8 10M16 7v7" stroke={ACCENT} strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
  {
    label: "WordPress",
    sub: "CMS & blogs",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill="none" stroke={ACCENT} strokeWidth="1.4">
        <circle cx="12" cy="12" r="10" />
        <path d="M5 11h14M5 13h14M9 5l6 14M15 5l-6 14" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Shopify",
    sub: "E-commerce",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill={ACCENT}>
        <path d="M15.3 4.4c-.1 0-1.7.1-1.7.1s-1.1-1-1.2-1.1c-.1-.1-.4-.1-.5-.1l-.7 9.6 4.6-1-.5-7.5ZM9 17.4l-2.6.7L4 6.6c0-.1.1-.2.2-.2l1.5-.5c.2.1.4 0 .6-.1l1.5-.5c.2 0 .3 0 .5.1L9 6.1l0 11.3Zm6-3.6c-.6-.3-1-.5-1-.9 0-.4.3-.6.8-.6.4 0 .8.1 1.2.3l.5-1.5s-.4-.3-1.6-.3c-1.7 0-2.9 1-2.9 2.4 0 .8.5 1.4 1.3 1.8.6.3.8.6.8.9 0 .4-.3.7-.8.7-.6 0-1.4-.3-1.8-.6l-.5 1.5c.4.2 1.3.5 2.2.5 1.8 0 3-.9 3-2.4 0-1-.5-1.5-1.2-1.8Z" />
      </svg>
    ),
  },
  {
    label: "Framer Motion",
    sub: "Animations",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill={ACCENT}>
        <path d="M6 2h12v6H12L6 2Zm0 6h6l6 6H6V8Zm0 6h6v6l-6-6Z" />
      </svg>
    ),
  },
  {
    label: "Tailwind CSS",
    sub: "Utility styling",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill={ACCENT}>
        <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.4 1 1 2.2 2.1 4.5 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.4C15.5 7.1 14.3 6 12 6Zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.4 1 1 2.2 2.1 4.5 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.4-1-1-2.2-2.1-4.5-2.1Z" />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    sub: "Type-safe code",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill={ACCENT}>
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M9 11H6.5v6H8v-4.5h1V11Zm1.5 0v1.5h2V17H14v-4.5h2V11h-5.5Z" fill="#0b1220" />
      </svg>
    ),
  },
  {
    label: "Figma",
    sub: "Design handoff",
    color: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10" fill={ACCENT}>
        <circle cx="9" cy="5" r="3" />
        <circle cx="15" cy="5" r="3" opacity=".7" />
        <circle cx="9" cy="12" r="3" opacity=".85" />
        <circle cx="15" cy="12" r="3" opacity=".55" />
        <circle cx="9" cy="19" r="3" opacity=".7" />
      </svg>
    ),
  },
];

export function TechBalloons() {
  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden">
      <div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          background:
            "radial-gradient(60% 50% at 50% 30%, oklch(0.55 0.2 250 / 0.18), transparent 70%), radial-gradient(40% 35% at 80% 80%, oklch(0.65 0.22 250 / 0.12), transparent 70%)",
        }}
      />

      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Tech Stack</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            Tools I build with
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            A focused stack — handpicked, fast, and reliable.
          </p>
        </Reveal>

        <Reveal>
          <div className="mt-14 md:mt-20 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-5 md:gap-6">
            {tools.map((t, i) => (
              <div
                key={t.label}
                className="tool-float group relative rounded-2xl p-6 flex flex-col items-center text-center border border-white/10 backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 hover:border-white/25"
                style={{
                  background:
                    "linear-gradient(140deg, oklch(1 0 0 / 0.07), oklch(1 0 0 / 0.02) 60%, oklch(0.55 0.2 250 / 0.06))",
                  boxShadow:
                    "0 10px 40px -12px oklch(0.55 0.2 250 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.08)",
                  animationDelay: `${(i % 4) * 0.4}s`,
                } as CSSProperties}
              >
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background: `radial-gradient(80% 60% at 50% 0%, ${t.color}22, transparent 70%)`,
                  }}
                />
                <div
                  className="relative w-16 h-16 rounded-full flex items-center justify-center mb-4"
                  style={{
                    background: `radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.18), ${t.color}22 60%, transparent 100%)`,
                    boxShadow: `inset 0 0 18px ${t.color}33, 0 0 24px -4px ${t.color}44`,
                  }}
                >
                  {t.icon}
                </div>
                <div className="text-sm md:text-base font-semibold">{t.label}</div>
                <div className="text-[11px] md:text-xs text-foreground/55 mt-1">{t.sub}</div>
              </div>
            ))}
          </div>
        </Reveal>
      </div>

      <style>{`
        @keyframes toolFloat {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        .tool-float { animation: toolFloat 6s ease-in-out infinite; }
        .tool-float:hover { animation-play-state: paused; }
        @media (prefers-reduced-motion: reduce) {
          .tool-float { animation: none; }
        }
      `}</style>
    </section>
  );
}
