import { ArrowRight, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { FaqPageStructuredData } from "@/app/components/StructuredData";
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
  const dict = getDictionary(validLocale);
  return {
    title: { absolute: dict.home.title },
    description: dict.home.description,
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}`,
      languages: localeLanguages(),
    },
    openGraph: {
      title: dict.home.title,
      description: dict.home.description,
      url: `https://mujaaco.com/${validLocale}`,
      type: "website",
      images: [
        {
          url: "https://mujaaco.com/img/profile-engineer-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Mujahid Siyam",
        },
      ],
    },
  };
}

/* ---- social icons ---- */
function SvgIcon({ d, className }: { d: string; className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d={d} />
    </svg>
  );
}

const GitHubIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"
  />
);
const XIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"
  />
);
const LinkedInIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
  />
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M12 0C8.74 0 8.333.015 7.053.072 5.775.132 4.905.333 4.14.63c-.789.306-1.459.717-2.126 1.384S.935 3.35.63 4.14C.333 4.905.131 5.775.072 7.053.012 8.333 0 8.74 0 12s.015 3.667.072 4.947c.06 1.277.261 2.148.558 2.913.306.788.717 1.459 1.384 2.126.667.666 1.336 1.079 2.126 1.384.766.296 1.636.499 2.913.558C8.333 23.988 8.74 24 12 24s3.667-.015 4.947-.072c1.277-.06 2.148-.262 2.913-.558.788-.306 1.459-.718 2.126-1.384.666-.667 1.079-1.335 1.384-2.126.296-.765.499-1.636.558-2.913.06-1.28.072-1.687.072-4.947s-.015-3.667-.072-4.947c-.06-1.277-.262-2.149-.558-2.913-.306-.789-.718-1.459-1.384-2.126C21.319 1.347 20.651.935 19.86.63c-.765-.297-1.636-.499-2.913-.558C15.667.012 15.26 0 12 0zm0 2.16c3.203 0 3.585.016 4.85.071 1.17.055 1.805.249 2.227.415.562.217.96.477 1.382.896.419.42.679.819.896 1.381.164.422.36 1.057.413 2.227.057 1.266.07 1.646.07 4.85s-.015 3.585-.074 4.85c-.061 1.17-.256 1.805-.421 2.227-.224.562-.479.96-.899 1.382-.419.419-.824.679-1.38.896-.42.164-1.065.36-2.235.413-1.274.057-1.649.07-4.859.07-3.211 0-3.586-.015-4.859-.074-1.171-.061-1.816-.256-2.236-.421-.569-.224-.96-.479-1.379-.899-.421-.419-.69-.824-.9-1.38-.165-.42-.359-1.065-.42-2.235-.045-1.26-.061-1.649-.061-4.844 0-3.196.016-3.586.061-4.861.061-1.17.255-1.814.42-2.234.21-.57.479-.96.9-1.381.419-.419.81-.689 1.379-.898.42-.166 1.051-.361 2.221-.421 1.275-.045 1.65-.06 4.859-.06l.045.03zm0 3.678a6.162 6.162 0 1 0 0 12.324 6.162 6.162 0 1 0 0-12.324zM12 16c-2.21 0-4-1.79-4-4s1.79-4 4-4 4 1.79 4 4-1.79 4-4 4zm7.846-10.405a1.441 1.441 0 0 1-2.884 0 1.441 1.441 0 0 1 2.884 0z"
  />
);
const YouTubeIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"
  />
);
const SpotifyIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.301 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15 10.561 18.72 12.84c.361.181.54.78.241 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.601.18-1.2.72-1.381 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.299.421-1.02.599-1.559.3z"
  />
);
const AppleMusicIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M9 18V5l12-2v13c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.8 0 1.5.2 2 .6V3l-8 1.3v10.7c0 2.2-1.8 4-4 4s-4-1.8-4-4 1.8-4 4-4c.8 0 1.5.2 2 .6z"
  />
);
const SnapchatIcon = ({ className }: { className?: string }) => (
  <SvgIcon
    className={className}
    d="M12 2c5.25 0 9 4.2 9 9.28 0 2.19-.76 4.21-2.06 5.85-.19.25-.49.36-.77.25-.63-.27-1.31-.42-2.03-.48l-.75 1.64c-.08.17-.24.29-.43.35l-1.15.3c-.33.09-.68.05-.97-.11a13.93 13.93 0 0 1-2.84 0 1.74 1.74 0 0 0-.97.11l-1.14-.3a.56.56 0 0 1-.43-.35l-.75-1.64c-.72.06-1.4.21-2.04.48-.28.11-.58 0-.77-.25A9.24 9.24 0 0 1 3 11.28C3 6.2 6.75 2 12 2zM7.5 10.5c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5S9 12.83 9 12s-.67-1.5-1.5-1.5zm9 0c-.83 0-1.5.67-1.5 1.5s.67 1.5 1.5 1.5 1.5-.67 1.5-1.5-.67-1.5-1.5-1.5z"
  />
);

