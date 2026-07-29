import { Leaf, MapPin, Phone, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-canopy py-14 text-primary-foreground">
      <div className="mx-auto grid max-w-7xl gap-8 px-5 md:grid-cols-3 md:px-8">
        <div>
          <div className="flex items-center gap-2">
            <Leaf className="h-5 w-5" />
            <span className="text-sm font-extrabold uppercase tracking-[0.18em]">
              Ets Toquard &amp; Fils
            </span>
          </div>
          <p className="mt-3 max-w-xs text-sm opacity-80">
            Élagage, abattage et entretien d'arbres en Charente-Maritime depuis
            1978. Trois générations de grimpeurs.
          </p>
        </div>
        <ul className="space-y-2 text-sm opacity-90">
          <li className="flex gap-2">
            <MapPin className="h-4 w-4 shrink-0" /> 12 route des Charmes, 17100
            Saintes
          </li>
          <li className="flex gap-2">
            <Phone className="h-4 w-4 shrink-0" /> 05 46 00 00 00
          </li>
          <li className="flex gap-2">
            <Mail className="h-4 w-4 shrink-0" /> contact@toquard-et-fils.fr
          </li>
        </ul>
        <div className="text-sm opacity-80">
          <p className="font-semibold">Secteurs d'intervention</p>
          <p className="mt-2">
            La Rochelle · Saintes · Royan · Rochefort · Jonzac · Marennes ·
            Saint-Jean-d'Angély · Île de Ré · Oléron
          </p>
        </div>
      </div>
      <p className="mx-auto mt-10 max-w-7xl px-5 text-xs opacity-60 md:px-8">
        © {new Date().getFullYear()} Ets Toquard &amp; Fils — SIRET 000 000 000
        00000. Avis affichés à titre illustratif.
      </p>
    </footer>
  );
}
