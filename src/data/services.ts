import {
  Axe,
  Scissors,
  TreeDeciduous,
  Truck,
  ShieldCheck,
  Sprout,
  type LucideIcon,
} from "lucide-react";

export type Service = {
  slug: string;
  icon: LucideIcon;
  titre: string;
  texte: string;
  couleur: string;
  num: string;
  intro: string;
  etapes: { titre: string; texte: string }[];
  materiel: string[];
  duree: string;
};

export const SERVICES: Service[] = [
  {
    slug: "taille-douce",
    icon: Scissors,
    titre: "Taille douce & raisonnée",
    texte:
      "Éclaircie, réduction, taille de formation. On respecte la physiologie de l'arbre, pas de têtard sauvage.",
    couleur: "bg-forest text-primary-foreground",
    num: "01",
    intro:
      "La taille douce consiste à retirer le strict nécessaire pour équilibrer l'arbre, laisser passer la lumière et sécuriser les branches fatiguées — sans jamais l'étêter. Un arbre bien taillé cicatrise seul et repart plus vigoureux au printemps suivant.",
    etapes: [
      {
        titre: "Lecture de l'arbre",
        texte:
          "On fait le tour de l'arbre au sol : essence, âge, état sanitaire, branches mortes, tensions dans le houppier. On vous explique ce qu'on va couper et pourquoi.",
      },
      {
        titre: "Montée sur cordes",
        texte:
          "Accès par grimpe encordée, sans griffes ni éperons qui blessent l'écorce. Double point d'ancrage systématique.",
      },
      {
        titre: "Coupes de proprété",
        texte:
          "Chaque coupe se fait au ras du bourrelet cicatriciel, à la scie propre et désinfectée entre deux arbres pour ne pas transmettre de maladie.",
      },
      {
        titre: "Nettoyage complet",
        texte:
          "Branches broyées ou évacuées, pelouse ratissée. On repart quand le terrain est comme avant, en mieux.",
      },
    ],
    materiel: [
      "Cordes et harnais certifiés EN",
      "Scies à main japonaises",
      "Tronçonneuses d'élagage",
      "Sécateurs de force",
    ],
    duree: "Une demi-journée à une journée par arbre adulte.",
  },
  {
    slug: "demontage-par-cordes",
    icon: TreeDeciduous,
    titre: "Démontage par cordes",
    texte:
      "Arbre en surplomb d'une maison, d'un mur en pierre ou d'une piscine : on descend pièce par pièce.",
    couleur: "bg-ochre text-bark",
    num: "02",
    intro:
      "Quand un arbre ne peut pas tomber d'un seul tenant — toiture, véranda, mur en pierre, piscine ou ligne électrique dessous — on le démonte du haut vers le bas. Chaque tronçon est retenu par une corde et déposé au sol en douceur.",
    etapes: [
      {
        titre: "Étude de la zone",
        texte:
          "Repérage des obstacles, du sens de chute naturel et des points d'ancrage solides. Balisage du chantier et mise en sécurité des accès.",
      },
      {
        titre: "Installation du rétention",
        texte:
          "Poulies, frein de descente et cordes de rétention installés sur un tronc porteur. Un homme au sol pilote la descente.",
      },
      {
        titre: "Découpe par tronçons",
        texte:
          "Le grimpeur coupe des billons de 30 à 80 cm selon le poids. Rien ne tombe en chute libre au-dessus d'une structure.",
      },
      {
        titre: "Dépose et rangement",
        texte:
          "Chaque pièce est déposée sur une zone tampon, puis débitée, broyée ou empilée en bois de chauffage si vous le souhaitez.",
      },
    ],
    materiel: [
      "Poulies et frein de descente",
      "Cordes de rétention 12 mm",
      "Élingues et anneaux textiles",
      "Nacelle si accès possible",
    ],
    duree: "Une à deux journées selon le volume et l'accès.",
  },
  {
    slug: "abattage-dessouchage",
    icon: Axe,
    titre: "Abattage & dessouchage",
    texte: "Abattage directionnel, rognage de souche jusqu'à 40 cm sous le niveau du sol.",
    couleur: "bg-terracotta text-accent-foreground",
    num: "03",
    intro:
      "Quand l'arbre est mort, dangereux ou gêne un projet de construction, on l'abat proprement dans la direction choisie, puis on rogne la souche pour que vous puissiez replanter, engazonner ou goudronner derrière.",
    etapes: [
      {
        titre: "Vérification administrative",
        texte:
          "On vous dit si une déclaration en mairie est nécessaire (arbre classé, haie bocagère protégée, PLU). C'est inclus dans le conseil.",
      },
      {
        titre: "Abattage directionnel",
        texte:
          "Entaille de direction, trait d'abattage et coins de sécurité. Un tire-fort est utilisé dès qu'il y a le moindre doute sur la trajectoire.",
      },
      {
        titre: "Débitage sur place",
        texte:
          "Le tronc est débité en rondins de 33, 40 ou 50 cm selon votre foyer, et rangé où vous voulez sur la parcelle.",
      },
      {
        titre: "Rognage de souche",
        texte:
          "Rogneuse jusqu'à 40 cm sous le niveau du sol. Le copeau peut rester en paillage ou être évacué, et le trou rebouché en terre végétale.",
      },
    ],
    materiel: [
      "Tronçonneuses thermiques",
      "Coins et tire-fort",
      "Rogneuse de souche autotractée",
      "Terre végétale sur demande",
    ],
    duree: "Une journée, dessouchage compris dans la plupart des cas.",
  },
  {
    slug: "haies-vergers",
    icon: Sprout,
    titre: "Haies & vergers",
    texte:
      "Taille de haies bocagères, entretien de vergers, palissage. Charente-Maritime et Sud Deux-Sèvres.",
    couleur: "bg-moss text-bark",
    num: "04",
    intro:
      "Une haie se taille au bon moment et à la bonne hauteur pour rester dense de bas en haut. Les fruitiers, eux, se taillent en hiver pour la structure et en vert pour la production.",
    etapes: [
      {
        titre: "Choix de la période",
        texte:
          "Hors période de nidification (mi-mars à fin juillet) pour les haies, et repos végétatif pour les fruitiers à pépins.",
      },
      {
        titre: "Mise au gabarit",
        texte:
          "Cordeau tendu, taille légèrement tronconique pour que la base reçoive la lumière et ne se dégarnisse jamais.",
      },
      {
        titre: "Taille des fruitiers",
        texte:
          "Suppression du bois mort, aération du centre, sélection des charpentières, palissage des formes plates contre mur.",
      },
      {
        titre: "Broyage des tailles",
        texte:
          "Les déchets verts sont broyés sur place et redistribués au pied de la haie en paillage naturel.",
      },
    ],
    materiel: [
      "Taille-haies thermiques et sur perche",
      "Cordeau et niveau",
      "Sécateurs et scies d'arboriculture",
      "Broyeur de branches",
    ],
    duree: "Comptez une journée pour 80 à 120 mètres linéaires.",
  },
  {
    slug: "evacuation-broyage",
    icon: Truck,
    titre: "Évacuation & broyage",
    texte:
      "Broyat laissé sur place en paillage ou emmené. Le terrain est rendu propre, garanti au râteau.",
    couleur: "bg-sky text-bark",
    num: "05",
    intro:
      "Le plus gros du travail, c'est souvent ce qui reste au sol. On ne laisse jamais un tas de branches derrière nous : tout part au broyeur, en paillage chez vous ou en déchetterie professionnelle.",
    etapes: [
      {
        titre: "Tri des rémanents",
        texte:
          "On sépare le bois de chauffage (que l'on vous range), les branches broyables et les déchets verts fins.",
      },
      {
        titre: "Broyage sur place",
        texte:
          "Broyeur amené sur remorque, capable d'avaler des branches jusqu'à 15 cm de diamètre. Bâchage pour protéger les façades.",
      },
      {
        titre: "Paillage ou évacuation",
        texte:
          "Le broyat est étalé au pied de vos massifs (il garde l'humidité et limite le désherbage) ou chargé et évacué en filière agréée.",
      },
      {
        titre: "Finition au râteau",
        texte:
          "Passage au râteau et au souffleur sur les allées, terrasses et pelouses. Photo du chantier fini si vous êtes absent.",
      },
    ],
    materiel: [
      "Broyeur de branches 15 cm",
      "Remorque et benne",
      "Bâches de protection",
      "Souffleur et râteaux",
    ],
    duree: "Comprise dans la durée du chantier principal.",
  },
  {
    slug: "diagnostic-urgence-tempete",
    icon: ShieldCheck,
    titre: "Diagnostic & urgence tempête",
    texte:
      "Expertise d'arbre dangereux et intervention sous 24 h après coup de vent sur le littoral.",
    couleur: "bg-bark text-cream",
    num: "06",
    intro:
      "Sur le littoral charentais, un coup de vent suffit à fragiliser un arbre. On établit un diagnostic visuel sérieux, et en cas de tempête on intervient en urgence pour dégager et sécuriser.",
    etapes: [
      {
        titre: "Diagnostic visuel",
        texte:
          "Examen du collet, du tronc et du houppier : champignons, cavités, écorce incluse, bois mort, inclinaison récente. Compte-rendu écrit avec photos.",
      },
      {
        titre: "Préconisations",
        texte:
          "Trois issues possibles : surveillance, allègement du houppier ou haubanage, ou abattage si le risque est avéré. On vous dit franchement ce qui s'impose.",
      },
      {
        titre: "Intervention d'urgence",
        texte:
          "Après tempête, on se déplace sous 24 h : dégagement d'accès, arbre couché sur toiture ou clôture, branche en suspens à décrocher.",
      },
      {
        titre: "Dossier assurance",
        texte:
          "Photos avant/après, devis détaillé et facture conformes pour votre déclaration de sinistre.",
      },
    ],
    materiel: [
      "Maillet de sondage",
      "Haubans textiles dynamiques",
      "Tronçonneuses d'urgence",
      "Balisage de chantier",
    ],
    duree: "Diagnostic en 1 h, urgence tempête sous 24 h.",
  },
];

export function getService(slug: string) {
  return SERVICES.find((s) => s.slug === slug);
}
