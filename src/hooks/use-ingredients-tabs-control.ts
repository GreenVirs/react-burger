import { RefObject, useCallback, useMemo, useReducer, useRef } from 'react';
import { IngredientTypes } from '../models/ingridient';
import { useIntersectionObserver } from './use-intersection-observer';

export const useIngredientsTabsControl = () => {
  const rootRef = useRef(null);
  const bunRef = useRef(null);
  const sauceRef = useRef(null);
  const mainRef = useRef(null);
  const listRefs = useMemo<Record<IngredientTypes, RefObject<HTMLElement>>>(
    () => ({
      bun: bunRef,
      sauce: sauceRef,
      main: mainRef,
    }),
    []
  );
  const [currentTab, setCurrent] = useReducer(
    (state: IngredientTypes, action: { type: 'set' | 'scroll'; payload: IngredientTypes }) => {
      switch (action.type) {
        case 'scroll': {
          if (listRefs[action.payload].current) {
            (listRefs[action.payload] as RefObject<HTMLElement>).current?.scrollIntoView({
              behavior: 'smooth',
            });
          }
          return action.payload;
        }
        case 'set': {
          return action.payload;
        }
        default: {
          return state;
        }
      }
    },
    'bun'
  );

  const onScrollTo = useCallback(
    (value: string) => {
      setCurrent({ type: 'scroll', payload: value as IngredientTypes });
    },
    [setCurrent]
  );

  const callbackObserver: IntersectionObserverCallback = (entries) => {
    const tab = entries.reduce(
      (acc, entry) => {
        if (!entry.isIntersecting) {
          return acc;
        }

        if (entry.rootBounds === null || !('y' in entry.rootBounds)) {
          return acc;
        }
        const calc = entry.intersectionRect.top - entry.rootBounds.top;
        if (calc < acc.value) {
          return { value: entry.intersectionRect.y, id: entry.target.id as IngredientTypes };
        }
        return acc;
      },
      { value: Infinity, id: null } as { value: number; id: IngredientTypes | null }
    );
    if (tab.id !== null) {
      setCurrent({ type: 'set', payload: tab.id });
    }
  };

  useIntersectionObserver(
    [bunRef, sauceRef, mainRef],
    callbackObserver,
    {
      threshold: [1],
      rootMargin: '0px 0px 0px 0px',
    },
    rootRef
  );

  return { bunRef, sauceRef, mainRef, rootRef, onScrollTo, currentTab };
};
