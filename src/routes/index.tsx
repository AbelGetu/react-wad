import { 
  createBrowserRouter,
  // Navigate, 
  // Outlet 
} from 'react-router-dom';
import {
  // lazy, 
  Suspense } from 'react';
import { Layout } from '@/components/layout';
import { AuthLayout } from '@/components/auth-layout';
import { LoadingSpinner } from '@/components/ui/loading-spinner';
import { ProtectedRoute, PublicOnlyRoute } from '@/components/auth/route-protection';
import { Home } from '@/screens/home';
import { Dashboard } from '@/screens/dashboard';
import { Profile } from '@/screens/profile';
import Login from '@/screens/auth/Login';
import { NotFound } from '@/screens/not-found';


export const router = createBrowserRouter([
  {
    path: '/',
    element: (
      <ProtectedRoute>
        <Layout />
      </ProtectedRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'dashboard',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: 'profile',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Profile />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '/login',
    element: (
      <PublicOnlyRoute>
        <AuthLayout />
      </PublicOnlyRoute>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: '*',
    element: (
      <Suspense fallback={<LoadingSpinner />}>
        <NotFound />
      </Suspense>
    ),
  },
]);