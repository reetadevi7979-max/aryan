import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

type Node = {
  label: string;
  sub: string;
  icon: JSX.Element;
  // anchor positions in percent (0-100)
  x: number;
  y: number;
  color: string;
  delay: number;
};

const nodes: Node[] = [
  {
    label: "React",
    sub: "Modern web apps",
    color: "#61DAFB",
    x: 18,
    y: 30,
    delay: 0,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="#61DAFB" strokeWidth="1.2">
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
    x: 50,
    y: 18,
    delay: 0.4,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12" fill="#21759B">
        <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm-8.4 10c0-1.2.3-2.4.7-3.4l4 11A8.4 8.4 0 0 1 3.6 12Zm8.4 8.4c-.8 0-1.6-.1-2.4-.4l2.5-7.3 2.6 7.1a8.4 8.4 0 0 1-2.7.6Zm1.1-12.5c.5 0 1-.1 1-.1.5 0 .4-.7 0-.7 0 0-1.4.1-2.3.1-.9 0-2.3-.1-2.3-.1-.5 0-.5.7 0 .7 0 0 .4.1.9.1l1.4 3.7-1.9 5.7-3.2-9.4c.5 0 1-.1 1-.1.5 0 .4-.7 0-.7 0 0-1.4.1-2.3.1H6a8.4 8.4 0 0 1 12.7-1.6h-.2c-.8 0-1.4.7-1.4 1.5 0 .7.4 1.3.8 2 .4.5.8 1.2.8 2.2 0 .7-.3 1.5-.6 2.7l-.8 2.8-3-9Zm3.3 12 2.6-7.5c.5-1.2.6-2.2.6-3 0-.4 0-.7-.1-1a8.4 8.4 0 0 1-3.1 11.5Z" />
      </svg>
    ),
  },
  {
    label: "Custom Website",
    sub: "Bespoke builds",
    color: "#60A5FA",
    x: 82,
    y: 32,
    delay: 0.8,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12" fill="none" stroke="#60A5FA" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
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
    x: 32,
    y: 72,
    delay: 1.2,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12" fill="#96BF48">
        <path d="M15.3 4.4c-.1 0-1.7.1-1.7.1s-1.1-1-1.2-1.1c-.1-.1-.4-.1-.5-.1l-.7 9.6 4.6-1 -.5-7.5ZM11.8 5.3c-.3.1-.6.2-1 .3.2-.7.5-1.4 1-1.9.2.6.2 1.1 0 1.6ZM10 4c.4 0 .8.3 1 .7-.4.1-.8.2-1.2.4-.2 0-.4.1-.6.2.2-.5.5-.9.8-1.3ZM9 17.4l-2.6.7L4 6.6c0-.1.1-.2.2-.2l1.5-.5c.2.1.4 0 .6-.1l1.5-.5c.2 0 .3 0 .5.1L9 6.1c0-.5.1-1 .3-1.5.3-.7.8-1.2 1.3-1.5.3-.2.6-.2 1-.2.2 0 .3.1.5.2 0 .1.1.2.1.3 0 0-.5.1-.7.2L9 17.4Zm6-3.6c-.6-.3-1-.5-1-.9 0-.4.3-.6.8-.6.4 0 .8.1 1.2.3l.5-1.5s-.4-.3-1.6-.3c-1.7 0-2.9 1-2.9 2.4 0 .8.5 1.4 1.3 1.8.6.3.8.6.8.9 0 .4-.3.7-.8.7-.6 0-1.4-.3-1.8-.6l-.5 1.5c.4.2 1.3.5 2.2.5 1.8 0 3-.9 3-2.4 0-1-.5-1.5-1.2-1.8Z" />
      </svg>
    ),
  },
  {
    label: "Framer Motion",
    sub: "Animations",
    color: "#BB7CFA",
    x: 68,
    y: 75,
    delay: 1.6,
    icon: (
      <svg viewBox="0 0 24 24" className="w-10 h-10 md:w-12 md:h-12" fill="#BB7CFA">
        <path d="M6 2h12v6H12L6 2Zm0 6h6l6 6H6V8Zm0 6h6v6l-6-6Z" />
      </svg>
    ),
  },
];

const center = { x: 50, y: 48 };

