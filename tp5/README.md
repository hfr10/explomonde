# TP5 — Brancher ExploMonde sur l'API

**Objectif :** remplacer les données locales par de vraies données distantes,
avec tous les états.

## API
[REST Countries v3.1](https://restcountries.com) — aucune clé requise.
- `js/api.js`
  - `chercherPays(nom)` : `fetch` sur `/name/{nom}`, teste `response.ok`,
    renvoie `[]` sur 404, **normalise** chaque pays.
  - `paysParRegion(region)` : `fetch` sur `/region/{region}`.
  - `?fields=name,capital,region,population,cca2,flags` pour alléger la réponse.

## Comportement
- **Au chargement** : pays d'Europe via `/v3.1/region/europe`.
- **Champ de recherche** : anti-rebond de **300 ms** (`js/utils.js`).
- **4 états** gérés dans `main.js` :
  1. `chargement` — « Chargement… »
  2. `succès` — grille de cartes
  3. `vide` — « Aucun pays ne correspond »
  4. `erreur` — message + bouton **Réessayer** (rejoue la dernière action)
- Le nombre de résultats est annoncé dans la zone `role="status"` du TP2.

## Test « réseau coupé »
1. `npx serve tp5`
2. DevTools → onglet *Réseau* → *Hors ligne*
3. Lancer une recherche → le bloc d'erreur + bouton *Réessayer* s'affiche.

## Livrable
- application fonctionnelle en ligne
- message correct quand le réseau est coupé
