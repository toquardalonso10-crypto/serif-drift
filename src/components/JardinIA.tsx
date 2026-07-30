import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Sparkles, X, Wand2, Loader2, TreePalm, ImagePlus, Trash2 } from "lucide-react";

const IDEES = [
  "Un jardin méditerranéen avec oliviers et gravier clair",
  "Une terrasse en bois entourée de graminées et lavandes",
  "Un potager en carrés avec allées de pas japonais",
  "Un jardin d'ombre sous grands chênes, fougères et hortensias",
];

const TAILLE_MAX = 8 * 1024 * 1024;

export function JardinIA() {
  const [ouvert, setOuvert] = useState(false);
  const [envie, setEnvie] = useState("");
  const [photo, setPhoto] = useState<string | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState<string | null>(null);
  const inputFichier = useRef<HTMLInputElement>(null);

  const choisirPhoto = (fichier?: File | null) => {
    if (!fichier) return;
    if (!fichier.type.startsWith("image/")) {
      setErreur("Choisissez une photo (JPG ou PNG).");
      return;
    }
    if (fichier.size > TAILLE_MAX) {
      setErreur("Photo trop lourde (8 Mo maximum).");
      return;
    }
    const lecteur = new FileReader();
    lecteur.onload = () => {
      setErreur(null);
      setPhoto(typeof lecteur.result === "string" ? lecteur.result : null);
    };
    lecteur.readAsDataURL(fichier);
  };

  const generer = async () => {
    if (!photo && envie.trim().length < 3) return;
    setChargement(true);
    setErreur(null);
    setImage(null);
    try {
      const res = await fetch("/api/jardin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt: envie, photo }),
      });
      const data = (await res.json()) as { image?: string; error?: string };
      if (!res.ok || !data.image) {
        setErreur(data.error ?? "Aperçu impossible pour le moment.");
      } else {
        setImage(data.image);
      }
    } catch {
      setErreur("Connexion interrompue, réessayez.");
    } finally {
      setChargement(false);
    }
  };


  return (
    <>
      {/* L'affiche cliquable */}
      <motion.button
        type="button"
        onClick={() => setOuvert(true)}
        whileHover={{ y: -6, rotate: 0 }}
        className="group relative block w-full rotate-[1.5deg] overflow-hidden rounded-sm border-8 border-card bg-bark text-left shadow-lift"
      >
        <div className="relative flex h-[52vh] flex-col justify-between bg-canopy p-6 text-primary-foreground md:h-[62vh] md:p-8">
          <div className="pointer-events-none absolute inset-0 opacity-25 [background-image:radial-gradient(oklch(1_0_0/0.5)_1px,transparent_1px)] [background-size:14px_14px]" />
          <div className="relative">
            <span className="inline-flex items-center gap-2 rounded-full border-gold-hairline bg-bark/35 px-3 py-1 text-luxe-eyebrow">
              <Sparkles className="h-3 w-3" /> Nouveau — création de jardins
            </span>
            <p className="mt-6 font-serif text-4xl italic leading-tight md:text-5xl">
              Dessinez le jardin
              <br />
              dont vous rêvez.
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed opacity-85">
              Décrivez votre envie, notre assistant vous en fait un aperçu en
              image en quelques secondes. On le réalise ensuite chez vous.
            </p>
          </div>
          <div className="relative flex items-center justify-between gap-4">
            <span className="rounded-full bg-gold-foil px-5 py-3 text-xs font-bold uppercase tracking-[0.2em] text-bark transition-transform group-hover:-translate-y-0.5">
              Cliquez pour créer
            </span>
            <TreePalm className="h-10 w-10 opacity-70" />
          </div>
        </div>
        <div className="flex items-center justify-between bg-card px-3 py-2 text-[11px] uppercase tracking-[0.2em] text-ink/70">
          <span>Création de jardins — sur mesure</span>
          <span className="font-serif text-base">(01)</span>
        </div>
      </motion.button>

      <AnimatePresence>
        {ouvert && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] grid place-items-center bg-bark/70 p-4 backdrop-blur-sm"
            onClick={() => setOuvert(false)}
          >
            <motion.div
              initial={{ opacity: 0, y: 28, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 260, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="max-h-[88vh] w-full max-w-3xl overflow-y-auto rounded-2xl border-gold-hairline bg-cream p-6 shadow-luxe md:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-luxe-eyebrow text-terracotta">
                    Atelier de création
                  </p>
                  <h3 className="mt-2 font-serif text-3xl italic text-bark">
                    Votre jardin, en aperçu
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setOuvert(false)}
                  aria-label="Fermer"
                  className="rounded-full border border-bark/15 p-2 text-bark transition-colors hover:bg-bark/5"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>

              <textarea
                value={envie}
                onChange={(e) => setEnvie(e.target.value)}
                rows={3}
                placeholder="Ex. : un jardin de bord de mer avec pins, graminées et terrasse en bois…"
                className="mt-5 w-full rounded-md border border-bark/20 bg-card px-3 py-2.5 text-sm text-bark outline-none placeholder:text-ink/45 focus:border-forest focus:ring-2 focus:ring-forest/25"
              />

              <div className="mt-3 flex flex-wrap gap-2">
                {IDEES.map((i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setEnvie(i)}
                    className="rounded-full border border-bark/15 bg-card px-3 py-1.5 text-[11px] text-ink transition-colors hover:bg-ochre/30"
                  >
                    {i}
                  </button>
                ))}
              </div>


              <div className="mt-5 rounded-xl border border-dashed border-bark/25 bg-card/60 p-4">
                <p className="text-luxe-eyebrow text-terracotta">
                  Votre jardin en photo
                </p>
                <p className="mt-2 text-sm text-ink/70">
                  Ajoutez une photo de votre jardin : l'assistant garde votre
                  décor et vous montre le résultat après notre passage.
                </p>
                <input
                  ref={inputFichier}
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={(e) => choisirPhoto(e.target.files?.[0])}
                />
                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <button
                    type="button"
                    onClick={() => inputFichier.current?.click()}
                    className="inline-flex items-center gap-2 rounded-full border border-bark/20 bg-card px-4 py-2.5 text-sm font-semibold text-bark transition-colors hover:bg-ochre/30"
                  >
                    <ImagePlus className="h-4 w-4" />
                    {photo ? "Changer la photo" : "Ajouter une photo de mon jardin"}
                  </button>
                  {photo && (
                    <>
                      <img
                        src={photo}
                        alt="Photo du jardin envoyée par le client"
                        className="h-14 w-20 rounded-md border border-bark/15 object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          setPhoto(null);
                          if (inputFichier.current) inputFichier.current.value = "";
                        }}
                        className="inline-flex items-center gap-1.5 text-xs text-terracotta"
                      >
                        <Trash2 className="h-3.5 w-3.5" /> Retirer
                      </button>
                    </>
                  )}
                </div>
              </div>

              <button
                type="button"
                onClick={generer}
                disabled={chargement}
                className="mt-5 inline-flex items-center gap-2 rounded-full bg-forest px-6 py-3 text-sm font-semibold text-primary-foreground shadow-luxe transition-transform hover:-translate-y-0.5 disabled:opacity-60"
              >
                {chargement ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <Wand2 className="h-4 w-4" />
                )}
                {chargement
                  ? "Création en cours…"
                  : photo
                    ? "Transformer ma photo"
                    : "Créer mon aperçu"}
              </button>


              {erreur && (
                <p className="mt-4 text-sm text-terracotta">{erreur}</p>
              )}

              <div className="mt-6 overflow-hidden rounded-xl border border-bark/12 bg-card">
                {image ? (
                  <img
                    src={image}
                    alt="Aperçu du jardin imaginé par le client"
                    className="w-full object-cover"
                  />
                ) : (
                  <div className="grid h-56 place-items-center text-sm text-ink/50">
                    {chargement
                      ? "Nos jardiniers virtuels plantent vos massifs…"
                      : "Votre aperçu apparaîtra ici."}
                  </div>
                )}
              </div>

              {image && (
                <a
                  href="#devis"
                  onClick={() => setOuvert(false)}
                  className="mt-5 inline-flex rounded-full bg-sunset px-6 py-3 text-sm font-bold text-bark shadow-rustic"
                >
                  Faire réaliser ce jardin
                </a>
              )}

              <p className="mt-4 text-[11px] leading-relaxed text-ink/55">
                Aperçu généré à titre d'illustration. Le projet définitif est
                dessiné avec vous lors de la visite sur place.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
