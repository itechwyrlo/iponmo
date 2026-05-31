const BASE_URL = import.meta.env.VITE_API_BASE_URL;
let isRefreshing = false;
let queue = [];
let onRefreshSuccess = null;
let onRefreshFailure = null;
export function configureApiFetch(successCb, failureCb) {
    onRefreshSuccess = successCb;
    onRefreshFailure = failureCb;
}
function flushQueue(newToken, error) {
    for (const item of queue) {
        if (newToken !== null) {
            item.resolve(newToken);
        }
        else {
            item.reject(error ?? new Error('Session expired.'));
        }
    }
    queue = [];
}
async function doRefresh() {
    const res = await fetch(`${BASE_URL}/api/auth/refresh`, {
        method: 'POST',
        credentials: 'include',
    });
    if (!res.ok) {
        onRefreshFailure?.();
        throw new Error('Session expired. Please sign in again.');
    }
    const data = (await res.json());
    onRefreshSuccess?.(data.accessToken, data.userId);
    return data.accessToken;
}
export async function apiFetch(url, init, token) {
    const makeRequest = (t) => fetch(url, {
        ...init,
        headers: {
            ...init.headers,
            Authorization: `Bearer ${t}`,
        },
        credentials: 'include',
    });
    const response = await makeRequest(token);
    if (response.status !== 401)
        return response;
    if (isRefreshing) {
        return new Promise((resolve, reject) => {
            queue.push({ resolve, reject });
        }).then(newToken => makeRequest(newToken));
    }
    isRefreshing = true;
    try {
        const newToken = await doRefresh();
        flushQueue(newToken, null);
        return makeRequest(newToken);
    }
    catch (err) {
        const error = err instanceof Error ? err : new Error('Session expired.');
        flushQueue(null, error);
        throw error;
    }
    finally {
        isRefreshing = false;
    }
}
