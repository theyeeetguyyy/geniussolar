import { markdownFor, markdownPaths } from "@/content/markdown";
import { site } from "@/content/site";

export const dynamic = "force-static";

/** The whole site as one Markdown document for LLM ingestion. */
export function GET() {
  const parts = markdownPaths()
    .map((p) => markdownFor(p))
    .filter(Boolean)
    .map((md) => md!.replace(/\n---\n\n\*\*Genius Solar Services\*\*[\s\S]*$/, "").trim());
  const body = `# ${site.name} — complete site text\n\nGenerated from ${site.url}. Each section below is one page.\n\n${parts.join("\n\n---\n\n")}\n`;
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600, s-maxage=86400" } });
}
