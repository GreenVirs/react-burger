import { fetchWithRefresh, BASE_SOCKET_URL } from './index';

export type ApiReturned<T = object> = ({ success: true } & T) | { success: false };

export const find = <T>(
  entrypoint: string,
  args?: URLSearchParams | null,
  options?: RequestInit
): Promise<ApiReturned<{ data: T[] }>> => {
  const url = `${entrypoint}${args ? `?${new URLSearchParams(args).toString()}` : ''}`;
  const opt = typeof options === 'undefined' ? { method: 'GET' } : { method: 'GET', ...options };
  return fetchWithRefresh<ApiReturned<{ data: T[] }>>(url, opt);
};

export const findOne = <T>(
  entrypoint: string,
  args?: URLSearchParams | null,
  options?: RequestInit
): Promise<ApiReturned<T>> => {
  const url = `${entrypoint}${args ? `?${new URLSearchParams(args).toString()}` : ''}`;
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

  return fetchWithRefresh<ApiReturned<T>>(`${entrypoint}`, opt);
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

  return fetchWithRefresh<ApiReturned<T>>(`${entrypoint}`, opt);
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

  return fetchWithRefresh<ApiReturned<T>>(`${entrypoint}`, opt);
};
export const remove = <T>(entrypoint: string, options?: RequestInit): Promise<ApiReturned<T>> => {
  const opt =
    typeof options === 'undefined' ? { method: 'DELETE' } : { method: 'DELETE', ...options };

  return fetchWithRefresh<ApiReturned<T>>(`${entrypoint}`, opt);
};

export interface SocketOptions {
  onMessage: (event: MessageEvent<string>) => void;
  onError?: (event: Event) => void;
  onOpen?: (event: Event) => void;
  onClose?: (event: Event) => void;
  protocols?: string | string[];
}
export const tunnel = (
  url: string | URL,
  { protocols, onMessage, onError, onClose, onOpen }: SocketOptions
) => {
  const socket = new WebSocket(`${BASE_SOCKET_URL}/${url}`, protocols);
  socket.addEventListener('message', onMessage);
  onOpen && socket.addEventListener('open', onOpen);
  onError && socket.addEventListener('error', onError);
  onClose && socket.addEventListener('close', onClose);

  return socket;
};
