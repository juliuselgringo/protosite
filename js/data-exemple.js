// ============================================================
// DONNÉES DE SECOURS (démonstration)
// Utilisées tant que la feuille Google Sheets n'est pas branchée
// dans config.js — le prototype s'affiche quand même.
// Structure identique à celle des onglets de la feuille.
// ============================================================

const DATA_EXEMPLE = {
  config: {
    nom_boutique: 'Les Fleurs de Julie',
    message_accueil: 'Des fleurs fraîches, cueillies avec amour',
    sous_titre: 'Bouquets, compositions et plantes pour chaque moment de la vie.',
    message_creations: 'Chaque création est préparée le jour même, avec des fleurs de saison.',
    horaires: 'Mar – Sam : 9h à 19h\nDim : 9h à 13h\nLun : fermé',
    adresse: '12 rue des Lilas\n75011 Paris',
    telephone: '01 23 45 67 89',
    email: 'bonjour@lesfleursdejulie.fr',
    message_footer: '© Les Fleurs de Julie — fait avec passion'
  },

  produits: [
    {
      nom: 'Bouquet de roses',
      description: 'Douze roses, emballage kraft et ruban de satin.',
      prix: 35,
      image: 'https://images.unsplash.com/photo-1561181286-d3fee7d55364?w=800&q=80',
      categorie: 'Bouquets',
      vedette: true
    },
    {
      nom: 'Bouquet champêtre',
      description: 'Mélange de fleurs de saison aux couleurs douces.',
      prix: 28,
      image: 'https://images.unsplash.com/photo-1490750967868-88aa4486c946?w=800&q=80',
      categorie: 'Bouquets',
      vedette: false
    },
    {
      nom: 'Composition blanche',
      description: 'Élégance tout en blanc pour un intérieur ou une table.',
      prix: 45,
      image: 'https://images.unsplash.com/photo-1508610048659-a06b669e3321?w=800&q=80',
      categorie: 'Compositions',
      vedette: true
    },
    {
      nom: 'Bouquet de mariée',
      description: 'Le bouquet des grands jours, discuté ensemble à l\'atelier.',
      prix: 89,
      image: 'https://images.unsplash.com/photo-1520763185298-1b434c919102?w=800&q=80',
      categorie: 'Mariage',
      vedette: false
    },
    {
      nom: 'Roses romantiques',
      description: 'Un classique intemporel, parfait pour dire merci.',
      prix: 32,
      image: 'https://images.unsplash.com/photo-1526047932273-341f2a7631f9?w=800&q=80',
      categorie: 'Bouquets',
      vedette: false
    },
    {
      nom: 'Plante verte en pot',
      description: 'Une plante facile à vivre pour égayer un bureau ou un salon.',
      prix: 18,
      image: 'https://images.unsplash.com/photo-1485955900006-10f4d324d411?w=800&q=80',
      categorie: 'Plantes',
      vedette: false
    }
  ]
};
