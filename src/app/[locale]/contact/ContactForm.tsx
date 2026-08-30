"use client";

import { ArrowUpRight, Mail, MessageCircle, Send } from "lucide-react";
import { type ComponentType, useState } from "react";
import { submitContactForm } from "../../actions/contact";

/* -- brand icons -- */
const GitHubIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
  </svg>
);
const XIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4z" />
  </svg>
);
const YoutubeIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

/* -- platform icons -- */
const SIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-2-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
  </svg>
);

const AIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M9 18V5l12-2v13c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.8 0 1.5.2 2 .6V3l-8 1.3v10.7c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.8 0 1.5.2 2 .6z" />
  </svg>
);

interface ContactFormProps {
  locale: string;
  t: {
    heading: string;
    subtitle: string;
    startConversation: string;
    startConversationDesc: string;
    emailResponseTime: string;
    githubDesc: string;
    linkedinDesc: string;
    instagramDesc: string;
    tiktokDesc: string;
    websiteDesc: string;
    formName: string;
    formEmail: string;
    formSubject: string;
    formMessage: string;
    formNamePlaceholder: string;
    formEmailPlaceholder: string;
    formSubjectPlaceholder: string;
    formMessagePlaceholder: string;
    sending: string;
    sendMessage: string;
    networkError: string;
    badge: string;
    links: readonly { label: string; desc: string }[];
  };
}

const contactLinks = [
  {
    label: "GitHub",
    desc: "Open source and code",
    icon: GitHubIcon,
    href: "https://github.com/mujaaco",
    handle: "mujaaco",
  },
  {
    label: "X",
    desc: "Follow for updates",
    icon: XIcon,
    href: "https://x.com/mujaaco",
    handle: "@mujaaco",
  },
  {
    label: "LinkedIn",
    desc: "Professional network",
    icon: LinkedinIcon,
    href: "https://linkedin.com/in/mujaaco",
    handle: "@mujaaco",
  },
  {
    label: "Instagram",
    desc: "Music and daily life",
    icon: InstagramIcon,
    href: "https://instagram.com/mujaaco",
    handle: "@mujaaco",
  },
  {
    label: "YouTube",
    desc: "Videos and content",
    icon: YoutubeIcon,
    href: "https://youtube.com/@mujaaco",
    handle: "@mujaaco",
  },
  {
    label: "Spotify",
    desc: "Listen to my music",
    icon: SIcon,
    href: "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
    handle: "mujaaco",
  },
  {
    label: "Apple Music",
    desc: "Stream my music",
    icon: AIcon,
    href: "https://music.apple.com/fr/artist/mujaa/6800033494",
    handle: "mujaaco",
  },
  {
    label: "Email",
    desc: "Direct contact",
    icon: Mail,
    href: "mailto:hello@mujaaco.com",
    handle: "hello@mujaaco.com",
    isEmail: true,
  },
];

