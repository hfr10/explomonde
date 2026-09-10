// Fabrique d'éléments d'interface — jamais d'innerHTML

// Crée un couple <dt>/<dd> et le renvoie dans un fragment
function ligne(cle, valeur) {
  const fragment = document.createDocumentFragment();
  const dt = document.createElement("dt");
  dt.textContent = cle;
  const dd = document.createElement("dd");
  dd.textContent = valeur;
  fragment.append(dt, dd);
  return fragment;
}

// Renvoie un <article> représentant un pays
export function creerCarte(pays) {
  const article = document.createElement("article");
  article.className = "carte-pays";
  article.dataset.code = pays.code;
  article.tabIndex = 0;

  const titre = document.createElement("h3");
  titre.textContent = pays.nom;

  const dl = document.createElement("dl");
  dl.append(
    ligne("Capitale", pays.capitale),
    ligne("Région", pays.region),
    ligne("Population", pays.population.toLocaleString("fr-FR"))
  );

  article.append(titre, dl);
  return article;
}

// Remplit le panneau de détail
export function afficherDetail(conteneur, pays) {
  conteneur.textContent = "";

  const titre = document.createElement("h2");
  titre.textContent = pays.nom;

  const texte = document.createElement("p");
  texte.textContent =
    `Capitale : ${pays.capitale} — Région : ${pays.region} — ` +
    `Population : ${pays.population.toLocaleString("fr-FR")} habitants (code ${pays.code}).`;

  conteneur.append(titre, texte);
}
