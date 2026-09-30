import { markdownFor, markdownPaths } from "@/content/markdown";
import { absoluteUrl } from "@/lib/seo";

export const dynamic = "force-static";
export const dynamicParams = false;

export function generateStaticParams() {
  return markdownPaths().map((p) => ({ path: p === "/" ? [] : p.slice(1).split("/") }));
}

/** Markdown mirror of a page. Reached via rewrites from `/<page>.md` (see next.config.ts). */
export async function GET(_req: Request, { params }: { params: Promise<{ path?: string[] }> }) {
  const { path } = await params;
  const pagePath = path?.length ? `/${path.join("/")}` : "/";
  const md = markdownFor(pagePath);
  if (!md) return new Response("Not found", { status: 404 });
  return new Response(md, {
    headers: {
      "Content-Type": "text/markdown; charset=utf-8",
      Link: `<${absoluteUrl(pagePath)}>; rel="canonical"`,
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
