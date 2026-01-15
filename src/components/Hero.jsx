import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [displayText, setDisplayText] = useState('');
  const [phraseIndex, setPhaseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    'Software Solutions',
    'AI Agents',
    'Full Stack Apps',
    'Magical Experiences',
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
        setPhaseIndex((phraseIndex + 1) % phrases.length);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, phraseIndex, isDeleting, phrases]);

  return (
    <div className="page hero-section">
      <div className="hero-content">
        <p className="greeting">✨ The Portfolio of ✨</p>
        
        <h1 className="hero-name">Yugraj Mangate</h1>
        
        <h2 className="hero-title">
          I build <span className="typewriter-text">{displayText}</span><span className="cursor">|</span>
        </h2>
        
        <p className="hero-bio">
          A 2nd-Year Computer Science apprentice at <strong>I²IT Pune</strong>. 
          Crafting digital spells with <strong>React</strong>, brewing potions in <strong>Python</strong>, 
          and defending against the Dark Arts <strong>(Cybersecurity)</strong>.
        </p>
        
        <div className="cta-buttons">
          <Link to="/projects" className="btn-primary">
            View My Spells
          </Link>
          <Link to="/contact" className="btn-secondary">
            Send Owl Message
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;