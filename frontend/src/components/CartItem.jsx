import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function CartItem({ item }) {
  const { updateQuantity, removeFromCart } = useCart();

  if (!item) return null;

  const { id, name, category, price, image, quantity } = item;

  const formatCurrency = (amt) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0
    }).format(amt);

  return (
    <div
      className="cart-item-row"
      id={`cart-item-${id}`}
      style={{
        display: 'grid',
        gridTemplateColumns: '80px 1fr auto auto',
        gap: '20px',
        alignItems: 'center',
        padding: '16px 0',
        borderBottom: '1px solid var(--border-light)'
      }}
    >
      {/* Product Image */}
      <Link to={`/product/${id}`} style={{ width: '80px', height: '80px', borderRadius: 'var(--radius-sm)', overflow: 'hidden', backgroundColor: '#F9F8F6', flexShrink: 0 }}>
        <img
          src={image}
          alt={name}
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
        />
      </Link>

      {/* Details */}
      <div>
        <span className="badge badge-sage" style={{ fontSize: '0.7rem', marginBottom: '4px' }}>
          {category}
        </span>
        <h4 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--charcoal-dark)', margin: '4px 0' }}>
          <Link to={`/product/${id}`} style={{ color: 'inherit' }}>
            {name}
          </Link>
        </h4>
        <span style={{ fontSize: '0.88rem', color: 'var(--charcoal-muted)' }}>
          {formatCurrency(price)} each
        </span>
      </div>

      {/* Quantity Stepper */}
      <div style={{
        display: 'flex',
        alignItems: 'center',
        border: '1.5px solid var(--border-light)',
        borderRadius: 'var(--radius-full)',
        backgroundColor: 'var(--bg-cream-surface)',
        padding: '2px 6px'
      }}>
        <button
          type="button"
          onClick={() => updateQuantity(id, quantity - 1)}
          aria-label="Decrease Quantity"
          id={`cart-qty-dec-${id}`}
          style={{
            border: 'none',
            background: 'none',
            width: '28px',
            height: '28px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--charcoal-body)',
            fontWeight: 700
          }}
        >
          -
        </button>
        <span style={{
          minWidth: '28px',
          textAlign: 'center',
          fontWeight: 700,
          fontSize: '0.95rem',
          color: 'var(--charcoal-dark)'
        }} id={`cart-qty-val-${id}`}>
          {quantity}
        </span>
        <button
          type="button"
          onClick={() => updateQuantity(id, quantity + 1)}
          aria-label="Increase Quantity"
          id={`cart-qty-inc-${id}`}
          style={{
            border: 'none',
            background: 'none',
            width: '28px',
            height: '28px',
            fontSize: '1.1rem',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--charcoal-body)',
            fontWeight: 700
          }}
        >
          +
        </button>
      </div>

      {/* Price & Remove */}
      <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '8px' }}>
        <span style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 800,
          fontSize: '1.1rem',
          color: 'var(--charcoal-dark)'
        }}>
          {formatCurrency(price * quantity)}
        </span>
        <button
          type="button"
          onClick={() => removeFromCart(id)}
          aria-label="Remove Item"
          id={`cart-remove-${id}`}
          style={{
            background: 'none',
            border: 'none',
            color: 'var(--urgent-red)',
            fontSize: '0.82rem',
            cursor: 'pointer',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '4px',
            fontWeight: 600
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          Remove
        </button>
      </div>
    </div>
  );
}
