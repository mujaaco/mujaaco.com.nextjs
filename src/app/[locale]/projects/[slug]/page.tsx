import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import { ArrowLeft, Clock, Code2, ExternalLink, Tag } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { type Locale, locales } from "@/i18n/config";
import { getDictionary } from "@/i18n/get-dictionary";
import { compileMdx } from "@/lib/mdx-compiler";
import { BreadcrumbStructuredData } from "../../../components/BreadcrumbJsonLd";
import ClientMDXRenderer from "../../../components/ClientMDXRenderer";
import { SoftwareSourceCodeStructuredData } from "../../../components/StructuredData";

export const revalidate = 60;

interface Project {
  slug: string;
  title: string;
  description: string;
  date: string;
  category?: string;
  tags?: string[];
  githubUrl?: string;
  liveUrl?: string;
  featured?: boolean;
  language?: string;
}

async function findProjectFile(slug: string): Promise<string | null> {
  const dir = join(process.cwd(), "src", "content", "projects");
  try {
    const files = await fs.readdir(dir, { recursive: true });
    for (const file of files) {
      if (typeof file === "string" && file.endsWith(".mdx")) {
        if (
          file
            .split("/")
            .pop()
            ?.replace(/\.mdx$/, "") === slug
        )
          return join(dir, file);
      }
    }
    return null;
  } catch {
    return null;
  }
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const fullPath = await findProjectFile(slug);
  const base = {
    canonical: `https://mujaaco.com/${validLocale}/projects/${slug}`,
    languages: {
      en: `https://mujaaco.com/en/projects/${slug}`,
      ar: `https://mujaaco.com/ar/projects/${slug}`,
      fr: `https://mujaaco.com/fr/projects/${slug}`,
      "x-default": `https://mujaaco.com/en/projects/${slug}`,
    },
  };

  if (!fullPath) return { title: slug, alternates: base };

  try {
    const { data } = matter(await fs.readFile(fullPath, "utf8"));
    const title = data.title || slug;
    const desc = data.description || "Open-source project by Mujahid Siyam";
    return {
      title: `${title} | Mujaa (Mujahid Siyam)`,
      description: desc,
      alternates: base,
      openGraph: {
        title: `${title} | Mujaa (Mujahid Siyam)`,
        description: desc,
        type: "article",
        url: `https://mujaaco.com/${validLocale}/projects/${slug}`,
        images: [
          {
            url: "https://mujaaco.com/img/profile-engineer-1200x630.png",
            width: 1200,
            height: 630,
            alt: title,
          },
        ],
      },
      twitter: { card: "summary_large_image", title, description: desc },
    };
  } catch {
    return { title: slug, alternates: base };
  }
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!slug) notFound();
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const dict = getDictionary(validLocale);
  const dir = validLocale === "ar" ? "rtl" : "ltr";
  const fullPath = await findProjectFile(slug);
  if (!fullPath) notFound();

  try {
    const { data: fm, content } = matter(await fs.readFile(fullPath, "utf8"));
    const project: Project = {
      slug,
      title: fm.title || "",
      description: fm.description || "",
      date: fm.date || "",
      category: fm.category,
      tags: fm.tags || [],
      githubUrl: fm.githubUrl,
      liveUrl: fm.liveUrl,
      featured: fm.featured || false,
      language: fm.language,
    };
    const html = await compileMdx(content);

    return (
      <div className="min-h-screen" dir={dir}>
        <SoftwareSourceCodeStructuredData
          name={project.title}
          description={project.description}
          url={`https://mujaaco.com/${validLocale}/projects/${slug}`}
          codeRepository={project.githubUrl}
          dateCreated={project.date}
          programmingLanguage={project.language}
        />
        <BreadcrumbStructuredData
          items={[
            {
              name:
                validLocale === "ar"
                  ? "الرئيسية"
                  : validLocale === "fr"
                    ? "Accueil"
                    : "Home",
              url: `https://mujaaco.com/${validLocale}`,
            },
            {
              name:
                validLocale === "ar"
                  ? "المشاريع"
                  : validLocale === "fr"
                    ? "Projets"
                    : "Projects",
              url: `https://mujaaco.com/${validLocale}/projects`,
            },
            {
              name: project.title,
              url: `https://mujaaco.com/${validLocale}/projects/${slug}`,
            },
          ]}
        />

        {/* Hero Header */}
        <section className="relative pt-32 pb-16 overflow-hidden">
          <div
            className="absolute inset-0 pointer-events-none"
            aria-hidden="true"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[350px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
            <div className="absolute top-[20%] right-[10%] w-[350px] h-[250px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
          </div>

          <div className="relative max-w-3xl mx-auto px-4 sm:px-6">
            {/* Back link */}
            <div className="hero-enter mb-10">
              <Link
                href={`/${validLocale}/projects`}
                className="inline-flex items-center gap-2 text-xs text-foreground/40 hover:text-foreground/60 transition-colors group"
              >
                <ArrowLeft className="w-3.5 h-3.5 group-hover:-translate-x-0.5 transition-transform" />
                {dict.projects.backToProjects}
              </Link>
            </div>

            {/* Category badge + date */}
            <div className="hero-enter flex items-center gap-3 mb-4">
              {project.category && (
                <span className="px-3 py-1 rounded-full bg-primary/5 border border-primary/10 text-[10px] font-semibold uppercase tracking-[0.15em] text-primary/60">
                  {project.category}
                </span>
              )}
              {project.date && (
                <span className="flex items-center gap-1.5 text-[10px] text-foreground/35">
                  <Clock className="w-3 h-3" />
                  {new Date(project.date).toLocaleDateString(
                    validLocale === "ar"
                      ? "ar-SA"
                      : validLocale === "fr"
                        ? "fr-FR"
                        : "en-US",
                    { month: "long", day: "numeric", year: "numeric" },
                  )}
                </span>
              )}
            </div>

            {/* Title with gradient */}
            <h1 className="hero-enter text-4xl sm:text-5xl md:text-6xl font-black tracking-tighter leading-[1.05] mb-6">
              <span className="wave-gradient-text">{project.title}</span>
            </h1>

            {/* Description */}
            <p className="hero-enter text-sm sm:text-base text-foreground/45 font-light leading-relaxed max-w-2xl mb-10">
              {project.description}
            </p>

            {/* Action buttons */}
            <div className="hero-enter flex flex-wrap gap-3">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 bg-foreground text-background rounded-xl text-sm font-semibold hover:opacity-90 hover:scale-[1.02] transition-all duration-300"
                >
                  <Code2 className="w-4 h-4" />
                  {dict.projects.viewOnGithub}
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2.5 px-5 py-3 border border-border rounded-xl text-sm font-semibold text-foreground hover:bg-muted hover:scale-[1.02] transition-all duration-300"
                >
                  <ExternalLink className="w-4 h-4" />
                  {dict.projects.liveSite}
                </a>
              )}
            </div>

            {/* Decorative line */}
            <div className="hero-enter mt-12 w-full h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
          </div>
        </section>

        {/* Content */}
        <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-24">
          <div className="prose-content">
            <ClientMDXRenderer html={html} />
          </div>

          {/* Tags */}
          {project.tags && project.tags.length > 0 && (
            <div className="mt-16 pt-8 border-t border-border/20">
              <div className="flex items-center gap-2 mb-5">
                <Tag className="w-3.5 h-3.5 text-foreground/30" />
                <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-foreground/30">
                  {dict.projects.technologiesUsed}
                </span>
              </div>
              <div className="flex flex-wrap gap-2">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs bg-muted/40 text-foreground/40 rounded-lg border border-border/20 hover:text-primary hover:border-primary/20 hover:bg-primary/5 transition-all duration-300"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </main>
      </div>
    );
  } catch {
    notFound();
  }
}

export async function generateStaticParams() {
  const dir = join(process.cwd(), "src", "content", "projects");
  try {
    const files = await fs.readdir(dir, { recursive: true });
    return files
      .filter((f) => typeof f === "string" && f.endsWith(".mdx"))
      .map((f) => ({
        slug: f
          .split("/")
          .pop()
          ?.replace(/\.mdx$/, ""),
      }));
  } catch {
    return [];
  }
}
