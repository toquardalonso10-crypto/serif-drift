import { motion } from "framer-motion";
import { Phone, Leaf, Star } from "lucide-react";
import { SerifGlow } from "./SerifGlow";
import { BandeauPaiement } from "./BandeauPaiement";
import { JardinIA } from "./JardinIA";

export function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-cream paper-grain">
      {/* Bandeau haut */}
      <div className="fixed inset-x-0 top-0 z-50">
        <BandeauPaiement />
        <nav className="flex items-center justify-between gap-6 bg-cream/85 px-5 py-3 backdrop-blur md:px-8">
          <a href="#top" className="flex items-center gap-2">
            <span className="grid h-9 w-9 place-items-center rounded-full bg-canopy text-primary-foreground">
              <Leaf className="h-5 w-5" />
            </span>
            <span className="text-sm font-extrabold uppercase tracking-[0.18em] text-bark">
              Ets Toquard <span className="text-terracotta">&amp;</span> Fils
            </span>
          </a>
          <div className="hidden items-center gap-7 text-sm text-ink md:flex">
            <a className="transition-opacity hover:opacity-60" href="#meteo">
              Météo
            </a>
            <a className="transition-opacity hover:opacity-60" href="#chantiers">
              Avant / Après
            </a>
            <a
              className="transition-opacity hover:opacity-60"
              href="#abonnements"
            >
              Abonnements
            </a>
            <a className="transition-opacity hover:opacity-60" href="#avis">
              Avis
            </a>
            <a className="transition-opacity hover:opacity-60" href="#devis">
              Devis
            </a>
          </div>
        </nav>
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 pt-32 pb-16 md:px-8 lg:grid-cols-[1.05fr_1fr] lg:pt-40">
        <div className="relative z-10">
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="mb-5 inline-flex items-center gap-2 rounded-full border-gold-hairline bg-ochre/30 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-bark backdrop-blur"
          >
            <Star className="h-3.5 w-3.5 fill-terracotta text-terracotta" />
            Artisans élagueurs — Charente-Maritime
          </motion.p>


          <motion.h1
            className="text-bark"
            initial="hidden"
            animate="show"
            style={{ lineHeight: 0.92 }}
          >
            <motion.span
              className="block text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-[84px]"
              initial={{ opacity: 0, filter: "blur(14px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
            >
              On taille haut,
            </motion.span>
            <motion.span
              className="block text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-[84px]"
              initial={{ opacity: 0, filter: "blur(14px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.8, delay: 0.28, ease: "easeOut" }}
            >
              on coupe net,
            </motion.span>
            <span className="mt-1 flex flex-wrap items-baseline gap-3">
              <SerifGlow
                word="proprement"
                fontSize={64}
                strokeWidth={14}
                italic
                delay={0.5}
              />
              <motion.span
                className="text-[13vw] font-medium leading-[0.92] tracking-[-0.04em] sm:text-6xl lg:text-[84px]"
                initial={{ opacity: 0, filter: "blur(12px)" }}
                animate={{ opacity: 1, filter: "blur(0px)" }}
                transition={{ duration: 0.7, delay: 0.78, ease: "easeOut" }}
              >
                .
              </motion.span>
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.9 }}
            className="mt-6 max-w-md text-[15px] leading-relaxed text-ink"
          >
            Élagage, abattage délicat, taille douce et démontage par cordes. De
            La Rochelle à Jonzac, on grimpe dans vos arbres depuis 16 ans —
            assurés, équipés, et on ramasse tout avant de partir. Paiement en 3,
            5 ou 10 fois sans frais.

          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 1.05 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#devis"
              className="rounded-full bg-sunset px-6 py-3 text-sm font-semibold text-bark shadow-rustic transition-transform hover:-translate-y-0.5"
            >
              Demander un devis
            </a>
            <a
              href="tel:+33778260088"
              className="inline-flex items-center gap-2 rounded-full border-2 border-bark/20 px-5 py-3 text-sm font-semibold text-bark transition-colors hover:bg-bark/5"
            >
              <Phone className="h-4 w-4" /> 07 78 26 00 88
            </a>
          </motion.div>

          <motion.dl
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1.2 }}
            className="mt-10 grid max-w-lg grid-cols-3 gap-4 border-t border-bark/15 pt-6"
          >
            {[
              ["16 ans", "de métier"],
              ["350+", "arbres taillés"],
              ["4,9/5", "sur Google"],

            ].map(([k, v]) => (
              <div key={k}>
                <dt className="text-2xl font-extrabold text-forest">{k}</dt>
                <dd className="text-xs uppercase tracking-wider text-ink/70">
                  {v}
                </dd>
              </div>
            ))}
          </motion.dl>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 60, rotate: 2 }}
          animate={{ opacity: 1, y: 0, rotate: 0 }}
          transition={{ duration: 1.1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <JardinIA />


          <motion.div
            initial={{ opacity: 0, scale: 0.5, rotate: -18 }}
            animate={{ opacity: 1, scale: 1, rotate: -8 }}
            transition={{ duration: 0.5, delay: 1.3, ease: [0.34, 1.56, 0.64, 1] }}
            className="absolute -bottom-6 -left-4 rounded-full bg-forest px-5 py-4 text-center text-primary-foreground shadow-lift md:-left-10"
          >
            <span className="block text-xl font-extrabold leading-none">
              -50%
            </span>
            <span className="text-[10px] uppercase tracking-widest">
              crédit d'impôt
            </span>
          </motion.div>

          <motion.div
            animate={{ y: [0, -8, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -right-3 top-8 rotate-6 rounded-sm bg-ochre px-3 py-2 text-[11px] font-bold uppercase tracking-widest text-bark shadow-rustic"
          >
            Certifié grimpeur-élagueur
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
