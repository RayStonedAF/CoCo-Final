const BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

async function fetchAPI(endpoint, options = {}) {
  const url = `${BASE_URL}${endpoint}`;
  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        ...options.headers
      }
    });

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || `HTTP ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`API Error: ${endpoint}`, error);
    throw error;
  }
}

export const api = {
  // Recipes
  getRandomRecipe: () => fetchAPI('/api/recipes/random'),
  searchRecipes: (query) => fetchAPI(`/api/recipes/search?q=${encodeURIComponent(query)}`),
  getRecipeById: (id) => fetchAPI(`/api/recipes/${id}`),

  // AI
  generateRecipeSummary: async (recipeName, category, area, ingredients, steps) => {
    const response = await fetchAPI('/api/ai/recipe-summary', {
      method: 'POST',
      body: JSON.stringify({ recipeName, category, area, ingredients, steps })
    });
    return response.text || '';
  },

  chatWithCoco: async (messages, userName) => {
    const response = await fetchAPI('/api/ai/chat', {
      method: 'POST',
      body: JSON.stringify({ messages, userName })
    });
    return response.reply || '';
  }
};
