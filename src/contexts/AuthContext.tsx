import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import * as authService from '../services/auth';
import { User } from '../services/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<{ success: boolean; message?: string }>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already authenticated
    const storedUser = authService.getAuthUser();
    const token = authService.getAuthToken();

    if (storedUser && token) {
      // Verify token is still valid
      verifyAuth();
    } else {
      setIsLoading(false);
    }
  }, []);

  const verifyAuth = async () => {
    try {
      const token = authService.getAuthToken();
      if (!token) {
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api'}/auth/me`, {
        headers: authService.getAuthHeaders(),
      });

      if (response.ok) {
        const data = await response.json();
        if (data.success && data.data?.user) {
          setUser(data.data.user);
        } else {
          authService.clearAuthData();
        }
      } else {
        authService.clearAuthData();
      }
    } catch (error) {
      console.error('Auth verification error:', error);
      authService.clearAuthData();
    } finally {
      setIsLoading(false);
    }
  };

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      const response = await authService.login(email, password);
      if (response.success && response.data) {
        setUser(response.data.user);
        return { success: true };
      }
      return { success: false, message: response.message || 'Login failed' };
    } catch (error) {
      return {
        success: false,
        message: error instanceof Error ? error.message : 'Login failed',
      };
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
      setUser(null);
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

