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

  const atomEntries = posts
    .map(
      (post) => `  <entry>
    <title><![CDATA[${post.title}]]></title>
    <link href="${baseUrl}/blog/${post.slug}" rel="alternate" type="text/html"/>
    <id>${baseUrl}/blog/${post.slug}</id>
    <published>${new Date(post.date).toISOString()}</published>
    <updated>${new Date(post.date).toISOString()}</updated>
    <summary><![CDATA[${post.description}]]></summary>
    <author>
      <name>Mujahid Siyam</name>
      <uri>${baseUrl}</uri>
    </author>
    ${post.tags.map((tag) => `<category term="${tag}"/>`).join("\n    ")}
  </entry>`,
    )
    .join("\n");

  const atom = `<?xml version="1.0" encoding="UTF-8"?>
<feed xmlns="http://www.w3.org/2005/Atom" xmlns:geo="http://www.w3.org/2003/01/geo/wgs84_pos#">
  <title>mujaaco.com — Mujahid Siyam (Mujaa) | راب عربي | Software & AI Engineer</title>
  <subtitle>AI engineering, Rust, DevSecOps, Arabic Rap, Sudanese Rap, and technology insights by Mujahid Siyam (Mujaa / mujaaco). مدونة تقنية.</subtitle>
  <link href="${baseUrl}/atom.xml" rel="self" type="application/atom+xml"/>
  <link href="${baseUrl}/blog" rel="alternate" type="text/html"/>
  <id>${baseUrl}/blog</id>
  <updated>${new Date().toISOString()}</updated>
  <author>
    <name>Mujahid Siyam (Mujaa / mujaaco)</name>
    <uri>${baseUrl}</uri>
  </author>
  <geo:lat>46.603354</geo:lat>
  <geo:long>1.888334</geo:long>
${atomEntries}
</feed>`;

  return new Response(atom, {
    headers: {
      "Content-Type": "application/atom+xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}
