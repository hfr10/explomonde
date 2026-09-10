// Accès aux données distantes : REST Countries v3.1
const BASE = "https://restcountries.com/v3.1";
const CHAMPS = "name,capital,region,population,cca2,flags";

// Optimisation : cache mémoire des réponses déjà obtenues
const cache = new Map();

function normaliser(brut) {
  return {
    nom: brut?.name?.common ?? "Inconnu",
    capitale: brut?.capital?.[0] ?? "—",
    region: brut?.region ?? "—",
    population: brut?.population ?? 0,
    code: brut?.cca2 ?? "",
    drapeau: brut?.flags?.svg ?? "",
    drapeauAlt: brut?.flags?.alt ?? ""
  };
}

async function recuperer(url) {
  if (cache.has(url)) return cache.get(url);

  const reponse = await fetch(url);
  if (reponse.status === 404) {
    cache.set(url, []);
    return [];
  }
  if (!reponse.ok) throw new Error(`Réponse ${reponse.status}`);

  const donnees = await reponse.json();
  const pays = donnees
    .map(normaliser)
    .sort((a, b) => a.nom.localeCompare(b.nom, "fr"));

  cache.set(url, pays);
  return pays;
}

// Recherche par nom. Renvoie [] si aucun résultat.
export function chercherPays(nom) {
  return recuperer(`${BASE}/name/${encodeURIComponent(nom)}?fields=${CHAMPS}`);
}

// Tous les pays d'une région (ex. "europe")
export function paysParRegion(region) {
  return recuperer(`${BASE}/region/${encodeURIComponent(region)}?fields=${CHAMPS}`);
}
