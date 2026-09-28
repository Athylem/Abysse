// Abysse — la plongée quotidienne : 7 questions, les mêmes pour tout le monde.
// Une seule réponse par question : plus elle est rare, plus on descend profond.

// Difficulté visée pour chaque question : la plongée devient de plus en plus dure.
const PALIERS = [1, 1, 2, 2, 3, 3, 4];
const QUESTIONS = PALIERS.length;
const DUREE = 20; // secondes pour répondre à chaque question
const POINTS = [4, 12, 32, 64, 100]; // points par niveau de rareté
const METRES_PAR_POINT = 10;
const MAX_POINTS = QUESTIONS * POINTS[POINTS.length - 1]; // 700 : plongée parfaite
const MAX_PROFONDEUR = MAX_POINTS * METRES_PAR_POINT; // 7 000 m
const RARETE = ["Plancton", "Sardine", "Espadon", "Calmar géant", "Un sur un million"];
const CARRES = ["⬜", "🟩", "🟦", "🟪", "🟨"];
const CARRE_RATE = "⬛";

const ZONES = [
  { min: 0, nom: "Zone épipélagique", desc: "La surface, baignée de lumière." },
  { min: 200, nom: "Zone mésopélagique", desc: "La zone crépusculaire." },
  { min: 1000, nom: "Zone bathypélagique", desc: "La zone de minuit, où la lumière ne vient plus." },
  { min: 4000, nom: "Zone abyssopélagique", desc: "Les abysses, glacées et silencieuses." },
  { min: 6000, nom: "Zone hadale", desc: "Le fond des fosses océaniques." },
];

const CLE_PLONGEE = "abysse.plongee";
const CLE_RECORD = "abysse.record";

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

// --- Tirage quotidien : même graine pour tout le monde un jour donné ---

