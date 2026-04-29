import gsap from 'gsap';

/**
 * Smooth entrance for main content when switching sidebar folders.
 * Animates only transform + opacity (GPU-accelerated). Must be invoked
 * from useLayoutEffect so the from-state lands before the next paint —
 * otherwise the new folder briefly flashes at opacity 1.
 */
export function pageEnter(element: HTMLElement | null) {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 4 },
    {
      opacity: 1,
      y: 0,
      duration: 0.22,
      ease: 'power2.out',
      clearProps: 'transform',
    }
  );
}

/**
 * Sidebar item click feedback — subtle scale pulse.
 */
export function clickPulse(element: HTMLElement | null) {
  if (!element) return;
  gsap.fromTo(
    element,
    { scale: 0.96 },
    { scale: 1, duration: 0.3, ease: 'elastic.out(1, 0.5)' }
  );
}
