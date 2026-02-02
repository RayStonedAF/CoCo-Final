<script>
  import { portionsStore } from '../stores/portionsStore';

  export let recipeId;
  export let ingredients = [];

  let portions = 1;

  portionsStore.subscribe(portions_map => {
    portions = portions_map[recipeId] || 1;
  });

  function updatePortions(delta) {
    const newPortions = Math.max(1, portions + delta);
    portionsStore.setPortions(recipeId, newPortions);
  }

  function scaleIngredient(measure, multiplier) {
    if (!measure) return '';
    // Simple numeric scaling
    const parts = measure.split(' ');
    const number = parseFloat(parts[0]);
    if (!isNaN(number)) {
      const scaled = (number * multiplier).toFixed(2).replace(/\.?0+$/, '');
      return [scaled, ...parts.slice(1)].join(' ');
    }
    return measure;
  }
</script>

<div class="portions-control">
  <button on:click={() => updatePortions(-1)} class="btn">−</button>
  <span class="portions-display">Portions: {portions}</span>
  <button on:click={() => updatePortions(1)} class="btn">+</button>
</div>

<div class="ingredients-grid">
  {#each ingredients as ingredient (ingredient.name)}
    <div class="ingredient">
      <span class="ingredient-name">{ingredient.name}</span>
      <span class="ingredient-measure">
        {scaleIngredient(ingredient.measure, portions)}
      </span>
    </div>
  {/each}
</div>

<style>
  .portions-control {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1.5rem;
    justify-content: center;
  }

  .btn {
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    width: 36px;
    height: 36px;
    font-size: 1.2rem;
    font-weight: 600;
    cursor: pointer;
    color: #2a2015;
    transition: background 0.2s;
  }

  .btn:hover {
    background: #e8c8a0;
  }

  .portions-display {
    font-weight: 600;
    color: #d4a574;
  }

  .ingredients-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 1rem 1.5rem;
  }

  .ingredient {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  .ingredient-name {
    color: #f5f1e8;
    font-weight: 500;
  }

  .ingredient-measure {
    color: #d4a574;
    font-size: 0.9rem;
  }

  @media (min-width: 768px) {
    .ingredients-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
