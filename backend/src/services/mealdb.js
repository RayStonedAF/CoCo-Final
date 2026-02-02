import axios from 'axios';

const MEALDB_BASE_URL = process.env.MEALDB_BASE_URL || 'https://www.themealdb.com/api/json/v1/1';

/**
 * Normalize a TheMealDB meal to our consistent Recipe format
 */
function normalizeMeal(meal) {
  if (!meal) return null;

  // Extract ingredients and measures
  const ingredients = [];
  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`];
    const measure = meal[`strMeasure${i}`];
    if (ingredient && ingredient.trim()) {
      ingredients.push({
        name: ingredient.trim(),
        measure: measure ? measure.trim() : ''
      });
    }
  }

  // Split instructions into steps by newline or period
  let steps = [];
  if (meal.strInstructions) {
    const instructions = meal.strInstructions;
    // Split by periods or newlines, then filter empty
    steps = instructions
      .split(/\.\s+|\n\n/)
      .map(s => s.trim())
      .filter(s => s.length > 0)
      .map(s => s.endsWith('.') ? s : s + '.');
  }

  // Derive timeMinutes heuristic
  let timeMinutes = 30; // default
  if (steps.length > 0) {
    timeMinutes = Math.max(15, Math.min(60, steps.length * 5 + 10));
  }

  // Derive difficulty heuristic
  let difficulty = 'easy';
  const ingredientCount = ingredients.length;
  const stepCount = steps.length;
  if (ingredientCount > 12 || stepCount > 8) {
    difficulty = 'hard';
  } else if (ingredientCount > 8 || stepCount > 5) {
    difficulty = 'medium';
  }

  return {
    id: meal.idMeal,
    name: meal.strMeal || '',
    image: meal.strMealThumb || '',
    category: meal.strCategory || '',
    area: meal.strArea || '',
    instructions: meal.strInstructions || '',
    steps,
    ingredients,
    timeMinutes,
    difficulty,
    shortInfo: '' // will be filled by AI or left empty
  };
}

/**
 * Fetch a random meal from TheMealDB
 */
export async function getRandomRecipe() {
  try {
    const response = await axios.get(`${MEALDB_BASE_URL}/random.php`);
    const meal = response.data.meals?.[0];
    return normalizeMeal(meal);
  } catch (error) {
    console.error('Error fetching random recipe:', error.message);
    return null;
  }
}

/**
 * Search recipes by name
 */
export async function searchRecipesByName(query) {
  try {
    const response = await axios.get(`${MEALDB_BASE_URL}/search.php`, {
      params: { s: query }
    });
    const meals = response.data.meals || [];
    return meals.map(normalizeMeal).filter(Boolean);
  } catch (error) {
    console.error('Error searching recipes:', error.message);
    return [];
  }
}

/**
 * Get a recipe by ID
 */
export async function getRecipeById(id) {
  try {
    const response = await axios.get(`${MEALDB_BASE_URL}/lookup.php`, {
      params: { i: id }
    });
    const meal = response.data.meals?.[0];
    return normalizeMeal(meal);
  } catch (error) {
    console.error('Error fetching recipe by ID:', error.message);
    return null;
  }
}

/**
 * Get recipes by category
 */
export async function getRecipesByCategory(category) {
  try {
    const response = await axios.get(`${MEALDB_BASE_URL}/filter.php`, {
      params: { c: category }
    });
    const meals = response.data.meals || [];
    // These are partial meals (only id, name, image), so fetch full details
    const fullRecipes = await Promise.all(
      meals.slice(0, 5).map(m => getRecipeById(m.idMeal))
    );
    return fullRecipes.filter(Boolean);
  } catch (error) {
    console.error('Error fetching recipes by category:', error.message);
    return [];
  }
}
