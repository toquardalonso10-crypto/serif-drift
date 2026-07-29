import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import {
  Cloud,
  CloudDrizzle,
  CloudRain,
  CloudSnow,
  Sun,
  CloudSun,
  Wind,
  Zap,
} from "lucide-react";

const VILLES = [
  { nom: "La Rochelle", lat: 46.16, lon: -1.15 },
  { nom: "Saintes", lat: 45.746, lon: -0.634 },
  { nom: "Royan", lat: 45.628, lon: -1.028 },
  { nom: "Rochefort", lat: 45.941, lon: -0.958 },
  { nom: "Jonzac", lat: 45.446, lon: -0.43 },
  { nom: "Île de Ré", lat: 46.2, lon: -1.37 },
];

type Current = {
  temperature_2m: number;
  wind_speed_10m: number;
  weather_code: number;
};

function icone(code: number) {
  if (code === 0) return Sun;
  if (code <= 2) return CloudSun;
  if (code === 3 || code === 45 || code === 48) return Cloud;
  if (code >= 51 && code <= 57) return CloudDrizzle;
  if (code >= 71 && code <= 77) return CloudSnow;
  if (code >= 95) return Zap;
  return CloudRain;
}

function libelle(code: number) {
  if (code === 0) return "Grand soleil";
  if (code <= 2) return "Belles éclaircies";
  if (code === 3) return "Couvert";
  if (code === 45 || code === 48) return "Brouillard";
  if (code >= 51 && code <= 57) return "Bruine";
  if (code >= 71 && code <= 77) return "Neige";
  if (code >= 95) return "Orage";
  return "Pluie";
}

async function fetchMeteo() {
  const results = await Promise.all(
    VILLES.map(async (v) => {
      const res = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${v.lat}&longitude=${v.lon}&current=temperature_2m,weather_code,wind_speed_10m&timezone=Europe%2FParis`,
      );
      if (!res.ok) throw new Error("Météo indisponible");
      const json = (await res.json()) as { current: Current };
      return { ...v, current: json.current };
    }),
  );
  return results;
}

export function Meteo() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["meteo-charente"],
    queryFn: fetchMeteo,
    refetchInterval: 10 * 60 * 1000,
    staleTime: 5 * 60 * 1000,
  });

  return (
    <section id="meteo" className="bg-bark py-16 text-cream">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-ochre">
              En direct
            </p>
            <h2 className="mt-2 text-4xl font-medium md:text-5xl">
              La météo sur nos chantiers
            </h2>
          </div>
          <p className="max-w-sm text-sm leading-relaxed text-cream/60">
            On ne grimpe jamais par vent fort. Voici les conditions relevées
            maintenant sur les six secteurs où nous intervenons.
          </p>
        </div>

        {isError && (
          <p className="mt-10 text-sm text-ochre">
            Impossible de récupérer la météo pour le moment — rappelez-nous, on
            vous dira le temps qu'il fait par la fenêtre.
          </p>
        )}

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {(isLoading || !data) && !isError
            ? VILLES.map((v) => (
                <div
                  key={v.nom}
                  className="h-[132px] animate-pulse rounded-xl bg-cream/10"
                />
              ))
            : data?.map((v, i) => {
                const Icon = icone(v.current.weather_code);
                const vent = Math.round(v.current.wind_speed_10m);
                const ventFort = vent >= 40;
                return (
                  <motion.article
                    key={v.nom}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.5, delay: i * 0.06 }}
                    className="rounded-xl border border-cream/10 bg-cream/[0.06] p-5 backdrop-blur transition-colors hover:bg-cream/10"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold">{v.nom}</h3>
                        <p className="text-xs text-cream/55">
                          {libelle(v.current.weather_code)}
                        </p>
                      </div>
                      <Icon className="h-8 w-8 text-ochre" />
                    </div>
                    <div className="mt-4 flex items-end justify-between">
                      <span className="text-4xl font-extrabold text-moss">
                        {Math.round(v.current.temperature_2m)}°
                      </span>
                      <span
                        className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs ${
                          ventFort
                            ? "bg-terracotta/25 text-ochre"
                            : "bg-cream/10 text-cream/70"
                        }`}
                      >
                        <Wind className="h-3.5 w-3.5" />
                        {vent} km/h {ventFort ? "· nacelle only" : ""}
                      </span>
                    </div>
                  </motion.article>
                );
              })}
        </div>
      </div>
    </section>
  );
}
