import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { Metadata } from "next";
import { localeLanguages } from "@/app/lib/seo";
import { type Locale, locales } from "@/i18n/config";
import { type Dictionary, getDictionary } from "@/i18n/get-dictionary";
import BlogContent from "./blog-content";

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
    title: t.blog.title,
    description: t.blog.description,
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/blog`,
      languages: localeLanguages("blog"),
    },
    openGraph: {
      title: t.blog.title,
      description: t.blog.description,
      url: `https://mujaaco.com/${validLocale}/blog`,
      type: "website",
    },
  };
}

interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  image?: string;
  category?: string;
  tags?: string[];
  readingTime?: string;
  featured?: boolean;
}

function calculateReadingTime(content: string, t: Dictionary): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} ${t.blog.minRead}`;
}

async function getBlogPosts(t: Dictionary): Promise<BlogPost[]> {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter((f) => f.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const { data, content } = matter(
            await fs.readFile(join(blogDirectory, file), "utf8"),
          );
          return {
            slug,
            title: data.title || slug,
            description: data.description || t.blog.noDescription,
            date: data.date || "Unknown date",
            image: data.image || "/vercel.svg",
            category: data.category || t.blog.uncategorized,
            tags: data.tags || [],
            readingTime: calculateReadingTime(content, t),
            featured: data.featured || false,
            draft: data.draft || false,
          };
        }),
    );
    return posts
      .filter((p) => !p.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);
  const posts = await getBlogPosts(dict);

  return (
    <div className="min-h-screen" dir={validLocale === "ar" ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[500px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
          <div className="absolute top-[20%] right-[10%] w-[400px] h-[300px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
          <div className="absolute bottom-0 left-[5%] w-[350px] h-[250px] rounded-full bg-[var(--color-wave-2)] opacity-[0.03] blur-[90px] animate-pulse-slow animation-delay-4000" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-amber-500/5 border border-amber-500/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-amber-500/60 mb-8">
            {dict.blog.heroSubtitle}
          </div>

          <h1 className="hero-enter text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">{dict.blog.heroTitle}</span>
          </h1>

          <p className="hero-enter text-base sm:text-lg text-foreground/45 font-light leading-relaxed max-w-lg mx-auto">
            {dict.blog.heroDescription}
          </p>

          <div className="hero-enter mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-24">
        <BlogContent posts={posts} locale={validLocale} dict={dict.blog} />
      </main>
    </div>
  );
}

export const revalidate = 60;
