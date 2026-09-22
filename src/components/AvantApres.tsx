import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import avant from "@/assets/haie-avant.jpg";
import apres from "@/assets/haie-apres.jpg";

export function AvantApres() {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const move = useCallback((clientX: number) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const p = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, p)));
  }, []);

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: PointerEvent) => {
      e.preventDefault();
      move(e.clientX);
    };
    const onTouch = (e: TouchEvent) => {
      e.preventDefault();
      move(e.touches[0].clientX);
    };
    const stop = () => setDragging(false);
    window.addEventListener("pointermove", onMove);
    window.addEventListener("touchmove", onTouch, { passive: false });
    window.addEventListener("pointerup", stop);
    window.addEventListener("pointercancel", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("pointerup", stop);
      window.removeEventListener("pointercancel", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, move]);

  return (
    <section id="chantiers" className="bg-cream py-24 paper-grain">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-12 text-center">
          <p className="text-luxe-eyebrow text-terracotta">Chantier n°427 · Pons (17)</p>
          <div className="mx-auto my-5 h-px w-24 bg-gold-foil" />
          <h2 className="text-4xl font-medium text-bark md:text-5xl">
            Une haie <span className="font-serif italic text-forest">reprise au millimètre</span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-ink">
            Glissez la flèche : 42 mètres de haie de laurier remis au cordeau en une journée. Coupe
            nette, arêtes droites, déchets verts évacués.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          ref={ref}
          onPointerDown={(e) => {
            e.preventDefault();
            (e.currentTarget as HTMLElement).setPointerCapture?.(e.pointerId);
            setDragging(true);
            move(e.clientX);
          }}
          onDragStart={(e) => e.preventDefault()}
          style={{ touchAction: "none" }}
          className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-xl border-gold-hairline shadow-luxe ring-1 ring-bark/10"
        >
          <img
            src={apres}
            alt="La haie de laurier après la taille : arêtes droites et allée nettoyée"
            loading="lazy"
            draggable={false}
            width={1408}
            height={912}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
          />
          <img
            src={avant}
            alt="La haie de laurier avant la taille : pousses désordonnées et silhouette irrégulière"
            loading="lazy"
            draggable={false}
            width={1408}
            height={912}
            className="pointer-events-none absolute inset-0 h-full w-full select-none object-cover"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          />

          <span className="text-luxe-eyebrow pointer-events-none absolute left-5 top-5 rounded-full bg-bark/70 px-4 py-1.5 text-cream backdrop-blur">
            Avant
          </span>
          <span className="text-luxe-eyebrow pointer-events-none absolute right-5 top-5 rounded-full bg-forest/85 px-4 py-1.5 text-primary-foreground backdrop-blur">
            Après
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-px bg-gold-foil"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-gold-foil text-bark shadow-luxe ring-1 ring-cream/60">
              <ChevronLeft className="h-4 w-4" />
              <ChevronRight className="h-4 w-4 -ml-0.5" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
