import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { createOrder } from '../services/api';
import '../styles/checkout.css';

export default function Checkout() {
  const { cartItems, subtotal, deliveryFee, grandTotal, clearCart } = useCart();
  const navigate = useNavigate();

  // Customer form state
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    notes: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serverError, setServerError] = useState(null);

  const formatCurrency = (amt) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);

  // If cart is empty, redirect to shop
  if (cartItems.length === 0) {
    return (
      <div className="container" style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div className="state-container">
          <h2>Your Cart is Empty</h2>
          <p style={{ color: 'var(--charcoal-muted)', margin: '12px 0 24px' }}>
            Please add some items to your cart before proceeding to checkout.
          </p>
          <Link to="/shop" className="btn btn-primary" id="checkout-empty-shop-btn">
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear field error on change
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Full Name is required.';
    }

    const cleanPhone = formData.phone.replace(/[\s-]/g, '');
    if (!cleanPhone) {
      newErrors.phone = 'Mobile Number is required.';
    } else if (cleanPhone.length < 10) {
      newErrors.phone = 'Please enter a valid 10-digit mobile number.';
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }

    if (!formData.address.trim()) {
      newErrors.address = 'Street address is required.';
    }

    if (!formData.city.trim()) {
      newErrors.city = 'City is required.';
    }

    if (!formData.state.trim()) {
      newErrors.state = 'State is required.';
    }

    const cleanPin = formData.pincode.trim();
    if (!cleanPin) {
      newErrors.pincode = 'PIN Code is required.';
    } else if (cleanPin.length < 6) {
      newErrors.pincode = 'PIN Code must be 6 digits.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setServerError(null);

    if (!validateForm()) {
      return;
    }

    try {
      setIsSubmitting(true);

      const orderPayload = {
        customer: {
          fullName: formData.fullName,
          phone: formData.phone,
          email: formData.email || null,
          address: formData.address,
          city: formData.city,
          state: formData.state,
          pincode: formData.pincode
        },
        items: cartItems.map(item => ({
          id: item.id,
          quantity: item.quantity
        })),
        notes: formData.notes
      };

      // Send to Express Backend
      const response = await createOrder(orderPayload);

      // Clear shopping cart on successful placement
      clearCart();

      // Navigate to Order Success page with returned verified order data
      navigate('/order-success', {
        state: { order: response.data },
        replace: true
      });
    } catch (err) {
      console.error('Error submitting order:', err);
      setServerError(err.message || 'Failed to submit order. Please check server status.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <div className="checkout-page-header">
        <span className="badge badge-sage">Fast & Secure</span>
        <h1>Complete Your Pet Care Order</h1>
        <p style={{ color: 'var(--charcoal-muted)' }}>
          Please provide your delivery details below to finalize your order.
        </p>
      </div>

      {/* Educational Demo Notice */}
      <div className="demo-badge-banner">
        <span>ℹ️</span>
        <div>
          <strong>Educational College Project Demo:</strong> This checkout runs in Cash on Delivery (COD) demo mode. No payment or credit card details are collected.
        </div>
      </div>

      {serverError && (
        <div style={{
          backgroundColor: 'var(--urgent-red-light)',
          color: 'var(--urgent-red)',
          padding: '14px 18px',
          borderRadius: 'var(--radius-sm)',
          marginBottom: '24px',
          fontWeight: 600
        }}>
          ⚠️ {serverError}
        </div>
      )}

      <div className="checkout-layout">
        {/* Left Column: Customer Details Form */}
        <div className="checkout-form-card">
          <form onSubmit={handleSubmitOrder} id="checkout-form" noValidate>
            <h2 className="form-section-title">
              <span>👤</span>
              <span>1. Customer & Contact Details</span>
            </h2>

            <div className="form-grid">
              {/* Full Name */}
              <div className="form-group span-2">
                <label className="form-label" htmlFor="fullName">
                  Full Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="fullName"
                  name="fullName"
                  className={`form-input ${errors.fullName ? 'error' : ''}`}
                  placeholder="e.g. Rahul Sharma"
                  value={formData.fullName}
                  onChange={handleChange}
                />
                {errors.fullName && <span className="field-error-msg">{errors.fullName}</span>}
              </div>

              {/* Mobile Phone */}
              <div className="form-group">
                <label className="form-label" htmlFor="phone">
                  Mobile Number <span className="required">*</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="e.g. 9876543210"
                  value={formData.phone}
                  onChange={handleChange}
                />
                {errors.phone && <span className="field-error-msg">{errors.phone}</span>}
              </div>

              {/* Email Address */}
              <div className="form-group">
                <label className="form-label" htmlFor="email">
                  Email Address <span style={{ color: 'var(--charcoal-subtle)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="e.g. rahul@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error-msg">{errors.email}</span>}
              </div>
            </div>

            <h2 className="form-section-title" style={{ marginTop: '32px' }}>
              <span>📍</span>
              <span>2. Delivery Address</span>
            </h2>

            <div className="form-grid">
              {/* Street Address */}
              <div className="form-group span-2">
                <label className="form-label" htmlFor="address">
                  Flat / House No. / Street Address <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className={`form-input ${errors.address ? 'error' : ''}`}
                  placeholder="e.g. Flat 302, Green Valley Apartments, Indiranagar"
                  value={formData.address}
                  onChange={handleChange}
                />
                {errors.address && <span className="field-error-msg">{errors.address}</span>}
              </div>

              {/* City */}
              <div className="form-group">
                <label className="form-label" htmlFor="city">
                  City <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="city"
                  name="city"
                  className={`form-input ${errors.city ? 'error' : ''}`}
                  placeholder="e.g. Bengaluru"
                  value={formData.city}
                  onChange={handleChange}
                />
                {errors.city && <span className="field-error-msg">{errors.city}</span>}
              </div>

              {/* State */}
              <div className="form-group">
                <label className="form-label" htmlFor="state">
                  State <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="state"
                  name="state"
                  className={`form-input ${errors.state ? 'error' : ''}`}
                  placeholder="e.g. Karnataka"
                  value={formData.state}
                  onChange={handleChange}
                />
                {errors.state && <span className="field-error-msg">{errors.state}</span>}
              </div>

              {/* PIN Code */}
              <div className="form-group">
                <label className="form-label" htmlFor="pincode">
                  PIN Code <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="pincode"
                  name="pincode"
                  maxLength={6}
                  className={`form-input ${errors.pincode ? 'error' : ''}`}
                  placeholder="e.g. 560038"
                  value={formData.pincode}
                  onChange={handleChange}
                />
                {errors.pincode && <span className="field-error-msg">{errors.pincode}</span>}
              </div>

              {/* Delivery Notes */}
              <div className="form-group">
                <label className="form-label" htmlFor="notes">
                  Delivery Notes <span style={{ color: 'var(--charcoal-subtle)', fontWeight: 400 }}>(Optional)</span>
                </label>
                <input
                  type="text"
                  id="notes"
                  name="notes"
                  className="form-input"
                  placeholder="e.g. Leave with security guard"
                  value={formData.notes}
                  onChange={handleChange}
                />
              </div>
            </div>

            <h2 className="form-section-title" style={{ marginTop: '32px' }}>
              <span>💳</span>
              <span>3. Payment Method</span>
            </h2>

            <div className="payment-selector-box">
              <input
                type="radio"
                id="cod-method"
                name="paymentMethod"
                checked
                readOnly
                className="payment-radio"
              />
              <label htmlFor="cod-method" className="payment-desc" style={{ cursor: 'pointer' }}>
                <strong>Cash on Delivery (Demo Mode)</strong>
                <span>Pay in cash or UPI when your pet package arrives at your doorstep.</span>
              </label>
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-full btn-lg"
              disabled={isSubmitting}
              id="place-order-btn"
            >
              {isSubmitting ? (
                <span>Validating & Placing Order...</span>
              ) : (
                <span>Place Order • {formatCurrency(grandTotal)}</span>
              )}
            </button>
          </form>
        </div>

        {/* Right Column: Order Summary Preview */}
        <div className="checkout-order-summary">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '16px', color: 'var(--charcoal-dark)' }}>
            Order Items ({cartItems.length})
          </h3>

          <div className="checkout-items-preview">
            {cartItems.map(item => (
              <div key={item.id} className="checkout-preview-item">
                <img src={item.image} alt={item.name} />
                <div className="checkout-preview-details">
                  <div className="checkout-preview-name">{item.name}</div>
                  <div className="checkout-preview-qty">Qty: {item.quantity} × {formatCurrency(item.price)}</div>
                </div>
                <div className="checkout-preview-price">
                  {formatCurrency(item.price * item.quantity)}
                </div>
              </div>
            ))}
          </div>

          <div className="summary-line">
            <span>Subtotal</span>
            <span>{formatCurrency(subtotal)}</span>
          </div>

          <div className="summary-line">
            <span>Shipping</span>
            <span>
              {deliveryFee === 0 ? (
                <strong style={{ color: 'var(--success-green)' }}>FREE</strong>
              ) : (
                formatCurrency(deliveryFee)
              )}
            </span>
          </div>

          <div className="summary-line total">
            <span>Total Payable</span>
            <span id="checkout-total-payable">{formatCurrency(grandTotal)}</span>
          </div>

          <div style={{ marginTop: '20px' }}>
            <Link to="/cart" className="btn btn-secondary btn-sm btn-full" id="checkout-back-cart-btn">
              ← Edit Cart Items
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
