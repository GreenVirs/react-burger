import { RefObject, useCallback, useMemo, useReducer, useRef } from 'react';
import { Ref } from '../components/burger-ingredients/burger-ingredients-block/burger-ingredients-block';
import { IngredientTypes } from '../models/ingridient';
import { useIntersectionObserver } from './use-intersection-observer';

export const useIngredientsTabsControl = () => {
  const rootRef = useRef(null);
  const bunRef = useRef<Ref>(null);
  const sauceRef = useRef<Ref>(null);
  const mainRef = useRef<Ref>(null);
  const listRefs = useMemo<Record<IngredientTypes, RefObject<Ref>>>(
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
            (listRefs[action.payload] as RefObject<Ref>).current?.scrollIntoView({
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
        if (entry.intersectionRatio > acc.value) {
          return { value: entry.intersectionRatio, id: entry.target.id as IngredientTypes };
        }
        return acc;
      },
      { value: 0, id: null } as { value: number; id: IngredientTypes | null }
    );
    if (tab.id !== null) {
      setCurrent({ type: 'set', payload: tab.id });
    }
  };

  useIntersectionObserver(
    [bunRef, sauceRef, mainRef],
    callbackObserver,
    {
      threshold: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
      rootMargin: '0px 0px 0px 0px',
    },
    rootRef
  );

  return { bunRef, sauceRef, mainRef, rootRef, onScrollTo, currentTab };
};
