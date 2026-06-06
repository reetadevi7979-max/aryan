import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Work", href: "#work" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/75 border-b border-border backdrop-blur-xl"
          : "bg-background/40 border-b border-transparent backdrop-blur-md"
      }`}
    >
      <div className="max-w-7xl mx-auto px-5 md:px-8 h-[68px] flex items-center justify-between">
        <a
          href="#top"
          aria-label="Aryan Patel home"
          className="inline-flex items-center justify-center w-11 h-11 rounded-2xl glass-blue font-black text-[15px] tracking-tight shadow-[0_0_24px_oklch(0.65_0.22_250/0.35),inset_0_0_12px_oklch(1_0_0/0.05)]"
        >
          AP
        </a>

        <nav aria-label="Primary" className="hidden md:flex items-center gap-9">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-foreground/70 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_4px_14px_oklch(0.65_0.22_250/0.4),inset_0_1px_0_oklch(1_0_0/0.3)] hover:scale-[1.03] hover:shadow-[0_8px_30px_oklch(0.65_0.22_250/0.55)] transition-all"
        >
          Hire Me
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-xl glass"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>

      {open && (
        <div className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border px-5 py-6 flex flex-col gap-4">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              onClick={() => setOpen(false)}
              className="text-lg font-semibold text-foreground"
            >
              {l.label}
            </a>
          ))}
          <a
            href="#contact"
            onClick={() => setOpen(false)}
            className="self-start mt-2 px-5 py-2.5 rounded-full text-sm font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary"
          >
            Hire Me
          </a>
        </div>
      )}
    </header>
  );
}
