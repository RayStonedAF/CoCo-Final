<script>
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import RecipeCard from '../components/RecipeCard.svelte';
  import ErrorBanner from '../components/ErrorBanner.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import { api } from '../lib/api.js';
  import { userStore } from '../stores/userStore.js';
  import { favoritesStore } from '../stores/favoritesStore.js';

  let userName = 'Ray';
  let randomRecipe = null;
  let loading = true;
  let error = '';
  let favorites = [];
  let recommendedRecipes = [];

  userStore.subscribe(user => {
    userName = user.name;
  });

  favoritesStore.subscribe(fav => {
    favorites = fav;
  });

  onMount(async () => {
    try {
      // Fetch random recipe
      const recipe = await api.getRandomRecipe();
      if (!recipe) {
        error = 'Failed to load recipe';
        loading = false;
        return;
      }

      // Generate AI summary
      try {
        const summary = await api.generateRecipeSummary(
          recipe.name,
          recipe.category,
          recipe.area,
          recipe.ingredients,
          recipe.steps
        );
        recipe.shortInfo = summary;
      } catch (e) {
        console.error('AI summary failed, using default', e);
        recipe.shortInfo = `A delicious ${recipe.category.toLowerCase()} from ${recipe.area}.`;
      }

      randomRecipe = recipe;

      // Load favorite recipes (simplified - just show placeholders)
      recommendedRecipes = [];
      loading = false;
    } catch (err) {
      console.error('Error loading home:', err);
      error = err.message;
      loading = false;
    }
  });

  function handleCloseError() {
    error = '';
  }
</script>

<Header />

<div class="page-container">
  {#if loading}
    <LoadingSpinner text="Fetching today's recipe..." />
  {:else if error}
    <ErrorBanner message={error} onClose={handleCloseError} />
  {:else}
    <div class="greeting">
      <h1>Hello {userName}!</h1>
    </div>

    <div class="section">
      <p class="section-subtitle">Recommended today:</p>
      {#if randomRecipe}
        <RecipeCard recipe={randomRecipe} />
      {/if}
    </div>

    <div class="section">
      <h2>Based on your favorites:</h2>
      {#if favorites.length > 0}
        <div class="favorites-preview">
          {#each favorites.slice(0, 3) as favId}
            <div class="favorite-chip">
              <span>⭐ Recipe</span>
            </div>
          {/each}
        </div>
      {:else}
        <p class="empty-state">Add recipes to favorites to see recommendations!</p>
      {/if}
    </div>
  {/if}
</div>

<BottomNav />

<style>
  .greeting {
    margin-bottom: 2rem;
  }

  .greeting h1 {
    font-size: 1.75rem;
  }

  .section {
    margin-bottom: 2.5rem;
  }

  .section-subtitle {
    color: #a89878;
    font-size: 0.95rem;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .section h2 {
    font-size: 1.25rem;
    margin-bottom: 1.5rem;
  }

  .favorites-preview {
    display: flex;
    gap: 1rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .favorite-chip {
    flex-shrink: 0;
    padding: 1rem 1.5rem;
    background: #1a1410;
    border: 1px solid #6b4d3d;
    border-radius: 0.75rem;
    color: #d4a574;
    text-align: center;
  }

  .empty-state {
    text-align: center;
    color: #a89878;
    padding: 2rem;
  }
</style>
