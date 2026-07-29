import { motion } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import { SerifGlow } from "./SerifGlow";

const FORMULES = [
  {
    nom: "Essentiel",
    prix: "49",
    rythme: "par mois",
    resume: "Le jardin toujours net, sans y penser.",
    inclus: [
      "1 passage par mois",
      "Tonte et finitions au rotofil",
      "Ramassage et évacuation des déchets",
      "Rappel SMS la veille du passage",
    ],
    accent: false,
  },
  {
    nom: "Confort",
    prix: "89",
    rythme: "par mois",
    resume: "La formule la plus choisie en Charente-Maritime.",
    inclus: [
      "2 passages par mois",
      "Taille des haies 2 fois par an",
      "Désherbage des massifs et allées",
      "Diagnostic annuel de vos arbres",
      "Intervention prioritaire après tempête",
    ],
    accent: true,
  },
  {
    nom: "Domaine",
    prix: "169",
    rythme: "par mois",
    resume: "Pour les grands terrains et propriétés arborées.",
    inclus: [
      "4 passages par mois",
      "Élagage inclus jusqu'à 3 arbres / an",
      "Vergers, palissage et paillage",
      "Broyage sur place offert",
      "Interlocuteur dédié 7j/7",
    ],
    accent: false,
  },
];

export function Abonnements() {
  return (
    <section id="abonnements" className="bg-cream py-20 paper-grain">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="mb-12 max-w-2xl">
          <p className="text-luxe-eyebrow text-terracotta">
            Entretien à l'année
          </p>
          <h2 className="mt-3 flex flex-wrap items-baseline gap-3 text-4xl font-medium text-bark md:text-5xl">
            Un abonnement,
            <SerifGlow
              word="zéro corvée"
              fontSize={50}
              strokeWidth={12}
              italic
              inView
              delay={0.3}
            />
          </h2>
          <p className="mt-4 text-[15px] leading-relaxed text-ink">
            Nos formules mensuelles d'entretien de jardin : sans engagement,
            résiliables à tout moment, et éligibles au crédit d'impôt de 50 %.
          </p>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {FORMULES.map((f, i) => (
            <motion.article
              key={f.nom}
              initial={{ opacity: 0, y: 26 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              whileHover={{ y: -6 }}
              className={`relative flex flex-col rounded-2xl p-7 ${
                f.accent
                  ? "border-gold-hairline bg-bark text-cream shadow-luxe"
                  : "border border-bark/12 bg-card text-bark shadow-rustic"
              }`}
            >
              {f.accent && (
                <span className="absolute -top-3 left-7 inline-flex items-center gap-1.5 rounded-full bg-gold-foil px-3 py-1 text-[10px] font-bold uppercase tracking-[0.2em] text-bark">
                  <Sparkles className="h-3 w-3" /> Le plus choisi
                </span>
              )}
              <h3 className="font-serif text-3xl">{f.nom}</h3>
              <p
                className={`mt-1 text-sm ${f.accent ? "text-cream/70" : "text-ink/75"}`}
              >
                {f.resume}
              </p>
              <p className="mt-6 flex items-baseline gap-2">
                <span className="text-5xl font-extrabold tracking-tight">
                  {f.prix}€
                </span>
                <span
                  className={`text-xs uppercase tracking-widest ${f.accent ? "text-cream/60" : "text-ink/60"}`}
                >
                  {f.rythme}
                </span>
              </p>
              <ul className="mt-6 space-y-2.5 text-sm">
                {f.inclus.map((item) => (
                  <li key={item} className="flex gap-2.5">
                    <Check
                      className={`mt-0.5 h-4 w-4 shrink-0 ${f.accent ? "text-moss" : "text-forest"}`}
                    />
                    <span className={f.accent ? "text-cream/85" : "text-ink"}>
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
              <a
                href="#devis"
                className={`mt-8 rounded-full px-5 py-3 text-center text-sm font-semibold transition-transform hover:-translate-y-0.5 ${
                  f.accent
                    ? "bg-gold-foil text-bark"
                    : "bg-forest text-primary-foreground"
                }`}
              >
                Choisir {f.nom}
              </a>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
