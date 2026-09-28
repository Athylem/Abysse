// Thèmes et mots acceptés, classés par rareté (1 = banal … 5 = légendaire).
// Syntaxe : mots séparés par des virgules ; "a|b" déclare des variantes du même mot.
const THEMES = [
  {
    nom: "Un animal marin",
    niveaux: [
      "requin, dauphin, baleine, poisson, pieuvre, crabe, meduse, phoque, tortue",
      "homard, crevette, orque, raie, thon, sardine, calmar|calamar, hippocampe, etoile de mer, oursin, morse, otarie, saumon, moule, huitre",
      "murene, espadon, narval, lamantin, bernard-l'ermite, anguille, cachalot, seiche, langouste, anemone, poulpe, maquereau, barracuda, cabillaud, morue, turbot, sole, bar|loup de mer, dorade|daurade, beluga, manchot, pingouin",
      "baudroie|lotte, poisson-lune|mola mola, poisson-clown, dugong, nautile, krill, rascasse, saint-pierre, marsouin, merou, congre, holothurie|concombre de mer, couteau, bulot, bigorneau, coquille saint-jacques, limule, esturgeon, fletan, requin-baleine, raie manta|manta, poisson-globe|fugu, corail, eponge",
      "ctenophore, siphonophore, physalie|galere portugaise, calmar geant, dragon de mer, regalec, grenadier, poisson-pecheur, vampire des abysses|vampyroteuthis, isopode geant, chimere, requin-lutin, dumbo|poulpe dumbo, lompe, blennie, gorgone, spirographe, nudibranche, salpe, velelle, poisson-hache, pyrosome, cœlacanthe|coelacanthe, dragon noir, grand gueule, requin-lezard, xenophyophore",
    ],
  },
  {
    nom: "Un fruit",
    niveaux: [
      "pomme, banane, orange, fraise, poire, cerise, raisin, ananas, kiwi, peche",
      "abricot, prune, mangue, citron, melon, pasteque, framboise, myrtille, clementine, mandarine, pamplemousse, noix de coco|coco, figue, groseille",
      "mure, cassis, nectarine, brugnon, grenade, fruit de la passion|maracuja, papaye, litchi, datte, kaki, coing, mirabelle, reine-claude, avocat, olive, tomate, citron vert, goyave, myrtille sauvage",
      "kumquat, physalis|amour en cage, carambole, pitaya|fruit du dragon, nefle, arbouse, sureau, airelle, canneberge|cranberry, cynorhodon|gratte-cul, pomelo, bergamote, yuzu, lime, feijoa, tamarin, jujube, mangoustan, ramboutan, longane|longan, chataigne, noisette",
      "durian, jaboticaba, cherimole|anone, corossol, sapotille, akee, salak|fruit serpent, cupuacu, acerola, camu camu, cornouille, alise, sorbe, prunelle, argousier, amelanche, azerole, pepino, kiwano|melon a cornes, main de bouddha|cedrat, noni, jacquier, lucuma, miracle|fruit miracle, pomme cannelle",
    ],
  },
  {
    nom: "Un métier",
    niveaux: [
      "medecin, professeur|prof, policier, pompier, boulanger, avocat, infirmier|infirmiere, docteur, vendeur, cuisinier",
      "architecte, ingenieur, plombier, electricien, coiffeur, dentiste, pilote, journaliste, facteur, agriculteur, veterinaire, maçon|macon, boucher, informaticien, developpeur, comptable, serveur, chauffeur, acteur, chanteur",
      "pharmacien, notaire, juge, menuisier, charpentier, fleuriste, libraire, bibliothecaire, photographe, astronaute, militaire, soldat, psychologue, kinesitherapeute|kine, sage-femme, patissier, fromager, poissonnier, pecheur, garagiste|mecanicien, jardinier, peintre, sculpteur, ecrivain, traducteur",
      "ebeniste, forgeron, serrurier, vitrier, cordonnier, horloger, luthier, tailleur de pierre, couvreur, ramoneur, apiculteur, viticulteur|vigneron, sommelier, oenologue, archeologue, geologue, oceanographe, cartographe, dresseur, cascadeur, croupier, grutier, docker, bucheron, berger, marechal-ferrant, taxidermiste",
      "souffleur de verre, doreur, enlumineur, tonnelier, sabotier, vannier, chapelier, modiste, parfumeur|nez, lamaneur, scaphandrier, egoutier, fontainier, cordier, chaudronnier, fondeur, orfevre, lapidaire, relieur, typographe, pigiste, sonneur de cloches|carillonneur, allumeur de reverberes, gardien de phare, eclusier, garde-barriere, thanatopracteur, oiseleur, fauconnier, rempailleur",
    ],
  },
  {
    nom: "Un objet de la cuisine",
    niveaux: [
      "couteau, fourchette, cuillere, assiette, verre, casserole, poele, four, frigo|refrigerateur, tasse",
      "bol, micro-ondes, grille-pain, bouilloire, saladier, louche, spatule, planche a decouper, evier, lave-vaisselle, cafetiere, plaque de cuisson, torchon, eponge",
      "fouet, passoire, rape, econome|eplucheur, rouleau a patisserie, mixeur, blender, robot, balance, minuteur, moule, cocotte, faitout, wok, tire-bouchon, ouvre-boite, decapsuleur, entonnoir, ciseaux, tablier, gant de cuisine|manique, dessous-de-plat, carafe, theiere",
      "chinois, ecumoire, presse-ail, presse-agrumes, mandoline, pilon, mortier, tamis, poche a douille, pinceau, zesteur, cul-de-poule, sauteuse, autocuiseur|cocotte-minute, gaufrier, appareil a raclette, crepiere, yaourtiere, hachoir, couperet, aiguiseur|fusil, thermometre, sorbetiere, plancha",
      "mandoline japonaise, spirale|spiraliseur, dénoyauteur|denoyauteur, vide-pomme, parisienne|cuillere parisienne, emporte-piece, chalumeau, siphon, bain-marie, tajine, couscoussier, pierre a pizza, pelle a tarte, cloche, rondeau, bassine a confiture, poissonniere, tourtiere, terrine, ramequin, cuiseur vapeur, estagnon, chaufferette, girolle, casse-noix, pince a sucre",
    ],
  },
  {
    nom: "Un pays",
    niveaux: [
      "france, espagne, italie, allemagne, chine, japon, etats-unis|usa|amerique, canada, bresil, angleterre",
      "portugal, belgique, suisse, russie, inde, mexique, australie, maroc, algerie, egypte, grece, argentine, royaume-uni, tunisie, senegal",
      "pays-bas|hollande, suede, norvege, danemark, finlande, irlande, pologne, turquie, iran, irak, coree du sud, coree du nord, vietnam, thailande, perou, chili, colombie, cuba, cameroun, cote d'ivoire, madagascar, afrique du sud, nouvelle-zelande, autriche, islande, ukraine, israel",
      "hongrie, roumanie, bulgarie, croatie, serbie, slovaquie, slovenie, estonie, lettonie, lituanie, mongolie, nepal, laos, cambodge, bolivie, paraguay, uruguay, equateur, venezuela, jamaique, haiti, mali, niger, tchad, kenya, ethiopie, nigeria, ghana, gabon, congo, luxembourg, monaco, liban, syrie, jordanie, arabie saoudite, qatar, pakistan, afghanistan, indonesie, philippines, malaisie, singapour, kazakhstan, georgie, armenie, ecosse, tchequie|republique tcheque",
      "bhoutan, tuvalu, nauru, kiribati, vanuatu, palaos, samoa, tonga, fidji, lesotho, eswatini|swaziland, djibouti, erythree, burundi, rwanda, malawi, comores, seychelles, maurice, cap-vert, sao tome-et-principe, guinee-bissau, guinee equatoriale, suriname, guyana, belize, andorre, liechtenstein, saint-marin, vatican, moldavie, montenegro, macedoine du nord, albanie, bosnie-herzegovine, turkmenistan, tadjikistan, kirghizistan, ouzbekistan, brunei, timor oriental, maldives, sri lanka, bangladesh, birmanie|myanmar, oman, yemen, bahrein, koweit, mauritanie, namibie, botswana, zambie, zimbabwe, mozambique, angola, ouganda, tanzanie, somalie, soudan, libye, benin, togo, burkina faso, sierra leone, liberia, gambie, nicaragua, honduras, salvador, guatemala, costa rica, panama, dominique, grenade, barbade, bahamas, trinite-et-tobago, sainte-lucie, chypre, malte, azerbaidjan, bielorussie",
    ],
  },
  {
    nom: "Un instrument de musique",
    niveaux: [
      "piano, guitare, violon, batterie, flute, trompette",
      "saxophone, harpe, violoncelle, clarinette, accordeon, basse|guitare basse, tambour, harmonica, orgue, synthetiseur, ukulele, xylophone",
      "contrebasse, alto, hautbois, basson, trombone, tuba, cor, banjo, mandoline, triangle, cymbale, djembe, cornemuse, flute a bec, clavecin, maracas, tambourin, castagnettes, flute traversiere, bongo",
      "sitar, balalaika, cithare, lyre, luth, vielle, ocarina, kalimba|sanza, marimba, vibraphone, glockenspiel, celesta, timbale, cor anglais, piccolo, bugle, cornet, sousaphone, didgeridoo, steel drum|steelpan, theremine|theremin, bandoneon, washboard|planche a laver, guimbarde, tabla, gong",
      "vielle a roue, nyckelharpa, erhu, koto, shamisen, shakuhachi, biwa, kora, balafon, oud, bouzouki, duduk, zurna, hang|handpan, ondes martenot, cristal baschet, serpent, sacqueboute, cromorne, chalumeau, theorbe, epinette, harmonium, armonica de verre, flute de pan, tympanon|cymbalum, cajon, cuica, berimbau, txalaparta, charango, quena, guzheng, pipa, mbira, launeddas, bodhran, crwth",
    ],
  },
  {
    nom: "Quelque chose de rouge",
    niveaux: [
      "tomate, fraise, sang, cerise, pomme, coeur, feu, rose",
      "coquelicot, pompier|camion de pompiers, ketchup, piment, rouge a levres, framboise, coccinelle, homard, vin rouge, ferrari, pere noel, feu rouge, panneau stop",
      "rubis, radis, poivron, grenade, groseille, betterave, brique, braise, lave, mars|planete mars, cardinal, renard, ecureuil roux, drapeau japonais, carton rouge, boite aux lettres anglaise|cabine telephonique anglaise, bus londonien, nez de clown, rouge-gorge",
      "grenat, corail, carmin, vermillon, pourpre, bordeaux, cinabre, rhubarbe, piment d'espelette, paprika, sauce tomate, tabasco, chorizo, crevette cuite, ibis rouge, gorge de rouge-gorge, poisson rouge, sequoia, erable du canada|feuille d'erable, amanite tue-mouches, cochenille, hemoglobine",
      "cochenille du nopal, cramoisi, garance, sang-dragon|dragonnier, rubellite, spinelle, cornaline, jaspe rouge, hematite, realgar, minium, sanguine, ecarlate, incarnat, tomette, grenadine, campari, cranberry, groseille a maquereau, ibis, flamant, cardinal rouge, tangara ecarlate, pin rouge, mangrove rouge, planete rouge, geante rouge, bethelgeuse|betelgeuse, antares, aldebaran, lanterne rouge",
    ],
  },
];

if (typeof module !== "undefined") module.exports = THEMES;
