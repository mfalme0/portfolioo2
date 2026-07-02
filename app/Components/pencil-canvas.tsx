'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';

interface Point {
  x: number;
  y: number;
  time: number;
}

export function PencilCanvas({ active }: { active: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const trailCanvasRef = useRef<HTMLCanvasElement>(null);
  const trailPointsRef = useRef<Point[]>([]);
  const currentStrokeRef = useRef<Point[]>([]);
  const drawingRef = useRef(false);
  const animFrameRef = useRef<number>(0);
  const [mode, setMode] = useState<'draw' | 'erase'>('draw');

  const toggleMode = useCallback(() => {
    setMode((m) => (m === 'draw' ? 'erase' : 'draw'));
  }, []);

  useEffect(() => {
    if (!active) return;
    setMode('draw');
  }, [active]);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    const trailCanvas = trailCanvasRef.current;
    if (!canvas || !trailCanvas) return;

    const ctx = canvas.getContext('2d');
    const trailCtx = trailCanvas.getContext('2d');
    if (!ctx || !trailCtx) return;

    let isErasing = mode === 'erase';

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      trailCanvas.width = window.innerWidth;
      trailCanvas.height = window.innerHeight;
    };

    const getPos = (e: PointerEvent): Point => ({
      x: e.clientX,
      y: e.clientY,
      time: Date.now(),
    });

    const drawTrail = () => {
      trailCtx.clearRect(0, 0, trailCanvas.width, trailCanvas.height);
      const now = Date.now();
      trailPointsRef.current = trailPointsRef.current.filter(
        (p) => now - p.time < 600
      );

      if (trailPointsRef.current.length < 2) {
        animFrameRef.current = requestAnimationFrame(drawTrail);
        return;
      }

      const trailColor = isErasing ? '#ffffff' : '#e85d3a';

      for (let i = 1; i < trailPointsRef.current.length; i++) {
        const p0 = trailPointsRef.current[i - 1];
        const p1 = trailPointsRef.current[i];
        const age = (now - p1.time) / 600;
        const alpha = Math.max(0, 1 - age) * 0.3;

        trailCtx.beginPath();
        trailCtx.moveTo(p0.x, p0.y);
        trailCtx.lineTo(p1.x, p1.y);
        trailCtx.strokeStyle = trailColor;
        trailCtx.lineWidth = isErasing ? 20 : 1;
        trailCtx.lineCap = 'round';
        trailCtx.globalAlpha = alpha;
        trailCtx.stroke();
      }
      trailCtx.globalAlpha = 1;

      for (const p of trailPointsRef.current) {
        const age = (now - p.time) / 600;
        const alpha = Math.max(0, 1 - age) * 0.5;
        trailCtx.beginPath();
        trailCtx.arc(p.x, p.y, isErasing ? 10 : 1, 0, Math.PI * 2);
        trailCtx.fillStyle = trailColor;
        trailCtx.globalAlpha = alpha;
        trailCtx.fill();
      }
      trailCtx.globalAlpha = 1;

      animFrameRef.current = requestAnimationFrame(drawTrail);
    };

    const handlePointerMove = (e: PointerEvent) => {
      const pos = getPos(e);
      trailPointsRef.current.push(pos);

      if (drawingRef.current && currentStrokeRef.current.length >= 2) {
        const prev = currentStrokeRef.current[currentStrokeRef.current.length - 1];
        const curr = pos;

        ctx.beginPath();
        ctx.moveTo(prev.x, prev.y);
        ctx.lineTo(curr.x, curr.y);

        if (isErasing) {
          ctx.globalCompositeOperation = 'destination-out';
          ctx.strokeStyle = 'rgba(0,0,0,1)';
          ctx.lineWidth = 30;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = 1;
          ctx.stroke();
          ctx.globalCompositeOperation = 'source-over';
        } else {
          ctx.strokeStyle = '#e85d3a';
          ctx.lineWidth = 1.5;
          ctx.lineCap = 'round';
          ctx.lineJoin = 'round';
          ctx.globalAlpha = 0.6;
          ctx.stroke();
          ctx.globalAlpha = 1;
        }

        currentStrokeRef.current.push(pos);
      } else if (drawingRef.current) {
        currentStrokeRef.current.push(pos);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      drawingRef.current = true;
      const pos = getPos(e);
      currentStrokeRef.current = [pos];
      trailPointsRef.current.push(pos);
    };

    const handlePointerUp = () => {
      currentStrokeRef.current = [];
      drawingRef.current = false;
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'e' || e.key === 'E') {
        toggleMode();
      }
    };

    isErasing = mode === 'erase';
    resize();
    window.addEventListener('resize', resize);
    document.addEventListener('pointermove', handlePointerMove);
    document.addEventListener('pointerdown', handlePointerDown);
    document.addEventListener('pointerup', handlePointerUp);
    document.addEventListener('keydown', handleKeyDown);
    animFrameRef.current = requestAnimationFrame(drawTrail);

    return () => {
      window.removeEventListener('resize', resize);
      document.removeEventListener('pointermove', handlePointerMove);
      document.removeEventListener('pointerdown', handlePointerDown);
      document.removeEventListener('pointerup', handlePointerUp);
      document.removeEventListener('keydown', handleKeyDown);
      cancelAnimationFrame(animFrameRef.current);
    };
  }, [active, mode, toggleMode]);

  if (!active) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 z-[60] pointer-events-none"
        style={{ touchAction: 'none' }}
      />
      <canvas
        ref={trailCanvasRef}
        className="fixed inset-0 z-[59] pointer-events-none"
        style={{ touchAction: 'none' }}
      />
      <button
        onClick={toggleMode}
        className="fixed bottom-24 left-6 z-[70] w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold uppercase tracking-wider transition-all duration-300 hover:scale-110"
        style={{
          backgroundColor: mode === 'erase' ? '#e85d3a' : 'var(--color-surface)',
          color: mode === 'erase' ? '#fff' : 'var(--color-foreground)',
          border: '1px solid var(--color-border)',
        }}
        title={`${mode === 'draw' ? 'Eraser' : 'Pencil'} (E)`}
        aria-label={`Switch to ${mode === 'draw' ? 'eraser' : 'pencil'}`}
      >
        {mode === 'draw' ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M20 20H4M18 4l4 4-14 14H4v-4L18 4z" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <rect x="4" y="4" width="16" height="16" rx="2" />
          </svg>
        )}
      </button>
      {mode === 'erase' && (
        <div
          className="fixed bottom-24 left-6 z-[69] text-[8px] font-bold tracking-wider uppercase px-3 py-1 rounded-full"
          style={{
            backgroundColor: '#e85d3a',
            color: '#fff',
            transform: 'translateY(28px)',
          }}
        >
          Eraser
        </div>
      )}
    </>
  );
}
