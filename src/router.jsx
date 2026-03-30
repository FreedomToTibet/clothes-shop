import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';

// Eager-loaded critical components
import RootLayout from './layouts/RootLayout';
import { RouteErrorBoundary } from './components/ErrorBoundary';
import LoadingFallback from './components/LoadingFallback';

// Lazy-loaded route components
const Home = lazy(() => import('./pages/home/Home'));
const Shop = lazy(() => import('./pages/shop/shop'));
const Authentication = lazy(() => import('./pages/authentication/Authentication'));
const Checkout = lazy(() => import('./pages/checkOut/checkOut'));

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    errorElement: <RouteErrorBoundary />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: 'shop/*',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: 'auth',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Authentication />
          </Suspense>
        ),
      },
      {
        path: 'checkout',
        element: (
          <Suspense fallback={<LoadingFallback />}>
            <Checkout />
          </Suspense>
        ),
      },
    ],
  },
]);
