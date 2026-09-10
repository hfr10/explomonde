// Point d'entrée : données distantes, anti-rebond, 4 états, détail par délégation
import { chercherPays, paysParRegion } from "./api.js";
import { creerCarte, creerDetail, creerEtat, creerErreur } from "./ui.js";

const formulaire = document.getElementById("form-recherche");
const champ = document.getElementById("q");
const liste = document.getElementById("resultats-liste");
const statut = document.getElementById("statut");
const dialogue = document.getElementById("detail");
const dialogueContenu = document.getElementById("detail-contenu");
const dialogueFermer = document.getElementById("detail-fermer");

let paysAffiches = [];
let derniereAction = () => chargerRegion("europe");
let minuteur;

function etatChargement() {
  liste.setAttribute("aria-busy", "true");
  liste.replaceChildren(creerEtat("Chargement…"));
  statut.textContent = "Chargement en cours.";
}

function etatVide() {
  liste.replaceChildren(creerEtat("Aucun pays ne correspond à cette recherche."));
  statut.textContent = "0 résultat.";
}

function etatErreur() {
  liste.replaceChildren(
    creerErreur("Impossible de récupérer les données. Vérifiez votre connexion.", derniereAction)
  );
  statut.textContent = "Erreur de chargement.";
}

function etatSucces(pays) {
  paysAffiches = pays;
  const fragment = document.createDocumentFragment();
  pays.forEach((p) => fragment.append(creerCarte(p)));
  liste.replaceChildren(fragment);
  statut.textContent = `${pays.length} résultat${pays.length > 1 ? "s" : ""}.`;
}

async function executer(action) {
  derniereAction = action;
  etatChargement();
  try {
    const pays = await action();
    pays.length ? etatSucces(pays) : etatVide();
  } catch {
    etatErreur();
  } finally {
    liste.removeAttribute("aria-busy");
  }
}

function chargerRegion(region) {
  return executer(() => paysParRegion(region));
}

function rechercher(nom) {
  const terme = nom.trim();
  if (!terme) return chargerRegion("europe");
  return executer(() => chercherPays(terme));
}

// Recherche avec anti-rebond de 300 ms
champ.addEventListener("input", () => {
  clearTimeout(minuteur);
  minuteur = setTimeout(() => rechercher(champ.value), 300);
});

formulaire.addEventListener("submit", (evenement) => {
  evenement.preventDefault();
  rechercher(champ.value);
});

// Détail au clic, par délégation
liste.addEventListener("click", (evenement) => {
  const carte = evenement.target.closest(".carte-pays");
  if (!carte) return;
  const pays = paysAffiches.find((p) => p.code === carte.dataset.code);
  if (!pays) return;
  dialogueContenu.replaceChildren(creerDetail(pays));
  dialogue.showModal();
});

dialogueFermer.addEventListener("click", () => dialogue.close());

// Au chargement : les pays d'Europe
chargerRegion("europe");
