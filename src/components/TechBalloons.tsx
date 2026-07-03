import { useEffect, useRef, type ReactElement } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Reveal } from "./Reveal";
import { Check } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

type Tool = {
  label: string;
  tag: string;
  blurb: string;
  points: string[];
  years: string;
  projects: string;
  accent: string;
  icon: ReactElement;
};

const ACCENT = "#60A5FA";
const ACCENT_SOFT = "#93C5FD";
const ACCENT_DEEP = "#3B82F6";

const tools: Tool[] = [
  {
    label: "React",
    tag: "Frontend Framework",
    blurb:
      "Component-driven interfaces with predictable state, fast renders and a mature ecosystem — the backbone of every product I ship.",
    points: [
      "Hooks-first, functional components",
      "React Query for server state",
      "Suspense + concurrent rendering",
    ],
    years: "4+ yrs",
    projects: "40+ projects",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill="none" stroke={ACCENT} strokeWidth="1.2">
        <circle cx="12" cy="12" r="2" fill={ACCENT} />
        <ellipse cx="12" cy="12" rx="10" ry="4" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(60 12 12)" />
        <ellipse cx="12" cy="12" rx="10" ry="4" transform="rotate(120 12 12)" />
      </svg>
    ),
  },
  {
    label: "Next.js",
    tag: "Full-Stack React",
    blurb:
      "Production-grade SSR, ISR and edge routing. I use it when SEO, speed and server logic all need to sit under one roof.",
    points: ["App Router + RSC", "Edge & serverless APIs", "Image + font optimization"],
    years: "3+ yrs",
    projects: "25+ projects",
    accent: ACCENT_SOFT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill={ACCENT_SOFT}>
        <circle cx="12" cy="12" r="10" fill="none" stroke={ACCENT_SOFT} strokeWidth="1.4" />
        <path d="M8 7v10M8 7l8 10M16 7v7" stroke={ACCENT_SOFT} strokeWidth="1.4" fill="none" />
      </svg>
    ),
  },
  {
    label: "WordPress",
    tag: "CMS & Content Sites",
    blurb:
      "Custom themes, ACF-driven blocks, and headless setups. Perfect for teams that need to publish without touching code.",
    points: ["Custom Gutenberg blocks", "Headless with Next/React", "WooCommerce storefronts"],
    years: "4+ yrs",
    projects: "30+ sites",
    accent: ACCENT_DEEP,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill="none" stroke={ACCENT_DEEP} strokeWidth="1.4">
        <circle cx="12" cy="12" r="10" />
        <path d="M5 11h14M5 13h14M9 5l6 14M15 5l-6 14" strokeWidth="1" />
      </svg>
    ),
  },
  {
    label: "Shopify",
    tag: "E-commerce",
    blurb:
      "Conversion-obsessed storefronts. Custom Liquid, Hydrogen, and headless builds that actually move the needle on revenue.",
    points: ["Custom Liquid + sections", "Hydrogen headless", "Checkout & UX optimization"],
    years: "3+ yrs",
    projects: "20+ stores",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill={ACCENT}>
        <path d="M15.3 4.4c-.1 0-1.7.1-1.7.1s-1.1-1-1.2-1.1c-.1-.1-.4-.1-.5-.1l-.7 9.6 4.6-1-.5-7.5ZM9 17.4l-2.6.7L4 6.6c0-.1.1-.2.2-.2l1.5-.5c.2.1.4 0 .6-.1l1.5-.5c.2 0 .3 0 .5.1L9 6.1l0 11.3Zm6-3.6c-.6-.3-1-.5-1-.9 0-.4.3-.6.8-.6.4 0 .8.1 1.2.3l.5-1.5s-.4-.3-1.6-.3c-1.7 0-2.9 1-2.9 2.4 0 .8.5 1.4 1.3 1.8.6.3.8.6.8.9 0 .4-.3.7-.8.7-.6 0-1.4-.3-1.8-.6l-.5 1.5c.4.2 1.3.5 2.2.5 1.8 0 3-.9 3-2.4 0-1-.5-1.5-1.2-1.8Z" />
      </svg>
    ),
  },
  {
    label: "Framer Motion",
    tag: "Animation Library",
    blurb:
      "Physics-based motion that feels alive. Layout animations, gestures and orchestrated timelines — polish without the overhead.",
    points: ["Layout & shared element", "Gesture-driven UI", "Timeline choreography"],
    years: "3+ yrs",
    projects: "35+ builds",
    accent: ACCENT_SOFT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill={ACCENT_SOFT}>
        <path d="M6 2h12v6H12L6 2Zm0 6h6l6 6H6V8Zm0 6h6v6l-6-6Z" />
      </svg>
    ),
  },
  {
    label: "Tailwind CSS",
    tag: "Utility Styling",
    blurb:
      "A design system in your class names. Ships pixel-perfect UIs 3× faster with consistency baked into every component.",
    points: ["Design tokens via theme", "Zero runtime overhead", "Fully responsive by default"],
    years: "4+ yrs",
    projects: "50+ projects",
    accent: ACCENT_DEEP,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill={ACCENT_DEEP}>
        <path d="M12 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.4 1 1 2.2 2.1 4.5 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.4C15.5 7.1 14.3 6 12 6Zm-5 6c-2.7 0-4.3 1.3-5 4 1-1.3 2.2-1.8 3.5-1.5.8.2 1.3.8 2 1.4 1 1 2.2 2.1 4.5 2.1 2.7 0 4.3-1.3 5-4-1 1.3-2.2 1.8-3.5 1.5-.8-.2-1.3-.8-2-1.4-1-1-2.2-2.1-4.5-2.1Z" />
      </svg>
    ),
  },
  {
    label: "TypeScript",
    tag: "Type-Safe Code",
    blurb:
      "Catches bugs before they ship. Every codebase I touch is fully typed — safer refactors, better DX, fewer 3am hotfixes.",
    points: ["End-to-end type safety", "Zod runtime validation", "Strict mode everywhere"],
    years: "4+ yrs",
    projects: "All projects",
    accent: ACCENT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill={ACCENT}>
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <path d="M9 11H6.5v6H8v-4.5h1V11Zm1.5 0v1.5h2V17H14v-4.5h2V11h-5.5Z" fill="#0b1220" />
      </svg>
    ),
  },
  {
    label: "Figma",
    tag: "Design Handoff",
    blurb:
      "Pixel-accurate translation from design to code. I speak the designer's language and turn any Figma file into a live product.",
    points: ["1:1 spec implementation", "Auto-layout to Flex/Grid", "Design token sync"],
    years: "4+ yrs",
    projects: "60+ handoffs",
    accent: ACCENT_SOFT,
    icon: (
      <svg viewBox="0 0 24 24" className="w-14 h-14" fill={ACCENT_SOFT}>
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
  const sectionRef = useRef<HTMLElement | null>(null);
  const cardsRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");
      if (!cards.length) return;

      // Initial state: cards stacked with slight offset
      cards.forEach((card, i) => {
        gsap.set(card, {
          yPercent: i === 0 ? 0 : 100,
          scale: 1,
          rotate: 0,
          opacity: i === 0 ? 1 : 0,
        });
      });

      const total = cards.length;
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: () => `+=${window.innerHeight * total * 0.9}`,
          pin: cardsRef.current,
          scrub: 1,
          anticipatePin: 1,
        },
      });

      cards.forEach((card, i) => {
        if (i === 0) return;
        // Push previous card back
        tl.to(
          cards[i - 1],
          {
            scale: 0.92 - (i - 1) * 0.02,
            yPercent: -6 * i,
            opacity: 0.35,
            rotate: (i - 1) % 2 === 0 ? -2 : 2,
            filter: "blur(2px)",
            ease: "power2.inOut",
          },
          i,
        );
        // Bring new card in
        tl.to(
          card,
          {
            yPercent: 0,
            opacity: 1,
            ease: "power2.out",
          },
          i,
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="skills"
      ref={sectionRef}
      className="relative overflow-hidden py-24 md:py-32"
    >
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
            Scroll through the stack — each tool, why it earns its place, and where I've shipped it.
          </p>
        </Reveal>
      </div>

      {/* Pinned stack */}
      <div
        ref={cardsRef}
        className="stack-viewport relative mt-16 md:mt-24 h-[80vh] flex items-center justify-center px-5"
      >
        <div className="relative w-full max-w-4xl h-[520px] md:h-[560px]">
          {tools.map((t, i) => (
            <article
              key={t.label}
              className="stack-card absolute inset-0 rounded-3xl border border-white/10 backdrop-blur-2xl p-8 md:p-12 flex flex-col md:flex-row gap-8 md:gap-12 overflow-hidden"
              style={{
                background:
                  "linear-gradient(140deg, oklch(1 0 0 / 0.08), oklch(1 0 0 / 0.02) 55%, oklch(0.55 0.2 250 / 0.09))",
                boxShadow: `0 30px 80px -20px ${t.accent}55, 0 0 0 1px oklch(1 0 0 / 0.04), inset 0 1px 0 oklch(1 0 0 / 0.08)`,
                zIndex: tools.length - i,
              }}
            >
              {/* accent glow */}
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-80 h-80 rounded-full pointer-events-none"
                style={{
                  background: `radial-gradient(circle, ${t.accent}44, transparent 65%)`,
                  filter: "blur(30px)",
                }}
              />

              {/* Left: icon + counter */}
              <div className="relative flex md:flex-col items-center md:items-start gap-6 md:gap-8 md:w-56 shrink-0">
                <div
                  className="w-24 h-24 md:w-28 md:h-28 rounded-2xl flex items-center justify-center shrink-0"
                  style={{
                    background: `radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.2), ${t.accent}22 60%, transparent 100%)`,
                    boxShadow: `inset 0 0 24px ${t.accent}44, 0 0 32px -6px ${t.accent}66`,
                  }}
                >
                  {t.icon}
                </div>
                <div className="flex flex-col">
                  <span
                    className="text-[10px] md:text-[11px] tracking-[0.2em] uppercase font-semibold"
                    style={{ color: t.accent }}
                  >
                    {t.tag}
                  </span>
                  <span className="text-4xl md:text-5xl font-bold tracking-[-0.02em] mt-1">
                    {String(i + 1).padStart(2, "0")}
                    <span className="text-foreground/30 text-2xl md:text-3xl">
                      /{String(tools.length).padStart(2, "0")}
                    </span>
                  </span>
                </div>
              </div>

              {/* Right: content */}
              <div className="relative flex-1 flex flex-col">
                <h3 className="text-3xl md:text-5xl font-bold tracking-[-0.03em]">
                  {t.label}
                </h3>
                <p className="text-foreground/70 text-base md:text-lg leading-relaxed mt-4 max-w-xl">
                  {t.blurb}
                </p>

                <ul className="mt-6 space-y-2.5">
                  {t.points.map((p) => (
                    <li key={p} className="flex items-start gap-2.5 text-sm md:text-base text-foreground/80">
                      <span
                        className="mt-0.5 w-5 h-5 rounded-full flex items-center justify-center shrink-0"
                        style={{ background: `${t.accent}22`, color: t.accent }}
                      >
                        <Check size={12} strokeWidth={3} />
                      </span>
                      {p}
                    </li>
                  ))}
                </ul>

                <div className="mt-auto pt-6 flex items-center gap-6 text-xs md:text-sm">
                  <div>
                    <div className="text-foreground/50 uppercase tracking-[0.15em] text-[10px]">
                      Experience
                    </div>
                    <div className="font-semibold mt-1" style={{ color: t.accent }}>
                      {t.years}
                    </div>
                  </div>
                  <div className="w-px h-8 bg-white/10" />
                  <div>
                    <div className="text-foreground/50 uppercase tracking-[0.15em] text-[10px]">
                      Shipped
                    </div>
                    <div className="font-semibold mt-1" style={{ color: t.accent }}>
                      {t.projects}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      <style>{`
        @media (prefers-reduced-motion: reduce) {
          .stack-card { position: relative !important; opacity: 1 !important; transform: none !important; margin-bottom: 1.5rem; }
          .stack-viewport { height: auto !important; display: block; }
          .stack-viewport > div { height: auto !important; }
        }
      `}</style>
    </section>
  );
}
