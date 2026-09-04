import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { ArrowLeft, Clock } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";
import { type Dictionary, getDictionary } from "@/i18n/get-dictionary";
import { compileMdx } from "@/lib/mdx-compiler";
import Author from "../../../components/Author";
import { BreadcrumbStructuredData } from "../../../components/BreadcrumbJsonLd";
import ClientMDXRenderer from "../../../components/ClientMDXRenderer";
import { ArticleStructuredData } from "../../../components/StructuredData";

export const revalidate = 60;

function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const words = content.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
}

interface AuthorData {
  name: string;
  image: string;
  bio: string;
  socialLinks?: {
    github?: string;
    twitter?: string;
    linkedin?: string;
    website?: string;
  };
}

async function getBlogPosts() {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");

  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const fullPath = join(blogDirectory, file);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data } = matter(fileContents);

          // Parse author data
          let author: AuthorData | undefined;
          if (data.author) {
            if (typeof data.author === "string") {
              try {
                author = JSON.parse(data.author);
              } catch {
                author = {
                  name: data.author,
                  image: "/default-avatar.jpg",
                  bio: "",
                };
              }
            } else if (typeof data.author === "object") {
              author = data.author;
            }
          }

          return {
            slug,
            title: data.title || `Blog Post ${slug}`,
            description: data.description || "No description available.",
            date: data.date || "Unknown date",
            image: data.image || "/vercel.svg",
            category: data.category || "Uncategorized",
            tags: data.tags || [],
            readingTime: calculateReadingTime(fileContents),
            featured: data.featured || false,
            draft: data.draft || false,
            author,
          };
        }),
    );

    // Filter out draft posts and sort by date in descending order
    return posts
      .filter((post) => !post.draft)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch (error) {
    console.error("Error reading blog posts:", error);
    return [];
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const resolvedParams = await params;
  const slug = resolvedParams.slug;
  const validLocale = locales.includes(resolvedParams.locale as Locale)
    ? (resolvedParams.locale as Locale)
    : "en";
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  const fullPath = join(blogDirectory, `${slug}.mdx`);

  try {
    await fs.access(fullPath);
    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data } = matter(fileContents);

    const title = data.title || slug;
    const description = data.description || "";
    const image = "https://mujaaco.com/img/profile-engineer-1200x630.png";
    const publishedTime = data.date;

    return {
      title: { absolute: title },
      description,
      alternates: {
        canonical: `https://mujaaco.com/${validLocale}/blog/${slug}`,
        languages: {
          en: `https://mujaaco.com/en/blog/${slug}`,
          ar: `https://mujaaco.com/ar/blog/${slug}`,
          fr: `https://mujaaco.com/fr/blog/${slug}`,
          "x-default": `https://mujaaco.com/en/blog/${slug}`,
        },
      },
      openGraph: {
        title,
        description,
        type: "article",
        url: `https://mujaaco.com/${validLocale}/blog/${slug}`,
        images: [{ url: image, width: 1200, height: 630, alt: title }],
        publishedTime,
        modifiedTime: publishedTime,
        authors: ["Mujahid Siyam"],
        tags: data.tags || [],
      },
      twitter: {
        card: "summary_large_image",
        title,
        description,
        images: [image],
        site: "@mujaaco",
        creator: "@mujaaco",
      },
      category: data.category || undefined,
      other: {
        "article:published_time": publishedTime,
        "article:author": "Mujahid Siyam",
        "article:tag": (data.tags || []).join(", "),
        "article:section": data.category || "",
      },
    };
  } catch {
    return {
      title: slug,
      alternates: {
        canonical: `https://mujaaco.com/${validLocale}/blog/${slug}`,
      },
    };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  try {
    const resolvedParams = await params;

    if (!resolvedParams?.slug) {
      notFound();
    }

    const validLocale = locales.includes(resolvedParams.locale as Locale)
      ? (resolvedParams.locale as Locale)
      : "en";
    const dict = getDictionary(validLocale);
    const dir = validLocale === "ar" ? "rtl" : "ltr";

    const blogDirectory = join(process.cwd(), "src", "content", "blog");
    const fullPath = join(blogDirectory, `${resolvedParams.slug}.mdx`);

    await fs.access(fullPath);

    const fileContents = await fs.readFile(fullPath, "utf8");
    const { data: frontmatter, content } = matter(fileContents);

    if (frontmatter.draft === true) {
      notFound();
    }

    // Use default values if frontmatter is missing
    const title = frontmatter.title || `Blog Post ${resolvedParams.slug}`;
    const date = frontmatter.date || "Unknown date";

    // Calculate reading time
    const readingTime = calculateReadingTime(content);

    // Compile MDX to HTML on server for SEO
    const html = await compileMdx(content);

    return (
      <div
        className="min-h-screen bg-background transition-colors duration-300"
        dir={dir}
      >
        <ArticleStructuredData
          title={title}
          description={frontmatter.description || dict.blog.noDescription}
          datePublished={
            date !== "Unknown date"
              ? new Date(date).toISOString()
              : new Date().toISOString()
          }
          image={frontmatter.image || ""}
          url={`https://mujaaco.com/${validLocale}/blog/${resolvedParams.slug}`}
        />
        <BreadcrumbStructuredData
          items={[
            {
              name: validLocale === "ar" ? "الرئيسية" : "Home",
              url: `https://mujaaco.com/${validLocale}`,
            },
            {
              name: dict.blog.title
                .replace(" | Mujaa (Mujahid Siyam)", "")
                .replace(/^Blog \| /, ""),
              url: `https://mujaaco.com/${validLocale}/blog`,
            },
            {
              name: title,
              url: `https://mujaaco.com/${validLocale}/blog/${resolvedParams.slug}`,
            },
          ]}
        />

        {/* Hero Header — full width, flowing naturally */}
        <section className="relative pt-32 pb-12 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[450px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
            <div className="absolute top-[30%] right-[5%] w-[400px] h-[300px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
          </div>

          <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back link */}
            <div className="hero-enter mb-12">
              <Link
                href={`/${validLocale}/blog`}
                className="inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/60 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                {dict.blog.backToBlog}
              </Link>
            </div>

            {/* Category + tags */}
            <div className="hero-enter flex flex-wrap items-center gap-2 mb-6">
              <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/60">
                {frontmatter.category || dict.blog.uncategorized}
              </span>
              {frontmatter.tags?.slice(0, 3).map((tag: string) => (
                <span
                  key={tag}
                  className="px-2.5 py-0.5 rounded-full bg-muted/50 text-[10px] text-foreground/40 border border-border/30"
                >
                  {tag}
                </span>
              ))}
            </div>

            {/* Title — full width gradient */}
            <h1 className="hero-enter text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tighter leading-[1.05] mb-8">
              <span className="wave-gradient-text">{title}</span>
            </h1>

            {/* Description — set under the title */}
            <p className="hero-enter text-base sm:text-lg text-foreground/45 font-light leading-relaxed max-w-3xl">
              {frontmatter.description}
            </p>
          </div>
        </section>

        {/* Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
          {/* Hero image */}
          {frontmatter.image && (
            <div className="mb-12">
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden border border-border/20">
                <Image
                  src={frontmatter.image}
                  alt={title}
                  fill
                  sizes="(max-width: 768px) 100vw, 768px"
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          )}

          {/* Post details — date + reading time before content */}
          <div className="flex items-center gap-3 mb-12 text-xs text-foreground/35">
            {date !== "Unknown date" && (
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5" />
                {new Date(date).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            )}
            {readingTime && (
              <>
                <span className="text-foreground/10">·</span>
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  {readingTime}
                </span>
              </>
            )}
          </div>

          {/* Post Content */}
          <div className="prose-content mb-20">
            <ClientMDXRenderer html={html} />
          </div>

          {/* Author Section */}
          <div className="mt-16 pt-8 border-t border-border/20">
            <Author
              name={validLocale === "ar" ? "مجاهد صيام" : "Mujahid Siyam"}
              image="/img/profile.png"
              bio={dict.blog.authorBio}
              aboutLabel={dict.blog.aboutTheAuthor}
              socialLinks={{
                github: "https://github.com/mujaaco",
                twitter: "https://x.com/mujaaco",
                linkedin: "https://linkedin.com/in/mujaaco",
                website: "https://mujaaco.com",
              }}
            />
          </div>

          {/* Next/Previous Navigation */}
          <PostNavigation
            currentSlug={resolvedParams.slug}
            locale={validLocale}
            dict={dict}
          />

          <RelatedPosts
            currentSlug={resolvedParams.slug}
            category={frontmatter.category}
            locale={validLocale}
            dict={dict}
          />
        </main>
      </div>
    );
  } catch (error) {
    console.error("Error loading blog post:", error);
    notFound();
  }
}

