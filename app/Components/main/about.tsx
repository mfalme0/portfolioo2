'use client';

import React, { useRef, Suspense } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera } from "@react-three/drei";
import { FaLaptopCode, FaServer, FaMobileAlt } from "react-icons/fa";
import { SiLinux } from "react-icons/si";
import * as THREE from "three";

// --- SYSTEM DOMAINS ---
const domains = [
  { title: "FRONTEND_ENGINEERING", icon: <FaLaptopCode />, desc: "React / Next.js / Vue / Tailwind" },
  { title: "BACKEND_SYSTEMS", icon: <FaServer />, desc: "Node.js / Express / C# / Python" },
  { title: "MOBILE_PROTOCOLS", icon: <FaMobileAlt />, desc: "Kotlin / Flutter / Cross-platform" },
  { title: "INFRASTRUCTURE", icon: <SiLinux />, desc: "Proxmox / Docker / Linux Virtualization" },
];

// --- BACKGROUND SHARD ---
const ShardEntity = () => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
      meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.04;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.4}>
      <mesh ref={meshRef}>
        <icosahedronGeometry args={[4, 1]} />
        <meshStandardMaterial color="#ffffff" wireframe transparent opacity={0.025} />
      </mesh>
    </Float>
  );
};

export default function AboutMe() {
  return (
    <section className="relative w-full py-40 bg-[#050505] overflow-hidden">
      
      {/* Noise */}
      <div className="absolute inset-0 z-[1] opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')]"></div>

      {/* 3D Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <ambientLight intensity={0.5} />
          <pointLight position={[10, 10, 10]} intensity={1} />
          <Suspense fallback={null}>
            <ShardEntity />
          </Suspense>
        </Canvas>
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-8 text-center space-y-24">
        
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <span className="text-[10px] tracking-[0.5em] text-zinc-500 uppercase">
            Identity Overview
          </span>

          <h2 className="text-5xl md:text-7xl font-medium text-white tracking-tight">
            Engineering at the
            <span className="block text-zinc-600 italic font-light">
              Systems Level.
            </span>
          </h2>

          <p className="text-zinc-400 text-lg font-light leading-relaxed max-w-2xl mx-auto">
            Architecting scalable digital products with a strong focus on performance,
            modularity, and visual precision. I build systems designed to evolve,
            adapt, and solve real-world consumer challenges.
          </p>
        </motion.header>

        {/* Capability Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
          {domains.map((domain, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-8 bg-zinc-950/40 backdrop-blur-xl border border-white/5 hover:border-white/20 transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-6">
                <span className="text-zinc-600 group-hover:text-cyan-400 transition-colors text-xl">
                  {domain.icon}
                </span>
                <div className="w-1 h-1 rounded-full bg-zinc-800" />
              </div>

              <h3 className="text-[11px] font-bold tracking-[0.3em] text-zinc-500 uppercase mb-3">
                {domain.title}
              </h3>

              <p className="text-[13px] text-zinc-400 font-mono leading-relaxed">
                {domain.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Footer Metadata */}
        <div className="pt-12 border-t border-white/5 flex flex-col items-center gap-2">
          <span className="text-[9px] text-zinc-600 tracking-widest uppercase font-mono">
            Current_Location
          </span>
          <span className="text-[11px] text-zinc-400 tracking-widest uppercase font-mono">
            Nairobi // Kenya
          </span>
        </div>

      </div>
    </section>
  );
}