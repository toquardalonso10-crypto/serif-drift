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
        const { prompt, photo } = (await request.json()) as {
          prompt?: string;
          photo?: string;
        };
        const aPhoto = typeof photo === "string" && photo.startsWith("data:image/");
        if ((!prompt || prompt.trim().length < 3) && !aPhoto) {
          return Response.json({ error: "Décrivez votre jardin." }, { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const consigne = aPhoto
          ? `Transforme cette photo du jardin du client en une version réaliste après intervention
d'un paysagiste professionnel : conserve exactement le même cadrage, la même maison, les mêmes
arbres existants et le même point de vue. Taille les haies, nettoie les massifs, soigne la pelouse
et aménage selon le souhait du client. Rendu photographique, lumière naturelle de fin d'après-midi
en Charente-Maritime.
Souhait du client : ${prompt?.trim() || "un jardin net, entretenu et harmonieux"}`
          : `Photographie réaliste, lumière naturelle de fin d'après-midi en Charente-Maritime,
grand angle, rendu paysagiste professionnel d'un jardin fraîchement aménagé et entretenu.
Souhait du client : ${prompt!.trim()}`;

        const content = aPhoto
          ? [
              { type: "text", text: consigne },
              { type: "image_url", image_url: { url: photo } },
            ]
          : consigne;

        const res = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
          method: "POST",
          headers: {
            "Lovable-API-Key": key,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            model: "google/gemini-3-pro-image-preview",
            messages: [{ role: "user", content }],
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
