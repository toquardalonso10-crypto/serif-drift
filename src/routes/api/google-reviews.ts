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

        const fallback: ReviewsPayload = {
          rating: null,
          userRatingCount: 0,
          reviews: [],
          googleMapsUri: `https://www.google.com/maps/place/?q=place_id:${GOOGLE_PLACE_ID}`,
          writeReviewUri,
        };

        if (!key) {
          console.warn("google-reviews: GOOGLE_PLACES_API_KEY manquante");
          return Response.json(fallback);
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
            console.warn("google-reviews:", res.status, await res.text());
            return Response.json(fallback);
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
          console.warn("google-reviews:", error instanceof Error ? error.message : error);
          return Response.json(fallback);
        }
      },
    },
  },
});
