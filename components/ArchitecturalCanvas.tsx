'use client';

import React, { useEffect, useRef, useState } from 'react';

export interface ArchitecturalCanvasProps {
  className?: string;
  heroRef?: React.RefObject<HTMLElement | null>;
}

export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({
  className,
  heroRef,
}) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const svgRef = useRef<SVGSVGElement | null>(null);

  const [isReducedMotion, setIsReducedMotion] = useState<boolean>(false);
  const [hasHover, setHasHover] = useState<boolean>(true);
  const [isDrawn, setIsDrawn] = useState<boolean>(false);

  // Parallax tracking values
  const mouseRef = useRef<{ x: number; y: number; targetX: number; targetY: number }>({
    x: 0,
    y: 0,
    targetX: 0,
    targetY: 0,
  });

  const [parallaxOffset, setParallaxOffset] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });

  useEffect(() => {
    // Media query checks
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setIsReducedMotion(motionQuery.matches);

    const hoverQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    setHasHover(hoverQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => setIsReducedMotion(e.matches);
    const handleHoverChange = (e: MediaQueryListEvent) => setHasHover(e.matches);

    motionQuery.addEventListener('change', handleMotionChange);
    hoverQuery.addEventListener('change', handleHoverChange);

    // Trigger reveal animation sequence once
    const timer = setTimeout(() => {
      setIsDrawn(true);
    }, 100);

    // Pointer Parallax Handler
    const container =
      (heroRef && heroRef.current) || containerRef.current?.parentElement || document.body;

    let animFrameId: number | null = null;

    const handlePointerMove = (e: PointerEvent) => {
      if (!hoverQuery.matches || motionQuery.matches) return;
      const rect = container.getBoundingClientRect();
      const relX = (e.clientX - rect.left) / rect.width - 0.5; // -0.5 to 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5;

      mouseRef.current.targetX = relX * 14; // max ±7px shift
      mouseRef.current.targetY = relY * 14;
    };

    const handlePointerLeave = () => {
      mouseRef.current.targetX = 0;
      mouseRef.current.targetY = 0;
    };

    const updateParallax = () => {
      const mouse = mouseRef.current;
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;

      setParallaxOffset({
        x: Math.round(mouse.x * 100) / 100,
        y: Math.round(mouse.y * 100) / 100,
      });

      animFrameId = requestAnimationFrame(updateParallax);
    };

    if (hoverQuery.matches && !motionQuery.matches) {
      container.addEventListener('pointermove', handlePointerMove, { passive: true });
      container.addEventListener('pointerleave', handlePointerLeave, { passive: true });
      animFrameId = requestAnimationFrame(updateParallax);
    }

    // IntersectionObserver to pause rendering offscreen
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (!entry.isIntersecting && animFrameId) {
          cancelAnimationFrame(animFrameId);
          animFrameId = null;
        } else if (entry.isIntersecting && hoverQuery.matches && !motionQuery.matches && !animFrameId) {
          animFrameId = requestAnimationFrame(updateParallax);
        }
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    return () => {
      clearTimeout(timer);
      motionQuery.removeEventListener('change', handleMotionChange);
      hoverQuery.removeEventListener('change', handleHoverChange);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
      observer.disconnect();
      if (animFrameId) cancelAnimationFrame(animFrameId);
    };
  }, [heroRef]);

  // Determine stroke animation styles based on reveal stage / reduced motion
  const getLineStyle = (delayMs: number, strokeLength = 1000) => {
    if (isReducedMotion) {
      return {
        strokeDasharray: 'none',
        strokeDashoffset: 0,
        opacity: 1,
      };
    }
    return {
      strokeDasharray: strokeLength,
      strokeDashoffset: isDrawn ? 0 : strokeLength,
      transition: `stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms, opacity 0.8s ease ${delayMs}ms`,
    };
  };

  const getFadeStyle = (delayMs: number) => {
    if (isReducedMotion) {
      return { opacity: 1 };
    }
    return {
      opacity: isDrawn ? 1 : 0,
      transition: `opacity 1.0s cubic-bezier(0.16, 1, 0.3, 1) ${delayMs}ms`,
    };
  };

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 w-full h-full pointer-events-none select-none z-10 overflow-hidden ${
        className || ''
      }`}
    >
      <svg
        ref={svgRef}
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
        className="w-full h-full text-[#D4AF37]"
        style={{
          transform: `translate3d(${parallaxOffset.x}px, ${parallaxOffset.y}px, 0)`,
          willChange: 'transform',
        }}
      >
        <defs>
          {/* Subtle Diagonal Column Hatching Pattern */}
          <pattern
            id="columnHatch"
            width="8"
            height="8"
            patternTransform="rotate(45 0 0)"
            patternUnits="userSpaceOnUse"
          >
            <line
              x1="0"
              y1="0"
              x2="0"
              y2="8"
              stroke="#D4AF37"
              strokeWidth="1.2"
              strokeOpacity="0.4"
            />
          </pattern>

          {/* Gold Pulse Line Gradient */}
          <linearGradient id="goldPulse" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#D4AF37" stopOpacity="0.0" />
            <stop offset="50%" stopColor="#FFF2A8" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#D4AF37" stopOpacity="0.0" />
          </linearGradient>
        </defs>

        {/* ================================================================= */}
        {/* LAYER A: FAINT DRAFTING GRID (BACKGROUND 50px SPACING) */}
        {/* ================================================================= */}
        <g opacity="0.45" style={getFadeStyle(100)}>
          {/* Vertical Grid Lines */}
          {[100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200, 1300].map((x) => (
            <line
              key={`vgrid-${x}`}
              x1={x}
              y1="40"
              x2={x}
              y2="860"
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeOpacity={x >= 600 ? '0.08' : '0.03'}
              strokeDasharray={x % 200 === 0 ? 'none' : '4 4'}
            />
          ))}
          {/* Horizontal Grid Lines */}
          {[100, 200, 300, 400, 500, 600, 700, 800].map((y) => (
            <line
              key={`hgrid-${y}`}
              x1="40"
              y1={y}
              x2="1360"
              y2={y}
              stroke="#D4AF37"
              strokeWidth="0.5"
              strokeOpacity="0.06"
              strokeDasharray={y % 200 === 0 ? 'none' : '4 4'}
            />
          ))}
        </g>

        {/* ================================================================= */}
        {/* LAYER B: GRID AXIS BUBBLE MARKERS (A, B, C, D, E & 1, 2, 3, 4) */}
        {/* ================================================================= */}
        <g style={getFadeStyle(400)}>
          {/* Top Axis Column Bubbles */}
          {[
            { label: 'A', x: 620 },
            { label: 'B', x: 780 },
            { label: 'C', x: 940 },
            { label: 'D', x: 1100 },
            { label: 'E', x: 1260 },
          ].map((col) => (
            <g key={`col-${col.label}`} transform={`translate(${col.x}, 70)`}>
              <circle r="12" fill="#050505" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#D4AF37"
                fillOpacity="0.7"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {col.label}
              </text>
              <line
                x1="0"
                y1="12"
                x2="0"
                y2="760"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.15"
                strokeDasharray="6 4 2 4"
              />
            </g>
          ))}

          {/* Right Axis Row Bubbles */}
          {[
            { label: '1', y: 160 },
            { label: '2', y: 350 },
            { label: '3', y: 540 },
            { label: '4', y: 730 },
          ].map((row) => (
            <g key={`row-${row.label}`} transform={`translate(1310, ${row.y})`}>
              <circle r="12" fill="#050505" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.4" />
              <text
                x="0"
                y="4"
                textAnchor="middle"
                fill="#D4AF37"
                fillOpacity="0.7"
                fontSize="10"
                fontFamily="monospace"
                fontWeight="bold"
              >
                {row.label}
              </text>
              <line
                x1="-690"
                y1="0"
                x2="-12"
                y2="0"
                stroke="#D4AF37"
                strokeWidth="0.8"
                strokeOpacity="0.15"
                strokeDasharray="6 4 2 4"
              />
            </g>
          ))}
        </g>

        {/* ================================================================= */}
        {/* PHASE 1: OUTER FOOTPRINT & FOUNDATION SETBACK (DRAW DELAY: 200ms) */}
        {/* ================================================================= */}
        <g stroke="#D4AF37" fill="none">
          {/* Building Setback Perimeter */}
          <rect
            x="600"
            y="140"
            width="680"
            height="610"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            strokeDasharray="5 4"
            style={getLineStyle(200, 2600)}
          />

          {/* Outer Structural Foundation Boundary */}
          <path
            d="M 620 160 H 1260 V 730 H 620 Z"
            strokeWidth="1.8"
            strokeOpacity="0.65"
            style={getLineStyle(400, 2600)}
          />

          {/* Secondary Structural Envelope Offset */}
          <path
            d="M 628 168 H 1252 V 722 H 628 Z"
            strokeWidth="0.8"
            strokeOpacity="0.35"
            style={getLineStyle(550, 2600)}
          />
        </g>

        {/* ================================================================= */}
        {/* PHASE 2: WALL THICKNESSES, PARTITIONS & DOORS (DRAW DELAY: 800ms) */}
        {/* ================================================================= */}
        <g stroke="#D4AF37" fill="none">
          {/* Main Executive Atrium Partition Walls (Double parallel lines) */}
          {/* Horizontal Corridor Wall */}
          <path d="M 628 350 H 1100" strokeWidth="1.5" strokeOpacity="0.5" style={getLineStyle(800, 600)} />
          <path d="M 628 358 H 1092" strokeWidth="0.8" strokeOpacity="0.3" style={getLineStyle(850, 600)} />

          {/* Vertical Core Shear Wall */}
          <path d="M 940 168 V 722" strokeWidth="1.8" strokeOpacity="0.55" style={getLineStyle(900, 600)} />
          <path d="M 948 168 V 722" strokeWidth="0.8" strokeOpacity="0.3" style={getLineStyle(950, 600)} />

          {/* Conference Suite Partition Wall */}
          <path d="M 780 358 V 540 H 940" strokeWidth="1.2" strokeOpacity="0.45" style={getLineStyle(1050, 400)} />
          <path d="M 788 366 V 532 H 932" strokeWidth="0.8" strokeOpacity="0.25" style={getLineStyle(1100, 400)} />

          {/* Elevator Core Shaft Walls */}
          <rect
            x="960"
            y="370"
            width="120"
            height="150"
            strokeWidth="1.4"
            strokeOpacity="0.5"
            style={getLineStyle(1150, 600)}
          />
          <rect
            x="966"
            y="376"
            width="108"
            height="138"
            strokeWidth="0.8"
            strokeOpacity="0.3"
            style={getLineStyle(1200, 500)}
          />
          {/* Elevator Shaft Diagonal Cross Cut */}
          <line
            x1="966"
            y1="376"
            x2="1074"
            y2="514"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
            style={getLineStyle(1250, 200)}
          />
          <line
            x1="1074"
            y1="376"
            x2="966"
            y2="514"
            strokeWidth="0.8"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
            style={getLineStyle(1250, 200)}
          />

          {/* Architectural Door Swings (Quarter-circle arcs) */}
          {/* Atrium Door Swing */}
          <path
            d="M 780 350 A 45 45 0 0 1 825 395"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="3 3"
            style={getLineStyle(1300, 100)}
          />
          <line x1="780" y1="350" x2="780" y2="395" strokeWidth="1" strokeOpacity="0.4" style={getLineStyle(1300, 50)} />

          {/* Executive Suite Door Swing */}
          <path
            d="M 940 540 A 45 45 0 0 1 895 585"
            strokeWidth="1"
            strokeOpacity="0.45"
            strokeDasharray="3 3"
            style={getLineStyle(1350, 100)}
          />
          <line x1="940" y1="540" x2="895" y2="540" strokeWidth="1" strokeOpacity="0.4" style={getLineStyle(1350, 50)} />
        </g>

        {/* ================================================================= */}
        {/* REINFORCED STRUCTURAL STEEL COLUMNS (GRID INTERSECTIONS) */}
        {/* ================================================================= */}
        <g fill="url(#columnHatch)" stroke="#D4AF37" strokeWidth="1" style={getFadeStyle(1400)}>
          {[
            { x: 620, y: 160 },
            { x: 780, y: 160 },
            { x: 940, y: 160 },
            { x: 1100, y: 160 },
            { x: 1260, y: 160 },

            { x: 620, y: 350 },
            { x: 780, y: 350 },
            { x: 940, y: 350 },
            { x: 1100, y: 350 },
            { x: 1260, y: 350 },

            { x: 620, y: 540 },
            { x: 780, y: 540 },
            { x: 940, y: 540 },
            { x: 1100, y: 540 },
            { x: 1260, y: 540 },

            { x: 620, y: 730 },
            { x: 780, y: 730 },
            { x: 940, y: 730 },
            { x: 1100, y: 730 },
            { x: 1260, y: 730 },
          ].map((col, idx) => (
            <rect
              key={`col-rect-${idx}`}
              x={col.x - 7}
              y={col.y - 7}
              width="14"
              height="14"
              strokeOpacity="0.6"
            />
          ))}
        </g>

        {/* ================================================================= */}
        {/* PHASE 3: DIMENSION LINES, CALLOUTS & SECTION MARKERS (2.0s DELAY) */}
        {/* ================================================================= */}
        <g opacity="0.8" style={getFadeStyle(1600)}>
          {/* Overall Horizontal Dimension Line (Top) */}
          <g transform="translate(0, 115)">
            <line x1="620" y1="0" x2="1260" y2="0" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            {/* Tick Marks */}
            <line x1="620" y1="-5" x2="620" y2="5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="780" y1="-4" x2="780" y2="4" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="940" y1="-4" x2="940" y2="4" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="1100" y1="-4" x2="1100" y2="4" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="1260" y1="-5" x2="1260" y2="5" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
            {/* Dimension Text */}
            <rect x="900" y="-9" width="80" height="18" fill="#050505" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
            <text x="940" y="3" textAnchor="middle" fill="#D4AF37" fillOpacity="0.8" fontSize="9" fontFamily="monospace">
              64'-0" OVERALL
            </text>
          </g>

          {/* Sub-Dimension Line (Segment 1) */}
          <g transform="translate(0, 130)">
            <line x1="620" y1="0" x2="780" y2="0" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="620" y1="-3" x2="620" y2="3" stroke="#D4AF37" strokeWidth="0.8" />
            <line x1="780" y1="-3" x2="780" y2="3" stroke="#D4AF37" strokeWidth="0.8" />
            <text x="700" y="-3" textAnchor="middle" fill="#D4AF37" fillOpacity="0.65" fontSize="8" fontFamily="monospace">
              16'-0"
            </text>
          </g>

          {/* Sub-Dimension Line (Segment 2) */}
          <g transform="translate(0, 130)">
            <line x1="780" y1="0" x2="940" y2="0" stroke="#D4AF37" strokeWidth="0.6" strokeOpacity="0.3" />
            <line x1="780" y1="-3" x2="780" y2="3" stroke="#D4AF37" strokeWidth="0.8" />
            <line x1="940" y1="-3" x2="940" y2="3" stroke="#D4AF37" strokeWidth="0.8" />
            <text x="860" y="-3" textAnchor="middle" fill="#D4AF37" fillOpacity="0.65" fontSize="8" fontFamily="monospace">
              16'-0"
            </text>
          </g>

          {/* Vertical Dimension Line (Left Side of Drawing) */}
          <g transform="translate(585, 0)">
            <line x1="0" y1="160" x2="0" y2="730" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.4" />
            <line x1="-5" y1="160" x2="5" y2="160" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
            <line x1="-5" y1="730" x2="5" y2="730" stroke="#D4AF37" strokeWidth="1" strokeOpacity="0.6" />
            <rect x="-10" y="425" width="20" height="70" fill="#050505" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.3" />
            <text
              x="0"
              y="460"
              textAnchor="middle"
              transform="rotate(-90 0 460)"
              fill="#D4AF37"
              fillOpacity="0.8"
              fontSize="9"
              fontFamily="monospace"
            >
              57'-0" HEIGHT
            </text>
          </g>

          {/* Section Cut Callout Marker (S-01 / A-102) */}
          <g transform="translate(700, 250)">
            <circle r="16" fill="#050505" stroke="#D4AF37" strokeWidth="1.2" strokeOpacity="0.6" />
            <line x1="-16" y1="0" x2="16" y2="0" stroke="#D4AF37" strokeWidth="0.8" strokeOpacity="0.6" />
            <polygon points="0,-16 -6,-24 6,-24" fill="#D4AF37" fillOpacity="0.6" />
            <text x="0" y="-4" textAnchor="middle" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold">
              S1
            </text>
            <text x="0" y="10" textAnchor="middle" fill="#D4AF37" fillOpacity="0.7" fontSize="8" fontFamily="monospace">
              A-102
            </text>
          </g>

          {/* Technical Engineering Specifications Box (Right Corner Callout) */}
          <g transform="translate(1000, 600)">
            <rect
              x="0"
              y="0"
              width="230"
              height="100"
              fill="#050505"
              fillOpacity="0.85"
              stroke="#D4AF37"
              strokeWidth="0.8"
              strokeOpacity="0.3"
              rx="2"
            />
            {/* Title */}
            <text x="12" y="20" fill="#D4AF37" fontSize="9" fontFamily="monospace" fontWeight="bold" letterSpacing="1">
              STRUCTURAL SCHEMATIC
            </text>
            <line x1="12" y1="26" x2="218" y2="26" stroke="#D4AF37" strokeWidth="0.5" strokeOpacity="0.2" />

            <text x="12" y="42" fill="#F8F8F8" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
              FOUNDATION: REINFORCED SLAB 12"
            </text>
            <text x="12" y="56" fill="#F8F8F8" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
              FRAMING: W14x90 STRUCTURAL STEEL
            </text>
            <text x="12" y="70" fill="#F8F8F8" fillOpacity="0.6" fontSize="8" fontFamily="monospace">
              CORE: 10" SHEAR CONCRETE WALLS
            </text>
            <text x="12" y="84" fill="#D4AF37" fillOpacity="0.8" fontSize="8" fontFamily="monospace">
              SCALE: 1/8" = 1'-0" | ZONE 4
            </text>
          </g>
        </g>

        {/* ================================================================= */}
        {/* LAYER D: OCCASIONAL SUBTLE GOLD AXIS HIGHLIGHT PULSE */}
        {/* ================================================================= */}
        {!isReducedMotion && (
          <g opacity="0.75">
            {/* Travelling Light Pulse along Main Column Grid C Axis (x=940) */}
            <line
              x1="940"
              y1="140"
              x2="940"
              y2="760"
              stroke="url(#goldPulse)"
              strokeWidth="2.5"
              className="animate-blueprint-pulse"
            />
          </g>
        )}
      </svg>

      {/* Inline Keyframes for Subtle Axis Pulse */}
      <style jsx>{`
        @keyframes blueprintPulse {
          0% {
            stroke-dasharray: 100 800;
            stroke-dashoffset: 800;
          }
          50% {
            stroke-dasharray: 200 800;
            stroke-dashoffset: 0;
          }
          100% {
            stroke-dasharray: 100 800;
            stroke-dashoffset: -800;
          }
        }
        .animate-blueprint-pulse {
          animation: blueprintPulse 7s ease-in-out infinite;
        }
      `}</style>
    </div>
  );
};

export default ArchitecturalCanvas;