const socials = [
  { href: "https://github.com/mujaaco", icon: GitHubIcon, label: "GitHub" },
  { href: "https://x.com/mujaaco", icon: XIcon, label: "X" },
  {
    href: "https://linkedin.com/in/mujaaco",
    icon: LinkedInIcon,
    label: "LinkedIn",
  },
  {
    href: "https://instagram.com/mujaaco",
    icon: InstagramIcon,
    label: "Instagram",
  },
  {
    href: "https://snapchat.com/add/mujaaco",
    icon: SnapchatIcon,
    label: "Snapchat",
  },
  {
    href: "https://youtube.com/@mujaaco",
    icon: YouTubeIcon,
    label: "YouTube",
  },
  {
    href: "https://open.spotify.com/artist/24n3um6erIOUxobs69qDPX",
    icon: SpotifyIcon,
    label: "Spotify",
  },
  {
    href: "https://music.apple.com/fr/artist/mujaa/6800033494",
    icon: AppleMusicIcon,
    label: "Apple Music",
  },
];

const waveSubtitles: Record<string, string> = {
  ar: "موجا — التدفق، الإشارة، التغيّر",
  fr: "Mujaa (موجا) — la vague, le flux, le signal",
};
const availabilityBadge: Record<string, string> = {
  ar: "متاح للعمل",
  fr: "Disponible",
};

const sectionLabels: Record<string, string> = {
  ar: "عنّي",
  fr: "À propos",
};

/* ---- color palette per capability card ---- */
const capColors = [
  {
    border: "border-amber-500/10 hover:border-amber-500/25",
    glow: "bg-amber-500/5",
    dot: "bg-amber-500/40",
    gradient: "from-amber-500/8 via-amber-500/3 to-transparent",
  },
  {
    border: "border-violet-500/10 hover:border-violet-500/25",
    glow: "bg-violet-500/5",
    dot: "bg-violet-500/40",
    gradient: "from-violet-500/8 via-violet-500/3 to-transparent",
  },
  {
    border: "border-orange-500/10 hover:border-orange-500/25",
    glow: "bg-orange-500/5",
    dot: "bg-orange-500/40",
    gradient: "from-orange-500/8 via-orange-500/3 to-transparent",
  },
  {
    border: "border-teal-500/10 hover:border-teal-500/25",
    glow: "bg-teal-500/5",
    dot: "bg-teal-500/40",
    gradient: "from-teal-500/8 via-teal-500/3 to-transparent",
  },
  {
    border: "border-emerald-500/10 hover:border-emerald-500/25",
    glow: "bg-emerald-500/5",
    dot: "bg-emerald-500/40",
    gradient: "from-emerald-500/8 via-emerald-500/3 to-transparent",
  },
  {
    border: "border-rose-500/10 hover:border-rose-500/25",
    glow: "bg-rose-500/5",
    dot: "bg-rose-500/40",
    gradient: "from-rose-500/8 via-rose-500/3 to-transparent",
  },
  {
    border: "border-sky-500/10 hover:border-sky-500/25",
    glow: "bg-sky-500/5",
    dot: "bg-sky-500/40",
    gradient: "from-sky-500/8 via-sky-500/3 to-transparent",
  },
  {
    border: "border-slate-500/10 hover:border-slate-500/25",
    glow: "bg-slate-500/5",
    dot: "bg-slate-500/40",
    gradient: "from-slate-500/8 via-slate-500/3 to-transparent",
  },
  {
    border: "border-fuchsia-500/10 hover:border-fuchsia-500/25",
    glow: "bg-fuchsia-500/5",
    dot: "bg-fuchsia-500/40",
    gradient: "from-fuchsia-500/8 via-fuchsia-500/3 to-transparent",
  },
];

