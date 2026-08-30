export async function register() {
  if (
    process.env.NEXT_RUNTIME === "nodejs" &&
    process.env.NODE_ENV === "production"
  ) {
    const urls = [
      "https://mujaaco.com/sitemap.xml",
      "https://mujaaco.com/feed.xml",
      "https://mujaaco.com/atom.xml",
      "https://mujaaco.com/llms.txt",
    ];

    const pings = [
      { name: "Bing", url: "https://www.bing.com/indexnow" },
      { name: "Yandex", url: "https://yandex.com/indexnow" },
      { name: "Seznam", url: "https://indexnow.seznam.cz/indexnow" },
      { name: "IndexNow", url: "https://api.indexnow.org/indexnow" },
    ];

    for (const { name, url } of pings) {
      try {
        await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            host: "mujaaco.com",
            key: "1dac02664f4d441084286ceca1a2640e",
            keyLocation:
              "https://mujaaco.com/1dac02664f4d441084286ceca1a2640e.txt",
            urlList: urls,
          }),
          signal: AbortSignal.timeout(5000),
        });
        console.log(`[auto-index] ✅ ${name}`);
      } catch {
        console.log(
          `[auto-index] ⚠️ ${name} unreachable (site may not be live yet)`,
        );
      }
    }
  }
}
