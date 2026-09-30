import { Marked } from "marked";
import { slugify } from "@/lib/utils";

/**
 * Server-only Markdown → HTML for long-form guides. Headings get stable ids
 * (for the table of contents and deep links); external links open safely.
 */
const md = new Marked({
  gfm: true,
  renderer: {
    heading({ tokens, depth }) {
      const text = this.parser.parseInline(tokens);
      const id = slugify(text.replace(/<[^>]+>/g, ""));
      return `<h${depth} id="${id}">${text}</h${depth}>\n`;
    },
    link({ href, title, tokens }) {
      const text = this.parser.parseInline(tokens);
      const external = /^https?:\/\//.test(href) && !href.includes("geniussolarservices.com");
      const t = title ? ` title="${title}"` : "";
      return external
        ? `<a href="${href}"${t} target="_blank" rel="noopener">${text}</a>`
        : `<a href="${href}"${t}>${text}</a>`;
    },
    table(token) {
      const head = token.header
        .map((c) => {
          const text = this.parser.parseInline(c.tokens);
          return `<th scope="col">${text.trim() ? text : '<span class="sr-only">Item</span>'}</th>`;
        })
        .join("");
      const body = token.rows
        .map((r) => `<tr>${r.map((c) => `<td>${this.parser.parseInline(c.tokens)}</td>`).join("")}</tr>`)
        .join("");
      return `<div class="table-wrap"><table><thead><tr>${head}</tr></thead><tbody>${body}</tbody></table></div>`;
    },
  },
});

export function renderMarkdown(source: string) {
  return md.parse(source, { async: false }) as string;
}

/** h2 headings for an on-page table of contents. */
export function extractToc(source: string) {
  return Array.from(source.matchAll(/^##\s+(.+)$/gm)).map((m) => {
    const text = m[1].replace(/[*_`]/g, "").trim();
    return { text, id: slugify(text) };
  });
}

export function wordCount(source: string) {
  return source.split(/\s+/).filter(Boolean).length;
}
