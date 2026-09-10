import { Play, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { type Video, type VideoCategory, videos } from "@/content/videos";
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

const categoryLabels: Record<VideoCategory, Record<string, string>> = {
  music: { ar: "موسيقى", fr: "Musique", en: "Music" },
  development: { ar: "تطوير", fr: "Développement", en: "Development" },
  lifestyle: { ar: "حياة", fr: "Lifestyle", en: "Lifestyle" },
};

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

  const localized = (r: Record<string, string>) =>
    isAr ? r.ar : isFr ? r.fr : r.en;

  return (
    <div dir={dir} className="min-h-screen bg-background">
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

      <section className="relative pt-28 pb-20 px-4 sm:px-6">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2.5 px-5 py-2 rounded-full bg-red-500/5 border border-red-500/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-red-400/80 mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              {isAr ? "فيديوهات" : isFr ? "Vidéos" : "Videos"}
            </div>
            <h1 className="text-4xl sm:text-5xl font-black tracking-tighter mb-4">
              <span className="wave-gradient-text">
                {isAr
                  ? "شاهد واستمع"
                  : isFr
                    ? "Regarder & Écouter"
                    : "Watch & Listen"}
              </span>
            </h1>
          </div>

          {categoryOrder.map((category) => {
            const items = videos.filter((v) => v.category === category);
            if (items.length === 0) return null;
            return (
              <section key={category} className="mb-16">
                <div className="flex items-center gap-3 mb-8">
                  <h2 className="text-xl font-bold text-foreground whitespace-nowrap">
                    {localized(categoryLabels[category])}
                  </h2>
                  <div className="h-px flex-1 bg-gradient-to-r from-red-500/20 to-transparent" />
                </div>
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {items.map((video: Video) => (
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
      </section>
    </div>
  );
}

function VideoCard({ video, locale }: { video: Video; locale: string }) {
  return (
    <Link
      href={`/${locale}/videos/${video.id}`}
      className="group block rounded-2xl overflow-hidden border border-border/20 bg-card/30 hover:border-red-500/30 hover:-translate-y-1 transition-all duration-300"
    >
      <div className="relative aspect-video overflow-hidden bg-muted/20">
        <Image
          src={`https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`}
          alt={video.title}
          fill
          sizes="(max-width: 768px) 100vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="flex items-center justify-center w-12 h-12 rounded-full bg-red-500 text-white">
            <Play className="w-5 h-5 translate-x-0.5" />
          </span>
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-red-400 transition-colors">
          {video.title}
        </h3>
        <p className="text-[11px] text-foreground/40 mt-2">
          {new Date(video.uploadDate).toLocaleDateString(
            locale === "ar" ? "ar-SA" : locale === "fr" ? "fr-FR" : "en-US",
            { year: "numeric", month: "short", day: "numeric" },
          )}
        </p>
      </div>
    </Link>
  );
}
