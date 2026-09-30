import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type TextTag = "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";

/**
 * Splits a heading into masked words. Wrap words in *asterisks* to set them
 * in the italic serif accent, e.g. "Let the *sun* pay your bills".
 */
export function SplitText({
  text,
  as: Tag = "h2",
  className,
  mode = "view",
  accentClassName = "serif-accent",
  id,
}: {
  text: string;
  as?: TextTag;
  className?: string;
  mode?: "view" | "load" | "none";
  accentClassName?: string;
  id?: string;
}) {
  const tokens = text.split(/(\*[^*]+\*)/g).filter(Boolean);
  let i = 0;
  const words: ReactNode[] = [];
  tokens.forEach((tok, ti) => {
    const accent = tok.startsWith("*") && tok.endsWith("*");
    const clean = accent ? tok.slice(1, -1) : tok;
    clean.split(/(\s+)/).forEach((w, wi) => {
      if (!w) return;
      if (/^\s+$/.test(w)) {
        words.push(" ");
        return;
      }
      words.push(
        <span key={`${ti}-${wi}`} className="w">
          <span style={{ ["--i" as string]: i++ }} className={accent ? accentClassName : undefined}>
            {w}
          </span>
        </span>,
      );
    });
  });
  return (
    <Tag id={id} className={cn("split", mode === "view" && "split-view", mode === "load" && "split-load", className)}>
      {words}
    </Tag>
  );
}

export function Eyebrow({ children, index, className, tone = "ink" }: { children: ReactNode; index?: string; className?: string; tone?: "ink" | "light" }) {
  return (
    <p className={cn("label flex items-center gap-3", tone === "ink" ? "text-graphite" : "text-white/70", className)}>
      {index ? <span className={tone === "ink" ? "text-sun-ink" : "text-sun"}>{index}</span> : null}
      {index ? <span aria-hidden="true" className={cn("h-px w-8", tone === "ink" ? "bg-line-strong" : "bg-white/30")} /> : null}
      <span>{children}</span>
    </p>
  );
}

export function SectionHeader({
  eyebrow,
  index,
  title,
  lead,
  align = "left",
  className,
  titleClassName,
  as = "h2",
  children,
}: {
  eyebrow?: string;
  index?: string;
  title: string;
  lead?: ReactNode;
  align?: "left" | "center" | "split";
  className?: string;
  titleClassName?: string;
  as?: TextTag;
  children?: ReactNode;
}) {
  if (align === "split") {
    return (
      <div className={cn("grid gap-8 lg:grid-cols-12 lg:gap-12", className)}>
        <div className="lg:col-span-7">
          {eyebrow ? <Eyebrow index={index}>{eyebrow}</Eyebrow> : null}
          <SplitText as={as} text={title} className={cn("mt-6 text-h2 font-semibold", titleClassName)} />
        </div>
        <div className="flex flex-col justify-end gap-6 lg:col-span-5 lg:pb-2">
          {lead ? <div className="reveal text-lead text-graphite">{lead}</div> : null}
          {children}
        </div>
      </div>
    );
  }
  return (
    <div className={cn(align === "center" && "mx-auto max-w-4xl text-center", className)}>
      {eyebrow ? (
        <Eyebrow index={index} className={align === "center" ? "justify-center" : undefined}>
          {eyebrow}
        </Eyebrow>
      ) : null}
      <SplitText as={as} text={title} className={cn("mt-6 text-h2 font-semibold", titleClassName)} />
      {lead ? (
        <div className={cn("reveal mt-6 max-w-2xl text-lead text-graphite", align === "center" && "mx-auto")}>{lead}</div>
      ) : null}
      {children}
    </div>
  );
}

/** A spec-sheet style key/value — the engineered, data-first voice of the brand. */
export function Spec({ k, v, className }: { k: string; v: ReactNode; className?: string }) {
  return (
    <div className={cn("flex items-baseline justify-between gap-4 border-b border-line py-3", className)}>
      <dt className="label text-graphite">{k}</dt>
      <dd className="text-right font-medium tabular">{v}</dd>
    </div>
  );
}
