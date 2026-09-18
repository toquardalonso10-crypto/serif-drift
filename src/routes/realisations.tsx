import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ChevronLeft, ChevronRight } from "lucide-react";
import { useCallback, useEffect, useState } from "react";

import jardinCoin from "@/assets/chantiers/1162378581599593768_2.JPG.asset.json";
import siteNozLarge from "@/assets/chantiers/1381251436636874893.JPG.asset.json";
import jardinMassif from "@/assets/chantiers/2103505804900367857.JPG.asset.json";
import siteNozPropre from "@/assets/chantiers/3013307296562086614.JPG.asset.json";
import terrasseJardin from "@/assets/chantiers/3101250754179368142.JPG.asset.json";
import toitureFinie from "@/assets/chantiers/3230992284909895499.JPG.asset.json";
import toitureAvant from "@/assets/chantiers/3316497891751757143.JPG.asset.json";
import jardinPalmiers from "@/assets/chantiers/3511026877376414153.JPG.asset.json";
import toitureBache from "@/assets/chantiers/3855275166815502556.JPG.asset.json";
import toitureDepose from "@/assets/chantiers/3999426942201448836.JPG.asset.json";
import toitureNeuve from "@/assets/chantiers/4165498030261161568.JPG.asset.json";
import parkingAiguilles from "@/assets/chantiers/4720270744456035277.JPG.asset.json";
import brouetteDechets from "@/assets/chantiers/4984049865507099095.JPG.asset.json";
import parkingPropre from "@/assets/chantiers/5023167172933604160.JPG.asset.json";
import terrasseClim from "@/assets/chantiers/5648070188775809452.JPG.asset.json";
import escalierFeuilles from "@/assets/chantiers/6338352100263593477.JPG.asset.json";
import courPropre from "@/assets/chantiers/6431405152115440397.JPG.asset.json";
import parkingZone from "@/assets/chantiers/6605058305748879580.JPG.asset.json";
import parkingTas from "@/assets/chantiers/7637574324330397165.JPG.asset.json";
import camionChantier from "@/assets/chantiers/7858830637183545872.JPG.asset.json";
import haieEnvahissante from "@/assets/chantiers/8013373355619148722.JPG.asset.json";
import toitureGouttiere from "@/assets/chantiers/8105468604482816334.JPG.asset.json";
import terrasseEscalier from "@/assets/chantiers/8181964303219953796.JPG.asset.json";
import parkingCamion from "@/assets/chantiers/8335856582033932758.JPG.asset.json";
import parkingBordure from "@/assets/chantiers/8839002591003358246.JPG.asset.json";
import terrasseFinie from "@/assets/chantiers/9175435763877632901.JPG.asset.json";

