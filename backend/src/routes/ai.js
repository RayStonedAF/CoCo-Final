import express from 'express';
import * as ollama from '../services/ollama.js';

const router = express.Router();

/**
 * POST /api/ai/recipe-summary
 * Generate a short summary of a recipe using AI
 */
router.post('/recipe-summary', async (req, res) => {
  try {
    const { recipeName, category, area, ingredients, steps } = req.body;
    
    if (!recipeName || !ingredients || !steps) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const summary = await ollama.generateRecipeSummary(
      recipeName,
      category || 'Unknown',
      area || 'Unknown',
      ingredients,
      steps
    );

    res.json({ text: summary });
  } catch (error) {
    console.error('Error in /recipe-summary:', error);
    res.status(500).json({ error: error.message });
  }
});

/**
 * POST /api/ai/chat
 * Chat endpoint for multi-turn conversation
 */
router.post('/chat', async (req, res) => {
  try {
    const { messages, userName } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'Messages array required' });
    }

    const reply = await ollama.chatWithCoco(messages, userName || 'friend');

    res.json({ reply });
  } catch (error) {
    console.error('Error in /chat:', error);
    res.status(500).json({ error: error.message });
  }
});

export default router;
