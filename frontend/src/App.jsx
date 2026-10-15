import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Pages
import Home from './pages/Home';
import Shop from './pages/Shop';
import Dogs from './pages/Dogs';
import Cats from './pages/Cats';
import Hamsters from './pages/Hamsters';
import ProductDetails from './pages/ProductDetails';
import Cart from './pages/Cart';
import Checkout from './pages/Checkout';
import OrderSuccess from './pages/OrderSuccess';
import Emergency from './pages/Emergency';
import Contact from './pages/Contact';

// 404 Fallback Page
function NotFound() {
  return (
    <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
      <div className="state-container">
        <div style={{ fontSize: '4rem', marginBottom: '16px' }}>🐾</div>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '12px' }}>404 - Page Not Found</h1>
        <p style={{ color: 'var(--charcoal-muted)', marginBottom: '24px' }}>
          The page you requested might have wandered off or does not exist.
        </p>
        <Link to="/" className="btn btn-primary btn-lg">
          Return to PAW & CO Homepage
        </Link>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <div className="app-layout">
      {/* Sticky Header Navigation */}
      <Navbar />

      {/* Main Page Routing Content */}
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/dogs" element={<Dogs />} />
          <Route path="/cats" element={<Cats />} />
          <Route path="/hamsters" element={<Hamsters />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/order-success" element={<OrderSuccess />} />
          <Route path="/emergency" element={<Emergency />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {/* Modern Responsive Footer */}
      <Footer />
    </div>
  );
}
