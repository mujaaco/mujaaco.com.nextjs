import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";
import type { MetadataRoute } from "next";

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

          return {
            url: `${baseUrl}/en/blog/${slug}`,
            lastModified: postDate > stats.mtime ? postDate : stats.mtime,
            images: image ? [image] : undefined,
          };
        }),
    );

    return posts.filter((p): p is NonNullable<typeof p> => p !== null);
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

          return {
            url: `${baseUrl}/en/projects/${slug}`,
            lastModified: projDate > stats.mtime ? projDate : stats.mtime,
            images: image ? [image] : undefined,
          };
        }),
    );

    return projects.filter((p): p is NonNullable<typeof p> => p !== null);
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

  const blogPosts = await getBlogPosts();
  const projects = await getProjects();

  return [...staticPages, ...blogPosts, ...projects];
}
