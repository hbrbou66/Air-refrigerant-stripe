import { IconTruck, IconShield, IconBolt } from "@/components/Icons";

export function AnnouncementBar() {
  const items = [
    { icon: <IconTruck width={14} height={14} />, text: "Free Shipping on All Orders" },
    { icon: <IconShield width={14} height={14} />, text: "EPA Certified Supplier" },
    { icon: <IconBolt width={14} height={14} />, text: "Fast FedEx/UPS Delivery" },
  ];
  return (
    <div className="bg-navy-dark text-white">
      <div className="container-px flex h-9 items-center justify-center gap-7 text-[12px] font-medium sm:text-[13px]">
        {items.map((it, i) => (
          <span key={i} className={`items-center gap-1.5 ${i > 0 ? "hidden sm:flex" : "flex"}`}>
            <span className="text-cyan-soft">{it.icon}</span>
            {it.text}
          </span>
        ))}
      </div>
    </div>
  );
}
