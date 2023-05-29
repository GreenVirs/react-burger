import { checkConstructor } from '../utils/check-constructor';

export const BASE_URL = 'https://norma.nomoreparties.space/api';
const headers = new Headers({
  'Content-Type': 'application/json;charset=utf-8',
});

if (localStorage.getItem('accessToken')) {
  headers.set('authorization', localStorage.getItem('accessToken') as string);
}
export const returnError = (err: unknown) => Promise.reject(err);
export const setTokens = ({
  refreshToken,
  accessToken,
}: {
  refreshToken: string;
  accessToken: `Bearer ${string}`;
}) => {
  localStorage.setItem('refreshToken', refreshToken);
  localStorage.setItem('accessToken', accessToken);
  headers.set('authorization', accessToken);
};

export const clearToken = (): string => {
  const refresh = localStorage.getItem('refreshToken') as string;
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('accessToken');
  headers.delete('authorization');
  return refresh;
};

export const getToken = (): string => {
  const fullToken = localStorage.getItem('accessToken');
  if (fullToken === null) {
    return '';
  }

  return fullToken.split(' ')[1];
};
const parseHeaders = (hdrs: HeadersInit) =>
  checkConstructor(hdrs, Headers) ? Object.fromEntries(Array.from(hdrs as Headers)) : { ...hdrs };

const mergeHeaders = (headersOne: HeadersInit, headersTwo: HeadersInit): Headers =>
  new Headers({ ...parseHeaders(headersOne), ...parseHeaders(headersTwo) });

const initOptions: RequestInit = {
  mode: 'cors',
  cache: 'no-cache',
};
const createOptions = (options?: RequestInit) => {
  const opt: RequestInit =
    typeof options !== 'undefined' ? { ...initOptions, ...options } : { ...initOptions };
  opt.headers = typeof opt.headers !== 'undefined' ? mergeHeaders(opt.headers, headers) : headers;
  return opt;
};

const checkResponse = (res: Response) =>
  res.ok ? res.json() : res.json().then(returnError).catch(returnError);

let refreshTokenRun: false | Promise<void> = false;

export const sedRefreshToken = () => {
  const refresh = clearToken();
  refreshTokenRun = fetch(`${BASE_URL}/auth/token`, {
    method: 'POST',
    headers,
    body: JSON.stringify({
      token: refresh,
    }),
  })
    .then(checkResponse)
    .then(({ refreshToken, accessToken }) => {
      setTokens({ refreshToken, accessToken });
    })
    .catch(() => {
      clearToken();
    })
    .finally(() => {
      refreshTokenRun = false;
    });
  return refreshTokenRun;
};

const fetchWithOptions = (url: RequestInfo, options?: RequestInit) => {
  const opt = createOptions(options);
  return fetch(url, opt);
};

export const fetchWithRefresh = async <T>(url: RequestInfo, options?: RequestInit): Promise<T> => {
  try {
    if (refreshTokenRun) {
      await refreshTokenRun;
    }
    const res = await fetchWithOptions(url, options);
    return await checkResponse(res);
  } catch (err) {
    if (
      typeof err === 'object' &&
      err &&
      (err as { message?: string })?.message === 'jwt expired'
    ) {
      try {
        await sedRefreshToken();
        const res = await fetchWithOptions(url, options);
        return await checkResponse(res);
      } catch (e) {
        return returnError(e);
      }
    }
    return returnError(err);
  }
};