/* ---- technology cards config ---- */
const techCards = (t: ReturnType<typeof getDictionary>) => [
  {
    group: t.home.techGroups.languages,
    items: ["Rust", "TypeScript", "Python"],
    icon: "⌨",
    gradient: "from-amber-500/10 via-amber-500/5 to-transparent",
    border: "border-amber-500/10 hover:border-amber-500/25",
    glow: "bg-amber-500/5",
    dot: "bg-amber-500/40",
  },
  {
    group: t.home.techGroups.frontend,
    items: ["React", "Next.js"],
    icon: "◈",
    gradient: "from-sky-500/10 via-sky-500/5 to-transparent",
    border: "border-sky-500/10 hover:border-sky-500/25",
    glow: "bg-sky-500/5",
    dot: "bg-sky-500/40",
  },
  {
    group: t.home.techGroups.backend,
    items: ["Node.js", "FastAPI"],
    icon: "⬡",
    gradient: "from-emerald-500/10 via-emerald-500/5 to-transparent",
    border: "border-emerald-500/10 hover:border-emerald-500/25",
    glow: "bg-emerald-500/5",
    dot: "bg-emerald-500/40",
  },
  {
    group: t.home.techGroups.aiMl,
    items: ["LLMs", "PyTorch"],
    icon: "◇",
    gradient: "from-violet-500/10 via-violet-500/5 to-transparent",
    border: "border-violet-500/10 hover:border-violet-500/25",
    glow: "bg-violet-500/5",
    dot: "bg-violet-500/40",
  },
  {
    group: t.home.techGroups.infra,
    items: ["Docker", "AWS", "Terraform", "Ansible"],
    icon: "☁",
    gradient: "from-orange-500/10 via-orange-500/5 to-transparent",
    border: "border-orange-500/10 hover:border-orange-500/25",
    glow: "bg-orange-500/5",
    dot: "bg-orange-500/40",
  },
  {
    group: t.home.techGroups.systems,
    items: ["Linux", "NixOS", "Windows Server"],
    icon: "⊞",
    gradient: "from-teal-500/10 via-teal-500/5 to-transparent",
    border: "border-teal-500/10 hover:border-teal-500/25",
    glow: "bg-teal-500/5",
    dot: "bg-teal-500/40",
  },
  {
    group: t.home.techGroups.data,
    items: ["PostgreSQL", "MySQL"],
    icon: "◎",
    gradient: "from-rose-500/10 via-rose-500/5 to-transparent",
    border: "border-rose-500/10 hover:border-rose-500/25",
    glow: "bg-rose-500/5",
    dot: "bg-rose-500/40",
  },
  {
    group: t.home.techGroups.tools,
    items: ["Git", "CI/CD", "DevSecOps"],
    icon: "⚙",
    gradient: "from-slate-500/10 via-slate-500/5 to-transparent",
    border: "border-slate-500/10 hover:border-slate-500/25",
    glow: "bg-slate-500/5",
    dot: "bg-slate-500/40",
  },
];

