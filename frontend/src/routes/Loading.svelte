<script>
  import { onMount, getContext } from 'svelte';

  const goto = getContext('goto');

  onMount(() => {
    setTimeout(() => {
      goto('/home');
    }, 1000);
  });
</script>

<div class="loading-container">
  <div class="loading-content">
    <div class="cooking-icon">🍳</div>
    <h1>CoCo is getting<br/>everything ready...</h1>
  </div>
</div>

<style>
  .loading-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #3d2817 0%, #2a2015 100%);
  }

  .loading-content {
    text-align: center;
  }

  .cooking-icon {
    font-size: 4rem;
    margin-bottom: 1.5rem;
    animation: bounce 0.6s ease-in-out;
  }

  h1 {
    font-size: 1.75rem;
    margin-bottom: 0;
    animation: fadeIn 0.6s ease-in-out;
  }

  @keyframes bounce {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-20px); }
  }

  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }

  @media (max-width: 767px) {
    h1 {
      font-size: 1.5rem;
    }

    .cooking-icon {
      font-size: 3.5rem;
    }
  }
</style>
