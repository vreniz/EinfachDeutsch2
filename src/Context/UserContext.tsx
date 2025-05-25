// src/Context/UserContext.tsx
import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

export type User = {
  name: string;
  lastName: string;
  email: string;
  birthDate: string;
  country: string;
  photoUrl?: string; // <-- Nueva propiedad
} | null;

type UserContextType = {
  user: User;
  setUser: (user: User) => void;
  logout: () => void;
};

const DEFAULT_USER: User = {
  name: "Vanessa",
  lastName: "Reniz",
  email: "vanereniz@gmail.com",
  birthDate: "2001-05-15",
  country: "Colombia"
};

const UserContext = createContext<UserContextType | undefined>(undefined);

export function UserProvider({ children }: { children: ReactNode }) {
  const [user, setUserState] = useState<User>(DEFAULT_USER);

  // Fake "logout"
  const logout = () => setUserState(null);

  // Fake "login"/update
  const setUser = (user: User) => setUserState(user);

  return (
    <UserContext.Provider value={{ user, setUser, logout }}>
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
