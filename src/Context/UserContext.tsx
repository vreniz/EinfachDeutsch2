// src/Context/UserContext.tsx
import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";
import { 
  login as apiLogin, 
  register as apiRegister, 
  logout as apiLogout, 
  getUserInfo,
  updateUserInfo,
  fetchProgress,
  doProgress,
  undoProgress,
  type UserInfo,
  type UpdateUserPayload,
  type ProgressPayload,
  type SectionName,
  type ProgressField
} from "../api/api";

export type User = {
  first_name: string;
  last_name: string;
  email: string;
  birth_date: string;
  country: string;
  photoUrl?: string;
} | null;

export type ProgressState = {
  section1: Record<ProgressField, boolean>;
  section2: Record<ProgressField, boolean>;
  section3: Record<ProgressField, boolean>;
};

type UserContextType = {
  user: User;
  isLoggedIn: boolean;
  isLoading: boolean;
  progress: ProgressState | null;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    country: string;
  }) => Promise<void>;
  logout: () => void;
  updateUser: (updates: UpdateUserPayload) => Promise<void>;
  refreshUserInfo: () => Promise<void>;
  refreshProgress: () => Promise<void>;
  updateProgress: (section: SectionName, field: ProgressField, value?: boolean) => Promise<void>;
  setUser: (user: User) => void; // Keep for backward compatibility
};

const UserContext = createContext<UserContextType | undefined>(undefined);

// Helper function to ensure all sections exist with default values
const ensureAllSections = (apiProgress: Partial<ProgressState>): ProgressState => {
  const defaultSectionProgress: Record<ProgressField, boolean> = {
    lessons: false,
    activity_1: false,
    activity_2: false,
    activity_3: false,
    quiz: false,
    section_complete: false,
  };

  return {
    section1: apiProgress?.section1 || defaultSectionProgress,
    section2: apiProgress?.section2 || defaultSectionProgress,
    section3: apiProgress?.section3 || defaultSectionProgress,
  };
};

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [progress, setProgress] = useState<ProgressState | null>(null);

  // Check for existing session on app load
  useEffect(() => {
    const token = localStorage.getItem('jwt_token');
    const storedUser = localStorage.getItem('user_info');
    const storedLoginState = localStorage.getItem('isLoggedIn');
    
    if (token && storedUser && storedLoginState === 'true') {
      try {
        const userData = JSON.parse(storedUser);
        setUserState(userData);
        setIsLoggedIn(true);
        // Try to refresh user info and progress
        refreshUserInfoSilent();
        refreshProgressSilent();
      } catch (error) {
        console.error('Error loading stored user data:', error);
        handleLogout();
      }
    }
    setIsLoading(false);
  }, []);

  const refreshUserInfoSilent = async () => {
    try {
      const response = await getUserInfo();
      const userInfo = response.user_info;
      setUserState(userInfo);
      localStorage.setItem('user_info', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error refreshing user info:', error);
    }
  };

  const refreshProgressSilent = async () => {
    try {
      const response = await fetchProgress();
      setProgress(ensureAllSections(response.progress));
    } catch (error) {
      console.error('Error refreshing progress:', error);
    }
  };

  const handleLogin = async (email: string, password: string): Promise<void> => {
    try {
      setIsLoading(true);
      await apiLogin(email, password);
      
      // Get user info after successful login
      const userResponse = await getUserInfo();
      const userInfo = userResponse.user_info;
      
      // Get progress after successful login
      const progressResponse = await fetchProgress();
      
      setUserState(userInfo);
      setProgress(ensureAllSections(progressResponse.progress));
      setIsLoggedIn(true);
      
      // Store in localStorage
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('user_info', JSON.stringify(userInfo));
      
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (userData: {
    email: string;
    password: string;
    first_name: string;
    last_name: string;
    birth_date: string;
    country: string;
  }): Promise<void> => {
    try {
      setIsLoading(true);
      await apiRegister(userData);
      
      // Auto-login after successful registration
      await handleLogin(userData.email, userData.password);
      
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    apiLogout();
    setUserState(null);
    setIsLoggedIn(false);
    setProgress(null);
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('user_info');
  };

  const handleUpdateUser = async (updates: UpdateUserPayload): Promise<void> => {
    try {
      await updateUserInfo(updates);
      // Refresh user info after successful update
      await refreshUserInfoSilent();
    } catch (error) {
      console.error('User update failed:', error);
      throw error;
    }
  };

  const refreshUserInfo = async (): Promise<void> => {
    try {
      const response = await getUserInfo();
      const userInfo = response.user_info;
      setUserState(userInfo);
      localStorage.setItem('user_info', JSON.stringify(userInfo));
    } catch (error) {
      console.error('Error refreshing user info:', error);
      throw error;
    }
  };

  const refreshProgress = async (): Promise<void> => {
    try {
      const response = await fetchProgress();
      setProgress(ensureAllSections(response.progress));
    } catch (error) {
      console.error('Error refreshing progress:', error);
      throw error;
    }
  };

  const updateProgress = async (section: SectionName, field: ProgressField, value: boolean = true): Promise<void> => {
    try {
      const payload: ProgressPayload = { section, field, value };
      
      if (value) {
        await doProgress(payload);
      } else {
        await undoProgress(payload);
      }
      
      // Refresh progress after successful update
      await refreshProgress();
    } catch (error) {
      console.error('Error updating progress:', error);
      throw error;
    }
  };

  // Keep setUser for backward compatibility
  const setUser = (user: User) => {
    setUserState(user);
    if (user) {
      localStorage.setItem('user_info', JSON.stringify(user));
    }
  };

  return (
    <UserContext.Provider value={{ 
      user, 
      isLoggedIn, 
      isLoading,
      progress,
      login: handleLogin, 
      register: handleRegister, 
      logout: handleLogout,
      updateUser: handleUpdateUser,
      refreshUserInfo,
      refreshProgress,
      updateProgress,
      setUser
    }}>
      {children}
    </UserContext.Provider>
  );
}

// Custom hook
export function useUser() {
  const ctx = useContext(UserContext);
  if (!ctx) throw new Error("useUser must be used within a UserProvider");
  return ctx;
}
