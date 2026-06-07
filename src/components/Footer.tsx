import { Instagram } from "lucide-react";
import logo from "@/assets/logo.png.asset.json";

export function Footer() {
  return (
    <footer className="py-10 border-t border-white/[0.06] mt-10">
      <div className="max-w-7xl mx-auto px-5 md:px-8 flex flex-wrap items-center justify-between gap-5">
        <a href="#top" className="flex items-center gap-2.5" aria-label="Home">
          <img
            src={logo.url}
            alt="An Open Mind Freelancer logo"
            className="w-10 h-10 rounded-full ring-1 ring-primary/30"
          />
          <span className="text-sm font-semibold">Aryan Patel</span>
        </a>
        <div className="text-xs md:text-sm text-foreground/50 order-3 sm:order-2 w-full sm:w-auto text-center">
          © {new Date().getFullYear()} Aryan Patel · An Open Mind Freelancer.
        </div>
        <div className="flex gap-2.5 order-2 sm:order-3">
          <a
            href="https://www.instagram.com/ar.work.freelance"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Instagram"
            className="w-10 h-10 rounded-xl glass inline-flex items-center justify-center hover:border-primary/40 hover:text-primary-glow transition-colors"
          >
            <Instagram size={16} />
          </a>
          <a
            href="https://www.fiverr.com/s/2KbwPQ8"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Fiverr"
            className="w-10 h-10 rounded-xl glass inline-flex items-center justify-center text-xs font-bold hover:border-primary/40 hover:text-primary-glow transition-colors"
          >
            fiv
          </a>
        </div>
      </div>
    </footer>
  );
}
