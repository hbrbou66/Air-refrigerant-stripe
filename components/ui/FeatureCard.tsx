import { IconBadge, type IconType } from "@/components/ui/IconBadge";

/* Shared benefit/feature card: an IconBadge over a heading + body. Replaces
   the repeated card markup on home, about, and request-a-quote so padding,
   type sizes, and the icon chip stay consistent everywhere. */
export function FeatureCard({
  icon,
  title,
  body,
  hover = false,
  iconSize = "md",
  iconTone = "cyan",
  className = "",
}: {
  icon: IconType;
  title: string;
  body: string;
  hover?: boolean;
  iconSize?: "sm" | "md" | "lg";
  iconTone?: "cyan" | "trust" | "dark";
  className?: string;
}) {
  return (
    <div className={`${hover ? "card-hover" : "card"} p-6 ${className}`}>
      <IconBadge icon={icon} size={iconSize} tone={iconTone} />
      <h3 className="mt-4 font-heading text-base font-bold text-navy">{title}</h3>
      <p className="mt-1.5 text-sm leading-relaxed text-slate-soft">{body}</p>
    </div>
  );
}
