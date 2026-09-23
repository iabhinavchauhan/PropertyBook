import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const ListingsPage = lazy(() => import('./pages/ListingsPage'));
const DetailsPage = lazy(() => import('./pages/DetailsPage'));
const Dashboard = lazy(() => import('./pages/Dashboard'));

function ProtectedDashboard() {
  const location = useLocation();
  let user = null;
  try { user = JSON.parse(localStorage.getItem('propertybook-user') || 'null'); } catch { user = null; }
  return user?.email
    ? <Dashboard />
    : <Navigate to="/" replace state={{ requireSignIn: true, from: `${location.pathname}${location.search}` }} />;
}

const pageTitles = {
  '/': 'Roamstead | Stay Comfortably Across Uttarakhand',
  '/listings': 'Browse Stays | Roamstead',
  '/dashboard': 'Your Dashboard | Roamstead',
};

function RouteLoader() {
  return (
    <div className="route-loader container" role="status" aria-live="polite">
      <span className="loader-spinner" aria-hidden="true" />
      <span>Loading page...</span>
    </div>
  );
}

function PageTitle() {
  const { pathname } = useLocation();

  useEffect(() => {
    const propertyMatch = pathname.match(/^\/property\/([^/]+)$/);
    document.title = propertyMatch
      ? 'Stay Details | Roamstead'
      : (pageTitles[pathname] || 'Roamstead | Stay Comfortably Across Uttarakhand');
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <PageTitle />
      <Navbar>
        <Suspense fallback={<RouteLoader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/listings" element={<ListingsPage />} />
            <Route path="/property/:id" element={<DetailsPage />} />
            <Route path="/dashboard" element={<ProtectedDashboard />} />
            <Route path="*" element={<RouteLoader />} />
          </Routes>
        </Suspense>
      </Navbar>
    </Router>
  );
}

export default App;
 
