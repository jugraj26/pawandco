import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/home.css';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true;
    async function loadFeatured() {
      try {
        setLoading(true);
        const data = await getProducts({ featured: 'true' });
        if (isMounted) {
          // Take first 6 featured items
          setFeaturedProducts(data.slice(0, 6));
          setLoading(false);
        }
      } catch (err) {
        console.error('Error loading featured products:', err);
        if (isMounted) {
          setError('Failed to load featured products.');
          setLoading(false);
        }
      }
    }

    loadFeatured();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="home-page">
      {/* 1. HERO SECTION */}
      <section className="hero-section">
        <div className="container">
          <div className="hero-grid">
            <div className="hero-content">
              <span className="hero-pill">
                🐾 Welcome to PAW & CO Pet Care
              </span>
              <h1 className="hero-title">
                Everything Your Pet Needs, <span className="text-highlight">All in One Place.</span>
              </h1>
              <p className="hero-subtitle">
                Discover quality essentials, trusted pet care, and everything your furry friends deserve. From veterinarian-formulated diets to 24/7 emergency support.
              </p>
              <div className="hero-cta-group">
                <Link to="/shop" className="btn btn-primary btn-lg" id="hero-shop-now-btn">
                  <span>Shop Now</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </Link>
                <a href="#shop-by-pet" className="btn btn-secondary btn-lg" id="hero-explore-pets-btn">
                  <span>Explore Pets</span>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="6 9 12 15 18 9"></polyline>
                  </svg>
                </a>
              </div>
            </div>

            <div className="hero-image-wrapper">
              <div className="hero-image-card">
                <img
                  src="/images/hero-pets.jpg"
                  alt="Happy Golden Retriever and kitten resting together peacefully"
                  id="hero-banner-image"
                />
              </div>
              <div className="hero-floating-badge">
                <div className="hero-badge-icon">❤️</div>
                <div>
                  <strong style={{ display: 'block', fontSize: '0.95rem', color: 'var(--charcoal-dark)' }}>
                    100% Pet Approved
                  </strong>
                  <span style={{ fontSize: '0.8rem', color: 'var(--charcoal-muted)' }}>
                    Healthy, Tailored Nutrition & Care
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SHOP BY PET CATEGORIES */}
      <section className="category-section" id="shop-by-pet">
        <div className="container">
          <div className="section-header">
            <span className="sub-badge">Tailored For Every Companion</span>
            <h2>Shop by Pet Category</h2>
            <p>Select your beloved pet companion to find specifically formulated food, accessories, beds, and entertainment.</p>
          </div>

          <div className="category-grid">
            {/* Dogs Card */}
            <Link to="/dogs" className="pet-category-card" id="cat-card-dogs">
              <div className="pet-card-image">
                <img src="/images/dogs/dog-hero.jpg" alt="Joyful Golden Retriever" />
              </div>
              <div className="pet-card-body">
                <div>
                  <h3>
                    <span>Dogs</span>
                    <span style={{ fontSize: '1.2rem' }}>🐕</span>
                  </h3>
                  <p>Nutritious kibble, conditioning shampoos, durable rubber toys, padded collars, and orthopedic memory foam beds.</p>
                </div>
                <div className="pet-card-link">
                  <span>Explore Dog Essentials</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Cats Card */}
            <Link to="/cats" className="pet-category-card" id="cat-card-cats">
              <div className="pet-card-image">
                <img src="/images/cats/cat-hero.jpg" alt="British Shorthair Cat" />
              </div>
              <div className="pet-card-body">
                <div>
                  <h3>
                    <span>Cats</span>
                    <span style={{ fontSize: '1.2rem' }}>🐈</span>
                  </h3>
                  <p>Ocean fish formula, odor-locking bentonite litter, sisal multi-level scratchers, self-cleaning brushes, and donut beds.</p>
                </div>
                <div className="pet-card-link">
                  <span>Explore Cat Essentials</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>

            {/* Hamsters Card */}
            <Link to="/hamsters" className="pet-category-card" id="cat-card-hamsters">
              <div className="pet-card-image">
                <img src="/images/hamsters/hamster-hero.jpg" alt="Syrian Hamster holding seed" />
              </div>
              <div className="pet-card-body">
                <div>
                  <h3>
                    <span>Hamsters</span>
                    <span style={{ fontSize: '1.2rem' }}>🐹</span>
                  </h3>
                  <p>Nutritious muesli seed blend, 2-tier habitat cages, silent spinner running wheels, absorbent paper bedding, and glass bottles.</p>
                </div>
                <div className="pet-card-link">
                  <span>Explore Hamster Essentials</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 3. FEATURED PRODUCTS */}
      <section className="featured-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-badge">Handpicked For You</span>
            <h2>Featured Pet Essentials</h2>
            <p>Our top-rated nutritional diets, cozy bedding, and activity gear trusted by thousands of happy pet parents.</p>
          </div>

          {loading ? (
            <div className="state-container">
              <div className="spinner"></div>
              <p>Loading handpicked essentials...</p>
            </div>
          ) : error ? (
            <div className="state-container">
              <p style={{ color: 'var(--urgent-red)' }}>{error}</p>
            </div>
          ) : (
            <div className="products-grid" id="home-featured-grid">
              {featuredProducts.map((prod) => (
                <ProductCard key={prod.id} product={prod} />
              ))}
            </div>
          )}

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <Link to="/shop" className="btn btn-outline btn-lg" id="home-view-all-btn">
              View All Products in Shop
            </Link>
          </div>
        </div>
      </section>

      {/* 4. WHY CHOOSE PAW & CO */}
      <section className="features-section">
        <div className="container">
          <div className="section-header">
            <span className="sub-badge">Our Commitment</span>
            <h2>Why Choose Paw & Co?</h2>
            <p>We are dedicated to making every tail wag, every purr sweeter, and pet care completely stress-free.</p>
          </div>

          <div className="features-grid">
            {/* Box 1 */}
            <div className="feature-box">
              <div className="feature-icon-circle">✨</div>
              <h4>Quality Pet Essentials</h4>
              <p>Every product is vetted for pet safety, nutritional superiority, and durability before being listed.</p>
            </div>

            {/* Box 2 */}
            <div className="feature-box">
              <div className="feature-icon-circle">🏷️</div>
              <h4>Affordable Prices</h4>
              <p>Transparent pricing in Indian Rupees (₹) with free delivery on orders over ₹999.</p>
            </div>

            {/* Box 3 */}
            <div className="feature-box">
              <div className="feature-icon-circle">🛒</div>
              <h4>Easy Shopping Experience</h4>
              <p>Seamless browsing, real-time quantity controls, and simple Cash on Delivery checkout.</p>
            </div>

            {/* Box 4 */}
            <div className="feature-box">
              <div className="feature-icon-circle">🚑</div>
              <h4>Helpful Pet Care Resources</h4>
              <p>Instant access to 24/7 verified veterinary clinics, emergency ICU units, and pet ambulance services.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
