import { useState, type FormEvent } from "react";
import { Reveal } from "./Reveal";
import { Mail, Instagram, ArrowUpRight, Send, CheckCircle2, Loader2 } from "lucide-react";

const budgets = ["< $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+"];

export function Contact() {
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [budget, setBudget] = useState(budgets[1]);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    fd.set("budget", budget);

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
    } catch {
      setStatus("error");
    }
  }

  return (
    <section id="contact" className="py-24 md:py-32">
      <div className="max-w-7xl mx-auto px-5 md:px-8">
        <Reveal>
          <div className="relative glass p-6 sm:p-10 md:p-16 overflow-hidden rounded-[2.5rem]">
            <div
              aria-hidden
              className="absolute inset-0 pointer-events-none"
              style={{
                background:
                  "radial-gradient(ellipse at top, oklch(0.65 0.22 250 / 0.28), transparent 60%)",
              }}
            />

            <div className="relative grid lg:grid-cols-[1fr_1.1fr] gap-10 lg:gap-16">
              {/* Left: pitch + social */}
              <div>
                <div className="label-tiny">Contact</div>
                <h2 className="text-[clamp(30px,4.5vw,52px)] font-bold leading-[1.05] tracking-[-0.035em] mt-4 mb-5">
                  Let's Build <br />
                  <span className="text-gradient">Something Great.</span>
                </h2>
                <p className="text-foreground/65 text-base md:text-lg leading-[1.7] mb-8">
                  Share what you want to build and your budget — I'll reply within 24 hours
                  with a clear plan, timeline, and estimate.
                </p>

                <div className="space-y-3">
                  <a
                    href="mailto:ar.work.freelance@gmail.com"
                    className="group glass p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center text-primary-glow">
                      <Mail size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">Email</div>
                      <div className="text-xs text-foreground/55 truncate">
                        ar.work.freelance@gmail.com
                      </div>
                    </div>
                    <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary-glow transition-colors" />
                  </a>

                  <a
                    href="https://www.instagram.com/ar.work.freelance"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center text-primary-glow">
                      <Instagram size={18} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">Instagram</div>
                      <div className="text-xs text-foreground/55 truncate">@ar.work.freelance</div>
                    </div>
                    <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary-glow transition-colors" />
                  </a>

                  <a
                    href="https://www.fiverr.com/s/2KbwPQ8"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group glass p-4 flex items-center gap-4 hover:-translate-y-0.5 hover:border-primary/40 transition-all"
                  >
                    <div className="w-11 h-11 rounded-xl glass-blue inline-flex items-center justify-center font-bold text-sm text-primary-glow">
                      fiv
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-sm">Fiverr</div>
                      <div className="text-xs text-foreground/55 truncate">5.0 ★ rated seller</div>
                    </div>
                    <ArrowUpRight size={16} className="text-foreground/40 group-hover:text-primary-glow transition-colors" />
                  </a>
                </div>
              </div>

              {/* Right: form */}
              <form onSubmit={onSubmit} className="glass rounded-3xl p-5 sm:p-7 space-y-4">
                {/* honeypot + config for formsubmit */}
                <input type="text" name="_honey" className="hidden" tabIndex={-1} autoComplete="off" />
                <input type="hidden" name="_subject" value="New project enquiry from portfolio" />
                <input type="hidden" name="_template" value="table" />
                <input type="hidden" name="_captcha" value="false" />

                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Your name">
                    <input
                      required
                      name="name"
                      maxLength={80}
                      placeholder="Jane Doe"
                      className="field"
                    />
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

                <Field label="Budget (USD)">
                  <div className="flex flex-wrap gap-2">
                    {budgets.map((b) => (
                      <button
                        type="button"
                        key={b}
                        onClick={() => setBudget(b)}
                        className={`px-3.5 py-2 rounded-full text-xs font-semibold transition-all border ${
                          budget === b
                            ? "bg-primary text-primary-foreground border-primary shadow-[0_0_18px_oklch(0.65_0.22_250/0.5)]"
                            : "border-white/10 text-foreground/70 hover:border-primary/40 hover:text-foreground"
                        }`}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </Field>

                <Field label="What do you want to build?">
                  <textarea
                    required
                    name="message"
                    rows={5}
                    maxLength={2000}
                    placeholder="Tell me about your project — goals, references, timeline…"
                    className="field resize-none"
                  />
                </Field>

                <button
                  type="submit"
                  disabled={status === "sending"}
                  className="w-full inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-[15px] font-semibold text-primary-foreground bg-gradient-to-b from-primary-glow to-primary shadow-[0_4px_14px_oklch(0.65_0.22_250/0.4),inset_0_1px_0_oklch(1_0_0/0.3)] hover:scale-[1.01] hover:shadow-[0_8px_30px_oklch(0.65_0.22_250/0.55)] transition-all disabled:opacity-70"
                >
                  {status === "sending" ? (
                    <>
                      <Loader2 size={16} className="animate-spin" /> Sending…
                    </>
                  ) : status === "sent" ? (
                    <>
                      <CheckCircle2 size={16} /> Sent — I'll reply within 24h
                    </>
                  ) : (
                    <>
                      Send Project Brief <Send size={15} />
                    </>
                  )}
                </button>
                {status === "error" && (
                  <p className="text-xs text-destructive text-center">
                    Couldn't send. Email me directly at ar.work.freelance@gmail.com
                  </p>
                )}
              </form>
            </div>
          </div>
        </Reveal>
      </div>

      <style>{`
        .field {
          width: 100%;
          background: oklch(1 0 0 / 0.04);
          border: 1px solid oklch(1 0 0 / 0.08);
          border-radius: 14px;
          padding: 12px 14px;
          font-size: 14px;
          color: var(--color-foreground);
          outline: none;
          transition: border-color .2s ease, box-shadow .2s ease, background .2s ease;
        }
        .field::placeholder { color: oklch(1 0 0 / 0.35); }
        .field:focus {
          border-color: oklch(0.65 0.22 250 / 0.55);
          box-shadow: 0 0 0 4px oklch(0.65 0.22 250 / 0.18);
          background: oklch(1 0 0 / 0.06);
        }
      `}</style>
    </section>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="block text-[11px] font-medium uppercase tracking-[0.14em] text-foreground/55 mb-2">
        {label}
      </span>
      {children}
    </label>
  );
}
