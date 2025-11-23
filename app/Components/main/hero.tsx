'use client';
import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import profile from '../Images/Mfalme.jpg'; // Ensure path is correct
import { FaArrowDown, FaGithub, FaLinkedin, FaGamepad } from 'react-icons/fa';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TypeAnimation } from 'react-type-animation';
import { Canvas, useFrame, RootState } from '@react-three/fiber';
import { Stars, Sphere, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// --- 1. TASTEFUL 3D BACKGROUND COMPONENT ---
// A floating, distorted sphere that reacts to time/color
interface AnimatedBackgroundProps {
  color: string;
}

interface AnimatedSphereProps {
  color: string;
}

const AnimatedBackground = ({ color }: AnimatedBackgroundProps) => {
  return (
    <div className="absolute inset-0 -z-0">
      <Canvas>
        <ambientLight intensity={0.5} />
        <directionalLight position={[2, 5, 2]} intensity={1} />
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
        <AnimatedSphere color={color} />
      </Canvas>
    </div>
  );
};

const AnimatedSphere = ({ color }: AnimatedSphereProps) => {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state: RootState) => {
    if (!mesh.current) return;
    
    // Subtle rotation and movement
    const t = state.clock.getElapsedTime();
    mesh.current.rotation.x = t * 0.2;
    mesh.current.rotation.y = t * 0.2;
    mesh.current.position.y = Math.sin(t / 1.5) / 10;
  });

  return (
    <Sphere visible args={[1, 100, 200]} scale={2.5} ref={mesh}>
      <MeshDistortMaterial
        color={color}
        attach="material"
        distort={0.4} // Strength of distortion
        speed={1.5}   // Speed of distortion
        roughness={0.2}
        transparent
        opacity={0.8}
      />
    </Sphere>
  );
};

// --- 2. MAIN HERO COMPONENT ---
export function Hero() {
  const [greeting, setGreeting] = useState('');
  const [themeColor, setThemeColor] = useState('#4f46e5'); // Default purple/blue
  const [bgGradient, setBgGradient] = useState('from-blue-900 to-slate-900');

  // Scroll parallax effect for text
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 300], [0, 100]);
  const y2 = useTransform(scrollY, [0, 300], [0, -100]);

  useEffect(() => {
    const hour = new Date().getHours();

    if (hour < 12) {
      setGreeting('Good Morning! 🌞');
      setThemeColor('#f59e0b'); // Amber
      setBgGradient('from-yellow-900/80 to-black');
    } else if (hour < 18) {
      setGreeting('Good Afternoon! 🌤️');
      setThemeColor('#06b6d4'); // Cyan
      setBgGradient('from-blue-900/80 to-black');
    } else if (hour < 20) {
      setGreeting('Good Evening! 🌇');
      setThemeColor('#a855f7'); // Purple
      setBgGradient('from-purple-900/80 to-black');
    } else {
      setGreeting('Good Night! 🌙');
      setThemeColor('#6366f1'); // Indigo
      setBgGradient('from-slate-900 to-black');
    }
  }, []);

  return (
    <section className={`relative w-full h-screen overflow-hidden flex flex-col items-center justify-center bg-gradient-to-b ${bgGradient}`}>
      
      {/* 3D Background Layer */}
      <div className="absolute inset-0 w-full h-full opacity-60">
        <AnimatedBackground color={themeColor} />
      </div>

      {/* Content Container */}
      <div className="z-10 relative w-full max-w-6xl px-6 flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* LEFT: Text Content */}
        <motion.div 
          style={{ y: y1 }}
          className="flex-1 text-center md:text-left space-y-6"
        >
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-xl sm:text-2xl font-medium text-gray-300 tracking-widest uppercase mb-2">
              {greeting}
            </h2>
            <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold text-white tracking-tight leading-tight">
              I&lsquo;m <span style={{ color: themeColor }} className="drop-shadow-lg glow-text">Joseph Gitau</span>
            </h1>
          </motion.div>

          {/* Type Animation for Roles */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="text-2xl sm:text-3xl text-gray-200 font-mono h-12"
          >
            <TypeAnimation
              sequence={[
                'Software Engineer',
                2000,
                'Passionate Gamer',
                2000,
                'Tech Enthusiast',
                2000,
              ]}
              wrapper="span"
              speed={50}
              repeat={Infinity}
            />
          </motion.div>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
            className="text-lg text-gray-400 max-w-lg mx-auto md:mx-0 leading-relaxed"
          >
             Welcome to my digital portfolio. A space where creativity meets technology, and innovation comes to life.
          </motion.p>

          {/* Social Icons / Buttons */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex gap-4 justify-center md:justify-start pt-4"
          >
             <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <FaGithub /> GitHub
             </button>
             <button className="px-6 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-full text-white hover:bg-white/20 transition-all flex items-center gap-2">
                <FaLinkedin /> LinkedIn
             </button>
          </motion.div>
        </motion.div>

        {/* RIGHT: 3D Tilt Image Card */}
        <motion.div 
          style={{ y: y2 }}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="flex-1 flex justify-center relative group"
        >
          {/* Glowing circle behind image */}
          <div 
            style={{ background: themeColor }} 
            className="absolute inset-0 blur-[100px] opacity-40 rounded-full transform scale-75" 
          />
          
          <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-full border-4 border-white/10 backdrop-blur-sm overflow-hidden shadow-2xl">
             <Image
                src={profile}
                alt="Joseph Gitau"
                fill
                style={{ objectFit: 'cover' }}
                className="hover:scale-110 transition-transform duration-700 ease-in-out grayscale hover:grayscale-0"
                priority
             />
             {/* Gamer badge overlay */}
             <div className="absolute bottom-4 right-10 bg-black/60 backdrop-blur-md p-2 rounded-full text-white border border-white/20">
                <FaGamepad className="text-2xl animate-pulse" style={{ color: themeColor }}/>
             </div>
          </div>
        </motion.div>
      </div>

      {/* Bottom Arrow */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-10 z-20"
      >
        <a href="#about" className="flex flex-col items-center gap-2 group cursor-pointer">
          <span className="text-xs uppercase tracking-widest text-gray-500 group-hover:text-white transition-colors">Scroll Down</span>
          <FaArrowDown className="animate-bounce text-white text-xl opacity-70 group-hover:opacity-100" />
        </a>
      </motion.div>
    </section>
  );
}