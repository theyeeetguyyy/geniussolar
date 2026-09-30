import type { MetadataRoute } from "next";
import { site } from "@/content/site";

/**
 * Open to search engines and to AI assistants / answer engines, so the
 * guides can be cited. Only internal build paths are excluded.
 */
export default function robots(): MetadataRoute.Robots {
  const aiAgents = [
    "GPTBot",
    "OAI-SearchBot",
    "ChatGPT-User",
    "ClaudeBot",
    "Claude-SearchBot",
    "Claude-User",
    "PerplexityBot",
    "Perplexity-User",
    "Google-Extended",
    "Applebot-Extended",
    "Bingbot",
    "CCBot",
    "Meta-ExternalAgent",
    "DuckAssistBot",
  ];
  return {
    rules: [
      { userAgent: "*", allow: "/", disallow: ["/_next/data/", "/api/"] },
      ...aiAgents.map((ua) => ({ userAgent: ua, allow: "/" })),
    ],
    sitemap: `${site.url}/sitemap.xml`,
    host: site.url,
  };
}
