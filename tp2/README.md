# TP2 — Rendre ExploMonde accessible

**Objectif :** reprendre le TP1 et corriger tous les défauts d'accessibilité.

## Défauts trouvés dans le TP1

| # | Défaut | Correction apportée |
|---|--------|---------------------|
| 1 | `<html>` sans attribut de langue | ajout de `lang="fr"` |
| 2 | `<title>` non explicite (« ExploMonde ») | `ExploMonde — Rechercher un pays dans le monde` |
| 3 | Pas de lien d'évitement : au clavier il faut traverser tout l'en-tête | ajout de `<a class="lien-evitement" href="#contenu">` en premier élément du `body` |
| 4 | Champ de recherche sans `<label>` (juste un `placeholder`) | `<label for="q">` associé à `<input id="q">` |
| 5 | `<nav>` non nommé (plusieurs `nav` possibles à terme) | `aria-label="Navigation principale"` |
| 6 | Aucune zone pour annoncer les résultats aux lecteurs d'écran | `<p id="statut" role="status">` dans la section résultats |
| 7 | Cible du lien d'évitement inexistante | `id="contenu"` posé sur `<main>` |

## Test clavier (en autonomie)
- `Tab` depuis le haut : le premier arrêt est « Aller au contenu principal ».
- Chaque lien, le champ, le bouton et le `select` sont atteignables.
- Le focus reste visible (contour par défaut du navigateur ; il sera renforcé en CSS au TP3 avec `:focus-visible`).
- Aucun piège au clavier.

## Livrable
- `tp2/index.html` corrigé
- la liste des défauts ci-dessus
