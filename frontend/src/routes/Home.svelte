<script>
  import { onMount } from 'svelte';
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import RecipeCard from '../components/RecipeCard.svelte';
  import FavoriteRecipeThumb from '../components/FavoriteRecipeThumb.svelte';
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
  let favoriteRecipes = [];

  userStore.subscribe(user => {
    userName = user.name;
  });

  favoritesStore.subscribe(fav => {
    favorites = fav;
    loadFavoriteRecipes(fav);
  });

  async function loadFavoriteRecipes(favIds) {
    if (favIds.length === 0) {
      favoriteRecipes = [];
      return;
    }

    try {
      // Fetch details for up to 3 favorite recipes
      const recipePromises = favIds.slice(0, 3).map(id => api.getRecipeById(id));
      const recipes = await Promise.all(recipePromises);
      favoriteRecipes = recipes.filter(Boolean);
    } catch (err) {
      console.error('Error loading favorite recipes:', err);
      favoriteRecipes = [];
    }
  }

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
          {#each favoriteRecipes as recipe (recipe.id)}
            <FavoriteRecipeThumb {recipe} />
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
    gap: 1.5rem;
    overflow-x: auto;
    padding-bottom: 0.5rem;
  }

  .empty-state {
    text-align: center;
    color: #a89878;
    padding: 2rem;
  }
</style>
