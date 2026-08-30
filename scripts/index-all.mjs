#!/usr/bin/env node

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

const urls = [
  `${BASE_URL}/en`,
  `${BASE_URL}/en/about`,
  `${BASE_URL}/en/projects`,
  `${BASE_URL}/en/blog`,
  `${BASE_URL}/en/contact`,
  `${BASE_URL}/en/music`,
  `${BASE_URL}/ar`,
  `${BASE_URL}/ar/about`,
  `${BASE_URL}/ar/projects`,
  `${BASE_URL}/ar/blog`,
  `${BASE_URL}/ar/contact`,
  `${BASE_URL}/ar/music`,
  `${BASE_URL}/fr`,
  `${BASE_URL}/fr/about`,
  `${BASE_URL}/fr/projects`,
  `${BASE_URL}/fr/blog`,
  `${BASE_URL}/fr/contact`,
  `${BASE_URL}/fr/music`,
];

// Add blog posts
const blogPosts = [
  "python-data-science",
  "react-hooks-guide",
  "typescript-nextjs",
  "rust-systems-programming",
  "building-llm-apps",
  "devsecops-pipeline",
  "nixos-reproducible-builds",
  "postgres-optimization",
  "docker-kubernetes-deployment",
  "api-design-rest",
];

for (const slug of blogPosts) {
  urls.push(
    `${BASE_URL}/en/blog/${slug}`,
    `${BASE_URL}/ar/blog/${slug}`,
    `${BASE_URL}/fr/blog/${slug}`,
  );
}

// Add projects
const projects = ["funmacs", "mujaos"];
for (const slug of projects) {
  urls.push(
    `${BASE_URL}/en/projects/${slug}`,
    `${BASE_URL}/ar/projects/${slug}`,
    `${BASE_URL}/fr/projects/${slug}`,
  );
}

// Add feeds and sitemap
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
