import { Marquee } from "./Marquee";

const PARTENAIRES = [
  { nom: "Noz", style: "font-black tracking-tight text-bark" },
  { nom: "Foir'Fouille", style: "font-serif italic text-terracotta" },
  { nom: "Leclerc", style: "font-extrabold uppercase tracking-[0.12em] text-forest" },
  { nom: "Super U", style: "font-extrabold uppercase tracking-wide text-ochre" },
  { nom: "Weldom", style: "font-serif font-bold text-moss" },
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
            <div className="flex h-16 w-[220px] items-center justify-center rounded-lg border border-bark/10 bg-card/70 px-6 shadow-rustic">
              <span className={`text-xl ${p.style}`}>{p.nom}</span>
            </div>
          )}
        />
      </div>
    </section>
  );
}
