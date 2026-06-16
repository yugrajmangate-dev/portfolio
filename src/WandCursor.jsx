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
        src={`${import.meta.env.BASE_URL}wand.png`}
        alt=""
        className="elder-wand"
        style={{
          // offset to perfectly align the tip of the image with the cursor
          transform: `translate(${position.x - 4}px, ${position.y - 4}px)`,
          opacity: position.x > 0 ? 1 : 0,
          width: "150px",
          height: "150px",
          // The image might need some rotation if it's not pointing exactly at top-left
          rotate: "-10deg",
          transformOrigin: "top left"
        }}
      />
    </div>
  );
}
