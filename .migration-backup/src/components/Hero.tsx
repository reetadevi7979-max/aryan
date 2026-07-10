import { motion } from "framer-motion";
import { ArrowRight, Star } from "lucide-react";


export function Hero() {


  const line1 = ["Building", "Digital"];
  const line2 = ["Experiences", "That", "Convert."];
  const allWords = [...line1, ...line2];
  const subline = "4+ years crafting high-performance websites for content creators, brands, and visionaries worldwide.".split(" ");

  // "Fall and fit" — each word drops from above, overshoots slightly, then locks
  const fallWord = {
    hidden: { y: "-120%", opacity: 0, rotate: -6, filter: "blur(6px)" },
    show: (i: number) => ({
      y: 0,
      opacity: 1,
      rotate: 0,
      filter: "blur(0px)",
      transition: {
        delay: 0.15 + i * 0.09,
        type: "spring" as const,
        stiffness: 380,
        damping: 22,
        mass: 0.9,
      },
    }),
  };

  return (
    <section
      id="top"
      className="relative min-h-[100svh] flex items-center justify-center text-center pt-32 pb-20 overflow-hidden"
    >
      {/* Chromatic moving background */}
      <div aria-hidden className="absolute inset-0 -z-0 overflow-hidden pointer-events-none">
        <div
          className="absolute -top-1/4 -left-1/4 w-[80vw] h-[80vw] rounded-full animate-chroma-a"
          style={{
            background:
              "radial-gradient(circle at 30% 30%, oklch(0.62 0.26 265 / 0.85), transparent 60%)",
            filter: "blur(80px)",
          }}
        />
        <div
          className="absolute top-0 -right-1/4 w-[75vw] h-[75vw] rounded-full animate-chroma-b"
          style={{
            background:
              "radial-gradient(circle at 60% 40%, oklch(0.58 0.28 320 / 0.75), transparent 60%)",
            filter: "blur(100px)",
          }}
        />
        <div
          className="absolute -bottom-1/4 left-1/4 w-[85vw] h-[85vw] rounded-full animate-chroma-c"
          style={{
            background:
              "radial-gradient(circle at 50% 50%, oklch(0.60 0.24 210 / 0.75), transparent 60%)",
            filter: "blur(110px)",
          }}
        />
        <div
          className="absolute top-1/3 left-1/3 w-[60vw] h-[60vw] rounded-full animate-chroma-d"
          style={{
            background:
              "radial-gradient(circle at 40% 60%, oklch(0.68 0.20 160 / 0.55), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        {/* grain */}
        <div
          className="absolute inset-0 opacity-[0.06] mix-blend-overlay"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.7'/></svg>\")",
          }}
        />
        {/* vignette to keep text legible */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, transparent 30%, oklch(0.12 0.02 260 / 0.55) 80%)",
          }}
        />
      </div>



      <div className="relative z-10 max-w-5xl mx-auto px-5">
        {/* Status pill */}
        <motion.div
          initial={{ y: -40, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ type: "spring", stiffness: 320, damping: 22, delay: 0.05 }}
          className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full glass mb-8 text-xs font-medium tracking-[0.12em] uppercase text-foreground/80"
        >
          <span className="relative inline-flex w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_12px_#34d399] animate-pulse-soft" />
          Available for Projects
        </motion.div>

        <h1 className="text-[clamp(44px,8vw,96px)] font-bold leading-[1.02] tracking-[-0.04em] mb-7">
          <div className="flex flex-wrap justify-center gap-x-4">
            {line1.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className="inline-block"
                  variants={fallWord}
                  initial="hidden"
                  animate="show"
                  custom={i}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-x-4">
            {line2.map((w, i) => (
              <span key={w} className="inline-block overflow-hidden pb-1">
                <motion.span
                  className="inline-block text-gradient"
                  variants={fallWord}
                  initial="hidden"
                  animate="show"
                  custom={line1.length + i}
                >
                  {w}
                </motion.span>
              </span>
            ))}
          </div>
        </h1>

        <p className="text-base md:text-lg text-foreground/65 max-w-xl mx-auto leading-[1.7] mb-10 flex flex-wrap justify-center gap-x-1.5">
          {subline.map((w, i) => (
            <span key={i} className="inline-block overflow-hidden">
              <motion.span
                className="inline-block"
                variants={fallWord}
                initial="hidden"
                animate="show"
                custom={allWords.length + i * 0.5}
              >
                {w}
              </motion.span>
            </span>
          ))}
        </p>

        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.9, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-wrap items-center justify-center gap-3 mb-12"
        >
          <a
            data-magnetic
            href="#work"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_4px_14px_oklch(0.65_0.22_250/0.4),inset_0_1px_0_oklch(1_0_0/0.3)] hover:shadow-[0_8px_30px_oklch(0.65_0.22_250/0.55)] transition-shadow"
          >
            View My Work <ArrowRight size={16} />
          </a>
          <a
            data-magnetic
            href="#contact"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold glass hover:bg-white/[0.08] transition-all"
          >
            Let's Talk
          </a>
        </motion.div>


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
