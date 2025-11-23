'use client';

import React, { useRef } from 'react';
import { BsSteam, BsLinkedin, BsTwitch, BsTwitterX, BsInstagram, BsDiscord, BsGithub } from "react-icons/bs";

import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { Plane, Stars } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. DATA & CONFIG ---
interface SocialData {
  icon: React.ReactElement;
  url: string;
  color: string;
  label: string;
}

const socials: SocialData[] = [
  { icon: <BsGithub />, url: "https://github.com/mfalme0", color: "#ffffff", label: "GitHub" },
  { icon: <BsLinkedin />, url: "https://www.linkedin.com/in/joseph-g-471678208/", color: "#0077b5", label: "LinkedIn" },
  { icon: <BsTwitch />, url: "https://twitch.tv/joe_mfalme", color: "#9146ff", label: "Twitch" },
  { icon: <BsSteam />, url: "https://steamcommunity.com/profiles/76561199234397892", color: "#1b2838", label: "Steam" },
  { icon: <BsTwitterX />, url: "https://x.com/joemfalme001", color: "#ffffff", label: "X" },
  { icon: <BsInstagram />, url: "https://www.instagram.com/mfalme.01/", color: "#E1306C", label: "Instagram" },
  { icon: <BsDiscord />, url: "https://discord.gg/rHF5c4mCYS", color: "#5865F2", label: "Discord" },
];

// --- 2. MOVING GRID (Synthwave) ---
const MovingGrid = () => {
  const gridRef = useRef<THREE.Mesh>(null);

  useFrame((state: RootState) => {
    if (gridRef.current) {
      gridRef.current.position.z = (state.clock.getElapsedTime() * 0.5) % 2;
    }
  });

  return (
    <group>
      <Plane
        ref={gridRef}
        args={[40, 40, 40, 40]}
        position={[0, -2, 0]}
        rotation={[-Math.PI / 2, 0, 0]}
      >
        <meshStandardMaterial color="#1a1a1a" wireframe emissive="#4f46e5" emissiveIntensity={0.5} />
      </Plane>
    </group>
  );
};

// --- 3. MAGNETIC ICON ---
const SocialButton = ({ data }: { data: SocialData }) => {
  const ref = useRef<HTMLAnchorElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const mouseXSpring = useSpring(x, { stiffness: 150, damping: 15 });
  const mouseYSpring = useSpring(y, { stiffness: 150, damping: 15 });

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    x.set((e.clientX - rect.left) / rect.width - 0.5 * 15);
    y.set((e.clientY - rect.top) / rect.height - 0.5 * 15);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.a
      ref={ref}
      href={data.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ x: mouseXSpring, y: mouseYSpring }}
      className="relative group p-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      <div
        className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-60 blur-md transition-opacity duration-300"
        style={{ backgroundColor: data.color }}
      />

      <span className="absolute -top-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity text-xs font-mono bg-black/80 px-2 py-1 rounded text-white whitespace-nowrap border border-white/20">
        {data.label}
      </span>
    </motion.a>
  );
};

// --- 4. FOOTER WITH BACK-TO-TOP BUTTON ---
export default function Footer() {





  return (
    <footer className="relative w-full flex flex-col items-center justify-center bg-black overflow-hidden">
      {/* 3D Scene */}
      <div className="absolute inset-0 z-0">
        <Canvas camera={{ position: [0, 1, 5], fov: 60 }}>
          <ambientLight intensity={0.5} />
          <Stars radius={200} depth={200} count={3000} factor={4} fade={false} speed={1} />
          <MovingGrid />
        </Canvas>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full px-4 py-20">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
            Connect <span className="text-indigo-500">Currently</span>
          </h2>
          <p className="text-gray-400 text-sm max-w-md mx-auto">
            Whether it&lsquo;s code, gaming, or tech, find me on these platforms.
          </p>
        </motion.div>

        <div className="flex flex-wrap justify-center gap-6 mb-12">
          {socials.map((social, idx) => (
            <SocialButton key={idx} data={social} />
          ))}
        </div>

        <div className="w-full text-center">
          <p className="text-gray-600 text-xs font-mono uppercase tracking-widest">
            &copy; {new Date().getFullYear()} Joseph Gitau. <span className="text-indigo-900">System Online</span>.
          </p>
        </div>
      </div>

      {/* Back to Top */}

    </footer>
  );
}
