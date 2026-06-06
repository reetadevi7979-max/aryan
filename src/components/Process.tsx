import { useEffect, useRef } from "react";
import { Reveal } from "./Reveal";

const steps = [
  { n: "01", title: "Discovery", desc: "We talk goals, audience, and vision. I learn your business so the site speaks for it." },
  { n: "02", title: "Design", desc: "I craft the blueprint and visual direction — pixel-precise mockups you can feel." },
  { n: "03", title: "Build", desc: "Clean code, fast load, pixel-perfect — across every device." },
  { n: "04", title: "Launch", desc: "Go live, SEO-ready, fully optimized — with handover and support." },
];

export function Process() {
  const refs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const i = Number((entry.target as HTMLElement).dataset.index);
            setTimeout(() => entry.target.classList.add("in-view"), i * 130);
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 },
    );
    refs.current.forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <section id="process" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Process</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            How We'll Work Together
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            A clear, four-step rhythm — from first call to launch day.
          </p>
        </Reveal>

        <div className="relative mt-16 md:mt-20">
          {/* timeline line */}
          <div
            aria-hidden
            className="absolute top-0 bottom-0 left-5 md:left-1/2 w-px md:-translate-x-1/2"
            style={{
              background:
                "linear-gradient(180deg, transparent, oklch(0.65 0.22 250 / 0.5), transparent)",
            }}
          />

          <div className="flex flex-col gap-10 md:gap-14">
            {steps.map((s, i) => (
              <div
                key={s.n}
                ref={(el) => { refs.current[i] = el; }}
                data-index={i}
                className="process-step grid grid-cols-[40px_1fr] md:grid-cols-2 items-center gap-5 md:gap-10"
              >
                <div
                  className={`${
                    i % 2 === 0
                      ? "md:order-1 md:text-right md:pr-12"
                      : "md:order-3 md:pl-12"
                  } row-start-1 col-start-2 md:col-start-auto`}
                >
                  <div className="glass p-7 md:p-8 relative inline-block max-w-md w-full text-left">
                    <div className="absolute top-3 right-5 text-5xl md:text-6xl font-black text-white/[0.06] tracking-[-0.04em] leading-none">
                      {s.n}
                    </div>
                    <h3 className="text-xl md:text-2xl font-semibold tracking-[-0.02em] mb-2 relative">
                      {s.title}
                    </h3>
                    <p className="text-sm md:text-base text-foreground/65 leading-[1.6] relative">
                      {s.desc}
                    </p>
                  </div>
                </div>

                {/* dot */}
                <div className="md:order-2 row-start-1 col-start-1 md:col-start-auto flex items-center justify-center">
                  <div
                    className="w-3.5 h-3.5 rounded-full bg-primary relative z-10"
                    style={{ boxShadow: "0 0 20px oklch(0.65 0.22 250 / 0.8)" }}
                  />
                </div>

                {/* spacer */}
                <div className={`${i % 2 === 0 ? "md:order-3" : "md:order-1"} hidden md:block`} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