export function TechBalloons() {
  const ref = useRef<HTMLDivElement | null>(null);
  const pathRefs = useRef<(SVGPathElement | null)[]>([]);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const start = performance.now();

    const tick = (t: number) => {
      const el = ref.current;
      if (!el) return;
      const w = el.clientWidth;
      const h = el.clientHeight;
      const cx = (center.x / 100) * w;
      const cy = (center.y / 100) * h;
      const elapsed = (t - start) / 1000;

      const balloons = el.querySelectorAll<HTMLElement>("[data-balloon]");
      balloons.forEach((b, i) => {
        const n = nodes[i];
        const phase = n.delay + elapsed;
        const offX = Math.sin(phase * 0.9) * 14;
        const offY = Math.cos(phase * 0.7) * 18 - 4;
        const rot = Math.sin(phase * 0.5) * 4;

        const baseX = (n.x / 100) * w;
        const baseY = (n.y / 100) * h;
        const nx = baseX + offX;
        const ny = baseY + offY;

        b.style.transform = `translate(-50%, -50%) translate(${nx}px, ${ny}px) rotate(${rot}deg)`;

        const path = pathRefs.current[i];
        if (path) {
          // curved thread from center to balloon
          const midX = (cx + nx) / 2 + Math.sin(phase) * 6;
          const midY = (cy + ny) / 2 + 20 + Math.cos(phase) * 6;
          path.setAttribute("d", `M ${cx} ${cy} Q ${midX} ${midY} ${nx} ${ny}`);
        }
      });

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    const ro = new ResizeObserver(() => {});
    if (ref.current) ro.observe(ref.current);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
    };
  }, []);

  return (
    <section id="skills" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Tech Stack</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            Tools I Build With
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            Every project, tied together with craft — floating ideas held by a single thread.
          </p>
        </Reveal>

        <Reveal>
          <div
            ref={ref}
            className="relative mt-14 md:mt-20 mx-auto h-[480px] md:h-[560px] w-full max-w-5xl"
          >
            {/* center hub */}
            <div
              className="absolute left-1/2 top-[48%] -translate-x-1/2 -translate-y-1/2 z-20 w-24 h-24 md:w-28 md:h-28 rounded-full glass-blue flex items-center justify-center shadow-[0_0_60px_oklch(0.65_0.22_250/0.6)]"
            >
              <div className="text-center">
                <div className="text-[10px] tracking-[0.18em] uppercase text-primary-glow">
                  Aryan
                </div>
                <div className="text-sm font-bold">Builds</div>
              </div>
              <div
                aria-hidden
                className="absolute inset-0 rounded-full animate-pulse-soft"
                style={{
                  boxShadow: "0 0 0 1px oklch(0.65 0.22 250 / 0.4)",
                }}
              />
            </div>

            {/* threads */}
            <svg
              aria-hidden
              className="absolute inset-0 w-full h-full pointer-events-none z-10"
              preserveAspectRatio="none"
            >
              <defs>
                <linearGradient id="thread" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="oklch(0.78 0.16 250 / 0.7)" />
                  <stop offset="100%" stopColor="oklch(0.65 0.22 250 / 0.15)" />
                </linearGradient>
              </defs>
              {nodes.map((_, i) => (
                <path
                  key={i}
                  ref={(el) => {
                    pathRefs.current[i] = el;
                  }}
                  stroke="url(#thread)"
                  strokeWidth="1.2"
                  fill="none"
                  strokeDasharray="3 4"
                />
              ))}
            </svg>

            {/* balloons */}
            {nodes.map((n) => (
              <div
                key={n.label}
                data-balloon
                className="absolute left-0 top-0 z-20 will-change-transform"
                style={{
                  // initial placement before JS kicks in
                  transform: `translate(-50%,-50%) translate(${n.x}%, ${n.y}%)`,
                }}
              >
                <div className="relative group">
                  <div
                    className="w-24 h-24 md:w-28 md:h-28 rounded-full glass flex items-center justify-center transition-all duration-500 group-hover:scale-110"
                    style={{
                      boxShadow: `0 18px 50px -10px ${n.color}55, inset 0 0 24px ${n.color}22, 0 0 0 1px ${n.color}33`,
                    }}
                  >
                    {n.icon}
                  </div>
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-3 text-center whitespace-nowrap">
                    <div className="text-sm font-semibold">{n.label}</div>
                    <div className="text-[11px] text-foreground/55">{n.sub}</div>
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
