const skills = [
  "HTML5", "CSS3", "JavaScript", "React.js", "Next.js", "WordPress",
  "Webflow", "Shopify", "Figma", "SEO", "Performance", "Landing Pages",
  "UI/UX Design", "API Integration", "CMS", "Web Animation",
];

function Pill({ label }: { label: string }) {
  return (
    <span className="flex-shrink-0 px-4 py-2.5 rounded-full text-[13px] font-medium text-foreground/85 bg-white/[0.03] border border-primary/20 backdrop-blur-md">
      {label}
    </span>
  );
}

export function MarqueeSkills() {
  const row1 = [...skills, ...skills];
  const row2 = [...skills.slice().reverse(), ...skills.slice().reverse()];

  return (
    <section
      aria-label="Skills"
      className="py-14 md:py-16 border-y border-border overflow-hidden"
    >
      <div className="flex gap-3 w-max animate-marquee">
        {row1.map((s, i) => (
          <Pill key={`a-${i}`} label={s} />
        ))}
      </div>
      <div className="flex gap-3 w-max animate-marquee-reverse mt-3">
        {row2.map((s, i) => (
          <Pill key={`b-${i}`} label={s} />
        ))}
      </div>
    </section>
  );
}
