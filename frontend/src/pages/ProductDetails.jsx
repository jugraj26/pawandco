import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { getProductById, getProducts } from '../services/api';
import { useCart } from '../context/CartContext';
import ProductCard from '../components/ProductCard';
import '../styles/details.css';

export default function ProductDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadData() {
      try {
        setLoading(true);
        setError(null);
        setQuantity(1); // Reset quantity on product switch
        window.scrollTo({ top: 0, behavior: 'smooth' });

        const prod = await getProductById(id);
        if (isMounted) {
          setProduct(prod);

          // Also fetch related products in the same category
          const categoryProducts = await getProducts({ category: prod.category });
          if (isMounted) {
            const others = categoryProducts.filter(p => p.id !== prod.id).slice(0, 3);
            setRelatedProducts(others);
            setLoading(false);
          }
        }
      } catch (err) {
        console.error('Error fetching product details:', err);
        if (isMounted) {
          setError('Product not found or unavailable.');
          setLoading(false);
        }
      }
    }

    loadData();
    return () => { isMounted = false; };
  }, [id]);

  if (loading) {
    return (
      <div className="container" style={{ padding: '80px 20px' }}>
        <div className="state-container">
          <div className="spinner"></div>
          <p>Loading product information...</p>
        </div>
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="container" style={{ padding: '80px 20px' }}>
        <div className="state-container">
          <h2>Oops! Product Not Found</h2>
          <p style={{ color: 'var(--charcoal-muted)', margin: '16px 0 24px' }}>
            The item you are looking for does not exist or may have been removed.
          </p>
          <Link to="/shop" className="btn btn-primary" id="not-found-back-to-shop">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const {
    name,
    category,
    subCategory,
    price,
    rating = 4.8,
    reviewsCount = 42,
    description,
    features = [],
    image,
    inStock = true,
    stockCount = 20
  } = product;

  const formattedPrice = new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(price);

  const handleAddToCart = () => {
    addToCart(product, quantity);
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Breadcrumb Navigation */}
      <nav className="details-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        <span>/</span>
        <Link to="/shop">Shop</Link>
        <span>/</span>
        <Link to={`/${category}`} style={{ textTransform: 'capitalize' }}>{category}</Link>
        <span>/</span>
        <span style={{ color: 'var(--charcoal-dark)', fontWeight: 600 }}>{name}</span>
      </nav>

      {/* Main Details Card */}
      <div className="details-layout">
        {/* Left Column: Product Image */}
        <div className="details-image-container">
          <img
            src={image}
            alt={name}
            id="product-detail-image"
          />
        </div>

        {/* Right Column: Information & Actions */}
        <div className="details-info">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' }}>
              <span className="badge badge-sage" style={{ textTransform: 'capitalize' }}>
                {category} • {subCategory}
              </span>
              <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '0.9rem' }}>
                <span className="rating-stars">★ {rating}</span>
                <span className="rating-count">({reviewsCount} reviews)</span>
              </div>
            </div>

            <h1 id="product-detail-name">{name}</h1>

            <div className="details-price-badge">
              <span className="details-price" id="product-detail-price">{formattedPrice}</span>
              <span className="details-stock-status">
                ✓ {inStock ? `In Stock (${stockCount} units available)` : 'Out of Stock'}
              </span>
            </div>

            <p className="details-description">{description}</p>

            {/* Key Features Bullet Points */}
            {features && features.length > 0 && (
              <ul className="details-features-list">
                {features.map((feat, idx) => (
                  <li key={idx}>
                    <span className="details-feature-check">✓</span>
                    <span>{feat}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* Quantity Picker & Add to Cart */}
          <div>
            <div className="details-actions-row">
              <div className="quantity-picker">
                <button
                  type="button"
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  id="detail-qty-dec"
                >
                  -
                </button>
                <span id="detail-qty-val">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(q => q + 1)}
                  aria-label="Increase quantity"
                  id="detail-qty-inc"
                >
                  +
                </button>
              </div>

              <button
                type="button"
                className="btn btn-primary btn-lg"
                onClick={handleAddToCart}
                id="detail-add-to-cart-btn"
                style={{ flex: 1, minWidth: '200px' }}
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="9" cy="21" r="1"></circle>
                  <circle cx="20" cy="21" r="1"></circle>
                  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                </svg>
                <span>Add to Cart ({formattedPrice})</span>
              </button>
            </div>

            {/* Back to Shop Link */}
            <div style={{ marginTop: '20px' }}>
              <button
                type="button"
                onClick={() => navigate('/shop')}
                className="btn btn-secondary btn-sm"
                id="detail-back-shop-btn"
              >
                ← Back to Shop
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Related Products Recommendation */}
      {relatedProducts.length > 0 && (
        <div style={{ marginTop: '50px' }}>
          <div className="section-header" style={{ textAlign: 'left', marginBottom: '24px' }}>
            <span className="sub-badge">You May Also Like</span>
            <h2 style={{ fontSize: '1.8rem' }}>More for {category}</h2>
          </div>
          <div className="products-grid">
            {relatedProducts.map(rel => (
              <ProductCard key={rel.id} product={rel} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
