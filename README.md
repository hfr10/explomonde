# ExploMonde

Application d'exploration des pays du monde, construite en 6 TP.
**Chaque TP reprend le précédent comme base** et le fait évoluer.

| TP | Dossier | Sujet | Ajouts |
|----|---------|-------|--------|
| 1 | [`tp1/`](tp1/) | Squelette sémantique | `index.html` valide W3C, aucun CSS |
| 2 | [`tp2/`](tp2/) | Accessibilité | `lang`, `title`, lien d'évitement, `label`, `role="status"` |
| 3 | [`tp3/`](tp3/) | Mobile First + tokens | `css/tokens.css`, `base.css`, `components.css`, grille `auto-fit`, `clamp`, thème sombre |
| 4 | [`tp4/`](tp4/) | JavaScript modules | `js/data.js` (8 pays), `ui.js` (`creerCarte`), `main.js`, filtre par région, détail par délégation |
| 5 | [`tp5/`](tp5/) | API distante | `js/api.js` (REST Countries), anti-rebond 300 ms, 4 états (chargement / succès / vide / erreur) |
| 6 | [`tp6/`](tp6/) | Audit qualité | Validation W3C, Lighthouse avant/après, `preconnect`, images `lazy`, cache mémoire, nettoyage |

## Lancer un TP

Les TP 1 à 3 s'ouvrent directement dans le navigateur.
Les TP 4 à 6 utilisent des modules ES : il faut un serveur local.

```bash
npx serve tp5
# ou
python -m http.server 8000   # puis http://localhost:8000/tp5/
```

## Données

[REST Countries v3.1](https://restcountries.com) — API publique, sans clé.
