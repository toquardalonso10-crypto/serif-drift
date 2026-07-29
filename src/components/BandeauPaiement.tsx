import { CreditCard } from "lucide-react";

const MESSAGE = "Payable en 3, 5 ou 10 fois sans frais";

export function BandeauPaiement() {
  const items = Array.from({ length: 8 });
  return (
    <div className="w-full overflow-hidden bg-gold-foil text-bark">
      <div
        className="flex w-max items-center gap-10 py-1.5"
        style={{ animation: "bandeau-slide 34s linear infinite" }}
      >
        {[...items, ...items].map((_, i) => (
          <span
            key={i}
            className="flex shrink-0 items-center gap-2 text-[10px] font-bold uppercase tracking-[0.28em]"
          >
            <CreditCard className="h-3.5 w-3.5" />
            {MESSAGE}
          </span>
        ))}
      </div>
    </div>
  );
}