function hasher(texte) {
  let h = 2166136261;
  for (const c of texte) {
    h ^= c.charCodeAt(0);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function alea(graine) {
  let a = graine;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function melanger(tableau, hasard = Math.random) {
  const t = [...tableau];
  for (let i = t.length - 1; i > 0; i--) {
    const j = Math.floor(hasard() * (i + 1));
    [t[i], t[j]] = [t[j], t[i]];
  }
  return t;
}

function dateDuJour() {
  const d = new Date();
  const deux = (n) => String(n).padStart(2, "0");
  return `${d.getFullYear()}-${deux(d.getMonth() + 1)}-${deux(d.getDate())}`;
}

// Pour chaque question, tire (avec la graine du jour) un thème restant dont la
// difficulté est la plus proche du palier visé.
function ordreDuJour(jour) {
  const hasard = alea(hasher(`abysse-${jour}`));
  const restants = THEMES.map((_, i) => i);
  return PALIERS.map((palier) => {
    const ecart = (i) => Math.abs(THEMES[i].difficulte - palier);
    const meilleur = Math.min(...restants.map(ecart));
    const candidats = restants.filter((i) => ecart(i) === meilleur);
    const choix = candidats[Math.floor(hasard() * candidats.length)];
    restants.splice(restants.indexOf(choix), 1);
    return choix;
  });
}

// --- Sauvegarde locale ---

function lireRecord() {
  try {
    return Number(localStorage.getItem(CLE_RECORD)) || 0;
  } catch {
    return 0;
  }
}

function ecrireRecord(valeur) {
  try {
    localStorage.setItem(CLE_RECORD, String(valeur));
  } catch {}
}

function lirePlongee(jour) {
  try {
    const p = JSON.parse(localStorage.getItem(CLE_PLONGEE));
    return p && p.jour === jour && Array.isArray(p.reponses) ? p.reponses : [];
  } catch {
    return [];
  }
}

function sauverPlongee() {
  try {
    localStorage.setItem(CLE_PLONGEE, JSON.stringify({ jour: etat.jour, reponses: etat.reponses }));
  } catch {}
}

// --- État de la plongée ---

const etat = {
  jour: dateDuJour(),
  ordre: [], // indices des thèmes, dans l'ordre du jour
  reponses: [], // { theme, mot, niveau, points } ; la dernière est la question en cours
  enCours: false,
  fin: 0, // horodatage de la fin du chrono
  temps: DUREE,
  profondeurAffichee: 0,
  minuteur: null,
};

const $ = (id) => document.getElementById(id);

function totalPoints() {
  return etat.reponses.reduce((s, r) => s + r.points, 0);
}

function afficherEcran(id) {
  for (const e of document.querySelectorAll(".ecran")) e.hidden = e.id !== id;
}

function commencer() {
  if (etat.reponses.length >= QUESTIONS) return finPlongee();
  afficherEcran("jeu");
  $("resultats").innerHTML = "";
  $("message").textContent = "";
  demarrerQuestion();

  // Le chrono ne s'arrête jamais : il repart à chaque question, sans pause.
  clearInterval(etat.minuteur);
  etat.minuteur = setInterval(() => {
    if (!etat.enCours) return;
    etat.temps = Math.max(0, (etat.fin - Date.now()) / 1000);
    majOxygene();
    if (etat.temps <= 0) terminerQuestion(null);
  }, 100);
}

function demarrerQuestion() {
  const indice = etat.ordre[etat.reponses.length];
  // La question est enregistrée dès son début : recharger la page la fait perdre.
  etat.reponses.push({ theme: THEMES[indice].nom, mot: null, niveau: null, points: 0 });
  sauverPlongee();

  etat.enCours = true;
  etat.fin = Date.now() + DUREE * 1000;
  etat.temps = DUREE;

  const etoiles = "★".repeat(THEMES[indice].difficulte) + "☆".repeat(PALIERS.at(-1) - THEMES[indice].difficulte);
  $("manche").textContent = `Question ${etat.reponses.length} / ${QUESTIONS} · ${etoiles}`;
  $("manche").setAttribute("aria-label", `Question ${etat.reponses.length} sur ${QUESTIONS}, difficulté ${THEMES[indice].difficulte} sur ${PALIERS.at(-1)}`);
  $("theme").textContent = THEMES[indice].nom;
  $("saisie").value = "";
  $("saisie").focus();
  majProgression();
  majOxygene();
}

function proposer(saisie) {
  if (!etat.enCours || !saisie.trim()) return;
  const dico = DICTIONNAIRES[etat.ordre[etat.reponses.length - 1]];
  const trouve = chercher(dico, saisie);

  if (!trouve) {
    // Pas de pénalité : seul le temps perdu compte.
    signaler(`« ${saisie.trim()} » n'est pas reconnu. Essayez autre chose !`, true);
    return;
  }

  const reponse = etat.reponses.at(-1);
  reponse.mot = trouve.affichage;
  reponse.niveau = trouve.niveau;
  reponse.points = POINTS[trouve.niveau];
  terminerQuestion(trouve);
}

function signaler(texte, erreur = false) {
  const m = $("message");
  m.textContent = texte;
  m.classList.toggle("erreur", erreur);
}

// Clôt la question en cours et enchaîne aussitôt sur la suivante (ou la fin).
function terminerQuestion(trouve) {
  etat.enCours = false;
  sauverPlongee();

  if (etat.reponses.length >= QUESTIONS) {
    clearInterval(etat.minuteur);
    return finPlongee();
  }

  // Rappel de la réponse précédente, affiché pendant que la question suivante tourne.
  const liste = $("resultats");
  liste.innerHTML = "";
  if (trouve) {
    const li = document.createElement("li");
    li.className = `rarete-${trouve.niveau}`;
    li.innerHTML = `<span class="mot"></span><span class="etiquette">${RARETE[trouve.niveau]}</span><span class="gain">+${POINTS[trouve.niveau]} pts</span>`;
    li.querySelector(".mot").textContent = trouve.affichage;
    liste.appendChild(li);
  }
  signaler(trouve ? "" : "Temps écoulé ! Aucun point.");
  demarrerQuestion();
}

let compteARebours = null;

function finPlongee() {
  const total = totalPoints();
  const profondeur = total * METRES_PAR_POINT;
  const record = lireRecord();
  const nouveauRecord = profondeur > record;
  if (nouveauRecord) ecrireRecord(profondeur);

  const zone = zonePour(profondeur);
  $("final-profondeur").textContent = `${profondeur.toLocaleString("fr-FR")} m`;
  $("final-points").textContent = `${total} / ${MAX_POINTS} points`;
  $("final-zone").textContent = `${zone.nom} — ${zone.desc}`;
  $("final-record").textContent = nouveauRecord
    ? "Nouvelle meilleure plongée !"
    : `Meilleure plongée : ${record.toLocaleString("fr-FR")} m`;

  const recap = $("recap");
  recap.innerHTML = "";
  for (const r of etat.reponses) {
    const li = document.createElement("li");
    li.innerHTML = `<strong></strong> <span class="gain"></span><div class="mots"></div>`;
    li.querySelector("strong").textContent = r.theme;
    li.querySelector(".gain").textContent = `+${r.points} pts`;
    li.querySelector(".mots").textContent = r.mot
      ? `${r.mot} (${RARETE[r.niveau].toLowerCase()})`
      : "pas de réponse";
    recap.appendChild(li);
  }

  afficherEcran("fin");
  demarrerCompteARebours();
}

function texteDePartage() {
  const carres = etat.reponses.map((r) => (r.mot ? CARRES[r.niveau] : CARRE_RATE)).join("");
  const [a, m, j] = etat.jour.split("-");
  const total = totalPoints();
  const lien = location.protocol.startsWith("http") ? `\n${location.origin}${location.pathname}` : "";
  return `Abysse ${j}/${m}/${a}\n${total}/${MAX_POINTS} pts · ${(total * METRES_PAR_POINT).toLocaleString("fr-FR")} m\n${carres}${lien}`;
}

async function partager() {
  const bouton = $("partager");
  try {
    await navigator.clipboard.writeText(texteDePartage());
    bouton.textContent = "Copié !";
  } catch {
    bouton.textContent = "Copie impossible";
  }
  setTimeout(() => (bouton.textContent = "Partager mon score"), 2000);
}

function demarrerCompteARebours() {
  clearInterval(compteARebours);
  const maj = () => {
    const demain = new Date();
    demain.setHours(24, 0, 0, 0);
    const reste = Math.max(0, Math.round((demain - Date.now()) / 1000));
    if (reste <= 0 || dateDuJour() !== etat.jour) return location.reload();
    const deux = (n) => String(n).padStart(2, "0");
    $("prochaine").textContent =
      `Prochaine plongée dans ${deux(Math.floor(reste / 3600))}:${deux(Math.floor((reste % 3600) / 60))}:${deux(reste % 60)}`;
  };
  maj();
  compteARebours = setInterval(maj, 1000);
}

function majProgression() {
  const conteneur = $("progression");
  conteneur.innerHTML = "";
  for (let i = 0; i < QUESTIONS; i++) {
    const p = document.createElement("span");
    p.className = "pastille";
    const r = etat.reponses[i];
    if (r && (i < etat.reponses.length - 1 || !etat.enCours)) {
      p.classList.add(r.mot ? `rarete-${r.niveau}` : "rate", "faite");
    } else if (i === etat.reponses.length - 1) {
      p.classList.add("actuelle");
    }
    conteneur.appendChild(p);
  }
  conteneur.setAttribute("aria-label", `Question ${Math.min(etat.reponses.length, QUESTIONS)} sur ${QUESTIONS}`);
}

function majOxygene() {
  const ratio = etat.temps / DUREE;
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
  const cible = totalPoints() * METRES_PAR_POINT;
  etat.profondeurAffichee += (cible - etat.profondeurAffichee) * 0.08;
  if (Math.abs(cible - etat.profondeurAffichee) < 0.5) etat.profondeurAffichee = cible;
  const p = etat.profondeurAffichee;

  document.body.style.backgroundColor = couleurEau(p);
  $("profondeur").textContent = `${Math.round(p).toLocaleString("fr-FR")} m`;
  $("zone").textContent = zonePour(p).nom;
  $("krill").style.top = `${Math.min(1, p / MAX_PROFONDEUR) * 100}%`;
  requestAnimationFrame(boucleRendu);
}

// --- Branchements ---

document.addEventListener("DOMContentLoaded", () => {
  etat.ordre = ordreDuJour(etat.jour);
  etat.reponses = lirePlongee(etat.jour).slice(0, QUESTIONS);

  const deja = etat.reponses.length;
  if (deja >= QUESTIONS) {
    $("plonger").textContent = "Voir mon résultat";
    $("etat-accueil").textContent = "Vous avez déjà plongé aujourd'hui. Revenez demain !";
  } else if (deja > 0) {
    $("plonger").textContent = "Reprendre la plongée";
    $("etat-accueil").textContent = "La question en cours au moment de quitter la page a été perdue.";
  }
  const record = lireRecord();
  $("record-accueil").textContent = record
    ? `Meilleure plongée : ${record.toLocaleString("fr-FR")} m`
    : "";

  $("plonger").addEventListener("click", commencer);
  $("partager").addEventListener("click", partager);
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
    g.style.top = `${(z.min / MAX_PROFONDEUR) * 100}%`;
    g.textContent = `${z.min.toLocaleString("fr-FR")} m`;
    graduations.appendChild(g);
  }

  majProgression();
  requestAnimationFrame(boucleRendu);
});
