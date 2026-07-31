import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { Navbar } from './components/Navbar/Navbar';
import { Footer } from './components/Footer/Footer';
import { Login } from './pages/Login/Login';
import { Home } from './pages/Home/Home';
import { Product } from './pages/Product/Product';
import { Cart } from './pages/Cart/Cart';
import { Checkout } from './pages/Checkout/Checkout';
import { OrderSuccess } from './pages/OrderSuccess/OrderSuccess';

// Scroll To Top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// Demo Protected Route Wrapper
const ProtectedRoute: React.FC<{ children: React.ReactElement }> = ({ children }) => {
  const isEntered = sessionStorage.getItem('leonie_demo_entered') === 'true';

  if (!isEntered) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

// App Layout Wrapper
const AppLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div className="flex flex-col min-h-screen">
      <ScrollToTop />
      {!isLoginPage && <Navbar />}
      <main className="flex-grow">{children}</main>
      {!isLoginPage && <Footer />}
    </div>
  );
};

// Main App Router
export function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <AppLayout>
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <Home />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/product/:slug"
                element={
                  <ProtectedRoute>
                    <Product />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/cart"
                element={
                  <ProtectedRoute>
                    <Cart />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/checkout"
                element={
                  <ProtectedRoute>
                    <Checkout />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/order-success"
                element={
                  <ProtectedRoute>
                    <OrderSuccess />
                  </ProtectedRoute>
                }
              />
              <Route path="*" element={<Navigate to="/login" replace />} />
            </Routes>
          </AppLayout>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
