import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { SerifGlow } from "./SerifGlow";

const AVIS = [
  {
    nom: "Martine Ledoux",
    ville: "Saintes",
    initiales: "ML",
    note: 5,
    date: "il y a 2 semaines",
    texte:
      "Deux tilleuls immenses au-dessus de la véranda, je n'osais plus ouvrir les volets. L'équipe est arrivée à 8 h, tout était démonté et le terrain balayé à 16 h. Impeccable.",
    couleur: "bg-terracotta",
  },
  {
    nom: "Jean-Pierre Rambaud",
    ville: "Royan",
    initiales: "JR",
    note: 5,
    date: "il y a 1 mois",
    texte:
      "Devis clair, pas de mauvaise surprise, et le fils grimpe comme un chat. Ils ont même laissé le broyat pour mes massifs. Je recommande sans hésiter.",
    couleur: "bg-forest",
  },
  {
    nom: "Sophie Charrier",
    ville: "La Rochelle",
    initiales: "SC",
    note: 5,
    date: "il y a 1 mois",
    texte:
      "Intervention en urgence après la tempête, un pin cassé sur le portail. Sur place en trois heures un dimanche. Des gens sérieux et humains.",
    couleur: "bg-ochre",
  },
  {
    nom: "Hervé Bonnin",
    ville: "Jonzac",
    initiales: "HB",
    note: 4,
    date: "il y a 2 mois",
    texte:
      "Très bonne taille sur mes vieux fruitiers, ils m'ont expliqué chaque coupe. Un léger retard le matin, d'où les 4 étoiles, mais le travail est irréprochable.",
    couleur: "bg-sky",
  },
  {
    nom: "Nadège Fillon",
    ville: "Rochefort",
    initiales: "NF",
    note: 5,
    date: "il y a 3 mois",
    texte:
      "Haie de 80 mètres taillée au cordeau et évacuée le jour même. Prix honnête pour la région, facture nette avec l'attestation crédit d'impôt.",
    couleur: "bg-moss",
  },
  {
    nom: "Patrick Guilbaud",
    ville: "Marennes",
    initiales: "PG",
    note: 5,
    date: "il y a 4 mois",
    texte:
      "Troisième chantier avec eux. Chêne vert de 18 mètres démonté par cordes entre deux maisons, pas une tuile cassée. Du vrai travail d'artisan.",
    couleur: "bg-bark",
  },
];

function Etoiles({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${
            i < note ? "fill-ochre text-ochre" : "text-bark/25"
          }`}
        />
      ))}
    </div>
  );
}

export function Avis() {
  return (
    <section id="avis" className="bg-cream py-20 paper-grain">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 flex flex-wrap items-end justify-between gap-6">
          <h2 className="flex flex-wrap items-baseline gap-3 text-4xl font-medium text-bark md:text-5xl">
            Ce qu'en disent
            <SerifGlow
              word="les voisins"
              fontSize={52}
              strokeWidth={12}
              italic
              inView
              delay={0.4}
            />
          </h2>
          <div className="flex items-center gap-3 rounded-full border border-bark/15 bg-card px-4 py-2 shadow-rustic">
            <span className="text-2xl font-extrabold text-bark">4,9</span>
            <div>
              <Etoiles note={5} />
              <span className="text-[11px] text-ink/70">
                187 avis Google vérifiés
              </span>
            </div>
          </div>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {AVIS.map((a, i) => (
            <motion.article
              key={a.nom}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              whileHover={{ rotate: i % 2 ? 0.7 : -0.7, y: -4 }}
              className="rounded-xl border border-bark/10 bg-card p-6 shadow-rustic"
            >
              <div className="flex items-center gap-3">
                <span
                  className={`grid h-11 w-11 place-items-center rounded-full text-sm font-bold text-cream ${a.couleur}`}
                >
                  {a.initiales}
                </span>
                <div>
                  <p className="font-semibold text-bark">{a.nom}</p>
                  <p className="text-[11px] uppercase tracking-wider text-ink/60">
                    {a.ville} · {a.date}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <Etoiles note={a.note} />
              </div>
              <p className="mt-3 text-sm leading-relaxed text-ink">{a.texte}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
