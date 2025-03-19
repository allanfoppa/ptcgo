import { lazy } from 'react';

import Login from 'login/Login';
const Dashboard = lazy(() => import('dashboard/Dashboard'));
const Register = lazy(() => import('register/Register'));
const Decks = lazy(() => import('decks/Decks'));
const NotFound = lazy(() => import('notFound/NotFound'));

export const pageRoutes = [
  {
    path: '/dashboard/*',
    element: <Dashboard />
  },
  {
    path: '/register/*',
    element: <Register />
  },
  {
    path: '/',
    element: <Login />
  },
  {
    path: '/decks',
    element: <Decks />
  },
  {
    path: '*',
    element: <NotFound />
  }
]
