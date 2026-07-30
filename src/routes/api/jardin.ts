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
          ? `RETOUCHE PHOTO MINIMALE. Tu dois renvoyer EXACTEMENT la même photographie que celle
fournie, avec seulement 2 ou 3 petits ajustements d'entretien. Ce n'est pas une nouvelle image :
c'est la même photo, légèrement retouchée.

À conserver à l'identique, sans aucune modification : le cadrage, l'objectif et la perspective,
la maison et ses matériaux, les murs, clôtures, portails, allées, mobilier, véhicules, le ciel,
la météo, l'heure, la lumière et les ombres, la position et la taille de chaque arbre, haie,
massif et arbuste existants, ainsi que la qualité et le grain photographique d'origine.

Interdit : ajouter ou supprimer des plantes, arbres, arbustes, massifs, terrasses, piscines,
mobilier ou décors ; élargir ou recadrer la scène ; changer le style, la saison ou les couleurs ;
rendre l'image plus « belle », plus lumineuse ou plus spectaculaire ; produire un rendu 3D,
illustration ou photo de catalogue.

Autorisé uniquement : tailler proprement les haies et arbustes déjà présents, éclaircir légèrement
les branches des arbres déjà présents, tondre la pelouse existante, désherber et nettoyer les
massifs et allées, retirer les branches et déchets verts au sol.

Résultat attendu : on doit reconnaître immédiatement le même jardin, simplement fraîchement
entretenu. Photographie réaliste, identique à l'originale.
Demande du client (à appliquer avec la plus grande sobriété) : ${prompt?.trim() || "un entretien simple : haies taillées, pelouse tondue, massifs nettoyés"}`
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
