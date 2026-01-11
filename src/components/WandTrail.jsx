import React, { useEffect, useState } from 'react';

const WandTrail = () => {
  const [trail, setTrail] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const newSpark = {
        x: e.clientX,
        y: e.clientY,
        id: Date.now()
      };

      setTrail((prev) => [...prev, newSpark]);

      // Remove the spark after 500ms (fading out)
      setTimeout(() => {
        setTrail((prev) => prev.filter(s => s.id !== newSpark.id));
      }, 500);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
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