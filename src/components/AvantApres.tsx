import { useCallback, useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import avant from "@/assets/avant.jpg";
import apres from "@/assets/apres.jpg";

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
    const onMove = (e: MouseEvent) => move(e.clientX);
    const onTouch = (e: TouchEvent) => move(e.touches[0].clientX);
    const stop = () => setDragging(false);
    window.addEventListener("mousemove", onMove);
    window.addEventListener("touchmove", onTouch);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("touchmove", onTouch);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchend", stop);
    };
  }, [dragging, move]);

  return (
    <section id="chantiers" className="bg-cream py-20 paper-grain">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="mb-10 text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-terracotta">
            Chantier n°427 — Pons (17)
          </p>
          <h2 className="mt-3 text-4xl font-medium text-bark md:text-5xl">
            Glissez la flèche : avant / après
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-relaxed text-ink">
            Un platane centenaire remis en forme en une journée. Taille douce,
            bois mort retiré, terrain nettoyé.
          </p>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7 }}
          ref={ref}
          onMouseDown={(e) => {
            setDragging(true);
            move(e.clientX);
          }}
          onTouchStart={(e) => {
            setDragging(true);
            move(e.touches[0].clientX);
          }}
          className="relative aspect-[16/10] w-full cursor-ew-resize select-none overflow-hidden rounded-lg border-8 border-card shadow-lift"
        >
          <img
            src={apres}
            alt="Le platane après l'intervention d'élagage : couronne équilibrée et jardin nettoyé"
            loading="lazy"
            width={1408}
            height={912}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ width: `${pos}%` }}
          >
            <img
              src={avant}
              alt="Le platane avant l'intervention : branches enchevêtrées et bois mort"
              loading="lazy"
              width={1408}
              height={912}
              className="absolute inset-0 h-full w-full object-cover"
              style={{ width: ref.current?.offsetWidth ?? "100%", maxWidth: "none" }}
            />
          </div>

          <span className="pointer-events-none absolute left-4 top-4 rounded-full bg-bark/80 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-cream">
            Avant
          </span>
          <span className="pointer-events-none absolute right-4 top-4 rounded-full bg-forest/90 px-3 py-1 text-[11px] font-bold uppercase tracking-widest text-primary-foreground">
            Après
          </span>

          <div
            className="pointer-events-none absolute inset-y-0 w-1 bg-ochre"
            style={{ left: `${pos}%`, transform: "translateX(-50%)" }}
          >
            <div className="absolute top-1/2 left-1/2 flex h-14 w-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-ochre text-bark shadow-lift">
              <ChevronLeft className="h-5 w-5" />
              <ChevronRight className="h-5 w-5 -ml-1" />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
