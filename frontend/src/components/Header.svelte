<script>
  import { getContext } from 'svelte';
  import { userStore } from '../stores/userStore';

  const goto = getContext('goto');
  let userName = 'Ray';
  
  userStore.subscribe(user => {
    userName = user.name;
  });
</script>

<header class="header">
  <div class="logo-section">
    <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 40 40'%3E%3Ccircle cx='20' cy='20' r='18' fill='%23D4A574' /%3E%3Ccircle cx='20' cy='20' r='14' fill='%23E8C8A0' /%3E%3C/svg%3E" alt="CoCo" class="logo-icon" />
    <h1>CoCo</h1>
  </div>
  <div class="header-icons">
    <button on:click={() => goto('/search')} class="icon-button" title="Search">
      <img src="/search.svg" alt="Search" class="icon-svg" />
    </button>
    <button on:click={() => goto('/profile')} class="icon-button" title="Profile">
      👤
    </button>
  </div>
</header>

<style>
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background: linear-gradient(135deg, #3d2817 0%, #4a3420 100%);
    border-bottom: 1px solid #6b4d3d;
  }

  .logo-section {
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }

  .logo-icon {
    width: 40px;
    height: 40px;
  }

  h1 {
    font-size: 1.5rem;
    font-weight: 700;
    color: #f5f1e8;
    margin: 0;
  }

  .header-icons {
    display: flex;
    gap: 0.5rem;
  }

  .icon-button {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    transition: background 0.2s;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .icon-button:hover {
    background: rgba(255, 255, 255, 0.1);
  }

  .icon-svg {
    width: 24px;
    height: 24px;
  }
</style>
