import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, Check, Clock, Phone } from "lucide-react";
import { getService, SERVICES } from "@/data/services";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = getService(params.slug);
    if (!service) throw notFound();
    return { titre: service.titre, texte: service.texte };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return {
        meta: [
          { title: "Prestation introuvable — Ets Toquard & Fils" },
          { name: "robots", content: "noindex" },
        ],
      };
    }
    const title = `${loaderData.titre} — Ets Toquard & Fils`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.texte },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.texte },
        { property: "og:type", content: "article" },
        { name: "twitter:card", content: "summary_large_image" },
      ],
    };
  },
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useParams();
  const service = getService(slug)!;
  const autres = SERVICES.filter((s) => s.slug !== slug);
  const Icone = service.icon;

  return (
    <main className="bg-cream paper-grain">
      <header className={`${service.couleur} px-5 pb-16 pt-14 md:px-8`}>
        <div className="mx-auto max-w-4xl">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.24em] opacity-80 transition-opacity hover:opacity-100"
          >
            <ArrowLeft className="h-4 w-4" /> Retour à l'accueil
          </Link>
          <div className="mt-8 flex items-center gap-4">
            <Icone className="h-9 w-9" />
            <span className="font-serif text-3xl opacity-60">
              {service.num}
            </span>
          </div>
          <h1 className="mt-4 text-4xl font-medium leading-[0.98] md:text-6xl">
            {service.titre}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-relaxed opacity-85">
            {service.intro}
          </p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full border border-current/25 px-4 py-2 text-xs opacity-80">
            <Clock className="h-4 w-4" /> {service.duree}
          </p>
        </div>
      </header>

      <section className="px-5 py-16 md:px-8">
        <div className="mx-auto max-w-4xl">
          <p className="text-luxe-eyebrow text-terracotta">
            Comment on procède
          </p>
          <h2 className="mt-3 text-3xl font-medium text-bark md:text-4xl">
            Le déroulé du chantier
          </h2>

          <ol className="mt-10 space-y-4">
            {service.etapes.map((e, i) => (
              <motion.li
                key={e.titre}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.06 }}
                className="flex gap-5 rounded-2xl border border-bark/12 bg-card p-6 shadow-rustic"
              >
                <span className="font-serif text-3xl leading-none text-forest">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div>
                  <h3 className="text-lg font-bold text-bark">{e.titre}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink">
                    {e.texte}
                  </p>
                </div>
              </motion.li>
            ))}
          </ol>

          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border-gold-hairline bg-bark p-7 text-cream shadow-luxe">
              <h3 className="font-serif text-2xl">Le matériel utilisé</h3>
              <ul className="mt-4 space-y-2.5 text-sm">
                {service.materiel.map((m) => (
                  <li key={m} className="flex gap-2.5">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                    <span className="text-cream/85">{m}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col justify-between rounded-2xl border border-bark/12 bg-card p-7 shadow-rustic">
              <div>
                <h3 className="font-serif text-2xl text-bark">
                  Un projet similaire ?
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-ink">
                  On passe voir l'arbre ou la haie sur place, gratuitement, et
                  vous repartez avec un devis clair — éligible au crédit
                  d'impôt de 50 %.
                </p>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  hash="devis"
                  className="rounded-full bg-forest px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
                >
                  Demander un devis
                </Link>
                <a
                  href="tel:+33778260088"
                  className="inline-flex items-center gap-2 rounded-full border-2 border-bark/20 px-5 py-3 text-sm font-semibold text-bark transition-colors hover:bg-bark/5"
                >
                  <Phone className="h-4 w-4" /> 07 78 26 00 88
                </a>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <p className="text-luxe-eyebrow text-terracotta">
              Nos autres prestations
            </p>
            <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {autres.map((s) => (
                <Link
                  key={s.slug}
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className={`rounded-xl p-5 shadow-rustic transition-transform hover:-translate-y-1 ${s.couleur}`}
                >
                  <s.icon className="h-6 w-6" />
                  <span className="mt-3 block text-sm font-bold">
                    {s.titre}
                  </span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
