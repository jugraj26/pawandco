import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../services/api';
import ProductCard from '../components/ProductCard';
import '../styles/shop.css';

export default function Shop() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [searchParams, setSearchParams] = useSearchParams();
  const initialCategory = searchParams.get('pet') || searchParams.get('category') || 'all';

  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('default');

  // Load products from backend API
  useEffect(() => {
    let isMounted = true;
    async function loadCatalog() {
      try {
        setLoading(true);
        const data = await getProducts();
        if (isMounted) {
          setProducts(data);
          setLoading(false);
        }
      } catch (err) {
        if (isMounted) {
          setError('Failed to load products from server. Please ensure the backend is running.');
          setLoading(false);
        }
      }
    }
    loadCatalog();
    return () => { isMounted = false; };
  }, []);

  // Update selected category when query parameter changes
  useEffect(() => {
    const petFromQuery = searchParams.get('pet') || searchParams.get('category');
    if (petFromQuery) {
      setSelectedCategory(petFromQuery);
    }
  }, [searchParams]);

  // Handle category switch and sync with URL query
  const handleCategoryChange = (cat) => {
    setSelectedCategory(cat);
    if (cat === 'all') {
      setSearchParams({});
    } else {
      setSearchParams({ pet: cat });
    }
  };

  // 1. Filter by category
  let filtered = [...products];
  if (selectedCategory !== 'all') {
    filtered = filtered.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
  }

  // 2. Filter by search query
  if (searchTerm.trim() !== '') {
    const q = searchTerm.toLowerCase().trim();
    filtered = filtered.filter(p =>
      p.name.toLowerCase().includes(q) ||
      p.description.toLowerCase().includes(q) ||
      p.subCategory.toLowerCase().includes(q)
    );
  }

  // 3. Sort products
  if (sortBy === 'price-asc') {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sortBy === 'price-desc') {
    filtered.sort((a, b) => b.price - a.price);
  } else if (sortBy === 'rating') {
    filtered.sort((a, b) => b.rating - a.rating);
  }

  const resetFilters = () => {
    setSelectedCategory('all');
    setSearchTerm('');
    setSortBy('default');
    setSearchParams({});
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Shop Header */}
      <div className="shop-page-header">
        <span className="badge badge-sage" style={{ marginBottom: '8px' }}>
          🐾 Complete Catalog
        </span>
        <h1>Explore Pet Supplies & Essentials</h1>
        <p>
          High-grade nutrition, comfortable sleeping beds, durable toys, and hygiene care for dogs, cats, and hamsters.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="shop-controls">
        <div className="controls-row-top">
          {/* Search Input */}
          <div className="search-box-wrapper">
            <span className="search-icon">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </span>
            <input
              type="text"
              className="search-input"
              placeholder="Search by product name, category, or keyword..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              id="shop-search-input"
            />
          </div>

          {/* Sort Dropdown */}
          <div className="sort-box">
            <label htmlFor="shop-sort" style={{ fontSize: '0.9rem', color: 'var(--charcoal-muted)', fontWeight: 600 }}>
              Sort:
            </label>
            <select
              id="shop-sort"
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="default">Featured / Default</option>
              <option value="price-asc">Price: Low to High (₹)</option>
              <option value="price-desc">Price: High to Low (₹)</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Tabs */}
        <div className="category-filter-tabs">
          <button
            type="button"
            className={`category-tab-btn ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('all')}
            id="tab-all-products"
          >
            <span>All Products</span>
            <span className="category-tab-count">({products.length})</span>
          </button>
          <button
            type="button"
            className={`category-tab-btn ${selectedCategory === 'dogs' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('dogs')}
            id="tab-dogs"
          >
            <span>🐶 Dogs</span>
            <span className="category-tab-count">
              ({products.filter(p => p.category === 'dogs').length})
            </span>
          </button>
          <button
            type="button"
            className={`category-tab-btn ${selectedCategory === 'cats' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('cats')}
            id="tab-cats"
          >
            <span>🐱 Cats</span>
            <span className="category-tab-count">
              ({products.filter(p => p.category === 'cats').length})
            </span>
          </button>
          <button
            type="button"
            className={`category-tab-btn ${selectedCategory === 'hamsters' ? 'active' : ''}`}
            onClick={() => handleCategoryChange('hamsters')}
            id="tab-hamsters"
          >
            <span>🐹 Hamsters</span>
            <span className="category-tab-count">
              ({products.filter(p => p.category === 'hamsters').length})
            </span>
          </button>
        </div>
      </div>

      {/* Results Summary */}
      <div className="results-summary-bar">
        <span>
          Showing <strong>{filtered.length}</strong> {filtered.length === 1 ? 'product' : 'products'}
          {selectedCategory !== 'all' && ` for ${selectedCategory}`}
          {searchTerm && ` matching "${searchTerm}"`}
        </span>
        {(selectedCategory !== 'all' || searchTerm || sortBy !== 'default') && (
          <button
            onClick={resetFilters}
            className="btn btn-secondary btn-sm"
            id="clear-filters-btn"
          >
            Reset Filters
          </button>
        )}
      </div>

      {/* Products Grid State */}
      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Connecting to Paw & Co backend catalog...</p>
        </div>
      ) : error ? (
        <div className="state-container">
          <p style={{ color: 'var(--urgent-red)', marginBottom: '16px' }}>{error}</p>
          <button onClick={() => window.location.reload()} className="btn btn-secondary btn-sm">
            Retry Connection
          </button>
        </div>
      ) : filtered.length === 0 ? (
        <div className="state-container">
          <div style={{ fontSize: '3rem', marginBottom: '12px' }}>🔍</div>
          <h3>No matching pet products found</h3>
          <p style={{ color: 'var(--charcoal-muted)', marginBottom: '20px' }}>
            We couldn't find any products matching your search criteria.
          </p>
          <button onClick={resetFilters} className="btn btn-primary btn-sm">
            Clear Filters
          </button>
        </div>
      ) : (
        <div className="products-grid" id="shop-catalog-grid">
          {filtered.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </div>
  );
}
