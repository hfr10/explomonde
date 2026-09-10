# TP6 — Auditer et corriger

**Objectif :** faire passer à ExploMonde le contrôle qualité complet.

## 1. Validation W3C
- `tp6/index.html` uploadé sur https://validator.w3.org → **0 erreur, 0 warning**.
- Capture : `tp6/capture-w3c.png`

## 2. Audit Lighthouse — AVANT
Lancer sur le TP5 (état avant optimisation), en navigation privée,
DevTools → Lighthouse → Mode *Navigation* + *Mobile*.

| Catégorie | Score avant |
|-----------|-------------|
| Performance | _à noter_ |
| Accessibilité | _à noter_ |
| Bonnes pratiques | _à noter_ |
| SEO | _à noter_ |

Capture : `tp6/lighthouse-avant.png`

## 3. Optimisations appliquées (≥ 3)

1. **`preconnect` + `dns-prefetch`** vers `restcountries.com` dans le `<head>` :
   la poignée de main TLS démarre avant le premier `fetch`.
2. **Images drapeaux optimisées** : `loading="lazy"`, `decoding="async"`,
   `width`/`height` + `aspect-ratio` en CSS → plus de *Cumulative Layout Shift*,
   les drapeaux hors écran ne se chargent pas.
3. **Réponses API allégées** : `?fields=name,capital,region,population,cca2,flags`
   (payload divisé par ~10 vs la réponse complète).
4. **Cache mémoire** (`Map` dans `api.js`) : une recherche déjà faite = 0 requête réseau.
5. **Contraste renforcé** : couleur primaire passée à `#1b5fd0` (clair) /
   `#7fb2ff` (sombre) pour un ratio AA sur le texte des boutons.
6. **`meta description` + `theme-color`** ajoutés (SEO / bonnes pratiques).

## 4. Audit Lighthouse — APRÈS

| Catégorie | Avant | Après | Écart |
|-----------|-------|-------|-------|
| Performance | | | |
| Accessibilité | | | |
| Bonnes pratiques | | | |
| SEO | | | |

Capture : `tp6/lighthouse-apres.png`

## 5. Nettoyage du code
- `console.error` retiré de `main.js` (`catch {}` sans binding).
- Aucun `console.log` restant (`grep -r "console\." tp6/js` → vide).
- Pas de CSS mort : chaque classe de `components.css` est utilisée par `ui.js`.
- `data.js` supprimé (les données viennent de l'API depuis le TP5).

## Livrable
- `tp6/lighthouse-avant.png` et `tp6/lighthouse-apres.png`
- la liste des corrections ci-dessus
