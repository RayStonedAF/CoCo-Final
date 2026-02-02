import { writable } from 'svelte/store';

function createUserStore() {
  // Load from localStorage
  const stored = typeof window !== 'undefined' ? localStorage.getItem('coco_user') : null;
  const initialUser = stored ? JSON.parse(stored) : {
    name: 'Ray',
    settings: {
      measuringUnit: 'metric', // 'metric' or 'imperial'
      textToSpeech: false
    }
  };

  const { subscribe, set, update } = writable(initialUser);

  return {
    subscribe,
    setName: (name) => {
      update(user => {
        const updated = { ...user, name };
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_user', JSON.stringify(updated));
        }
        return updated;
      });
    },
    updateSettings: (settings) => {
      update(user => {
        const updated = { ...user, settings: { ...user.settings, ...settings } };
        if (typeof window !== 'undefined') {
          localStorage.setItem('coco_user', JSON.stringify(updated));
        }
        return updated;
      });
    },
    reset: () => {
      const defaultUser = {
        name: 'Ray',
        settings: {
          measuringUnit: 'metric',
          textToSpeech: false
        }
      };
      set(defaultUser);
      if (typeof window !== 'undefined') {
        localStorage.setItem('coco_user', JSON.stringify(defaultUser));
      }
    }
  };
}

export const userStore = createUserStore();
