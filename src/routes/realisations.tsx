import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Images } from "lucide-react";

import jardinCoin from "@/assets/chantiers/1162378581599593768_2.JPG.asset.json";
import siteNozLarge from "@/assets/chantiers/1381251436636874893.JPG.asset.json";
import jardinMassif from "@/assets/chantiers/2103505804900367857.JPG.asset.json";
import siteNozPropre from "@/assets/chantiers/3013307296562086614.JPG.asset.json";
import terrasseJardin from "@/assets/chantiers/3101250754179368142.JPG.asset.json";
import toitureFinie from "@/assets/chantiers/3230992284909895499.JPG.asset.json";
import toitureAvant from "@/assets/chantiers/3316497891751757143.JPG.asset.json";
import jardinPalmiers from "@/assets/chantiers/3511026877376414153.JPG.asset.json";

const CHANTIERS = [
  {
    nom: "Entretien professionnel — Noz",
    description: "Espaces extérieurs, bordures et abords de parking remis au propre.",
    photos: [
      { src: siteNozLarge.url, alt: "Parking et espaces verts avant entretien chez Noz" },
      { src: siteNozPropre.url, alt: "Espaces verts entretenus devant le magasin Noz" },
    ],
  },
  {
    nom: "Jardin de ville — nettoyage complet",
    description: "Passage, massifs, palmiers et coin terrasse dégagés avec soin.",
    photos: [
      { src: terrasseJardin.url, alt: "Allée de jardin et terrasse avant remise en état" },
      { src: jardinPalmiers.url, alt: "Massif de palmiers et végétation à nettoyer" },
      { src: jardinMassif.url, alt: "Massif dense dans un jardin de ville" },
      { src: jardinCoin.url, alt: "Coin de jardin nettoyé près d'une clôture" },
    ],
  },
  {
    nom: "Abri et toiture — dégagement du chantier",
    description: "Zone préparée, ancienne couverture retirée et nouvelle tôle posée.",
    photos: [
      { src: toitureAvant.url, alt: "Toiture d'abri avant intervention" },
      { src: toitureFinie.url, alt: "Toiture d'abri remise au propre après intervention" },
    ],
  },
];

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

        <div className="mt-14 space-y-12">
          {CHANTIERS.map((chantier, index) => (
            <motion.section
              key={chantier.nom}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: index * 0.08 }}
              className="border-t border-cream/15 pt-8"
            >
              <div className="mb-5 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
                <div>
                  <p className="text-luxe-eyebrow text-ochre">Chantier {index + 1}</p>
                  <h2 className="mt-2 text-2xl font-medium text-cream md:text-3xl">
                    {chantier.nom}
                  </h2>
                </div>
                <p className="max-w-lg text-sm leading-relaxed text-cream/65">
                  {chantier.description}
                </p>
              </div>

              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                {chantier.photos.map((photo, photoIndex) => (
                  <figure
                    key={photo.src}
                    className={`group overflow-hidden rounded-xl border-gold-hairline bg-card/50 shadow-rustic ${
                      chantier.photos.length === 2 ? "lg:col-span-2" : ""
                    }`}
                  >
                    <div className="relative aspect-[4/3] overflow-hidden bg-cream/10">
                      <img
                        src={photo.src}
                        alt={photo.alt}
                        loading="lazy"
                        draggable={false}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <span className="absolute left-3 top-3 rounded-full border border-cream/20 bg-bark/80 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                        Photo {photoIndex + 1}
                      </span>
                    </div>
                  </figure>
                ))}
              </div>
            </motion.section>
          ))}
        </div>

        <div className="mt-12 flex items-center gap-3 rounded-xl border border-cream/15 bg-cream/5 px-5 py-4 text-sm text-cream/65">
          <Images className="h-5 w-5 shrink-0 text-ochre" />
          <p>
            Les photos sont classées par chantier. Les doublons envoyés ont été retirés pour garder une galerie propre.
          </p>
        </div>
      </div>
    </main>
  );
}
