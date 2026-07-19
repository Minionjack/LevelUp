/**
 * Authentication Context
 * Provides authentication state and methods throughout the app
 *
 * @module contexts/AuthContext
 */

import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import {
  login as loginService,
  register as registerService,
  logout as logoutService,
  getCurrentUser,
} from "@/services/authService";
import { getAccessToken } from "@/services/api";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (email: string, password: string, name?: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * AuthProvider component
 */
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Check if user is authenticated on mount
   * DISABLED: Bypassing authentication check to skip login
   */
  useEffect(() => {
    // Skip authentication check - set loading to false immediately
    setIsLoading(false);
    // Optionally set a mock user if needed
    // setUser({ id: '1', email: 'demo@example.com', name: 'Demo User' });
  }, []);

  /**
   * Check authentication status
   * DISABLED: No longer checking auth to bypass login
   */
  const checkAuth = async () => {
    // Disabled - no API calls
    setIsLoading(false);
  };

  /**
   * Login user
   * DISABLED: Bypassing login - returns immediately with mock user
   */
  const login = async (email: string, password: string): Promise<void> => {
    // Bypass login - set mock user immediately
    setUser({ 
      id: '1', 
      email: email || 'demo@example.com', 
      name: 'Demo User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  /**
   * Register user
   * DISABLED: Bypassing registration - returns immediately with mock user
   */
  const register = async (
    email: string,
    password: string,
    name?: string
  ): Promise<void> => {
    // Bypass registration - set mock user immediately
    setUser({ 
      id: '1', 
      email: email || 'demo@example.com', 
      name: name || 'Demo User',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    });
  };

  /**
   * Logout user
   * DISABLED: Bypassing logout API call
   */
  const logout = async (): Promise<void> => {
    // Bypass API call - just clear user state
    setUser(null);
  };

  /**
   * Refresh user data
   * DISABLED: No API calls - returns immediately
   */
  const refreshUser = async (): Promise<void> => {
    // Bypass API call - keep current user or set mock user
    if (!user) {
      setUser({ 
        id: '1', 
        email: 'demo@example.com', 
        name: 'Demo User',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });
    }
  };

  const value: AuthContextType = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    register,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

/**
 * Hook to use auth context
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
