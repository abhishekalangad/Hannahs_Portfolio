import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const haloRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Keep track of target mouse position
  const mouseRef = useRef({ x: -100, y: -100 });
  
  // Interpolated smooth following positions
  const dotPosRef = useRef({ x: -100, y: -100 });
  const haloPosRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('bento-card')
      ) {
        setIsHovered(true);
      } else {
        setIsHovered(false);
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseover', handleMouseOver);

    let animationFrameId: number;

    const updateCursor = () => {
      const targetX = mouseRef.current.x;
      const targetY = mouseRef.current.y;

      // Linear Interpolation (lerp): Current = Current + (Target - Current) * EaseFactor
      dotPosRef.current.x += (targetX - dotPosRef.current.x) * 0.28;
      dotPosRef.current.y += (targetY - dotPosRef.current.y) * 0.28;

      haloPosRef.current.x += (targetX - haloPosRef.current.x) * 0.12;
      haloPosRef.current.y += (targetY - haloPosRef.current.y) * 0.12;

      if (dotRef.current) {
        dotRef.current.style.left = `${dotPosRef.current.x}px`;
        dotRef.current.style.top = `${dotPosRef.current.y}px`;
      }

      if (haloRef.current) {
        haloRef.current.style.left = `${haloPosRef.current.x}px`;
        haloRef.current.style.top = `${haloPosRef.current.y}px`;
      }

      animationFrameId = requestAnimationFrame(updateCursor);
    };

    updateCursor();

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <>
      <div
        ref={dotRef}
        className={`custom-cursor-dot ${isHovered ? 'hovering' : ''}`}
        style={{
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9999,
        }}
      />
      <div
        ref={haloRef}
        className={`custom-cursor-halo ${isHovered ? 'hovering' : ''}`}
        style={{
          position: 'fixed',
          transform: 'translate(-50%, -50%)',
          pointerEvents: 'none',
          zIndex: 9998,
        }}
      />
    </>
  );
};
