import type React from 'react';
import { createContext, useState, type ReactNode } from 'react'
import { useContext } from 'react';

type TGlobalContext = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
  // NOTE: The token is included here for convenience. It is not stored in cookies or any other more secure way.
  token: string;
  setToken: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  loading: false,
  setLoading: () => {},
  isLogged: false,
  setIsLogged: () => {},
  token: '',
  setToken: () => {}
});

type TGlobalProviderProps = {
  children: ReactNode;
}

export const GlobalProvider: React.FC<TGlobalProviderProps> = ({ children }) => {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ isLogged, setIsLogged ] = useState<boolean>(false);
  const [ token, setToken ] = useState<string>('');

  const contextValue: TGlobalContext = {
    loading, setLoading,
    isLogged, setIsLogged,
    token, setToken
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error('useGlobalContext must be used within a GlobalProvider');
  }
  return context;
};
