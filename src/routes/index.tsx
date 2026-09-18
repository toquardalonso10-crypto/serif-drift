import { createFileRoute } from "@tanstack/react-router";
import { Hero } from "@/components/Hero";
import { Meteo } from "@/components/Meteo";
import { Partenaires } from "@/components/Partenaires";
import { Services } from "@/components/Services";
import { AvantApres } from "@/components/AvantApres";
import { GalerieTeaser } from "@/components/GalerieTeaser";
import { Abonnements } from "@/components/Abonnements";
import { Avis } from "@/components/Avis";

import { Devis } from "@/components/Devis";
import { Footer } from "@/components/Footer";
import { BulleDevis } from "@/components/BulleDevis";
import { ChatArbre } from "@/components/ChatArbre";


export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Ets Toquard & Fils — Élagage en Charente-Maritime",
      },
      {
        name: "description",
        content:
          "Élagage, abattage et démontage par cordes en Charente-Maritime. Devis gratuit, météo des chantiers en direct, avis clients 4,9/5.",
      },
      {
        property: "og:title",
        content: "Ets Toquard & Fils — Élagueurs en Charente-Maritime",
      },
      {
        property: "og:description",
        content:
          "Trois générations de grimpeurs-élagueurs de La Rochelle à Jonzac. Taille douce, abattage, urgence tempête. Devis gratuit.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main id="top">
      <Hero />
      <Meteo />
      <Partenaires />
      <Services />
      <AvantApres />
      <GalerieTeaser />
      <Abonnements />
      <Avis />

      <Devis />
      <Footer />
      <BulleDevis />
      <ChatArbre />

    </main>
  );
}
