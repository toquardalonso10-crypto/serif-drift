import { useEffect, useRef, useState, type ReactNode } from "react";

/**
 * Défilement circulaire infini. L'ordre est mélangé côté client
 * à chaque visite pour que ce ne soient jamais les mêmes en tête.
 */
export function Marquee<T>({
  items,
  render,
  speed = 55,
  reverse = false,
  itemKey,
}: {
  items: T[];
  render: (item: T, index: number) => ReactNode;
  speed?: number;
  reverse?: boolean;
  itemKey: (item: T, index: number) => string;
}) {
  const [ordre, setOrdre] = useState<T[]>(items);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const copie = [...items];
    for (let i = copie.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copie[i], copie[j]] = [copie[j], copie[i]];
    }
    setOrdre(copie);
  }, [items]);

  const boucle = [...ordre, ...ordre];
  const duree = Math.max(18, ordre.length * speed * 0.25);

  return (
    <div
      className="group relative overflow-hidden"
      style={{
        maskImage:
          "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
        WebkitMaskImage:
          "linear-gradient(90deg, transparent, black 6%, black 94%, transparent)",
      }}
    >
      <div
        ref={trackRef}
        className="flex w-max gap-5 will-change-transform group-hover:[animation-play-state:paused]"
        style={{
          animation: `marquee-slide ${duree}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
        }}
      >
        {boucle.map((item, i) => (
          <div
            key={`${itemKey(item, i % ordre.length)}-${i}`}
            className="w-[300px] shrink-0 sm:w-[360px]"
          >
            {render(item, i % ordre.length)}
          </div>
        ))}
      </div>
    </div>
  );
}
