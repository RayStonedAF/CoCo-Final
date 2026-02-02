import axios from 'axios';

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || 'llama3';

/**
 * Call Ollama API for chat completions
 * Returns a single reply from the model
 */
export async function callOllamaChat(messages) {
  try {
    console.log(`[Ollama] Calling ${OLLAMA_BASE_URL}/api/chat with model ${OLLAMA_MODEL}`);
    const response = await axios.post(
      `${OLLAMA_BASE_URL}/api/chat`,
      {
        model: OLLAMA_MODEL,
        messages: messages,
        stream: false
      },
      {
        timeout: 30000 // 30 second timeout
      }
    );

    const content = response.data.message?.content || '';
    console.log(`[Ollama] Success: ${content.substring(0, 100)}...`);
    return content;
  } catch (error) {
    console.error('Error calling Ollama chat:', error.message);
    console.error('Ollama Base URL:', OLLAMA_BASE_URL);
    console.error('Ollama Model:', OLLAMA_MODEL);
    return null;
  }
}

/**
 * Generate a short recipe summary using AI
 */
export async function generateRecipeSummary(recipeName, category, area, ingredients, steps) {
  const ingredientList = ingredients
    .map(ing => `${ing.name} (${ing.measure})`)
    .join(', ');
  
  const stepPreview = steps.slice(0, 2).join(' ');

  const prompt = `You are a friendly cooking companion AI named CoCo. Generate a short, engaging 2-3 sentence summary of this recipe:
Name: ${recipeName}
Category: ${category}
Area: ${area}
Ingredients: ${ingredientList}
First steps: ${stepPreview}

Keep it friendly, encouraging, and concise. Mention something interesting about the recipe or cuisine.`;

  const messages = [
    {
      role: 'user',
      content: prompt
    }
  ];

  const reply = await callOllamaChat(messages);
  
  if (!reply) {
    // Fallback response if Ollama is not available
    return `A delicious ${category.toLowerCase()} recipe from ${area}. This dish features ${ingredients.slice(0, 2).map(i => i.name.toLowerCase()).join(' and ')}. Perfect for trying something new in the kitchen!`;
  }

  return reply;
}

/**
 * Chat endpoint for multi-turn conversation
 */
export async function chatWithCoco(messages, userName = 'friend') {
  // Ensure system message is first
  if (messages.length === 0 || messages[0].role !== 'system') {
    messages.unshift({
      role: 'system',
      content: `You are CoCo, a friendly and encouraging cooking companion AI. You help ${userName} find recipes, answer cooking questions, and provide encouragement. Keep responses concise and friendly. End with a cooking tip or encouragement when appropriate.`
    });
  }

  console.log(`[CoCo Chat] Sending ${messages.length} messages to Ollama (${OLLAMA_MODEL})`);
  const reply = await callOllamaChat(messages);

  if (!reply) {
    console.warn(`[CoCo Chat] Ollama returned no response. Messages sent: ${JSON.stringify(messages)}`);
    // Fallback if Ollama unavailable
    const lastMessage = messages[messages.length - 1]?.content || '';
    if (lastMessage.toLowerCase().includes('help')) {
      return `Hi ${userName}! I'm CoCo, your cooking companion. I can help you find recipes, answer cooking questions, or just chat about food. What would you like to know?`;
    }
    return `That sounds interesting! Keep exploring great recipes and let me know how I can help, ${userName}!`;
  }

  console.log(`[CoCo Chat] Ollama responded: ${reply.substring(0, 100)}...`);
  return reply;
}
