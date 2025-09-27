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

  // Determine the base URL based on environment
  const isDevelopment = import.meta.env.DEV;
  const baseUrl = isDevelopment 
    ? '' // Use relative URLs in development (Vite proxy will handle it)
    : window.location.origin; // Use current origin in production
    
  const fullUrl = path.startsWith('http') ? path : `${baseUrl}${path}`;

  // Only log in development mode to improve performance
  if (process.env.NODE_ENV === 'development') {
    console.log('API call:', fullUrl, 'Token:', token ? 'Present' : 'Missing');
  }

  const res = await fetch(fullUrl, {
    method: init?.method ?? 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...(init?.headers ?? {}),
    },
    body: init?.body ? JSON.stringify(init.body) : undefined,
  });

  if (process.env.NODE_ENV === 'development') {
    console.log('API response status:', res.status, res.statusText);
  }

  if (!res.ok) {
    let message = 'Request failed';
    try {
      const data = await res.json();
      if (process.env.NODE_ENV === 'development') {
        console.error('API error data:', data);
      }
      // Handle Zod validation errors
      if (data?.error?.fieldErrors || data?.error?.formErrors) {
        const fieldErrors = data.error.fieldErrors || {};
        const formErrors = data.error.formErrors || [];
        message = formErrors[0] || Object.values(fieldErrors)[0]?.[0] || 'Validation failed';
      } else {
        message = data?.error?.message || data?.error || data?.message || message;
      }
    } catch {}
    if (process.env.NODE_ENV === 'development') {
      console.error('API error:', message);
    }
    throw new Error(message);
  }

  try {
    const data = await res.json();
    if (process.env.NODE_ENV === 'development') {
      console.log('API response data:', data);
    }
    return data as T;
  } catch (e) {
    // If the response body is empty, return an empty object.
    return {} as T;
  }
}
