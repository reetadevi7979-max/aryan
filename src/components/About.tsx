import { useEffect, useRef, useState } from "react";
import { Reveal } from "./Reveal";
import { Sparkles } from "lucide-react";

function Counter({ to, suffix = "+" }: { to: number; suffix?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [val, setVal] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        const step = Math.max(1, Math.ceil(to / 40));
        let cur = 0;
        const tick = () => {
          cur += step;
          if (cur >= to) {
            setVal(to);
            return;
          }
          setVal(cur);
          requestAnimationFrame(tick);
        };
        tick();
        io.disconnect();
      },
      { threshold: 0.6 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [to]);

  return (
    <div ref={ref} className="text-4xl md:text-[40px] font-bold tracking-[-0.03em] text-gradient">
      {val}
      {suffix}
    </div>
  );
}

export function About() {
  return (
    <section id="about" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <div className="grid md:grid-cols-[1.1fr_1fr] gap-14 md:gap-20 items-center">
          <Reveal>
            <div className="label-tiny">About</div>
            <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-6">
              I Build Websites That Work as Hard as You Do.
            </h2>
            <p className="text-foreground/65 text-base md:text-lg leading-[1.7] max-w-xl">
              I started coding 4+ years ago and never stopped. Today I specialize in
              websites for content creators and personal brands — obsessed with three
              things: speed, design, and conversion. Every pixel earns its place.
            </p>

            <div className="grid grid-cols-3 gap-3 md:gap-5 my-9">
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-border">
                <Counter to={4} />
                <div className="text-[11px] text-foreground/50 mt-1.5 uppercase tracking-[0.1em]">
                  Years Experience
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-border">
                <Counter to={50} />
                <div className="text-[11px] text-foreground/50 mt-1.5 uppercase tracking-[0.1em]">
                  Projects Delivered
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-white/[0.03] border border-border">
                <Counter to={100} suffix="%" />
                <div className="text-[11px] text-foreground/50 mt-1.5 uppercase tracking-[0.1em]">
                  Client Satisfaction
                </div>
              </div>
            </div>

            <span className="inline-flex items-center gap-2 px-4 py-2.5 rounded-full glass-blue text-sm text-primary-glow font-medium">
              <Sparkles size={14} /> Worked with big content creators
            </span>
          </Reveal>

          <Reveal>
            <div className="relative aspect-square rounded-[2rem] overflow-hidden border border-border backdrop-blur-2xl flex items-center justify-center"
              style={{
                background:
                  "radial-gradient(circle at 50% 50%, oklch(0.65 0.22 250 / 0.18), oklch(0.65 0.22 250 / 0.02) 70%)",
              }}
            >
              <div
                aria-hidden
                className="absolute inset-px rounded-[calc(2rem-1px)]"
                style={{
                  background:
                    "radial-gradient(circle at 30% 30%, oklch(0.65 0.22 250 / 0.22), transparent 50%)",
                }}
              />
              <div
                className="relative z-10 font-black tracking-[-0.06em] text-gradient leading-none"
                style={{
                  fontSize: "clamp(120px, 18vw, 200px)",
                  textShadow: "0 0 80px oklch(0.65 0.22 250 / 0.4)",
                }}
              >
                AP
              </div>

              <span
                className="absolute top-[12%] left-[6%] px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-border text-xs font-medium z-20 animate-float"
                style={{ ["--rot" as any]: "-8deg", transform: "rotate(-8deg)" }}
              >
                React
              </span>
              <span
                className="absolute bottom-[16%] right-[5%] px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-border text-xs font-medium z-20 animate-float"
                style={{ ["--rot" as any]: "6deg", transform: "rotate(6deg)", animationDelay: "1.2s" }}
              >
                Webflow
              </span>
              <span
                className="absolute top-[46%] -right-2 px-3.5 py-2 rounded-full bg-black/50 backdrop-blur-md border border-border text-xs font-medium z-20 animate-float"
                style={{ ["--rot" as any]: "-4deg", transform: "rotate(-4deg)", animationDelay: "2.4s" }}
              >
                WordPress
              </span>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
