import React, { createContext, Suspense, useContext, JSX } from 'react';
import { Route, BrowserRouter as Router, Routes, Navigate } from 'react-router';
import { Header } from '@layout/Header';
import { GlobalContext } from '@contexts/GlobalContext';
import { routes } from '@constants/routes';
import { RoutePaths } from '@enums/route-paths';

interface RouterContextProps {
  currentRoute: string;
  navigate: (path: string) => void;
}

const RouterContext = createContext<RouterContextProps | undefined>(undefined);

type routeType = {
  path: string;
  element: JSX.Element;
  protected: boolean;
}

export const RouterProvider: React.FC = () => {
  const { isLogged } = useContext(GlobalContext);

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
          <main className='container mx-auto'>
            <Routes>
              {routes.map((route: routeType) => (
                route.protected && !isLogged ? (
                  <Route key={route.path} path={route.path} element={<Navigate to={RoutePaths.LOGIN} />} />
                ) : (
                  <Route key={route.path} path={route.path} element={route.element} />
                )
              ))}
            </Routes>
          </main>
        </Suspense>
      </Router>
    </RouterContext.Provider>
  );
};

export const useRouterContext = () => {
  const context = useContext(RouterContext);
  if (!context) {
    throw new Error('useRouterContext must be used within a RouterProvider');
  }
  return context;
};
