import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from '@/components/ui/toaster';

// Pages
import Index from './pages/Index';
import Profile from './pages/Profile';
import Jobs from './pages/Jobs';
import Documents from './pages/Documents';
import Auth from './pages/Auth';
import CareerDocs from './pages/CareerDocs';
import Google from './pages/Google';
import LinkedIn from './pages/LinkedIn';
import NotFound from './pages/NotFound';

// Set up react-query
const queryClient = new QueryClient();

// Create router
const router = createBrowserRouter([
  {
    path: "/",
    element: <Index />
  },
  {
    path: "/profile",
    element: <Profile />
  },
  {
    path: "/jobs",
    element: <Jobs />
  },
  {
    path: "/documents",
    element: <Documents />
  },
  {
    path: "/career-docs",
    element: <CareerDocs />
  },
  {
    path: "/auth",
    element: <Auth />
  },
  {
    path: "/google",
    element: <Google />
  },
  {
    path: "/google/callback",
    element: <Google />
  },
  {
    path: "/linkedin",
    element: <LinkedIn />
  },
  {
    path: "/linkedin/callback",
    element: <LinkedIn />
  },
  {
    path: "/linkedin/connect",
    element: <LinkedIn />
  },
  {
    path: "*",
    element: <NotFound />
  }
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="system" storageKey="ui-theme">
        <AuthProvider>
          <RouterProvider router={router} />
        </AuthProvider>
      </ThemeProvider>
      <Toaster />
    </QueryClientProvider>
  </React.StrictMode>,
);
