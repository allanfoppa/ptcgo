import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import { Header } from 'core/Header'
import './App.css';

import Login from 'login/Login'
const Dashboard = lazy(() => import("dashboard/Dashboard"));
const NotFound = lazy(() => import("notFound/NotFound"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Header />
        <main>
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
};

export default App;
