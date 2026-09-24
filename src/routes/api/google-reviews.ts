import { createFileRoute } from "@tanstack/react-router";

// Fiche Google réelle "ets toquard et fils", Av. de Saintonge, Tonnay-Charente.
export const GOOGLE_PLACE_ID = "ChIJsTzU03A_AUgRf8ZRH71c-GE";

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

export const Route = createFileRoute("/api/google-reviews")({
  server: {
    handlers: {
      GET: async () => {
        const key = process.env.GOOGLE_PLACES_API_KEY;
        const writeReviewUri = `https://search.google.com/local/writereview?placeid=${GOOGLE_PLACE_ID}`;

        if (!key) {
          return Response.json({ error: "Missing GOOGLE_PLACES_API_KEY" }, { status: 500 });
        }

        try {
          const res = await fetch(`https://places.googleapis.com/v1/places/${GOOGLE_PLACE_ID}`, {
            headers: {
              "X-Goog-Api-Key": key,
              "X-Goog-FieldMask": "rating,userRatingCount,reviews,googleMapsUri",
              "Accept-Language": "fr",
            },
          });

          if (!res.ok) {
            const text = await res.text();
            return Response.json({ error: text }, { status: res.status });
          }

          const data = (await res.json()) as {
            rating?: number;
            userRatingCount?: number;
            googleMapsUri?: string;
            reviews?: {
              authorAttribution?: { displayName?: string };
              rating?: number;
              text?: { text?: string };
              relativePublishTimeDescription?: string;
            }[];
          };

          const payload: ReviewsPayload = {
            rating: data.rating ?? null,
            userRatingCount: data.userRatingCount ?? 0,
            googleMapsUri: data.googleMapsUri ?? "https://maps.google.com",
            writeReviewUri,
            reviews: (data.reviews ?? []).slice(0, 5).map((r) => ({
              authorName: r.authorAttribution?.displayName ?? "Client Google",
              rating: r.rating ?? 5,
              text: r.text?.text ?? "",
              relativeTime: r.relativePublishTimeDescription ?? "",
            })),
          };

          return Response.json(payload);
        } catch (error) {
          const message = error instanceof Error ? error.message : "Erreur";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
