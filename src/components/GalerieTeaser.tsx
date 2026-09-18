import { motion } from "framer-motion";
import { ArrowRight, Camera } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SerifGlow } from "./SerifGlow";

export function GalerieTeaser() {
  return (
    <section className="overflow-hidden bg-bark py-20 paper-grain">
      <div className="mx-auto max-w-4xl px-5 text-center md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <span className="mb-6 inline-flex items-center gap-2 rounded-full border-gold-hairline bg-cream/10 px-4 py-1.5 text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/80">
            <Camera className="h-3.5 w-3.5 text-ochre" /> Nos réalisations
          </span>

          <h2 className="flex flex-wrap items-baseline justify-center gap-3 text-4xl font-medium text-cream md:text-5xl">
            Découvrez la galerie photo de
            <br />
            <SerifGlow
              word="ETS Toquard & Fils"
              fontSize={44}
              strokeWidth={10}
              italic
              inView
              delay={0.2}
              fill="var(--bark)"
            />
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-relaxed text-cream/70">
            Tailles de haies, élagages, abattages et jardins remis en état :
            tous nos chantiers en images.
          </p>

          <Link
            to="/realisations"
            className="group mt-9 inline-flex items-center gap-3 rounded-full bg-canopy px-8 py-4 text-sm font-semibold uppercase tracking-[0.18em] text-primary-foreground shadow-luxe transition-transform duration-300 hover:-translate-y-0.5"
          >
            Voir la galerie
            <ArrowRight className="h-4 w-4 text-ochre transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
