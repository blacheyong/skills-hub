import type { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

type DocumentWithVT = Document & {
  startViewTransition?: (callback: () => void | Promise<void>) => {
    finished: Promise<void>;
    ready: Promise<void>;
    updateCallbackDone: Promise<void>;
  };
};

/**
 * Navigate using the native View Transitions API when available.
 * The browser takes a snapshot of the current state, runs the
 * navigation callback, takes a snapshot of the new state, and
 * crossfades between them on the compositor.
 *
 * Falls back to a plain router.push on browsers without support.
 */
export function navigateWithTransition(
  router: AppRouterInstance,
  path: string
) {
  if (typeof document === 'undefined') {
    router.push(path);
    return;
  }
  const doc = document as DocumentWithVT;
  if (typeof doc.startViewTransition === 'function') {
    doc.startViewTransition(() => {
      router.push(path);
    });
  } else {
    router.push(path);
  }
}
