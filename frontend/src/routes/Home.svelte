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
    try {
      // Fetch actual favorite recipes
      const recipesToFetch = favIds.slice(0, 5);
      const recipePromises = recipesToFetch.map(id => api.getRecipeById(id));
      const recipes = await Promise.all(recipePromises);
      const validRecipes = recipes.filter(Boolean);

      // Generate recommendations until we have exactly 5
      while (validRecipes.length < 5) {
        try {
          // Pick a random favorite to base the recommendation on
          const baseFavorite = validRecipes[Math.floor(Math.random() * validRecipes.length)];
          
          // Search for similar recipes by category
          const similar = await api.searchRecipes(baseFavorite.category);
          if (similar && similar.length > 0) {
            // Pick a random similar recipe
            const randomSimilar = similar[Math.floor(Math.random() * similar.length)];
            
            // Add it if we don't already have it, or add anyway if we're still short
            if (!validRecipes.some(vr => vr.id === randomSimilar.id)) {
              validRecipes.push(randomSimilar);
            } else if (validRecipes.length < 5) {
              // If we're short on recipes, add duplicates as fallback
              validRecipes.push(randomSimilar);
            }
          }
        } catch (err) {
          console.error('Error generating recommendation:', err);
          // If all else fails, fetch a random recipe
          try {
            const random = await api.getRandomRecipe();
            if (random) {
              validRecipes.push(random);
            }
          } catch (e) {
            break;
          }
        }
      }

      favoriteRecipes = validRecipes.slice(0, 5);
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
    scrollbar-width: thin;
    scrollbar-color: #6b4d3d #1a1410;
  }

  .favorites-preview::-webkit-scrollbar {
    height: 6px;
  }

  .favorites-preview::-webkit-scrollbar-track {
    background: #1a1410;
  }

  .favorites-preview::-webkit-scrollbar-thumb {
    background: #6b4d3d;
    border-radius: 3px;
  }

  .favorites-preview::-webkit-scrollbar-thumb:hover {
    background: #a89878;
  }

  .empty-state {
    text-align: center;
    color: #a89878;
    padding: 2rem;
  }
</style>
