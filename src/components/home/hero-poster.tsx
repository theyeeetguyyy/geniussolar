import { getImageProps } from "next/image";
import desktop from "@/assets/hero/hero-scene-desktop.jpg";
import mobile from "@/assets/hero/hero-scene-mobile.jpg";

/**
 * Pre-rendered frame of the 3D hero (same camera and sun position). Shown
 * instantly; the live WebGL scene fades in over it after first interaction.
 */
export function HeroPoster() {
  const common = { alt: "", sizes: "100vw", fetchPriority: "high" as const };
  const {
    props: { srcSet: desktopSet },
  } = getImageProps({ ...common, src: desktop, quality: 75 });
  const {
    props: { srcSet: mobileSet, ...rest },
  } = getImageProps({ ...common, src: mobile, quality: 75 });
  return (
    <picture>
      <source media="(min-width: 1024px)" srcSet={desktopSet} />
      <source media="(max-width: 1023px)" srcSet={mobileSet} />
      {/* eslint-disable-next-line jsx-a11y/alt-text -- decorative, alt="" comes from props */}
      <img {...rest} loading="eager" className="absolute inset-0 size-full object-cover" />
    </picture>
  );
}
