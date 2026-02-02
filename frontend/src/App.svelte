<script>
  import Router from 'svelte-spa-router';
  import Splash from './routes/Splash.svelte';
  import Home from './routes/Home.svelte';
  import Search from './routes/Search.svelte';
  import Favorites from './routes/Favorites.svelte';
  import Profile from './routes/Profile.svelte';
  import Recipe from './routes/Recipe.svelte';
  import Cooking from './routes/Cooking.svelte';
  import Chat from './routes/Chat.svelte';
  import Loading from './routes/Loading.svelte';
  import './global.css';
  import { setContext, onMount } from 'svelte';
  import { location } from './stores/locationStore.js';

  const routes = {
    '/splash': Splash,
    '/home': Home,
    '/search': Search,
    '/favorites': Favorites,
    '/profile': Profile,
    '/recipe/:id': Recipe,
    '/recipe/:id/cooking': Cooking,
    '/chat': Chat,
    '/loading': Loading
  };

  // Provide a goto function via context
  function goto(path) {
    window.location.hash = path;
    location.set(path);
  }

  setContext('goto', goto);

  onMount(() => {
    // Set initial route to splash if no hash
    if (!window.location.hash) {
      window.location.hash = '/splash';
    }
  });

  // Track hash changes
  window.addEventListener('hashchange', () => {
    const path = window.location.hash.slice(1) || '/splash';
    location.set(path);
  });

  // Initialize location
  const currentPath = window.location.hash.slice(1) || '/splash';
  location.set(currentPath);
</script>

<div class="app-wrapper">
  <Router {routes} on:routeEvent />
</div>

<style>
  .app-wrapper {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
  }
</style>
