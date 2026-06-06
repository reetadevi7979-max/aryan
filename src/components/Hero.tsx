import { useEffect, useRef } from "react";
import { ArrowRight, Star } from "lucide-react";

export function Hero() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const cvs = canvasRef.current;
    if (!cvs) return;
    const ctx = cvs.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let parts: { x: number; y: number; r: number; vx: number; vy: number; a: number }[] = [];
    let w = 0;
    let h = 0;

    const resize = () => {
      const parent = cvs.parentElement;
      if (!parent) return;
      w = cvs.width = parent.offsetWidth;
      h = cvs.height = parent.offsetHeight;
      const count = Math.min(60, Math.floor(w / 26));
      parts = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 1.6 + 0.3,
        vx: (Math.random() - 0.5) * 0.15,
        vy: (Math.random() - 0.5) * 0.15,
        a: Math.random() * 0.6 + 0.2,
      }));
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      for (const p of parts) {
        p.x += p.vx;
        p.y += p.vy;
        if (p.x < 0) p.x = w;
        if (p.x > w) p.x = 0;
        if (p.y < 0) p.y = h;
        if (p.y > h) p.y = 0;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(147,197,253,${p.a})`;
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  const line1 = ["Building", "Digital"];
  const line2 = ["Experiences", "That", "Convert."];

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center text-center pt-32 pb-20 overflow-hidden"
    >
      {/* Ambient orb */}
      <div
        aria-hidden
        className="absolute top-1/2 left-1/2 w-[900px] h-[900px] max-w-[120vw] max-h-[120vw] -translate-x-1/2 -translate-y-1/2 pointer-events-none animate-orb"
        style={{
          background:
            "radial-gradient(circle, oklch(0.65 0.22 250 / 0.35) 0%, oklch(0.65 0.22 250 / 0.08) 30%, transparent 65%)",
          filter: "blur(40px)",
        }}
      />
      <canvas ref={canvasRef} aria-hidden className="absolute inset-0 pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto px-5">
        {/* Status pill */}
        <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-8 text-xs font-medium tracking-[0.12em] uppercase text-foreground/80">
          <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse-soft" />
          Available for Projects
        </div>

        <h1 className="text-[clamp(44px,8vw,96px)] font-bold leading-[1.02] tracking-[-0.04em] mb-7">
          <div>
            {line1.map((w, i) => (
              <span key={w} className="word-reveal mr-3">
                <span style={{ animationDelay: `${0.05 + i * 0.08}s` }}>{w}</span>
              </span>
            ))}
          </div>
          <div>
            {line2.map((w, i) => (
              <span key={w} className="word-reveal mr-3">
                <span
                  className="text-gradient"
                  style={{ animationDelay: `${0.25 + i * 0.08}s` }}
                >
                  {w}
                </span>
              </span>
            ))}
          </div>
        </h1>

        <p className="text-base md:text-lg text-foreground/65 max-w-xl mx-auto leading-[1.7] mb-10">
          4+ years crafting high-performance websites for content creators, brands,
          and visionaries worldwide.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_4px_14px_oklch(0.65_0.22_250/0.4),inset_0_1px_0_oklch(1_0_0/0.3)] hover:scale-[1.03] hover:shadow-[0_8px_30px_oklch(0.65_0.22_250/0.55)] transition-all"
          >
            View My Work <ArrowRight size={16} />
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold glass hover:bg-white/[0.08] transition-all"
          >
            Let's Talk
          </a>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-x-5 gap-y-3 text-foreground/60 text-sm">
          <div className="flex" aria-hidden>
            {["S", "M", "J"].map((c, i) => (
              <span
                key={c}
                className="w-8 h-8 rounded-full border-2 border-background -ml-2 first:ml-0 inline-flex items-center justify-center text-[11px] font-bold text-primary-foreground"
                style={{
                  background: "linear-gradient(135deg, oklch(0.65 0.22 250), oklch(0.78 0.16 250))",
                  zIndex: 3 - i,
                }}
              >
                {c}
              </span>
            ))}
          </div>
          <span>Trusted by content creators &amp; growing brands</span>
          <span className="flex items-center gap-1.5">
            <span className="flex text-amber-400">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </span>
            <span className="text-foreground font-semibold">5.0</span>
            <span className="text-foreground/50">on Fiverr</span>
          </span>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute bottom-8 left-1/2 -translate-x-1/2 w-px h-12 animate-scroll-indicator"
        style={{
          background:
            "linear-gradient(180deg, transparent, oklch(1 0 0 / 0.6), transparent)",
        }}
      />
    </section>
  );
}
