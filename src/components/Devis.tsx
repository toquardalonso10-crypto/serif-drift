import { type FormEvent, useState } from "react";
import { motion } from "framer-motion";
import { Send } from "lucide-react";
import { toast } from "sonner";
import { SerifGlow } from "./SerifGlow";

export function Devis() {
  const [envoi, setEnvoi] = useState(false);

  const envoyer = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const prenom = String(data.get("prenom") ?? "");
    setEnvoi(true);
    try {
      const res = await fetch("/api/devis", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      if (!res.ok) throw new Error("Échec de l'envoi");
      toast.success(`Merci ${prenom} ! Votre demande est partie, on vous rappelle sous 24 h.`);
      form.reset();
    } catch {
      toast.error(
        "Impossible d'envoyer votre demande — appelez-nous directement au 07 78 26 00 88.",
      );
    } finally {
      setEnvoi(false);
    }
  };

  const champ =
    "w-full rounded-md border border-bark/20 bg-card px-3 py-2.5 text-sm text-bark outline-none transition-colors placeholder:text-ink/45 focus:border-forest focus:ring-2 focus:ring-forest/25";

  return (
    <section id="devis" className="bg-bark py-20">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr]">
        <div>
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ochre">
            Devis gratuit &amp; sans engagement
          </p>
          <h2 className="mt-3 flex flex-wrap items-baseline gap-3 text-4xl font-medium text-cream md:text-5xl">
            Demandez votre
            <SerifGlow
              word="devis"
              fontSize={56}
              strokeWidth={13}
              italic
              inView
              delay={0.4}
              fill="var(--bark)"
            />
          </h2>
          <p className="mt-5 max-w-sm text-sm leading-relaxed text-cream/65">
            Laissez vos coordonnées et décrivez le chantier. Nous passons mesurer sur place, puis
            vous recevez le devis définitif par mail sous 48 h.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-cream/80">
            {[
              "Déplacement gratuit dans toute la Charente-Maritime",
              "Attestation crédit d'impôt de 50 % fournie",
              "Entreprise assurée MAAF — décennale et RC pro",
            ].map((l) => (
              <li key={l} className="flex gap-2">
                <span className="mt-1 h-2 w-2 shrink-0 rounded-full bg-ochre" />
                {l}
              </li>
            ))}
          </ul>
        </div>

        <motion.form
          onSubmit={envoyer}
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
          className="rounded-xl bg-cream p-6 shadow-lift md:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="devis-prenom"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Prénom
              </label>
              <input
                id="devis-prenom"
                name="prenom"
                required
                className={champ}
                placeholder="Marie"
              />
            </div>
            <div>
              <label
                htmlFor="devis-nom"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Nom
              </label>
              <input id="devis-nom" name="nom" required className={champ} placeholder="Dupont" />
            </div>
            <div>
              <label
                htmlFor="devis-tel"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Téléphone
              </label>
              <input
                id="devis-tel"
                name="tel"
                type="tel"
                required
                className={champ}
                placeholder="06 12 34 56 78"
              />
            </div>
            <div>
              <label
                htmlFor="devis-email"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                E-mail
              </label>
              <input
                id="devis-email"
                name="email"
                type="email"
                required
                className={champ}
                placeholder="marie@exemple.fr"
              />
            </div>
            <div>
              <label
                htmlFor="devis-ville"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Commune
              </label>
              <input
                id="devis-ville"
                name="ville"
                required
                className={champ}
                placeholder="Saintes"
              />
            </div>
            <div>
              <label
                htmlFor="devis-chantier"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
              >
                Type de chantier
              </label>
              <select id="devis-chantier" name="chantier" className={champ} defaultValue="Élagage">
                {[
                  "Élagage / taille douce",
                  "Abattage",
                  "Démontage par cordes",
                  "Haies et vergers",
                  "Dessouchage",
                  "Urgence tempête",
                ].map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label
              htmlFor="devis-message"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-ink"
            >
              Décrivez vos arbres
            </label>
            <textarea
              id="devis-message"
              name="message"
              rows={3}
              className={champ}
              placeholder="Deux chênes d'une quinzaine de mètres au fond du jardin, accès par le portail…"
            />
          </div>

          <label className="mt-5 flex items-start gap-2 text-xs leading-relaxed text-ink">
            <input type="checkbox" required className="mt-0.5 accent-[var(--forest)]" />
            J'accepte que Ets Toquard &amp; Fils utilise ces informations pour me recontacter au
            sujet de mon devis.
          </label>

          <button
            type="submit"
            disabled={envoi}
            className="mt-6 inline-flex w-full items-center justify-center gap-2 rounded-full bg-sunset px-6 py-3.5 text-sm font-bold text-bark shadow-rustic transition-transform hover:-translate-y-0.5 disabled:opacity-60"
          >
            <Send className="h-4 w-4" /> {envoi ? "Envoi en cours…" : "Envoyer ma demande"}
          </button>
        </motion.form>
      </div>
    </section>
  );
}
