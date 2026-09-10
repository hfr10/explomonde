// Accès aux données distantes : REST Countries v3.1
const BASE = "https://restcountries.com/v3.1";
const CHAMPS = "name,capital,region,population,cca2,flags";

// Transforme un objet brut de l'API en objet simple et stable
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

// Recherche par nom. Renvoie [] si aucun résultat (404), lève une erreur sinon.
export async function chercherPays(nom) {
  const url = `${BASE}/name/${encodeURIComponent(nom)}?fields=${CHAMPS}`;
  const reponse = await fetch(url);

  if (reponse.status === 404) return [];
  if (!reponse.ok) throw new Error(`Réponse ${reponse.status}`);

  const donnees = await reponse.json();
  return donnees.map(normaliser).sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}

// Tous les pays d'une région (ex. "europe")
export async function paysParRegion(region) {
  const url = `${BASE}/region/${encodeURIComponent(region)}?fields=${CHAMPS}`;
  const reponse = await fetch(url);

  if (!reponse.ok) throw new Error(`Réponse ${reponse.status}`);

  const donnees = await reponse.json();
  return donnees.map(normaliser).sort((a, b) => a.nom.localeCompare(b.nom, "fr"));
}
