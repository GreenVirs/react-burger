import { fetchWithRefresh, BASE_URL } from './index';

export type ApiReturned<T = object> = ({ success: true } & T) | { success: false };

export const find = <T>(
  entrypoint: string,
  args?: URLSearchParams | null,
  options?: RequestInit
): Promise<ApiReturned<{ data: T[] }>> => {
  const url = `${BASE_URL}/${entrypoint}${args ? `?${new URLSearchParams(args).toString()}` : ''}`;
  const opt = typeof options === 'undefined' ? { method: 'GET' } : { method: 'GET', ...options };
  return fetchWithRefresh<ApiReturned<{ data: T[] }>>(url, opt);
};

export const findOne = <T>(
  entrypoint: string,
  args?: URLSearchParams | null,
  options?: RequestInit
): Promise<ApiReturned<T>> => {
  const url = `${BASE_URL}/${entrypoint}${args ? `?${new URLSearchParams(args).toString()}` : ''}`;
  const opt = typeof options === 'undefined' ? { method: 'GET' } : { method: 'GET', ...options };
  return fetchWithRefresh<ApiReturned<T>>(url, opt);
};

export const create = <T>(
  entrypoint: string,
  data: Record<string, unknown>,
  options?: RequestInit
): Promise<ApiReturned<T>> => {
  const opt =
    typeof options === 'undefined'
      ? { method: 'POST', body: JSON.stringify(data) }
      : { method: 'POST', ...options, body: JSON.stringify(data) };

  return fetchWithRefresh<ApiReturned<T>>(`${BASE_URL}/${entrypoint}`, opt);
};

export const update = <T>(
  entrypoint: string,
  data: Record<string, unknown>,
  options?: RequestInit
): Promise<ApiReturned<T>> => {
  const opt =
    typeof options === 'undefined'
      ? { method: 'PUT', body: JSON.stringify(data) }
      : { method: 'PUT', ...options, body: JSON.stringify(data) };

  return fetchWithRefresh<ApiReturned<T>>(`${BASE_URL}/${entrypoint}`, opt);
};

export const patch = <T>(
  entrypoint: string,
  data: Record<string, unknown>,
  options?: RequestInit
): Promise<ApiReturned<T>> => {
  const opt =
    typeof options === 'undefined'
      ? { method: 'PATCH', body: JSON.stringify(data) }
      : { method: 'PATCH', ...options, body: JSON.stringify(data) };

  return fetchWithRefresh<ApiReturned<T>>(`${BASE_URL}/${entrypoint}`, opt);
};
export const remove = <T>(entrypoint: string, options?: RequestInit): Promise<ApiReturned<T>> => {
  const opt =
    typeof options === 'undefined' ? { method: 'DELETE' } : { method: 'DELETE', ...options };

  return fetchWithRefresh<ApiReturned<T>>(`${BASE_URL}/${entrypoint}`, opt);
};
