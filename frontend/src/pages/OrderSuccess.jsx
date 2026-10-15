import React from 'react';
import { useLocation, Link, Navigate } from 'react-router-dom';

export default function OrderSuccess() {
  const location = useLocation();
  const order = location.state?.order;

  // If directly navigated without an active order, redirect to home
  if (!order) {
    return <Navigate to="/" replace />;
  }

  const formatCurrency = (amt) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);

  const { orderId, customer, items, pricing, estimatedDelivery, createdAt } = order;

  return (
    <div className="container" style={{ padding: '60px 20px 80px', maxWidth: '800px' }}>
      <div style={{
        backgroundColor: 'var(--bg-cream-surface)',
        borderRadius: 'var(--radius-lg)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-md)',
        padding: '40px',
        textAlign: 'center'
      }}>
        {/* Success Icon */}
        <div style={{
          width: '80px',
          height: '80px',
          backgroundColor: 'var(--sage-light)',
          color: 'var(--sage-primary)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          fontSize: '2.5rem',
          margin: '0 auto 20px',
          border: '3px solid #D6E6DB'
        }}>
          ✓
        </div>

        <span className="badge badge-sage" style={{ marginBottom: '12px' }}>
          Educational Demo Order Created
        </span>

        <h1 style={{ fontSize: '2.4rem', color: 'var(--charcoal-dark)', marginBottom: '8px' }}>
          Thank You! Your Order is Confirmed
        </h1>

        <p style={{ color: 'var(--charcoal-muted)', fontSize: '1.05rem', marginBottom: '24px' }}>
          We have received your demo order. Our warehouse team is preparing your pet essentials with loving care!
        </p>

        {/* Order ID Banner */}
        <div style={{
          backgroundColor: '#FAF8F5',
          border: '1.5px dashed var(--sage-primary)',
          borderRadius: 'var(--radius-md)',
          padding: '16px 24px',
          display: 'inline-block',
          marginBottom: '32px'
        }}>
          <span style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', display: 'block' }}>
            YOUR UNIQUE ORDER NUMBER
          </span>
          <strong style={{ fontSize: '1.4rem', color: 'var(--sage-dark)', letterSpacing: '1px', fontFamily: 'var(--font-heading)' }} id="confirmed-order-id">
            {orderId}
          </strong>
        </div>

        {/* Order Breakdown Box */}
        <div style={{
          textAlign: 'left',
          borderTop: '1px solid var(--border-light)',
          paddingTop: '24px',
          marginBottom: '32px'
        }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '16px', color: 'var(--charcoal-dark)' }}>
            Order Summary & Delivery Details
          </h3>

          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '20px',
            backgroundColor: '#FAF8F5',
            padding: '20px',
            borderRadius: 'var(--radius-md)',
            marginBottom: '20px'
          }}>
            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', display: 'block', fontWeight: 600 }}>
                DELIVER TO:
              </span>
              <strong style={{ color: 'var(--charcoal-dark)' }}>{customer.fullName}</strong>
              <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-body)', marginTop: '4px' }}>
                {customer.address}, {customer.city}, {customer.state} - {customer.pincode}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginTop: '4px' }}>
                📞 {customer.phone}
              </p>
            </div>

            <div>
              <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)', display: 'block', fontWeight: 600 }}>
                PAYMENT & DELIVERY:
              </span>
              <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-body)', marginTop: '4px' }}>
                <strong>Method:</strong> Cash on Delivery (Demo Mode)
              </p>
              <p style={{ fontSize: '0.9rem', color: 'var(--charcoal-body)', marginTop: '4px' }}>
                <strong>Estimated Delivery:</strong> {estimatedDelivery}
              </p>
              <p style={{ fontSize: '0.85rem', color: 'var(--charcoal-muted)', marginTop: '4px' }}>
                Placed on: {new Date(createdAt).toLocaleDateString()}
              </p>
            </div>
          </div>

          {/* Items List */}
          <div style={{ border: '1px solid var(--border-light)', borderRadius: 'var(--radius-sm)', overflow: 'hidden' }}>
            {items.map((item, idx) => (
              <div
                key={idx}
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: '12px 16px',
                  borderBottom: idx === items.length - 1 ? 'none' : '1px solid var(--border-light)',
                  backgroundColor: idx % 2 === 0 ? '#FFFFFF' : '#FAF8F5'
                }}
              >
                <div>
                  <strong style={{ fontSize: '0.92rem', color: 'var(--charcoal-dark)' }}>{item.name}</strong>
                  <span style={{ display: 'block', fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
                    Qty: {item.quantity} × {formatCurrency(item.price)}
                  </span>
                </div>
                <strong style={{ fontFamily: 'var(--font-heading)', color: 'var(--charcoal-dark)' }}>
                  {formatCurrency(item.total)}
                </strong>
              </div>
            ))}
          </div>

          {/* Total Row */}
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '16px 20px',
            backgroundColor: 'var(--sage-light)',
            borderRadius: 'var(--radius-sm)',
            marginTop: '16px'
          }}>
            <strong style={{ fontSize: '1.1rem', color: 'var(--sage-dark)' }}>Grand Total (All Inclusive):</strong>
            <strong style={{ fontSize: '1.4rem', color: 'var(--sage-dark)', fontFamily: 'var(--font-heading)' }}>
              {formatCurrency(pricing.grandTotal)}
            </strong>
          </div>
        </div>

        {/* Action Buttons */}
        <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" className="btn btn-secondary btn-lg" id="success-home-btn">
            Back to Home
          </Link>
          <Link to="/shop" className="btn btn-primary btn-lg" id="success-shop-btn">
            Continue Shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
