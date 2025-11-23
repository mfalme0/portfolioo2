"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { Dodecahedron, MeshDistortMaterial, Float } from "@react-three/drei";
import * as THREE from "three";

// --- 1. 3D SPINNER COMPONENT ---
interface LoadingCoreProps {
  progress: number;
}

const LoadingCore = ({ progress }: LoadingCoreProps) => {
  const meshRef = React.useRef<THREE.Mesh>(null);

  useFrame((state: RootState) => {
    // Rotation speed increases as progress completes
    const speed = 1 + (progress / 100) * 5;
    const t = state.clock.getElapsedTime();
    
    if (meshRef.current) {
      meshRef.current.rotation.x = t * speed * 0.5;
      meshRef.current.rotation.y = t * speed * 0.8;
    }
  });

  return (
    <Float speed={2} rotationIntensity={1} floatIntensity={1}>
      <Dodecahedron args={[1, 0]} ref={meshRef} scale={1.8}>
        {/* Material changes color slightly as it loads */}
        <MeshDistortMaterial
          color={progress === 100 ? "#10b981" : "#4f46e5"} // Green when done, Blue/Purple while loading
          wireframe
          distort={0.3}
          speed={2}
          roughness={0}
        />
      </Dodecahedron>
    </Float>
  );
};

// --- 2. MAIN PRELOADER COMPONENT ---
interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [progress, setProgress] = useState(0);
  const [message, setMessage] = useState("Initializing System...");
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading progress
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + Math.floor(Math.random() * 10) + 1;
        
        // Update status messages based on percentage
        if (next > 30 && next < 60) setMessage("Loading Modules...");
        if (next > 60 && next < 90) setMessage("Compiling Assets...");
        if (next > 90) setMessage("System Ready.");

        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => setIsLoading(false), 500); // Small delay before unmounting
          return 100;
        }
        return next;
      });
    }, 150); // Adjust speed here

    return () => clearInterval(timer);
  }, []);

  return (
    <AnimatePresence mode="wait" onExitComplete={onComplete}>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, y: -50, transition: { duration: 0.8, ease: "easeInOut" } }}
          className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black overflow-hidden"
        >
          {/* 3D Scene Layer */}
          <div className="absolute inset-0 z-0">
            <Canvas camera={{ position: [0, 0, 5] }}>
              <ambientLight intensity={1} />
              <pointLight position={[10, 10, 10]} intensity={2} />
              <LoadingCore progress={progress} />
            </Canvas>
          </div>

          {/* UI Layer */}
          <div className="z-10 flex flex-col items-center justify-end h-full pb-20 w-full max-w-md px-6">
            
            {/* Percentage - Large Glitch Text */}
            <h1 className="text-6xl md:text-8xl font-black text-white font-mono tracking-tighter mb-4 opacity-90">
              {progress}%
            </h1>

            {/* Status Message */}
            <p className="text-indigo-400 font-mono text-sm uppercase tracking-widest mb-6 animate-pulse">
              &gt; {message}
            </p>

            {/* Progress Bar Container */}
            <div className="w-full h-1 bg-gray-800 rounded-full overflow-hidden">
              <motion.div 
                className="h-full bg-gradient-to-r from-indigo-500 to-green-400"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ type: "spring", stiffness: 50 }}
              />
            </div>

            {/* Footer Tech Text */}
            <div className="mt-4 flex justify-between w-full text-[10px] text-gray-600 font-mono uppercase">
               <span>Mem: 64TB</span>
               <span>Ver: 2.0.4</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}