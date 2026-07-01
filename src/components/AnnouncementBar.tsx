"use client";

import { Truck, Sparkles, ShieldCheck } from "lucide-react";
import { useContent } from "@/lib/content";

const icons = [Truck, Sparkles, ShieldCheck];

export default function AnnouncementBar() {
  const { announcement } = useContent();
  const items = announcement.map((text, i) => ({
    icon: icons[i % icons.length],
    text,
  }));

  return (
    <div className="relative z-50 overflow-hidden bg-forest text-cream/90">
      <div className="flex w-max animate-marquee">
        {[0, 1].map((dup) => (
          <div key={dup} className="flex shrink-0" aria-hidden={dup === 1}>
            {items.map((item, i) => (
              <span
                key={`${dup}-${i}`}
                className="flex items-center gap-2.5 px-8 py-2.5 text-[0.72rem] tracking-[0.14em] uppercase"
              >
                <item.icon className="h-3.5 w-3.5 text-gold-soft" />
                {item.text}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
