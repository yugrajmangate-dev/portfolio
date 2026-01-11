import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <p style={{ color: '#c5a009', fontFamily: 'Cinzel Decorative', fontSize: '1.2rem', letterSpacing: '2px', marginBottom: '10px' }}>
        ★ The Portfolio of ★
      </p>
      
      <h1 style={{ fontSize: '4.5rem', marginBottom: '20px', textShadow: '0 0 20px rgba(197, 160, 9, 0.4)' }}>
        Yugraj Mangate
      </h1>
      
      <h2 style={{ color: '#f0e6d2', fontSize: '1.8rem', fontFamily: 'Crimson Text', fontStyle: 'italic', marginBottom: '40px' }}>
        "Wizard of the Web & Keeper of Keys (Backend)"
      </h2>
      
      <p style={{ maxWidth: '650px', margin: '0 auto 50px auto', fontSize: '1.3rem', color: '#aaa' }}>
        A 2nd-Year Computer Science apprentice at <strong>I²IT Pune</strong>. 
        Crafting digital spells with <strong>React</strong>, brewing potions in <strong>Python</strong>, 
        and defending against the Dark Arts (Cybersecurity).
      </p>
      
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center' }}>
        <Link to="/projects" className="btn-magic">
          Open Spellbook
        </Link>
        <Link to="/contact" className="btn-magic">
          Send Owl
        </Link>
      </div>
    </div>
  );
};

export default Hero;