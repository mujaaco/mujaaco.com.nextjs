import { Play, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import {
  categoryTheme,
  type Video,
  type VideoCategory,
  videos,
} from "@/content/videos";
import { type Locale, locales } from "@/i18n/config";
import { BreadcrumbStructuredData } from "../../components/BreadcrumbJsonLd";

const categoryOrder: VideoCategory[] = ["music", "development", "lifestyle"];

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";

  return {
    title:
      validLocale === "ar"
        ? "الفيديوهات | موجا — مجاهد صيام"
        : validLocale === "fr"
          ? "Vidéos | Mujaa (Mujahid Siyam)"
          : "Videos | Mujaa (Mujahid Siyam)",
    description:
      validLocale === "ar"
        ? "فيديوهات موجا — موسيقى، تطوير، وحياة."
        : validLocale === "fr"
          ? "Vidéos de Mujaa — musique, développement et lifestyle."
          : "Videos by Mujaa — music, development, and lifestyle.",
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/videos`,
      languages: {
        en: "https://mujaaco.com/en/videos",
        ar: "https://mujaaco.com/ar/videos",
        fr: "https://mujaaco.com/fr/videos",
        "x-default": "https://mujaaco.com/en/videos",
      },
    },
  };
}

export default async function VideosPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const isAr = validLocale === "ar";
  const isFr = validLocale === "fr";

  const featured = videos.find((v) => v.featured) ?? videos[0];
  const remaining = videos.filter((v) => v.id !== featured?.id);

  return (
    <div
      dir={dir}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      <BreadcrumbStructuredData
        items={[
          {
            name: isAr ? "الرئيسية" : "Home",
            url: `https://mujaaco.com/${validLocale}`,
          },
          {
            name: isAr ? "الفيديوهات" : isFr ? "Vidéos" : "Videos",
            url: `https://mujaaco.com/${validLocale}/videos`,
          },
        ]}
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 w-[700px] h-[700px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute top-1/2 -right-32 w-[500px] h-[500px] bg-sky-500/5 rounded-full blur-[120px]" />
        <div className="absolute -bottom-1/4 left-1/3 w-[400px] h-[400px] bg-amber-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        {/* ===== HERO ===== */}
        <div className="text-center mb-20">
          <div className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-purple-500/5 via-sky-500/5 to-amber-500/5 backdrop-blur-xl mb-8 ring-1 ring-white/10">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
            </span>
            <span className="text-xs font-bold uppercase tracking-[0.15em] text-foreground/50">
              {isAr
                ? "مكتبة الفيديو"
                : isFr
                  ? "Bibliothèque vidéo"
                  : "Video Library"}
            </span>
          </div>

          <h1 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">
              {isAr
                ? "شاهد واستمع"
                : isFr
                  ? "Regarder & Écouter"
                  : "Watch & Listen"}
            </span>
          </h1>

          <p className="text-base sm:text-lg text-foreground/40 max-w-md mx-auto font-light leading-relaxed">
            {isAr
              ? "موسيقى، كود، وحياة — كل شيء في مكان واحد."
              : isFr
                ? "Musique, code et lifestyle — tout au même endroit."
                : "Music, code, and lifestyle — everything in one place."}
          </p>
        </div>

        {/* ===== FEATURED ===== */}
        {featured && (
          <FeaturedVideo
            video={featured}
            locale={validLocale}
            isAr={isAr}
            isFr={isFr}
          />
        )}

        {/* ===== CATEGORY SECTIONS ===== */}
        {categoryOrder.map((category) => {
          const items = remaining.filter((v) => v.category === category);
          if (items.length === 0) return null;
          const theme = categoryTheme[category];
          return (
            <section key={category} className="mb-16">
              <div className="flex items-center gap-3 mb-8">
                <div
                  className={`h-[2px] flex-1 bg-gradient-to-r ${theme.glow}`}
                />
                <h2 className="text-xl sm:text-2xl font-bold text-foreground whitespace-nowrap flex items-center gap-2.5">
                  <span className={`h-2 w-2 rounded-full ${theme.dot}`} />
                  {theme.label[validLocale]}
                </h2>
                <div
                  className={`h-[2px] flex-1 bg-gradient-to-l ${theme.glow}`}
                />
              </div>
              <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {items.map((video) => (
                  <VideoCard
                    key={video.id}
                    video={video}
                    locale={validLocale}
                  />
                ))}
              </div>
            </section>
          );
        })}

        {videos.length === 0 && (
          <p className="text-center text-foreground/30 text-sm">
            {isAr
              ? "لا توجد فيديوهات بعد."
              : isFr
                ? "Aucune vidéo pour le moment."
                : "No videos yet."}
          </p>
        )}
      </div>
    </div>
  );
}

