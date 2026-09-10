import {
  ArrowLeft,
  CalendarDays,
  Clock,
  ExternalLink,
  Play,
} from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  categoryTheme,
  getVideo,
  videoEmbedUrl,
  videos,
  videoThumbnails,
  videoWatchUrl,
} from "@/content/videos";
import { type Locale, locales } from "@/i18n/config";
import { BreadcrumbStructuredData } from "../../../components/BreadcrumbJsonLd";
import { VideoObjectStructuredData } from "../../../components/StructuredData";

export function generateStaticParams() {
  return videos.map((video) => ({ id: video.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}): Promise<Metadata> {
  const { locale, id } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const video = getVideo(id);

  if (!video) return {};

  const url = `https://mujaaco.com/${validLocale}/videos/${id}`;
  const [thumb] = videoThumbnails(id);

  return {
    title: { absolute: video.title },
    description: video.description,
    alternates: {
      canonical: url,
      languages: {
        en: `https://mujaaco.com/en/videos/${id}`,
        ar: `https://mujaaco.com/ar/videos/${id}`,
        fr: `https://mujaaco.com/fr/videos/${id}`,
        "x-default": `https://mujaaco.com/en/videos/${id}`,
      },
    },
    openGraph: {
      title: video.title,
      description: video.description,
      type: "video.other",
      url,
      images: [{ url: thumb, width: 1280, height: 720, alt: video.title }],
      videos: [
        {
          url: videoEmbedUrl(id),
          width: 1280,
          height: 720,
          type: "text/html",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: video.title,
      description: video.description,
      images: [thumb],
    },
  };
}

export default async function VideoPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const video = getVideo(id);

  if (!video) notFound();

  const url = `https://mujaaco.com/${validLocale}/videos/${id}`;
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const isAr = validLocale === "ar";
  const isFr = validLocale === "fr";
  const theme = categoryTheme[video.category];

  const related = videos.filter((v) => v.id !== video.id).slice(0, 3);

  return (
    <div
      dir={dir}
      className="relative min-h-screen bg-background overflow-hidden"
    >
      <VideoObjectStructuredData video={video} url={url} />
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
          {
            name: video.title,
            url,
          },
        ]}
      />

      {/* Ambient glow */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute -top-1/4 left-1/4 w-[600px] h-[600px] bg-purple-500/5 rounded-full blur-[150px]" />
        <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-sky-500/5 rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 pb-20">
        <Link
          href={`/${validLocale}/videos`}
          className="inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/70 transition-colors group mb-8"
        >
          <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
          {isAr ? "كل الفيديوهات" : isFr ? "Toutes les vidéos" : "All videos"}
        </Link>

        <div className="text-center mb-10">
          <span
            className={`inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border text-[10px] font-bold uppercase tracking-widest ${theme.badge}`}
          >
            <span className={`h-1.5 w-1.5 rounded-full ${theme.dot}`} />
            {theme.label[validLocale]}
          </span>
          <h1 className="mt-5 text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight">
            <span className="wave-gradient-text">{video.title}</span>
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-4 mt-5 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <CalendarDays className="w-3.5 h-3.5" />
              {new Date(video.uploadDate).toLocaleDateString(
                isAr ? "ar-SA" : isFr ? "fr-FR" : "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </span>
            <span className="text-foreground/20">·</span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              @MujaaMusic
            </span>
          </div>
        </div>

        {/* Video player */}
        <div className="relative rounded-[28px] overflow-hidden bg-gradient-to-br from-card/60 via-card/30 to-transparent border border-border/20 p-2 sm:p-3 mb-10 shadow-2xl shadow-black/10">
          <div className="absolute -top-16 right-10 w-72 h-72 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-16 left-10 w-72 h-72 bg-sky-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative aspect-video w-full rounded-3xl overflow-hidden ring-1 ring-white/10">
            <iframe
              src={videoEmbedUrl(id)}
              width="100%"
              height="100%"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
              className="w-full h-full"
              title={video.title}
            />
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-16">
          <p className="text-foreground/60 leading-relaxed text-sm sm:text-base max-w-xl">
            {video.description}
          </p>
          <a
            href={videoWatchUrl(id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-medium text-sm transition-all duration-300 hover:scale-[1.02] shrink-0"
          >
            <ExternalLink className="w-4 h-4" />
            {isAr
              ? "شاهد على يوتيوب"
              : isFr
                ? "Regarder sur YouTube"
                : "Watch on YouTube"}
          </a>
        </div>

        {/* Related videos */}
        {related.length > 0 && (
          <section>
            <div className="flex items-center gap-3 mb-8">
              <div className="h-[2px] flex-1 bg-gradient-to-r from-white/10 to-transparent" />
              <h2 className="text-lg font-bold text-foreground whitespace-nowrap flex items-center gap-2">
                <Play className="w-4 h-4 text-primary/60" />
                {isAr
                  ? "فيديوهات أخرى"
                  : isFr
                    ? "Autres vidéos"
                    : "More videos"}
              </h2>
              <div className="h-[2px] flex-1 bg-gradient-to-l from-white/10 to-transparent" />
            </div>
            <div className="grid gap-5 sm:grid-cols-3">
              {related.map((v) => (
                <Link
                  key={v.id}
                  href={`/${validLocale}/videos/${v.id}`}
                  className="group relative rounded-2xl overflow-hidden border border-border/20 bg-card/40 hover:border-white/20 hover:-translate-y-1 transition-all duration-500"
                >
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`https://i.ytimg.com/vi/${v.id}/hqdefault.jpg`}
                      alt={v.title}
                      fill
                      sizes="(max-width: 768px) 100vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white/10 backdrop-blur-md ring-1 ring-white/20 text-white">
                        <Play className="w-4 h-4 translate-x-0.5" />
                      </span>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-foreground text-sm line-clamp-2 leading-snug group-hover:text-primary transition-colors">
                      {v.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
