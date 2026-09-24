import { Marquee } from "./Marquee";

import leclerc from "@/assets/logos/leclerc.svg.asset.json";
import weldom from "@/assets/logos/weldom.svg.asset.json";
import noz from "@/assets/logos/noz.svg.asset.json";
import superu from "@/assets/logos/superu.svg.asset.json";
import foirfouille from "@/assets/logos/foirfouille.svg.asset.json";

const PARTENAIRES = [
  { nom: "E.Leclerc", src: leclerc.url, h: "h-10" },
  { nom: "Weldom", src: weldom.url, h: "h-10" },
  { nom: "Noz", src: noz.url, h: "h-12" },
  { nom: "Super U", src: superu.url, h: "h-11" },
  { nom: "La Foir'Fouille", src: foirfouille.url, h: "h-12" },
];

export function Partenaires() {
  return (
    <section className="border-y border-bark/10 bg-cream py-10 paper-grain">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <p className="text-center text-[11px] font-semibold uppercase tracking-[0.3em] text-ink/60">
          Même les professionnels nous font confiance
        </p>
      </div>
      <div className="mt-7">
        <Marquee
          items={PARTENAIRES}
          itemKey={(p) => p.nom}
          speed={45}
          render={(p) => (
            <div className="flex h-24 w-[260px] items-center justify-center rounded-lg border border-bark/10 bg-card/70 px-8 shadow-rustic">
              <img
                src={p.src}
                alt={p.nom}
                loading="lazy"
                draggable={false}
                className={`w-auto max-w-[180px] object-contain ${p.h}`}
              />
            </div>
          )}
        />
      </div>
    </section>
  );
}