export default async function Home({
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

  return (
    <>
      {/* ─────────── HERO ─────────── */}
      <section
        dir={dir}
        className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-32"
      >
        <div
          className="absolute inset-0 pointer-events-none overflow-hidden"
          aria-hidden="true"
        >
          <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] rounded-full bg-[#818cf8] opacity-[0.06] blur-[120px] animate-pulse-slow" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] rounded-full bg-[#22d3ee] opacity-[0.05] blur-[100px] animate-pulse-slow animation-delay-2000" />
          <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-[#c084fc] opacity-[0.04] blur-[80px] animate-pulse-slow animation-delay-4000" />
        </div>

        <div className="relative max-w-2xl w-full text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-5 py-2 rounded-full bg-primary/5 border border-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-12">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
            </span>
            {availabilityBadge[validLocale] ?? "Open to work"}
          </div>

          <h1 className="hero-enter select-none">
            <span className="block text-6xl sm:text-7xl md:text-8xl font-black tracking-tighter leading-[1.1] wave-gradient-text mb-3">
              Mujaa
            </span>
            <span className="block text-lg sm:text-xl text-foreground/40 font-light tracking-wide">
              Mujahid Siyam
            </span>
          </h1>

          <p className="hero-enter mt-6 text-sm text-foreground/40 font-light italic">
            {waveSubtitles[validLocale] ??
              "Mujaa (موجا) — the wave, the flow, the signal"}
          </p>

          <p className="hero-enter mt-8 text-base sm:text-lg text-foreground/50 leading-relaxed max-w-lg mx-auto">
            {t.home.heroBody}
          </p>

          <div className="hero-enter mt-10 flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href={`/${validLocale}/projects`}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-foreground text-background rounded-xl font-semibold text-sm hover:opacity-90 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-foreground/10"
            >
              {t.home.exploreProjects}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
            </Link>
            <Link
              href={`/${validLocale}/blog`}
              className="group inline-flex items-center justify-center gap-2 px-7 py-3.5 border border-border/60 rounded-xl font-semibold text-sm text-foreground hover:bg-muted/50 hover:border-primary/20 transition-all duration-300 backdrop-blur-sm"
            >
              {t.home.readBlog}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform opacity-40 group-hover:opacity-100" />
            </Link>
          </div>

          <div className="hero-enter mt-14 flex justify-center gap-5">
            {socials.map(({ href, icon: Icon, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className="group relative flex items-center justify-center w-11 h-11 rounded-xl bg-muted/30 border border-border/30 text-muted-foreground hover:text-foreground hover:border-primary/30 hover:bg-primary/5 transition-all duration-500 hover:scale-110 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/5"
              >
                <Icon className="w-4 h-4 group-hover:text-primary transition-colors duration-300" />
              </a>
            ))}
          </div>

          <div className="hero-enter mt-8">
            <a
              href="mailto:hello@mujaaco.com"
              className="inline-flex items-center gap-2 text-xs text-foreground/35 hover:text-primary transition-colors duration-300 font-mono"
            >
              hello@mujaaco.com
              <ArrowRight className="w-3 h-3" />
            </a>
          </div>
        </div>
      </section>

      {/* ─────────── ABOUT SNIPPET ─────────── */}
      <section dir={dir} className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] rounded-full bg-[var(--color-wave-1)]/2 blur-[160px] opacity-20" />
          <div className="absolute top-[10%] right-[5%] w-[300px] h-[300px] rounded-full bg-[var(--color-wave-2)]/3 blur-[100px] animate-pulse-slow opacity-20 animation-delay-2000" />
        </div>

        <div className="relative max-w-3xl mx-auto">
          <div className="flex items-center gap-4 mb-3">
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
              {sectionLabels[validLocale] ?? "About"}
            </span>
            <span className="flex-1 h-px bg-gradient-to-r from-foreground/10 to-transparent" />
          </div>

          <h2
            className={`font-black tracking-tight mb-6 ${validLocale === "ar" ? "text-4xl sm:text-5xl" : "text-3xl sm:text-4xl"}`}
          >
            <span className="wave-gradient-text">{t.home.aboutHeading}</span>
          </h2>

          <p className="text-sm text-foreground/40 font-light italic mb-6 leading-relaxed max-w-xl">
            {waveSubtitles[validLocale] ??
              "Mujaa (موجا) — the wave, the flow, the signal"}
          </p>

          <div className="mb-8 w-12 h-px bg-gradient-to-r from-foreground/20 to-transparent" />

          <div className="space-y-5 text-sm sm:text-base text-foreground/45 leading-relaxed">
            <p>{t.home.about1}</p>
            <p>{t.home.about2}</p>
            <p>{t.home.about3}</p>
            <p>{t.home.about4}</p>
            <p>{t.home.about5}</p>
          </div>

          <div className="mt-10 flex items-center gap-3">
            <div className="flex-1 h-px bg-gradient-to-r from-transparent to-foreground/10" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/25">
              {availabilityBadge[validLocale] ?? "Available"}
            </span>
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500" />
            </span>
          </div>
        </div>
      </section>

      {/* ─────────── WHAT I DO ─────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-[20%] w-[600px] h-[500px] rounded-full bg-[var(--color-wave-1)]/3 blur-[150px] animate-pulse-slow opacity-30" />
          <div className="absolute bottom-0 right-[10%] w-[400px] h-[400px] rounded-full bg-[var(--color-wave-3)]/2 blur-[120px] animate-pulse-slow animation-delay-3000 opacity-30" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                {t.home.whatIDo}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="wave-gradient-text">{t.home.whatIDo}</span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {t.home.capabilities.map((item, i) => {
              const c = capColors[i % capColors.length];
              return (
                <div
                  key={item.title}
                  className={`group relative p-6 rounded-2xl border ${c.border} bg-card/20 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}
                >
                  {/* shine sweep */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                  {/* ambient glow */}
                  <div
                    className={`absolute inset-0 rounded-2xl ${c.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                  {/* gradient fill */}
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />

                  <div className="relative z-10">
                    <div
                      className={`w-9 h-9 rounded-xl ${c.glow} border ${c.border.split(" ")[0]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-500`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${c.dot} group-hover:scale-125 transition-all duration-500`}
                      />
                    </div>
                    <h3 className="text-sm font-bold text-foreground mb-2 group-hover:text-foreground/90 transition-colors duration-300">
                      {item.title}
                    </h3>
                    <p className="text-xs text-foreground/45 leading-relaxed group-hover:text-foreground/45 transition-colors duration-300">
                      {item.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ─────────── TECHNOLOGIES ─────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] rounded-full bg-gradient-to-br from-[var(--color-wave-1)]/3 via-[var(--color-wave-2)]/2 to-[var(--color-wave-3)]/3 blur-[160px] opacity-40" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                {t.home.skillsHeading}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-4">
              <span className="wave-gradient-text">{t.home.skillsHeading}</span>
            </h2>
            <p className="text-sm text-foreground/35 font-light max-w-md mx-auto">
              {t.home.skillsDescription}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {techCards(t).map(
              ({ group, items, icon, gradient, border, glow, dot }) => (
                <div
                  key={group}
                  className={`group relative p-6 rounded-2xl border ${border} bg-card/20 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}
                >
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                  <div
                    className={`absolute inset-0 rounded-2xl ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                  <div
                    className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                  />
                  <div className="relative z-10">
                    <div
                      className={`w-10 h-10 rounded-xl ${glow} border ${border.split(" ")[0]} flex items-center justify-center mb-5 text-lg font-light text-foreground/35 group-hover:text-foreground/50 group-hover:scale-110 transition-all duration-500`}
                    >
                      {icon}
                    </div>
                    <span className="block text-[10px] font-bold uppercase tracking-[0.15em] text-foreground/30 group-hover:text-foreground/45 transition-colors duration-500 mb-4">
                      {group}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      {items.map((tech: string) => (
                        <span
                          key={tech}
                          className="relative px-3 py-1.5 rounded-lg bg-background/60 border border-border/20 text-[11px] font-medium text-foreground/40 group-hover:text-foreground/50 group-hover:border-border/20 group-hover:bg-background/80 transition-all duration-500 cursor-default flex items-center gap-1.5"
                        >
                          <span
                            className={`w-1 h-1 rounded-full ${dot} group-hover:scale-125 transition-all duration-500`}
                          />
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        </div>
      </section>

      {/* ─────────── LATEST ─────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-[20%] right-[-5%] w-[400px] h-[400px] rounded-full bg-[var(--color-wave-1)]/3 blur-[130px] animate-pulse-slow opacity-30" />
          <div className="absolute bottom-[10%] left-[-5%] w-[350px] h-[350px] rounded-full bg-[var(--color-wave-2)]/2 blur-[110px] animate-pulse-slow animation-delay-2500 opacity-30" />
        </div>

        <div className="relative max-w-5xl mx-auto">
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm mb-6">
              <Sparkles className="w-3.5 h-3.5 text-primary/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                {t.home.latest.heading}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
              <span className="wave-gradient-text">
                {t.home.latest.heading}
              </span>
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              {
                l: t.home.latest.blog,
                href: `/${validLocale}/blog`,
                border: "border-amber-500/10 hover:border-amber-500/25",
                glow: "bg-amber-500/5",
                gradient: "from-amber-500/8 via-amber-500/3 to-transparent",
                dot: "bg-amber-500/40",
              },
              {
                l: t.home.latest.projects,
                href: `/${validLocale}/projects`,
                border: "border-sky-500/10 hover:border-sky-500/25",
                glow: "bg-sky-500/5",
                gradient: "from-sky-500/8 via-sky-500/3 to-transparent",
                dot: "bg-sky-500/40",
              },
              {
                l: t.home.latest.music,
                href: `/${validLocale}/music`,
                border: "border-fuchsia-500/10 hover:border-fuchsia-500/25",
                glow: "bg-fuchsia-500/5",
                gradient: "from-fuchsia-500/8 via-fuchsia-500/3 to-transparent",
                dot: "bg-fuchsia-500/40",
              },
            ].map(({ l, href, border, glow, gradient, dot }) => (
              <Link
                key={href}
                href={href}
                className={`group relative p-8 rounded-2xl border ${border} bg-card/20 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}
              >
                {/* shine sweep */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                {/* ambient glow */}
                <div
                  className={`absolute inset-0 rounded-2xl ${glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />
                {/* gradient fill */}
                <div
                  className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                />

                <div className="relative z-10">
                  <div className="flex items-center gap-2 mb-5">
                    <span
                      className={`w-2 h-2 rounded-full ${dot} group-hover:scale-125 transition-all duration-500`}
                    />
                    <span className="text-[10px] font-semibold uppercase tracking-[0.15em] text-foreground/35 group-hover:text-foreground/40 transition-colors duration-500">
                      {l.label}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold text-foreground mb-2 group-hover:text-foreground/90 transition-colors duration-300">
                    {l.title}
                  </h3>
                  <p className="text-xs text-foreground/40 leading-relaxed group-hover:text-foreground/40 transition-colors duration-300">
                    {l.description}
                  </p>
                  <div className="mt-6 flex items-center gap-2 text-xs text-foreground/30 group-hover:text-primary transition-colors duration-300">
                    {l.cta}{" "}
                    <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ─────────── FAQ ─────────── */}
      {t.faq && (
        <section className="relative py-32 px-6 overflow-hidden">
          <FaqPageStructuredData
            questions={t.faq.items.map((item) => ({
              question: item.q,
              answer: item.a,
            }))}
          />
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-1/3 right-[-10%] w-[600px] h-[500px] rounded-full bg-[var(--color-wave-1)]/3 blur-[140px] animate-pulse-slow opacity-30" />
            <div className="absolute bottom-[15%] left-[-8%] w-[450px] h-[400px] rounded-full bg-[var(--color-wave-2)]/2 blur-[120px] animate-pulse-slow opacity-25 animation-delay-2000" />
            <div className="absolute top-[60%] left-[40%] w-[250px] h-[250px] rounded-full bg-[var(--color-wave-3)]/3 blur-[100px] animate-pulse-slow opacity-20 animation-delay-4000" />
          </div>

          <div className="relative max-w-5xl mx-auto">
            <div className="text-center mb-20">
              <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm mb-6">
                <Sparkles className="w-3.5 h-3.5 text-primary/40" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
                  {t.faq.heading}
                </span>
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight">
                <span className="wave-gradient-text">{t.faq.heading}</span>
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-4">
              {t.faq.items.map((item: { q: string; a: string }, i: number) => {
                const c = capColors[i % capColors.length];
                return (
                  <div
                    key={item.q}
                    className={`group relative p-6 sm:p-8 rounded-2xl border ${c.border} bg-card/20 backdrop-blur-sm transition-all duration-700 hover:-translate-y-1 hover:shadow-2xl overflow-hidden`}
                  >
                    <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none" />
                    <div
                      className={`absolute inset-0 rounded-2xl ${c.glow} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    <div
                      className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${c.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700`}
                    />
                    <div className="relative z-10">
                      <div className="flex items-start gap-4">
                        <span className="text-lg font-light shrink-0 mt-0.5 text-foreground/20 group-hover:text-foreground/40 transition-colors duration-500">
                          {["①", "②", "③", "④"][i]}
                        </span>
                        <div className="min-w-0">
                          <h3 className="text-sm font-bold text-foreground mb-3 group-hover:text-foreground/90 transition-colors duration-300">
                            {item.q}
                          </h3>
                          <p className="text-xs text-foreground/45 leading-relaxed group-hover:text-foreground/50 transition-colors duration-300">
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
      )}

      {/* ─────────── CTA ─────────── */}
      <section className="relative py-32 px-6 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[400px] rounded-full bg-gradient-to-br from-[var(--color-wave-1)] via-[var(--color-wave-2)] to-[var(--color-wave-3)] opacity-[0.06] blur-[120px] animate-pulse-slow" />
        </div>
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full border border-border/30 bg-card/30 backdrop-blur-sm mb-8">
            <Sparkles className="w-3.5 h-3.5 text-primary/40" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/40">
              {availabilityBadge[validLocale] ?? "Available"}
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-black tracking-tighter mb-4">
            <span className="wave-gradient-text">{t.home.ctaHeading}</span>
          </h3>
          <p className="text-sm sm:text-base text-foreground/45 font-light leading-relaxed max-w-md mx-auto mb-10">
            {t.home.ctaDescription}
          </p>
          <Link
            href="mailto:hello@mujaaco.com"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-foreground text-background rounded-2xl font-semibold text-sm hover:opacity-90 hover:scale-[1.02] hover:shadow-2xl hover:shadow-foreground/10 transition-all duration-300"
          >
            {t.home.ctaButton}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>
      </section>
    </>
  );
}
