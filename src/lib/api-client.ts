import { useNotifications } from '@/components/ui/notifications';

function getApiBase(): string {
  if (typeof window === 'undefined') {
    const url = process.env.API_URL;
    if (!url) {
      throw new Error('API_URL environment variable is required on the server');
    }
    return url;
  }
  return '/api';
}

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrlWithParams(
  url: string,
  params?: Record<string, string | number | boolean | undefined | null>,
): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null),
  ) as Record<string, string>;
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(filteredParams).toString();
  return `${url}?${queryString}`;
}

async function fetchApi(url: string, options: RequestOptions = {}): Promise<any> {
  const { method = 'GET', headers = {}, body, cookie, params } = options;

  const fullUrl = buildUrlWithParams(`${getApiBase()}${url}`, params);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...(cookie ? { Cookie: cookie } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
    credentials: 'include',
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData.message || response.statusText;
    if (typeof window !== 'undefined') {
      useNotifications.getState().addNotification({
        type: 'error',
        title: 'Error',
        message,
      });
    }
    throw new Error(message);
  }

  const responseText = await response.text();
  return responseText ? JSON.parse(responseText) : undefined;
}

export const api = {
  get: (url: string, options?: RequestOptions) => fetchApi(url, { ...options, method: 'GET' }),
  post: (url: string, body?: unknown, options?: RequestOptions) =>
    fetchApi(url, { ...options, method: 'POST', body }),
  put: (url: string, body?: unknown, options?: RequestOptions) =>
    fetchApi(url, { ...options, method: 'PUT', body }),
  delete: (url: string, options?: RequestOptions) =>
    fetchApi(url, { ...options, method: 'DELETE' }),
};
