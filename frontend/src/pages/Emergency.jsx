import React, { useState, useEffect } from 'react';
import { getEmergencyContacts } from '../services/api';
import '../styles/emergency.css';

export default function Emergency() {
  const [emergencyData, setEmergencyData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;
    async function loadContacts() {
      try {
        setLoading(true);
        const data = await getEmergencyContacts();
        if (isMounted) {
          setEmergencyData(data);
          setLoading(false);
        }
      } catch (err) {
        console.error('Error fetching emergency data:', err);
        if (isMounted) {
          // Graceful fallback to verified sample directory
          setEmergencyData({
            notice: "Immediate Medical Advice: If your pet exhibits severe bleeding, breathing distress, unconsciousness, or signs of poisoning, contact a qualified emergency veterinarian immediately.",
            veterinarians: [
              {
                id: 'vet-1',
                name: 'Apollo 24/7 Pet Emergency & Trauma Care',
                doctor: 'Dr. Rohit Sharma, BVSc & AH, MVSc (Surgery)',
                location: 'Indiranagar, Bengaluru / Multi-city Hub',
                timing: 'Open 24 Hours / 7 Days a Week',
                phone: '+91-98000-11222',
                specialty: 'Critical Care, Emergency Surgeries, Oxygen Therapy',
                rating: 4.9,
                address: 'Plot 42, 100 Feet Road, Indiranagar, Bengaluru - 560038'
              },
              {
                id: 'vet-2',
                name: 'Max Vets 24-Hour Animal Hospital',
                doctor: 'Dr. Ananya Mukherjee, MVSc (Internal Medicine)',
                location: 'South Extension / Greater Kailash, New Delhi',
                timing: '24/7 Round-the-clock Emergency',
                phone: '+91-98000-22333',
                specialty: 'Trauma ICU, Diagnostics, Toxicology, Exotic Pets',
                rating: 4.8,
                address: 'A-24, Ring Road, South Extension Part 1, New Delhi - 110049'
              }
            ],
            ambulances: [
              {
                id: 'amb-1',
                name: 'PawCare Rapid Response Pet Ambulance',
                coverage: 'Bengaluru Urban & Suburban (25 km radius)',
                availability: '24/7 On-call Dispatch',
                phone: '+91-98000-55666',
                features: 'Equipped with Oxygen concentrator, Stretcher, First Aid & Paramedic on board',
                avgResponseTime: '20 - 35 mins'
              },
              {
                id: 'amb-2',
                name: 'LifeLine Animal Emergency Mobile ICU',
                coverage: 'Delhi NCR (Delhi, Noida, Gurugram)',
                availability: '24/7 365 Days',
                phone: '+91-98000-66777',
                features: 'Hydraulic lift, emergency stabilizer kit, temperature-controlled cabin',
                avgResponseTime: '15 - 30 mins'
              }
            ]
          });
          setLoading(false);
        }
      }
    }

    loadContacts();
    return () => { isMounted = false; };
  }, []);

  return (
    <div className="container" style={{ paddingBottom: '80px' }}>
      {/* Hero Banner */}
      <div className="emergency-hero-banner">
        <span className="badge badge-urgent" style={{ marginBottom: '10px' }}>
          🚨 24/7 Rapid Veterinary Network
        </span>
        <h1>24/7 Emergency Pet Assistance</h1>
        <p>
          Every second counts during an animal medical crisis. Use this verified directory to connect immediately with 24-hour veterinary trauma centers and mobile pet ambulances.
        </p>
      </div>

      {/* Mandatory Emergency Medical Notice */}
      <div className="urgent-notice-box" role="alert">
        <span className="icon">⚠️</span>
        <div>
          <strong>Immediate Medical Advice:</strong>
          <p>
            If your pet exhibits severe bleeding, breathing distress, seizures, unconsciousness, heat stroke, or signs of poisoning, contact a qualified emergency veterinarian immediately. Keep your pet calm and warm while arranging transit.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="state-container">
          <div className="spinner"></div>
          <p>Loading emergency directory...</p>
        </div>
      ) : (
        <>
          {/* Section 1: Veterinary Doctors & Hospitals */}
          <section style={{ marginBottom: '50px' }}>
            <div className="emergency-section-title">
              <h2>
                <span>🏥</span>
                <span>Emergency Veterinary Hospitals & Doctors</span>
              </h2>
              <span className="badge badge-sage">Round-the-Clock On Duty</span>
            </div>

            <div className="emergency-grid" id="vets-directory-grid">
              {emergencyData?.veterinarians?.map(vet => (
                <div key={vet.id} className="emergency-card" id={`vet-card-${vet.id}`}>
                  <div>
                    <div className="emergency-card-header">
                      <span className="badge badge-sage" style={{ fontSize: '0.72rem', marginBottom: '6px' }}>
                        ★ {vet.rating} Verified Clinic
                      </span>
                      <h3 className="emergency-card-title">{vet.name}</h3>
                      <div className="emergency-card-doctor">{vet.doctor}</div>
                    </div>

                    <ul className="emergency-meta-list">
                      <li>
                        <span className="emergency-meta-icon">📍</span>
                        <span><strong>Location:</strong> {vet.location}</span>
                      </li>
                      <li>
                        <span className="emergency-meta-icon">⏰</span>
                        <span><strong>Timings:</strong> {vet.timing}</span>
                      </li>
                      <li>
                        <span className="emergency-meta-icon">🩺</span>
                        <span><strong>Specialty:</strong> {vet.specialty}</span>
                      </li>
                      <li>
                        <span className="emergency-meta-icon">🏢</span>
                        <span style={{ fontSize: '0.82rem', color: 'var(--charcoal-muted)' }}>{vet.address}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <a
                      href={`tel:${vet.phone.replace(/[\s-]/g, '')}`}
                      className="call-now-btn"
                      id={`call-vet-${vet.id}`}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Call Hospital: {vet.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Section 2: Pet Ambulance Services */}
          <section>
            <div className="emergency-section-title">
              <h2>
                <span>🚑</span>
                <span>Mobile Pet Ambulance Services</span>
              </h2>
              <span className="badge badge-urgent">Rapid Response Transit</span>
            </div>

            <div className="emergency-grid" id="ambulance-directory-grid">
              {emergencyData?.ambulances?.map(amb => (
                <div key={amb.id} className="emergency-card" id={`amb-card-${amb.id}`}>
                  <div>
                    <div className="emergency-card-header">
                      <span className="badge badge-urgent" style={{ fontSize: '0.72rem', marginBottom: '6px' }}>
                        Critical Mobile ICU
                      </span>
                      <h3 className="emergency-card-title">{amb.name}</h3>
                    </div>

                    <ul className="emergency-meta-list">
                      <li>
                        <span className="emergency-meta-icon">🗺️</span>
                        <span><strong>Coverage:</strong> {amb.coverage}</span>
                      </li>
                      <li>
                        <span className="emergency-meta-icon">⚡</span>
                        <span><strong>Availability:</strong> {amb.availability}</span>
                      </li>
                      <li>
                        <span className="emergency-meta-icon">⏱️</span>
                        <span><strong>Est. Response:</strong> {amb.avgResponseTime}</span>
                      </li>
                      <li>
                        <span className="emergency-meta-icon">🩺</span>
                        <span style={{ fontSize: '0.85rem' }}>{amb.features}</span>
                      </li>
                    </ul>
                  </div>

                  <div>
                    <a
                      href={`tel:${amb.phone.replace(/[\s-]/g, '')}`}
                      className="call-now-btn"
                      id={`call-amb-${amb.id}`}
                      style={{ backgroundColor: '#C53030' }}
                    >
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                      </svg>
                      <span>Dispatch Ambulance: {amb.phone}</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </>
      )}

      {/* Educational Disclaimer */}
      <div style={{
        marginTop: '40px',
        padding: '16px 20px',
        backgroundColor: '#F9F8F6',
        borderRadius: 'var(--radius-sm)',
        fontSize: '0.82rem',
        color: 'var(--charcoal-muted)',
        textAlign: 'center'
      }}>
        📌 <strong>Educational Project Notice:</strong> Phone numbers shown above are dedicated demo helpline placeholders (+91-98000-xxxxx) for student demonstration purposes. Replace with verified regional clinic telephone numbers in production.
      </div>
    </div>
  );
}
