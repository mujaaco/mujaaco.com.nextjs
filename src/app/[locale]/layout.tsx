import type { Metadata } from "next";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import Footer from "../components/Footer";
import Header from "../components/Header";

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
    title: {
      template:
        validLocale === "ar"
          ? `%s | موجا (الموجة) — مجاهد صيام`
          : `%s | Mujaa (Mujahid Siyam)`,
      default: dict.site.defaultTitle,
    },
    description: dict.site.description,
    authors: [{ name: "Mujahid Siyam", url: "https://mujaaco.com" }],
    openGraph: {
      title: dict.site.defaultTitle,
      description: dict.site.description,
      type: "website",
      locale:
        validLocale === "ar"
          ? "ar_SA"
          : validLocale === "fr"
            ? "fr_FR"
            : "en_US",
      siteName: "Mujaa",
      images: [
        {
          url: "https://mujaaco.com/img/profile-engineer-1200x630.png",
          width: 1200,
          height: 630,
          alt: "Mujahid Siyam",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: dict.site.defaultTitle,
      description: dict.site.description,
      images: ["https://mujaaco.com/img/profile-engineer-1200x630.png"],
      site: "@mujaaco",
      creator: "@mujaaco",
    },
    category: "technology",
    creator: "Mujahid Siyam",
    publisher: "Mujahid Siyam",
  };
}

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);
  const authorName = validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam";

  return (
    <>
      <Header
        locale={validLocale}
        dict={{ blog: { authorBio: dict.blog.authorBio } }}
        nav={dict.nav}
      />
      <main className="flex-1 pt-14">{children}</main>
      <Footer
        locale={validLocale}
        footer={dict.footer}
        authorBio={dict.blog.authorBio}
        authorName={authorName}
      />
    </>
  );
}