async function PostNavigation({
  currentSlug,
  locale,
  dict,
}: {
  currentSlug: string;
  locale: string;
  dict: Dictionary;
}) {
  const posts = await getBlogPosts();
  const currentIndex = posts.findIndex((post) => post.slug === currentSlug);

  if (currentIndex === -1) return null;

  const previousPost = currentIndex > 0 ? posts[currentIndex - 1] : null;
  const nextPost =
    currentIndex < posts.length - 1 ? posts[currentIndex + 1] : null;

  const isRtl = locale === "ar";

  const CardArrow = ({ dir }: { dir: "prev" | "next" }) => {
    const prevPath = isRtl ? "M9 5l7 7-7 7" : "M15 19l-7-7 7-7";
    const nextPath = isRtl ? "M15 19l-7-7 7-7" : "M9 5l7 7-7 7";
    const d = dir === "prev" ? prevPath : nextPath;
    return (
      <div className="flex-shrink-0 p-2 rounded-xl bg-muted/40 border border-border/30 group-hover:border-primary/20 group-hover:bg-primary/[0.06] transition-all duration-300">
        <svg
          className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d={d}
          />
        </svg>
      </div>
    );
  };

  return (
    <nav className="mt-16 pt-8 border-t border-border">
      <div
        className={`flex flex-col sm:flex-row justify-between gap-6 ${!previousPost || !nextPost ? "items-center" : ""}`}
      >
        {previousPost && (
          <Link
            href={`/${locale}/blog/${previousPost.slug}`}
            className={`group flex-1 max-w-md ${!nextPost ? "sm:mx-auto" : ""}`}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-card/80 via-card/60 to-transparent p-5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-0.5 transition-all duration-400">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/[0.04] to-transparent" />
              <div className="relative flex items-start gap-4">
                <CardArrow dir="prev" />
                <div className="flex-1 min-w-0">
                  <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/50 mb-2 block">
                    {dict.blog.previous}
                  </span>
                  <h4 className="font-bold text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                    {previousPost.title}
                  </h4>
                  <p className="text-xs text-foreground/35 line-clamp-1 mt-1.5">
                    {previousPost.description}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        )}
        {nextPost && (
          <Link
            href={`/${locale}/blog/${nextPost.slug}`}
            className={`group flex-1 max-w-md ${!previousPost ? "sm:mx-auto" : "ms-auto"}`}
          >
            <div className="relative overflow-hidden rounded-2xl border border-border/30 bg-gradient-to-br from-card/80 via-card/60 to-transparent p-5 hover:border-primary/25 hover:shadow-lg hover:shadow-primary/[0.04] hover:-translate-y-0.5 transition-all duration-400">
              <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br from-primary/[0.04] to-transparent" />
              <div className="relative flex items-start gap-4">
                {isRtl ? (
                  <>
                    <CardArrow dir="next" />
                    <div className="flex-1 min-w-0 text-start">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/50 mb-2 block">
                        {dict.blog.next}
                      </span>
                      <h4 className="font-bold text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                        {nextPost.title}
                      </h4>
                      <p className="text-xs text-foreground/35 line-clamp-1 mt-1.5">
                        {nextPost.description}
                      </p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="flex-1 min-w-0 text-end">
                      <span className="text-[11px] font-semibold uppercase tracking-wider text-primary/50 mb-2 block">
                        {dict.blog.next}
                      </span>
                      <h4 className="font-bold text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 text-sm">
                        {nextPost.title}
                      </h4>
                      <p className="text-xs text-foreground/35 line-clamp-1 mt-1.5">
                        {nextPost.description}
                      </p>
                    </div>
                    <CardArrow dir="next" />
                  </>
                )}
              </div>
            </div>
          </Link>
        )}
      </div>
    </nav>
  );
}

