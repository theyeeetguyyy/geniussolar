import type { SVGProps } from "react";

/**
 * Custom outline icon set. 24px grid, 1.5 stroke, round joins — drawn for
 * this site so nothing looks like a stock icon pack.
 */
type IconProps = SVGProps<SVGSVGElement> & { size?: number };

function Svg({ size = 24, children, ...props }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      {children}
    </svg>
  );
}

export const Icon = {
  Sun: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="4.25" />
      <path d="M12 2.75v2M12 19.25v2M21.25 12h-2M4.75 12h-2M18.54 5.46l-1.41 1.41M6.87 17.13l-1.41 1.41M18.54 18.54l-1.41-1.41M6.87 6.87 5.46 5.46" />
    </Svg>
  ),
  SunRise: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4.5 17.25a7.5 7.5 0 0 1 15 0" />
      <path d="M2.75 20.25h18.5M12 4.25v3M5.46 8.21l1.6 1.6M18.54 8.21l-1.6 1.6" />
    </Svg>
  ),
  Panel: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5.2 4.75h13.6l2.45 10.5H2.75z" />
      <path d="M12 4.75v10.5M4 10h16M7.8 4.75l-1.5 10.5M16.2 4.75l1.5 10.5M12 15.25v4M8.5 19.25h7" />
    </Svg>
  ),
  Inverter: (p: IconProps) => (
    <Svg {...p}>
      <rect x="4.75" y="3.75" width="14.5" height="16.5" rx="2.5" />
      <rect x="8" y="7" width="8" height="4" rx="1" />
      <path d="M8.5 15.25h2.5M13 15.25l1.25-1.5 1.25 1.5-1.25 1.5z" />
    </Svg>
  ),
  Home: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.75 10.5 12 3.75l8.25 6.75" />
      <path d="M5.75 9v11.25h12.5V9" />
      <path d="M10 20.25v-5.5h4v5.5" />
    </Svg>
  ),
  Society: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.75 20.25V7.75l5-3 5 3v12.5M13.75 11.25h6.5v9" />
      <path d="M2.75 20.25h18.5M6.75 9.75h1M9.75 9.75h1M6.75 13h1M9.75 13h1M6.75 16.25h1M9.75 16.25h1M16.5 14.5h1M16.5 17.5h1" />
    </Svg>
  ),
  Factory: (p: IconProps) => (
    <Svg {...p}>
      <path d="M2.75 20.25V11l5 3v-3l5 3v-3l5 3V4.25h3.5v16" />
      <path d="M2.75 20.25h18.5M6.5 17.25h1.5M11 17.25h1.5M15.5 17.25h1.5" />
    </Svg>
  ),
  Building: (p: IconProps) => (
    <Svg {...p}>
      <rect x="5.25" y="3.25" width="13.5" height="17" rx="1.5" />
      <path d="M9 7h1.5M13.5 7H15M9 10.5h1.5M13.5 10.5H15M9 14h1.5M13.5 14H15M10.5 20.25v-3h3v3" />
    </Svg>
  ),
  School: (p: IconProps) => (
    <Svg {...p}>
      <path d="m2.75 8.75 9.25-5 9.25 5-9.25 5z" />
      <path d="M6.25 10.75v5c1.5 1.6 3.4 2.5 5.75 2.5s4.25-.9 5.75-2.5v-5M21.25 8.75v6" />
    </Svg>
  ),
  Hospital: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.75" y="4.75" width="16.5" height="15.5" rx="2" />
      <path d="M12 8.25v7.5M8.25 12h7.5" />
    </Svg>
  ),
  Warehouse: (p: IconProps) => (
    <Svg {...p}>
      <path d="M2.75 20.25V8.5L12 3.75l9.25 4.75v11.75" />
      <path d="M6.75 20.25v-8h10.5v8M6.75 15h10.5M6.75 17.75h10.5" />
    </Svg>
  ),
  Hotel: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.75 20.25V9.75M3.75 14.25h16.5v6M3.75 17h16.5" />
      <path d="M7.5 14.25a2 2 0 1 1 0-4 2 2 0 0 1 0 4zM11.25 14.25v-3.5h6a3 3 0 0 1 3 3v.5" />
    </Svg>
  ),
  Grid: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 2.75 8.25 21.25M12 2.75l3.75 18.5M7.5 7.25h9M6.5 12h11M5.5 16.75h13" />
      <path d="M4.75 21.25h14.5" />
    </Svg>
  ),
  Meter: (p: IconProps) => (
    <Svg {...p}>
      <rect x="4.75" y="3.25" width="14.5" height="17.5" rx="2.5" />
      <circle cx="12" cy="10.25" r="3.75" />
      <path d="m12 10.25 1.75-1.75M8.5 16.75h7" />
    </Svg>
  ),
  Rupee: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7 4.75h10M7 8.5h10M7 4.75h3.25a3.75 3.75 0 0 1 0 7.5H7l7.5 7" />
    </Svg>
  ),
  Shield: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 2.75 4.75 5.5v5.75c0 4.6 3.1 8.4 7.25 10 4.15-1.6 7.25-5.4 7.25-10V5.5z" />
      <path d="m8.75 12 2.25 2.25 4.25-4.5" />
    </Svg>
  ),
  Wrench: (p: IconProps) => (
    <Svg {...p}>
      <path d="M14.7 3.4a5 5 0 0 0-5.9 6.5l-5.4 5.4a2.12 2.12 0 0 0 3 3l5.4-5.4a5 5 0 0 0 6.5-5.9l-2.9 2.9-2.3-.7-.7-2.3z" />
    </Svg>
  ),
  Drop: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 3.25s-6.25 6.6-6.25 11a6.25 6.25 0 0 0 12.5 0c0-4.4-6.25-11-6.25-11z" />
      <path d="M9 14.5a3 3 0 0 0 3 3" />
    </Svg>
  ),
  Document: (p: IconProps) => (
    <Svg {...p}>
      <path d="M6.25 2.75h7.5l4.5 4.5v14h-12z" />
      <path d="M13.5 2.75v4.75h4.75M9 12h6M9 15.25h6M9 18.5h3.5" />
    </Svg>
  ),
  Stamp: (p: IconProps) => (
    <Svg {...p}>
      <path d="M9.25 12.75V9.5a2.75 2.75 0 1 1 5.5 0v3.25" />
      <path d="M4.25 12.75h15.5v4H4.25zM6.25 20.75h11.5" />
    </Svg>
  ),
  Leaf: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5 19c-.8-7.5 3.7-13.5 15-14.25C20 15 14.25 20 5 19z" />
      <path d="M5 19c3-4.5 6.25-7.5 10-9.5" />
    </Svg>
  ),
  Tree: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 21.25v-6.5M12 14.75l-3-2.25M12 16.5l3-2" />
      <path d="M7.25 16.25a4.5 4.5 0 0 1-.5-8.8 5.25 5.25 0 0 1 10.5 0 4.5 4.5 0 0 1-.5 8.8z" />
    </Svg>
  ),
  Cloud: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7 18.25a4.25 4.25 0 0 1-.4-8.48 5.75 5.75 0 0 1 11.1 1.48A3.5 3.5 0 0 1 17.5 18.25z" />
    </Svg>
  ),
  Bolt: (p: IconProps) => (
    <Svg {...p}>
      <path d="M13.25 2.75 5.75 13.5h6l-1 7.75 7.5-10.75h-6z" />
    </Svg>
  ),
  Battery: (p: IconProps) => (
    <Svg {...p}>
      <rect x="2.75" y="7.25" width="16" height="9.5" rx="2" />
      <path d="M21.25 10.5v3M6.25 10.25v3.5M9.5 10.25v3.5M12.75 10.25v3.5" />
    </Svg>
  ),
  Calendar: (p: IconProps) => (
    <Svg {...p}>
      <rect x="3.75" y="4.75" width="16.5" height="15.5" rx="2.5" />
      <path d="M3.75 9.25h16.5M8 2.75v4M16 2.75v4" />
    </Svg>
  ),
  Clock: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="M12 6.75V12l3.5 2" />
    </Svg>
  ),
  Phone: (p: IconProps) => (
    <Svg {...p}>
      <path d="M5.1 3.25h3.1l1.55 4.1-2 1.3a11 11 0 0 0 5.6 5.6l1.3-2 4.1 1.55v3.1a2 2 0 0 1-2.1 2A16.3 16.3 0 0 1 3.1 5.35a2 2 0 0 1 2-2.1z" />
    </Svg>
  ),
  WhatsApp: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.75 20.25 5 16.1a8.75 8.75 0 1 1 3.1 3z" />
      <path d="M9 8.5c0 3.6 2.9 6.5 6.5 6.5l.9-1.7-1.9-.9-.9.9a4.3 4.3 0 0 1-2.4-2.4l.9-.9-.9-1.9z" />
    </Svg>
  ),
  Mail: (p: IconProps) => (
    <Svg {...p}>
      <rect x="2.75" y="4.75" width="18.5" height="14.5" rx="2.5" />
      <path d="m3.5 6.25 8.5 6.5 8.5-6.5" />
    </Svg>
  ),
  Pin: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 21.25s-6.75-6.1-6.75-11.5a6.75 6.75 0 0 1 13.5 0c0 5.4-6.75 11.5-6.75 11.5z" />
      <circle cx="12" cy="9.75" r="2.5" />
    </Svg>
  ),
  ArrowRight: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4.75 12h14.5M13.5 6.25 19.25 12l-5.75 5.75" />
    </Svg>
  ),
  ArrowUpRight: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7 17 17 7M8.75 7H17v8.25" />
    </Svg>
  ),
  ArrowDown: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 4.75v14.5M6.25 13.5 12 19.25l5.75-5.75" />
    </Svg>
  ),
  Plus: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 4.75v14.5M4.75 12h14.5" />
    </Svg>
  ),
  Minus: (p: IconProps) => (
    <Svg {...p}>
      <path d="M4.75 12h14.5" />
    </Svg>
  ),
  Check: (p: IconProps) => (
    <Svg {...p}>
      <path d="m4.75 12.5 4.5 4.5 10-10" />
    </Svg>
  ),
  Close: (p: IconProps) => (
    <Svg {...p}>
      <path d="m5.75 5.75 12.5 12.5M18.25 5.75 5.75 18.25" />
    </Svg>
  ),
  Menu: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.75 8.5h16.5M3.75 15.5h16.5" />
    </Svg>
  ),
  ChevronDown: (p: IconProps) => (
    <Svg {...p}>
      <path d="m6.25 9.25 5.75 5.75 5.75-5.75" />
    </Svg>
  ),
  ChevronLeft: (p: IconProps) => (
    <Svg {...p}>
      <path d="M14.75 6.25 9 12l5.75 5.75" />
    </Svg>
  ),
  ChevronRight: (p: IconProps) => (
    <Svg {...p}>
      <path d="m9.25 6.25 5.75 5.75-5.75 5.75" />
    </Svg>
  ),
  Upload: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 15.25V3.75M7 8.5l5-4.75 5 4.75" />
      <path d="M3.75 14.75v3.5a2 2 0 0 0 2 2h12.5a2 2 0 0 0 2-2v-3.5" />
    </Svg>
  ),
  Scan: (p: IconProps) => (
    <Svg {...p}>
      <path d="M3.75 8V5.75a2 2 0 0 1 2-2H8M16 3.75h2.25a2 2 0 0 1 2 2V8M20.25 16v2.25a2 2 0 0 1-2 2H16M8 20.25H5.75a2 2 0 0 1-2-2V16M3.75 12h16.5" />
    </Svg>
  ),
  Spark: (p: IconProps) => (
    <Svg {...p}>
      <path d="M12 2.75c.6 4.9 2.35 6.65 7.25 7.25-4.9.6-6.65 2.35-7.25 7.25-.6-4.9-2.35-6.65-7.25-7.25 4.9-.6 6.65-2.35 7.25-7.25zM18.5 16.25c.25 2 .95 2.75 3 3-2.05.25-2.75.95-3 3-.25-2.05-1-2.75-3-3 2-.25 2.75-1 3-3z" />
    </Svg>
  ),
  Star: (p: IconProps) => (
    <Svg {...p}>
      <path d="m12 3.25 2.6 5.5 6 .75-4.4 4.15 1.1 5.95L12 16.7l-5.3 2.9 1.1-5.95L3.4 9.5l6-.75z" />
    </Svg>
  ),
  Quote: (p: IconProps) => (
    <Svg {...p}>
      <path d="M9.75 7.25c-3 .75-5 3.25-5 6.75v2.75h5v-5h-3M19.25 7.25c-3 .75-5 3.25-5 6.75v2.75h5v-5h-3" />
    </Svg>
  ),
  Compass: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="12" r="9.25" />
      <path d="m15.5 8.5-2 5-5 2 2-5z" />
    </Svg>
  ),
  Ruler: (p: IconProps) => (
    <Svg {...p}>
      <path d="m3.25 16.5 13.25-13.25 4.25 4.25L7.5 20.75z" />
      <path d="m7.25 12.5 1.75 1.75M10 9.75l1.75 1.75M12.75 7l1.75 1.75" />
    </Svg>
  ),
  Hammer: (p: IconProps) => (
    <Svg {...p}>
      <path d="m13.25 7.75-9 9a1.8 1.8 0 0 0 2.5 2.5l9-9" />
      <path d="m12.25 6.75 3-3 5 5-3 3z" />
    </Svg>
  ),
  Badge: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="12" cy="9.25" r="6" />
      <path d="m8.5 14.25-1.25 7 4.75-2.5 4.75 2.5-1.25-7" />
    </Svg>
  ),
  Play: (p: IconProps) => (
    <Svg {...p}>
      <path d="M7.25 4.75v14.5L19.25 12z" />
    </Svg>
  ),
  Search: (p: IconProps) => (
    <Svg {...p}>
      <circle cx="10.75" cy="10.75" r="6.5" />
      <path d="m15.5 15.5 4.75 4.75" />
    </Svg>
  ),
  Thermometer: (p: IconProps) => (
    <Svg {...p}>
      <path d="M10 13.5V5a2 2 0 0 1 4 0v8.5a4 4 0 1 1-4 0z" />
      <path d="M12 9v7" />
    </Svg>
  ),
  Layers: (p: IconProps) => (
    <Svg {...p}>
      <path d="m12 3.25 9.25 5L12 13.25l-9.25-5z" />
      <path d="m2.75 12 9.25 5 9.25-5M2.75 15.75l9.25 5 9.25-5" />
    </Svg>
  ),
  Cable: (p: IconProps) => (
    <Svg {...p}>
      <path d="M6.75 3.25v4M11.25 3.25v4M4.75 7.25h8.5v3a4.25 4.25 0 0 1-8.5 0zM9 14.5v2.25a4 4 0 0 0 4 4h1.25a4 4 0 0 0 4-4V3.25" />
    </Svg>
  ),
} as const;

export type IconName = keyof typeof Icon;
