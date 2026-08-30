import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/_next/", "/theme-test/"],
      },
    ],
    sitemap: ["https://mujaaco.com/sitemap-index.xml"],
  };
}
