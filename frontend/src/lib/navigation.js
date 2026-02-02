// Navigation helper for svelte-spa-router
let currentLocation = '/splash';

export function setCurrentLocation(path) {
  currentLocation = path;
}

export function getCurrentLocation() {
  return currentLocation;
}

export function goto(path) {
  // Use browser history API to navigate
  window.history.pushState({}, '', path);
  // Dispatch custom event to notify router
  window.dispatchEvent(new CustomEvent('routeChange', { detail: { path } }));
}
