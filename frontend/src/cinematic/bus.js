// Tiny event bus so the hero intro waits for the preloader curtain to lift.
let ready = false;
const listeners = new Set();

export const isIntroReady = () => ready;

export const markIntroReady = () => {
  if (ready) return;
  ready = true;
  listeners.forEach((fn) => fn());
  listeners.clear();
};

export const onIntroReady = (fn) => {
  if (ready) {
    fn();
    return () => {};
  }
  listeners.add(fn);
  return () => listeners.delete(fn);
};

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
