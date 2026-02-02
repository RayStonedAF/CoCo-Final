import { writable, derived } from 'svelte/store';
import { location } from './locationStore.js';

// Create a params store that extracts from the URL
export const params = derived(location, ($location) => {
  // Parse route parameters from hash
  // Format: /recipe/:id or /recipe/:id/cooking
  const pathParts = $location.split('/').filter(Boolean);
  
  if (pathParts[0] === 'recipe' && pathParts[1]) {
    return { id: pathParts[1] };
  }
  
  if (pathParts[0] === 'recipe' && pathParts[2]) {
    return { id: pathParts[1] };
  }
  
  return {};
});
