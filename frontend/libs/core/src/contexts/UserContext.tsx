import type React from 'react';
import { createContext, useState, type ReactNode } from 'react'
import { useContext } from 'react';

type TUserContext = {
  user: string;
  setUser: React.Dispatch<React.SetStateAction<string>>;
  userId: string;
  setUserId: React.Dispatch<React.SetStateAction<string>>;
  // NOTE: The token is included here for convenience. It is not stored in cookies or any other more secure way.
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = createContext<TUserContext>({
  user: '',
  setUser: () => {},
  userId: '',
  setUserId: () => {},
  token: '',
  setToken: () => {},
});

type TUserProviderProps = {
  children: ReactNode;
}

export const UserProvider: React.FC<TUserProviderProps> = ({ children }) => {

  const [ token, setToken ] = useState<string>('');
  const [ user, setUser ] = useState<string>('');
  const [ userId, setUserId ] = useState<string>('');

  const contextValue: TUserContext = {
    token, setToken,
    user, setUser,
    userId, setUserId,
  }

  return (
    <UserContext.Provider value={contextValue}>
      {children}
    </UserContext.Provider>
  )
}

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
