// Thèmes et mots acceptés, classés par rareté (1 = banal … 5 = légendaire).
// `difficulte` (1 = facile … 4 = expert) place le thème dans la plongée : facile au début, expert à la fin.
// Syntaxe : mots séparés par des virgules ; "a|b" déclare des variantes du même mot.
const THEMES = [
  {
    nom: "Un animal marin",
    difficulte: 2,
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
    difficulte: 1,
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
    difficulte: 1,
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
    difficulte: 2,
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
    difficulte: 2,
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
    difficulte: 2,
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
    difficulte: 1,
    niveaux: [
      "tomate, fraise, sang, cerise, pomme, coeur, feu, rose",
      "coquelicot, pompier|camion de pompiers, ketchup, piment, rouge a levres, framboise, coccinelle, homard, vin rouge, ferrari, pere noel, feu rouge, panneau stop",
      "rubis, radis, poivron, grenade, groseille, betterave, brique, braise, lave, mars|planete mars, cardinal, renard, ecureuil roux, drapeau japonais, carton rouge, boite aux lettres anglaise|cabine telephonique anglaise, bus londonien, nez de clown, rouge-gorge",
      "grenat, corail, carmin, vermillon, pourpre, bordeaux, cinabre, rhubarbe, piment d'espelette, paprika, sauce tomate, tabasco, chorizo, crevette cuite, ibis rouge, gorge de rouge-gorge, poisson rouge, sequoia, erable du canada|feuille d'erable, amanite tue-mouches, cochenille, hemoglobine",
      "cochenille du nopal, cramoisi, garance, sang-dragon|dragonnier, rubellite, spinelle, cornaline, jaspe rouge, hematite, realgar, minium, sanguine, ecarlate, incarnat, tomette, grenadine, campari, cranberry, groseille a maquereau, ibis, flamant, cardinal rouge, tangara ecarlate, pin rouge, mangrove rouge, planete rouge, geante rouge, bethelgeuse|betelgeuse, antares, aldebaran, lanterne rouge",
    ],
  },
  {
    nom: "Une ville avec un métro",
    difficulte: 3,
    niveaux: [
      "paris, londres, new york, tokyo, madrid, berlin, moscou, lyon, marseille",
      "barcelone, rome, milan, vienne, pekin|beijing, shanghai, seoul, mexico|mexico city, los angeles, washington, toulouse, lille, singapour, hong kong, saint-petersbourg, boston, chicago, montreal, bruxelles, amsterdam, lisbonne, athenes, stockholm, copenhague, istanbul, le caire|caire, buenos aires, sao paulo, rio de janeiro|rio",
      "prague, budapest, varsovie, kiev, bucarest, sofia, helsinki, oslo, munich, hambourg, francfort, cologne, rotterdam, glasgow, osaka, delhi|new delhi, mumbai|bombay, calcutta|kolkata, bangalore|bengaluru, taipei, bangkok, kuala lumpur, jakarta, manille, dubai, teheran, santiago|santiago du chili, lima, caracas, medellin, philadelphie, atlanta, miami, san francisco, toronto, alger, rennes, canton|guangzhou, shenzhen",
      "turin, genes, naples, bilbao, valence, seville, palma|palma de majorque, porto, brescia, lausanne, nagoya, yokohama, sapporo, fukuoka, kyoto, kobe, sendai, busan, daegu, chengdu, wuhan, chongqing, nankin|nanjing, tianjin, hangzhou, doha, riyad|riyadh, ankara, izmir, brasilia, recife, salvador, belo horizonte, monterrey, guadalajara, santo domingo, panama|panama city, quito, hanoi, ho chi minh ville|saigon, dhaka, newcastle, vancouver, sydney",
      "kharkiv|kharkov, dnipro, minsk, tbilissi, erevan, bakou, tachkent, almaty, kazan, samara, nijni novgorod, novossibirsk, ekaterinbourg, pyongyang, kaohsiung, taichung, xi'an|xian|xi an, harbin, changchun, dalian, kunming, qingdao, shenyang, zhengzhou, hefei, changsha, ningbo, wuxi, suzhou, incheon, gwangju, daejeon, ispahan|isfahan, mashhad, tabriz, chiraz|shiraz, lahore, charleroi",
    ],
  },
  {
    nom: "Un scientifique",
    difficulte: 3,
    niveaux: [
      "einstein|albert einstein, newton|isaac newton, pasteur|louis pasteur, curie|marie curie, darwin|charles darwin, galilee, hawking|stephen hawking, edison|thomas edison",
      "tesla|nikola tesla, copernic, archimede, pythagore, aristote, descartes, pascal|blaise pascal, lavoisier, mendeleiev, kepler, volta, faraday, turing|alan turing, oppenheimer, fleming|alexander fleming, pierre curie, ampere, bohr|niels bohr, planck|max planck, fermi|enrico fermi",
      "heisenberg, schrodinger, feynman, hubble, halley, mendel|gregor mendel, jenner, becquerel, foucault, coulomb, celsius, kelvin, ohm, watt, joule, maxwell, dirac, pauli, rutherford, euler, gauss, fourier, laplace, lagrange, fermat, poincare, riemann, koch, pavlov, lamarck, buffon, linne, cuvier, humboldt, fresnel, carnot, gay-lussac, avogadro, dalton, thomson, hertz, ptolemee, hipparque, eratosthene, euclide, thales, hippocrate, galien, vesale",
      "boltzmann, lorentz, gibbs, emmy noether|noether, ramanujan, godel, cantor, galois, abel, hamilton, ada lovelace|lovelace, grace hopper|hopper, rosalind franklin|franklin, lise meitner|meitner, chandrasekhar, eddington, carl sagan|sagan, lemaitre, oort, kuiper, tycho brahe|brahe, huygens, cassini, bessel, hilbert, cauchy, jacobi, dedekind, weierstrass, lister, semmelweis, yersin, calmette, metchnikoff, ehrlich, pauling, crick, sanger, monod, lwoff, montagnier|luc montagnier, barre-sinoussi|francoise barre-sinoussi",
      "cavendish, hooke, priestley, berzelius, liebig, wohler, kekule, arrhenius, ostwald, nernst, haber, mandelbrot, grothendieck, erdos, tu youyou, cecilia payne|payne, henrietta leavitt|leavitt, jocelyn bell|bell burnell, katherine johnson, chien-shiung wu|wu chien-shiung, goeppert-mayer|maria goeppert-mayer, barbara mcclintock|mcclintock, lynn margulis|margulis, dorothy hodgkin|hodgkin, kovalevskaya|sofia kovalevskaya|kovalevskaia, hypatie, al-khwarizmi|khwarizmi, avicenne|ibn sina, averroes|ibn rushd, alhazen|ibn al-haytham, omar khayyam, brahmagupta, aryabhata, zhang heng, shen kuo",
    ],
  },
  {
    nom: "Un fleuve",
    difficulte: 3,
    niveaux: [
      "seine, loire, rhone, garonne, amazone, nil, danube, rhin, tamise, mississippi",
      "volga, tage, ebre, po, tibre, oder, elbe, meuse, dniepr, don, yang-tse-kiang|yang-tse|yangtse|yangzi|fleuve bleu, fleuve jaune|huang he, mekong, gange, indus, congo, niger, zambeze, colorado, hudson, saint-laurent, jourdain, tigre, euphrate, senegal, orenoque, rio grande",
      "ienissei|yenisei, ob, lena, amour, irrawaddy, salouen, brahmapoutre, limpopo, orange, murray, yukon, mackenzie, columbia, parana, uruguay, magdalena, potomac, delaware, douro, guadalquivir, guadiana, arno, adige, vistule|wisla, niemen, neva, somme, charente, adour, aude, herault, orne, vilaine, escaut, var, yser",
      "dvina, petchora|pechora, kouban, dniestr|dniester, oural, syr-daria|syrdaria, amou-daria|amoudaria, tarim, helmand, chatt al-arab|chatt el arab, mahanadi, godavari, krishna, kaveri, narmada, minho, jucar, segura, tagliamento, piave, isonzo, maritsa|evros, vardar, kizilirmak, sakarya, litani, oronte|assi",
      "rufiji, ruvuma, tana, sanaga, ogooue, cuanza|kwanza, cunene, sassandra, volta, gambie, kolyma, indigirka, anadyr, khatanga, olenek, yana, fraser, skeena, yalou|yalu, tumen",
    ],
  },
  {
    nom: "Un élément chimique",
    difficulte: 4,
    niveaux: [
      "oxygene, hydrogene, carbone, azote, fer, or, argent, cuivre, helium",
      "sodium, calcium, chlore, soufre, plomb, zinc, aluminium, mercure, uranium, silicium, phosphore, potassium, etain, nickel, platine, magnesium, lithium, neon, argon, iode, brome, fluor, radium, plutonium, titane, cobalt",
      "chrome, manganese, arsenic, bore, baryum, strontium, xenon, krypton, radon, tungstene, cadmium, antimoine, bismuth, cesium, rubidium, gallium, germanium, selenium, tellure, iridium, osmium, palladium, rhodium, zirconium, molybdene, vanadium, scandium, francium, polonium, thorium, americium, curium",
      "einsteinium, astate, lanthane, cerium, neodyme, praseodyme, samarium, europium, gadolinium, terbium, dysprosium, holmium, erbium, thulium, ytterbium, lutecium, hafnium, tantale, rhenium, thallium, protactinium, neptunium, berkelium, californium, fermium, mendelevium, nobelium, lawrencium, yttrium, niobium, technetium, ruthenium, indium, actinium",
      "rutherfordium, dubnium, seaborgium, bohrium, hassium, meitnerium, darmstadtium, roentgenium, copernicium, nihonium, flerovium, moscovium, livermorium, tennesse, oganesson",
    ],
  },
  {
    nom: "Un os du corps humain",
    difficulte: 4,
    niveaux: [
      "crane, femur, tibia, cote, vertebre, humerus, bassin",
      "clavicule, omoplate, sternum, rotule, perone, radius, cubitus, mandibule|machoire, coccyx, sacrum, phalange, calcaneum|calcaneus|talon",
      "scaphoide, astragale, metatarse, metacarpe, atlas, axis, hyoide, occipital, frontal, parietal, temporal, sphenoide, ethmoide, maxillaire, os nasal|nasal, zygomatique|malaire, pubis, ischion, ilion, carpe, tarse",
      "pisiforme, pyramidal|triquetrum, semi-lunaire|lunatum, trapeze, trapezoide, os crochu|hamatum, grand os|capitatum, cuneiforme, cuboide, lacrymal, palatin, marteau, enclume, etrier, os iliaque|iliaque",
      "sesamoide, xiphoide, wormien|os wormien, vomer, unguis, cornet nasal",
    ],
  },
];

if (typeof module !== "undefined") module.exports = THEMES;
