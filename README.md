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
   `prix` accepte `12,50` ou `12.50`, `image` = nom du fichier photo, ex. `bouquet-roses.jpg`)
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

## 5. Les photos : lien Google Drive (recommandé) ou dossier `images/`

Deux façons de renseigner la colonne `image` de l'onglet `Produits`, au choix :

**Option A — lien Google Drive (recommandé pour les photos de téléphone).**
Clic droit sur la photo dans Drive → **Partager** → « Tous les utilisateurs
disposant du lien » (Lecteur) → copier le lien → le coller tel quel dans la
colonne `image` de la feuille. **Aucune compression à faire** : le site
demande à Google une version redimensionnée automatiquement (voir ci-dessous).

**Option B — dossier `images/` du dépôt** (servi gratuitement par GitHub
Pages, fichier tel quel) : déposez la photo dans `images/` et mettez
`bouquet-roses.jpg` (ou `images/bouquet-roses.jpg`) dans la colonne `image`.
Pour publier : `git add . && git commit && git push`, ou sur github.com
« Add file > Upload files ». Toute URL directe `https://...` (ex. Unsplash,
gratuit) fonctionne aussi.

### La miniature (thumbnail), simplement

Une photo de téléphone fait souvent 3 Mo. Drive conserve l'original, et
l'URL `https://drive.google.com/thumbnail?id=...&sz=w1600` demande à Google de
servir une **version réduite générée à la volée** : max 1600 px de large, JPEG
d'environ 300 Ko. C'est un service **différent** du téléchargement du fichier
brut (`uc?export=download&id=...`, celui qui renvoie parfois un 403 « quota de
téléchargements »), avec des limites bien plus larges : en pratique, **plus de
403 en usage normal**.

Le site demande la miniature ; si elle est refusée, un **placeholder gris**
s'affiche à la place (pas de repli sur le fichier brut). **Le thumbnail est
donc le fonctionnement par défaut** : plus besoin d'application de
compression tierce.

Deux conditions : la photo Drive doit rester partagée « tous les utilisateurs
disposant du lien » (sinon Google exige une connexion et l'image ne
s'affiche pas — testez l'URL dans une fenêtre de navigation privée), et si le
partage est retiré ou le fichier supprimé, l'image casse (repassez en partage,
ou utilisez l'option B). La miniature est limitée à 1600 px de large — très
suffisant pour une carte de site ; l'original reste disponible dans Drive.

## 6. Héberger gratuitement sur GitHub Pages

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
├── images/               vos photos (servies gratuitement, ex. images/bouquet-roses.jpg)
└── modele/               CSV modèles à importer dans Google Sheets
```
