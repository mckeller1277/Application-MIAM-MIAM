import axios from 'axios';

const BASE_URL = 'https://www.themealdb.com/api/json/v1/1';

/**
 * Rechercher des recettes par ingrédient
 */
export async function searchByIngredient(ingredient) {
  const response = await axios.get(`${BASE_URL}/filter.php?i=${ingredient}`);
  return response.data.meals || [];
}

/**
 * Récupérer le détail d'une recette par son ID
 */
export async function getRecipeById(id) {
  const response = await axios.get(`${BASE_URL}/lookup.php?i=${id}`);
  const meal = response.data.meals?.[0];
  if (!meal) return null;

  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({ name: name.trim(), measure: measure?.trim() || '' });
    }
  }

  return {
    id: meal.idMeal,
    title: meal.strMeal,
    category: meal.strCategory,
    area: meal.strArea,
    instructions: meal.strInstructions,
    thumbnail: meal.strMealThumb,
    ingredients,
  };
}

/**
 * Rechercher des recettes pour une liste d'ingrédients
 * Retourne les recettes triées par taux de correspondance
 */
export async function searchByIngredients(ingredientList) {
  if (!ingredientList.length) return [];

  const results = await Promise.all(
    ingredientList.map(ing => searchByIngredient(ing).catch(() => []))
  );

  const counts = {};
  results.flat().forEach(meal => {
    if (!counts[meal.idMeal]) counts[meal.idMeal] = { meal, count: 0 };
    counts[meal.idMeal].count++;
  });

  return Object.values(counts)
    .sort((a, b) => b.count - a.count)
    .map(({ meal, count }) => ({
      ...meal,
      matchCount: count,
      matchPct: Math.round((count / ingredientList.length) * 100),
    }));
}
