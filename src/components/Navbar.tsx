import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";
import { assetUrl } from "@/lib/asset-url";

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
      className={`fixed left-1/2 -translate-x-1/2 z-50 transition-all duration-500 ${
        scrolled ? "top-3 w-[min(1160px,94%)]" : "top-5 w-[min(1200px,96%)]"
      }`}
    >
      <div
        className="relative flex items-center justify-between h-[64px] px-4 md:px-6 rounded-full overflow-hidden"
        style={{
          background:
            "linear-gradient(140deg, oklch(1 0 0 / 0.08), oklch(1 0 0 / 0.02) 55%, oklch(0.55 0.2 250 / 0.10))",
          border: "1px solid oklch(1 0 0 / 0.10)",
          boxShadow: scrolled
            ? "0 20px 50px -20px oklch(0.55 0.2 250 / 0.45), inset 0 1px 0 oklch(1 0 0 / 0.12), inset 0 -1px 0 oklch(0 0 0 / 0.25)"
            : "0 14px 40px -20px oklch(0.55 0.2 250 / 0.35), inset 0 1px 0 oklch(1 0 0 / 0.10)",
          backdropFilter: "blur(22px) saturate(160%)",
        }}
      >
        {/* sheen */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-px"
          style={{
            background:
              "linear-gradient(90deg, transparent, oklch(1 0 0 / 0.55), transparent)",
          }}
        />
        <span
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-full opacity-60"
          style={{
            background:
              "radial-gradient(60% 120% at 50% -20%, oklch(1 0 0 / 0.10), transparent 60%)",
          }}
        />

        <a
          href="#top"
          aria-label="An Open Mind Freelancer — Aryan Patel"
          className="relative flex items-center gap-2.5"
        >
          <img
            src={assetUrl(logo)}
            alt="An Open Mind Freelancer logo"
            className="w-9 h-9 rounded-full ring-1 ring-primary/40 shadow-[0_0_20px_oklch(0.65_0.22_250/0.45)] animate-logo-pulse"
          />
          <span className="hidden sm:flex flex-col leading-tight">
            <span className="text-[13px] font-bold tracking-tight">Aryan Patel</span>
            <span className="text-[9.5px] tracking-[0.22em] uppercase text-foreground/55">
              An Open Mind
            </span>
          </span>
        </a>

        <nav
          aria-label="Primary"
          className="hidden md:flex items-center gap-1 relative rounded-full px-1.5 py-1"
          style={{
            background: "oklch(1 0 0 / 0.04)",
            border: "1px solid oklch(1 0 0 / 0.06)",
          }}
        >
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-3.5 py-1.5 rounded-full text-[13px] font-medium text-foreground/70 hover:text-foreground hover:bg-white/[0.06] transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="relative hidden md:inline-flex items-center gap-2 px-5 py-2 rounded-full text-[13px] font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_6px_18px_oklch(0.65_0.22_250/0.5),inset_0_1px_0_oklch(1_0_0/0.35)] hover:scale-[1.03] hover:shadow-[0_10px_32px_oklch(0.65_0.22_250/0.6)] transition-all"
        >
          Hire Me
        </a>

        <button
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
          className="relative md:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/[0.06] border border-white/10"
        >
          {open ? <X size={18} /> : <Menu size={18} />}
        </button>
      </div>


      {open && (
        <div
          className="md:hidden mt-2 rounded-3xl px-5 py-6 flex flex-col gap-4"
          style={{
            background:
              "linear-gradient(160deg, oklch(0.14 0.02 250 / 0.85), oklch(0.10 0.02 250 / 0.75))",
            border: "1px solid oklch(1 0 0 / 0.08)",
            backdropFilter: "blur(22px) saturate(160%)",
          }}
        >
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
