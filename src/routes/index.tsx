import { createFileRoute } from "@tanstack/react-router";
import heroElagueur from "@/assets/hero-elagueur.jpg";
import { absoluteUrl, SITE_URL } from "@/lib/seo";
import { Hero } from "@/components/Hero";
import { Meteo } from "@/components/Meteo";
import { Partenaires } from "@/components/Partenaires";
import { Services } from "@/components/Services";
import { AvantApres } from "@/components/AvantApres";
import { GalerieTeaser } from "@/components/GalerieTeaser";
import { Abonnements } from "@/components/Abonnements";
import { AvisGoogle } from "@/components/AvisGoogle";
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
          "Élagage, abattage et démontage par cordes en Charente-Maritime. Devis gratuit, météo des chantiers en direct.",
      },
      {
        property: "og:title",
        content: "Ets Toquard & Fils — Élagueurs en Charente-Maritime",
      },
      {
        property: "og:description",
        content: "De La Rochelle à Jonzac, taille douce, abattage, urgence tempête. Devis gratuit.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: SITE_URL },
      { property: "og:image", content: absoluteUrl(heroElagueur) },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Ets Toquard & Fils — Élagueurs en Charente-Maritime" },
      {
        name: "twitter:description",
        content: "De La Rochelle à Jonzac, taille douce, abattage, urgence tempête. Devis gratuit.",
      },
      { name: "twitter:image", content: absoluteUrl(heroElagueur) },
    ],
    links: [{ rel: "canonical", href: SITE_URL }],
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
      <AvisGoogle />
      <Devis />
      <Footer />
      <BulleDevis />
      <ChatArbre />
    </main>
  );
}
