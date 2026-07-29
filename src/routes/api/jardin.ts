import { createFileRoute } from "@tanstack/react-router";

type GatewayResponse = {
  choices?: {
    message?: {
      images?: { image_url?: { url?: string } }[];
      content?: string;
    };
  }[];
  error?: { message?: string };
};

export const Route = createFileRoute("/api/jardin")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const { prompt } = (await request.json()) as { prompt?: string };
        if (!prompt || prompt.trim().length < 3) {
          return Response.json({ error: "Décrivez votre jardin." }, { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const consigne = `Photographie réaliste, lumière naturelle de fin d'après-midi en Charente-Maritime,
grand angle, rendu paysagiste professionnel d'un jardin fraîchement aménagé et entretenu.
Souhait du client : ${prompt.trim()}`;

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Lovable-API-Key": key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-pro-image-preview",
            messages: [{ role: "user", content: consigne }],
            modalities: ["image", "text"],
          }),
        });

        if (!res.ok) {
          const detail = await res.text();
          return Response.json(
            {
              error:
                res.status === 429
                  ? "Trop de demandes d'aperçu, réessayez dans un instant."
                  : res.status === 402
                    ? "Le générateur d'aperçu est momentanément indisponible."
                    : detail.slice(0, 200),
            },
            { status: res.status },
          );
        }

        const data = (await res.json()) as GatewayResponse;
        const image = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
        if (!image) {
          return Response.json(
            { error: "Aucun aperçu généré, reformulez votre envie de jardin." },
            { status: 502 },
          );
        }

        return Response.json({
          image,
          texte: data.choices?.[0]?.message?.content ?? "",
        });
      },
    },
  },
});
