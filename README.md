# Prototype de site — fleuriste (HTML / CSS / JS + Google Sheets)

Site vitrine simple pour un petit artisan (ici un fleuriste). Les textes
d'accueil, les horaires, le contact **et la liste des créations avec leurs
prix** sont lus dans une feuille Google Sheets : l'utilisateur modifie ses
données directement dans la feuille, **sans toucher au code**.

## 1. Lancer le site en local

`fetch()` ne fonctionne pas en ouvrant le fichier directement (`file://`),
il faut un petit serveur local. Au choix :

- avec Python : `python -m http.server 8000` puis ouvrir http://localhost:8000
- avec VS Code : extension **Live Server** → clic droit sur `index.html` → « Open with Live Server »

Tant que la feuille n'est pas branchée, le site s'affiche avec les données de
démonstration (`js/data-exemple.js`) et un bandeau l'indique en bas de page.

## 2. Créer la feuille Google Sheets

1. Créez une feuille vide sur https://sheets.new
2. Onglet 1 nommé **Config** : `Fichier > Importer` le fichier `modele/Config.csv`
   (colonnes `cle,valeur` : nom_boutique, message_accueil, sous_titre,
   message_creations, horaires, adresse, telephone, email, message_footer)
3. Onglet 2 nommé **Produits** : importer `modele/Produits.csv`
   (colonnes `nom,description,prix,image,categorie,vedette` — `vedette` = `oui`/`non`,
   `prix` accepte `12,50` ou `12.50`)
4. Ajoutez/modifiez/supprimez des lignes à volonté : ce sont vos créations.

## 3. Publier la feuille sur le web

1. Dans la feuille : `Fichier > Partager > Publier sur le web`
2. Format : **CSV**, et dans la liste déroulante choisissez **« Classeur entier »**
   (pour avoir les deux onglets) — sinon publiez chaque onglet séparément.
3. Cliquez sur **Publier**, puis copiez l'URL obtenue.
4. Dans `js/config.js` (le seul fichier à modifier) :
   - dans `idPublie`, collez **uniquement la partie `XXXXXXX`** entre `/d/e/` et
     `/pub` de l'URL publiée — pas l'URL entière
   - dans `onglets`, mettez **uniquement le nombre `NNN`** après `#gid=` (dans
     l'URL de la feuille, cliquez sur l'onglet : le `#gid=NNN` affiché donne
     la valeur)

## 4. Modifier le site sans toucher au code

- **Prix, créations, catégories** → onglet `Produits`
- **Message d'accueil, horaires, adresse, téléphone, nom de la boutique** → onglet `Config`
- Les changements apparaissent au rechargement de la page (la publication Google
  peut mettre quelques minutes à se rafraîchir côté serveur).

## 5. Héberger gratuitement sur GitHub Pages

Oui — le site est 100 % statique, GitHub Pages suffit (gratuit, HTTPS automatique,
aucun serveur à gérer).

1. Créez un dépôt vide sur github.com (ex. `protoSite`). Pour une URL racine
   `https://<pseudo>.github.io/`, nommez le dépôt `<pseudo>.github.io` ;
   sinon le site sera à `https://<pseudo>.github.io/protoSite/`.
2. En local, dans ce dossier :
   ```
   git init
   git add .
   git commit -m "Prototype site fleuriste"
   git branch -M main
   git remote add origin https://github.com/<pseudo>/protoSite.git
   git push -u origin main
   ```
3. Sur GitHub : `Settings > Pages > Source : Deploy from a branch`,
   branche `main`, dossier `/ (root)`, puis **Save**.
4. Au bout de 1–2 minutes, le site est en ligne à l'URL affichée dans la
   section Pages.

Pourquoi la feuille Google Sheets fonctionne depuis GitHub Pages : la feuille
publiée en CSV est servie avec l'en-tête `Access-Control-Allow-Origin: *`, donc
le `fetch()` du site est autorisé depuis n'importe quel domaine, y compris
`github.io`. Aucune clé API ni configuration CORS nécessaire.

Mise à jour du site : modifiez les fichiers, puis `git add . && git commit &&
git push` → Pages redéploie automatiquement (~1 min). Les données de la
feuille, elles, changent indépendamment, sans aucun push.

## Structure

```
├── index.html            structure des sections
├── css/style.css         mise en forme
├── js/config.js          ID de la feuille publiée (à renseigner)
├── js/csv.js             parseur CSV + formatage des prix
├── js/data-exemple.js    données de secours si la feuille n'est pas branchée
├── js/app.js             chargement de la feuille + rendu
└── modele/               CSV modèles à importer dans Google Sheets
```
