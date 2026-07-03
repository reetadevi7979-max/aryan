import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Scroll-driven "section as card" wrapper.
 * Each section becomes a rounded card that scales + fades based on scroll
 * progress — the previous card scales down and dims as the next one rises up.
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
  const cardRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const ctx = gsap.context(() => {
      const card = cardRef.current;
      const wrap = wrapRef.current;
      if (!card || !wrap) return;

      // Entry: rise from below with scale + fade
      gsap.fromTo(
        card,
        { y: 80, scale: 0.94, opacity: 0.4, borderRadius: "48px" },
        {
          y: 0,
          scale: 1,
          opacity: 1,
          borderRadius: "32px",
          ease: "power2.out",
          scrollTrigger: {
            trigger: wrap,
            start: "top 90%",
            end: "top 40%",
            scrub: 1,
          },
        },
      );

      // Exit: press back with scale-down + slight fade as user scrolls past
      gsap.to(card, {
        scale: 0.9,
        opacity: 0.55,
        y: -40,
        ease: "power2.in",
        scrollTrigger: {
          trigger: wrap,
          start: "bottom 80%",
          end: "bottom 20%",
          scrub: 1,
        },
      });
    }, wrapRef);

    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="section-card-wrap relative">
      <div
        ref={cardRef}
        id={id}
        className={`section-card relative overflow-hidden rounded-[32px] ${className}`}
        style={{
          background:
            "linear-gradient(160deg, oklch(0.22 0.03 250 / 0.6), oklch(0.14 0.02 250 / 0.4) 60%, oklch(0.55 0.2 250 / 0.08))",
          border: "1px solid oklch(1 0 0 / 0.06)",
          boxShadow:
            "0 30px 80px -30px oklch(0.55 0.2 250 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.06)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
        }}
      >
        {children}
      </div>
    </div>
  );
}
