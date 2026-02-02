import { writable } from 'svelte/store';

function createFavoritesStore() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('coco_favorites') : null;
  const initialFavorites = stored ? JSON.parse(stored) : [];

  const { subscribe, set, update } = writable(initialFavorites);

  return {
    subscribe,
    add: (recipeId) => {
      update(fav => {
        if (!fav.includes(recipeId)) {
          const updated = [...fav, recipeId];
          if (typeof window !== 'undefined') {
            localStorage.setItem('coco_favorites', JSON.stringify(updated));
          }
          return updated;
        }
        return fav;
      });
    },
    remove: (recipeId) => {
      update(fav => {
        const updated = fav.filter(id => id !== recipeId);
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_favorites', JSON.stringify(updated));
        }
        return updated;
      });
    },
    toggle: (recipeId) => {
      update(fav => {
        let updated;
        if (fav.includes(recipeId)) {
          updated = fav.filter(id => id !== recipeId);
        } else {
          updated = [...fav, recipeId];
        }
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_favorites', JSON.stringify(updated));
        }
        return updated;
      });
    },
    isFavorite: (recipeId) => {
      let result = false;
      subscribe(fav => {
        result = fav.includes(recipeId);
      })();
      return result;
    },
    clear: () => {
      set([]);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('coco_favorites');
      }
    }
  };
}

export const favoritesStore = createFavoritesStore();
