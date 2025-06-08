import React, { createContext, useState, useContext, ReactNode } from 'react';

interface AuthContextType {
  isAuthenticated: boolean;
  userEmail: string | null;
  signIn: (email: string, pass: string) => void; // pass is unused for now
  signOut: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);

  const signIn = (email: string, _: string) => {
    // In a real app, you'd validate password here
    setIsAuthenticated(true);
    setUserEmail(email);
    console.log('User signed in:', email);
  };

  const signOut = () => {
    setIsAuthenticated(false);
    setUserEmail(null);
    console.log('User signed out');
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userEmail, signIn, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
