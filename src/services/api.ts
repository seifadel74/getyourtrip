// API Configuration
// Note: Create React App uses process.env.REACT_APP_* for environment variables
import * as authService from './auth';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api';

// Types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message?: string;
  errors?: Record<string, string[]>;
  pagination?: {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
  };
}

export interface Tour {
  id: number;
  title: string;
  description?: string;
  price: number;
  location: string;
  duration: string;
  image?: string | string[]; // Support both single string (backward compatibility) and array
  type?: string;
  max_group_size?: number;
  rating?: number;
  reviews_count?: number;
  itinerary?: Array<{
    day: number;
    title: string;
    description: string;
    duration?: string;
    activities?: string[];
  }>;
  highlights?: string[];
  included?: string[];
  excluded?: string[];
  countries?: string[]; // add this line
  languages?: string[];
  is_featured?: boolean;
  is_active?: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: number;
  tour_id: number;
  booking_number?: string;
  name: string;
  email: string;
  phone: string;
  booking_date: string;
  adults: number;
  children?: number;
  special_requests?: string;
  total_amount: number;
  status: string;
  tour?: Tour;
  created_at?: string;
  updated_at?: string;
}

export interface ContactForm {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

// Helper function to handle API requests
async function apiRequest<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<ApiResponse<T>> {
  const url = `${API_BASE_URL}${endpoint}`;
  
  // Get auth headers (includes Authorization token if authenticated)
  const authHeaders = authService.getAuthHeaders();
  
  // Merge headers: options.headers take precedence, then auth headers, then defaults
  const mergedHeaders: HeadersInit = {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    ...authHeaders,
    ...(options.headers || {}),
  };

  const config: RequestInit = {
    ...options,
    headers: mergedHeaders,
  };

  try {
    const response = await fetch(url, config);
    
    // Handle non-JSON responses
    if (!response.ok && response.status >= 500) {
      return {
        success: false,
        message: 'Server error. Please try again later.',
      };
    }
    
    // Try to parse JSON, but handle cases where response might not be JSON
    let data;
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      data = await response.json();
    } else {
      // If not JSON, return error
      return {
        success: false,
        message: 'Invalid response from server',
      };
    }

    // Handle 401 Unauthorized - clear auth and redirect to login
    if (response.status === 401) {
      // Clear authentication if token is invalid
      authService.clearAuthData();
      return {
        success: false,
        message: 'Session expired. Please login again.',
        errors: data.errors,
      };
    }

    if (!response.ok) {
      return {
        success: false,
        message: data.message || 'An error occurred',
        errors: data.errors,
      };
    }

    return {
      success: true,
      ...data,
    };
  } catch (error) {
    // Handle network errors gracefully
    if (error instanceof TypeError && error.message.includes('fetch')) {
      return {
        success: false,
        message: 'Unable to connect to server. Please check if the backend is running.',
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Network error occurred',
    };
  }
}

// API Service
export const api = {
  // Tours
  tours: {
    getAll: async (params?: {
      featured?: boolean;
      type?: string;
      location?: string;
      search?: string;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
      per_page?: number;
      page?: number;
    }): Promise<ApiResponse<Tour[]>> => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      const queryString = queryParams.toString();
      return apiRequest<Tour[]>(`/tours${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id: number): Promise<ApiResponse<Tour>> => {
      return apiRequest<Tour>(`/tours/${id}`);
    },

    create: async (tour: Partial<Tour>): Promise<ApiResponse<Tour>> => {
      return apiRequest<Tour>('/tours', {
        method: 'POST',
        body: JSON.stringify(tour),
      });
    },

    update: async (id: number, tour: Partial<Tour>): Promise<ApiResponse<Tour>> => {
      return apiRequest<Tour>(`/tours/${id}`, {
        method: 'PUT',
        body: JSON.stringify(tour),
      });
    },

    delete: async (id: number): Promise<ApiResponse<void>> => {
      return apiRequest<void>(`/tours/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Bookings
  bookings: {
    getAll: async (params?: {
      status?: string;
      tour_id?: number;
      email?: string;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
      per_page?: number;
      page?: number;
    }): Promise<ApiResponse<Booking[]>> => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      const queryString = queryParams.toString();
      return apiRequest<Booking[]>(`/bookings${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id: number): Promise<ApiResponse<Booking>> => {
      return apiRequest<Booking>(`/bookings/${id}`);
    },

    create: async (booking: {
      tour_id: number;
      name: string;
      email: string;
      phone: string;
      booking_date: string;
      adults: number;
      children?: number;
      special_requests?: string;
    }): Promise<ApiResponse<Booking>> => {
      return apiRequest<Booking>('/bookings', {
        method: 'POST',
        body: JSON.stringify(booking),
      });
    },

    update: async (id: number, booking: Partial<Booking>): Promise<ApiResponse<Booking>> => {
      return apiRequest<Booking>(`/bookings/${id}`, {
        method: 'PUT',
        body: JSON.stringify(booking),
      });
    },

    delete: async (id: number): Promise<ApiResponse<void>> => {
      return apiRequest<void>(`/bookings/${id}`, {
        method: 'DELETE',
      });
    },
  },

  // Contact
  contact: {
    submit: async (form: ContactForm): Promise<ApiResponse<void>> => {
      return apiRequest<void>('/contact', {
        method: 'POST',
        body: JSON.stringify(form),
      });
    },
  },

  // Users
  users: {
    getAll: async (params?: {
      search?: string;
      sort_by?: string;
      sort_order?: 'asc' | 'desc';
      per_page?: number;
      page?: number;
    }): Promise<ApiResponse<any[]>> => {
      const queryParams = new URLSearchParams();
      if (params) {
        Object.entries(params).forEach(([key, value]) => {
          if (value !== undefined && value !== null) {
            queryParams.append(key, String(value));
          }
        });
      }
      const queryString = queryParams.toString();
      return apiRequest<any[]>(`/users${queryString ? `?${queryString}` : ''}`);
    },

    getById: async (id: number): Promise<ApiResponse<any>> => {
      return apiRequest<any>(`/users/${id}`);
    },

    create: async (user: {
      name: string;
      username: string;
      email: string;
      password: string;
    }): Promise<ApiResponse<any>> => {
      return apiRequest<any>('/users', {
        method: 'POST',
        body: JSON.stringify(user),
      });
    },

    update: async (id: number, user: Partial<{
      name: string;
      username: string;
      email: string;
      password: string;
    }>): Promise<ApiResponse<any>> => {
      return apiRequest<any>(`/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(user),
      });
    },

    delete: async (id: number): Promise<ApiResponse<void>> => {
      return apiRequest<void>(`/users/${id}`, {
        method: 'DELETE',
      });
    },
  },
};

export default api;

