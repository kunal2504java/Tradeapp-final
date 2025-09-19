export function getAuthToken(): string | null {
  return localStorage.getItem('authToken');
}

export function setAuthToken(token: string | null) {
  if (token) {
    localStorage.setItem('authToken', token);
  } else {
    localStorage.removeItem('authToken');
  }
}

export async function api<T = unknown>(path: string, init?: { method?: string; body?: unknown; headers?: Record<string, string> }): Promise<T> {
  const token = getAuthToken();

  // Ensure we're calling the backend API
  const fullUrl = path.startsWith('http') ? path : `http://localhost:4000${path}`;

  console.log('API call:', fullUrl, 'Token:', token ? 'Present' : 'Missing');

  const res = await fetch(fullUrl, {
    method: init?.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  console.log('API response status:', res.status, res.statusText);

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      message = data?.error?.message || data?.error || data?.message || message;
    } catch {}
    console.error('API error:', message);
    throw new Error(message);
  }

  try {
    const data = await res.json();
    console.log('API response data:', data);
    return data as T;
  } catch (e) {
    // If the response body is empty, return an empty object.
    return {} as T;
  }
}
