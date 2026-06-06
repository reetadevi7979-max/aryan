import { Reveal } from "./Reveal";
import { Zap, Globe, Clapperboard, ShoppingBag, Sparkles, Rocket } from "lucide-react";

const services = [
  { icon: Zap, title: "Landing Pages", desc: "High-converting pages that turn visitors into clients — fast.", wide: true },
  { icon: Globe, title: "Full Websites", desc: "End-to-end custom sites, designed and built to perform.", wide: true },
  { icon: Clapperboard, title: "Creator Sites", desc: "Personal brands that look as good as your content." },
  { icon: ShoppingBag, title: "E-Commerce", desc: "Shopify & WooCommerce stores built to sell." },
  { icon: Sparkles, title: "Web Redesign", desc: "Transform outdated sites into modern powerhouses." },
  { icon: Rocket, title: "SEO & Speed", desc: "Make Google love your site and users stay longer." },
];

export function Services() {
  return (
    <section id="services" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Services</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
            What I Build For You
          </h2>
          <p className="text-foreground/65 text-base md:text-lg">
            From landing pages to full ecommerce stacks — websites engineered to convert.
          </p>
        </Reveal>

        <Reveal className="mt-12 md:mt-16">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-5 auto-rows-[220px]">
            {services.map(({ icon: Icon, title, desc, wide }) => (
              <div
                key={title}
                className={`group relative p-7 rounded-3xl glass flex flex-col justify-end overflow-hidden transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-[0_0_0_1px_oklch(0.65_0.22_250/0.35),0_30px_60px_-20px_oklch(0.65_0.22_250/0.3)] ${
                  wide ? "lg:col-span-2" : ""
                }`}
              >
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                  style={{
                    background:
                      "radial-gradient(circle at 80% 0%, oklch(0.65 0.22 250 / 0.15), transparent 60%)",
                  }}
                />
                <div className="relative w-14 h-14 rounded-2xl glass-blue inline-flex items-center justify-center mb-auto text-primary-glow">
                  <Icon size={24} strokeWidth={1.7} />
                </div>
                <h3 className="relative text-xl font-semibold mt-5 mb-2 tracking-[-0.02em]">
                  {title}
                </h3>
                <p className="relative text-sm text-foreground/65 leading-[1.6]">{desc}</p>
              </div>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
