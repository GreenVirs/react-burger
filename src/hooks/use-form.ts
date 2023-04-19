import { ChangeEvent, useCallback, useReducer, Reducer } from 'react';

export const useForm = <T extends Record<string, string | number>>(init: T) => {
  const [state, dispatch] = useReducer<Reducer<T, { field: keyof T; value: string | number }>>(
    (prevState, action) => ({
      ...prevState,
      [action.field]: action.value,
    }),
    init
  );

  const setState = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const target = e.target as HTMLInputElement;
      dispatch({ field: target.name, value: target.value } as {
        field: keyof T;
        value: string | number;
      });
    },
    [dispatch]
  );

  const patch = useCallback(
    (fields: Partial<T>) => {
      // eslint-disable-next-line no-restricted-syntax
      for (const [key, value] of Object.entries(fields)) {
        dispatch({ field: key, value } as {
          field: keyof T;
          value: string | number;
        });
      }
    },
    [dispatch]
  );

  return [state, setState, patch] as [
    T,
    (e: ChangeEvent<HTMLInputElement>) => void,
    (fields: Partial<T>) => void
  ];
};
