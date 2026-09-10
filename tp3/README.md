# TP3 — Habiller ExploMonde en Mobile First

**Objectif :** passer de la page brute à une interface responsive, avec des tokens.

## Ce qui est fait
- `css/tokens.css` : **11 variables** (5 couleurs, 1 rayon, 5 espacements) + `--taille-titre` fluide.
- `css/base.css` : style de base **Mobile First**, aucune media query classique.
- `css/components.css` : cartes en grille
  `grid-template-columns: repeat(auto-fit, minmax(260px, 1fr))`.
- Titre `h1` fluide : `clamp(1.8rem, 1.1rem + 3vw, 3rem)`.
- Lien d'évitement caché hors focus, visible au focus.
- `:focus-visible` renforcé pour toute la navigation clavier.

## Thème sombre (en autonomie)
Dans `tokens.css`, `@media (prefers-color-scheme: dark)` **surcharge uniquement
les variables de couleur** — aucun autre sélecteur n'est redéclaré.

## Captures à fournir
- `tp3/capture-360.png` — DevTools, largeur 360 px
- `tp3/capture-1280.png` — largeur 1280 px

## Livrable
- `css/tokens.css`, `css/base.css`, `css/components.css`
- les deux captures
