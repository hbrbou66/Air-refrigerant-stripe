import type { ComponentType, SVGProps } from "react";

export type IconType = ComponentType<SVGProps<SVGSVGElement>>;

type Size = "sm" | "md" | "lg";
type Tone = "cyan" | "trust" | "dark";

/* Single source of truth for the circular feature/benefit chip used across
   the marketing pages. Sizes and tones map to the existing token palette so
   the chip never drifts to a one-off h-10/h-11/h-12 + custom color again. */
const sizeBox: Record<Size, string> = {
  sm: "h-10 w-10", // 40px
  md: "h-11 w-11", // 44px
  lg: "h-12 w-12", // 48px
};

const iconPx: Record<Size, number> = { sm: 20, md: 22, lg: 24 };

const toneCls: Record<Tone, string> = {
  cyan: "bg-cyan/10 text-cyan",
  trust: "bg-trust-soft text-trust",
  dark: "bg-white/10 text-cyan-soft", // for dark / gradient sections
};

export function IconBadge({
  icon: Icon,
  size = "md",
  tone = "cyan",
  className = "",
}: {
  icon: IconType;
  size?: Size;
  tone?: Tone;
  className?: string;
}) {
  return (
    <span
      className={`flex flex-shrink-0 items-center justify-center rounded-2xl ${sizeBox[size]} ${toneCls[tone]} ${className}`}
    >
      <Icon width={iconPx[size]} height={iconPx[size]} />
    </span>
  );
}
