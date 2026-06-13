import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global GSAP animations + custom cursor + scroll progress bar.
 * Mount once near the root of the page.
 *
 * Markup hooks:
 *   data-gsap="fade-up"   → fade + slide up on scroll-in
 *   data-gsap="fade"      → fade in on scroll-in
 *   data-gsap="zoom"      → scale + fade in on scroll-in
 *   data-gsap-stagger     → animates direct children with stagger
 *   data-gsap-parallax="-80" → translateY scrub parallax (px)
 *   data-magnetic         → magnetic hover effect
 */
export function SiteAnimations() {
  const cursorRef = useRef<HTMLDivElement | null>(null);
  const cursorDotRef = useRef<HTMLDivElement | null>(null);
  const progressRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduce) return;

      // ── Scroll progress bar ────────────────────────────────────
      gsap.to(progressRef.current, {
        scaleX: 1,
        ease: "none",
        scrollTrigger: {
          trigger: document.documentElement,
          start: 0,
          end: () => document.documentElement.scrollHeight - window.innerHeight,
          scrub: 0.3,
        },
      });

      // ── Reveal: fade-up ────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="fade-up"]').forEach((el) => {
        gsap.from(el, {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // ── Reveal: fade ───────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="fade"]').forEach((el) => {
        gsap.from(el, {
          opacity: 0,
          duration: 1.2,
          ease: "power2.out",
          scrollTrigger: { trigger: el, start: "top 88%", once: true },
        });
      });

      // ── Reveal: zoom ───────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>('[data-gsap="zoom"]').forEach((el) => {
        gsap.from(el, {
          scale: 0.85,
          opacity: 0,
          duration: 1,
          ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", once: true },
        });
      });

      // ── Stagger children ───────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-gsap-stagger]").forEach((parent) => {
        const items = parent.children;
        if (!items.length) return;
        gsap.from(items, {
          y: 50,
          opacity: 0,
          duration: 0.9,
          ease: "power3.out",
          stagger: 0.08,
          scrollTrigger: { trigger: parent, start: "top 85%", once: true },
        });
      });

      // ── Parallax ───────────────────────────────────────────────
      gsap.utils.toArray<HTMLElement>("[data-gsap-parallax]").forEach((el) => {
        const distance = parseFloat(el.dataset.gsapParallax || "-80");
        gsap.to(el, {
          y: distance,
          ease: "none",
          scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
        });
      });

      // ── Magnetic buttons ───────────────────────────────────────
      const magnets = gsap.utils.toArray<HTMLElement>("[data-magnetic]");
      magnets.forEach((el) => {
        const move = (e: MouseEvent) => {
          const rect = el.getBoundingClientRect();
          const x = e.clientX - rect.left - rect.width / 2;
          const y = e.clientY - rect.top - rect.height / 2;
          gsap.to(el, { x: x * 0.3, y: y * 0.3, duration: 0.5, ease: "power3.out" });
        };
        const leave = () => gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: "elastic.out(1,0.4)" });
        el.addEventListener("mousemove", move);
        el.addEventListener("mouseleave", leave);
      });

      // ── Custom cursor ──────────────────────────────────────────
      const isFine = window.matchMedia("(pointer: fine)").matches;
      if (isFine && cursorRef.current && cursorDotRef.current) {
        const cursor = cursorRef.current;
        const dot = cursorDotRef.current;
        gsap.set([cursor, dot], { xPercent: -50, yPercent: -50 });
        const xTo = gsap.quickTo(cursor, "x", { duration: 0.5, ease: "power3" });
        const yTo = gsap.quickTo(cursor, "y", { duration: 0.5, ease: "power3" });
        const dx = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3" });
        const dy = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3" });
        const onMove = (e: MouseEvent) => {
          xTo(e.clientX); yTo(e.clientY); dx(e.clientX); dy(e.clientY);
        };
        const grow = () => gsap.to(cursor, { scale: 2.2, duration: 0.35, ease: "power3.out" });
        const shrink = () => gsap.to(cursor, { scale: 1, duration: 0.35, ease: "power3.out" });
        window.addEventListener("mousemove", onMove);
        document.querySelectorAll("a, button, [data-magnetic]").forEach((el) => {
          el.addEventListener("mouseenter", grow);
          el.addEventListener("mouseleave", shrink);
        });
      }
    });

    return () => ctx.revert();
  }, []);

  return (
    <>
      <div
        ref={progressRef}
        aria-hidden
        className="fixed top-0 left-0 right-0 h-[3px] z-[100] origin-left pointer-events-none"
        style={{
          transform: "scaleX(0)",
          background:
            "linear-gradient(90deg, oklch(0.65 0.22 250), oklch(0.78 0.16 250), oklch(0.88 0.12 245))",
          boxShadow: "0 0 16px oklch(0.65 0.22 250 / 0.6)",
        }}
      />
      <div
        ref={cursorRef}
        aria-hidden
        className="fixed top-0 left-0 w-10 h-10 rounded-full pointer-events-none z-[99] hidden md:block mix-blend-screen"
        style={{
          background:
            "radial-gradient(circle, oklch(0.78 0.16 250 / 0.55), oklch(0.65 0.22 250 / 0.15) 60%, transparent 70%)",
          filter: "blur(2px)",
        }}
      />
      <div
        ref={cursorDotRef}
        aria-hidden
        className="fixed top-0 left-0 w-1.5 h-1.5 rounded-full pointer-events-none z-[99] hidden md:block"
        style={{ background: "oklch(0.95 0.04 250)" }}
      />
    </>
  );
}
