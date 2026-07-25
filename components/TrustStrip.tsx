import { TRUST_BADGES } from "@/lib/site";
import { IconShield, IconDrop, IconCylinder, IconTruck } from "@/components/Icons";

const ICONS = {
  shield: IconShield,
  drop: IconDrop,
  cylinder: IconCylinder,
  truck: IconTruck,
} as const;

export function TrustStrip() {
  return (
    <div className="border-b border-line bg-white">
      <div className="container-px grid grid-cols-2 sm:grid-cols-4 sm:divide-x sm:divide-line">
        {TRUST_BADGES.map((b) => {
          const Icon = ICONS[b.icon];
          return (
            <div key={b.label} className="flex items-center justify-center gap-3 px-2 py-5 text-center">
              <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-pill bg-trust-soft text-trust">
                <Icon width={19} height={19} />
              </span>
              <span className="text-sm font-semibold text-navy">{b.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
