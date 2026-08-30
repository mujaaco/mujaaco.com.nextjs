import type { Metadata } from "next";
import { localeLanguages } from "@/app/lib/seo";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { BreadcrumbStructuredData } from "../../components/BreadcrumbJsonLd";
import {
  KakashiAlbumStructuredData,
  MusicArtistStructuredData,
} from "../../components/StructuredData";
import { MusicContent } from "./MusicContent";

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
    title: t.music.title,
    description: t.music.description,
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/music`,
      languages: localeLanguages("music"),
    },
    openGraph: {
      title: t.music.title,
      description: t.music.description,
      url: `https://mujaaco.com/${validLocale}/music`,
      type: "music.playlist",
      images: [
        {
          url: "https://mujaaco.com/img/profile-artist-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Mujaa",
        },
      ],
      siteName: "Mujaa",
    },
    twitter: {
      card: "summary_large_image",
      title: t.music.title,
      description: t.music.description,
      images: ["https://mujaaco.com/img/profile-artist-1200x630.png"],
      site: "@mujaaco",
      creator: "@mujaaco",
    },
  };
}

export default async function MusicPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);

  return (
    <>
      <MusicArtistStructuredData />
      <KakashiAlbumStructuredData />
      <BreadcrumbStructuredData
        items={[
          {
            name: validLocale === "ar" ? "الرئيسية" : "Home",
            url: `https://mujaaco.com/${validLocale}`,
          },
          {
            name: dict.music.heading,
            url: `https://mujaaco.com/${validLocale}/music`,
          },
        ]}
      />
      <MusicContent locale={validLocale} t={dict.music} />
    </>
  );
}
