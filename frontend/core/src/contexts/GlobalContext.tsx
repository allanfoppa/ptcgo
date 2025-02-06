import type React from 'react';
import { createContext, useState, type ReactNode } from 'react'

type TGlobalContext = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  text: string
  setText: React.Dispatch<React.SetStateAction<string>>;
}

export const GlobalContext = createContext<TGlobalContext>({
  loading: false,
  setLoading: () => {},
  text: '',
  setText: () => {}
});

type TGlobalProviderProps = {
  children: ReactNode;
}

export const GlobalProvider: React.FC<TGlobalProviderProps> = ({ children }) => {

  const [ loading, setLoading ] = useState<boolean>(false);
  const [ text, setText ] = useState<string>('');

  const contextValue: TGlobalContext = {
    loading, setLoading,
    text, setText
  }

  return (
    <GlobalContext.Provider value={contextValue}>
      {children}
    </GlobalContext.Provider>
  )
}
