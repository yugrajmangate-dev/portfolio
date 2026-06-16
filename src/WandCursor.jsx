import { useEffect, useRef, useState } from "react";

export function WandCursor() {
  const cursorRef = useRef(null);
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [clicked, setClicked] = useState(false);

  useEffect(() => {
    // Disable on mobile
    if (window.matchMedia("(pointer: coarse)").matches) return;

    const onMouseMove = (e) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const onMouseDown = () => setClicked(true);
    const onMouseUp = () => setClicked(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
    };
  }, []);

  return (
    <div className="wand-cursor-layer" style={{ pointerEvents: "none" }}>
      <div
        className="wand-tip-glow"
        style={{
          transform: `translate(${position.x}px, ${position.y}px)`,
          opacity: position.x > 0 ? 1 : 0,
        }}
      >
        <div className="wand-outer-glow" />
        <div className="wand-inner-glow" />
        {clicked && <div className="wand-pulse" />}
      </div>
      <img
        src={`${import.meta.env.BASE_URL}wand.svg`}
        alt=""
        className="elder-wand"
        style={{
          transform: `translate(${position.x - 8}px, ${position.y - 8}px)`,
          opacity: position.x > 0 ? 1 : 0,
          width: "32px",
          height: "32px"
        }}
      />
    </div>
  );
}
