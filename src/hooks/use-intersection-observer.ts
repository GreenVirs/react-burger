import { RefObject, useEffect, useMemo } from 'react';

export function useIntersectionObserver<T extends HTMLElement = HTMLElement>(
  elementRef: RefObject<T> | RefObject<T>[],
  cb: IntersectionObserverCallback,
  options: IntersectionObserverInit = { threshold: 0, root: null, rootMargin: '0%' },
  root: RefObject<T> | null = null
): void {
  const updateEntry: IntersectionObserverCallback = (entries, observer) => {
    cb(entries, observer);
  };

  const opt = useMemo(() => {
    if (root !== null) {
      return {
        ...options,
        root: root?.current || null,
      };
    }
    return options;
  }, [options, root]);

  useEffect(() => {
    const hasIOSupport = !!window.IntersectionObserver;

    if (!hasIOSupport) return;
    const observer = new IntersectionObserver(updateEntry, opt);

    if (Array.isArray(elementRef)) {
      elementRef.forEach((item) => {
        if (item?.current) {
          observer.observe(item.current);
        }
      });
    } else if (elementRef?.current) {
      observer.observe(elementRef.current);
    }

    // eslint-disable-next-line consistent-return
    return () => observer.disconnect();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [elementRef, opt]);
}
