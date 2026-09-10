// Point d'entrée : données distantes, anti-rebond, 4 états
import { chercherPays, paysParRegion } from "./api.js";
import { creerCarte, creerEtat, creerErreur } from "./ui.js";
import { antiRebond } from "./utils.js";

const formulaire = document.getElementById("form-recherche");
const champ = document.getElementById("q");
const liste = document.getElementById("resultats-liste");
const statut = document.getElementById("statut");

// Mémorise la dernière action pour le bouton Réessayer
let derniereAction = () => chargerRegion("europe");

function etatChargement() {
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
  const fragment = document.createDocumentFragment();
  pays.forEach((p) => fragment.append(creerCarte(p)));
  liste.replaceChildren(fragment);
  statut.textContent = `${pays.length} résultat${pays.length > 1 ? "s" : ""}.`;
}

// Enveloppe commune : chargement -> succès / vide / erreur
async function executer(action) {
  derniereAction = action;
  etatChargement();
  try {
    const pays = await action();
    pays.length ? etatSucces(pays) : etatVide();
  } catch (erreur) {
    console.error(erreur);
    etatErreur();
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
champ.addEventListener(
  "input",
  antiRebond((evenement) => rechercher(evenement.target.value), 300)
);

formulaire.addEventListener("submit", (evenement) => {
  evenement.preventDefault();
  rechercher(champ.value);
});

// Au chargement : les pays d'Europe
chargerRegion("europe");
