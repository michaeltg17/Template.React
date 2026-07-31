import { useNotifications } from '@/components/ui/notifications';
import { env } from '@/config/env';

type RequestOptions = {
  method?: string;
  headers?: Record<string, string>;
  body?: unknown;
  cookie?: string;
  params?: Record<string, string | number | boolean | undefined | null>;
};

function buildUrlWithParams(url: string, params?: Record<string, string | number | boolean | undefined | null>): string {
  if (!params) return url;
  const filteredParams = Object.fromEntries(
    Object.entries(params).filter(([, value]) => value != null)
  ) as Record<string, string>;
  if (Object.keys(filteredParams).length === 0) return url;
  const queryString = new URLSearchParams(filteredParams).toString();
  return `${url}?${queryString}`;
}

async function fetchApi(url: string, options: RequestOptions = {}): Promise<any> {
  const { method = 'GET', headers = {}, body, cookie, params } = options;

  let cookieHeader = cookie;
  if (typeof window === 'undefined' && !cookie) {
    const { cookies } = await import('next/headers');
    const cookieStore = cookies();
    cookieHeader = cookieStore.getAll().map((c) => `${c.name}=${c.value}`).join('; ');
  }

  const fullUrl = buildUrlWithParams(`${env.API_URL}${url}`, params);

  const response = await fetch(fullUrl, {
    method,
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      ...headers,
      ...(cookieHeader ? { Cookie: cookieHeader } : {}),
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
  post: (url: string, body?: unknown, options?: RequestOptions) => fetchApi(url, { ...options, method: 'POST', body }),
  put: (url: string, body?: unknown, options?: RequestOptions) => fetchApi(url, { ...options, method: 'PUT', body }),
  delete: (url: string, options?: RequestOptions) => fetchApi(url, { ...options, method: 'DELETE' }),
};