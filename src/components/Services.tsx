import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Axe,
  Scissors,
  TreeDeciduous,
  Truck,
  ShieldCheck,
  Sprout,
} from "lucide-react";

const SERVICES = [
  {
    icon: Scissors,
    titre: "Taille douce & raisonnée",
    texte:
      "Éclaircie, réduction, taille de formation. On respecte la physiologie de l'arbre, pas de têtard sauvage.",
    couleur: "bg-forest text-primary-foreground",
    num: "01",
  },
  {
    icon: TreeDeciduous,
    titre: "Démontage par cordes",
    texte:
      "Arbre en surplomb d'une maison, d'un mur en pierre ou d'une piscine : on descend pièce par pièce.",
    couleur: "bg-ochre text-bark",
    num: "02",
  },
  {
    icon: Axe,
    titre: "Abattage & dessouchage",
    texte:
      "Abattage directionnel, rognage de souche jusqu'à 40 cm sous le niveau du sol.",
    couleur: "bg-terracotta text-accent-foreground",
    num: "03",
  },
  {
    icon: Sprout,
    titre: "Haies & vergers",
    texte:
      "Taille de haies bocagères, entretien de vergers, palissage. Charente-Maritime et Sud Deux-Sèvres.",
    couleur: "bg-moss text-bark",
    num: "04",
  },
  {
    icon: Truck,
    titre: "Évacuation & broyage",
    texte:
      "Broyat laissé sur place en paillage ou emmené. Le terrain est rendu propre, garanti au râteau.",
    couleur: "bg-sky text-bark",
    num: "05",
  },
  {
    icon: ShieldCheck,
    titre: "Diagnostic & urgence tempête",
    texte:
      "Expertise d'arbre dangereux et intervention sous 24 h après coup de vent sur le littoral.",
    couleur: "bg-bark text-cream",
    num: "06",
  },
];

/**
 * "Les planches" — un accordéon en lattes de bois : six lamelles serrées
 * qui s'ouvrent une par une (horizontales sur mobile, verticales sur desktop).
 */
export function Services() {
  const [actif, setActif] = useState(0);

  return (
    <section id="services" className="bg-canopy py-20">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
          <div className="max-w-xl">
            <p className="text-luxe-eyebrow text-lime">Nos savoir-faire</p>
            <h2 className="mt-3 text-4xl font-medium leading-[0.95] text-primary-foreground md:text-5xl">
              Six lattes de bois,
              <br />
              <span className="font-serif italic text-lime">
                six façons de grimper
              </span>
            </h2>
          </div>
          <p className="max-w-xs text-sm leading-relaxed text-primary-foreground/70">
            Ouvrez une latte pour découvrir le savoir-faire qui se cache
            derrière.
          </p>
        </div>

        <div className="flex flex-col gap-2 md:h-[440px] md:flex-row">
          {SERVICES.map((s, i) => {
            const ouvert = actif === i;
            return (
              <motion.button
                key={s.titre}
                type="button"
                onClick={() => setActif(i)}
                onMouseEnter={() => setActif(i)}
                layout
                transition={{ type: "spring", stiffness: 210, damping: 26 }}
                animate={{ flexGrow: ouvert ? 5 : 1 }}
                aria-expanded={ouvert}
                className={`group relative flex min-h-[74px] flex-1 basis-0 overflow-hidden rounded-xl text-left shadow-rustic ring-1 ring-cream/10 md:min-h-0 ${s.couleur}`}
              >
                {/* veinures de bois */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute inset-0 opacity-[0.13] mix-blend-overlay"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, transparent 0 5px, currentColor 5px 6px, transparent 6px 13px)",
                  }}
                />

                {/* rail fermé */}
                <div className="relative z-10 flex shrink-0 items-center gap-3 p-5 md:w-[74px] md:flex-col md:items-start md:justify-between">
                  <span className="font-serif text-2xl leading-none opacity-60">
                    {s.num}
                  </span>
                  <s.icon className="h-6 w-6 shrink-0" />
                  <span
                    className={`text-sm font-bold md:hidden ${ouvert ? "opacity-100" : "opacity-80"}`}
                  >
                    {s.titre}
                  </span>
                  <span className="hidden whitespace-nowrap text-[11px] font-bold uppercase tracking-[0.24em] md:block md:[writing-mode:vertical-rl]">
                    {s.titre}
                  </span>
                </div>

                <AnimatePresence initial={false}>
                  {ouvert && (
                    <motion.div
                      key="corps"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.3, delay: 0.08 }}
                      className="relative z-10 flex min-w-0 flex-1 flex-col justify-end p-5 md:p-8"
                    >
                      <h3 className="hidden text-3xl font-medium leading-tight md:block">
                        {s.titre}
                      </h3>
                      <p className="mt-3 max-w-sm text-sm leading-relaxed opacity-85">
                        {s.texte}
                      </p>
                      <span className="mt-5 inline-flex w-fit items-center gap-2 rounded-full border border-current/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] opacity-80">
                        Devis gratuit
                      </span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
