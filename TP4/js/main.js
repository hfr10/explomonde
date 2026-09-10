// Point d'entrée : affichage, filtre par région, détail par délégation
import { pays } from "./data.js";
import { creerCarte, afficherDetail } from "./ui.js";

const liste = document.getElementById("resultats-liste");
const filtre = document.getElementById("filtre-region");
const statut = document.getElementById("statut");
const detail = document.getElementById("detail");

// Affiche une liste de pays via un fragment
function rendre(tableau) {
  const fragment = document.createDocumentFragment();
  tableau.forEach((p) => fragment.append(creerCarte(p)));
  liste.replaceChildren(fragment);
  statut.textContent = `${tableau.length} pays affiché${tableau.length > 1 ? "s" : ""}.`;
}

// Filtre par région
filtre.addEventListener("change", () => {
  const region = filtre.value;
  rendre(region ? pays.filter((p) => p.region === region) : pays);
});

// Clic (ou touche) sur une carte -> détail, par délégation
liste.addEventListener("click", (evenement) => {
  const carte = evenement.target.closest(".carte-pays");
  if (!carte) return;
  const p = pays.find((item) => item.code === carte.dataset.code);
  if (p) afficherDetail(detail, p);
});

liste.addEventListener("keydown", (evenement) => {
  if (evenement.key !== "Enter" && evenement.key !== " ") return;
  const carte = evenement.target.closest(".carte-pays");
  if (!carte) return;
  evenement.preventDefault();
  const p = pays.find((item) => item.code === carte.dataset.code);
  if (p) afficherDetail(detail, p);
});

// Affichage initial : les 8 pays
rendre(pays);
