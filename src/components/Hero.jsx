import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Wizard of the Web',
    'Keeper of Keys (Backend)',
    'Brewer of Python Potions',
    'Defender Against Dark Arts'
  ];

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    let timeout;

    if (!isDeleting) {
      if (displayText.length < currentPhrase.length) {
        timeout = setTimeout(() => {
          setDisplayText(currentPhrase.substring(0, displayText.length + 1));
        }, 100);
      } else {
        timeout = setTimeout(() => {
          setIsDeleting(true);
        }, 2000);
      }
    } else {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, 50);
      } else {
        setIsDeleting(false);
        setPhraseIndex((phraseIndex + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phraseIndex, isDeleting, phrases]);

  return (
    <div className="page" style={{ textAlign: 'center', paddingTop: '80px' }}>
      <p style={{ color: '#c5a009', fontFamily: 'Cinzel Decorative', fontSize: 'clamp(1rem, 4vw, 1.2rem)', letterSpacing: '2px', marginBottom: '10px' }}>
        ★ The Portfolio of ★
      </p>
      
      <h1 style={{ fontSize: 'clamp(2.5rem, 8vw, 4.5rem)', marginBottom: '20px', textShadow: '0 0 20px rgba(197, 160, 9, 0.4)' }}>
        Yugraj Mangate
      </h1>
      
      <h3 className="magic-subtitle">
        "{displayText}"<span className="wand-cursor">|</span>
      </h3>
      
      <p style={{ maxWidth: '650px', margin: '0 auto 50px auto', fontSize: 'clamp(1rem, 4vw, 1.3rem)', color: '#aaa' }}>
        A 2nd-Year Computer Science apprentice at <strong>I²IT Pune</strong>. 
        Crafting digital spells with <strong>React</strong>, brewing potions in <strong>Python</strong>, 
        and defending against the Dark Arts (Cybersecurity).
      </p>
      
      <div style={{ display: 'flex', gap: '30px', justifyContent: 'center', flexWrap: 'wrap', padding: '0 15px' }}>
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