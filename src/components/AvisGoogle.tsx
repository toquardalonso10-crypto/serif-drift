import { useEffect, useState } from "react";
import { Star, ExternalLink } from "lucide-react";
import { SerifGlow } from "./SerifGlow";

type GoogleReview = {
  authorName: string;
  rating: number;
  text: string;
  relativeTime: string;
};

type ReviewsPayload = {
  rating: number | null;
  userRatingCount: number;
  reviews: GoogleReview[];
  googleMapsUri: string;
  writeReviewUri: string;
};

function Etoiles({ note }: { note: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          className={`h-4 w-4 ${i < Math.round(note) ? "fill-ochre text-ochre" : "text-bark/25"}`}
        />
      ))}
    </div>
  );
}

/**
 * Affiche les vrais avis Google de la fiche de l'entreprise, récupérés en
 * direct via l'API Google Places (jamais de note ou d'avis inventé). Tant
 * qu'aucun avis n'existe sur la fiche, invite les visiteurs à laisser le
 * premier, avec un lien vers la vraie page Google.
 */
export function AvisGoogle() {
  const [data, setData] = useState<ReviewsPayload | null>(null);
  const [erreur, setErreur] = useState(false);

  useEffect(() => {
    fetch("/api/google-reviews")
      .then((res) => {
        if (!res.ok) throw new Error("Erreur");
        return res.json() as Promise<ReviewsPayload>;
      })
      .then(setData)
      .catch(() => setErreur(true));
  }, []);

  if (erreur) return null;

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
          {data && data.userRatingCount > 0 ? (
            <div className="flex items-center gap-3 rounded-full border border-bark/15 bg-card px-4 py-2 shadow-rustic">
              <span className="text-2xl font-extrabold text-bark">{data.rating?.toFixed(1)}</span>
              <div>
                <Etoiles note={data.rating ?? 0} />
                <a
                  href={data.googleMapsUri}
                  target="_blank"
                  rel="noreferrer"
                  className="text-[11px] text-ink/70 underline-offset-2 hover:underline"
                >
                  {data.userRatingCount} avis Google vérifiés
                </a>
              </div>
            </div>
          ) : null}
        </div>

        {data === null ? (
          <p className="text-sm text-ink/60">Chargement des avis…</p>
        ) : data.userRatingCount === 0 ? (
          <div className="rounded-2xl border border-bark/12 bg-card p-8 text-center shadow-rustic">
            <p className="text-base font-medium text-bark">
              Notre fiche Google est toute neuve — soyez le premier à partager votre expérience !
            </p>
            <a
              href={data.writeReviewUri}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5"
            >
              Laisser un avis Google <ExternalLink className="h-4 w-4" />
            </a>
          </div>
        ) : (
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {data.reviews.map((avis) => (
              <article
                key={`${avis.authorName}-${avis.relativeTime}`}
                className="h-full rounded-xl border border-bark/10 bg-card p-6 shadow-rustic"
              >
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-bark">{avis.authorName}</p>
                  <p className="text-[11px] uppercase tracking-wider text-ink/60">
                    {avis.relativeTime}
                  </p>
                </div>
                <div className="mt-3">
                  <Etoiles note={avis.rating} />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-ink">{avis.text}</p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
