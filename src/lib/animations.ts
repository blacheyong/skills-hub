import gsap from 'gsap';

/**
 * Stagger-in animation for grid children (cards, items).
 * Call after data loads / component mounts.
 */
export function staggerIn(container: HTMLElement | null, opts?: { delay?: number }) {
  if (!container || !container.children.length) return;
  gsap.fromTo(
    container.children,
    { opacity: 0, y: 18, scale: 0.97 },
    {
      opacity: 1,
      y: 0,
      scale: 1,
      duration: 0.4,
      stagger: 0.05,
      ease: 'power3.out',
      delay: opts?.delay ?? 0.05,
    }
  );
}

/**
 * Fade-slide-in for a main content area (page transition feel).
 */
export function pageEnter(element: HTMLElement | null) {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0, y: 14 },
    { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' }
  );
}

/**
 * Sidebar item click feedback — subtle scale pulse.
 */
export function clickPulse(element: HTMLElement | null) {
  if (!element) return;
  gsap.fromTo(
    element,
    { scale: 0.95 },
    { scale: 1, duration: 0.35, ease: 'elastic.out(1, 0.5)' }
  );
}
