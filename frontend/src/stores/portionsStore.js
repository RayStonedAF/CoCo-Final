import { writable } from 'svelte/store';

function createPortionsStore() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('coco_portions') : null;
  const initialPortions = stored ? JSON.parse(stored) : {};

  const { subscribe, set, update } = writable(initialPortions);

  return {
    subscribe,
    setPortions: (recipeId, portions) => {
      update(portions_map => {
        const updated = { ...portions_map, [recipeId]: portions };
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_portions', JSON.stringify(updated));
        }
        return updated;
      });
    },
    getPortions: (recipeId) => {
      let result = 1;
      subscribe(portions_map => {
        result = portions_map[recipeId] || 1;
      })();
      return result;
    },
    clear: () => {
      set({});
      if (typeof window !== 'undefined') {
        localStorage.removeItem('coco_portions');
      }
    }
  };
}

export const portionsStore = createPortionsStore();
