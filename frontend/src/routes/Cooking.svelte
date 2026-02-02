<script>
  import { onMount, getContext } from 'svelte';
  import { params } from '../stores/paramsStore.js';
  import Header from '../components/Header.svelte';
  import BottomNav from '../components/BottomNav.svelte';
  import ErrorBanner from '../components/ErrorBanner.svelte';
  import LoadingSpinner from '../components/LoadingSpinner.svelte';
  import { api } from '../lib/api.js';
  import { userStore } from '../stores/userStore.js';
  import { triedStore } from '../stores/triedStore.js';

  const goto = getContext('goto');
  let recipe = null;
  let currentStep = 0;
  let loading = true;
  let error = '';
  let textToSpeech = false;
  let relevantIngredients = [];

  userStore.subscribe(user => {
    textToSpeech = user.settings.textToSpeech;
  });

  onMount(async () => {
    try {
      const recipeId = $params.id;
      const data = await api.getRecipeById(recipeId);
      if (!data) {
        error = 'Recipe not found';
        loading = false;
        return;
      }
      recipe = data;
      updateRelevantIngredients();
      loading = false;

      // Read current step if TTS enabled
      if (textToSpeech && recipe.steps[currentStep]) {
        speakStep();
      }
    } catch (err) {
      console.error('Error loading recipe for cooking:', err);
      error = err.message;
      loading = false;
    }
  });

  function updateRelevantIngredients() {
    if (!recipe) return;

    const stepText = recipe.steps[currentStep] || '';
    const relevant = recipe.ingredients.filter(ing => {
      const ingName = ing.name.toLowerCase();
      return stepText.toLowerCase().includes(ingName);
    });

    if (relevant.length > 0) {
      relevantIngredients = relevant;
    } else {
      // Show first 5 ingredients if none match
      relevantIngredients = recipe.ingredients.slice(0, 5);
    }
  }

  function speakStep() {
    if (!textToSpeech || !recipe) return;

    const text = recipe.steps[currentStep] || '';
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.95;
    speechSynthesis.speak(utterance);
  }

  function nextStep() {
    if (currentStep < recipe.steps.length - 1) {
      currentStep++;
      updateRelevantIngredients();
      if (textToSpeech) {
        speakStep();
      }
    } else {
      // Last step - mark as tried
      triedStore.increment();
      goto('/loading');
    }
  }

  function previousStep() {
    if (currentStep > 0) {
      currentStep--;
      updateRelevantIngredients();
      if (textToSpeech) {
        speakStep();
      }
    }
  }

  function repeatStep() {
    if (textToSpeech) {
      speakStep();
    }
  }

  function handleCloseError() {
    error = '';
  }

  const isLastStep = recipe && currentStep === recipe.steps.length - 1;
</script>

<Header />

<div class="page-container cooking-page">
  {#if loading}
    <LoadingSpinner text="Loading recipe..." />
  {:else if error}
    <ErrorBanner message={error} onClose={handleCloseError} />
  {:else if recipe}
    <button on:click={() => goto(`/recipe/${recipe.id}`)} class="back-btn">← Back</button>

    <div class="ingredients-needed">
      <h3>ingredients needed in this step</h3>
      <div class="ingredients-columns">
        <div class="col-left">
          {#each relevantIngredients.slice(0, Math.ceil(relevantIngredients.length / 2)) as ing}
            <p class="ingredient-item">{ing.name}</p>
          {/each}
        </div>
        <div class="col-right">
          {#each relevantIngredients.slice(Math.ceil(relevantIngredients.length / 2)) as ing}
            <p class="ingredient-item">{ing.measure}</p>
          {/each}
        </div>
      </div>
    </div>

    <div class="step-container">
      <h2 class="step-title">
        {isLastStep ? 'Final Step' : `Step ${currentStep + 1}`}
      </h2>
      <p class="step-text">{recipe.steps[currentStep]}</p>
    </div>

    <div class="controls">
      <button on:click={previousStep} class="btn prev-btn" disabled={currentStep === 0}>
        Previous
      </button>
      {#if textToSpeech}
        <button on:click={repeatStep} class="btn repeat-btn">🔊</button>
      {/if}
      <button
        on:click={nextStep}
        class="btn next-btn"
      >
        {isLastStep ? 'Finished' : 'Next'}
      </button>
    </div>
  {/if}
</div>

<BottomNav />

<style>
  .cooking-page {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }

  .back-btn {
    background: none;
    border: none;
    color: #d4a574;
    font-size: 1.1rem;
    cursor: pointer;
    padding: 0.5rem;
    transition: color 0.2s;
    align-self: flex-start;
  }

  .back-btn:hover {
    color: #e8c8a0;
  }

  .ingredients-needed {
    background: #1a1410;
    border: 1px solid #6b4d3d;
    border-radius: 1rem;
    padding: 1.5rem;
  }

  .ingredients-needed h3 {
    margin: 0 0 1rem 0;
    text-transform: lowercase;
    font-size: 0.95rem;
    color: #a89878;
  }

  .ingredients-columns {
    display: flex;
    gap: 2rem;
  }

  .col-left, .col-right {
    flex: 1;
  }

  .ingredient-item {
    margin: 0.5rem 0;
    color: #d4a574;
    font-size: 0.95rem;
  }

  .step-container {
    background: #1a1410;
    border: 1px solid #6b4d3d;
    border-radius: 1rem;
    padding: 1.5rem;
  }

  .step-title {
    margin: 0 0 1rem 0;
    font-size: 1.25rem;
    color: #f5f1e8;
  }

  .step-text {
    margin: 0;
    color: #c9b8a8;
    line-height: 1.8;
    font-size: 1rem;
  }

  .controls {
    display: flex;
    gap: 1rem;
    margin-top: 1.5rem;
  }

  .btn {
    flex: 1;
    padding: 0.75rem;
    background: #d4a574;
    border: none;
    border-radius: 0.5rem;
    color: #2a2015;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.2s;
  }

  .btn:hover:not(:disabled) {
    background: #e8c8a0;
  }

  .btn:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  .repeat-btn {
    flex: 0;
    width: auto;
  }

  @media (min-width: 768px) {
    .step-text {
      font-size: 1.1rem;
    }
  }
</style>
