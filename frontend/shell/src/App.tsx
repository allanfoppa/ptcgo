import { lazy, Suspense } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router';
import './App.css';
import { Header } from 'core/Header'
import Login from 'login/Login'

const Dashboard = lazy(() => import("dashboard/Dashboard"));

const App = () => {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
      <Header />
        <main className="content">
          <Routes>
            <Route path="/dashboard/*" element={<Dashboard />} />
            <Route path="/" element={<Login />} />
          </Routes>
        </main>
      </Suspense>
    </Router>
  );
};

export default App;
