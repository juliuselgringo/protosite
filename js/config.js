// ============================================================
// CONFIGURATION GOOGLE SHEETS
// C'est le SEUL fichier à modifier pour brancher vos données.
// Procédure complète dans README.md.
// ============================================================

const SHEET = {
  // ID de la feuille publiée sur le web :
  // dans l'URL publiée (https://docs.google.com/spreadsheets/d/e/XXXX/pub?output=csv),
  // c'est la partie XXXX.
  idPublie: 'COLLEZ_ICI_L_ID_PUBLIE',

  // gid de chaque onglet : dans l'URL de votre feuille Google Sheets,
  // quand vous cliquez sur l'onglet, le paramètre #gid=NNN donne la valeur.
  onglets: {
    config: '0',      // onglet "Config"   (clé / valeur)
    produits: '0'     // onglet "Produits" (une ligne = une création)
  }

  // Alternative : si vous publiez chaque onglet séparément, collez plutôt
  // les URL complètes ici et laissez idPublie vide :
  // url: {
  //   config:   'https://docs.google.com/spreadsheets/d/e/AAAA/pub?output=csv',
  //   produits: 'https://docs.google.com/spreadsheets/d/e/BBBB/pub?output=csv'
  // }
};
