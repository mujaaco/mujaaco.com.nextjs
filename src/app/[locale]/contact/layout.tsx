import type { Metadata } from "next";
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
    title: t.contact.title,
    description: t.contact.description,
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/contact`,
      languages: localeLanguages("contact"),
    },
    openGraph: {
      title: t.contact.title,
      description: t.contact.description,
      url: `https://mujaaco.com/${validLocale}/contact`,
      type: "website",
    },
  };
}

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
