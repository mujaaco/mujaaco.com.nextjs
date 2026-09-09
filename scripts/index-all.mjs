#!/usr/bin/env node

import { promises as fs } from "node:fs";
import { join } from "node:path";
import matter from "gray-matter";

/**
 * Submit all site URLs to search engines via IndexNow.
 * Run after deployment: node scripts/index-all.mjs
 *
 * Notes:
 * - Google's sitemap "ping" endpoint (google.com/ping) was deprecated in 2023,
 *   and Bing's legacy SubmitSitemap API is retired. Both engines now discover
 *   updates through the sitemap referenced in robots.txt and their Webmaster
 *   consoles, so neither is pinged here.
 * - IndexNow is the supported programmatic protocol for Bing, Yandex, Seznam,
 *   and Naver. The generic api.indexnow.org endpoint forwards to all of them.
 * - Submissions are accepted (200/202) only after the search engine verifies
 *   the key file at https://mujaaco.com/<KEY>.txt. A 403 means the key has not
 *   been verified yet — make sure the site is live before running this script.
 */

const BASE_URL = "https://mujaaco.com";
const INDEXNOW_KEY = "1dac02664f4d441084286ceca1a2640e";
const locales = ["en", "ar", "fr"];

const urls = [];

// Static pages (all locales)
const staticRoutes = [
  "",
  "about",
  "projects",
  "blog",
  "contact",
  "music",
  "now",
];
for (const locale of locales) {
  for (const route of staticRoutes) {
    urls.push(
      route ? `${BASE_URL}/${locale}/${route}` : `${BASE_URL}/${locale}`,
    );
  }
}

// Blog posts (all locales) — read dynamically so the list never goes stale
const blogDir = join(process.cwd(), "src", "content", "blog");
for (const file of await fs.readdir(blogDir)) {
  if (!file.endsWith(".mdx")) continue;
  const slug = file.replace(/\.mdx$/, "");
  const { data } = matter(await fs.readFile(join(blogDir, file), "utf8"));
  if (data.draft === true) continue;
  for (const locale of locales) {
    urls.push(`${BASE_URL}/${locale}/blog/${slug}`);
  }
}

// Projects (all locales) — read dynamically so the list never goes stale
const projectsDir = join(process.cwd(), "src", "content", "projects");
for (const file of await fs.readdir(projectsDir, { recursive: true })) {
  if (typeof file !== "string" || !file.endsWith(".mdx")) continue;
  const slug = file
    .split("/")
    .pop()
    .replace(/\.mdx$/, "");
  const { data } = matter(await fs.readFile(join(projectsDir, file), "utf8"));
  if (data.draft === true) continue;
  for (const locale of locales) {
    urls.push(`${BASE_URL}/${locale}/projects/${slug}`);
  }
}

// Feeds and sitemap
urls.push(`${BASE_URL}/sitemap.xml`);
urls.push(`${BASE_URL}/feed.xml`);
urls.push(`${BASE_URL}/atom.xml`);

const indexNowEndpoints = [
  "https://www.bing.com/indexnow",
  "https://yandex.com/indexnow",
  "https://indexnow.seznam.cz/indexnow",
  "https://api.indexnow.org/indexnow",
];

async function submitBatch(endpoint, batch) {
  const name = new URL(endpoint).hostname;
  try {
    const r = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        host: "mujaaco.com",
        key: INDEXNOW_KEY,
        keyLocation: `${BASE_URL}/${INDEXNOW_KEY}.txt`,
        urlList: batch,
      }),
      signal: AbortSignal.timeout(15000),
    });
    const ok = r.status === 200 || r.status === 202;
    console.log(
      `${ok ? "✅" : "⚠️ "} IndexNow ${name}: ${r.status} ${r.statusText} (${batch.length} URLs)`,
    );
  } catch (e) {
    console.log(
      `❌ IndexNow ${name}: ${e instanceof Error ? e.message : "failed"}`,
    );
  }
}

async function main() {
  console.log(`\n🔍 Submitting ${urls.length} URLs via IndexNow...\n`);

  // Submit in batches of 100 (IndexNow limit)
  for (let i = 0; i < urls.length; i += 100) {
    const batch = urls.slice(i, i + 100);
    await Promise.all(
      indexNowEndpoints.map((endpoint) => submitBatch(endpoint, batch)),
    );
  }

  console.log(`\n🎯 Done! ${urls.length} URLs submitted via IndexNow.\n`);
  console.log("   If any engine returned 403, its key is not verified yet.");
  console.log(
    `   Verify the key file is live at ${BASE_URL}/${INDEXNOW_KEY}.txt and resubmit.`,
  );
  console.log("\n   Manual steps:");
  console.log(
    "   1. Submit sitemap in Google Search Console: https://search.google.com/search-console",
  );
  console.log(
    "   2. Submit sitemap in Bing Webmaster: https://www.bing.com/webmasters",
  );
  console.log(
    "   3. Add site to Yandex Webmaster: https://webmaster.yandex.com",
  );
  console.log("");
}

main().catch(console.error);
