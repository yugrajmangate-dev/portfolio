import React from 'react';
import { FaGoogle, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa'; // Ensure react-icons is installed

const Contact = () => {
  // REPLACE THIS with your real phone number
  const phoneNumber = "+917263817870"; 
  
  // REPLACE THIS with your real email
  const emailAddress = "your.email@example.com";

  // This specific link forces the browser to open Gmail's "Compose" window
  const gmailLink = `https://mail.google.com/mail/?view=cm&fs=1&to=${emailAddress}`;

  return (
    <div className="page" style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '10px' }}>Owl Post</h1>
      <p style={{ fontStyle: 'italic', marginBottom: '50px', color: '#c5a009' }}>
        "Send a message via the floo network."
      </p>
      
      <div className="project-grid" style={{ gridTemplateColumns: '1fr' }}>
        
        {/* --- CARD 1: GMAIL DIRECT LINK --- */}
        <div className="magic-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <FaGoogle size={40} color="#c5a009" />
          <div style={{ textAlign: 'left' }}>
            <h3>Howler (Email)</h3>
            <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
              Send a direct message via Gmail.
            </p>
            <a href={gmailLink} target="_blank" rel="noopener noreferrer" className="btn-magic" style={{ fontSize: '0.9rem', padding: '8px 20px' }}>
              Open Gmail Compose
            </a>
          </div>
        </div>

        {/* --- CARD 2: PHONE DIALER --- */}
        <div className="magic-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <FaPhoneAlt size={35} color="#c5a009" />
          <div style={{ textAlign: 'left' }}>
            <h3>Floo Call (Phone)</h3>
            <p style={{ fontSize: '1rem', marginBottom: '10px' }}>
              Summon me on your mobile device.
            </p>
            <a href={`tel:${phoneNumber}`} className="btn-magic" style={{ fontSize: '0.9rem', padding: '8px 20px' }}>
              Dial: {phoneNumber}
            </a>
          </div>
        </div>

        {/* --- CARD 3: LOCATION --- */}
        <div className="magic-card" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <FaMapMarkerAlt size={40} color="#c5a009" />
          <div style={{ textAlign: 'left' }}>
            <h3>Location</h3>
            <p style={{ fontSize: '1.1rem', color: '#e0d6ff' }}>
              Pimpri-Chinchwad, Pune <br/>
              <span style={{ fontSize: '0.9rem', color: '#888' }}>(Maharashtra Sector 9¾)</span>
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;