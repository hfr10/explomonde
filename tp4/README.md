# TP4 — Rendre ExploMonde vivant

**Objectif :** afficher une liste de pays depuis un tableau local, avec filtrage et détail.

## Modules
- `js/data.js` — exporte un tableau de **8 pays** (`nom`, `capitale`, `region`, `population`, `code`).
- `js/ui.js` — `creerCarte(pays)` renvoie un `<article>` construit avec `createElement`
  (**aucun `innerHTML`**). Contient aussi `afficherDetail(conteneur, pays)`.
- `js/main.js` — au chargement, affiche les 8 cartes via un `DocumentFragment`.

## Interactions
- **Filtre par région** : un `<select>` + `Array.prototype.filter`.
- **Détail au clic** : un seul écouteur sur le conteneur (`liste`), on remonte avec
  `evenement.target.closest('.carte-pays')` — **délégation**. Fonctionne aussi au
  clavier (`Entrée` / `Espace`), les cartes étant `tabindex="0"`.
- La zone `role="status"` du TP2 annonce le nombre de cartes affichées.

## Test
Ouvrir `tp4/index.html` (via un petit serveur local, les modules ES ne se
chargent pas en `file://`) :
```
npx serve tp4      # ou : python -m http.server
```

## Livrable
- 3 modules JS fonctionnels
- la page réagit au filtre et au clic
