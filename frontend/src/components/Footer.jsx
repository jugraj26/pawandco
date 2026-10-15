import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer style={{
      backgroundColor: 'var(--charcoal-dark)',
      color: '#E5E7EB',
      paddingTop: '60px',
      paddingBottom: '30px',
      marginTop: '60px',
      borderTop: '3px solid var(--sage-primary)'
    }}>
      <div className="container">
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: '40px',
          marginBottom: '50px'
        }}>
          {/* Col 1: About PAW & CO */}
          <div>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              fontFamily: 'var(--font-heading)',
              fontSize: '1.4rem',
              fontWeight: 800,
              color: '#FFFFFF',
              marginBottom: '16px'
            }}>
              <span style={{
                width: '32px',
                height: '32px',
                backgroundColor: 'var(--sage-primary)',
                color: '#FFFFFF',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius: '50%'
              }}>🐾</span>
              <span>PAW & CO</span>
            </div>
            <p style={{ color: '#9CA3AF', fontSize: '0.92rem', lineHeight: '1.6', marginBottom: '16px' }}>
              Your friendly neighbourhood pet care platform. Providing premium nutrition, cozy bedding, interactive toys, and 24/7 verified emergency medical assistance for dogs, cats, and hamsters.
            </p>
            <span className="badge badge-sage" style={{ fontSize: '0.72rem' }}>
              🎓 Educational College Project
            </span>
          </div>

          {/* Col 2: Quick Links */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 700 }}>
              Quick Navigation
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <li>
                <Link to="/" style={{ color: '#D1D5DB', transition: 'color 0.2s' }}>Home</Link>
              </li>
              <li>
                <Link to="/shop" style={{ color: '#D1D5DB', transition: 'color 0.2s' }}>Shop All Products</Link>
              </li>
              <li>
                <Link to="/cart" style={{ color: '#D1D5DB', transition: 'color 0.2s' }}>My Shopping Cart</Link>
              </li>
              <li>
                <Link to="/contact" style={{ color: '#D1D5DB', transition: 'color 0.2s' }}>Contact & Support</Link>
              </li>
              <li>
                <Link to="/emergency" style={{ color: '#FCA5A5', fontWeight: 600 }}>Emergency Veterinary Help</Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Pet Categories */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 700 }}>
              Shop By Pet
            </h4>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem' }}>
              <li>
                <Link to="/dogs" style={{ color: '#D1D5DB' }}>🐶 Dogs — Food, Toys & Beds</Link>
              </li>
              <li>
                <Link to="/cats" style={{ color: '#D1D5DB' }}>🐱 Cats — Litter, Scratchers & Treats</Link>
              </li>
              <li>
                <Link to="/hamsters" style={{ color: '#D1D5DB' }}>🐹 Hamsters — Cages, Wheels & Mixes</Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Urgent Pet Care & Contact */}
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.1rem', marginBottom: '18px', fontWeight: 700 }}>
              Emergency Assistance
            </h4>
            <p style={{ color: '#9CA3AF', fontSize: '0.88rem', marginBottom: '12px' }}>
              Animal emergency? Our verified directory connects you directly with 24/7 veterinary trauma centers and mobile pet ambulances.
            </p>
            <a
              href="tel:+919800011222"
              className="btn btn-sm btn-danger"
              style={{ textDecoration: 'none', display: 'inline-flex' }}
            >
              📞 24/7 Demo Helpline
            </a>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid #374151',
          paddingTop: '24px',
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '12px',
          fontSize: '0.85rem',
          color: '#9CA3AF'
        }}>
          <div>
            © {new Date().getFullYear()} PAW & CO. Built with ❤️ for Pet Care & Education. All rights reserved.
          </div>
          <div>
            <span>Prices in Indian Rupees (₹) • Cash on Delivery Demo Mode</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
