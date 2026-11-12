// ============================================================
// CONFIGURATION GOOGLE SHEETS
// C'est le SEUL fichier à modifier pour brancher vos données.
// Procédure complète dans README.md.
// ============================================================

const SHEET = {
  // ID de la feuille publiée sur le web :
  // dans l'URL publiée (https://docs.google.com/spreadsheets/d/e/XXXX/pub?output=csv),
  // c'est UNIQUEMENT la partie XXXX (pas l'URL entière).
  idPublie: '2PACX-1vTJS-vW2swqAvde8dwcvTf7oZJLXKokO4xTk6vUuka81JF6XgVof8hbYx9SdYy-a0MewayqB6vs06iY',

  // gid de chaque onglet : dans l'URL de votre feuille Google Sheets,
  // quand vous cliquez sur l'onglet, le paramètre #gid=NNN donne la valeur.
  // Ici on met UNIQUEMENT le nombre NNN.
  onglets: {
    config: '1202838876',      // onglet "Config"   (clé / valeur)
    produits: '628485592'      // onglet "Produits" (une ligne = une création)
  }

  // Alternative : si vous publiez chaque onglet séparément, collez plutôt
  // les URL complètes ici et laissez idPublie vide :
  // url: {
  //   config:   'https://docs.google.com/spreadsheets/d/e/AAAA/pub?output=csv',
  //   produits: 'https://docs.google.com/spreadsheets/d/e/BBBB/pub?output=csv'
  // }
};
