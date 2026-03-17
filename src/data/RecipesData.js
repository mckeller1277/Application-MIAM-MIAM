// Base de recettes françaises — Miam Miam
export const RECIPES = [
  // ===== OEUFS =====
  {
    id: '1', title: 'Omelette aux champignons', category: 'Oeufs', time: 10, difficulty: 'Facile',
    emoji: '🍳',
    ingredients: [
      { name: 'Oeufs', measure: '3 pièces' },
      { name: 'Champignons', measure: '100g' },
      { name: 'Beurre', measure: '20g' },
      { name: 'Sel et poivre', measure: 'selon goût' },
    ],
    steps: [
      'Nettoyer et émincer les champignons.',
      'Faire revenir les champignons dans le beurre 3 minutes à feu moyen.',
      'Battre les oeufs dans un bol avec sel et poivre.',
      'Verser les oeufs dans la poêle sur les champignons.',
      'Cuire à feu moyen en repliant les bords. Servir chaud.',
    ],
    keywords: ['oeufs', 'champignons', 'beurre'],
  },
  {
    id: '2', title: 'Oeufs brouillés à la crème', category: 'Oeufs', time: 8, difficulty: 'Facile',
    emoji: '🥚',
    ingredients: [
      { name: 'Oeufs', measure: '4 pièces' },
      { name: 'Crème fraîche', measure: '2 cuillères à soupe' },
      { name: 'Beurre', measure: '15g' },
      { name: 'Ciboulette', measure: 'quelques brins' },
    ],
    steps: [
      'Casser les oeufs dans un bol et battre avec la crème, sel et poivre.',
      'Faire fondre le beurre à feu doux dans une casserole.',
      'Verser les oeufs et remuer constamment avec une spatule.',
      'Retirer du feu quand les oeufs sont encore légèrement liquides.',
      'Parsemer de ciboulette et servir immédiatement.',
    ],
    keywords: ['oeufs', 'crème', 'beurre'],
  },
  {
    id: '3', title: 'Quiche lorraine', category: 'Oeufs', time: 45, difficulty: 'Moyen',
    emoji: '🥧',
    ingredients: [
      { name: 'Oeufs', measure: '3 pièces' },
      { name: 'Lardons', measure: '150g' },
      { name: 'Crème fraîche', measure: '200ml' },
      { name: 'Fromage râpé', measure: '80g' },
      { name: 'Pâte brisée', measure: '1 rouleau' },
    ],
    steps: [
      'Préchauffer le four à 180°C.',
      'Dérouler la pâte dans un moule à tarte.',
      'Faire revenir les lardons à la poêle.',
      'Mélanger oeufs, crème, sel, poivre et lardons.',
      'Verser sur la pâte, parsemer de fromage.',
      'Cuire 30 minutes jusqu\'à ce que la quiche soit dorée.',
    ],
    keywords: ['oeufs', 'lardons', 'crème', 'fromage'],
  },

  // ===== PÂTES =====
  {
    id: '4', title: 'Pâtes à la carbonara', category: 'Pâtes', time: 20, difficulty: 'Moyen',
    emoji: '🍝',
    ingredients: [
      { name: 'Pâtes', measure: '200g' },
      { name: 'Lardons', measure: '100g' },
      { name: 'Oeufs', measure: '2 pièces' },
      { name: 'Parmesan', measure: '50g' },
      { name: 'Poivre noir', measure: 'généreusement' },
    ],
    steps: [
      'Cuire les pâtes al dente dans de l\'eau salée.',
      'Faire revenir les lardons à sec dans une poêle.',
      'Battre les oeufs avec le parmesan râpé et beaucoup de poivre.',
      'Égoutter les pâtes en gardant un peu d\'eau de cuisson.',
      'Mélanger les pâtes chaudes avec les lardons hors du feu.',
      'Ajouter le mélange oeufs-parmesan et remuer rapidement. Servir.',
    ],
    keywords: ['pâtes', 'lardons', 'oeufs', 'parmesan', 'fromage'],
  },
  {
    id: '5', title: 'Pâtes à la tomate et basilic', category: 'Pâtes', time: 20, difficulty: 'Facile',
    emoji: '🍅',
    ingredients: [
      { name: 'Pâtes', measure: '200g' },
      { name: 'Tomates', measure: '3 pièces' },
      { name: 'Ail', measure: '2 gousses' },
      { name: 'Huile d\'olive', measure: '3 cuillères à soupe' },
      { name: 'Basilic frais', measure: 'quelques feuilles' },
    ],
    steps: [
      'Cuire les pâtes dans de l\'eau bouillante salée.',
      'Couper les tomates en dés. Émincer l\'ail.',
      'Faire revenir l\'ail dans l\'huile d\'olive 1 minute.',
      'Ajouter les tomates et cuire 10 minutes à feu moyen.',
      'Égoutter les pâtes et mélanger avec la sauce.',
      'Ajouter le basilic frais et servir.',
    ],
    keywords: ['pâtes', 'tomates', 'ail', 'basilic'],
  },
  {
    id: '6', title: 'Gratin de pâtes au fromage', category: 'Pâtes', time: 35, difficulty: 'Facile',
    emoji: '🧀',
    ingredients: [
      { name: 'Pâtes', measure: '250g' },
      { name: 'Fromage râpé', measure: '150g' },
      { name: 'Lait', measure: '300ml' },
      { name: 'Beurre', measure: '30g' },
      { name: 'Farine', measure: '2 cuillères à soupe' },
    ],
    steps: [
      'Cuire les pâtes et les égoutter.',
      'Préparer une béchamel : faire fondre le beurre, ajouter la farine, puis le lait progressivement.',
      'Remuer jusqu\'à épaississement. Ajouter la moitié du fromage.',
      'Mélanger les pâtes avec la béchamel.',
      'Verser dans un plat, parsemer du reste de fromage.',
      'Gratiner au four à 200°C pendant 15 minutes.',
    ],
    keywords: ['pâtes', 'fromage', 'lait', 'beurre'],
  },

  // ===== VIANDE =====
  {
    id: '7', title: 'Poulet rôti aux herbes', category: 'Viande', time: 70, difficulty: 'Facile',
    emoji: '🍗',
    ingredients: [
      { name: 'Poulet', measure: '1 entier' },
      { name: 'Beurre', measure: '50g' },
      { name: 'Ail', measure: '4 gousses' },
      { name: 'Romarin', measure: '2 branches' },
      { name: 'Thym', measure: '4 branches' },
    ],
    steps: [
      'Préchauffer le four à 200°C.',
      'Frotter le poulet avec le beurre mou, sel et poivre.',
      'Glisser l\'ail et les herbes à l\'intérieur du poulet.',
      'Placer dans un plat et enfourner 60 minutes.',
      'Arroser régulièrement avec le jus de cuisson.',
      'Laisser reposer 10 minutes avant de servir.',
    ],
    keywords: ['poulet', 'beurre', 'ail', 'romarin', 'thym'],
  },
  {
    id: '8', title: 'Boeuf bourguignon', category: 'Viande', time: 150, difficulty: 'Difficile',
    emoji: '🥩',
    ingredients: [
      { name: 'Boeuf', measure: '800g' },
      { name: 'Vin rouge', measure: '500ml' },
      { name: 'Carottes', measure: '3 pièces' },
      { name: 'Oignons', measure: '2 pièces' },
      { name: 'Champignons', measure: '200g' },
      { name: 'Lardons', measure: '100g' },
    ],
    steps: [
      'Couper le boeuf en gros cubes. Éplucher et couper les légumes.',
      'Faire dorer les lardons et la viande dans une cocotte.',
      'Ajouter les oignons et carottes, faire revenir 5 minutes.',
      'Verser le vin rouge et autant d\'eau. Saler, poivrer.',
      'Laisser mijoter à couvert 2 heures à feu doux.',
      'Ajouter les champignons 20 minutes avant la fin.',
    ],
    keywords: ['boeuf', 'carottes', 'oignons', 'champignons', 'lardons'],
  },
  {
    id: '9', title: 'Escalopes de poulet à la crème', category: 'Viande', time: 25, difficulty: 'Facile',
    emoji: '🍗',
    ingredients: [
      { name: 'Escalopes de poulet', measure: '2 pièces' },
      { name: 'Crème fraîche', measure: '150ml' },
      { name: 'Moutarde', measure: '1 cuillère à soupe' },
      { name: 'Beurre', measure: '20g' },
      { name: 'Échalotes', measure: '2 pièces' },
    ],
    steps: [
      'Émincer les échalotes.',
      'Faire dorer les escalopes dans le beurre 5 minutes de chaque côté.',
      'Réserver les escalopes au chaud.',
      'Faire revenir les échalotes dans la même poêle.',
      'Ajouter la crème et la moutarde, mélanger et chauffer 3 minutes.',
      'Napper les escalopes de sauce et servir.',
    ],
    keywords: ['poulet', 'crème', 'moutarde', 'beurre'],
  },

  // ===== LÉGUMES =====
  {
    id: '10', title: 'Soupe de légumes maison', category: 'Légumes', time: 35, difficulty: 'Facile',
    emoji: '🥣',
    ingredients: [
      { name: 'Carottes', measure: '3 pièces' },
      { name: 'Pommes de terre', measure: '2 pièces' },
      { name: 'Poireaux', measure: '2 pièces' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Bouillon de légumes', measure: '1 litre' },
    ],
    steps: [
      'Éplucher et couper tous les légumes en morceaux.',
      'Faire revenir l\'oignon dans un peu d\'huile.',
      'Ajouter les légumes et le bouillon.',
      'Porter à ébullition puis laisser mijoter 25 minutes.',
      'Mixer jusqu\'à obtenir une texture lisse.',
      'Rectifier l\'assaisonnement et servir chaud.',
    ],
    keywords: ['carottes', 'pommes de terre', 'poireaux', 'oignon'],
  },
  {
    id: '11', title: 'Ratatouille provençale', category: 'Légumes', time: 50, difficulty: 'Moyen',
    emoji: '🫑',
    ingredients: [
      { name: 'Courgettes', measure: '2 pièces' },
      { name: 'Aubergine', measure: '1 pièce' },
      { name: 'Poivrons', measure: '2 pièces' },
      { name: 'Tomates', measure: '3 pièces' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Ail', measure: '3 gousses' },
    ],
    steps: [
      'Couper tous les légumes en dés.',
      'Faire revenir l\'oignon et l\'ail dans l\'huile d\'olive.',
      'Ajouter les poivrons, cuire 5 minutes.',
      'Ajouter l\'aubergine et les courgettes, cuire 10 minutes.',
      'Incorporer les tomates, sel, poivre et herbes de Provence.',
      'Laisser mijoter 25 minutes à feu doux.',
    ],
    keywords: ['courgettes', 'aubergine', 'poivrons', 'tomates', 'oignon', 'ail'],
  },
  {
    id: '12', title: 'Gratin dauphinois', category: 'Légumes', time: 70, difficulty: 'Facile',
    emoji: '🥔',
    ingredients: [
      { name: 'Pommes de terre', measure: '800g' },
      { name: 'Crème fraîche', measure: '300ml' },
      { name: 'Lait', measure: '200ml' },
      { name: 'Ail', measure: '2 gousses' },
      { name: 'Fromage râpé', measure: '80g' },
    ],
    steps: [
      'Préchauffer le four à 180°C.',
      'Éplucher et couper les pommes de terre en fines rondelles.',
      'Frotter un plat à gratin avec l\'ail.',
      'Mélanger crème et lait, saler, poivrer.',
      'Disposer les pommes de terre, verser le mélange crème-lait.',
      'Parsemer de fromage râpé et cuire 55 minutes.',
    ],
    keywords: ['pommes de terre', 'crème', 'lait', 'ail', 'fromage'],
  },

  // ===== RIZ =====
  {
    id: '13', title: 'Riz cantonais', category: 'Riz', time: 25, difficulty: 'Facile',
    emoji: '🍚',
    ingredients: [
      { name: 'Riz', measure: '200g' },
      { name: 'Oeufs', measure: '2 pièces' },
      { name: 'Petits pois', measure: '100g' },
      { name: 'Jambon', measure: '100g' },
      { name: 'Sauce soja', measure: '2 cuillères à soupe' },
    ],
    steps: [
      'Cuire le riz et laisser refroidir.',
      'Couper le jambon en petits dés.',
      'Faire revenir le riz dans une poêle avec de l\'huile.',
      'Pousser le riz sur le côté et brouiller les oeufs.',
      'Mélanger avec le riz, ajouter petits pois et jambon.',
      'Assaisonner avec la sauce soja. Servir chaud.',
    ],
    keywords: ['riz', 'oeufs', 'jambon', 'petits pois'],
  },
  {
    id: '14', title: 'Risotto aux champignons', category: 'Riz', time: 35, difficulty: 'Moyen',
    emoji: '🍄',
    ingredients: [
      { name: 'Riz arborio', measure: '200g' },
      { name: 'Champignons', measure: '200g' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Bouillon', measure: '800ml' },
      { name: 'Parmesan', measure: '50g' },
      { name: 'Beurre', measure: '30g' },
    ],
    steps: [
      'Émincer l\'oignon et trancher les champignons.',
      'Faire revenir l\'oignon dans le beurre.',
      'Ajouter le riz et le nacrer 2 minutes.',
      'Ajouter le bouillon chaud louche par louche en remuant.',
      'Incorporer les champignons après 15 minutes.',
      'Terminer avec le parmesan et le beurre. Servir.',
    ],
    keywords: ['riz', 'champignons', 'oignon', 'parmesan', 'beurre', 'fromage'],
  },

  // ===== POISSON =====
  {
    id: '15', title: 'Saumon à la crème et aneth', category: 'Poisson', time: 20, difficulty: 'Facile',
    emoji: '🐟',
    ingredients: [
      { name: 'Saumon', measure: '2 pavés' },
      { name: 'Crème fraîche', measure: '150ml' },
      { name: 'Aneth', measure: 'quelques brins' },
      { name: 'Citron', measure: '1 pièce' },
      { name: 'Beurre', measure: '20g' },
    ],
    steps: [
      'Assaisonner les pavés de saumon.',
      'Faire fondre le beurre dans une poêle.',
      'Cuire le saumon 4 minutes de chaque côté.',
      'Réserver le saumon.',
      'Déglacer avec le jus de citron, ajouter la crème.',
      'Incorporer l\'aneth et napper le saumon.',
    ],
    keywords: ['saumon', 'crème', 'citron', 'beurre'],
  },
  {
    id: '16', title: 'Thon aux tomates', category: 'Poisson', time: 15, difficulty: 'Facile',
    emoji: '🐟',
    ingredients: [
      { name: 'Thon en boîte', measure: '2 boîtes' },
      { name: 'Tomates', measure: '3 pièces' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Ail', measure: '2 gousses' },
      { name: 'Olives', measure: '50g' },
    ],
    steps: [
      'Émincer l\'oignon et l\'ail. Couper les tomates en dés.',
      'Faire revenir l\'oignon et l\'ail dans l\'huile d\'olive.',
      'Ajouter les tomates et cuire 8 minutes.',
      'Incorporer le thon égoutté et les olives.',
      'Assaisonner et réchauffer 2 minutes.',
      'Servir sur du riz ou des pâtes.',
    ],
    keywords: ['thon', 'tomates', 'oignon', 'ail', 'olives'],
  },

  // ===== SALADES =====
  {
    id: '17', title: 'Salade niçoise', category: 'Salades', time: 15, difficulty: 'Facile',
    emoji: '🥗',
    ingredients: [
      { name: 'Salade verte', measure: '1 tête' },
      { name: 'Thon en boîte', measure: '1 boîte' },
      { name: 'Tomates', measure: '2 pièces' },
      { name: 'Oeufs durs', measure: '2 pièces' },
      { name: 'Olives noires', measure: '50g' },
    ],
    steps: [
      'Cuire les oeufs durs 10 minutes, les refroidir et les couper en quartiers.',
      'Couper les tomates en quartiers.',
      'Laver et essorer la salade.',
      'Disposer tous les ingrédients dans un saladier.',
      'Préparer une vinaigrette avec huile, vinaigre, sel et poivre.',
      'Assaisonner et servir immédiatement.',
    ],
    keywords: ['salade', 'thon', 'tomates', 'oeufs', 'olives'],
  },
  {
    id: '18', title: 'Salade César', category: 'Salades', time: 15, difficulty: 'Facile',
    emoji: '🥗',
    ingredients: [
      { name: 'Laitue romaine', measure: '1 pièce' },
      { name: 'Poulet', measure: '200g' },
      { name: 'Parmesan', measure: '40g' },
      { name: 'Croûtons', measure: '50g' },
      { name: 'Sauce César', measure: '3 cuillères à soupe' },
    ],
    steps: [
      'Griller ou poêler le poulet, laisser refroidir et couper en lanières.',
      'Laver et essorer la laitue, la déchirer en morceaux.',
      'Mélanger laitue, poulet, croûtons.',
      'Ajouter la sauce César et mélanger.',
      'Parsemer de parmesan en copeaux.',
      'Servir immédiatement.',
    ],
    keywords: ['salade', 'poulet', 'parmesan', 'fromage'],
  },

  // ===== SOUPES =====
  {
    id: '19', title: 'Soupe à l\'oignon gratinée', category: 'Soupes', time: 50, difficulty: 'Moyen',
    emoji: '🧅',
    ingredients: [
      { name: 'Oignons', measure: '4 gros' },
      { name: 'Beurre', measure: '40g' },
      { name: 'Bouillon de boeuf', measure: '1 litre' },
      { name: 'Pain', measure: '4 tranches' },
      { name: 'Fromage râpé', measure: '100g' },
    ],
    steps: [
      'Émincer finement les oignons.',
      'Les faire caraméliser dans le beurre 30 minutes à feu doux.',
      'Ajouter le bouillon, saler, poivrer. Cuire 15 minutes.',
      'Verser la soupe dans des bols allant au four.',
      'Poser une tranche de pain sur chaque bol, couvrir de fromage.',
      'Gratiner sous le gril 5 minutes jusqu\'à coloration.',
    ],
    keywords: ['oignons', 'beurre', 'pain', 'fromage'],
  },
  {
    id: '20', title: 'Velouté de carottes au gingembre', category: 'Soupes', time: 30, difficulty: 'Facile',
    emoji: '🥕',
    ingredients: [
      { name: 'Carottes', measure: '500g' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Gingembre frais', measure: '1 morceau' },
      { name: 'Crème fraîche', measure: '100ml' },
      { name: 'Bouillon', measure: '700ml' },
    ],
    steps: [
      'Éplucher et couper les carottes et l\'oignon.',
      'Faire revenir l\'oignon avec le gingembre râpé.',
      'Ajouter les carottes et le bouillon.',
      'Cuire 20 minutes à couvert.',
      'Mixer finement et incorporer la crème.',
      'Rectifier l\'assaisonnement et servir.',
    ],
    keywords: ['carottes', 'oignon', 'crème'],
  },

  // ===== DESSERTS =====
  {
    id: '21', title: 'Crêpes sucrées', category: 'Desserts', time: 30, difficulty: 'Facile',
    emoji: '🥞',
    ingredients: [
      { name: 'Farine', measure: '250g' },
      { name: 'Oeufs', measure: '3 pièces' },
      { name: 'Lait', measure: '500ml' },
      { name: 'Beurre', measure: '30g' },
      { name: 'Sucre', measure: '1 cuillère à soupe' },
    ],
    steps: [
      'Mélanger la farine et le sucre dans un saladier.',
      'Faire un puits et ajouter les oeufs battus.',
      'Incorporer progressivement le lait en mélangeant.',
      'Ajouter le beurre fondu. Laisser reposer 30 minutes.',
      'Cuire chaque crêpe dans une poêle beurrée.',
      'Servir avec confiture, nutella ou sucre.',
    ],
    keywords: ['farine', 'oeufs', 'lait', 'beurre', 'sucre'],
  },
  {
    id: '22', title: 'Mousse au chocolat', category: 'Desserts', time: 20, difficulty: 'Moyen',
    emoji: '🍫',
    ingredients: [
      { name: 'Chocolat noir', measure: '200g' },
      { name: 'Oeufs', measure: '4 pièces' },
      { name: 'Beurre', measure: '20g' },
      { name: 'Sucre', measure: '40g' },
    ],
    steps: [
      'Faire fondre le chocolat avec le beurre au bain-marie.',
      'Séparer les blancs des jaunes d\'oeufs.',
      'Mélanger les jaunes avec le sucre jusqu\'à blanchiment.',
      'Incorporer le chocolat fondu aux jaunes.',
      'Monter les blancs en neige ferme.',
      'Incorporer délicatement les blancs au mélange chocolat. Réfrigérer 2h.',
    ],
    keywords: ['chocolat', 'oeufs', 'beurre', 'sucre'],
  },
  {
    id: '23', title: 'Tarte aux pommes', category: 'Desserts', time: 50, difficulty: 'Facile',
    emoji: '🥧',
    ingredients: [
      { name: 'Pommes', measure: '4 pièces' },
      { name: 'Pâte brisée', measure: '1 rouleau' },
      { name: 'Sucre', measure: '50g' },
      { name: 'Beurre', measure: '30g' },
      { name: 'Cannelle', measure: '1 cuillère à café' },
    ],
    steps: [
      'Préchauffer le four à 180°C.',
      'Étaler la pâte dans un moule à tarte.',
      'Éplucher et couper les pommes en fines lamelles.',
      'Disposer les pommes en rosace sur la pâte.',
      'Saupoudrer de sucre et cannelle, parsemer de noisettes de beurre.',
      'Cuire 35 minutes jusqu\'à coloration dorée.',
    ],
    keywords: ['pommes', 'sucre', 'beurre', 'farine'],
  },

  // ===== PETITS DÉJEUNERS =====
  {
    id: '24', title: 'Pain perdu', category: 'Petits déjeuners', time: 15, difficulty: 'Facile',
    emoji: '🍞',
    ingredients: [
      { name: 'Pain rassis', measure: '4 tranches' },
      { name: 'Oeufs', measure: '2 pièces' },
      { name: 'Lait', measure: '100ml' },
      { name: 'Sucre', measure: '2 cuillères à soupe' },
      { name: 'Beurre', measure: '20g' },
    ],
    steps: [
      'Battre les oeufs avec le lait et la moitié du sucre.',
      'Tremper les tranches de pain dans ce mélange.',
      'Faire fondre le beurre dans une poêle.',
      'Cuire le pain 3 minutes de chaque côté jusqu\'à dorure.',
      'Saupoudrer du reste de sucre.',
      'Servir avec de la confiture ou du sirop d\'érable.',
    ],
    keywords: ['pain', 'oeufs', 'lait', 'sucre', 'beurre'],
  },
  {
    id: '25', title: 'Smoothie banane et lait', category: 'Petits déjeuners', time: 5, difficulty: 'Facile',
    emoji: '🥤',
    ingredients: [
      { name: 'Bananes', measure: '2 pièces' },
      { name: 'Lait', measure: '250ml' },
      { name: 'Miel', measure: '1 cuillère à soupe' },
      { name: 'Yaourt', measure: '1 pot' },
    ],
    steps: [
      'Peler les bananes et les couper en morceaux.',
      'Mettre tous les ingrédients dans un blender.',
      'Mixer jusqu\'à obtenir un mélange lisse.',
      'Servir immédiatement bien frais.',
    ],
    keywords: ['bananes', 'lait', 'yaourt', 'miel'],
  },

  // ===== PLATS COMPLETS =====
  {
    id: '26', title: 'Hachis parmentier', category: 'Plats complets', time: 60, difficulty: 'Moyen',
    emoji: '🥘',
    ingredients: [
      { name: 'Viande hachée', measure: '500g' },
      { name: 'Pommes de terre', measure: '800g' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Lait', measure: '100ml' },
      { name: 'Beurre', measure: '50g' },
      { name: 'Fromage râpé', measure: '80g' },
    ],
    steps: [
      'Cuire les pommes de terre et les écraser en purée avec lait et beurre.',
      'Faire revenir l\'oignon émincé dans du beurre.',
      'Ajouter la viande hachée et cuire 10 minutes. Assaisonner.',
      'Dans un plat, étaler la viande puis couvrir de purée.',
      'Parsemer de fromage râpé.',
      'Gratiner au four à 200°C pendant 20 minutes.',
    ],
    keywords: ['viande hachée', 'pommes de terre', 'oignon', 'lait', 'beurre', 'fromage'],
  },
  {
    id: '27', title: 'Poêlée de légumes au poulet', category: 'Plats complets', time: 30, difficulty: 'Facile',
    emoji: '🫕',
    ingredients: [
      { name: 'Poulet', measure: '300g' },
      { name: 'Poivrons', measure: '2 pièces' },
      { name: 'Courgettes', measure: '2 pièces' },
      { name: 'Oignon', measure: '1 pièce' },
      { name: 'Sauce soja', measure: '2 cuillères à soupe' },
    ],
    steps: [
      'Couper le poulet en lanières et les légumes en dés.',
      'Faire chauffer de l\'huile dans une grande poêle ou wok.',
      'Faire revenir le poulet 5 minutes à feu vif.',
      'Ajouter l\'oignon et les poivrons, cuire 5 minutes.',
      'Incorporer les courgettes et cuire encore 5 minutes.',
      'Assaisonner avec la sauce soja. Servir avec du riz.',
    ],
    keywords: ['poulet', 'poivrons', 'courgettes', 'oignon'],
  },
  {
    id: '28', title: 'Tartiflette', category: 'Plats complets', time: 60, difficulty: 'Facile',
    emoji: '🧀',
    ingredients: [
      { name: 'Pommes de terre', measure: '1kg' },
      { name: 'Reblochon', measure: '1 fromage' },
      { name: 'Lardons', measure: '200g' },
      { name: 'Oignons', measure: '2 pièces' },
      { name: 'Crème fraîche', measure: '150ml' },
    ],
    steps: [
      'Cuire les pommes de terre en robe des champs, les éplucher et couper en rondelles.',
      'Faire revenir les lardons et les oignons.',
      'Dans un plat beurré, alterner couches de pommes de terre et mélange lardons-oignons.',
      'Verser la crème fraîche.',
      'Couper le reblochon en deux dans l\'épaisseur et le poser croûte en haut.',
      'Cuire au four à 200°C pendant 25 minutes.',
    ],
    keywords: ['pommes de terre', 'fromage', 'lardons', 'oignons', 'crème'],
  },
  {
    id: '29', title: 'Couscous aux légumes', category: 'Plats complets', time: 40, difficulty: 'Facile',
    emoji: '🫙',
    ingredients: [
      { name: 'Semoule de couscous', measure: '200g' },
      { name: 'Courgettes', measure: '2 pièces' },
      { name: 'Carottes', measure: '2 pièces' },
      { name: 'Pois chiches', measure: '200g' },
      { name: 'Tomates', measure: '2 pièces' },
    ],
    steps: [
      'Couper les légumes en morceaux.',
      'Faire revenir les carottes et courgettes dans l\'huile.',
      'Ajouter les tomates coupées et les pois chiches égouttés.',
      'Assaisonner avec cumin, sel et poivre. Cuire 20 minutes.',
      'Préparer la semoule selon les instructions du paquet.',
      'Servir la semoule avec les légumes par-dessus.',
    ],
    keywords: ['courgettes', 'carottes', 'tomates', 'pois chiches'],
  },
  {
    id: '30', title: 'Croque-monsieur', category: 'Plats complets', time: 15, difficulty: 'Facile',
    emoji: '🥪',
    ingredients: [
      { name: 'Pain de mie', measure: '4 tranches' },
      { name: 'Jambon', measure: '2 tranches' },
      { name: 'Fromage', measure: '4 tranches' },
      { name: 'Beurre', measure: '20g' },
      { name: 'Moutarde', measure: '1 cuillère à café' },
    ],
    steps: [
      'Beurrer les tranches de pain sur une face.',
      'Étaler la moutarde sur l\'intérieur.',
      'Déposer le jambon et le fromage sur deux tranches.',
      'Refermer les sandwichs.',
      'Faire dorer dans une poêle beurrée 3 minutes de chaque côté.',
      'Servir chaud avec une salade verte.',
    ],
    keywords: ['pain', 'jambon', 'fromage', 'beurre', 'moutarde'],
  },
];

// Fonction de recherche par ingrédients
export function searchRecipes(ingredients) {
  if (!ingredients || ingredients.length === 0) return RECIPES;

  const normalizedIngredients = ingredients.map(i => i.toLowerCase().trim());

  const scored = RECIPES.map(recipe => {
    const recipeKeywords = recipe.keywords.map(k => k.toLowerCase());
    const recipeIngredients = recipe.ingredients.map(i => i.name.toLowerCase());

    let matchCount = 0;
    normalizedIngredients.forEach(ing => {
      const matches = recipeKeywords.some(k =>
        k.includes(ing) || ing.includes(k)
      ) || recipeIngredients.some(ri =>
        ri.includes(ing) || ing.includes(ri)
      );
      if (matches) matchCount++;
    });

    const matchPct = Math.round((matchCount / normalizedIngredients.length) * 100);
    return { ...recipe, matchCount, matchPct };
  });

  return scored
    .filter(r => r.matchCount > 0)
    .sort((a, b) => b.matchCount - a.matchCount);
}

// Fonction pour toutes les recettes populaires
export function getPopularRecipes() {
  return RECIPES.sort(() => Math.random() - 0.5);
}
