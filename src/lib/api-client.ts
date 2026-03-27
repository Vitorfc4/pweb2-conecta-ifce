import { API_BASE_URL } from '@/lib/api-config';

export class ApiError extends Error {
  status: number;
  data?: unknown;

  constructor(message: string, status: number, data?: unknown) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

type UnauthorizedHandler = () => void;
let unauthorizedHandler: UnauthorizedHandler | null = null;

export function setUnauthorizedHandler(handler: UnauthorizedHandler | null) {
  unauthorizedHandler = handler;
}

interface RequestOptions {
  method?: string;
  token?: string | null;
  body?: BodyInit | object | null;
  headers?: HeadersInit;
}

function isBodyInit(value: unknown): value is BodyInit {
  return (
    value instanceof FormData ||
    value instanceof URLSearchParams ||
    typeof value === 'string' ||
    value instanceof Blob ||
    value instanceof ArrayBuffer ||
    ArrayBuffer.isView(value)
  );
}

export async function apiRequest<T>(path: string, options: RequestOptions = {}): Promise<T> {
  const headers = new Headers(options.headers);

  if (options.token) {
    headers.set('Authorization', `Bearer ${options.token}`);
  }

  let body: BodyInit | undefined;

  if (options.body != null) {
    if (isBodyInit(options.body)) {
      body = options.body;
    } else {
      headers.set('Content-Type', 'application/json');
      body = JSON.stringify(options.body);
    }
  }

  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: options.method ?? 'GET',
    headers,
    body,
  });

  const contentType = response.headers.get('content-type') ?? '';
  const isJson = contentType.includes('application/json');
  const data = isJson ? await response.json().catch(() => null) : await response.text().catch(() => null);

  if (!response.ok) {
    const message =
      (typeof data === 'object' && data && 'message' in data && typeof data.message === 'string' && data.message) ||
      (typeof data === 'string' && data) ||
      'Não foi possível completar a requisição.';

    if (response.status === 401 && unauthorizedHandler) {
      unauthorizedHandler();
    }

    throw new ApiError(message, response.status, data);
  }

  return data as T;
}