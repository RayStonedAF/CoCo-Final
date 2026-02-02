<script>
  import { getContext } from 'svelte';

  export let recipe;

  const goto = getContext('goto');

  function handleClick() {
    if (recipe) {
      goto(`/recipe/${recipe.id}`);
    }
  }
</script>

<button class="favorite-recipe-card" on:click={handleClick} title={recipe.name}>
  <div class="image-container">
    <img src={recipe.image} alt={recipe.name} />
  </div>
  <p class="recipe-name">{recipe.name}</p>
</button>

<style>
  .favorite-recipe-card {
    flex-shrink: 0;
    background: none;
    border: none;
    cursor: pointer;
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
    transition: transform 0.2s;
  }

  .favorite-recipe-card:hover {
    transform: scale(1.05);
  }

  .image-container {
    width: 120px;
    height: 120px;
    border-radius: 0.75rem;
    overflow: hidden;
    border: 2px solid #6b4d3d;
    transition: border-color 0.2s;
  }

  .favorite-recipe-card:hover .image-container {
    border-color: #d4a574;
  }

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .recipe-name {
    text-align: center;
    color: #f5f1e8;
    font-size: 0.9rem;
    margin: 0;
    max-width: 120px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    transition: color 0.2s;
  }

  .favorite-recipe-card:hover .recipe-name {
    color: #d4a574;
  }
</style>
