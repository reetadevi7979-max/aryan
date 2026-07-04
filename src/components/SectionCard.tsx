import { useRef, type ReactNode } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

/**
 * Scroll-driven "section as card" wrapper.
 * Each section becomes a 3D-tilting card driven by scroll progress —
 * fades in, scales up, rotates on the X-axis, then eases back out.
 */
export function SectionCard({
  children,
  className = "",
  id,
}: {
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const wrapRef = useRef<HTMLDivElement | null>(null);

  const { scrollYProgress } = useScroll({
    target: wrapRef,
    offset: ["start end", "end start"],
  });

  const p = useSpring(scrollYProgress, {
    stiffness: 140,
    damping: 26,
    mass: 0.4,
  });

  const opacity = useTransform(p, [0, 0.25, 0.8, 1], [0, 1, 1, 0.5]);
  const scale = useTransform(p, [0, 0.5, 1], [0.86, 1, 0.95]);
  const rotateX = useTransform(p, [0, 0.5, 1], [30, 0, -14]);
  const y = useTransform(p, [0, 0.5], [80, 0]);
  const glow = useTransform(p, [0, 0.5, 1], [0, 0.5, 0.25]);

  return (
    <div
      ref={wrapRef}
      className="section-card-wrap relative"
      style={{ perspective: "1600px" }}
    >
      <motion.div
        aria-hidden
        className="absolute inset-0 -z-10 pointer-events-none"
        style={{
          opacity: glow,
          background:
            "radial-gradient(50% 40% at 50% 50%, oklch(0.55 0.2 250 / 0.28), transparent 70%)",
        }}
      />
      <motion.div
        id={id}
        className={`section-card relative overflow-hidden rounded-[32px] ${className}`}
        style={{
          opacity,
          scale,
          rotateX,
          y,
          transformStyle: "preserve-3d",
          transformOrigin: "center 85%",
          background:
            "linear-gradient(160deg, oklch(0.22 0.03 250 / 0.6), oklch(0.14 0.02 250 / 0.4) 60%, oklch(0.55 0.2 250 / 0.08))",
          border: "1px solid oklch(1 0 0 / 0.06)",
          boxShadow:
            "0 40px 100px -30px oklch(0.55 0.2 250 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {children}
      </motion.div>
    </div>
  );
}
