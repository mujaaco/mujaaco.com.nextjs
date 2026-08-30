"use client";

import { ArrowRight, Globe, Heart, Mail, Send } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { submitContactForm } from "../actions/contact";
import { Button } from "./ui/Button";

interface FooterProps {
  locale: string;
  footer: {
    connect: string;
    connectDescription: string;
    getInTouch: string;
    quickMessage: string;
    namePlaceholder: string;
    emailPlaceholder: string;
    subjectPlaceholder: string;
    messagePlaceholder: string;
    sendMessage: string;
    sending: string;
    copyright: string;
    builtWith: string;
    and: string;
    openSource: string;
    tagline: string;
    worldwide: string;
    errorMessage: string;
  };
  authorBio: string;
  authorName: string;
}

export default function Footer({
  footer: t,
  authorBio,
  authorName,
}: FooterProps) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);

  async function handleSubmit(formData: FormData) {
    setMsg(null);
    setPending(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setMsg({ ok: true, text: result.message });
        const f = document.querySelector("form") as HTMLFormElement;
        if (f) f.reset();
      } else setMsg({ ok: false, text: result.message });
    } catch {
      setMsg({ ok: false, text: t.errorMessage });
    } finally {
      setPending(false);
    }
  }

  return (
    <footer className="relative overflow-hidden border-t border-border/20">
      {/* ── Upper CTA ── */}
      <div className="relative border-b border-border/20">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 right-[10%] w-[400px] h-[300px] rounded-full bg-[var(--color-wave-1)]/3 blur-[120px] animate-pulse-slow opacity-30" />
          <div className="absolute top-1/2 left-[5%] w-[300px] h-[250px] rounded-full bg-[var(--color-wave-2)]/2 blur-[100px] animate-pulse-slow animation-delay-3000 opacity-30" />
        </div>
        <div className="relative max-w-2xl mx-auto px-4 sm:px-6 py-16 text-center">
          <h2 className="text-2xl sm:text-3xl font-black tracking-tight mb-4">
            <span className="wave-gradient-text">{t.connect}</span>
          </h2>
          <p className="text-sm text-foreground/45 font-light max-w-md mx-auto mb-8">
            {t.connectDescription}
          </p>
          <Button
            variant="outline"
            size="lg"
            asChild
            className="border-primary/20 hover:border-primary/40 hover:bg-primary/[0.04] transition-all duration-500 px-8 py-6 h-auto rounded-2xl group shadow-sm hover:shadow-lg hover:shadow-primary/5"
          >
            <a
              href="mailto:hello@mujaaco.com"
              className="inline-flex items-center gap-3 text-sm font-semibold"
            >
              <Mail className="w-4 h-4 text-primary/50 group-hover:text-primary transition-colors" />
              {t.getInTouch}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </div>
      </div>

      {/* ── Main Content ── */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-12 mb-16">
          {/* Left — Brand */}
          <div className="md:col-span-2 flex flex-col items-center md:items-start">
            <div className="relative mb-5">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/30 via-purple-500/20 to-transparent blur-md opacity-60" />
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/30 shadow-xl shadow-primary/10">
                <Image
                  src="/img/profile.png"
                  alt={authorName}
                  width={80}
                  height={80}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
              </div>
            </div>
            <span className="text-lg font-bold text-foreground mb-1">
              {authorName}
            </span>
            <span className="text-xs text-foreground/40 mb-4">{authorBio}</span>
            <p className="text-sm text-foreground/45 leading-relaxed mb-6 max-w-sm text-center md:text-start">
              {t.tagline}
            </p>
            <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
              {[
                {
                  n: "Linux",
                  c: "bg-amber-500/5 text-amber-500/50 border-amber-500/10",
                },
                {
                  n: "Rust",
                  c: "bg-orange-500/5 text-orange-500/50 border-orange-500/10",
                },
                {
                  n: "AI/ML",
                  c: "bg-violet-500/5 text-violet-500/50 border-violet-500/10",
                },
                {
                  n: "DevSecOps",
                  c: "bg-emerald-500/5 text-emerald-500/50 border-emerald-500/10",
                },
              ].map((tech) => (
                <span
                  key={tech.n}
                  className={`px-3 py-1.5 rounded-lg border text-[10px] font-medium ${tech.c} hover:scale-[1.03] transition-all duration-300 cursor-default`}
                >
                  {tech.n}
                </span>
              ))}
            </div>
            <div className="flex items-center justify-center md:justify-start gap-4">
              {[
                {
                  l: "GH",
                  h: "https://github.com/mujaaco",
                  i: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
                    </svg>
                  ),
                },
                {
                  l: "LI",
                  h: "https://linkedin.com/in/mujaaco",
                  i: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                  ),
                },
                {
                  l: "@",
                  h: "mailto:hello@mujaaco.com",
                  i: (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <rect x="2" y="4" width="20" height="16" rx="2" />
                      <path d="M22 4L12 13 2 4" />
                    </svg>
                  ),
                },
              ].map((s) => (
                <a
                  key={s.l}
                  href={s.h}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl bg-muted/20 border border-border/20 text-foreground/35 hover:text-primary hover:border-primary/20 hover:bg-primary/[0.04] hover:scale-110 transition-all duration-300"
                  aria-label={s.l}
                >
                  {s.i}
                </a>
              ))}
            </div>
          </div>

          {/* Right — Quick Message */}
          <div className="md:col-span-3">
            <div className="relative rounded-3xl border border-border/25 bg-gradient-to-br from-card/30 via-card/20 to-transparent p-6 sm:p-8 overflow-hidden group hover:border-primary/15 hover:shadow-xl hover:shadow-primary/[0.03] transition-all duration-700">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/5 border border-primary/10">
                    <Send className="w-4 h-4 text-primary/50" />
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    {t.quickMessage}
                  </span>
                </div>
                {msg && (
                  <div
                    className={`mb-4 p-3 rounded-xl text-xs font-medium ${msg.ok ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600" : "bg-red-500/10 border border-red-500/20 text-red-600"}`}
                  >
                    {msg.text}
                  </div>
                )}
                <form action={handleSubmit} className="space-y-3">
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />
                  <div className="grid sm:grid-cols-2 gap-3">
                    <input
                      type="text"
                      name="name"
                      placeholder={t.namePlaceholder}
                      required
                      className="w-full px-4 py-3 bg-background/70 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] transition-all duration-300"
                    />
                    <input
                      type="email"
                      name="email"
                      placeholder={t.emailPlaceholder}
                      required
                      className="w-full px-4 py-3 bg-background/70 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] transition-all duration-300"
                    />
                  </div>
                  <input
                    type="text"
                    name="subject_line"
                    placeholder={t.subjectPlaceholder}
                    required
                    className="w-full px-4 py-3 bg-background/70 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] transition-all duration-300"
                  />
                  <textarea
                    name="message"
                    placeholder={t.messagePlaceholder}
                    rows={3}
                    required
                    className="w-full px-4 py-3 bg-background/70 border border-border/40 rounded-xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] transition-all duration-300 resize-none"
                  />
                  <Button
                    type="submit"
                    variant="default"
                    size="lg"
                    disabled={pending}
                    className="w-full bg-foreground text-background rounded-xl py-6 hover:opacity-90 hover:scale-[1.01] hover:shadow-xl hover:shadow-foreground/10 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100 group"
                  >
                    {pending ? (
                      <div className="flex items-center justify-center gap-3">
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        <span className="text-sm font-semibold">
                          {t.sending}
                        </span>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center gap-3">
                        <Send className="w-4 h-4" />
                        <span className="text-sm font-semibold">
                          {t.sendMessage}
                        </span>
                      </div>
                    )}
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* ── Bottom Bar ── */}
        <div className="pt-8 border-t border-border/20">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-center">
            <p className="text-xs text-foreground/30">
              &copy; {new Date().getFullYear()} {authorName}. {t.copyright}
            </p>
            <p className="flex items-center gap-2 text-xs text-foreground/30">
              <span>{t.builtWith}</span>
              <Heart className="w-3.5 h-3.5 text-red-400 fill-red-400" />
              <span>{t.and}</span>
              <span className="text-foreground/45 font-medium">
                {t.openSource}
              </span>
            </p>
            <div className="flex items-center gap-1.5 text-[10px] text-foreground/30 font-mono">
              <Globe className="w-3 h-3" /> {t.worldwide}
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
