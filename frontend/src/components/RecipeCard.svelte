<script>
  import { getContext } from 'svelte';
  import { favoritesStore } from '../stores/favoritesStore';

  const goto = getContext('goto');
  export let recipe;

  let isFavorited = false;
  let showSkeleton = !recipe.shortInfo;

  favoritesStore.subscribe(favs => {
    isFavorited = recipe && favs.includes(recipe.id);
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
</script>

<div class="recipe-card">
  <div class="card-image-container">
    <img src={recipe.image} alt={recipe.name} class="card-image" />
    <button on:click={toggleFavorite} class="favorite-btn" title="Toggle favorite">
      {isFavorited ? '❤️' : '🤍'}
    </button>
  </div>
  <div class="card-content">
    <h3>{recipe.name}</h3>
    <p class="cuisine">{recipe.category} · {recipe.area}</p>
    {#if showSkeleton}
      <div class="skeleton"></div>
    {:else}
      <p class="short-info">{recipe.shortInfo}</p>
    {/if}
    <div class="meta">
      <span class="difficulty">{getDifficultyEmoji(recipe.difficulty)} {recipe.difficulty}</span>
      <span class="time">🕐 {recipe.timeMinutes} min</span>
    </div>
    <button on:click={() => goto(`/recipe/${recipe.id}`)} class="recipe-btn">
      Recipe →
    </button>
  </div>
</div>

<style>
  .recipe-card {
    background: #1a1410;
    border: 1px solid #6b4d3d;
    border-radius: 1rem;
    overflow: hidden;
    transition: transform 0.2s, box-shadow 0.2s;
  }

  .recipe-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.3);
  }

  .card-image-container {
    position: relative;
    width: 100%;
    height: 200px;
    overflow: hidden;
  }

  .card-image {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .favorite-btn {
    position: absolute;
    top: 0.75rem;
    right: 0.75rem;
    background: rgba(0, 0, 0, 0.5);
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 1.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background 0.2s;
  }

  .favorite-btn:hover {
    background: rgba(0, 0, 0, 0.7);
  }

  .card-content {
    padding: 1.25rem;
  }

  h3 {
    margin: 0 0 0.5rem 0;
    font-size: 1.25rem;
    color: #f5f1e8;
  }

  .cuisine {
    margin: 0 0 0.75rem 0;
    color: #d4a574;
    font-size: 0.9rem;
  }

  .short-info {
    margin: 0.75rem 0;
    color: #c9b8a8;
    font-size: 0.95rem;
    line-height: 1.4;
  }

  .skeleton {
    height: 1rem;
    background: linear-gradient(90deg, #2a2015 0%, #3a3020 50%, #2a2015 100%);
    background-size: 200% 100%;
    animation: shimmer 1.5s infinite;
    border-radius: 0.25rem;
    margin: 0.75rem 0;
  }

  @keyframes shimmer {
    0% { background-position: 200% 0; }
    100% { background-position: -200% 0; }
  }

  .meta {
    display: flex;
    gap: 1rem;
    margin: 0.75rem 0;
    font-size: 0.9rem;
    color: #a89878;
  }

  .difficulty {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .time {
    display: flex;
    align-items: center;
    gap: 0.25rem;
  }

  .recipe-btn {
    width: 100%;
    padding: 0.75rem;
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    color: #2a2015;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s;
    margin-top: 0.5rem;
  }

  .recipe-btn:hover {
    background: #e8c8a0;
  }
</style>
