import { promises as fs } from "node:fs";
import { join } from "node:path";
import { ArrowRight, Code2, GitFork, Pin, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { localeLanguages } from "@/app/lib/seo";
import { type Locale, locales } from "@/i18n/config";
import { type Dictionary, getDictionary } from "@/i18n/get-dictionary";

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
    title: t.projects.title,
    description: t.projects.description,
    alternates: {
      canonical: `https://mujaaco.com/${validLocale}/projects`,
      languages: localeLanguages("projects"),
    },
    openGraph: {
      title: t.projects.title,
      description: t.projects.description,
      url: `https://mujaaco.com/${validLocale}/projects`,
      type: "website",
    },
  };
}

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
  languageColor?: string;
  forks?: number;
  image?: string;
}

export const revalidate = 60;

async function getProjects(): Promise<Project[]> {
  const projectsDirectory = join(process.cwd(), "src", "content", "projects");
  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    const projects = await Promise.all(
      files
        .filter((f) => typeof f === "string" && f.endsWith(".mdx"))
        .map(async (file) => {
          try {
            const parts = file.split("/");
            const slug = parts[parts.length - 1].replace(/\.mdx$/, "");
            const fileContent = await fs.readFile(
              join(projectsDirectory, file),
              "utf8",
            );
            const fmMatch = fileContent.match(/^---\n([\s\S]*?)\n---/);
            if (!fmMatch) return null;

            const project: Project = {
              slug,
              title: "",
              description: "",
              date: "",
            };
            fmMatch[1].split("\n").forEach((line) => {
              const [key, ...vp] = line.split(":");
              const value = vp
                .join(":")
                .trim()
                .replace(/^['"](.*)['"]$/, "$1");
              if (!key || !vp.length) return;
              switch (key.trim()) {
                case "title":
                  project.title = value;
                  break;
                case "description":
                  project.description = value;
                  break;
                case "date":
                  project.date = value;
                  break;
                case "category":
                  project.category = value;
                  break;
                case "tags":
                  try {
                    project.tags = value.startsWith("[")
                      ? JSON.parse(value)
                      : value.split(",").map((t) => t.trim());
                  } catch {
                    project.tags = [value];
                  }
                  break;
                case "githubUrl":
                  project.githubUrl = value;
                  break;
                case "liveUrl":
                  project.liveUrl = value;
                  break;
                case "featured":
                  project.featured = value === "true";
                  break;
                case "language":
                  project.language = value;
                  break;
                case "languageColor":
                  project.languageColor = value;
                  break;
                case "forks":
                  project.forks = parseInt(value, 10) || 0;
                  break;
                case "image":
                  project.image = value;
                  break;
              }
            });
            return project;
          } catch {
            return null;
          }
        }),
    );
    return projects
      .filter((p): p is Project => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const validLocale = locales.includes(locale as Locale)
    ? (locale as Locale)
    : "en";
  const t = getDictionary(validLocale);
  const projects = await getProjects();

  const featuredProjects = projects.filter((p) => p.featured).slice(0, 3);
  const regularProjects = projects.filter((p) => !p.featured);

  return (
    <div className="min-h-screen" dir={validLocale === "ar" ? "rtl" : "ltr"}>
      {/* Hero Header */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none"
          aria-hidden="true"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] rounded-full bg-[var(--color-wave-1)] opacity-[0.04] blur-[140px] animate-pulse-slow" />
          <div className="absolute top-[30%] right-[5%] w-[350px] h-[300px] rounded-full bg-[var(--color-wave-3)] opacity-[0.03] blur-[100px] animate-pulse-slow animation-delay-2000" />
        </div>

        <div className="relative max-w-4xl mx-auto px-4 text-center">
          <div className="hero-enter inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-sky-500/5 border border-sky-500/10 text-[10px] font-semibold uppercase tracking-[0.2em] text-sky-500/60 mb-8">
            <Sparkles className="w-3 h-3" />
            {t.projects.heroSubtitle}
          </div>
          <h1 className="hero-enter text-5xl sm:text-6xl md:text-7xl font-black tracking-tighter leading-none mb-6">
            <span className="wave-gradient-text">{t.projects.heroTitle}</span>
          </h1>
          <p className="hero-enter text-base sm:text-lg text-foreground/45 font-light leading-relaxed max-w-lg mx-auto">
            {t.projects.heroDescription}
          </p>
          <div className="hero-enter mt-10 mx-auto w-16 h-px bg-gradient-to-r from-transparent via-foreground/15 to-transparent" />
        </div>
      </section>

      {/* Content */}
      <main className="max-w-6xl mx-auto px-4 sm:px-6 pb-24">
        {/* Pinned Projects */}
        {featuredProjects.length > 0 && (
          <section className="mb-20">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-2 rounded-xl bg-amber-500/5 border border-amber-500/10">
                <Pin className="w-3.5 h-3.5 text-amber-500/50" />
              </div>
              <div>
                <span className="text-sm font-bold text-foreground">
                  {t.projects.pinned}
                </span>
              </div>
              <div className="flex-1 h-px bg-gradient-to-r from-amber-500/10 to-transparent" />
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {featuredProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={validLocale}
                  t={t}
                  featured
                />
              ))}
            </div>
          </section>
        )}

        {/* All Projects */}
        {regularProjects.length > 0 && (
          <section>
            {featuredProjects.length > 0 && (
              <div className="flex items-center gap-3 mb-10">
                <div className="p-2 rounded-xl bg-sky-500/5 border border-sky-500/10">
                  <Code2 className="w-3.5 h-3.5 text-sky-500/50" />
                </div>
                <span className="text-sm font-bold text-foreground">
                  {t.projects.allProjects}
                </span>
                <div className="flex-1 h-px bg-gradient-to-r from-sky-500/10 to-transparent" />
              </div>
            )}
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {regularProjects.map((project) => (
                <ProjectCard
                  key={project.slug}
                  project={project}
                  locale={validLocale}
                  t={t}
                />
              ))}
            </div>
          </section>
        )}

        {projects.length === 0 && (
          <div className="text-center py-24">
            <p className="text-sm text-foreground/30 font-light">
              {t.projects.noProjects}
            </p>
          </div>
        )}
      </main>
    </div>
  );
}

function ProjectCard({
  project,
  locale,
  t,
  featured,
}: {
  project: Project;
  locale: string;
  t: Dictionary;
  featured?: boolean;
}) {
  return (
    <Link href={`/${locale}/projects/${project.slug}`} className="group block">
      <article
        className={`relative h-full overflow-hidden border transition-all duration-700 group flex flex-col hover:-translate-y-1 ${
          featured
            ? "rounded-2xl border-border/20 bg-card/10 backdrop-blur-sm hover:border-primary/25 hover:shadow-2xl hover:shadow-primary/[0.04]"
            : "rounded-xl border-border/25 bg-card/5 backdrop-blur-sm hover:border-primary/15 hover:shadow-lg hover:shadow-primary/[0.03]"
        }`}
      >
        {/* Shine sweep */}
        <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out bg-gradient-to-r from-transparent via-white/[0.02] to-transparent pointer-events-none z-20" />
        {/* Image or gradient placeholder */}
        <div className="relative aspect-[16/10] overflow-hidden">
          {project.image ? (
            <Image
              src={project.image}
              alt={project.title}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
              className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
            />
          ) : (
            <div className="relative w-full h-full bg-gradient-to-br from-muted/40 via-muted/20 to-muted/10 flex items-center justify-center overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-tr from-primary/[0.05] via-transparent to-secondary/[0.05] opacity-50" />
              <div className="relative">
                <span className="text-4xl font-black text-foreground/10 tracking-tighter select-none">
                  {project.title.split("").slice(0, 3).join("")}
                </span>
                <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
              </div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        </div>

        <div className={`flex flex-col flex-1 ${featured ? "p-6" : "p-5"}`}>
          {/* Meta row */}
          <div className="flex items-center gap-2 mb-3">
            {project.language && (
              <span className="flex items-center gap-1.5 text-[10px] text-foreground/40">
                <span
                  className="w-1.5 h-1.5 rounded-full"
                  style={{
                    background: project.languageColor || "var(--color-primary)",
                  }}
                />
                {project.language}
              </span>
            )}
            {project.category && (
              <>
                <span className="text-foreground/10">·</span>
                <span className="text-[10px] font-semibold uppercase tracking-[0.1em] text-primary/50">
                  {project.category}
                </span>
              </>
            )}
            {project.forks !== undefined && project.forks > 0 && (
              <span className="ms-auto flex items-center gap-1 text-[10px] text-foreground/35">
                <GitFork className="w-3 h-3" /> {project.forks}
              </span>
            )}
          </div>

          <h2
            className={`font-bold text-foreground group-hover:text-primary/80 transition-colors duration-300 line-clamp-1 mb-2 leading-snug ${featured ? "text-base" : "text-sm"}`}
          >
            {project.title}
          </h2>

          <p className="text-xs text-foreground/40 leading-relaxed line-clamp-2 flex-1">
            {project.description}
          </p>

          <div className="mt-4 pt-4 border-t border-border/20">
            {project.tags && project.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 mb-3">
                {project.tags.slice(0, 4).map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 text-[10px] bg-muted/30 text-foreground/45 border border-border/20 rounded-lg font-medium"
                  >
                    {tag}
                  </span>
                ))}
                {project.tags.length > 4 && (
                  <span className="px-2.5 py-1 text-[10px] text-foreground/30 border border-border/20 rounded-lg">
                    +{project.tags.length - 4}
                  </span>
                )}
              </div>
            )}
            <div className="flex items-center justify-between">
              <span className="text-[10px] text-foreground/30 tabular-nums font-medium">
                {project.date
                  ? new Date(project.date).toLocaleDateString(
                      locale === "ar"
                        ? "ar-SA"
                        : locale === "fr"
                          ? "fr-FR"
                          : "en-US",
                      { month: "short", year: "numeric" },
                    )
                  : ""}
              </span>
              <span className="flex items-center gap-1.5 text-[10px] text-foreground/25 font-semibold group-hover:text-primary/60 transition-all duration-300">
                {t.projects.view}
                <ArrowRight className="w-3 h-3 group-hover:translate-x-0.5 transition-transform duration-300" />
              </span>
            </div>
          </div>
        </div>
      </article>
    </Link>
  );
}
