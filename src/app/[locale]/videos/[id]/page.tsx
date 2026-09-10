import { ArrowLeft, Clock, ExternalLink } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
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

  const backToVideos = isAr ? "الفيديوهات" : isFr ? "Vidéos" : "Videos";
  const watchOnYouTube = isAr
    ? "شاهد على يوتيوب"
    : isFr
      ? "Regarder sur YouTube"
      : "Watch on YouTube";

  return (
    <div dir={dir} className="min-h-screen bg-background">
      <VideoObjectStructuredData video={video} url={url} />
      <BreadcrumbStructuredData
        items={[
          {
            name: isAr ? "الرئيسية" : "Home",
            url: `https://mujaaco.com/${validLocale}`,
          },
          {
            name: backToVideos,
            url: `https://mujaaco.com/${validLocale}/videos`,
          },
          {
            name: video.title,
            url,
          },
        ]}
      />

      <section className="relative pt-28 pb-16 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          <Link
            href={`/${validLocale}/videos`}
            className="inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/60 transition-colors group mb-8"
          >
            <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
            {backToVideos}
          </Link>

          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/10 text-red-400 text-[10px] font-semibold uppercase tracking-widest mb-4">
            {video.category}
          </span>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-black tracking-tighter leading-tight mb-4">
            <span className="wave-gradient-text">{video.title}</span>
          </h1>

          <div className="flex items-center gap-3 mb-8 text-xs text-foreground/40">
            <span className="flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              {new Date(video.uploadDate).toLocaleDateString(
                isAr ? "ar-SA" : isFr ? "fr-FR" : "en-US",
                { year: "numeric", month: "long", day: "numeric" },
              )}
            </span>
            <span className="text-foreground/20">·</span>
            <span>@MujaaMusic</span>
          </div>

          <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-2xl shadow-black/20 ring-1 ring-white/5 mb-6">
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

          <p className="text-foreground/60 leading-relaxed text-sm sm:text-base mb-8">
            {video.description}
          </p>

          <a
            href={videoWatchUrl(id)}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-500/10 text-red-400 hover:bg-red-500/20 hover:text-red-300 font-medium text-sm transition-all duration-300 hover:scale-[1.02]"
          >
            <ExternalLink className="w-4 h-4" />
            {watchOnYouTube}
          </a>
        </div>
      </section>
    </div>
  );
}
