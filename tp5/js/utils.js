// Anti-rebond : ne déclenche `fonction` qu'après `delai` ms sans nouvel appel
export function antiRebond(fonction, delai = 300) {
  let minuteur;
  return (...args) => {
    clearTimeout(minuteur);
    minuteur = setTimeout(() => fonction(...args), delai);
  };
}
