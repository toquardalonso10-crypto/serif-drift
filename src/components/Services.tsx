import { motion } from "framer-motion";
import { Axe, Scissors, TreeDeciduous, Truck, ShieldCheck, Sprout } from "lucide-react";

const SERVICES = [
  {
    icon: Scissors,
    titre: "Taille douce & raisonnée",
    texte:
      "Éclaircie, réduction, taille de formation. On respecte la physiologie de l'arbre, pas de têtard sauvage.",
    couleur: "bg-forest text-primary-foreground",
    num: "(01)",
  },
  {
    icon: TreeDeciduous,
    titre: "Démontage par cordes",
    texte:
      "Arbre en surplomb d'une maison, d'un mur en pierre ou d'une piscine : on descend pièce par pièce.",
    couleur: "bg-ochre text-bark",
    num: "(02)",
  },
  {
    icon: Axe,
    titre: "Abattage & dessouchage",
    texte:
      "Abattage directionnel, rognage de souche jusqu'à 40 cm sous le niveau du sol.",
    couleur: "bg-terracotta text-accent-foreground",
    num: "(03)",
  },
  {
    icon: Sprout,
    titre: "Haies & vergers",
    texte:
      "Taille de haies bocagères, entretien de vergers, palissage. Charente-Maritime et Sud Deux-Sèvres.",
    couleur: "bg-moss text-bark",
    num: "(04)",
  },
  {
    icon: Truck,
    titre: "Évacuation & broyage",
    texte:
      "Broyat laissé sur place en paillage ou emmené. Le terrain est rendu propre, garanti au râteau.",
    couleur: "bg-sky text-bark",
    num: "(05)",
  },
  {
    icon: ShieldCheck,
    titre: "Diagnostic & urgence tempête",
    texte:
      "Expertise d'arbre dangereux et intervention sous 24 h après coup de vent sur le littoral.",
    couleur: "bg-bark text-cream",
    num: "(06)",
  },
];

export function Services() {
  return (
    <section id="services" className="bg-canopy py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-lime">
            Nos savoir-faire
          </p>
          <h2 className="mt-3 text-4xl font-medium text-primary-foreground md:text-5xl">
            Six façons de s'occuper de vos arbres
          </h2>
        </div>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {SERVICES.map((s, i) => (
            <motion.article
              key={s.titre}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              whileHover={{ y: -6, rotate: i % 2 ? 0.8 : -0.8 }}
              className={`relative rounded-xl p-6 shadow-rustic ${s.couleur}`}
            >
              <span className="absolute right-4 top-3 font-serif text-lg opacity-45">
                {s.num}
              </span>
              <s.icon className="h-8 w-8" />
              <h3 className="mt-4 text-xl font-bold">{s.titre}</h3>
              <p className="mt-2 text-sm leading-relaxed opacity-85">{s.texte}</p>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
