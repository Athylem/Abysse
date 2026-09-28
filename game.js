// Krillon — trouvez les mots les plus originaux pour plonger au fond des abysses.

const MANCHES = 5;
const DUREE_MANCHE = 30; // secondes d'oxygène par manche
const ESSAIS = 3; // mots acceptés par manche
const PENALITE = 2; // secondes perdues pour un mot inconnu
const METRES = [15, 60, 180, 450, 900]; // gain par niveau de rareté
const RARETE = ["Banal", "Classique", "Original", "Rare", "Légendaire"];

const ZONES = [
  { min: 0, nom: "Zone épipélagique", desc: "La surface, baignée de lumière." },
  { min: 200, nom: "Zone mésopélagique", desc: "La zone crépusculaire." },
  { min: 1000, nom: "Zone bathypélagique", desc: "La zone de minuit, où la lumière ne vient plus." },
  { min: 4000, nom: "Zone abyssopélagique", desc: "Les abysses, glacées et silencieuses." },
  { min: 6000, nom: "Zone hadale", desc: "Les fosses océaniques." },
  { min: 10935, nom: "Au-delà de la fosse des Mariannes", desc: "Plus profond que n'importe quel humain." },
];

function normaliser(mot) {
  return mot
    .toLowerCase()
    .replace(/œ/g, "oe")
    .replace(/æ/g, "ae")
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/[’`]/g, "'")
    .replace(/[-_]/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

// Construit, pour chaque thème, un index mot normalisé -> { niveau, affichage }.
const DICTIONNAIRES = THEMES.map((theme) => {
  const index = new Map();
  theme.niveaux.forEach((ligne, niveau) => {
    ligne.split(",").forEach((entree) => {
      const variantes = entree.split("|").map((v) => v.trim()).filter(Boolean);
      if (!variantes.length) return;
      const affichage = variantes[0];
      for (const v of variantes) index.set(normaliser(v), { niveau, affichage });
    });
  });
  return index;
});

function chercher(dico, saisie) {
  const n = normaliser(saisie);
  if (dico.has(n)) return dico.get(n);
  // Tolère le pluriel simple.
  const singulier = n.replace(/[sx]$/, "");
  if (singulier !== n && dico.has(singulier)) return dico.get(singulier);
  return null;
}

function zonePour(profondeur) {
  return [...ZONES].reverse().find((z) => profondeur >= z.min);
}

function melanger(tableau) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

function lireRecord() {
  try {
    return Number(localStorage.getItem("krillon.record")) || 0;
  } catch {
    return 0;
  }
}

function ecrireRecord(valeur) {
  try {
    localStorage.setItem("krillon.record", String(valeur));
  } catch {}
}

// --- État de la partie ---

const etat = {
  ordre: [], // indices des thèmes tirés
  manche: 0,
  profondeur: 0,
  profondeurAffichee: 0,
  essais: 0,
  temps: 0,
  dejaDits: new Set(),
  historique: [], // { theme, mots: [{ affichage, niveau, metres }] }
  minuteur: null,
};

const $ = (id) => document.getElementById(id);

function afficherEcran(id) {
  for (const e of document.querySelectorAll(".ecran")) e.hidden = e.id !== id;
}

function nouvellePartie() {
  etat.ordre = melanger(THEMES.map((_, i) => i)).slice(0, MANCHES);
  etat.manche = 0;
  etat.profondeur = 0;
  etat.historique = [];
  afficherEcran("jeu");
  demarrerManche();
}

function demarrerManche() {
  const indice = etat.ordre[etat.manche];
  etat.essais = ESSAIS;
  etat.temps = DUREE_MANCHE;
  etat.dejaDits = new Set();
  etat.historique.push({ theme: THEMES[indice].nom, mots: [] });

  $("manche").textContent = `Manche ${etat.manche + 1} / ${MANCHES}`;
  $("theme").textContent = THEMES[indice].nom;
  $("resultats").innerHTML = "";
  $("message").textContent = "";
  $("saisie").disabled = false;
  $("saisie").value = "";
  $("saisie").focus();
  majEssais();
  majOxygene();

  clearInterval(etat.minuteur);
  etat.minuteur = setInterval(() => {
    etat.temps = Math.max(0, etat.temps - 0.1);
    majOxygene();
    if (etat.temps <= 0) finManche("Plus d'oxygène !");
  }, 100);
}

function proposer(saisie) {
  if (!saisie.trim() || etat.essais <= 0) return;
  const dico = DICTIONNAIRES[etat.ordre[etat.manche]];
  const trouve = chercher(dico, saisie);

  if (!trouve) {
    etat.temps = Math.max(0, etat.temps - PENALITE);
    signaler(`« ${saisie.trim()} » n'est pas reconnu (−${PENALITE} s d'oxygène)`, true);
    majOxygene();
    return;
  }
  if (etat.dejaDits.has(trouve.affichage)) {
    signaler(`Vous avez déjà proposé « ${trouve.affichage} »`, true);
    return;
  }

  etat.dejaDits.add(trouve.affichage);
  const metres = METRES[trouve.niveau];
  etat.profondeur += metres;
  etat.essais--;
  etat.historique.at(-1).mots.push({ ...trouve, metres });

  const li = document.createElement("li");
  li.className = `rarete-${trouve.niveau}`;
  li.innerHTML = `<span class="mot"></span><span class="etiquette">${RARETE[trouve.niveau]}</span><span class="gain">+${metres} m</span>`;
  li.querySelector(".mot").textContent = trouve.affichage;
  $("resultats").appendChild(li);
  signaler("");
  majEssais();

  if (etat.essais === 0) finManche("Manche terminée !");
}

function signaler(texte, erreur = false) {
  const m = $("message");
  m.textContent = texte;
  m.classList.toggle("erreur", erreur);
}

function finManche(raison) {
  clearInterval(etat.minuteur);
  $("saisie").disabled = true;

  // Suggère quelques mots légendaires non trouvés, pour la culture.
  const theme = THEMES[etat.ordre[etat.manche]];
  const legendaires = theme.niveaux[4]
    .split(",")
    .map((e) => e.split("|")[0].trim())
    .filter((m) => m && !etat.dejaDits.has(m));
  const idees = melanger(legendaires).slice(0, 3).join(", ");
  signaler(`${raison} Des mots légendaires possibles : ${idees}.`);

  const derniere = etat.manche === MANCHES - 1;
  $("suivant").textContent = derniere ? "Remonter à la surface" : "Plonger plus profond";
  $("suivant").hidden = false;
  $("suivant").focus();
}

function mancheSuivante() {
  $("suivant").hidden = true;
  etat.manche++;
  if (etat.manche >= MANCHES) finPartie();
  else demarrerManche();
}

function finPartie() {
  const record = lireRecord();
  const nouveauRecord = etat.profondeur > record;
  if (nouveauRecord) ecrireRecord(etat.profondeur);

  const zone = zonePour(etat.profondeur);
  $("final-profondeur").textContent = `${etat.profondeur.toLocaleString("fr-FR")} m`;
  $("final-zone").textContent = `${zone.nom} — ${zone.desc}`;
  $("final-record").textContent = nouveauRecord
    ? "Nouveau record !"
    : `Record : ${record.toLocaleString("fr-FR")} m`;

  const recap = $("recap");
  recap.innerHTML = "";
  for (const { theme, mots } of etat.historique) {
    const li = document.createElement("li");
    const total = mots.reduce((s, m) => s + m.metres, 0);
    li.innerHTML = `<strong></strong> <span class="gain">+${total} m</span><div class="mots"></div>`;
    li.querySelector("strong").textContent = theme;
    li.querySelector(".mots").textContent =
      mots.map((m) => `${m.affichage} (${RARETE[m.niveau].toLowerCase()})`).join(" · ") || "aucun mot";
    recap.appendChild(li);
  }
  afficherEcran("fin");
  $("rejouer").focus();
}

function majEssais() {
  $("essais").textContent = "🦐".repeat(etat.essais) + "·".repeat(ESSAIS - etat.essais);
  $("essais").setAttribute("aria-label", `${etat.essais} mots restants`);
}

function majOxygene() {
  const ratio = etat.temps / DUREE_MANCHE;
  $("oxygene-barre").style.width = `${ratio * 100}%`;
  $("oxygene-barre").classList.toggle("bas", ratio < 0.25);
  $("oxygene-texte").textContent = `${Math.ceil(etat.temps)} s`;
}

// --- Rendu continu de la profondeur (couleur de l'eau, jauge, krill) ---

function couleurEau(profondeur) {
  // Du bleu lagon à la surface jusqu'au noir total vers 6000 m.
  const t = Math.min(1, Math.pow(profondeur / 6000, 0.6));
  const surface = [46, 150, 200];
  const fond = [2, 4, 12];
  const c = surface.map((s, i) => Math.round(s + (fond[i] - s) * t));
  return `rgb(${c.join(",")})`;
}

function boucleRendu() {
  const cible = etat.profondeur;
  etat.profondeurAffichee += (cible - etat.profondeurAffichee) * 0.08;
  if (Math.abs(cible - etat.profondeurAffichee) < 0.5) etat.profondeurAffichee = cible;
  const p = etat.profondeurAffichee;

  document.body.style.backgroundColor = couleurEau(p);
  $("profondeur").textContent = `${Math.round(p).toLocaleString("fr-FR")} m`;
  $("zone").textContent = zonePour(p).nom;
  const ratio = Math.min(1, p / 11000);
  $("krill").style.top = `${ratio * 100}%`;
  requestAnimationFrame(boucleRendu);
}

// --- Branchements ---

document.addEventListener("DOMContentLoaded", () => {
  const record = lireRecord();
  $("record-accueil").textContent = record
    ? `Votre record : ${record.toLocaleString("fr-FR")} m`
    : "";

  $("plonger").addEventListener("click", nouvellePartie);
  $("rejouer").addEventListener("click", () => {
    etat.profondeur = 0;
    nouvellePartie();
  });
  $("suivant").addEventListener("click", mancheSuivante);
  $("formulaire").addEventListener("submit", (e) => {
    e.preventDefault();
    proposer($("saisie").value);
    $("saisie").value = "";
  });

  // Graduations de la jauge.
  const graduations = $("graduations");
  for (const z of ZONES.slice(1)) {
    const g = document.createElement("div");
    g.className = "graduation";
    g.style.top = `${(z.min / 11000) * 100}%`;
    g.textContent = `${z.min.toLocaleString("fr-FR")} m`;
    graduations.appendChild(g);
  }

  requestAnimationFrame(boucleRendu);
});
