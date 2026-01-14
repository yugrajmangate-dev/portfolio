import React, { useEffect, useState } from 'react';

const WandTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    let sparkCounter = 0;

    const createSpark = (x, y) => {
      const newSpark = {
        x: x,
        y: y,
        id: sparkCounter++
      };

      setTrail((prev) => [...prev, newSpark]);

      // Remove the spark after 500ms (fading out)
      setTimeout(() => {
        setTrail((prev) => prev.filter(s => s.id !== newSpark.id));
      }, 500);
    };

    // Handle Mouse Movement (Desktop)
    const handleMouseMove = (e) => {
      createSpark(e.clientX, e.clientY);
    };

    // Handle Touch Movement (Mobile/Tablet)
    const handleTouchMove = (e) => {
      if (e.touches && e.touches.length > 0) {
        const touch = e.touches[0];
        createSpark(touch.clientX, touch.clientY);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove, { passive: true });
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
    };
  }, []);

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, pointerEvents: 'none', zIndex: 9999 }}>
      {trail.map((spark) => (
        <div
          key={spark.id}
          style={{
            position: 'absolute',
            left: spark.x,
            top: spark.y,
            width: '6px',
            height: '6px',
            borderRadius: '50%',
            backgroundColor: '#ffd700', // Gold sparkles
            boxShadow: '0 0 10px #ffd700, 0 0 20px #ffd700', // Glowing effect
            animation: 'fadeSpark 0.5s linear forwards',
          }}
        />
      ))}
      <style>
        {`
          @keyframes fadeSpark {
            0% { transform: scale(1); opacity: 1; }
            100% { transform: scale(0); opacity: 0; }
          }
        `}
      </style>
    </div>
  );
};

export default WandTrail;