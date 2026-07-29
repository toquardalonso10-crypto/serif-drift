import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Send, X, Loader2 } from "lucide-react";

type Message = { role: "user" | "assistant"; content: string };

const ACCUEIL: Message = {
  role: "assistant",
  content:
    "Bonjour ! Je suis Petit Chêne, la mascotte des Ets Toquard & Fils. Posez-moi vos questions sur nos interventions, nos abonnements ou nos secteurs.",
};

function Arbre({ parle }: { parle: boolean }) {
  return (
    <svg viewBox="0 0 64 64" className="h-11 w-11" aria-hidden="true">
      <ellipse cx="32" cy="58" rx="16" ry="3.5" fill="oklch(0.33 0.043 55 / 0.25)" />
      <rect x="28.5" y="36" width="7" height="20" rx="3" fill="oklch(0.33 0.043 55)" />
      <g>
        <circle cx="32" cy="26" r="17" fill="var(--forest)" />
        <circle cx="20" cy="31" r="10" fill="var(--moss)" />
        <circle cx="44" cy="31" r="9" fill="var(--moss)" />
      </g>
      <circle cx="26" cy="26" r="2.4" fill="oklch(0.98 0.01 90)" />
      <circle cx="38" cy="26" r="2.4" fill="oklch(0.98 0.01 90)" />
      <circle cx="26.6" cy="26.4" r="1.2" fill="oklch(0.25 0.03 60)" />
      <circle cx="38.6" cy="26.4" r="1.2" fill="oklch(0.25 0.03 60)" />
      {parle ? (
        <ellipse cx="32" cy="33" rx="3.2" ry="2.6" fill="oklch(0.25 0.03 60)" />
      ) : (
        <path
          d="M28 32.5c1.6 2.2 6.4 2.2 8 0"
          stroke="oklch(0.25 0.03 60)"
          strokeWidth="1.6"
          strokeLinecap="round"
          fill="none"
        />
      )}
      <circle cx="22.5" cy="30.5" r="1.6" fill="var(--terracotta)" opacity="0.55" />
      <circle cx="41.5" cy="30.5" r="1.6" fill="var(--terracotta)" opacity="0.55" />
    </svg>
  );
}

export function ChatArbre() {
  const [ouvert, setOuvert] = useState(false);
  const [messages, setMessages] = useState<Message[]>([ACCUEIL]);
  const [saisie, setSaisie] = useState("");
  const [chargement, setChargement] = useState(false);
  const fin = useRef<HTMLDivElement>(null);
  const champ = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fin.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chargement]);

  useEffect(() => {
    if (ouvert) champ.current?.focus();
  }, [ouvert]);

  const envoyer = async (e: React.FormEvent) => {
    e.preventDefault();
    const texte = saisie.trim();
    if (!texte || chargement) return;
    const suite: Message[] = [...messages, { role: "user", content: texte }];
    setMessages(suite);
    setSaisie("");
    setChargement(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: suite }),
      });
      const data = (await res.json()) as { text?: string; error?: string };
      setMessages([
        ...suite,
        {
          role: "assistant",
          content:
            data.text ??
            "Je n'arrive pas à répondre là tout de suite — appelez-nous au 05 46 00 00 00 !",
        },
      ]);
    } catch {
      setMessages([
        ...suite,
        {
          role: "assistant",
          content:
            "Petite branche cassée dans la connexion… Réessayez ou appelez le 05 46 00 00 00.",
        },
      ]);
    } finally {
      setChargement(false);
      champ.current?.focus();
    }
  };

  return (
    <>
      <motion.button
        type="button"
        onClick={() => setOuvert((o) => !o)}
        aria-label="Discuter avec Petit Chêne"
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
        className="fixed bottom-5 left-5 z-[70] grid h-16 w-16 place-items-center rounded-full border-gold-hairline bg-cream shadow-luxe"
      >
        <Arbre parle={ouvert} />
        <span className="absolute -right-1 -top-1 h-3.5 w-3.5 rounded-full bg-terracotta ring-2 ring-cream" />
      </motion.button>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 16, scale: 0.97 }}
            transition={{ type: "spring", stiffness: 280, damping: 26 }}
            className="fixed bottom-24 left-4 z-[70] flex h-[26rem] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border-gold-hairline bg-cream shadow-luxe"
          >
            <div className="flex items-center gap-3 bg-canopy px-4 py-3 text-primary-foreground">
              <Arbre parle />
              <div className="flex-1">
                <p className="text-sm font-bold">Petit Chêne</p>
                <p className="text-[11px] opacity-80">
                  Vos questions sur l'entreprise
                </p>
              </div>
              <button
                type="button"
                onClick={() => setOuvert(false)}
                aria-label="Fermer le chat"
                className="rounded-full p-1.5 transition-colors hover:bg-bark/20"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div
                  key={i}
                  className={m.role === "user" ? "flex justify-end" : ""}
                >
                  <p
                    className={`max-w-[85%] whitespace-pre-wrap text-sm leading-relaxed ${
                      m.role === "user"
                        ? "rounded-2xl rounded-br-sm bg-forest px-3.5 py-2 text-primary-foreground"
                        : "text-bark"
                    }`}
                  >
                    {m.content}
                  </p>
                </div>
              ))}
              {chargement && (
                <p className="flex items-center gap-2 text-sm text-ink/60">
                  <Loader2 className="h-3.5 w-3.5 animate-spin" /> Petit Chêne
                  réfléchit…
                </p>
              )}
              <div ref={fin} />
            </div>

            <form
              onSubmit={envoyer}
              className="flex items-center gap-2 border-t border-bark/12 bg-card px-3 py-3"
            >
              <input
                ref={champ}
                value={saisie}
                onChange={(e) => setSaisie(e.target.value)}
                placeholder="Votre question…"
                className="flex-1 rounded-full border border-bark/20 bg-cream px-3.5 py-2 text-sm text-bark outline-none placeholder:text-ink/45 focus:border-forest"
              />
              <button
                type="submit"
                disabled={chargement}
                aria-label="Envoyer"
                className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-forest text-primary-foreground disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
