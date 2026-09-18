import { motion } from "framer-motion";
import { Camera, MapPin } from "lucide-react";
import heroElagueur from "@/assets/hero-elagueur.jpg";
import haieAvant from "@/assets/haie-avant.jpg";
import haieApres from "@/assets/haie-apres.jpg";
import avant from "@/assets/avant.jpg";
import apres from "@/assets/apres.jpg";
import { SerifGlow } from "./SerifGlow";

const CHANTIERS = [
  {
    titre: "Haie de laurier remise droite",
    lieu: "Tonnay-Charente",
    image: haieApres,
    grand: true,
  },
  {
    titre: "Avant intervention",
    lieu: "Pons",
    image: haieAvant,
  },
  {
    titre: "Élagage sécurisé",
    lieu: "Charente-Maritime",
    image: heroElagueur,
  },
  {
    titre: "Arbre nettoyé et éclairci",
    lieu: "Saintes",
    image: apres,
    grand: true,
  },
  {
    titre: "Préparation du chantier",
    lieu: "Rochefort",
    image: avant,
  },
];

export function GalerieChantiers() {
  return (
    <section id="realisations" className="overflow-hidden bg-bark py-24">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-luxe-eyebrow text-ochre">Carnet de chantiers</p>
            <h2 className="mt-3 flex flex-wrap items-baseline gap-3 text-4xl font-medium text-cream md:text-5xl">
              Les résultats
              <SerifGlow
                word="sur le terrain"
                fontSize={52}
                strokeWidth={12}
                italic
                inView
                delay={0.25}
                fill="var(--bark)"
              />
            </h2>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-cream/70 md:justify-self-end">
            Une galerie de réalisations pour montrer les tailles, nettoyages,
            abattages et créations de jardins réalisés chez les clients.
          </p>
        </div>

        <div className="grid auto-rows-[220px] gap-4 md:grid-cols-4 md:auto-rows-[250px]">
          {CHANTIERS.map((chantier, index) => (
            <motion.article
              key={`${chantier.titre}-${chantier.lieu}`}
              initial={{ opacity: 0, y: 34, rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              whileInView={{ opacity: 1, y: 0, rotate: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: index * 0.06 }}
              className={`group relative overflow-hidden rounded-xl border-gold-hairline bg-card shadow-luxe ${
                chantier.grand ? "md:col-span-2 md:row-span-2" : "md:col-span-2"
              }`}
            >
              <img
                src={chantier.image}
                alt={`${chantier.titre} à ${chantier.lieu}`}
                loading="lazy"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bark/90 via-bark/45 to-transparent p-5 text-cream">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                  <Camera className="h-3 w-3" /> Réalisation
                </div>
                <h3 className="text-2xl font-semibold leading-tight">{chantier.titre}</h3>
                <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-cream/75">
                  <MapPin className="h-3.5 w-3.5" /> {chantier.lieu}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}