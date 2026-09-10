import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";
import { videos, videoThumbnails, videoWatchUrl } from "@/content/videos";

const baseUrl = "https://mujaaco.com";
const locales = ["en", "ar", "fr"];

function toAbsoluteImage(image: string | undefined): string | undefined {
  if (!image) return undefined;
  if (image.startsWith("http://") || image.startsWith("https://")) return image;
  if (image.startsWith("/")) return `${baseUrl}${image}`;
  return `${baseUrl}/${image}`;
}

function isValidImage(image: string | undefined): boolean {
  if (!image) return false;
  if (image === "/vercel.svg" || image.endsWith("/vercel.svg")) return false;
  return true;
}

async function getBlogPosts(): Promise<MetadataRoute.Sitemap> {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");

  try {
    const files = await fs.readdir(blogDirectory);
    const posts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const filePath = join(blogDirectory, file);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          const stats = await fs.stat(filePath);

          if (data.draft === true) return null;

          const postDate = data.date ? new Date(data.date) : stats.mtime;
          const image = isValidImage(data.image)
            ? toAbsoluteImage(data.image)
            : undefined;
          const lastModified = postDate > stats.mtime ? postDate : stats.mtime;

          return locales.map((locale) => ({
            url: `${baseUrl}/${locale}/blog/${slug}`,
            lastModified,
            images: image ? [image] : undefined,
          }));
        }),
    );

    return posts.filter((p): p is NonNullable<typeof p> => p !== null).flat();
  } catch {
    return [];
  }
}

async function getProjects(): Promise<MetadataRoute.Sitemap> {
  const projectsDirectory = join(process.cwd(), "src", "content", "projects");

  try {
    const files = await fs.readdir(projectsDirectory, { recursive: true });
    const projects = await Promise.all(
      files
        .filter(
          (file): file is string =>
            typeof file === "string" && file.endsWith(".mdx"),
        )
        .map(async (file) => {
          const parts = file.replace(/\.mdx$/, "").split("/");
          const slug = parts[parts.length - 1];
          const filePath = join(projectsDirectory, file);
          const fileContents = await fs.readFile(filePath, "utf8");
          const { data } = matter(fileContents);
          const stats = await fs.stat(filePath);

          if (data.draft === true) return null;

          const projDate = data.date ? new Date(data.date) : stats.mtime;
          const image = isValidImage(data.image)
            ? toAbsoluteImage(data.image)
            : undefined;
          const lastModified = projDate > stats.mtime ? projDate : stats.mtime;

          return locales.map((locale) => ({
            url: `${baseUrl}/${locale}/projects/${slug}`,
            lastModified,
            images: image ? [image] : undefined,
          }));
        }),
    );

    return projects
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .flat();
  } catch {
    return [];
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const now = new Date();

  const pageRoutes = [
    { slug: "" },
    { slug: "about" },
    { slug: "projects" },
    { slug: "blog" },
    { slug: "now" },
    { slug: "contact" },
    { slug: "music" },
    { slug: "videos" },
  ];

  const staticPages: MetadataRoute.Sitemap = [];
  for (const route of pageRoutes) {
    for (const locale of locales) {
      staticPages.push({
        url: route.slug
          ? `${baseUrl}/${locale}/${route.slug}`
          : `${baseUrl}/${locale}`,
        lastModified: now,
      });
    }
  }

  const videoPages: MetadataRoute.Sitemap = [];
  for (const video of videos) {
    for (const locale of locales) {
      videoPages.push({
        url: `${baseUrl}/${locale}/videos/${video.id}`,
        lastModified: video.uploadDate,
        videos: [
          {
            title: video.title,
            description: video.description,
            thumbnail_loc: videoThumbnails(video.id)[0],
            player_loc: videoWatchUrl(video.id),
            publication_date: video.uploadDate,
            family_friendly: "yes",
          },
        ],
      });
    }
  }

  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  return [...staticPages, ...videoPages, ...blogPosts, ...projects];
}
