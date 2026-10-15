import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function ProductCard({ product }) {
  const { addToCart } = useCart();

  if (!product) return null;

  const {
    id,
    name,
    category,
    subCategory,
    price,
    rating = 4.8,
    reviewsCount = 50,
    image
  } = product;

  // Format currency in Indian Rupees
  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product, 1);
  };

  return (
    <div
      className="product-card"
      id={`product-card-${id}`}
      style={{
        backgroundColor: 'var(--bg-cream-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)',
        boxShadow: 'var(--shadow-sm)',
        display: 'flex',
        flexDirection: 'column',
        overflow: 'hidden',
        transition: 'transform var(--transition-fast), box-shadow var(--transition-fast)',
        position: 'relative'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = 'var(--shadow-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = 'translateY(0)';
        e.currentTarget.style.boxShadow = 'var(--shadow-sm)';
      }}
    >
      {/* Category Badge Tag */}
      <span
        className="badge badge-sage"
        style={{
          position: 'absolute',
          top: '12px',
          left: '12px',
          zIndex: 2,
          textTransform: 'capitalize'
        }}
      >
        {category} • {subCategory}
      </span>

      {/* Product Image Link */}
      <Link
        to={`/product/${id}`}
        style={{
          display: 'block',
          position: 'relative',
          paddingTop: '80%', // 4:3 or 1:1 aspect container
          backgroundColor: '#F9F8F6',
          overflow: 'hidden'
        }}
      >
        <img
          src={image}
          alt={name}
          loading="lazy"
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            transition: 'transform 0.4s ease'
          }}
          onMouseEnter={(e) => (e.target.style.transform = 'scale(1.05)')}
          onMouseLeave={(e) => (e.target.style.transform = 'scale(1.0)')}
        />
      </Link>

      {/* Product Information */}
      <div style={{
        padding: '18px',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
        justifyContent: 'space-between'
      }}>
        <div>
          {/* Rating Stars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '8px' }}>
            <span className="rating-stars">★ {rating}</span>
            <span className="rating-count">({reviewsCount})</span>
          </div>

          {/* Product Name */}
          <h3 style={{
            fontSize: '1.05rem',
            fontWeight: 700,
            color: 'var(--charcoal-dark)',
            marginBottom: '12px',
            lineHeight: '1.35',
            minHeight: '2.7em',
            display: '-webkit-box',
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            overflow: 'hidden'
          }}>
            <Link to={`/product/${id}`} style={{ color: 'inherit' }}>
              {name}
            </Link>
          </h3>
        </div>

        {/* Price & Add to Cart Action */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: '12px',
          paddingTop: '12px',
          borderTop: '1px solid var(--border-light)'
        }}>
          <div>
            <span style={{
              display: 'block',
              fontSize: '0.75rem',
              color: 'var(--charcoal-muted)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>Price</span>
            <span style={{
              fontSize: '1.25rem',
              fontWeight: 800,
              color: 'var(--charcoal-dark)',
              fontFamily: 'var(--font-heading)'
            }}>
              {formattedPrice}
            </span>
          </div>

          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={handleAddToCart}
            id={`add-to-cart-${id}`}
            title="Add to Shopping Cart"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Add</span>
          </button>
        </div>
      </div>
    </div>
  );
}
