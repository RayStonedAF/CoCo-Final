<script>
  import { onMount, getContext } from 'svelte';

  const goto = getContext('goto');

  onMount(() => {
    setTimeout(() => {
      goto('/home');
    }, 1000);
  });
</script>

<div class="splash-container">
  <div class="splash-content">
    <div class="logo">🍳</div>
    <h1>Cooking<br/>Companion</h1>
  </div>
</div>

<style>
  .splash-container {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100vh;
    background: linear-gradient(135deg, #3d2817 0%, #2a2015 100%);
  }

  .splash-content {
    text-align: center;
  }

  .logo {
    font-size: 5rem;
    margin-bottom: 1.5rem;
    animation: bounce 0.6s ease-in-out;
  }

  h1 {
    font-size: 2.5rem;
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
      font-size: 2rem;
    }

    .logo {
      font-size: 4rem;
    }
  }
</style>
