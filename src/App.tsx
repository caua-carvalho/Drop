import { lazy, Suspense } from 'react';
import { Route, Routes } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { Home } from './pages/Home';

// Code splitting por rota: mantém o bundle inicial enxuto (a Home é a entrada).
// As demais páginas são baixadas sob demanda.
const Catalog = lazy(() => import('./pages/Catalog').then((m) => ({ default: m.Catalog })));
const ProductDetail = lazy(() => import('./pages/ProductDetail').then((m) => ({ default: m.ProductDetail })));
const Favorites = lazy(() => import('./pages/Favorites').then((m) => ({ default: m.Favorites })));
const About = lazy(() => import('./pages/About').then((m) => ({ default: m.About })));
const Checkout = lazy(() => import('./pages/Checkout').then((m) => ({ default: m.Checkout })));
const NotFound = lazy(() => import('./pages/NotFound').then((m) => ({ default: m.NotFound })));

function RouteFallback() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center" role="status" aria-live="polite">
      <span className="h-8 w-8 animate-spin rounded-full border-2 border-line border-t-gold-500" />
      <span className="sr-only">Carregando…</span>
    </div>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        <Route path="/" element={<Home />} />
        <Route
          path="/loja"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Catalog />
            </Suspense>
          }
        />
        <Route
          path="/produto/:slug"
          element={
            <Suspense fallback={<RouteFallback />}>
              <ProductDetail />
            </Suspense>
          }
        />
        <Route
          path="/favoritos"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Favorites />
            </Suspense>
          }
        />
        <Route
          path="/sobre"
          element={
            <Suspense fallback={<RouteFallback />}>
              <About />
            </Suspense>
          }
        />
        <Route
          path="/checkout"
          element={
            <Suspense fallback={<RouteFallback />}>
              <Checkout />
            </Suspense>
          }
        />
        <Route
          path="*"
          element={
            <Suspense fallback={<RouteFallback />}>
              <NotFound />
            </Suspense>
          }
        />
      </Route>
    </Routes>
  );
}
