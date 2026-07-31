import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  name: string;
  email: string;
  isGuest: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string) => void;
  continueAsGuest: () => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    const saved = localStorage.getItem('leonie_user');
    return saved ? JSON.parse(saved) : null;
  });

  const isAuthenticated = !!user;

  const login = (email: string) => {
    const nameFromEmail = email.split('@')[0] || 'Valued Guest';
    const formattedName = nameFromEmail.charAt(0).toUpperCase() + nameFromEmail.slice(1);
    const newUser: User = {
      name: formattedName,
      email: email,
      isGuest: false,
    };
    setUser(newUser);
    localStorage.setItem('leonie_user', JSON.stringify(newUser));
  };

  const continueAsGuest = () => {
    const guestUser: User = {
      name: 'Guest Client',
      email: 'guest@leonie-luxe.com',
      isGuest: true,
    };
    setUser(guestUser);
    localStorage.setItem('leonie_user', JSON.stringify(guestUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('leonie_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, login, continueAsGuest, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