export default function ContactForm({ locale, t }: ContactFormProps) {
  const [pending, setPending] = useState(false);
  const [msg, setMsg] = useState<{ ok: boolean; text: string } | null>(null);
  const dir = locale === "ar" ? "rtl" : "ltr";

  async function handleSubmit(formData: FormData) {
    setMsg(null);
    setPending(true);
    try {
      const result = await submitContactForm(formData);
      if (result.success) {
        setMsg({ ok: true, text: result.message });
        const form = document.querySelector("form") as HTMLFormElement;
        if (form) form.reset();
      } else setMsg({ ok: false, text: result.message });
    } catch {
      setMsg({ ok: false, text: t.networkError });
    } finally {
      setPending(false);
    }
  }

  return (
    <div className="min-h-screen" dir={dir}>
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-16 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
          <div className="absolute bottom-0 right-[5%] w-[350px] h-[250px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60 mb-8">
            <MessageCircle className="w-3 h-3" /> {t.badge}
          </div>
          <h1 className="hero-enter text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">{t.heading}</span>
          </h1>
          <p className="hero-enter text-base sm:text-lg text-foreground/45 font-light leading-relaxed max-w-lg mx-auto">
            {t.subtitle}
          </p>
          <div className="hero-enter mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>
      </section>

      {/* ── Content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* ── Left: Intro + Links ── */}
          <div className="lg:col-span-2">
            <div className="sticky top-24">
              <div className="mb-10">
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-xl bg-primary/5 border border-primary/10">
                    <MessageCircle className="w-4 h-4 text-primary/50" />
                  </div>
                  <span className="text-lg font-bold text-foreground">
                    {t.startConversation}
                  </span>
                </div>
                <p className="text-sm text-foreground/40 leading-relaxed">
                  {t.startConversationDesc}
                </p>
              </div>

              <div className="space-y-2">
                {contactLinks.map((l) => {
                  const LI = l.icon as ComponentType<{ className?: string }>;
                  return (
                    <a
                      key={l.label}
                      href={l.href}
                      target={!("isEmail" in l) ? "_blank" : undefined}
                      rel={
                        !("isEmail" in l) ? "noopener noreferrer" : undefined
                      }
                      className="flex items-center gap-4 p-4 rounded-2xl border border-border/20 bg-card/10 hover:border-primary/15 hover:bg-primary/[0.03] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/[0.02] transition-all duration-500 overflow-hidden group relative"
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                      <div className="relative flex-shrink-0 w-11 h-11 rounded-xl bg-primary/5 border border-primary/10 flex items-center justify-center text-primary/40 group-hover:text-primary group-hover:bg-primary/10 group-hover:scale-110 transition-all duration-300">
                        <LI className="w-4 h-4" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-semibold text-foreground/80 group-hover:text-foreground transition-colors duration-300">
                            {l.label}
                          </span>
                          <ArrowUpRight className="w-3 h-3 text-foreground/25 group-hover:text-primary group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300 shrink-0" />
                        </div>
                        <span className="block text-[11px] text-foreground/35 font-mono mt-0.5">
                          {l.handle}
                        </span>
                      </div>
                    </a>
                  );
                })}
              </div>
            </div>
          </div>

          {/* ── Right: Form ── */}
          <div className="lg:col-span-3">
            <div className="relative rounded-3xl border border-border/20 bg-gradient-to-br from-card/30 via-card/20 to-transparent p-6 sm:p-10 overflow-hidden group hover:border-primary/15 hover:shadow-2xl hover:shadow-primary/[0.03] transition-all duration-700">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />

              <div className="relative">
                {msg && (
                  <div
                    className={`mb-8 p-4 rounded-2xl text-sm font-medium ${
                      msg.ok
                        ? "bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400"
                        : "bg-red-500/10 border border-red-500/20 text-red-600 dark:text-red-400"
                    }`}
                  >
                    {msg.text}
                  </div>
                )}

                <form action={handleSubmit} className="space-y-6">
                  <input
                    type="text"
                    name="botcheck"
                    tabIndex={-1}
                    autoComplete="off"
                    className="hidden"
                    aria-hidden="true"
                  />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/40 mb-2.5"
                      >
                        {t.formName}
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        className="w-full px-5 py-3.5 bg-background/80 border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] focus:bg-background transition-all duration-300"
                        placeholder={t.formNamePlaceholder}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="email"
                        className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/40 mb-2.5"
                      >
                        {t.formEmail}
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        className="w-full px-5 py-3.5 bg-background/80 border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] focus:bg-background transition-all duration-300"
                        placeholder={t.formEmailPlaceholder}
                      />
                    </div>
                  </div>

                  <div>
                    <label
                      htmlFor="subject_line"
                      className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/40 mb-2.5"
                    >
                      {t.formSubject}
                    </label>
                    <input
                      type="text"
                      id="subject_line"
                      name="subject_line"
                      required
                      className="w-full px-5 py-3.5 bg-background/80 border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] focus:bg-background transition-all duration-300"
                      placeholder={t.formSubjectPlaceholder}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-[11px] font-semibold uppercase tracking-[0.15em] text-foreground/40 mb-2.5"
                    >
                      {t.formMessage}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={6}
                      className="w-full px-5 py-3.5 bg-background/80 border border-border/40 rounded-2xl text-sm text-foreground placeholder:text-foreground/20 focus:outline-none focus:border-primary/30 focus:ring-4 focus:ring-primary/[0.04] focus:bg-background transition-all duration-300 resize-none"
                      placeholder={t.formMessagePlaceholder}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={pending}
                    className="w-full flex items-center justify-center gap-3 px-6 py-4 bg-foreground text-background rounded-2xl text-sm font-semibold hover:opacity-90 hover:scale-[1.01] hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-300 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:scale-100"
                  >
                    {pending ? (
                      <>
                        <div className="w-4 h-4 border-2 border-background/30 border-t-background rounded-full animate-spin" />
                        {t.sending}
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        {t.sendMessage}
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
