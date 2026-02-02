<script>
  import { portionsStore } from '../stores/portionsStore';

  export let recipeId;
  export let ingredients = [];

  let portions = 1;
  let checkedIngredients = {};

  portionsStore.subscribe(portions_map => {
    portions = portions_map[recipeId] || 1;
  });

  function updatePortions(delta) {
    const newPortions = Math.max(1, portions + delta);
    portionsStore.setPortions(recipeId, newPortions);
  }

  function toggleIngredient(ingredientName) {
    checkedIngredients[ingredientName] = !checkedIngredients[ingredientName];
  }

  function checkAll() {
    const allChecked = ingredients.every(ing => checkedIngredients[ing.name]);
    ingredients.forEach(ing => {
      checkedIngredients[ing.name] = !allChecked;
    });
  }

  function scaleIngredient(measure, multiplier) {
    if (!measure) return '';
    // Extract number and unit (handles both "300 g" and "300g")
    const match = measure.match(/^([\d.]+)\s*(.*)$/);
    if (match) {
      const number = parseFloat(match[1]);
      const unit = match[2] || '';
      if (!isNaN(number)) {
        const scaled = (number * multiplier).toFixed(2).replace(/\.?0+$/, '');
        return unit ? `${scaled} ${unit}` : scaled;
      }
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
    <div 
      class="ingredient"
      class:checked={checkedIngredients[ingredient.name]}
      on:click={() => toggleIngredient(ingredient.name)}
      role="button"
      tabindex="0"
    >
      <span class="ingredient-name">{ingredient.name}</span>
      <span class="ingredient-measure">
        {scaleIngredient(ingredient.measure, portions)}
      </span>
    </div>
  {/each}
</div>

<div class="check-all-container">
  <button on:click={checkAll} class="check-all-btn">
    {ingredients.every(ing => checkedIngredients[ing.name]) ? 'uncheck all' : 'check all'}
  </button>
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
    align-items: center;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 0.5rem;
    transition: background-color 0.2s;
  }

  .ingredient:hover {
    background-color: rgba(212, 165, 116, 0.1);
  }

  .ingredient.checked .ingredient-name,
  .ingredient.checked .ingredient-measure {
    text-decoration: line-through;
    opacity: 0.6;
  }

  .ingredient-name {
    color: #f5f1e8;
    font-weight: 500;
    transition: opacity 0.2s, text-decoration 0.2s;
  }

  .ingredient-measure {
    color: #d4a574;
    font-size: 0.9rem;
    transition: opacity 0.2s, text-decoration 0.2s;
  }

  .check-all-container {
    display: flex;
    justify-content: center;
    margin-top: 1.5rem;
    margin-bottom: 1rem;
  }

  .check-all-btn {
    background: none;
    border: none;
    color: #d4a574;
    font-size: 0.8rem;
    cursor: pointer;
    padding: 0;
    transition: color 0.2s;
  }

  .check-all-btn:hover {
    color: #e8c8a0;
  }

  @media (min-width: 768px) {
    .ingredients-grid {
      grid-template-columns: 1fr 1fr;
    }
  }
</style>
