import { motion } from "framer-motion";
import type { CSSProperties } from "react";

const GLOW = "#EAFE79";

type Props = {
  word: string;
  fontSize: number;
  strokeWidth: number;
  italic?: boolean;
  delay?: number;
  inView?: boolean;
  fill?: string;
  letterSpacing?: number;
  lineHeight?: number;
};

/**
 * Mot en Instrument Serif avec double couche : un halo vert-jaune (contour)
 * derrière, et le mot plein par-dessus. Entrée "sticker qui se déroule".
 */
export function SerifGlow({
  word,
  fontSize,
  strokeWidth,
  italic = false,
  delay = 0.5,
  inView = false,
  fill = "var(--bark)",
  letterSpacing,
  lineHeight,
}: Props) {
  const type: CSSProperties = {
    fontFamily: '"Instrument Serif", serif',
    fontStyle: italic ? "italic" : "normal",
    fontWeight: 400,
    fontSize,
    lineHeight: `${lineHeight ?? fontSize * 0.98}px`,
    letterSpacing: `${letterSpacing ?? -fontSize * 0.04}px`,
    whiteSpace: "nowrap",
  };

  const anim = {
    rotateX: [-110, -70, -20, 5, -2, 0],
    scaleY: [0.15, 0.4, 0.8, 1.04, 0.98, 1],
    scaleX: [0.7, 0.85, 0.95, 1.02, 1, 1],
    opacity: [0, 0.4, 0.85, 1, 1, 1],
  };
  const transition = {
    duration: 0.7,
    delay,
    ease: [0.22, 1, 0.36, 1] as const,
    times: [0, 0.2, 0.55, 0.75, 0.88, 1],
  };

  const motionProps = inView
    ? {
        whileInView: anim,
        viewport: { once: true, margin: "-60px" },
      }
    : { animate: anim };

  return (
    <motion.span
      style={{
        position: "relative",
        display: "inline-block",
        transformPerspective: 600,
        transformOrigin: "top center",
      }}
      initial={{ rotateX: -110, scaleY: 0.15, scaleX: 0.7, opacity: 0 }}
      transition={transition}
      {...motionProps}
    >
      <span
        aria-hidden
        style={{
          ...type,
          position: "absolute",
          inset: 0,
          color: GLOW,
          WebkitTextStrokeWidth: `${strokeWidth}px`,
          WebkitTextStrokeColor: GLOW,
        }}
      >
        {word}
      </span>
      <span style={{ ...type, position: "relative", color: fill }}>{word}</span>
    </motion.span>
  );
}
