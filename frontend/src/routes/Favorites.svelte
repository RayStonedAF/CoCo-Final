<script>
  import { onMount, getContext } from 'svelte';
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import ErrorBanner from '../components/ErrorBanner.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import { api } from '../lib/api.js';
  import { favoritesStore } from '../stores/favoritesStore.js';

  const goto = getContext('goto');

  let favoriteIds = [];
  let recipes = [];
  let loading = true;
  let error = '';

  favoritesStore.subscribe(fav => {
    favoriteIds = fav;
  });

  onMount(async () => {
    try {
      loading = true;
      recipes = [];
      
      // Fetch each favorite recipe
      for (const id of favoriteIds) {
        try {
          const recipe = await api.getRecipeById(id);
          if (recipe) {
            recipes = [...recipes, recipe];
          }
        } catch (err) {
          console.error(`Failed to load recipe ${id}:`, err);
        }
      }
      
      loading = false;
    } catch (err) {
      console.error('Error loading favorites:', err);
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
  <h1>Your Favorites</h1>

  {#if error}
    <ErrorBanner message={error} onClose={handleCloseError} />
  {/if}

  {#if loading}
    <LoadingSpinner text="Loading favorites..." />
  {:else if recipes.length === 0}
    <div class="empty-state">
      <p>No favorites yet!</p>
      <p>Add recipes to your favorites on the recipe detail page.</p>
      <button on:click={() => goto('/search')} class="cta-button">Search Recipes</button>
    </div>
  {:else}
    <div class="favorites-grid">
      {#each recipes as recipe (recipe.id)}
        <button on:click={() => goto(`/recipe/${recipe.id}`)} class="favorite-tile" title={recipe.name}>
          <img src={recipe.image} alt={recipe.name} />
          <h3>{recipe.name}</h3>
        </button>
      {/each}
    </div>
  {/if}
</div>

<BottomNav />

<style>
  .page-container h1 {
    font-size: 1.75rem;
    margin-bottom: 1.5rem;
  }

  .empty-state {
    text-align: center;
    padding: 3rem 1rem;
  }

  .empty-state p {
    color: #a89878;
    margin-bottom: 1rem;
  }

  .cta-button {
    padding: 0.75rem 1.5rem;
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    color: #2a2015;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
  }

  .cta-button:hover {
    background: #e8c8a0;
  }

  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.5rem;
  }

  .favorite-tile {
    cursor: pointer;
    border-radius: 0.75rem;
    overflow: hidden;
    background: #1a1410;
    border: 1px solid #6b4d3d;
    transition: transform 0.2s, box-shadow 0.2s;
    padding: 0;
    text-align: left;
  }

  .favorite-tile:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .favorite-tile img {
    width: 100%;
    height: 150px;
    object-fit: cover;
    display: block;
  }

  .favorite-tile h3 {
    padding: 0.75rem;
    margin: 0;
    font-size: 0.95rem;
    text-align: center;
    color: #f5f1e8;
  }

  @media (min-width: 768px) {
    .favorites-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    }
  }
</style>
