// ============================================================
// APPLICATION
// 1. Construit les URL CSV de la feuille publiée (config.js)
// 2. Charge les onglets "Config" et "Produits" de Google Sheets
// 3. Rend le site ; si la feuille n'est pas branchée ou injoignable,
//    on retombe sur les données de démonstration.
// ============================================================

// Extrait l'ID publié d'une valeur qui peut être l'ID seul ("2PACX-...")
// ou l'URL de publication complète ("https://docs.google.com/.../d/e/2PACX-.../pub...").
function normaliserIdPublie(valeur) {
  const brut = String(valeur || '').trim();
  const m = brut.match(/\/d\/e\/([^/?#]+)/);
  return m ? m[1] : brut;
}

// Extrait le gid d'une valeur qui peut être "123456", "gid=123456" ou "#gid=123456".
function normaliserGid(valeur) {
  const brut = String(valeur || '');
  const m = brut.match(/gid=(\d+)/);
  return m ? m[1] : brut.replace(/\D/g, '');
}

// Construit l'URL CSV d'un onglet à partir de la configuration.
function urlOnglet(nomOnglet) {
  if (SHEET.url && SHEET.url[nomOnglet]) return SHEET.url[nomOnglet];
  const gid = normaliserGid(SHEET.onglets[nomOnglet]);
  return 'https://docs.google.com/spreadsheets/d/e/' + normaliserIdPublie(SHEET.idPublie) +
         '/pub?gid=' + gid + '&single=true&output=csv';
}

// La feuille est considérée comme branchée si un vrai ID est renseigné.
function feuilleBranchee() {
  const id = normaliserIdPublie(SHEET.idPublie);
  return id !== '' && id.indexOf('COLLEZ') === -1;
}

async function chargerTexte(url) {
  const reponse = await fetch(url, { cache: 'no-store' });
  if (!reponse.ok) throw new Error('HTTP ' + reponse.status + ' pour ' + url);
  return reponse.text();
}

// Onglet "Config" : lignes cle,valeur -> objet { cle: valeur }
async function chargerConfig() {
  const texte = await chargerTexte(urlOnglet('config'));
  const lignes = csvEnObjets(texte);
  const config = {};
  lignes.forEach(l => {
    if (l.cle) config[l.cle.toLowerCase()] = l.valeur || '';
  });
  return config;
}

// Normalise le champ image de la feuille :
// - URL absolue ("https://...") -> conservée telle quelle
// - chemin relatif explicite ("images/x.jpg") -> conservé
// - simple nom de fichier ("x.jpg") -> "images/x.jpg"
function normaliserImage(valeur) {
  const s = String(valeur || '').trim();
  if (!s) return '';
  if (/^https?:\/\//i.test(s)) return s;
  if (s.includes('/')) return s;
  return 'images/' + s;
}

// Onglet "Produits" : une ligne = une création.
// Colonnes attendues : nom, description, prix, image, categorie, vedette
async function chargerProduits() {
  const texte = await chargerTexte(urlOnglet('produits'));
  return csvEnObjets(texte)
    .filter(p => p.nom)
    .map(p => ({
      nom: p.nom,
      description: p.description || '',
      prix: parsePrix(p.prix),
      image: normaliserImage(p.image),
      categorie: p.categorie || 'Divers',
      vedette: (p.vedette || '').toLowerCase() === 'oui'
    }));
}

// Applique les valeurs de config aux éléments portant data-config="cle".
function appliquerConfig(config) {
  document.querySelectorAll('[data-config]').forEach(el => {
    const cle = el.getAttribute('data-config');
    if (config[cle] !== undefined && config[cle] !== '') {
      el.textContent = config[cle];
    }
  });
  const titre = config.nom_boutique;
  if (titre) document.title = titre + ' — fleuriste';
}

// Construit une carte produit.
function creerCarteProduit(p) {
  const carte = document.createElement('article');
  carte.className = 'card produit';
  carte.dataset.categorie = p.categorie;

  const visuel = document.createElement('div');
  visuel.className = 'visuel';
  if (p.image) {
    const img = document.createElement('img');
    img.src = p.image;
    img.alt = p.nom;
    img.loading = 'lazy';
    img.onerror = () => { img.remove(); };
    visuel.appendChild(img);
  }
  if (p.vedette) {
    const badge = document.createElement('span');
    badge.className = 'badge-vedette';
    badge.textContent = 'Coup de cœur';
    visuel.appendChild(badge);
  }

  const corps = document.createElement('div');
  corps.className = 'corps';

  const h3 = document.createElement('h3');
  h3.textContent = p.nom;

  const cat = document.createElement('p');
  cat.className = 'categorie';
  cat.textContent = p.categorie;

  const desc = document.createElement('p');
  desc.className = 'description';
  desc.textContent = p.description;

  const prix = document.createElement('p');
  prix.className = 'prix';
  prix.textContent = p.prix !== null ? formatPrix(p.prix) : 'Prix sur demande';

  corps.append(h3, cat, desc, prix);
  carte.append(visuel, corps);
  return carte;
}

// Rend la grille de produits + les boutons de filtre par catégorie.
function rendreProduits(produits) {
  const grille = document.getElementById('produits');
  const filtres = document.getElementById('filters');
  const vide = document.getElementById('produits-vide');
  grille.innerHTML = '';
  filtres.innerHTML = '';

  // Vedettes d'abord, puis ordre de la feuille.
  const tries = [...produits].sort((a, b) => (b.vedette ? 1 : 0) - (a.vedette ? 1 : 0));

  const categories = ['Toutes', ...new Set(tries.map(p => p.categorie))];
  categories.forEach((cat, i) => {
    const bouton = document.createElement('button');
    bouton.textContent = cat;
    if (i === 0) bouton.classList.add('active');
    bouton.addEventListener('click', () => {
      filtres.querySelectorAll('button').forEach(b => b.classList.remove('active'));
      bouton.classList.add('active');
      filtrer(cat);
    });
    filtres.appendChild(bouton);
  });

  function filtrer(cat) {
    let visible = 0;
    grille.querySelectorAll('.produit').forEach(carte => {
      const montre = cat === 'Toutes' || carte.dataset.categorie === cat;
      carte.style.display = montre ? '' : 'none';
      if (montre) visible++;
    });
    vide.hidden = visible > 0;
  }

  tries.forEach(p => grille.appendChild(creerCarteProduit(p)));
  filtrer('Toutes');
}

async function demarrer() {
  let config = DATA_EXEMPLE.config;
  let produits = DATA_EXEMPLE.produits;
  let demo = true;

  if (feuilleBranchee()) {
    try {
      const [cfg, prod] = await Promise.all([chargerConfig(), chargerProduits()]);
      if (Object.keys(cfg).length) config = Object.assign({}, DATA_EXEMPLE.config, cfg);
      if (prod.length) produits = prod;
      demo = false;
    } catch (err) {
      console.warn('Feuille Google Sheets injoignable, données de démo utilisées.', err);
    }
  }

  appliquerConfig(config);
  rendreProduits(produits);
  document.getElementById('demo-badge').hidden = !demo;
}

document.addEventListener('DOMContentLoaded', demarrer);
