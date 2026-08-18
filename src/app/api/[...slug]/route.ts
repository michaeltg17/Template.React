import { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

type RouteContext = {
  params: {
    slug: string[];
  };
};

const REQUEST_HEADERS_TO_STRIP = [
  'host',
  'connection',
  'content-length',
  'transfer-encoding',
  'keep-alive',
  'proxy-authenticate',
  'proxy-authorization',
  'te',
  'trailer',
  'upgrade',
];

const RESPONSE_HEADERS_TO_STRIP = [
  'content-length',
  'transfer-encoding',
  'content-encoding',
  'set-cookie',
];

function getApiUrl(): string {
  const url = process.env.API_URL;
  if (!url) {
    throw new Error('API_URL environment variable is required');
  }
  return url.endsWith('/') ? url : `${url}/`;
}

function buildRequestUrl(path: string): string {
  return new URL(path, getApiUrl()).toString();
}

async function proxyRequest(req: NextRequest, { params }: RouteContext): Promise<Response> {
  const headers = new Headers(req.headers);
  for (const name of REQUEST_HEADERS_TO_STRIP) {
    headers.delete(name);
  }

  const init: RequestInit & { duplex?: 'half' } = {
    method: req.method,
    headers,
    cache: 'no-store',
  };

  if (req.method !== 'GET' && req.method !== 'HEAD') {
    init.body = req.body;
    init.duplex = 'half';
  }

  let upstream: Response;
  try {
    upstream = await fetch(buildRequestUrl(params.slug.join('/')), init);
  } catch {
    return new Response('Failed to reach the API backend', { status: 502 });
  }

  const responseHeaders = new Headers(upstream.headers);
  for (const name of RESPONSE_HEADERS_TO_STRIP) {
    responseHeaders.delete(name);
  }
  const setCookies = (upstream.headers as { getSetCookie?: () => string[] }).getSetCookie?.() ?? [];
  for (const cookie of setCookies) {
    responseHeaders.append('set-cookie', cookie);
  }

  return new Response(upstream.body, {
    status: upstream.status,
    statusText: upstream.statusText,
    headers: responseHeaders,
  });
}

export async function GET(req: NextRequest, context: RouteContext): Promise<Response> {
  return proxyRequest(req, context);
}

export async function POST(req: NextRequest, context: RouteContext): Promise<Response> {
  return proxyRequest(req, context);
}

export async function PUT(req: NextRequest, context: RouteContext): Promise<Response> {
  return proxyRequest(req, context);
}

export async function PATCH(req: NextRequest, context: RouteContext): Promise<Response> {
  return proxyRequest(req, context);
}

export async function DELETE(req: NextRequest, context: RouteContext): Promise<Response> {
  return proxyRequest(req, context);
}
