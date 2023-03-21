import { RefObject, useEffect } from 'react';

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T>,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cb?: (...any: any[]) => void,
  options: IntersectionObserverInit = { threshold: 0, root: null, rootMargin: '0%' }
): void {
  const updateEntry = ([entry]: IntersectionObserverEntry[]): void => {
    if (typeof cb === 'function') {
      cb(entry);
    }
  };

  useEffect(() => {
    const node = elementRef?.current; // DOM Ref
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport || !node) return;

    const observer = new IntersectionObserver(updateEntry, options);

    observer.observe(node);

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef?.current, options]);
}
