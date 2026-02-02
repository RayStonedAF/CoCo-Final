<script>
  export let recipes = [];

  import RecipeCard from './RecipeCard.svelte';
</script>

<div class="recipe-list">
  {#each recipes as recipe (recipe.id)}
    <RecipeCard {recipe} />
  {/each}
</div>

<style>
  .recipe-list {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  @media (min-width: 768px) {
    .recipe-list {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
      gap: 1.5rem;
    }
  }
</style>
