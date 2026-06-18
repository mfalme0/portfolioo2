'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

export type QualityTier = 'low' | 'medium' | 'high';

interface PerformanceContextType {
  tier: QualityTier;
  particleMultiplier: number;
  geometryDetail: number;
  enableShadows: boolean;
  enableEnvironment: boolean;
  transmissionQuality: number;
  dpr: [number, number];
  antialias: boolean;
  reducedEffects: boolean;
  disable3D: boolean;
}

function detectTier(): QualityTier {
  if (typeof window === 'undefined') return 'high';
  const mem = (navigator as any).deviceMemory;
  const cores = navigator.hardwareConcurrency;
  const isMobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
  const isLowPerf = /Android|iPhone|iPad|iPod|Linux armv/i.test(navigator.userAgent + ' ' + navigator.platform);

  if (mem !== undefined && mem <= 4) return 'low';
  if (cores !== undefined && cores <= 4) return 'low';
  if (isLowPerf && isMobile) return 'low';
  if (isMobile) return 'medium';
  if (mem !== undefined && mem <= 6) return 'medium';
  if (cores !== undefined && cores <= 6) return 'medium';
  return 'high';
}

const tiers: Record<QualityTier, Omit<PerformanceContextType, 'tier'>> = {
  low: {
    particleMultiplier: 0.1,
    geometryDetail: 1,
    enableShadows: false,
    enableEnvironment: false,
    transmissionQuality: 1,
    dpr: [1, 1],
    antialias: false,
    reducedEffects: true,
    disable3D: true,
  },
  medium: {
    particleMultiplier: 0.3,
    geometryDetail: 2,
    enableShadows: false,
    enableEnvironment: false,
    transmissionQuality: 3,
    dpr: [1, 1.25],
    antialias: true,
    reducedEffects: false,
    disable3D: false,
  },
  high: {
    particleMultiplier: 0.7,
    geometryDetail: 3,
    enableShadows: true,
    enableEnvironment: true,
    transmissionQuality: 6,
    dpr: [1, 1.5],
    antialias: true,
    reducedEffects: false,
    disable3D: false,
  },
};

const PerformanceContext = createContext<PerformanceContextType>({
  tier: 'high',
  ...tiers.high,
});

export function PerformanceProvider({ children }: { children: ReactNode }) {
  const [tier, setTier] = useState<QualityTier>('high');

  useEffect(() => {
    const t = detectTier();
    setTier(t);
    document.documentElement.dataset.perf = t;
  }, []);

  return (
    <PerformanceContext.Provider value={{ tier, ...tiers[tier] }}>
      {children}
    </PerformanceContext.Provider>
  );
}

export const usePerformance = () => useContext(PerformanceContext);
