import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Camera } from "lucide-react";

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

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 flex flex-col items-center justify-center rounded-xl border-gold-hairline bg-card/60 shadow-luxe px-8 py-24 text-center"
        >
          <span className="mb-5 inline-flex h-14 w-14 items-center justify-center rounded-full border-gold-hairline bg-cream/10">
            <Camera className="h-6 w-6 text-ochre" />
          </span>
          <p className="text-lg font-medium text-cream">
            Photos de chantiers à venir
          </p>
          <p className="mt-2 max-w-sm text-sm text-cream/60">
            Nos plus belles réalisations seront bientôt présentées ici.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
