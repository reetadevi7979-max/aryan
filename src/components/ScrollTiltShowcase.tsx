import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Sparkles, Send, Paperclip, Mic } from "lucide-react";

/**
 * Scroll-driven 3D tilt showcase.
 * A tall container drives the scroll progress; a central "AI chat" card
 * fades in, scales up and tilts on the X-axis based on that progress.
 */
export function ScrollTiltShowcase() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Smooth the raw progress for buttery motion
  const p = useSpring(scrollYProgress, { stiffness: 120, damping: 24, mass: 0.4 });

  // Scroll-linked transforms — most of the animation happens in the first
  // half of the scroll, then holds; the exit fades out at the very end.
  const opacity = useTransform(p, [0, 0.25, 0.75, 1], [0, 1, 1, 0.4]);
  const scale = useTransform(p, [0, 0.5, 1], [0.8, 1, 0.94]);
  const rotateX = useTransform(p, [0, 0.5, 1], [45, 0, -20]);
  const y = useTransform(p, [0, 0.5], [120, 0]);
  const glow = useTransform(p, [0, 0.5, 1], [0, 0.6, 0.3]);

  // Header text slides in as the card resolves
  const headerY = useTransform(p, [0, 0.4], [40, 0]);
  const headerOpacity = useTransform(p, [0, 0.3], [0, 1]);

  return (
    <section
      ref={containerRef}
      className="relative"
      style={{ height: "180vh" }}
    >
      {/* Sticky viewport — the card stays centered while the parent scrolls */}
      <div
        className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center px-5"
        style={{ perspective: "1400px" }}
      >
        {/* Ambient glow */}
        <motion.div
          aria-hidden
          className="absolute inset-0 -z-10 pointer-events-none"
          style={{
            opacity: glow,
            background:
              "radial-gradient(50% 40% at 50% 55%, oklch(0.55 0.2 250 / 0.35), transparent 70%), radial-gradient(30% 30% at 20% 30%, oklch(0.65 0.22 250 / 0.2), transparent 70%)",
          }}
        />

        {/* Header */}
        <motion.div
          className="text-center max-w-2xl mb-8 md:mb-12"
          style={{ y: headerY, opacity: headerOpacity }}
        >
          <div className="label-tiny">Scroll to reveal</div>
          <h2 className="text-[clamp(28px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.035em] mt-3 mb-4">
            Interfaces that respond to you
          </h2>
          <p className="text-foreground/65 text-sm md:text-base">
            Scroll — the card tilts, lifts and settles in real time.
          </p>
        </motion.div>

        {/* The tilt card */}
        <motion.div
          className="relative w-full max-w-3xl rounded-3xl overflow-hidden"
          style={{
            opacity,
            scale,
            rotateX,
            y,
            transformStyle: "preserve-3d",
            transformOrigin: "center 80%",
            background:
              "linear-gradient(160deg, oklch(0.22 0.03 250 / 0.75), oklch(0.14 0.02 250 / 0.6) 60%, oklch(0.55 0.2 250 / 0.12))",
            border: "1px solid oklch(1 0 0 / 0.1)",
            boxShadow:
              "0 60px 120px -30px oklch(0.55 0.2 250 / 0.55), 0 0 0 1px oklch(1 0 0 / 0.04), inset 0 1px 0 oklch(1 0 0 / 0.08)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
          }}
        >
          {/* Window chrome */}
          <div className="flex items-center gap-2 px-5 py-4 border-b border-white/5">
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <span className="w-3 h-3 rounded-full bg-white/15" />
            <div className="ml-3 flex items-center gap-2 text-xs text-foreground/60">
              <Sparkles size={14} style={{ color: "#60A5FA" }} />
              <span>AI Assistant</span>
            </div>
          </div>

          {/* Chat body */}
          <div className="p-5 md:p-7 space-y-4 min-h-[280px] md:min-h-[340px]">
            {/* User bubble */}
            <div className="flex justify-end">
              <div
                className="max-w-[75%] rounded-2xl rounded-tr-md px-4 py-2.5 text-sm text-white"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
                  boxShadow: "0 8px 24px -8px #3B82F688",
                }}
              >
                Design me a modern portfolio hero section.
              </div>
            </div>

            {/* AI bubble */}
            <div className="flex items-start gap-2.5">
              <div
                className="w-8 h-8 rounded-full flex items-center justify-center shrink-0"
                style={{
                  background:
                    "radial-gradient(circle at 30% 25%, oklch(1 0 0 / 0.2), #3B82F633 60%, transparent)",
                  boxShadow: "inset 0 0 12px #60A5FA55",
                }}
              >
                <Sparkles size={14} style={{ color: "#93C5FD" }} />
              </div>
              <div className="max-w-[80%] rounded-2xl rounded-tl-md px-4 py-3 text-sm text-foreground/85 bg-white/[0.04] border border-white/5">
                <p>Here's a plan — bold typography, subtle motion, glass panels:</p>
                <ul className="mt-2 space-y-1 text-xs text-foreground/70">
                  <li>• Oversized headline with tight tracking</li>
                  <li>• Scroll-linked hero card with 3D tilt</li>
                  <li>• Blue accent + soft glow surfaces</li>
                </ul>
              </div>
            </div>

            {/* Typing indicator */}
            <div className="flex items-center gap-1.5 pl-10">
              {[0, 1, 2].map((i) => (
                <motion.span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-white/40"
                  animate={{ y: [0, -4, 0] }}
                  transition={{ duration: 0.9, delay: i * 0.15, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </div>
          </div>

          {/* Composer */}
          <div className="border-t border-white/5 p-4">
            <div className="flex items-center gap-2 rounded-2xl bg-white/[0.04] border border-white/5 px-3 py-2.5">
              <Paperclip size={16} className="text-foreground/45" />
              <div className="flex-1 text-sm text-foreground/45">Ask anything…</div>
              <Mic size={16} className="text-foreground/45" />
              <button
                className="w-8 h-8 rounded-full flex items-center justify-center"
                style={{
                  background: "linear-gradient(135deg, #3B82F6, #60A5FA)",
                  boxShadow: "0 6px 18px -4px #3B82F6aa",
                }}
                aria-label="Send"
              >
                <Send size={14} className="text-white" />
              </button>
            </div>
          </div>

          {/* Card sheen */}
          <div
            aria-hidden
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(60% 40% at 50% 0%, oklch(1 0 0 / 0.08), transparent 70%)",
            }}
          />
        </motion.div>
      </div>
    </section>
  );
}
