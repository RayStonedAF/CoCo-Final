<script>
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import SearchBar from '../components/SearchBar.svelte';
  import RecipeList from '../components/RecipeList.svelte';
  import ErrorBanner from '../components/ErrorBanner.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import { api } from '../lib/api.js';

  let searchQuery = '';
  let recipes = [];
  let loading = false;
  let error = '';
  let searched = false;

  async function handleSearch(query) {
    searchQuery = query;
    if (!query || query.trim() === '') {
      recipes = [];
      searched = false;
      return;
    }

    try {
      loading = true;
      error = '';
      const results = await api.searchRecipes(query);
      recipes = results;
      searched = true;
      loading = false;
    } catch (err) {
      error = err.message;
      loading = false;
    }
  }

  function handleCloseError() {
    error = '';
  }
</script>

<Header />

<div class="page-container">
  <h1>Search for Recipes</h1>
  <SearchBar value={searchQuery} onSearch={handleSearch} />

  {#if error}
    <ErrorBanner message={error} onClose={handleCloseError} />
  {/if}

  {#if loading}
    <LoadingSpinner text="Searching recipes..." />
  {:else if searched}
    {#if recipes.length === 0}
      <div class="empty-state">
        <p>No recipes found. Try a different search term!</p>
      </div>
    {:else}
      <div class="results-info">
        <p>Found {recipes.length} recipe{recipes.length !== 1 ? 's' : ''}</p>
      </div>
      <RecipeList {recipes} />
    {/if}
  {:else}
    <div class="empty-state">
      <p>Start typing to search for recipes...</p>
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
    color: #a89878;
  }

  .results-info {
    color: #d4a574;
    margin: 1.5rem 0 1rem 0;
    font-size: 0.95rem;
  }
</style>
