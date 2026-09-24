import { createFileRoute } from "@tanstack/react-router";
import { BUSINESS } from "@/lib/seo";

type DevisPayload = {
  prenom?: string;
  nom?: string;
  tel?: string;
  email?: string;
  ville?: string;
  chantier?: string;
  message?: string;
};

function escapeHtml(value: string) {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

export const Route = createFileRoute("/api/devis")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const body = (await request.json()) as DevisPayload;
        const { prenom, nom, tel, email, ville, chantier, message } = body;

        if (!prenom || !nom || !tel || !email || !ville) {
          return new Response("Champs requis manquants", { status: 400 });
        }

        const key = process.env.RESEND_API_KEY;
        if (!key) return new Response("Missing RESEND_API_KEY", { status: 500 });

        const html = `
          <h2>Nouvelle demande de devis</h2>
          <p><strong>${escapeHtml(prenom)} ${escapeHtml(nom)}</strong></p>
          <p>Téléphone : ${escapeHtml(tel)}</p>
          <p>E-mail : ${escapeHtml(email)}</p>
          <p>Commune : ${escapeHtml(ville)}</p>
          <p>Type de chantier : ${escapeHtml(chantier ?? "Non précisé")}</p>
          <p>Message :<br />${escapeHtml(message ?? "—").replace(/\n/g, "<br />")}</p>
        `;

        try {
          const res = await fetch("https://api.resend.com/emails", {
            method: "POST",
            headers: {
              Authorization: `Bearer ${key}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              from: "Ets Toquard & Fils <devis@etstoquardetfils.com>",
              to: BUSINESS.email,
              reply_to: email,
              subject: `Devis — ${prenom} ${nom} (${ville})`,
              html,
            }),
          });

          if (!res.ok) {
            const errorText = await res.text();
            return Response.json({ error: errorText }, { status: res.status });
          }

          return Response.json({ ok: true });
        } catch (error) {
          const message = error instanceof Error ? error.message : "Erreur";
          return Response.json({ error: message }, { status: 500 });
        }
      },
    },
  },
});
