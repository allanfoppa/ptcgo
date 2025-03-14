import React, { createContext, Suspense, useContext } from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router';
import { Header } from '@layout/Header';

interface RouterContextProps {
  currentRoute: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
};

interface RouterProviderProps {
  routes: { path: string; element: React.ReactNode }[];
}

export const RouterProvider: React.FC<RouterProviderProps> = ({ routes }) => {
  const routerContextValue: RouterContextProps = {
    currentRoute: window.location.pathname,
    navigate: (path: string) => {
      window.history.pushState({}, '', path);
      window.dispatchEvent(new PopStateEvent('popstate'));
    }
  };

  return (
    <RouterContext.Provider value={routerContextValue}>
      <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Header />
          <main>
            <Routes>
              {routes.map((route, index) => (
                <Route key={index} path={route.path} element={route.element} />
              ))}
            </Routes>
          </main>
        </Suspense>
      </Router>
    </RouterContext.Provider>
  );
};
