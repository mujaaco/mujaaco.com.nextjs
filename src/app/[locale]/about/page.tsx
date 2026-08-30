import {
  ArrowUpRight,
  BookOpen,
  Globe,
  Mail,
  MapPin,
  Medal,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import { BreadcrumbStructuredData } from "@/app/components/BreadcrumbJsonLd";
import {
  AboutPageStructuredData,
  FaqPageStructuredData,
} from "@/app/components/StructuredData";
import { localeLanguages } from "@/app/lib/seo";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const t = getDictionary(validLocale);
  return {
    title: t.about.title,
    description: t.about.description,
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/about`,
      languages: localeLanguages("about"),
    },
    openGraph: {
      title: t.about.title,
      description: t.about.description,
      type: "profile",
      url: `https://mujaaco.com/${validLocale}/about`,
      images: [
        {
          url: "https://mujaaco.com/img/profile-engineer-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Mujahid Siyam",
        },
      ],
      firstName: "Mujahid",
      lastName: "Siyam",
      username: "mujaaco",
    },
  };
}

const socialLinks = [
  {
    n: "GH",
    h: "https://github.com/mujaaco",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
  },
  {
    n: "X",
    h: "https://x.com/mujaaco",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
  {
    n: "LI",
    h: "https://linkedin.com/in/mujaaco",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
  },
  {
    n: "IG",
    h: "https://instagram.com/mujaaco",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.884 0 1.441 1.441 0 0 1 2.884 0z" />
      </svg>
    ),
  },
  {
    n: "SC",
    h: "https://snapchat.com/add/mujaaco",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 2c5.25 0 9 4.2 9 9.28 0 2.19-.76 4.21-2.06 5.85-.19.25-.49.36-.77.25-.63-.27-1.31-.42-2.03-.48l-.75 1.64c-.08.17-.24.29-.43.35l-1.15.3c-.33.09-.68.05-.97-.11a13.93 13.93 0 0 1-2.84 0 1.74 1.74 0 0 0-.97.11l-1.14-.3a.56.56 0 0 1-.43-.35l-.75-1.64c-.72.06-1.4.21-2.04.48-.28.11-.58 0-.77-.25A9.24 9.24 0 0 1 3 11.28C3 6.2 6.75 2 12 2zM7.5 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S9 12.83 9 12s-.67-1.5-1.5-1.5zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z" />
      </svg>
    ),
  },
  {
    n: "YT",
    h: "https://youtube.com/@mujaaco",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    ),
  },
  {
    n: "SP",
    h: "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z" />
      </svg>
    ),
  },
  {
    n: "AM",
    h: "https://music.apple.com/fr/artist/mujaa/6800033494",
    i: (c: string) => (
      <svg className={c} viewBox="0 0 24 24" fill="currentColor">
        <path d="M9 18V5l12-2v13c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.8 0 1.5.2 2 .6V3l-8 1.3v10.7c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.8 0 1.5.2 2 .6z" />
      </svg>
    ),
  },
  {
    n: "@",
    h: "mailto:hello@mujaaco.com",
    i: (c: string) => (
      <svg
        className={c}
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
];

const techChipColors = [
  "bg-amber-500/10 text-amber-500/70 border-amber-500/20",
  "bg-sky-500/10 text-sky-500/70 border-sky-500/20",
  "bg-emerald-500/10 text-emerald-500/70 border-emerald-500/20",
  "bg-violet-500/10 text-violet-500/70 border-violet-500/20",
  "bg-orange-500/10 text-orange-500/70 border-orange-500/20",
  "bg-teal-500/10 text-teal-500/70 border-teal-500/20",
  "bg-rose-500/10 text-rose-500/70 border-rose-500/20",
  "bg-fuchsia-500/10 text-fuchsia-500/70 border-fuchsia-500/20",
];

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const t = getDictionary(validLocale);
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const _isAr = validLocale === "ar";

  return (
    <div dir={dir} className="min-h-screen">
      <AboutPageStructuredData
        url={`https://mujaaco.com/${validLocale}/about`}
      />
      <BreadcrumbStructuredData
        items={[
          {
            name: validLocale === "ar" ? "الرئيسية" : "Home",
            url: `https://mujaaco.com/${validLocale}`,
          },
          {
            name:
              validLocale === "ar"
                ? "عنّي"
                : validLocale === "fr"
                  ? "À propos"
                  : "About",
            url: `https://mujaaco.com/${validLocale}/about`,
          },
        ]}
      />
      {/* ── Hero ── */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
          <div className="absolute top-[40%] right-[5%] w-[350px] h-[300px] rounded-full bg-[var(--color-wave-2)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
        </div>
        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-primary/60 mb-8">
            <Sparkles className="w-3 h-3" />
            {validLocale === "ar"
              ? "عنّي"
              : validLocale === "fr"
                ? "À propos"
                : "About"}
          </div>
          <h1 className="hero-enter text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">{t.about.heading}</span>
          </h1>
          <p className="hero-enter text-base sm:text-lg text-foreground/45 font-light max-w-2xl mx-auto">
            {t.about.roles}
          </p>
          <div className="hero-enter mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>
      </section>

      {/* ── Profile + Quick Facts ── */}
      <section className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="relative rounded-3xl border border-border/20 bg-card/20 backdrop-blur-sm p-8 sm:p-12 overflow-hidden group hover:border-primary/15 hover:shadow-2xl hover:shadow-primary/[0.03] transition-all duration-700">
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
          <div className="absolute inset-0 bg-gradient-to-b from-primary/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

          <div className="relative flex flex-col sm:flex-row items-center gap-8 sm:gap-12">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[var(--color-wave-1)] via-[var(--color-wave-2)] to-[var(--color-wave-3)] blur-2xl opacity-20 animate-pulse-slow" />
              <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-full bg-gradient-to-br from-[var(--color-wave-1)] to-[var(--color-wave-2)] p-[3px] group-hover:scale-[1.03] transition-transform duration-500">
                <div className="relative w-full h-full rounded-full overflow-hidden bg-background">
                  <Image
                    src="/img/profile.png"
                    alt="Mujahid Siyam"
                    fill
                    sizes="(min-width: 640px) 10rem, 8rem"
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* Identity */}
            <div className="text-center sm:text-start flex-1">
              <h2 className="text-2xl sm:text-3xl font-black text-foreground mb-1 tracking-tight">
                {validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
              </h2>
              <p className="text-sm font-medium text-primary/60 mb-1">
                {t.about.akaLabel}
              </p>
              <p className="text-sm text-foreground/40 mb-6">
                {t.about.profileTitle}
              </p>

              <div className="flex flex-wrap gap-4 justify-center sm:justify-start">
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 border border-border/20">
                  <MapPin className="w-4 h-4 text-foreground/40" />
                  <span className="text-xs text-foreground/45">
                    {t.about.location}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 border border-border/20">
                  <Mail className="w-4 h-4 text-foreground/40" />
                  <span className="text-xs text-foreground/45">
                    {t.about.email}
                  </span>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/30 border border-border/20">
                  <Globe className="w-4 h-4 text-foreground/40" />
                  <span className="text-xs text-foreground/45">
                    {t.about.website}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Main Content ── */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="space-y-8">
          {/* ── Professional Summary ── */}
          <section className="relative rounded-3xl border border-border/20 bg-gradient-to-br from-card/30 via-card/20 to-transparent p-8 sm:p-12 overflow-hidden group hover:border-primary/15 hover:shadow-2xl hover:shadow-primary/[0.03] transition-all duration-700">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-8">
                <div className="p-2 rounded-xl bg-primary/5 border border-primary/10">
                  <BookOpen className="w-4 h-4 text-primary/50" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30 mb-0.5">
                    {t.about.summaryHeading}
                  </p>
                  <div className="w-12 h-[2px] bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-x-10 gap-y-5">
                <div className="space-y-4 text-sm text-foreground/50 leading-relaxed">
                  <p>{t.about.summary1}</p>
                  <p>{t.about.summary2}</p>
                  <p>{t.about.summary3}</p>
                </div>
                <div className="space-y-4 text-sm text-foreground/50 leading-relaxed">
                  <p>{t.about.summary4}</p>
                  <p>{t.about.summary5}</p>
                </div>
              </div>
            </div>
          </section>

          {/* ── FAQ ── */}
          <section className="relative rounded-3xl border border-border/20 bg-gradient-to-br from-card/30 via-card/20 to-transparent p-8 sm:p-12 overflow-hidden group hover:border-primary/15 hover:shadow-2xl hover:shadow-primary/[0.03] transition-all duration-700">
            <FaqPageStructuredData
              questions={t.faq.items.map((item) => ({
                question: item.q,
                answer: item.a,
              }))}
            />
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-xl bg-primary/5 border border-primary/10">
                  <Sparkles className="w-4 h-4 text-primary/50" />
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30 mb-0.5">
                    {t.faq.heading}
                  </p>
                  <div className="w-12 h-[2px] bg-gradient-to-r from-primary/30 to-transparent rounded-full" />
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                {t.faq.items.map((item, i) => {
                  const accentColors = [
                    "border-amber-500/10 hover:border-amber-500/25",
                    "border-violet-500/10 hover:border-violet-500/25",
                    "border-emerald-500/10 hover:border-emerald-500/25",
                    "border-sky-500/10 hover:border-sky-500/25",
                  ];
                  const glowColors = [
                    "bg-amber-500/5",
                    "bg-violet-500/5",
                    "bg-emerald-500/5",
                    "bg-sky-500/5",
                  ];
                  return (
                    <div
                      key={item.q}
                      className={`group/faq relative p-6 rounded-2xl border ${accentColors[i]} bg-muted/10 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-xl overflow-hidden`}
                    >
                      <div className="absolute inset-0 -translate-x-full group-hover/faq:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                      <div
                        className={`absolute inset-0 rounded-2xl ${glowColors[i]} opacity-0 group-hover/faq:opacity-100 transition-opacity duration-700`}
                      />
                      <div className="relative z-10">
                        <div className="flex items-start gap-3">
                          <span className="text-lg font-light opacity-30 group-hover/faq:opacity-60 transition-opacity duration-500 shrink-0 mt-0.5">
                            {["①", "②", "③", "④"][i]}
                          </span>
                          <div className="min-w-0">
                            <h4 className="text-sm font-bold text-foreground mb-2 group-hover/faq:text-foreground/90 transition-colors duration-300">
                              {item.q}
                            </h4>
                            <p className="text-xs text-foreground/45 leading-relaxed group-hover/faq:text-foreground/50 transition-colors duration-300">
                              {item.a}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </section>

          {/* ── Experience + Education ── */}
          <div className="grid sm:grid-cols-2 gap-8">
            {/* Experience */}
            <section className="relative rounded-3xl border border-border/20 bg-card/20 p-6 sm:p-8 overflow-hidden group hover:border-primary/15 hover:shadow-xl hover:shadow-primary/[0.03] transition-all duration-700">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-1.5 rounded-lg bg-primary/5 border border-primary/10">
                    <Medal className="w-3.5 h-3.5 text-primary/50" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                    {t.about.experience}
                  </span>
                </div>
                <div className="space-y-0">
                  {t.about.expItems.map((exp) => (
                    <div
                      key={exp.title}
                      className="relative pl-8 pb-8 last:pb-0"
                    >
                      <div className="absolute left-0 top-1.5 bottom-0 w-px bg-gradient-to-b from-primary/20 via-primary/10 to-transparent" />
                      <div className="absolute left-[-4px] top-1.5 w-[9px] h-[9px] rounded-full bg-background border-2 border-primary/30 group-hover:border-primary/60 transition-colors" />
                      <h4 className="text-sm font-bold text-foreground mb-1">
                        {exp.title}
                      </h4>
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="text-xs text-foreground/40">
                          {exp.company}
                        </span>
                        <span className="text-[10px] font-medium bg-primary/[0.06] text-primary/50 px-2 py-0.5 rounded-full">
                          {exp.period}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/45 leading-relaxed">
                        {exp.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Education */}
            <section className="relative rounded-3xl border border-border/20 bg-card/20 p-6 sm:p-8 overflow-hidden group hover:border-primary/15 hover:shadow-xl hover:shadow-primary/[0.03] transition-all duration-700">
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
              <div className="relative">
                <div className="flex items-center gap-2 mb-8">
                  <div className="p-1.5 rounded-lg bg-primary/5 border border-primary/10">
                    <BookOpen className="w-3.5 h-3.5 text-primary/50" />
                  </div>
                  <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                    {t.about.education}
                  </span>
                </div>
                <div className="space-y-5">
                  {t.about.eduItems.map((edu) => (
                    <div
                      key={edu.degree}
                      className="p-4 rounded-2xl bg-muted/10 border border-border/20 hover:border-primary/10 hover:bg-muted/20 transition-all duration-300"
                    >
                      <div className="flex justify-between items-start gap-4 mb-1">
                        <h4 className="text-sm font-bold text-foreground">
                          {edu.degree}
                        </h4>
                        <span className="text-[10px] font-medium bg-primary/[0.06] text-primary/50 px-2.5 py-1 rounded-full shrink-0">
                          {edu.period}
                        </span>
                      </div>
                      <p className="text-xs text-foreground/35 mt-1">
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* ── Core Competencies ── */}
          <section className="relative rounded-3xl border border-border/20 bg-gradient-to-br from-card/30 via-card/20 to-transparent p-6 sm:p-8 overflow-hidden group hover:border-primary/15 hover:shadow-xl hover:shadow-primary/[0.03] transition-all duration-700">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-1.5 rounded-lg bg-primary/5 border border-primary/10">
                  <Sparkles className="w-3.5 h-3.5 text-primary/50" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                  {t.about.coreCompetencies}
                </span>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
                {t.about.skills.map((skill: string, i: number) => (
                  <div
                    key={skill}
                    className={`flex items-center gap-3 p-3 rounded-xl border ${techChipColors[i % techChipColors.length]} hover:scale-[1.03] hover:shadow-sm transition-all duration-300 cursor-default`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-current opacity-50 shrink-0" />
                    <span className="text-xs font-medium leading-snug">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Principles ── */}
          <section className="relative rounded-3xl border border-border/20 bg-card/20 p-6 sm:p-8 overflow-hidden group hover:border-primary/15 hover:shadow-xl hover:shadow-primary/[0.03] transition-all duration-700">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="flex items-center gap-2 mb-8">
                <div className="p-1.5 rounded-lg bg-primary/5 border border-primary/10">
                  <Sparkles className="w-3.5 h-3.5 text-primary/50" />
                </div>
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                  {t.about.principlesHeading}
                </span>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {t.about.principles.map((v, i) => (
                  <div
                    key={v.title}
                    className="p-5 rounded-2xl bg-muted/10 border border-border/20 hover:border-primary/15 hover:bg-muted/20 transition-all duration-300"
                  >
                    <span className="text-lg mb-3 block opacity-30">
                      {["①", "②", "③", "④"][i]}
                    </span>
                    <h4 className="text-sm font-bold text-foreground mb-2">
                      {v.title}
                    </h4>
                    <p className="text-[11px] text-foreground/45 leading-relaxed">
                      {v.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Social / Connect ── */}
          <section className="relative rounded-3xl border border-border/20 bg-gradient-to-br from-card/30 via-card/20 to-transparent p-8 sm:p-12 overflow-hidden group hover:border-primary/15 hover:shadow-xl hover:shadow-primary/[0.03] transition-all duration-700">
            <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
            <div className="relative">
              <div className="text-center mb-10">
                <h3 className="text-lg font-bold text-foreground mb-2">
                  {t.about.connectHeading}
                </h3>
                <p className="text-xs text-foreground/40 max-w-xs mx-auto">
                  {t.about.connectDescription}
                </p>
              </div>

              <div className="flex flex-wrap justify-center gap-3">
                {socialLinks.map((s) => (
                  <a
                    key={s.n}
                    href={s.h}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={s.n}
                    className="group/social relative flex items-center justify-center w-12 h-12 rounded-2xl bg-muted/10 border border-border/20 text-foreground/30 hover:text-foreground hover:border-primary/20 hover:bg-primary/[0.04] hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5 transition-all duration-500"
                  >
                    {s.i(
                      "w-4 h-4 group-hover/social:text-primary transition-colors duration-300",
                    )}
                  </a>
                ))}
              </div>
            </div>
          </section>

          {/* ── CTA ── */}
          <div className="text-center pt-8">
            <a
              href="mailto:hello@mujaaco.com"
              className="inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold text-sm hover:opacity-90 hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-300 group"
            >
              <Mail className="w-4 h-4" />
              {validLocale === "ar"
                ? "تواصل معي"
                : validLocale === "fr"
                  ? "Me contacter"
                  : "Work with me"}
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
          </div>
        </div>
      </main>
    </div>
  );
}
