import type React from 'react';
import { createContext, useState, type ReactNode } from 'react'

type TGlobalContext = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  isLogged: boolean;
  setIsLogged: React.Dispatch<React.SetStateAction<boolean>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  loading: false,
  setLoading: () => {},
  isLogged: false,
  setIsLogged: () => {}
});

type TGlobalProviderProps = {
  children: ReactNode;
}

export const GlobalProvider: React.FC<TGlobalProviderProps> = ({ children }) => {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ isLogged, setIsLogged ] = useState<boolean>(false);

  const contextValue: TGlobalContext = {
    loading, setLoading,
    isLogged, setIsLogged
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}
