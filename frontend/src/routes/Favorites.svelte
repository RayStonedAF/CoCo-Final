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

  /* GRID */
  .favorites-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
    gap: 1.25rem;
  }

  /* CARD BUTTON RESET + LAYOUT */
  .favorite-tile {
    cursor: pointer;
    border-radius: 0.9rem;
    overflow: hidden;
    background: #1a1410;
    border: 1px solid #6b4d3d;

    padding: 0;
    text-align: left;

    /* important: make it behave like a card */
    display: flex;
    flex-direction: column;

    /* make all cards same visual height inside grid rows */
    height: 100%;

    transition: transform 0.2s, box-shadow 0.2s;
  }

  /* remove button weird defaults */
  .favorite-tile {
    appearance: none;
    -webkit-appearance: none;
    border: 1px solid #6b4d3d;
    background: #1a1410;
    color: inherit;
  }

  .favorite-tile:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .favorite-tile:focus-visible {
    outline: 2px solid #d4a574;
    outline-offset: 2px;
  }

  /* IMAGE: fixed consistent area */
  .favorite-tile img {
    width: 100%;
    aspect-ratio: 4 / 3;     /* <-- key: consistent image box */
    object-fit: cover;
    display: block;
    background: #0f0c09;     /* avoids “flash” if image loads slow */
  }

  /* TITLE: always sits under image with consistent spacing */
  .favorite-tile h3 {
    margin: 0;
    padding: 0.8rem 0.85rem 0.95rem;
    font-size: 0.95rem;
    text-align: center;
    color: #f5f1e8;
    line-height: 1.2;

    /* Keep titles from changing card height too much */
    display: -webkit-box;
    -webkit-line-clamp: 2;   /* max 2 lines */
    -webkit-box-orient: vertical;
    overflow: hidden;
    min-height: calc(2 * 1.2em); /* ensures consistent title block height */
  }

  @media (min-width: 768px) {
    .favorites-grid {
      grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
      gap: 1.5rem;
    }

    .favorite-tile h3 {
      font-size: 1rem;
    }
  }
</style>

