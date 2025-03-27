import { lazy } from 'react';

const Login = lazy(() => import('login/Login'));
const Dashboard = lazy(() => import('dashboard/Dashboard'));
const Register = lazy(() => import('register/Register'));
const Decks = lazy(() => import('decks/Decks'));
const NotFound = lazy(() => import('notFound/NotFound'));

export const routes = [
  {
    path: '/',
    element: <Dashboard />,
    protected: true,
  },
  {
    path: '/register/*',
    element: <Register />,
    protected: false,
  },
  {
    path: '/login/*',
    element: <Login />,
    protected: false,
  },
  {
    path: '/decks',
    element: <Decks />,
    protected: true,
  },
  {
    path: '*',
    element: <NotFound />,
    protected: false,
  }
]
