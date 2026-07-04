'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { useTheme } from '../../Context/theme';

const COLORS = ['#FF0080', '#00DFD6', '#E8A33D', '#4a9eff', '#22c55e', '#a855f7', '#f59e0b', '#e85d3a'];

interface Stroke {
  points: { x: number; y: number }[];
  color: string;
  width: number;
}

export default function CanvasPlayground() {
  const { accent } = useTheme();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [drawing, setDrawing] = useState(false);
  const [cleared, setCleared] = useState(false);
  const currentStroke = useRef<Stroke | null>(null);
  const colorIndex = useRef(0);

  const getCanvasSize = useCallback(() => {
    if (!containerRef.current) return { w: 0, h: 0 };
    const rect = containerRef.current.getBoundingClientRect();
    return { w: rect.width, h: Math.min(rect.height, 400) };
  }, []);

  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const { w, h } = getCanvasSize();
    const dpr = window.devicePixelRatio || 1;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(dpr, dpr);
    redraw(ctx, w, h);
  }, [getCanvasSize]);

  const redraw = (ctx: CanvasRenderingContext2D, w: number, h: number) => {
    ctx.clearRect(0, 0, w, h);

    if (cleared) {
      ctx.fillStyle = `${accent}08`;
      ctx.fillRect(0, 0, w, h);
      return;
    }

    const allStrokes = [...strokes, ...(currentStroke.current ? [currentStroke.current] : [])];
    for (const stroke of allStrokes) {
      if (stroke.points.length < 2) continue;
      ctx.beginPath();
      const gradient = ctx.createLinearGradient(
        stroke.points[0].x, stroke.points[0].y,
        stroke.points[stroke.points.length - 1].x, stroke.points[stroke.points.length - 1].y
      );
      gradient.addColorStop(0, stroke.color);
      gradient.addColorStop(1, `${stroke.color}80`);
      ctx.strokeStyle = gradient;
      ctx.lineWidth = stroke.width;
      ctx.lineCap = 'round';
      ctx.lineJoin = 'round';
      ctx.moveTo(stroke.points[0].x, stroke.points[0].y);
      for (let i = 1; i < stroke.points.length; i++) {
        ctx.lineTo(stroke.points[i].x, stroke.points[i].y);
      }
      ctx.stroke();
    }
  };

  useEffect(() => {
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    return () => window.removeEventListener('resize', resizeCanvas);
  }, [resizeCanvas]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const { w, h } = getCanvasSize();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    redraw(ctx, w, h);
  }, [strokes, cleared, accent, getCanvasSize]);

  const getPos = (e: React.TouchEvent | React.MouseEvent | TouchEvent | MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return { x: 0, y: 0 };
    if ('touches' in e) {
      const touch = e.touches[0] || (e as TouchEvent).changedTouches[0];
      return { x: touch.clientX - rect.left, y: touch.clientY - rect.top };
    }
    return { x: (e as MouseEvent).clientX - rect.left, y: (e as MouseEvent).clientY - rect.top };
  };

  const startDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    setCleared(false);
    const pos = getPos(e);
    const color = COLORS[colorIndex.current % COLORS.length];
    colorIndex.current++;
    currentStroke.current = { points: [pos], color, width: 2 + Math.random() * 4 };
    setDrawing(true);
  };

  const moveDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (!drawing || !currentStroke.current) return;
    const pos = getPos(e);
    currentStroke.current.points.push(pos);
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const { w, h } = getCanvasSize();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    redraw(ctx, w, h);
  };

  const endDraw = (e: React.TouchEvent | React.MouseEvent) => {
    e.preventDefault();
    if (currentStroke.current) {
      setStrokes((prev) => [...prev, currentStroke.current!]);
      currentStroke.current = null;
    }
    setDrawing(false);
  };

  const clearCanvas = () => {
    setStrokes([]);
    currentStroke.current = null;
    setCleared(true);
    const canvas = canvasRef.current;
    if (!canvas || !containerRef.current) return;
    const { w, h } = getCanvasSize();
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    redraw(ctx, w, h);
  };

  return (
    <section className="section-grid relative w-full py-20 md:py-24 bg-background vintage-frame">
      <div className="max-w-7xl mx-auto px-8 md:px-14">
        <div className="flex items-center gap-4 mb-8">
          <div className="h-[2px] w-8 rounded-full origin-left" style={{ background: accent }} />
          <span className="apple-eyebrow">Playground</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8">
          <div className="md:col-span-7">
            <h2 className="apple-heading-compact">
              Doodle{' '}
              <span className="font-bold" style={{ color: accent }}>
                Canvas.
              </span>
            </h2>
          </div>
          <div className="md:col-span-5">
            <p className="apple-subtitle text-sm leading-relaxed">
              Draw something — each stroke picks a new color.
            </p>
          </div>
        </div>

        <div
          ref={containerRef}
          className="relative w-full rounded-2xl overflow-hidden border transition-all duration-300"
          style={{
            borderColor: 'rgb(var(--accent-rgb) / 0.15)',
            background: 'rgb(var(--accent-rgb) / 0.03)',
            minHeight: '300px',
          }}
        >
          <canvas
            ref={canvasRef}
            className="block w-full touch-none cursor-crosshair"
            style={{ minHeight: '300px' }}
            onMouseDown={startDraw}
            onMouseMove={moveDraw}
            onMouseUp={endDraw}
            onMouseLeave={endDraw}
            onTouchStart={startDraw}
            onTouchMove={moveDraw}
            onTouchEnd={endDraw}
          />

          <div className="absolute bottom-3 right-3 flex gap-2">
            <button
              onClick={clearCanvas}
              className="px-3 py-1.5 rounded-lg text-[9px] font-bold uppercase tracking-wider transition-all duration-200 hover:scale-105 active:scale-95"
              style={{
                backgroundColor: 'rgb(var(--accent-rgb) / 0.1)',
                color: accent,
                border: '1px solid rgb(var(--accent-rgb) / 0.2)',
              }}
            >
              Clear
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
