// ============================================================
// Petites fonctions utilitaires pures (parseur CSV, prix).
// Aucun accès au DOM ici : on peut les tester indépendamment.
// ============================================================

// Parse un texte CSV en tableau de tableaux.
// Gère les champs entre guillemets, les virgules et retours
// à la ligne à l'intérieur des guillemets, et les fins CRLF.
function parseCSV(texte) {
  const lignes = [];
  let ligne = [];
  let champ = '';
  let dansGuillemets = false;

  for (let i = 0; i < texte.length; i++) {
    const c = texte[i];
    if (dansGuillemets) {
      if (c === '"') {
        if (texte[i + 1] === '"') { champ += '"'; i++; }
        else { dansGuillemets = false; }
      } else {
        champ += c;
      }
    } else if (c === '"') {
      dansGuillemets = true;
    } else if (c === ',') {
      ligne.push(champ);
      champ = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && texte[i + 1] === '\n') { i++; }
      ligne.push(champ);
      champ = '';
      lignes.push(ligne);
      ligne = [];
    } else {
      champ += c;
    }
  }
  if (champ !== '' || ligne.length > 0) {
    ligne.push(champ);
    lignes.push(ligne);
  }
  return lignes;
}

// Transforme un texte CSV en liste d'objets à partir de la ligne d'en-tête.
// Les clés d'en-tête sont normalisées (minuscules, espaces retirés).
function csvEnObjets(texte) {
  const lignes = parseCSV(texte).filter(l => l.some(champ => champ.trim() !== ''));
  if (lignes.length < 2) return [];
  const entetes = lignes[0].map(h => h.trim().toLowerCase());
  return lignes.slice(1).map(l => {
    const objet = {};
    entetes.forEach((h, i) => { objet[h] = (l[i] || '').trim(); });
    return objet;
  });
}

// Convertit une chaîne de prix en nombre.
// Accepte "12,50", "12.50", "12 €", "8"...
function parsePrix(valeur) {
  if (valeur === null || valeur === undefined) return null;
  const nettoye = String(valeur).replace(',', '.').replace(/[^\d.-]/g, '');
  const n = parseFloat(nettoye);
  return isNaN(n) ? null : n;
}

// Formate un nombre en prix français, ex. 12.5 -> "12,50 €".
function formatPrix(n) {
  return new Intl.NumberFormat('fr-FR', { style: 'currency', currency: 'EUR' }).format(n);
}
