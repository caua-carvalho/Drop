import { useEffect } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { CartDrawer } from './CartDrawer';
import { SearchOverlay } from './SearchOverlay';
import { MobileTabBar } from './MobileTabBar';
import { FloatingWhatsApp } from './FloatingWhatsApp';
import { Toaster } from './Toaster';

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'auto' });
  }, [pathname]);
  return null;
}

export function RootLayout() {
  return (
    <div className="flex min-h-dvh flex-col bg-ink-950">
      <ScrollToTop />
      <Header />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
      <MobileTabBar />
      <CartDrawer />
      <SearchOverlay />
      <FloatingWhatsApp />
      <Toaster />
    </div>
  );
}
