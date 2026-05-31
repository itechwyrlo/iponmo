import type { RefreshResponse } from '../types/auth.types';

const BASE_URL = import.meta.env.VITE_API_BASE_URL;

type QueueItem = {
  resolve: (token: string) => void;
  reject: (err: Error) => void;
};

let isRefreshing = false;
let queue: QueueItem[] = [];
let onRefreshSuccess: ((accessToken: string, userId: string) => void) | null = null;
let onRefreshFailure: (() => void) | null = null;

export function configureApiFetch(
  successCb: (accessToken: string, userId: string) => void,
  failureCb: () => void
): void {
  onRefreshSuccess = successCb;
  onRefreshFailure = failureCb;
}

function flushQueue(newToken: string | null, error: Error | null): void {
  for (const item of queue) {
    if (newToken !== null) {
      item.resolve(newToken);
    } else {
      item.reject(error ?? new Error('Session expired.'));
    }
  }
  queue = [];
}

async function doRefresh(): Promise<string> {
  const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
    method: 'POST',
    credentials: 'include',
  });

  if (!res.ok) {
    onRefreshFailure?.();
    throw new Error('Session expired. Please sign in again.');
  }

  const data = (await res.json()) as RefreshResponse;
  onRefreshSuccess?.(data.accessToken, data.userId);
  return data.accessToken;
}

export async function apiFetch(
  url: string,
  init: RequestInit,
  token: string
): Promise<Response> {
  const makeRequest = (t: string): Promise<Response> =>
    fetch(url, {
      ...init,
      headers: {
        ...init.headers,
        Authorization: `Bearer ${t}`,
      },
      credentials: 'include',
    });

  const response = await makeRequest(token);

  if (response.status !== 401) return response;

  if (isRefreshing) {
    return new Promise<string>((resolve, reject) => {
      queue.push({ resolve, reject });
    }).then(newToken => makeRequest(newToken));
  }

  isRefreshing = true;
  try {
    const newToken = await doRefresh();
    flushQueue(newToken, null);
    return makeRequest(newToken);
  } catch (err) {
    const error = err instanceof Error ? err : new Error('Session expired.');
    flushQueue(null, error);
    throw error;
  } finally {
    isRefreshing = false;
  }
}
