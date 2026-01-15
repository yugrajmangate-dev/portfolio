import React, { useEffect, useState } from 'react';

const FlyingBroom = ({ delay = 0, duration = 20 }) => {
  const [position, setPosition] = useState(0);

  useEffect(() => {
    let animationFrameId;
    let startTime = Date.now() + delay * 1000;

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = (elapsed % duration) / duration;
      
      setPosition(progress * 100);
      animationFrameId = requestAnimationFrame(animate);
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [delay, duration]);

  return (
    <div
      style={{
        position: 'fixed',
        right: `${position}%`,
        top: `${25 + Math.sin(position / 100 * Math.PI * 2) * 15}%`,
        transform: `rotate(${Math.sin(position / 100 * Math.PI * 2) * 15}deg)`,
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.75,
        filter: 'drop-shadow(0 0 12px rgba(197, 160, 9, 0.6))',
      }}
    >
      <svg width="60" height="40" viewBox="0 0 100 60" xmlns="http://www.w3.org/2000/svg">
        {/* Broom Handle/Stick */}
        <rect x="35" y="10" width="3" height="40" fill="#8B4513" />
        
        {/* Broom Bristles - Left */}
        <ellipse cx="20" cy="48" rx="12" ry="8" fill="#CD853F" />
        <line x1="22" y1="48" x2="28" y2="50" stroke="#8B4513" strokeWidth="1" />
        <line x1="18" y1="48" x2="14" y2="50" stroke="#8B4513" strokeWidth="1" />
        <line x1="20" y1="42" x2="20" y2="54" stroke="#8B4513" strokeWidth="1" />
        
        {/* Broom Bristles - Right */}
        <ellipse cx="80" cy="48" rx="12" ry="8" fill="#CD853F" />
        <line x1="78" y1="48" x2="72" y2="50" stroke="#8B4513" strokeWidth="1" />
        <line x1="82" y1="48" x2="86" y2="50" stroke="#8B4513" strokeWidth="1" />
        <line x1="80" y1="42" x2="80" y2="54" stroke="#8B4513" strokeWidth="1" />
        
        {/* Center Bristles */}
        <ellipse cx="50" cy="50" rx="10" ry="6" fill="#D2B48C" />
        
        {/* Handle Grip */}
        <circle cx="36.5" cy="12" r="3" fill="#DAA520" />
        <circle cx="36.5" cy="20" r="3" fill="#DAA520" />
        
        {/* Magical Glow Lines */}
        <path d="M 20 48 Q 50 40 80 48" stroke="rgba(197, 160, 9, 0.6)" strokeWidth="1" fill="none" />
      </svg>
    </div>
  );
};

export default FlyingBroom;
