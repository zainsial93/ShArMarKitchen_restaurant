import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { CartProvider, useCart } from './context/CartContext';
import { AuthProvider, useAuth } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import LandingPage from './pages/LandingPage';
import Home from './pages/Home';
import OrderSummary from './pages/OrderSummary';
import Contact from './pages/Contact';
import AdminLogin from './pages/AdminLogin';
import AdminDashboard from './pages/AdminDashboard';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyOrders from './pages/MyOrders';
import WelcomeModal from './components/WelcomeModal';
import ReviewModal from './components/ReviewModal';
import CheckoutModal from './components/CheckoutModal';
import ToastContainer from './components/ToastContainer';
import BottomCartBar from './components/BottomCartBar';
import UserBadge from './components/UserBadge';

// Wrapper to access context for Modals
const AppContent = () => {
  const { isCheckoutOpen, closeCheckout } = useCart();
  const { user } = useAuth();

  return (
    <>
      <Navbar />
      <div style={{ flex: 1 }}>
        <Routes>
          <Route path="/" element={user ? <Home /> : <LandingPage />} />
          <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
          <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />
          <Route path="/order-summary" element={<OrderSummary />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/my-orders" element={user ? <MyOrders /> : <Navigate to="/login" />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </div>
      <Footer />

      {/* Global Overlays & Floaters */}
      {user && <BottomCartBar />} {/* Only show cart if logged in (optional, but consistent with flow) */}

      <CheckoutModal isOpen={isCheckoutOpen} onClose={closeCheckout} />
      <WelcomeModal />
      <ReviewModal />
      <UserBadge />
      <ToastContainer />
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
            <AppContent />
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
