import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Camera, MapPin } from "lucide-react";
import heroElagueur from "@/assets/hero-elagueur.jpg";
import haieAvant from "@/assets/haie-avant.jpg";
import haieApres from "@/assets/haie-apres.jpg";
import avant from "@/assets/avant.jpg";
import apres from "@/assets/apres.jpg";

export const Route = createFileRoute("/realisations")({
  head: () => ({
    meta: [
      {
        title: "Galerie photo — Ets Toquard & Fils, élagage en Charente-Maritime",
      },
      {
        name: "description",
        content:
          "Les chantiers d'ETS Toquard & Fils en images : tailles de haies, élagages, abattages et jardins remis en état en Charente-Maritime.",
      },
      {
        property: "og:title",
        content: "Galerie photo — Ets Toquard & Fils",
      },
      {
        property: "og:description",
        content:
          "Tailles de haies, élagages, abattages et jardins remis en état : tous nos chantiers en images.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GaleriePage,
});

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

function GaleriePage() {
  return (
    <main className="min-h-screen bg-bark paper-grain">
      <div className="mx-auto max-w-7xl px-5 pt-16 pb-24 md:px-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-cream/70 transition-colors hover:text-ochre"
        >
          <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
        </Link>

        <div className="mt-8 grid gap-6 md:grid-cols-[0.9fr_1.1fr] md:items-end">
          <div>
            <p className="text-luxe-eyebrow text-ochre">Carnet de chantiers</p>
            <h1 className="mt-3 text-4xl font-medium text-cream md:text-5xl">
              La galerie photo
            </h1>
          </div>
          <p className="max-w-xl text-sm leading-relaxed text-cream/70 md:justify-self-end">
            Tailles, nettoyages, abattages et jardins remis en état : les
            résultats du travail d'ETS Toquard &amp; Fils, sur le terrain.
          </p>
        </div>

        <div className="mt-12 grid auto-rows-[220px] gap-4 md:grid-cols-4 md:auto-rows-[250px]">
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
                draggable={false}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-bark/90 via-bark/45 to-transparent p-5 text-cream">
                <div className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-cream/15 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] backdrop-blur">
                  <Camera className="h-3 w-3" /> Réalisation
                </div>
                <h2 className="text-2xl font-semibold leading-tight">{chantier.titre}</h2>
                <p className="mt-2 flex items-center gap-1.5 text-xs uppercase tracking-[0.18em] text-cream/75">
                  <MapPin className="h-3.5 w-3.5" /> {chantier.lieu}
                </p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </main>
  );
}
