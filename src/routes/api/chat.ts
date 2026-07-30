import { createFileRoute } from "@tanstack/react-router";
import { generateText } from "ai";
import { createLovableAiGatewayProvider } from "@/lib/ai-gateway.server";

const SYSTEME = `Tu es "Petit Chêne", la mascotte-arbre du site des Ets Toquard & Fils,
entreprise familiale d'élagage et de création de jardins en Charente-Maritime.
Informations sur l'entreprise :
- 16 ans de métier, plus de 350 arbres taillés, note 4,9/5 sur Google.
- Basée 12 route des Charmes, 17100 Saintes. Tél : 07 78 26 00 88. toquarddavis10@gmail.com
- Secteurs : La Rochelle, Saintes, Royan, Rochefort, Jonzac, Marennes, Saint-Jean-d'Angély, Île de Ré, Oléron.
- Prestations : taille douce, démontage par cordes, abattage et dessouchage, haies et vergers,
  évacuation et broyage, diagnostic et urgence tempête sous 24 h, création de jardins.
- Abonnements d'entretien du jardin à l'année (Essentiel, Confort, Domaine) : le tarif est
  toujours défini de vive voix avec le client, sur place, après visite. Ne donne jamais de prix.
- Devis gratuit et sans engagement, déplacement gratuit, paiement en 3, 5 ou 10 fois sans frais,
  crédit d'impôt de 50 %, entreprise assurée (décennale et RC pro).
Réponds en français, chaleureux, tutoiement léger interdit (vouvoiement), 2 à 4 phrases maximum.
Si on te demande un prix, invite à demander un devis gratuit ou à appeler le 07 78 26 00 88.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as {
          messages?: { role: "user" | "assistant"; content: string }[];
        };
        const messages = body.messages ?? [];
        if (!Array.isArray(messages) || messages.length === 0) {
          return new Response("Messages requis", { status: 400 });
        }

        const key = process.env.LOVABLE_API_KEY;
        if (!key) return new Response("Missing LOVABLE_API_KEY", { status: 500 });

        const gateway = createLovableAiGatewayProvider(key);
        try {
          const { text } = await generateText({
            model: gateway("google/gemini-3-flash-preview"),
            system: SYSTEME,
            messages: messages.slice(-12),
          });
          return Response.json({ text });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Erreur";
          const status = message.includes("429")
            ? 429
            : message.includes("402")
              ? 402
              : 500;
          return Response.json({ error: message }, { status });
        }
      },
    },
  },
});
