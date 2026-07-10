import { Reveal } from "./Reveal";
import { Star } from "lucide-react";

const testimonials = [
  {
    quote: "Aryan delivered a landing page that doubled our conversion rate in two weeks. Fast, clean, and clearly cares about the result.",
    name: "Sarah K.",
    platform: "Fiverr Client",
  },
  {
    quote: "Best dev I've hired. Communication was sharp, deadlines were early, and the site looks better than the brands I idolize.",
    name: "Marcus T.",
    platform: "Direct Client",
  },
  {
    quote: "He rebuilt my creator site from scratch — the speed and design upgrade was night and day. Subscribers noticed immediately.",
    name: "Jonah W.",
    platform: "Fiverr Client",
  },
  {
    quote: "Smooth process, thoughtful design choices, and code I can actually maintain. I'll be coming back for round two.",
    name: "Priya R.",
    platform: "Direct Client",
  },
  {
    quote: "From the first call he understood my brand. The final site feels premium, loads instantly, and finally converts.",
    name: "Daniel O.",
    platform: "Fiverr Client",
  },
];

function avatarUrl(name: string) {
  return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0A84FF&color=fff&size=96&bold=true`;
}

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal className="text-center max-w-2xl mx-auto">
          <div className="label-tiny">Testimonials</div>
          <h2 className="text-[clamp(32px,5vw,56px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4">
            What Clients Say
          </h2>
        </Reveal>
      </div>

      <div className="mt-12 md:mt-16 flex gap-5 overflow-x-auto snap-x snap-mandatory no-scrollbar px-5 md:px-8 pb-6">
        {testimonials.map((t) => (
          <div
            key={t.name}
            className="flex-shrink-0 w-[85vw] sm:w-[400px] glass p-7 md:p-8 snap-start"
          >
            <div className="flex text-amber-400 mb-4">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star key={i} size={14} fill="currentColor" strokeWidth={0} />
              ))}
            </div>
            <p className="text-[15px] md:text-base text-foreground/85 leading-[1.65] mb-6">
              "{t.quote}"
            </p>
            <div className="flex items-center gap-3">
              <img
                src={avatarUrl(t.name)}
                alt=""
                loading="lazy"
                className="w-10 h-10 rounded-full"
              />
              <div>
                <div className="text-sm font-semibold">{t.name}</div>
                <div className="text-xs text-foreground/50">{t.platform}</div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
