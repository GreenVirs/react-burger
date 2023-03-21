import { MandeResponse, Options } from 'mande';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export const useFetch = <
  T = unknown,
  A extends string | string[][] | Record<string, string> | URLSearchParams =
    | string
    | string[][]
    | Record<string, string>
    | URLSearchParams
>(
  resFn: (
    url: string | number,
    options?: Options<'json'>
  ) => MandeResponse<{ data: T; success: boolean }, 'json'>,
  initParams: A,
  options?: Options<'json'>
): {
  data: T | null;
  setParams: Dispatch<SetStateAction<A>>;
  isLoading: boolean;
} => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [params, setParams] = useState<A>(initParams);

  useEffect(() => {
    setIsLoading(true);
    const searchParams = new URLSearchParams(params);
    resFn(searchParams.toString(), options)
      .then((res) => {
        if (typeof res !== 'string') {
          const { success, data: resData } = res;
          if (success) {
            setData(resData as T);
          }
        }
      })
      .catch((e) => {
        // eslint-disable-next-line no-console
        console.log(`Ошибка ${e}`);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params, setIsLoading, options, setData, resFn]);
  return { data, setParams, isLoading };
};
