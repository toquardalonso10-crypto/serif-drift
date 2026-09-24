export const SITE_URL = "https://etstoquardetfils.com";
export const SITE_NAME = "Ets Toquard & Fils";

/**
 * Construit une URL absolue à partir d'un chemin relatif au site (ex: une
 * URL d'asset émise par Vite comme "/assets/hero-abc123.jpg") ou d'une route.
 */
export function absoluteUrl(path: string): string {
  if (path.startsWith("http://") || path.startsWith("https://")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

// Coordonnées et zones réellement présentes sur le site (Footer, Hero,
// Meteo) — ne jamais ajouter d'horaires, de note ou d'avis ici : aucune
// donnée fiable n'existe pour ces champs, voir le rapport d'audit.
export const BUSINESS = {
  name: SITE_NAME,
  telephone: "+33778260088",
  telephoneDisplay: "07 78 26 00 88",
  email: "toquarddavis10@gmail.com",
  siret: "49467764400028",
  streetAddress: "107 avenue de Saintonge",
  postalCode: "17430",
  addressLocality: "Tonnay-Charente",
  addressCountry: "FR",
  areaServed: [
    "La Rochelle",
    "Saintes",
    "Royan",
    "Rochefort",
    "Jonzac",
    "Marennes",
    "Saint-Jean-d'Angély",
    "Île de Ré",
    "Oléron",
  ],
};

export function buildLocalBusinessJsonLd(imageUrl: string) {
  return {
    "@context": "https://schema.org",
    "@type": "HomeAndConstructionBusiness",
    name: BUSINESS.name,
    image: imageUrl,
    url: SITE_URL,
    telephone: BUSINESS.telephone,
    email: BUSINESS.email,
    taxID: BUSINESS.siret,
    address: {
      "@type": "PostalAddress",
      streetAddress: BUSINESS.streetAddress,
      postalCode: BUSINESS.postalCode,
      addressLocality: BUSINESS.addressLocality,
      addressCountry: BUSINESS.addressCountry,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
    description:
      "Élagueurs grimpeurs en Charente-Maritime : taille douce, abattage, dessouchage, démontage par cordes, haies et vergers, urgence tempête. Devis gratuit.",
  };
}

export function buildWebsiteJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_NAME,
    url: SITE_URL,
    inLanguage: "fr-FR",
  };
}

export function buildServiceJsonLd(service: { name: string; description: string; path: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.name,
    name: service.name,
    description: service.description,
    url: absoluteUrl(service.path),
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: BUSINESS.name,
      telephone: BUSINESS.telephone,
      url: SITE_URL,
    },
    areaServed: BUSINESS.areaServed.map((name) => ({
      "@type": "City",
      name,
    })),
  };
}

export function buildBreadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteUrl(item.path),
    })),
  };
}
