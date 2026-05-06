import React, { createContext, useContext, useState } from 'react';

type User = {
  username: string;
  password: string;
};

type AppContextType = {
  user: User | null;
  registerUser: (u: User) => void;
  login: (u: User) => boolean;
  balance: number;
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [registeredUser, setRegisteredUser] = useState<User | null>(null);
  const [balance] = useState(1000);

  // SIGNUP
  const registerUser = (u: User) => {
    setRegisteredUser(u);
  };

  // LOGIN (must match signup)
  const login = (u: User) => {
    if (
      registeredUser &&
      u.username === registeredUser.username &&
      u.password === registeredUser.password
    ) {
      setUser(u);
      return true;
    }
    return false;
  };

  return (
    <AppContext.Provider value={{ user, registerUser, login, balance }}>
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const ctx = useContext(AppContext);
  if (!ctx) throw new Error('useApp must be inside AppProvider');
  return ctx;
};