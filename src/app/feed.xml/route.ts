import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

export async function GET() {
  const blogDirectory = join(process.cwd(), "src", "content", "blog");
  const baseUrl = "https://mujaaco.com/en";

  let posts: Array<{
    slug: string;
    title: string;
    description: string;
    date: string;
    category: string;
    tags: string[];
  }> = [];

  try {
    const files = await fs.readdir(blogDirectory);
    const allPosts = await Promise.all(
      files
        .filter((file) => file.endsWith(".mdx"))
        .map(async (file) => {
          const slug = file.replace(/\.mdx$/, "");
          const fullPath = join(blogDirectory, file);
          const fileContents = await fs.readFile(fullPath, "utf8");
          const { data } = matter(fileContents);
          if (data.draft) return null;
          return {
            slug,
            title: data.title || slug,
            description: data.description || "",
            date: data.date || new Date().toISOString(),
            category: data.category || "Uncategorized",
            tags: data.tags || [],
          };
        }),
    );
    posts = allPosts
      .filter((p): p is NonNullable<typeof p> => p !== null)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    posts = [];
  }

  const rssItems = posts
    .map(
      (post) => `    <item>
      <title><![CDATA[${post.title}]]></title>
      <link>${baseUrl}/blog/${post.slug}</link>
      <guid isPermaLink="true">${baseUrl}/blog/${post.slug}</guid>
      <description><![CDATA[${post.description}]]></description>
      <pubDate>${new Date(post.date).toUTCString()}</pubDate>
      <category>${post.category}</category>
      ${post.tags.map((tag) => `<category>${tag}</category>`).join("\n      ")}
    </item>`,
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#">
  <channel>
    <title>mujaaco.com — Mujahid Siyam (Mujaa) | راب عربي | Software & AI Engineer</title>
    <link>${baseUrl}/blog</link>
    <description>AI engineering, Rust development, DevSecOps, Arabic Rap, Sudanese Rap, software engineering, and creative technology insights by Mujahid Siyam (Mujaa / mujaaco). مدونة تقنية وهندسية.</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml"/>
    <dc:creator>Mujahid Siyam (Mujaa / mujaaco) | مجاهد سيام</dc:creator>
    <geo:lat>46.603354</geo:lat>
    <geo:long>1.888334</geo:long>
${rssItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
