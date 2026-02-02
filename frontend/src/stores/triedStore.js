import { writable } from 'svelte/store';

function createTriedStore() {
  const stored = typeof window !== 'undefined' ? localStorage.getItem('coco_tried_count') : null;
  const initialCount = stored ? parseInt(stored) : 0;

  const { subscribe, set, update } = writable(initialCount);

  return {
    subscribe,
    increment: () => {
      update(count => {
        const updated = count + 1;
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_tried_count', updated.toString());
        }
        return updated;
      });
    },
    decrement: () => {
      update(count => {
        const updated = Math.max(0, count - 1);
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_tried_count', updated.toString());
        }
        return updated;
      });
    },
    set: (value) => {
      set(value);
      if (typeof window !== 'undefined') {
        localStorage.setItem('coco_tried_count', value.toString());
      }
    },
    reset: () => {
      set(0);
      if (typeof window !== 'undefined') {
        localStorage.removeItem('coco_tried_count');
      }
    }
  };
}

export const triedStore = createTriedStore();
