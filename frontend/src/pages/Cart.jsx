import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import CartItem from '../components/CartItem';
import '../styles/cart.css';

export default function Cart() {
  const {
    cartItems,
    totalItemsCount,
    subtotal,
    deliveryFee,
    grandTotal,
    clearCart
  } = useCart();

  const navigate = useNavigate();

  const formatCurrency = (amt) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);

  // If cart is empty
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ paddingBottom: '80px' }}>
        <div className="empty-cart-view" id="empty-cart-container">
          <div className="empty-cart-icon">🛒</div>
          <h2>Your Cart is Currently Empty</h2>
          <p>
            Looks like you haven't added any pet treats, toys, or essentials yet. Browse our handpicked selections and pamper your furry friend!
          </p>
          <div style={{ display: 'flex', gap: '14px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link to="/shop" className="btn btn-primary btn-lg" id="empty-cart-shop-btn">
              Explore All Products
            </Link>
            <Link to="/dogs" className="btn btn-secondary btn-lg">
              🐶 Dogs
            </Link>
            <Link to="/cats" className="btn btn-secondary btn-lg">
              🐱 Cats
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const freeDeliveryDiff = 999 - subtotal;

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <div className="cart-page-header">
        <span className="badge badge-sage">Shopping Basket</span>
        <h1>Review Your Order</h1>
        <p style={{ color: 'var(--charcoal-muted)' }}>
          You have <strong>{totalItemsCount}</strong> {totalItemsCount === 1 ? 'item' : 'items'} in your cart.
        </p>
      </div>

      <div className="cart-grid-layout">
        {/* Left Column: List of Cart Items */}
        <div className="cart-items-card">
          <div className="cart-items-header">
            <h3>Items in Cart ({totalItemsCount})</h3>
            <button
              type="button"
              onClick={clearCart}
              className="btn btn-secondary btn-sm"
              id="cart-clear-all-btn"
              style={{ fontSize: '0.82rem' }}
            >
              Clear Cart
            </button>
          </div>

          <div id="cart-items-list">
            {cartItems.map(item => (
              <CartItem key={item.id} item={item} />
            ))}
          </div>

          <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Link to="/shop" className="btn btn-secondary btn-sm" id="cart-continue-shopping-btn">
              ← Continue Shopping
            </Link>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="cart-summary-card">
          <h3>Order Summary</h3>

          {/* Free delivery callout */}
          {freeDeliveryDiff > 0 ? (
            <div className="delivery-callout">
              <span>🚚 Add <strong>{formatCurrency(freeDeliveryDiff)}</strong> more for <strong>FREE Delivery</strong>!</span>
            </div>
          ) : (
            <div className="delivery-callout" style={{ backgroundColor: 'var(--success-light)', color: 'var(--success-green)' }}>
              <span>🎉 Congratulations! You have unlocked <strong>FREE Delivery</strong>!</span>
            </div>
          )}

          <div className="summary-line">
            <span>Items Subtotal</span>
            <span style={{ fontWeight: 600 }}>{formatCurrency(subtotal)}</span>
          </div>

          <div className="summary-line">
            <span>Estimated Delivery</span>
            <span>
              {deliveryFee === 0 ? (
                <strong style={{ color: 'var(--success-green)' }}>FREE</strong>
              ) : (
                formatCurrency(deliveryFee)
              )}
            </span>
          </div>

          <div className="summary-line">
            <span>Payment Method</span>
            <span className="badge badge-sage">Cash on Delivery</span>
          </div>

          <div className="summary-line total">
            <span>Grand Total</span>
            <span id="cart-grand-total">{formatCurrency(grandTotal)}</span>
          </div>

          <div className="cart-cta-box">
            <button
              type="button"
              className="btn btn-primary btn-full btn-lg"
              onClick={() => navigate('/checkout')}
              id="proceed-to-checkout-btn"
            >
              <span>Proceed to Checkout</span>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12"></line>
                <polyline points="12 5 19 12 12 19"></polyline>
              </svg>
            </button>
          </div>

          <p style={{
            fontSize: '0.8rem',
            color: 'var(--charcoal-subtle)',
            textAlign: 'center',
            marginTop: '16px'
          }}>
            🔒 Safe & Secure Demo Checkout • No Credit Card Required
          </p>
        </div>
      </div>
    </div>
  );
}