function FeaturedVideo({
  video,
  locale,
  isAr,
  isFr,
}: {
  video: Video;
  locale: string;
  isAr: boolean;
  isFr: boolean;
}) {
  const theme = categoryTheme[video.category];
  return (
    <section className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-card/60 via-card/30 to-transparent border border-border/20 p-6 sm:p-10 mb-20 group hover:border-white/20 transition-all duration-700">
      <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3 pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-80 h-80 bg-sky-500/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/3 pointer-events-none" />

      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-8">
          <span
            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-widest ${theme.badge}`}
          >
            <Sparkles className="w-3 h-3" />
            {isAr ? "مميز" : isFr ? "À la une" : "Featured"}
          </span>
          <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
        </div>

        <Link
          href={`/${locale}/videos/${video.id}`}
          className="group/card block"
        >
          <div className="relative aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/10 mb-8">
            <Image
              src={`https://i.ytimg.com/vi/${video.id}/maxresdefault.jpg`}
              alt={video.title}
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-cover group-hover/card:scale-105 transition-transform duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="flex items-center justify-center w-20 h-20 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white group-hover/card:scale-110 group-hover/card:bg-red-500 transition-all duration-500">
                <Play className="w-8 h-8 translate-x-0.5" />
              </span>
            </div>
          </div>
        </Link>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-xl sm:text-2xl font-black text-foreground mb-1 group-hover:text-primary transition-colors">
              {video.title}
            </h3>
            <p className="text-sm text-foreground/45 line-clamp-2 max-w-xl">
              {video.description}
            </p>
          </div>
          <Link
            href={`/${locale}/videos/${video.id}`}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-foreground text-background font-medium text-sm hover:opacity-90 hover:scale-[1.02] transition-all duration-300 shrink-0"
          >
            <Play className="w-4 h-4" />
            {isAr ? "شاهد" : isFr ? "Regarder" : "Watch"}
          </Link>
        </div>
      </div>
    </section>
  );
}

function VideoCard({ video, locale }: { video: Video; locale: string }) {
  const theme = categoryTheme[video.category];
  return (
    <Link
      href={`/${locale}/videos/${video.id}`}
      className="group relative rounded-2xl overflow-hidden border border-border/20 bg-card/40 backdrop-blur-sm hover:border-white/20 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/10 transition-all duration-500"
    >
      <div className="relative aspect-video overflow-hidden bg-muted/20">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
        <span
          className={`absolute top-3 start-3 inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[9px] font-bold uppercase tracking-wider backdrop-blur-md ${theme.badge}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
          {theme.label[locale as "en" | "ar" | "fr"]}
        </span>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white group-hover:bg-red-500 transition-colors duration-300">
            <Play className="w-5 h-5 translate-x-0.5" />
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
          {video.title}
        </h3>
        <p className="text-[11px] text-foreground/35 mt-2 font-medium tabular-nums">
          {new Date(video.uploadDate).toLocaleDateString(
            locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US",
            { year: "numeric", month: "short", day: "numeric" },
          )}
        </p>
      </div>
    </Link>
  );
}
