import { cn } from "@/lib/utils";

/** Paragraph whose words ink in as it scrolls through the viewport (CSS-only, degrades to plain text). */
export function InkText({ text, className, as: Tag = "p" }: { text: string; className?: string; as?: "p" | "h2" }) {
  const words = text.split(" ");
  return (
    <Tag className={cn("ink-scroll", className)}>
      {words.map((w, i) => (
        <span key={i} className="iw" style={{ ["--i" as string]: i }}>
          {w}{" "}
        </span>
      ))}
    </Tag>
  );
}