async function RelatedPosts({
  currentSlug,
  category,
  locale,
  dict,
}: {
  currentSlug: string;
  category?: string;
  locale: string;
  dict: Dictionary;
}) {
  const posts = await getBlogPosts();
  const relatedPosts = posts
    .filter((post) => post.slug !== currentSlug && post.category === category)
    .slice(0, 3);

  if (relatedPosts.length === 0) return null;

  return (
    <section className="mt-16 pt-8 border-t border-border">
      <div className="flex items-center gap-3 mb-8">
        <div className="h-[2px] flex-1 bg-gradient-to-r from-primary/20 to-transparent" />
        <h3 className="text-lg font-bold text-foreground whitespace-nowrap">
          {dict.blog.relatedPosts}
        </h3>
        <div className="h-[2px] flex-1 bg-gradient-to-l from-primary/20 to-transparent" />
      </div>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {relatedPosts.map((post) => (
          <Link
            key={post.slug}
            href={`/${locale}/blog/${post.slug}`}
            className="group"
          >
            <article className="relative overflow-hidden rounded-2xl border border-border/25 bg-gradient-to-br from-card/70 via-card/50 to-transparent p-5 hover:border-primary/20 hover:shadow-lg hover:shadow-primary/[0.03] hover:-translate-y-0.5 transition-all duration-400">
              <div className="absolute top-0 right-0 w-20 h-20 bg-primary/5 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 group-hover:bg-primary/10 transition-colors duration-500" />
              <div className="relative">
                <span className="text-[10px] font-semibold uppercase tracking-wider text-primary/40 mb-2 block">
                  {post.category}
                </span>
                <h4 className="font-bold text-foreground/80 group-hover:text-primary transition-colors line-clamp-2 text-sm leading-snug mb-2">
                  {post.title}
                </h4>
                <p className="text-xs text-foreground/40 line-clamp-2 mb-4">
                  {post.description}
                </p>
                <div className="flex items-center gap-3 text-[10px] text-foreground/30 border-t border-border/20 pt-3">
                  <span>
                    {new Date(post.date).toLocaleDateString(
                      locale === "ar"
                        ? "ar-SA"
                        : locale === "fr"
                          ? "fr-FR"
                          : "en-US",
                      { year: "numeric", month: "short", day: "numeric" },
                    )}
                  </span>
                  <span className="text-foreground/15">·</span>
                  <span>{post.readingTime}</span>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </section>
  );
}

export async function generateStaticParams() {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  try {
    const files = await fs.readdir(blogDirectory);
    return files
      .filter((file) => file.endsWith(".mdx"))
      .map((file) => ({ slug: file.replace(/\.mdx$/, "") }));
  } catch {
    return [];
  }
}
