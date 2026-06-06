import { Reveal } from "./Reveal";
import { Mail, Instagram, ArrowUpRight } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative glass p-10 md:p-20 text-center overflow-hidden rounded-[2.5rem]">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at center, oklch(0.65 0.22 250 / 0.3), transparent 60%)",
              }}
            />

            <div className="relative">
              <div className="label-tiny">Contact</div>
              <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-4">
                Ready to Build Something Great?
              </h2>
              <p className="text-foreground/65 text-base md:text-lg mb-10">
                Let's create a website that grows your brand.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                <a
                  href="mailto:ar.work.freelance@gmail.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_4px_14px_oklch(0.65_0.22_250/0.4),inset_0_1px_0_oklch(1_0_0/0.3)] hover:scale-[1.03] transition-all"
                >
                  <Mail size={16} /> Gmail
                </a>
                <a
                  href="mailto:arpawork@outlook.com"
                  className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold glass hover:bg-white/[0.08] transition-all"
                >
                  <Mail size={16} /> Outlook
                </a>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl mx-auto text-left">
                <a
                  href="https://www.fiverr.com/s/2KbwPQ8"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass p-5 flex items-center gap-4 hover:-translate-y-1 hover:border-primary/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center font-bold text-sm text-primary-glow">
                    fiv
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">Fiverr</div>
                    <div className="text-xs text-foreground/50 truncate">5.0 ★ rated seller</div>
                  </div>
                  <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary-glow transition-colors" />
                </a>

                <a
                  href="https://www.instagram.com/ar.work.freelance"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group glass p-5 flex items-center gap-4 hover:-translate-y-1 hover:border-primary/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center text-primary-glow">
                    <Instagram size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">Instagram</div>
                    <div className="text-xs text-foreground/50 truncate">@ar.work.freelance</div>
                  </div>
                  <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary-glow transition-colors" />
                </a>

                <a
                  href="mailto:ar.work.freelance@gmail.com"
                  className="group glass p-5 flex items-center gap-4 hover:-translate-y-1 hover:border-primary/40 transition-all"
                >
                  <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center text-primary-glow">
                    <Mail size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-semibold text-sm">Email</div>
                    <div className="text-xs text-foreground/50 truncate">ar.work.freelance@gmail.com</div>
                  </div>
                  <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary-glow transition-colors" />
                </a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
