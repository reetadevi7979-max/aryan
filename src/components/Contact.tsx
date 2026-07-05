import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import {
  Mail,
  Instagram,
  ArrowUpRight,
  Send,
  CheckCircle2,
  Loader2,
  Clock,
  MapPin,
  Sparkles,
  Globe,
} from "lucide-react";

const budgets = ["< $500", "$500 – $1.5k", "$1.5k – $5k", "$5k+"];
const projectTypes = [
  "Portfolio",
  "Landing Page",
  "E-commerce",
  "Web App",
  "Redesign",
  "Other",
];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [budget, setBudget] = useState(budgets[1]);
  const [type, setType] = useState(projectTypes[0]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("budget", budget);
    fd.set("project_type", type);

    setStatus("sending");
    try {
      const res = await fetch("https://formsubmit.co/ajax/ar.work.freelance@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: fd,
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("sent");
      form.reset();
      setBudget(budgets[1]);
      setType(projectTypes[0]);
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32 relative overflow-hidden">
      {/* Ambient chroma to echo hero */}
      <div aria-hidden className="absolute inset-0 pointer-events-none -z-0">
        <div
          className="absolute top-10 left-1/4 w-[45vw] h-[45vw] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, oklch(0.62 0.26 265 / 0.6), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[40vw] h-[40vw] rounded-full opacity-40"
          style={{
            background:
              "radial-gradient(circle, oklch(0.58 0.28 320 / 0.55), transparent 60%)",
            filter: "blur(120px)",
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          {/* Section header */}
          <div className="text-center mb-14 md:mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass text-[11px] tracking-[0.18em] uppercase text-foreground/70 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
              Currently taking 2 projects for August
            </div>
            <h2 className="text-[clamp(36px,6vw,72px)] font-bold leading-[1.02] tracking-[-0.04em]">
              Let's build something <br />
              <span className="text-gradient">worth remembering.</span>
            </h2>
            <p className="text-foreground/60 text-base md:text-lg max-w-2xl mx-auto mt-6 leading-[1.7]">
              Tell me about your idea. I reply personally within 24 hours with a plan,
              timeline, and a fixed quote — no forms, no bots.
            </p>
          </div>

          <div className="grid lg:grid-cols-[0.9fr_1.1fr] gap-6 lg:gap-8">
            {/* LEFT — info column */}
            <div className="space-y-6">
              {/* Stats card */}
              <div className="relative glass rounded-3xl p-6 md:p-8 overflow-hidden">
                <div
                  aria-hidden
                  className="absolute inset-0 pointer-events-none opacity-60"
                  style={{
                    background:
                      "radial-gradient(circle at 20% 0%, oklch(0.65 0.22 250 / 0.25), transparent 60%)",
                  }}
                />
                <div className="relative grid grid-cols-3 gap-4">
                  <Stat value="< 24h" label="Response time" />
                  <Stat value="4+ yrs" label="Freelancing" />
                  <Stat value="5.0★" label="Fiverr rating" />
                </div>
              </div>

              {/* Availability info */}
              <div className="glass rounded-3xl p-6 md:p-7 space-y-4">
                <InfoRow
                  icon={<Clock size={16} />}
                  title="Working hours"
                  desc="Mon – Sat · 9:00 – 20:00 IST"
                />
                <InfoRow
                  icon={<MapPin size={16} />}
                  title="Based in"
                  desc="India · Working with clients worldwide"
                />
                <InfoRow
                  icon={<Globe size={16} />}
                  title="Timezone friendly"
                  desc="Async-first · Overlaps with EU & US mornings"
                />
              </div>

              {/* Social channels */}
              <div className="space-y-3">
                <SocialCard
                  href="mailto:ar.work.freelance@gmail.com"
                  icon={<Mail size={18} />}
                  title="Email"
                  handle="ar.work.freelance@gmail.com"
                />
                <SocialCard
                  href="https://www.instagram.com/ar.work.freelance"
                  icon={<Instagram size={18} />}
                  title="Instagram"
                  handle="@ar.work.freelance"
                />
                <SocialCard
                  href="https://www.fiverr.com/s/2KbwPQ8"
                  icon={<span className="font-black text-sm">fiv</span>}
                  title="Fiverr"
                  handle="5.0 ★ rated seller"
                />
              </div>
            </div>

            {/* RIGHT — form */}
            <form
              onSubmit={onSubmit}
              className="relative glass rounded-3xl p-6 sm:p-8 md:p-10 space-y-5 overflow-hidden"
            >
              <div
                aria-hidden
                className="absolute -top-24 -right-24 w-[380px] h-[380px] rounded-full pointer-events-none opacity-50"
                style={{
                  background:
                    "radial-gradient(circle, oklch(0.65 0.22 250 / 0.35), transparent 65%)",
                  filter: "blur(50px)",
                }}
              />

              <div className="relative flex items-center gap-2 text-[11px] tracking-[0.18em] uppercase text-foreground/60 mb-2">
                <Sparkles size={12} className="text-primary-glow" />
                Project brief
              </div>

              {/* honeypot + formsubmit config */}
              <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
              <input type="hidden" name="_subject" value="New project enquiry from portfolio" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_captcha" value="false" />

              <div className="grid sm:grid-cols-2 gap-4 relative">
                <Field label="Your name">
                  <input required name="name" maxLength={80} placeholder="Jane Doe" className="field" />
                </Field>
                <Field label="Email">
                  <input
                    required
                    type="email"
                    name="email"
                    maxLength={120}
                    placeholder="you@brand.com"
                    className="field"
                  />
                </Field>
              </div>

              <Field label="Company / brand (optional)">
                <input name="company" maxLength={80} placeholder="Acme Studio" className="field" />
              </Field>

              <Field label="Project type">
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((t) => (
                    <ChipButton key={t} active={type === t} onClick={() => setType(t)}>
                      {t}
                    </ChipButton>
                  ))}
                </div>
              </Field>

              <Field label="Budget (USD)">
                <div className="flex flex-wrap gap-2">
                  {budgets.map((b) => (
                    <ChipButton key={b} active={budget === b} onClick={() => setBudget(b)}>
                      {b}
                    </ChipButton>
                  ))}
                </div>
              </Field>

              <Field label="Tell me about the project">
                <textarea
                  required
                  name="message"
                  rows={5}
                  maxLength={2000}
                  placeholder="Goals, references, timeline, anything I should know…"
                  className="field resize-none"
                />
              </Field>

              <button
                type="submit"
                disabled={status === "sending"}
                data-magnetic
                className="relative w-full inline-flex items-center justify-center gap-2 px-7 py-4 rounded-full text-[15px] font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_10px_30px_oklch(0.65_0.22_250/0.45),inset_0_1px_0_oklch(1_0_0/0.35)] hover:shadow-[0_14px_40px_oklch(0.65_0.22_250/0.6)] transition-all disabled:opacity-70"
              >
                {status === "sending" ? (
                  <>
                    <Loader2 size={16} className="animate-spin" /> Sending your brief…
                  </>
                ) : status === "sent" ? (
                  <>
                    <CheckCircle2 size={16} /> Received — I'll reply within 24h
                  </>
                ) : (
                  <>
                    Send project brief <Send size={15} />
                  </>
                )}
              </button>

              <p className="text-[11px] text-foreground/45 text-center">
                Prefer email? Reach me at{" "}
                <a
                  href="mailto:ar.work.freelance@gmail.com"
                  className="underline underline-offset-2 hover:text-foreground/80"
                >
                  ar.work.freelance@gmail.com
                </a>
              </p>

              {status === "error" && (
                <p className="text-xs text-destructive text-center">
                  Couldn't send. Please email me directly.
                </p>
              )}
            </form>
          </div>
        </Reveal>
      </div>

      <style>{`
        .field {
          width: 100%;
          background: oklch(1 0 0 / 0.04);
          border: 1px solid oklch(1 0 0 / 0.08);
          border-radius: 14px;
          padding: 13px 15px;
          font-size: 14px;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .field::placeholder { color: oklch(1 0 0 / 0.35); }
        .field:focus {
          border-color: oklch(0.65 0.22 250 / 0.6);
          box-shadow: 0 0 0 4px oklch(0.65 0.22 250 / 0.18);
          background: oklch(1 0 0 / 0.06);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block relative">
      <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}

function ChipButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
        active
          ? "bg-primary text-primary-foreground border-primary shadow-[0_0_18px_oklch(0.65_0.22_250/0.5)]"
          : "border-white/10 text-foreground/70 hover:border-primary/40 hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="text-center">
      <div className="text-2xl md:text-3xl font-bold text-gradient">{value}</div>
      <div className="text-[10.5px] tracking-[0.14em] uppercase text-foreground/55 mt-1">
        {label}
      </div>
    </div>
  );
}

function InfoRow({
  icon,
  title,
  desc,
}: {
  icon: React.ReactNode;
  title: string;
  desc: string;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="w-9 h-9 rounded-xl glass-blue inline-flex items-center justify-center text-primary-glow shrink-0">
        {icon}
      </div>
      <div className="min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-foreground/55">{desc}</div>
      </div>
    </div>
  );
}

function SocialCard({
  href,
  icon,
  title,
  handle,
}: {
  href: string;
  icon: React.ReactNode;
  title: string;
  handle: string;
}) {
  const external = href.startsWith("http");
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className="group glass p-4 rounded-2xl flex items-center gap-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all"
    >
      <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center text-primary-glow">
        {icon}
      </div>
      <div className="flex-1 min-w-0">
        <div className="font-semibold text-sm">{title}</div>
        <div className="text-xs text-foreground/55 truncate">{handle}</div>
      </div>
      <ArrowUpRight
        size={16}
        className="text-foreground/40 group-hover:text-primary-glow group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all"
      />
    </a>
  );
}
