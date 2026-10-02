'use client';

import React, { useEffect, useRef } from 'react';

export interface ArchitecturalCanvasProps {
  className?: string;
  heroRef?: React.RefObject<HTMLElement | null>;
}

interface Node {
  x: number;
  y: number;
  vx: number;
  vy: number;
  baseVx: number;
  baseVy: number;
  radius: number;
  opacity: number;
  connectionsCount: number;
}

interface ActivePulse {
  fromIndex: number;
  toIndex: number;
  progress: number;
  speed: number;
}

const GOLD_COLOR = '#D4AF37';
const MAX_CONN_DIST = 170;
const MAX_CONN_DIST_SQ = MAX_CONN_DIST * MAX_CONN_DIST; // 28900
const REPULSION_DIST = 180;
const REPULSION_DIST_SQ = REPULSION_DIST * REPULSION_DIST; // 32400
const MAX_CONNECTIONS_PER_NODE = 3;
const MAX_PULSES = 4;

export const ArchitecturalCanvas: React.FC<ArchitecturalCanvasProps> = ({
  className,
  heroRef,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  // References for mutable animation state to avoid React re-renders
  const nodesRef = useRef<Node[]>([]);
  const pulsesRef = useRef<ActivePulse[]>([]);
  const mouseRef = useRef<{ x: number; y: number; active: boolean }>({
    x: -9999,
    y: -9999,
    active: false,
  });

  const widthRef = useRef<number>(0);
  const heightRef = useRef<number>(0);
  const lastTimeRef = useRef<number>(0);
  const frameIdRef = useRef<number | null>(null);

  const isIntersectingRef = useRef<boolean>(true);
  const isVisibleRef = useRef<boolean>(true);
  const isReducedMotionRef = useRef<boolean>(false);
  const hasHoverRef = useRef<boolean>(true);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Determine container element (passed ref or canvas parent)
    const container =
      (heroRef && heroRef.current) || canvas.parentElement || document.body;

    // Check media queries
    const motionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    isReducedMotionRef.current = motionQuery.matches;

    const hoverQuery = window.matchMedia('(pointer: fine) and (hover: hover)');
    hasHoverRef.current = hoverQuery.matches;

    const handleMotionChange = (e: MediaQueryListEvent) => {
      isReducedMotionRef.current = e.matches;
      if (e.matches) {
        stopLoop();
        drawStatic();
      } else {
        startLoop();
      }
    };

    const handleHoverChange = (e: MediaQueryListEvent) => {
      hasHoverRef.current = e.matches;
      if (!e.matches) {
        mouseRef.current.active = false;
      }
    };

    motionQuery.addEventListener('change', handleMotionChange);
    hoverQuery.addEventListener('change', handleHoverChange);

    // Node Initialization
    const initNodes = (w: number, h: number) => {
      if (w <= 0 || h <= 0) return;
      const targetCount = w < 768 ? 24 : 60;
      const nodes: Node[] = [];

      for (let i = 0; i < targetCount; i++) {
        // Slow architectural drift (0.1 - 0.35 px/frame)
        const angle = Math.random() * Math.PI * 2;
        const speed = 0.1 + Math.random() * 0.25;
        const baseVx = Math.cos(angle) * speed;
        const baseVy = Math.sin(angle) * speed;

        nodes.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: baseVx,
          vy: baseVy,
          baseVx,
          baseVy,
          radius: 1.2 + Math.random() * 0.8, // 1.2px - 2.0px node radius
          opacity: 0.25 + Math.random() * 0.35, // subtle opacity range
          connectionsCount: 0,
        });
      }
      nodesRef.current = nodes;
      pulsesRef.current = [];
    };

    // Static Drawing for Reduced Motion
    const drawStatic = () => {
      const w = widthRef.current;
      const h = heightRef.current;
      if (w <= 0 || h <= 0) return;

      ctx.clearRect(0, 0, w, h);
      const nodes = nodesRef.current;

      // Reset connection counts
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connectionsCount = 0;
      }

      // Static connecting lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.connectionsCount >= MAX_CONNECTIONS_PER_NODE) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.connectionsCount >= MAX_CONNECTIONS_PER_NODE) continue;

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_CONN_DIST_SQ) {
            const alpha = (1 - distSq / MAX_CONN_DIST_SQ) * 0.12;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;
            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();

            nodeA.connectionsCount++;
            nodeB.connectionsCount++;
          }
        }
      }

      // Static Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.fillStyle = `rgba(212, 175, 55, ${node.opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    // Resize Buffer Logic with DPR capping
    const handleResize = () => {
      const rect = container.getBoundingClientRect();
      const newWidth = Math.floor(rect.width || window.innerWidth);
      const newHeight = Math.floor(rect.height || window.innerHeight);

      if (newWidth <= 0 || newHeight <= 0) return;

      const oldWidth = widthRef.current;
      const oldHeight = heightRef.current;

      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      canvas.width = Math.floor(newWidth * dpr);
      canvas.height = Math.floor(newHeight * dpr);
      canvas.style.width = `${newWidth}px`;
      canvas.style.height = `${newHeight}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0); // reset scale
      ctx.scale(dpr, dpr);

      widthRef.current = newWidth;
      heightRef.current = newHeight;

      if (nodesRef.current.length === 0 || oldWidth === 0 || oldHeight === 0) {
        initNodes(newWidth, newHeight);
      } else {
        // Proportionally scale node coordinates on resize
        const scaleX = newWidth / oldWidth;
        const scaleY = newHeight / oldHeight;
        for (let i = 0; i < nodesRef.current.length; i++) {
          const n = nodesRef.current[i];
          n.x *= scaleX;
          n.y *= scaleY;
        }
      }

      if (isReducedMotionRef.current) {
        drawStatic();
      }
    };

    // Pointer event listeners on hero container
    const handlePointerMove = (e: PointerEvent) => {
      if (!hasHoverRef.current || isReducedMotionRef.current) return;
      const rect = container.getBoundingClientRect();
      mouseRef.current.x = e.clientX - rect.left;
      mouseRef.current.y = e.clientY - rect.top;
      mouseRef.current.active = true;
    };

    const handlePointerLeave = () => {
      mouseRef.current.active = false;
      mouseRef.current.x = -9999;
      mouseRef.current.y = -9999;
    };

    container.addEventListener('pointermove', handlePointerMove, { passive: true });
    container.addEventListener('pointerleave', handlePointerLeave, { passive: true });

    // Main Render Loop
    let pulseSpawnCounter = 0;

    const animate = (timestamp: number) => {
      if (!lastTimeRef.current) lastTimeRef.current = timestamp;

      // Elapsed time in seconds, clamped between 0.001 and 0.064s to prevent jump after pause
      const rawDt = (timestamp - lastTimeRef.current) / 1000;
      const dt = Math.min(Math.max(rawDt, 0.001), 0.064);
      lastTimeRef.current = timestamp;

      const timeScale = dt * 60; // normalize to 60fps baseline

      const w = widthRef.current;
      const h = heightRef.current;
      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;
      const mouse = mouseRef.current;

      ctx.clearRect(0, 0, w, h);

      // Reset node connections count per frame
      for (let i = 0; i < nodes.length; i++) {
        nodes[i].connectionsCount = 0;
      }

      // Update Node Positions & Apply Pointer Repulsion
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];

        // Pointer repulsion check (squared distance)
        if (mouse.active && hasHoverRef.current) {
          const dx = node.x - mouse.x;
          const dy = node.y - mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq > 0 && distSq < REPULSION_DIST_SQ) {
            const dist = Math.sqrt(distSq);
            const force = (REPULSION_DIST - dist) / REPULSION_DIST;
            const pushX = (dx / dist) * force * 1.5;
            const pushY = (dy / dist) * force * 1.5;

            node.vx = node.vx * 0.9 + pushX * 0.1;
            node.vy = node.vy * 0.9 + pushY * 0.1;
          }
        }

        // Gradually decay velocity back toward base drift
        node.vx += (node.baseVx - node.vx) * 0.02 * timeScale;
        node.vy += (node.baseVy - node.vy) * 0.02 * timeScale;

        // Apply movement
        node.x += node.vx * timeScale;
        node.y += node.vy * timeScale;

        // Bounce smoothly off boundaries
        if (node.x < 0) {
          node.x = 0;
          node.vx *= -1;
          node.baseVx *= -1;
        } else if (node.x > w) {
          node.x = w;
          node.vx *= -1;
          node.baseVx *= -1;
        }

        if (node.y < 0) {
          node.y = 0;
          node.vy *= -1;
          node.baseVy *= -1;
        } else if (node.y > h) {
          node.y = h;
          node.vy *= -1;
          node.baseVy *= -1;
        }
      }

      // Active Connections Array to collect lines for pulse animation
      const activeConnections: [number, number][] = [];

      // Draw Structural Connection Lines
      for (let i = 0; i < nodes.length; i++) {
        const nodeA = nodes[i];
        if (nodeA.connectionsCount >= MAX_CONNECTIONS_PER_NODE) continue;

        for (let j = i + 1; j < nodes.length; j++) {
          const nodeB = nodes[j];
          if (nodeB.connectionsCount >= MAX_CONNECTIONS_PER_NODE) continue;

          const dx = nodeB.x - nodeA.x;
          const dy = nodeB.y - nodeA.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < MAX_CONN_DIST_SQ) {
            const alpha = (1 - distSq / MAX_CONN_DIST_SQ) * 0.16;
            ctx.strokeStyle = `rgba(212, 175, 55, ${alpha.toFixed(3)})`;
            ctx.lineWidth = 0.8;

            ctx.beginPath();
            ctx.moveTo(nodeA.x, nodeA.y);
            ctx.lineTo(nodeB.x, nodeB.y);
            ctx.stroke();

            nodeA.connectionsCount++;
            nodeB.connectionsCount++;
            activeConnections.push([i, j]);
          }
        }
      }

      // Draw Nodes
      for (let i = 0; i < nodes.length; i++) {
        const node = nodes[i];
        ctx.fillStyle = `rgba(212, 175, 55, ${node.opacity.toFixed(2)})`;
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        ctx.fill();
      }

      // Infrequent, Subtle Line Pulse Animations
      pulseSpawnCounter++;
      if (
        pulseSpawnCounter > 120 &&
        pulses.length < MAX_PULSES &&
        activeConnections.length > 0
      ) {
        pulseSpawnCounter = 0;
        const randomConn =
          activeConnections[
            Math.floor(Math.random() * activeConnections.length)
          ];
        pulses.push({
          fromIndex: randomConn[0],
          toIndex: randomConn[1],
          progress: 0,
          speed: 0.008 + Math.random() * 0.006, // subtle travel speed
        });
      }

      // Render & Update Active Pulses
      for (let p = pulses.length - 1; p >= 0; p--) {
        const pulse = pulses[p];
        pulse.progress += pulse.speed * timeScale;

        if (pulse.progress >= 1) {
          pulses.splice(p, 1);
          continue;
        }

        const nodeA = nodes[pulse.fromIndex];
        const nodeB = nodes[pulse.toIndex];

        if (nodeA && nodeB) {
          const px = nodeA.x + (nodeB.x - nodeA.x) * pulse.progress;
          const py = nodeA.y + (nodeB.y - nodeA.y) * pulse.progress;

          // Pulse opacity peaks mid-travel
          const pulseAlpha = Math.sin(pulse.progress * Math.PI) * 0.45;

          ctx.fillStyle = `rgba(243, 229, 171, ${pulseAlpha.toFixed(3)})`;
          ctx.beginPath();
          ctx.arc(px, py, 1.8, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      frameIdRef.current = requestAnimationFrame(animate);
    };

    const startLoop = () => {
      if (
        frameIdRef.current !== null ||
        isReducedMotionRef.current ||
        !isIntersectingRef.current ||
        !isVisibleRef.current
      ) {
        return;
      }
      lastTimeRef.current = performance.now();
      frameIdRef.current = requestAnimationFrame(animate);
    };

    const stopLoop = () => {
      if (frameIdRef.current !== null) {
        cancelAnimationFrame(frameIdRef.current);
        frameIdRef.current = null;
      }
    };

    // ResizeObserver for Container Sizing
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    // IntersectionObserver for Offscreen Pause
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        isIntersectingRef.current = entry?.isIntersecting ?? true;
        if (isIntersectingRef.current) {
          startLoop();
        } else {
          stopLoop();
        }
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Document Visibility Listener
    const handleVisibilityChange = () => {
      isVisibleRef.current = !document.hidden;
      if (!document.hidden) {
        startLoop();
      } else {
        stopLoop();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Initial setup & start loop
    handleResize();
    if (!isReducedMotionRef.current) {
      startLoop();
    }

    // Cleanup on unmount or re-effect
    return () => {
      stopLoop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      motionQuery.removeEventListener('change', handleMotionChange);
      hoverQuery.removeEventListener('change', handleHoverChange);
      container.removeEventListener('pointermove', handlePointerMove);
      container.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [heroRef]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      tabIndex={-1}
      className={`absolute inset-0 w-full h-full pointer-events-none z-10 ${
        className || ''
      }`}
    />
  );
};

export default ArchitecturalCanvas;
