import { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import { ToastProvider } from './context/ToastContext';
import { useTheme } from './hooks/useTheme';
import ErrorBoundary from './components/ErrorBoundary';
import PageTransition from './components/PageTransition';
import { PageLoader } from './components/Loader';

const Landing = lazy(() => import('./pages/Landing'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Results = lazy(() => import('./pages/Results'));

function ThemeWrapper({ children }) {
  useTheme();
  return children;
}

function AnimatedRoutes() {
  const location = useLocation();
  const path = location.pathname;

  let Page;
  switch (path) {
    case '/': Page = Landing; break;
    case '/dashboard': Page = Dashboard; break;
    case '/results': Page = Results; break;
    default: return <Navigate to="/" replace />;
  }

  return (
    <AnimatePresence mode="wait">
      <PageTransition key={path}>
        <Page />
      </PageTransition>
    </AnimatePresence>
  );
}

function AppContent() {
  return (
    <ThemeWrapper>
      <BrowserRouter>
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
            <PageLoader />
          </div>
        }>
          <AnimatedRoutes />
        </Suspense>
      </BrowserRouter>
    </ThemeWrapper>
  );
}

export default function App() {
  return (
    <ErrorBoundary>
      <ToastProvider>
        <AppContent />
      </ToastProvider>
    </ErrorBoundary>
  );
}
