import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Leaf, X } from "lucide-react";

export function BulleDevis() {
  const [visible, setVisible] = useState(false);
  const [closed, setClosed] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 320);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && !closed && (
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.85 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.85 }}
          transition={{ type: "spring", stiffness: 260, damping: 22 }}
          className="fixed bottom-5 right-5 z-[60] flex items-center gap-2"
        >
          <motion.a
            href="#devis"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
            className="group flex items-center gap-3 rounded-full border-gold-hairline bg-forest/95 py-2.5 pl-2.5 pr-5 text-primary-foreground shadow-luxe backdrop-blur transition-transform hover:scale-[1.03]"
          >
            <span className="relative grid h-10 w-10 place-items-center rounded-full bg-gold-foil text-bark">
              <span className="absolute inset-0 animate-ping rounded-full bg-gold/40" />
              <Leaf className="relative h-5 w-5" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-[10px] font-semibold uppercase tracking-[0.28em] text-cream/70">
                Sans engagement
              </span>
              <span className="text-sm font-semibold tracking-tight">
                Devis gratuit
              </span>
            </span>
          </motion.a>
          <button
            type="button"
            aria-label="Masquer la bulle de devis"
            onClick={() => setClosed(true)}
            className="grid h-7 w-7 place-items-center rounded-full bg-bark/70 text-cream transition-opacity hover:opacity-70"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