const PHOTOS = [
  { src: siteNozLarge.url, alt: "Parking et espaces verts avant entretien chez Noz" },
  { src: siteNozPropre.url, alt: "Espaces verts entretenus devant le magasin Noz" },
  { src: parkingZone.url, alt: "Abords de parking de zone commerciale envahis d'aiguilles de pin" },
  { src: parkingAiguilles.url, alt: "Bordure de parking couverte d'aiguilles de pin avant nettoyage" },
  { src: parkingBordure.url, alt: "Bordure de parking encombrée d'aiguilles de pin et de terre" },
  { src: parkingTas.url, alt: "Tas d'aiguilles de pin ramassées le long de la bordure" },
  { src: brouetteDechets.url, alt: "Brouette remplie de déchets verts ramassés sur le parking" },
  { src: parkingCamion.url, alt: "Déchets verts regroupés avant chargement dans la camionnette" },
  { src: camionChantier.url, alt: "Camionnette ETS Toquard & Fils sur le chantier de nettoyage" },
  { src: parkingPropre.url, alt: "Bordure de parking dégagée après le passage de l'équipe" },
  { src: terrasseJardin.url, alt: "Allée de jardin et terrasse avant remise en état" },
  { src: jardinPalmiers.url, alt: "Massif de palmiers et végétation à nettoyer" },
  { src: jardinMassif.url, alt: "Massif dense dans un jardin de ville" },
  { src: jardinCoin.url, alt: "Coin de jardin nettoyé près d'une clôture" },
  { src: haieEnvahissante.url, alt: "Végétation envahissante au-dessus d'une terrasse en bois" },
  { src: escalierFeuilles.url, alt: "Escalier et terrasse couverts de feuilles avant nettoyage" },
  { src: terrasseEscalier.url, alt: "Escalier de terrasse en bois dégagé pendant le chantier" },
  { src: terrasseClim.url, alt: "Terrasse en bois dégagée le long du mur" },
  { src: courPropre.url, alt: "Cour et terrasse nettoyées après intervention" },
  { src: terrasseFinie.url, alt: "Terrasse et jardin remis au propre après intervention" },
  { src: toitureAvant.url, alt: "Toiture d'abri avant intervention" },
  { src: toitureGouttiere.url, alt: "Gouttière et couverture encombrées de terre et de racines" },
  { src: toitureDepose.url, alt: "Ancienne couverture envahie de racines en cours de dépose" },
  { src: toitureBache.url, alt: "Toiture recouverte d'une membrane noire pendant le chantier" },
  { src: toitureFinie.url, alt: "Toiture d'abri remise au propre après intervention" },
  { src: toitureNeuve.url, alt: "Nouvelle toiture terminée vue depuis le faîtage" },
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
  const [index, setIndex] = useState(0);
  const [direction, setDirection] = useState(1);
  const total = PHOTOS.length;

  const aller = useCallback(
    (sens: number) => {
      setDirection(sens);
      setIndex((courant) => (courant + sens + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const surTouche = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") aller(-1);
      if (e.key === "ArrowRight") aller(1);
    };
    window.addEventListener("keydown", surTouche);
    return () => window.removeEventListener("keydown", surTouche);
  }, [aller]);

  const photo = PHOTOS[index];

  return (
    <main className="min-h-screen bg-bark paper-grain">
      <div className="mx-auto max-w-5xl px-5 pt-16 pb-24 md:px-8">
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

        {/* Carrousel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55 }}
          className="mt-12"
        >
          <div className="relative overflow-hidden rounded-2xl border-gold-hairline bg-card/50 shadow-rustic">
            <div className="relative aspect-[4/3] w-full bg-cream/10 md:aspect-[16/9]">
              <AnimatePresence initial={false} custom={direction}>
                <motion.img
                  key={photo.src}
                  src={photo.src}
                  alt={photo.alt}
                  draggable={false}
                  custom={direction}
                  initial={{ opacity: 0, x: direction * 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: direction * -60 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </AnimatePresence>

              {/* Flèche gauche */}
              <button
                type="button"
                onClick={() => aller(-1)}
                aria-label="Photo précédente"
                className="absolute left-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-bark/80 text-cream backdrop-blur-sm transition-all hover:scale-105 hover:bg-ochre hover:text-bark"
              >
                <ChevronLeft className="h-6 w-6" />
              </button>

              {/* Flèche droite */}
              <button
                type="button"
                onClick={() => aller(1)}
                aria-label="Photo suivante"
                className="absolute right-3 top-1/2 z-10 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-cream/25 bg-bark/80 text-cream backdrop-blur-sm transition-all hover:scale-105 hover:bg-ochre hover:text-bark"
              >
                <ChevronRight className="h-6 w-6" />
              </button>

              {/* Compteur */}
              <span className="absolute bottom-3 left-1/2 z-10 -translate-x-1/2 rounded-full border border-cream/20 bg-bark/80 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-cream backdrop-blur-sm">
                {index + 1} / {total}
              </span>
            </div>

            <p className="border-t border-cream/10 px-5 py-4 text-sm text-cream/70">
              {photo.alt}
            </p>
          </div>

          {/* Vignettes */}
          <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
            {PHOTOS.map((vignette, i) => (
              <button
                key={vignette.src}
                type="button"
                onClick={() => {
                  setDirection(i > index ? 1 : -1);
                  setIndex(i);
                }}
                aria-label={`Voir la photo ${i + 1}`}
                className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border transition-all ${
                  i === index
                    ? "border-ochre ring-2 ring-ochre/50"
                    : "border-cream/15 opacity-60 hover:opacity-100"
                }`}
              >
                <img
                  src={vignette.src}
                  alt=""
                  loading="lazy"
                  draggable={false}
                  className="h-full w-full object-cover"
                />
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </main>
  );
}
