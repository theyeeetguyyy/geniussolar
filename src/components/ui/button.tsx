import Link from "next/link";
import type { ComponentProps, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { Icon, type IconName } from "@/components/icons";

type Variant = "ink" | "sun" | "ghost" | "white";
type Size = "md" | "lg";

const base =
  "group/btn relative inline-flex select-none items-center justify-center gap-3 rounded-full font-medium tracking-[-0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-[var(--ease-sun)] active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-white hover:bg-ink-2 shadow-[0_14px_40px_-18px_rgb(17_19_21/0.6)]",
  sun: "bg-sun text-ink hover:bg-sun-bright shadow-sun",
  ghost: "bg-transparent text-ink ring-1 ring-inset ring-line-strong hover:bg-white hover:ring-ink/25",
  white: "bg-white text-ink hover:bg-stone-50 shadow-soft",
};

const sizes: Record<Size, string> = {
  md: "h-12 text-[0.95rem] pl-5 pr-1.5",
  lg: "h-14 text-base pl-6 pr-2",
};

const bubble: Record<Variant, string> = {
  ink: "bg-sun text-ink",
  sun: "bg-ink text-white",
  ghost: "bg-ink text-white",
  white: "bg-ink text-white",
};

interface Common {
  variant?: Variant;
  size?: Size;
  icon?: IconName | false;
  children: ReactNode;
  className?: string;
}

/** Label that rolls upward on hover: the classic premium micro-interaction, pure CSS. */
function RollingLabel({ children }: { children: ReactNode }) {
  return (
    <span className="relative block overflow-hidden">
      <span className="block transition-transform duration-500 ease-[var(--ease-sun)] group-hover/btn:-translate-y-full">
        {children}
      </span>
      <span
        aria-hidden="true"
        className="absolute inset-0 block translate-y-full transition-transform duration-500 ease-[var(--ease-sun)] group-hover/btn:translate-y-0"
      >
        {children}
      </span>
    </span>
  );
}

function Inner({ variant = "ink", size = "md", icon = "ArrowRight", children }: Omit<Common, "className">) {
  const I = icon ? Icon[icon] : null;
  return (
    <>
      <RollingLabel>{children}</RollingLabel>
      {I ? (
        <span
          className={cn(
            "grid shrink-0 place-items-center rounded-full transition-transform duration-500 ease-[var(--ease-sun)] group-hover/btn:rotate-[-45deg]",
            size === "lg" ? "size-10" : "size-9",
            bubble[variant],
            icon !== "ArrowRight" && "group-hover/btn:rotate-0 group-hover/btn:scale-110",
          )}
        >
          <I size={18} />
        </span>
      ) : null}
    </>
  );
}

export function ButtonLink({
  href,
  variant = "ink",
  size = "md",
  icon,
  className,
  children,
  external,
  ...rest
}: Common & { href: string; external?: boolean } & Omit<ComponentProps<"a">, "href" | "children">) {
  const cls = cn(base, variants[variant], sizes[size], !icon && icon !== undefined && "pr-5", className);
  const inner = (
    <Inner variant={variant} size={size} icon={icon}>
      {children}
    </Inner>
  );
  if (external || /^(https?:|tel:|mailto:)/.test(href)) {
    return (
      <a
        href={href}
        className={cls}
        {...(href.startsWith("http") ? { target: "_blank", rel: "noopener" } : {})}
        {...rest}
      >
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}

export function Button({
  variant = "ink",
  size = "md",
  icon,
  className,
  children,
  ...rest
}: Common & Omit<ComponentProps<"button">, "children">) {
  return (
    <button className={cn(base, variants[variant], sizes[size], icon === false && "pr-5", className)} {...rest}>
      <Inner variant={variant} size={size} icon={icon}>
        {children}
      </Inner>
    </button>
  );
}

/** Understated text link with an animated underline and arrow. */
export function ArrowLink({ href, children, className }: { href: string; children: ReactNode; className?: string }) {
  return (
    <Link
      href={href}
      className={cn(
        "group/al inline-flex items-center gap-2 font-medium text-ink underline decoration-transparent decoration-2 underline-offset-[6px] transition-colors hover:decoration-sun",
        className,
      )}
    >
      {children}
      <Icon.ArrowRight size={18} className="transition-transform duration-300 group-hover/al:translate-x-1" />
    </Link>
  );
}
