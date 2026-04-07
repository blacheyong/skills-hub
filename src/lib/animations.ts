import gsap from 'gsap';

/**
 * Smooth crossfade for main content when switching sidebar folders.
 * Opacity-only to avoid vertical "jump".
 */
export function pageEnter(element: HTMLElement | null) {
  if (!element) return;
  gsap.fromTo(
    element,
    { opacity: 0 },
    { opacity: 1, duration: 0.25, ease: 'power1.out' }
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
