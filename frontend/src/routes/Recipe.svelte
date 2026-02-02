<script>
  import { onMount, getContext } from 'svelte';
  import { params } from '../stores/paramsStore.js';
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import SegmentedTabs from '../components/SegmentedTabs.svelte';
  import PortionsControl from '../components/PortionsControl.svelte';
  import ErrorBanner from '../components/ErrorBanner.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import { api } from '../lib/api.js';
  import { favoritesStore } from '../stores/favoritesStore.js';

  const goto = getContext('goto');
  let recipe = null;
  let loading = true;
  let error = '';
  let activeTab = 0;
  let isFavorited = false;

  favoritesStore.subscribe(favs => {
    if (recipe) {
      isFavorited = favs.includes(recipe.id);
    }
  });

  onMount(async () => {
    try {
      const recipeId = $params.id;
      const data = await api.getRecipeById(recipeId);
      if (!data) {
        error = 'Recipe not found';
        loading = false;
        return;
      }

      // Generate AI summary if not present
      if (!data.shortInfo) {
        try {
          const summary = await api.generateRecipeSummary(
            data.name,
            data.category,
            data.area,
            data.ingredients,
            data.steps
          );
          data.shortInfo = summary;
        } catch (e) {
          console.error('AI summary failed:', e);
          data.shortInfo = `A delicious ${data.category.toLowerCase()} from ${data.area}.`;
        }
      }

      recipe = data;
      isFavorited = $favoritesStore.includes(recipe.id);
      loading = false;
    } catch (err) {
      console.error('Error loading recipe:', err);
      error = err.message;
      loading = false;
    }
  });

  function toggleFavorite() {
    if (recipe) {
      favoritesStore.toggle(recipe.id);
    }
  }

  function getDifficultyEmoji(difficulty) {
    switch (difficulty) {
      case 'easy': return '🟢';
      case 'medium': return '🟡';
      case 'hard': return '🔴';
      default: return '⚪';
    }
  }

  function handleCloseError() {
    error = '';
  }
</script>

<Header />

<div class="page-container">
  {#if loading}
    <LoadingSpinner text="Loading recipe..." />
  {:else if error}
    <ErrorBanner message={error} onClose={handleCloseError} />
  {:else if recipe}
    <button on:click={() => goto('/home')} class="back-btn">← Back</button>

    <img src={recipe.image} alt={recipe.name} class="recipe-hero" />

    <div class="recipe-header">
      <h1>{recipe.name}</h1>
      <p class="cuisine">{recipe.category} · {recipe.area}</p>
    </div>

    <p class="short-info">{recipe.shortInfo}</p>

    <div class="meta-row">
      <span class="difficulty">{getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty}</span>
      <span class="time">🕐 {recipe.timeMinutes} min</span>
      <button on:click={toggleFavorite} class="favorite-action" title="Toggle favorite">
        {isFavorited ? '❤️ Saved' : '🤍 Save'}
      </button>
    </div>

    <SegmentedTabs
      tabs={['ingredients', 'steps', 'nutrition']}
      {activeTab}
      onChange={(idx) => (activeTab = idx)}
    />

    {#if activeTab === 0}
      <PortionsControl recipeId={recipe.id} ingredients={recipe.ingredients} />
    {:else if activeTab === 1}
      <div class="steps-container">
        {#each recipe.steps as step, idx}
          <div class="step">
            <span class="step-number">Step {idx + 1}</span>
            <p>{step}</p>
          </div>
        {/each}
      </div>
    {:else}
      <div class="nutrition-placeholder">
        <p>Nutrition data not available</p>
      </div>
    {/if}

    <button on:click={() => goto(`/recipe/${recipe.id}/cooking`)} class="cooking-mode-btn">
      Cooking Mode
    </button>
  {/if}
</div>

<BottomNav />

<style>
  .back-btn {
    background: none;
    border: none;
    color: #d4a574;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.5rem;
    margin-bottom: 1rem;
    transition: color 0.2s;
  }

  .back-btn:hover {
    color: #e8c8a0;
  }

  .recipe-hero {
    width: 100%;
    max-height: 400px;
    object-fit: cover;
    border-radius: 1rem;
    margin-bottom: 1.5rem;
  }

  .recipe-header {
    margin-bottom: 1rem;
  }

  .recipe-header h1 {
    font-size: 1.75rem;
    margin-bottom: 0.5rem;
  }

  .cuisine {
    color: #d4a574;
    font-size: 0.95rem;
    margin: 0;
  }

  .short-info {
    color: #c9b8a8;
    margin-bottom: 1.5rem;
    line-height: 1.6;
  }

  .meta-row {
    display: flex;
    gap: 1.5rem;
    align-items: center;
    margin-bottom: 1.5rem;
    flex-wrap: wrap;
  }

  .difficulty, .time {
    font-size: 0.95rem;
    color: #a89878;
  }

  .favorite-action {
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    color: #2a2015;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .favorite-action:hover {
    background: #e8c8a0;
  }

  .steps-container {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    margin: 1.5rem 0;
  }

  .step {
    padding: 1.25rem;
    background: #1a1410;
    border: 1px solid #6b4d3d;
    border-radius: 0.75rem;
  }

  .step-number {
    display: block;
    color: #d4a574;
    font-weight: 600;
    margin-bottom: 0.5rem;
  }

  .step p {
    margin: 0;
    color: #c9b8a8;
    line-height: 1.6;
  }

  .nutrition-placeholder {
    text-align: center;
    padding: 3rem 1rem;
    color: #a89878;
  }

  .cooking-mode-btn {
    width: 100%;
    padding: 1rem;
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    color: #2a2015;
    font-weight: 600;
    font-size: 1.1rem;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 2rem;
  }

  .cooking-mode-btn:hover {
    background: #e8c8a0;
  }

  @media (min-width: 768px) {
    .recipe-hero {
      max-height: 500px;
    }

    .recipe-header h1 {
      font-size: 2rem;
    }
  }
</style>
