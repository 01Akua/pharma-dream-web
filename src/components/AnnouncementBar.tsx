import { Truck, Sparkles } from "lucide-react";

const items = [
  { icon: Truck, text: "Envíos gratis a partir de COP $200.000" },
  { icon: Sparkles, text: "10% OFF en tu primera compra uniéndote al Club Pharma Dream" },
  { icon: Truck, text: "Pago seguro · Tarjeta, PSE y contra entrega" },
];

export default function AnnouncementBar() {
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
