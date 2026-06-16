import { useEffect, useRef, useState } from "react";

export function WandCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);
  const [particles, setParticles] = useState([]);

  const particlesRef = useRef([]);
  const lastPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    // Disable on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let particleId = 0;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });

      // Calculate distance from last pos for trail
      const dx = e.clientX - lastPosRef.current.x;
      const dy = e.clientY - lastPosRef.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);

      if (dist > 8) {
        particlesRef.current.push({
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          vx: (Math.random() - 0.5) * 1.5,
          vy: Math.random() * 1.5,
          life: 1.0,
          type: "trail",
        });
        lastPosRef.current = { x: e.clientX, y: e.clientY };
      }
    };

    const onMouseDown = (e) => {
      setClicked(true);
      // Create burst
      for (let i = 0; i < 20; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 6 + 2;
        particlesRef.current.push({
          id: particleId++,
          x: e.clientX,
          y: e.clientY,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: 1.0,
          type: "burst",
        });
      }
    };
    const onMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    let animationFrame;
    const updateParticles = () => {
      particlesRef.current = particlesRef.current
        .map((p) => ({
          ...p,
          x: p.x + p.vx,
          y: p.y + p.vy,
          life: p.life - (p.type === "burst" ? 0.04 : 0.03),
          vy: p.vy + 0.1, // gravity
        }))
        .filter((p) => p.life > 0);

      setParticles([...particlesRef.current]);
      animationFrame = requestAnimationFrame(updateParticles);
    };

    animationFrame = requestAnimationFrame(updateParticles);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      cancelAnimationFrame(animationFrame);
    };
  }, []);

  return (
    <div
      className="wand-cursor-layer"
      style={{ pointerEvents: "none", position: "fixed", inset: 0, zIndex: 9999 }}
    >
      {/* Particles */}
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: "absolute",
            left: 0,
            top: 0,
            transform: `translate(${p.x}px, ${p.y}px) scale(${p.life})`,
            width: p.type === "burst" ? "6px" : "4px",
            height: p.type === "burst" ? "6px" : "4px",
            backgroundColor: p.type === "burst" ? "#fff9dd" : "#ffd700",
            borderRadius: "50%",
            boxShadow: `0 0 ${p.type === "burst" ? "12px" : "6px"} ${
              p.type === "burst" ? "#fff" : "#f59e0b"
            }`,
            opacity: p.life,
            pointerEvents: "none",
          }}
        />
      ))}

      {/* Wand Tip Glow */}
      <div
        className="wand-tip-glow"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: position.x > 0 ? 1 : 0,
          position: "absolute",
          left: 0,
          top: 0,
        }}
      >
        <div className="wand-outer-glow" />
        <div className="wand-inner-glow" />
        {clicked && <div className="wand-pulse" />}
      </div>

      {/* Wand Image */}
      <img
        src={`${import.meta.env.BASE_URL}wand.png`}
        alt=""
        className="elder-wand"
        style={{
          // Tweak these offsets until tip perfectly aligns
          transform: `translate(${position.x - 14}px, ${position.y - 14}px)`,
          opacity: position.x > 0 ? 1 : 0,
          width: "100px",
          height: "100px",
          transformOrigin: "top left",
          position: "absolute",
          left: 0,
          top: 0,
        }}
      />
    </div>
  );
}
