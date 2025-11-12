// Authentication service
const AUTH_TOKEN_KEY = 'admin_auth_token';
const AUTH_USER_KEY = 'admin_user';

export interface User {
  id: number;
  name: string;
  username?: string;
  email: string;
  is_admin?: boolean;
}

export interface AuthResponse {
  success: boolean;
  data?: {
    user: User;
    token: string;
  };
  message?: string;
  errors?: Record<string, string[]>;
}

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Get stored token
export const getAuthToken = (): string | null => {
  return localStorage.getItem(AUTH_TOKEN_KEY);
};

// Get stored user
export const getAuthUser = (): User | null => {
  const userStr = localStorage.getItem(AUTH_USER_KEY);
  return userStr ? JSON.parse(userStr) : null;
};

// Set auth data
export const setAuthData = (user: User, token: string): void => {
  localStorage.setItem(AUTH_TOKEN_KEY, token);
  localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
};

// Clear auth data
export const clearAuthData = (): void => {
  localStorage.removeItem(AUTH_TOKEN_KEY);
  localStorage.removeItem(AUTH_USER_KEY);
};

// Check if user is authenticated
export const isAuthenticated = (): boolean => {
  return !!getAuthToken();
};

// Login
export const login = async (email: string, password: string): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.success && data.data) {
      setAuthData(data.data.user, data.data.token);
    }

    return data;
  } catch (error) {
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
};

// Logout
export const logout = async (): Promise<void> => {
  const token = getAuthToken();
  
  if (token) {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      // Ignore errors on logout
      console.error('Logout error:', error);
    }
  }

  clearAuthData();
};

// Get auth headers for API requests (only returns Authorization header)
export const getAuthHeaders = (): HeadersInit => {
  const token = getAuthToken();
  const headers: HeadersInit = {};

  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  return headers;
};

