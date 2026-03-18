export const INGREDIENTS_LIST = [
  // Légumes
  'Ail', 'Artichaut', 'Asperges', 'Aubergine', 'Avocat',
  'Betterave', 'Brocoli', 'Carotte', 'Carottes', 'Céleri',
  'Champignons', 'Chou', 'Chou-fleur', 'Chou rouge', 'Citrouille',
  'Concombre', 'Courgette', 'Courgettes', 'Cresson', 'Échalotes',
  'Endive', 'Épinards', 'Fenouil', 'Gingembre', 'Haricots verts',
  'Laitue', 'Maïs', 'Navet', 'Oignon', 'Oignons', 'Patate douce',
  'Petit pois', 'Poireau', 'Poireaux', 'Poivron', 'Poivrons',
  'Pomme de terre', 'Pommes de terre', 'Radis', 'Salade verte',
  'Tomate', 'Tomates', 'Tomates cerises',
  // Fruits
  'Abricot', 'Ananas', 'Banane', 'Bananes', 'Cerise', 'Citron',
  'Citron vert', 'Fraise', 'Fraises', 'Framboise', 'Kiwi',
  'Mangue', 'Melon', 'Orange', 'Pamplemousse', 'Pêche',
  'Poire', 'Pomme', 'Pommes', 'Prune', 'Raisin',
  // Viandes
  'Agneau', 'Boeuf', 'Canard', 'Dinde', 'Escalope de poulet',
  'Jambon', 'Lapin', 'Lardons', 'Porc', 'Poulet',
  'Saucisse', 'Steak haché', 'Veau', 'Viande hachée',
  // Poissons
  'Cabillaud', 'Crevettes', 'Dorade', 'Moules', 'Saumon',
  'Sardine', 'Thon', 'Truite',
  // Produits laitiers
  'Beurre', 'Brie', 'Camembert', 'Comté', 'Crème fraîche',
  'Crème liquide', 'Emmental', 'Fromage', 'Fromage râpé',
  'Gruyère', 'Lait', 'Mascarpone', 'Mozzarella', 'Parmesan',
  'Reblochon', 'Ricotta', 'Roquefort', 'Yaourt',
  // Oeufs
  'Oeufs', 'Oeuf',
  // Féculents
  'Farine', 'Lentilles', 'Pain', 'Pain de mie', 'Pâtes',
  'Pois chiches', 'Quinoa', 'Riz', 'Riz arborio', 'Semoule',
  // Condiments
  'Huile d\'olive', 'Ketchup', 'Mayonnaise', 'Moutarde',
  'Sauce soja', 'Vinaigre', 'Vinaigre balsamique',
  // Épices et herbes
  'Aneth', 'Basilic', 'Cannelle', 'Ciboulette', 'Coriandre',
  'Cumin', 'Curcuma', 'Curry', 'Herbes de Provence', 'Laurier',
  'Menthe', 'Muscade', 'Origan', 'Paprika', 'Persil',
  'Poivre', 'Romarin', 'Sel', 'Thym',
  // Conserves
  'Olives', 'Olives noires', 'Pesto', 'Sauce tomate',
  'Thon en boîte', 'Tomates concassées',
  // Sucré
  'Amandes', 'Chocolat noir', 'Confiture', 'Farine',
  'Miel', 'Noisettes', 'Noix', 'Nutella',
  'Pâte brisée', 'Sucre', 'Vanille',
  // Liquides
  'Bouillon de boeuf', 'Bouillon de légumes', 'Bouillon de poulet',
  'Lait de coco', 'Vin blanc', 'Vin rouge',
];

export function searchIngredients(query) {
  if (!query || query.trim().length < 1) return [];
  const q = query.toLowerCase().trim();
  return INGREDIENTS_LIST.filter(ing =>
    ing.toLowerCase().includes(q)
  ).slice(0, 8);
}
