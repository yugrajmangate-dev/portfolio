import React, { useEffect, useState } from 'react';

const FlyingOwl = ({ delay = 0, direction = 'left-to-right', duration = 15 }) => {
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

  const isReverse = direction === 'right-to-left';
  const left = isReverse ? 100 - position : position;

  return (
    <div
      style={{
        position: 'fixed',
        left: `${left}%`,
        top: `${15 + (direction === 'left-to-right' ? Math.sin(position / 100 * Math.PI) * 10 : Math.sin((100 - position) / 100 * Math.PI) * 10)}%`,
        transform: isReverse ? 'scaleX(-1)' : 'scaleX(1)',
        zIndex: 2,
        pointerEvents: 'none',
        opacity: 0.8,
        filter: 'drop-shadow(0 0 10px rgba(197, 160, 9, 0.5))',
      }}
    >
      <svg width="50" height="50" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        {/* Owl Body */}
        <ellipse cx="50" cy="50" rx="25" ry="30" fill="#8B4513" />
        
        {/* Head */}
        <circle cx="50" cy="30" r="20" fill="#A0522D" />
        
        {/* Left Eye */}
        <circle cx="40" cy="25" r="6" fill="#FFD700" />
        <circle cx="41" cy="25" r="3" fill="#000" />
        
        {/* Right Eye */}
        <circle cx="60" cy="25" r="6" fill="#FFD700" />
        <circle cx="59" cy="25" r="3" fill="#000" />
        
        {/* Beak */}
        <polygon points="50,35 45,40 55,40" fill="#FF8C00" />
        
        {/* Left Wing */}
        <ellipse cx="30" cy="50" rx="12" ry="20" fill="#654321" />
        
        {/* Right Wing */}
        <ellipse cx="70" cy="50" rx="12" ry="20" fill="#654321" />
        
        {/* Feet */}
        <line x1="45" y1="75" x2="45" y2="85" stroke="#FF8C00" strokeWidth="2" />
        <line x1="55" y1="75" x2="55" y2="85" stroke="#FF8C00" strokeWidth="2" />
      </svg>
    </div>
  );
};

export default FlyingOwl;
