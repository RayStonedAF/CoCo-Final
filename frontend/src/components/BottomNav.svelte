<script>
  import { getContext } from 'svelte';
  import { location } from '../stores/locationStore.js';

  const goto = getContext('goto');

  function isActive(route) {
    return $location.startsWith(route);
  }
</script>

<nav class="bottom-nav">
  <button
    on:click={() => goto('/home')}
    class="nav-item"
    class:active={isActive('/home')}
    title="Home"
  >
    🏠
  </button>
  <button
    on:click={() => goto('/chat')}
    class="nav-item center"
    title="Chat"
  >
    <div class="center-button">CoCo</div>
  </button>
  <button
    on:click={() => goto('/favorites')}
    class="nav-item"
    class:active={isActive('/favorites')}
    title="Favorites"
  >
    ❤️
  </button>
</nav>

<style>
  .bottom-nav {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background: #2a2015;
    border-top: 1px solid #6b4d3d;
    padding: 0.75rem 0;
    z-index: 100;
    gap: 1rem;
  }

  .nav-item {
    background: none;
    border: none;
    font-size: 1.5rem;
    cursor: pointer;
    padding: 0.75rem;
    border-radius: 50%;
    transition: all 0.3s;
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .nav-item:hover {
    background: rgba(212, 165, 116, 0.2);
  }

  .nav-item.active {
    background: rgba(212, 165, 116, 0.3);
  }

  .nav-item.center {
    flex: 0;
    width: 60px;
    height: 60px;
    margin-bottom: 0.5rem;
    background: radial-gradient(circle, #d4a574 0%, #a67c4d 100%);
    border: 2px solid #6b4d3d;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  }

  .center-button {
    font-size: 1.2rem;
    font-weight: 700;
    color: #fff;
  }
</style>
