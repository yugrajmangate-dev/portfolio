import { useEffect, useRef, useState } from "react";

export function useSmoothScroll() {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced || isCoarsePointer) {
      return undefined;
    }

    let lenis;
    let rafId;
    let cancelled = false;

    (async () => {
      const { default: Lenis } = await import("lenis");

      if (cancelled) {
        return;
      }

      lenis = new Lenis({
        duration: 1.1,
        easing: (t) => 1 - Math.pow(1 - t, 4),
        smoothWheel: true,
        wheelMultiplier: 1,
        touchMultiplier: 1.2,
      });

      const raf = (time) => {
        lenis.raf(time);
        rafId = window.requestAnimationFrame(raf);
      };

      rafId = window.requestAnimationFrame(raf);
      window.__lenis = lenis;
    })();

    return () => {
      cancelled = true;

      if (rafId) {
        window.cancelAnimationFrame(rafId);
      }

      if (lenis) {
        lenis.destroy();
      }

      window.__lenis = null;
    };
  }, []);
}

export function Reveal({ children, className = "", delay = 0, as = "div" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const Component = as;

  useEffect(() => {
    const node = ref.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15, rootMargin: "0px 0px -8% 0px" }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, []);

  return (
    <Component
      ref={ref}
      className={`${className} reveal${visible ? " is-visible" : ""}`.trim()}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </Component>
  );
}

export function useParallax(speed = 0.15) {
  const ref = useRef(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isCoarsePointer = window.matchMedia("(pointer: coarse)").matches;

    if (prefersReduced || isCoarsePointer) {
      return undefined;
    }

    const el = ref.current;

    if (!el) {
      return undefined;
    }

    let rafId;

    const update = () => {
      const rect = el.getBoundingClientRect();
      const viewportH = window.innerHeight;
      const centerOffset = rect.top + rect.height / 2 - viewportH / 2;

      setOffset(centerOffset * speed * -1);
      rafId = window.requestAnimationFrame(update);
    };

    rafId = window.requestAnimationFrame(update);

    return () => window.cancelAnimationFrame(rafId);
  }, [speed]);

  return {
    ref,
    style: { transform: `translate3d(0, ${offset}px, 0)` },
  };
}
