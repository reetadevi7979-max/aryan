import { Reveal } from "./Reveal";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "Aether Studios",
    cat: "Creator Brand Site",
    img: "https://images.unsplash.com/photo-1551434678-e076c223a692?auto=format&fit=crop&w=1600&q=80",
    size: "lg",
  },
  {
    name: "Northwind Apparel",
    cat: "Shopify Storefront",
    img: "https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1100&q=80",
    size: "md",
  },
  {
    name: "Lumen Agency",
    cat: "WordPress Build",
    img: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?auto=format&fit=crop&w=1100&q=80",
    size: "sm",
  },
  {
    name: "Orbit Dashboard",
    cat: "Custom Web App",
    img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1100&q=80",
    size: "sm",
  },
  {
    name: "Halo Magazine",
    cat: "Editorial Website",
    img: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1100&q=80",
    size: "md",
  },
  {
    name: "Mono Portfolio",
    cat: "Personal Brand",
    img: "https://images.unsplash.com/photo-1517292987719-0369a794ec0f?auto=format&fit=crop&w=1600&q=80",
    size: "lg",
  },
];

const sizeClass: Record<string, string> = {
  lg: "sm:col-span-2 lg:col-span-4 aspect-[16/9]",
  md: "sm:col-span-1 lg:col-span-2 aspect-[4/3]",
  sm: "sm:col-span-1 lg:col-span-2 aspect-[4/3]",
};

export function Work() {
  return (
    <section id="work" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Portfolio</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            Selected Work
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            A look at recent projects — brands, creators and businesses I've helped grow.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div data-gsap-stagger className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4 md:gap-5">
            {projects.map((p) => (
              <a
                key={p.name}
                href="#contact"
                className={`group relative overflow-hidden rounded-3xl border border-border bg-card cursor-pointer ${sizeClass[p.size]}`}
              >
                <img
                  src={p.img}
                  alt={`${p.name} — ${p.cat}`}
                  loading="lazy"
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 group-hover:scale-[1.06] transition-all duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5 md:p-6 transition-all duration-500">
                  <div className="text-[11px] tracking-[0.15em] uppercase font-medium text-primary-glow">
                    {p.cat}
                  </div>
                  <div className="flex items-center justify-between mt-1.5">
                    <h3 className="text-lg md:text-xl font-semibold">{p.name}</h3>
                    <span className="inline-flex items-center gap-1 text-sm text-primary-glow opacity-0 group-hover:opacity-100 transition-opacity">
                      View <ArrowUpRight size={16} />
                    </span>
                  </div>
                </div>
              </a>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
