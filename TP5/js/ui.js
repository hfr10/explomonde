// Fabrique d'éléments d'interface — jamais d'innerHTML

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

  if (pays.drapeau) {
    const image = document.createElement("img");
    image.src = pays.drapeau;
    image.alt = pays.drapeauAlt || `Drapeau : ${pays.nom}`;
    image.loading = "lazy";
    image.width = 320;
    image.height = 213;
    article.append(image);
  }

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

// Contenu du détail (affiché dans la boîte de dialogue)
export function creerDetail(pays) {
  const fragment = document.createDocumentFragment();

  const titre = document.createElement("h2");
  titre.textContent = pays.nom;

  const dl = document.createElement("dl");
  dl.append(
    ligne("Capitale", pays.capitale),
    ligne("Région", pays.region),
    ligne("Population", pays.population.toLocaleString("fr-FR")),
    ligne("Code", pays.code)
  );

  fragment.append(titre, dl);
  return fragment;
}

// Bloc d'état simple (chargement / liste vide)
export function creerEtat(texte) {
  const bloc = document.createElement("p");
  bloc.className = "etat";
  bloc.textContent = texte;
  return bloc;
}

// Bloc d'erreur avec bouton Réessayer
export function creerErreur(texte, surReessai) {
  const bloc = document.createElement("div");
  bloc.className = "etat";

  const message = document.createElement("p");
  message.textContent = texte;

  const bouton = document.createElement("button");
  bouton.type = "button";
  bouton.textContent = "Réessayer";
  bouton.addEventListener("click", surReessai);

  bloc.append(message, bouton);
  return bloc;
}
