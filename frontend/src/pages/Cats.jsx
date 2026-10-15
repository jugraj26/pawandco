import React, { useState, useEffect } from 'react';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';

export default function Cats() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSub, setSelectedSub] = useState('all');
  const [sortBy, setSortBy] = useState('default');

  useEffect(() => {
    let isMounted = true;
    async function loadCats() {
      try {
        setLoading(true);
        const data = await getProducts({ pet: 'cats' });
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load cat products.');
          setLoading(false);
        }
      }
    }
    loadCats();
    return () => { isMounted = false; };
  }, []);

  // Filter by subcategory
  let displayed = [...products];
  if (selectedSub !== 'all') {
    displayed = displayed.filter(p => p.subCategory.toLowerCase() === selectedSub.toLowerCase());
  }

  // Sort
  if (sortBy === 'price-asc') {
    displayed.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    displayed.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    displayed.sort((a, b) => b.rating - a.rating);
  }

  const subCategories = [
    { key: 'all', label: 'All Feline Essentials' },
    { key: 'food', label: 'Ocean Fish Food' },
    { key: 'litter', label: 'Clumping Litter' },
    { key: 'furniture', label: 'Cat Trees & Scratchers' },
    { key: 'grooming', label: 'Deshedding Brushes' },
    { key: 'beds', label: 'Calming Donut Beds' },
    { key: 'toys', label: 'Catnip & Wands' }
  ];

  return (
    <div className="container" style={{ paddingTop: '40px', paddingBottom: '60px' }}>
      {/* Category Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #EBF3ED 0%, #FAF8F5 100%)',
        borderRadius: 'var(--radius-lg)',
        padding: '40px',
        display: 'grid',
        gridTemplateColumns: '1.2fr 0.8fr',
        alignItems: 'center',
        gap: '30px',
        marginBottom: '40px',
        border: '1px solid var(--border-light)'
      }}>
        <div>
          <span className="badge badge-sage" style={{ marginBottom: '12px' }}>
            🐱 Feline Comfort & Nutrition
          </span>
          <h1 style={{ fontSize: '2.6rem', color: 'var(--charcoal-dark)', marginBottom: '14px' }}>
            Curated Essentials for Regal Cats
          </h1>
          <p style={{ color: 'var(--charcoal-muted)', fontSize: '1.05rem', lineHeight: '1.6' }}>
            Keep your cats purring with taurine-rich seafood kibble, odor-locking bentonite litter, sisal scratching pillars, and ultra-plush calming beds.
          </p>
        </div>
        <div style={{ borderRadius: 'var(--radius-md)', overflow: 'hidden', height: '240px', boxShadow: 'var(--shadow-md)' }}>
          <img
            src="/images/cats/cat-hero.jpg"
            alt="British Shorthair Cat sitting calmly"
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
      </div>

      {/* Toolbar */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '16px',
        marginBottom: '30px',
        padding: '16px 20px',
        backgroundColor: 'var(--bg-cream-surface)',
        borderRadius: 'var(--radius-md)',
        border: '1px solid var(--border-light)'
      }}>
        {/* Subcategory Pills */}
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {subCategories.map(sub => (
            <button
              key={sub.key}
              onClick={() => setSelectedSub(sub.key)}
              id={`cat-filter-${sub.key}`}
              style={{
                border: 'none',
                padding: '8px 16px',
                borderRadius: 'var(--radius-full)',
                fontSize: '0.88rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                backgroundColor: selectedSub === sub.key ? 'var(--sage-primary)' : 'var(--bg-cream-subtle)',
                color: selectedSub === sub.key ? '#FFFFFF' : 'var(--charcoal-body)'
              }}
            >
              {sub.label}
            </button>
          ))}
        </div>

        {/* Sort */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <label htmlFor="cat-sort" style={{ fontSize: '0.9rem', color: 'var(--charcoal-muted)', fontWeight: 600 }}>
            Sort by:
          </label>
          <select
            id="cat-sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            style={{
              padding: '8px 14px',
              borderRadius: 'var(--radius-sm)',
              border: '1.5px solid var(--border-light)',
              backgroundColor: '#FFFFFF',
              fontSize: '0.9rem',
              color: 'var(--charcoal-dark)',
              cursor: 'pointer'
            }}
          >
            <option value="default">Recommended</option>
            <option value="price-asc">Price: Low to High (₹)</option>
            <option value="price-desc">Price: High to Low (₹)</option>
            <option value="rating">Highest Rated</option>
          </select>
        </div>
      </div>

      {/* Product Grid */}
      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Fetching feline essentials...</p>
        </div>
      ) : error ? (
        <div className="state-container">
          <p style={{ color: 'var(--urgent-red)' }}>{error}</p>
        </div>
      ) : displayed.length === 0 ? (
        <div className="state-container">
          <h3>No products found in this category</h3>
          <p>Try switching the subcategory filter.</p>
        </div>
      ) : (
        <div className="products-grid" id="cats-products-grid">
          {displayed.map(prod => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
}
