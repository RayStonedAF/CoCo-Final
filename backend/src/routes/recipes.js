import express from 'express';
import * as mealdb from '../services/mealdb.js';

const router = express.Router();

/**
 * GET /api/recipes/random
 * Get a random recipe
 */
router.get('/random', async (req, res) => {
  try {
    const recipe = await mealdb.getRandomRecipe();
    if (!recipe) {
      return res.status(404).json({ error: 'Failed to fetch random recipe' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error in /random:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/recipes/search?q=...
 * Search recipes by name
 */
router.get('/search', async (req, res) => {
  try {
    const query = req.query.q;
    if (!query || query.trim() === '') {
      return res.status(400).json({ error: 'Search query required' });
    }
    const recipes = await mealdb.searchRecipesByName(query);
    res.json(recipes);
  } catch (error) {
    console.error('Error in /search:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * GET /api/recipes/:id
 * Get a recipe by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const recipe = await mealdb.getRecipeById(req.params.id);
    if (!recipe) {
      return res.status(404).json({ error: 'Recipe not found' });
    }
    res.json(recipe);
  } catch (error) {
    console.error('Error in /:id:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
