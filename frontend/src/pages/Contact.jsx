import React, { useState } from 'react';
import '../styles/contact.css';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    petType: 'dog',
    message: ''
  });

  const [errors, setErrors] = useState({});
  const [submittedMessage, setSubmittedMessage] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: null }));
    }
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please enter your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter a message.';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    // Demo Mode notice without false email claims
    setSubmittedMessage({
      name: formData.name,
      email: formData.email,
      timestamp: new Date().toLocaleTimeString()
    });

    setFormData({
      name: '',
      email: '',
      petType: 'dog',
      message: ''
    });
  };

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      <div className="section-header" style={{ paddingTop: '36px', textAlign: 'center' }}>
        <span className="sub-badge">Get in Touch</span>
        <h1>We'd Love to Hear From You</h1>
        <p>Have questions about pet diets, bedding sizes, or product availability? Our pet specialists are here to help!</p>
      </div>

      <div className="contact-layout">
        {/* Left Column: Form */}
        <div className="contact-card">
          <h2 style={{ fontSize: '1.4rem', color: 'var(--charcoal-dark)', marginBottom: '8px' }}>
            Send us a Message
          </h2>
          <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.9rem', marginBottom: '24px' }}>
            Fill out the form below and we will get back to your inquiry promptly.
          </p>

          {submittedMessage ? (
            <div style={{
              backgroundColor: 'var(--success-light)',
              border: '1.5px solid #A7F3D0',
              padding: '24px',
              borderRadius: 'var(--radius-md)',
              textAlign: 'center'
            }} id="contact-success-msg">
              <div style={{ fontSize: '2rem', marginBottom: '8px' }}>🐾</div>
              <h3 style={{ color: 'var(--success-green)', marginBottom: '8px' }}>
                Message Recorded (Demo Mode)
              </h3>
              <p style={{ color: 'var(--charcoal-body)', fontSize: '0.92rem', lineHeight: '1.5' }}>
                Thank you, <strong>{submittedMessage.name}</strong>! Your message was received at {submittedMessage.timestamp}.
              </p>
              <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.82rem', marginTop: '8px' }}>
                Note: This is an educational demonstration form. In production, this can be linked with NodeMailer or SendGrid.
              </p>
              <button
                type="button"
                onClick={() => setSubmittedMessage(null)}
                className="btn btn-secondary btn-sm"
                style={{ marginTop: '16px' }}
              >
                Send Another Note
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} noValidate id="contact-form">
              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="contact-name">
                  Your Name <span className="required">*</span>
                </label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="e.g. Priya Sharma"
                  value={formData.name}
                  onChange={handleChange}
                />
                {errors.name && <span className="field-error-msg">{errors.name}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="contact-email">
                  Email Address <span className="required">*</span>
                </label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="e.g. priya@example.com"
                  value={formData.email}
                  onChange={handleChange}
                />
                {errors.email && <span className="field-error-msg">{errors.email}</span>}
              </div>

              <div className="form-group" style={{ marginBottom: '16px' }}>
                <label className="form-label" htmlFor="contact-pet-type">
                  Regarding Pet Category
                </label>
                <select
                  id="contact-pet-type"
                  name="petType"
                  className="form-select"
                  value={formData.petType}
                  onChange={handleChange}
                >
                  <option value="dog">🐕 Dogs (Nutrition, Gear, Beds)</option>
                  <option value="cat">🐈 Cats (Litter, Trees, Toys)</option>
                  <option value="hamster">🐹 Hamsters (Cages, Wheels, Bedding)</option>
                  <option value="general">🐾 General Inquiry</option>
                </select>
              </div>

              <div className="form-group" style={{ marginBottom: '24px' }}>
                <label className="form-label" htmlFor="contact-message">
                  Your Message <span className="required">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows={4}
                  className={`form-textarea ${errors.message ? 'error' : ''}`}
                  placeholder="Tell us what you need help with..."
                  value={formData.message}
                  onChange={handleChange}
                />
                {errors.message && <span className="field-error-msg">{errors.message}</span>}
              </div>

              <button type="submit" className="btn btn-primary btn-full" id="contact-submit-btn">
                <span>Submit Inquiry (Demo Mode)</span>
              </button>
            </form>
          )}
        </div>

        {/* Right Column: Support & Office Details */}
        <div className="contact-card">
          <h2 style={{ fontSize: '1.4rem', color: 'var(--charcoal-dark)', marginBottom: '8px' }}>
            Paw & Co Support Center
          </h2>
          <p style={{ color: 'var(--charcoal-muted)', fontSize: '0.9rem' }}>
            Reach out via phone, email or visit our community pet care office.
          </p>

          <ul className="contact-info-list">
            <li className="contact-info-item">
              <div className="contact-info-icon">📍</div>
              <div className="contact-info-text">
                <strong>Main Campus / HQ:</strong>
                <span>42, Green Paw Boulevard, Koramangala, Bengaluru, Karnataka 560034</span>
              </div>
            </li>
            <li className="contact-info-item">
              <div className="contact-info-icon">📞</div>
              <div className="contact-info-text">
                <strong>Customer Assistance:</strong>
                <span>+91 98000 11000 (Mon - Sat, 9:00 AM - 7:00 PM)</span>
              </div>
            </li>
            <li className="contact-info-item">
              <div className="contact-info-icon">✉️</div>
              <div className="contact-info-text">
                <strong>Email Support:</strong>
                <span>support@pawandco.demo</span>
              </div>
            </li>
            <li className="contact-info-item">
              <div className="contact-info-icon">🚨</div>
              <div className="contact-info-text">
                <strong>Animal Medical Crisis?</strong>
                <span style={{ color: 'var(--urgent-red)', fontWeight: 600 }}>
                  Do not wait for form replies. Call emergency hospitals immediately!
                </span>
              </div>
            </li>
          </ul>

          <div style={{
            backgroundColor: '#FAF8F5',
            padding: '16px',
            borderRadius: 'var(--radius-sm)',
            border: '1px solid var(--border-light)',
            fontSize: '0.85rem',
            color: 'var(--charcoal-muted)'
          }}>
            🎓 <strong>Educational Notice:</strong> PAW & CO is designed as a clean, complete full-stack portfolio and college project following modern web development best practices.
          </div>
        </div>
      </div>
    </div>
  );
}
