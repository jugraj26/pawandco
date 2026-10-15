import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import '../styles/navbar.css';

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItemsCount } = useCart();
  const location = useLocation();

  // Close mobile navigation menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location]);

  return (
    <header className="site-header">
      <div className="container">
        <div className="navbar-inner">
          {/* PAW & CO Brand Logo */}
          <Link to="/" className="brand-logo" id="nav-brand-logo">
            <span className="brand-paw">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                <ellipse cx="12" cy="14" rx="4.5" ry="3.5" />
                <ellipse cx="7" cy="8" rx="2" ry="2.8" />
                <ellipse cx="17" cy="8" rx="2" ry="2.8" />
                <ellipse cx="11.2" cy="5.8" rx="1.8" ry="2.5" />
                <ellipse cx="14.8" cy="5.8" rx="1.8" ry="2.5" />
              </svg>
            </span>
            <span>PAW <span className="brand-accent">&</span> CO</span>
          </Link>

          {/* Desktop & Mobile Navigation Links */}
          <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`} id="nav-menu-links">
            <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-link-home">
              Home
            </NavLink>
            <NavLink to="/shop" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-link-shop">
              Shop
            </NavLink>
            <NavLink to="/dogs" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-link-dogs">
              Dogs
            </NavLink>
            <NavLink to="/cats" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-link-cats">
              Cats
            </NavLink>
            <NavLink to="/hamsters" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-link-hamsters">
              Hamsters
            </NavLink>
            <NavLink to="/emergency" className={({ isActive }) => `nav-link emergency-link ${isActive ? 'active' : ''}`} id="nav-link-emergency">
              <span className="pulse-dot"></span>
              Emergency Help
            </NavLink>
            <NavLink to="/contact" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`} id="nav-link-contact">
              Contact
            </NavLink>
          </nav>

          {/* Nav Actions: Cart Button & Mobile Menu Toggle */}
          <div className="nav-actions">
            <Link to="/cart" className="cart-button" aria-label="Shopping Cart" id="nav-cart-btn">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {totalItemsCount > 0 && (
                <span className="cart-badge" id="nav-cart-count">{totalItemsCount}</span>
              )}
            </Link>

            <button
              className="mobile-toggle"
              onClick={() => setMobileMenuOpen(prev => !prev)}
              aria-label="Toggle Navigation Menu"
              id="nav-mobile-toggle"
            >
              {mobileMenuOpen ? (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18"></line>
                  <line x1="6" y1="6" x2="18" y2="18"></line>
                </svg>
              ) : (
                <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="3" y1="12" x2="21" y2="12"></line>
                  <line x1="3" y1="6" x2="21" y2="6"></line>
                  <line x1="3" y1="18" x2="21" y2="18"></line>
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
