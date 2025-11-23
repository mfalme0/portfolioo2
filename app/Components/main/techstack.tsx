import React, { useRef } from 'react';
import { SiMacos, SiAndroid, SiIos, SiLinux, SiProxmox } from 'react-icons/si';
import { FaAws, FaDocker, FaFigma } from 'react-icons/fa';
import { DiMongodb } from 'react-icons/di';
import { RiFirebaseFill } from 'react-icons/ri';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
// 1. IMPORT STARS HERE
import { Float, Box, MeshWobbleMaterial, Stars } from '@react-three/drei';

// --- 1. DATA & CONFIG ---
type ProficiencyType = 'Intermediate' | 'Advanced' | 'Expert';
type ColorType = 'blue' | 'indigo' | 'gray' | 'purple' | 'green' | 'yellow' | 'orange' | 'amber' | 'pink';

interface Technology {
  name: string;
  icon: React.ReactElement;
  proficiency: ProficiencyType;
  color: ColorType;
}

interface ColorMapItem {
  bg: string;
  border: string;
  text: string;
  shadow: string;
}

const technologies: Technology[] = [
  { name: 'MacOS', icon: <SiMacos />, proficiency: 'Intermediate', color: 'gray' },
  { name: 'iOS', icon: <SiIos />, proficiency: 'Expert', color: 'purple' },
  { name: 'Android', icon: <SiAndroid />, proficiency: 'Advanced', color: 'green' },
  { name: 'Linux', icon: <SiLinux />, proficiency: 'Advanced', color: 'yellow' },
  { name: 'AWS', icon: <FaAws />, proficiency: 'Intermediate', color: 'orange' },
  { name: 'MongoDB', icon: <DiMongodb />, proficiency: 'Intermediate', color: 'green' },
  { name: 'Firebase', icon: <RiFirebaseFill />, proficiency: 'Advanced', color: 'amber' },
  { name: 'Docker', icon: <FaDocker />, proficiency: "Advanced", color: 'blue' },
  { name: 'Proxmox', icon: <SiProxmox />, proficiency: "Advanced", color: 'orange' },
  { name: 'Figma', icon: <FaFigma />, proficiency: "Advanced", color: 'pink' },
];

// Helper to map your color names to Tailwind/Hex values for the glow effects
const colorMap: Record<ColorType, ColorMapItem> = {
  blue:   { bg: 'group-hover:bg-blue-500/10', border: 'group-hover:border-blue-500', text: 'text-blue-500', shadow: '#3b82f6' },
  indigo: { bg: 'group-hover:bg-indigo-500/10', border: 'group-hover:border-indigo-500', text: 'text-indigo-500', shadow: '#6366f1' },
  gray:   { bg: 'group-hover:bg-gray-500/10', border: 'group-hover:border-gray-500', text: 'text-gray-400', shadow: '#9ca3af' },
  purple: { bg: 'group-hover:bg-purple-500/10', border: 'group-hover:border-purple-500', text: 'text-purple-500', shadow: '#a855f7' },
  green:  { bg: 'group-hover:bg-green-500/10', border: 'group-hover:border-green-500', text: 'text-green-500', shadow: '#22c55e' },
  yellow: { bg: 'group-hover:bg-yellow-500/10', border: 'group-hover:border-yellow-500', text: 'text-yellow-400', shadow: '#facc15' },
  orange: { bg: 'group-hover:bg-orange-500/10', border: 'group-hover:border-orange-500', text: 'text-orange-500', shadow: '#f97316' },
  amber:  { bg: 'group-hover:bg-amber-500/10', border: 'group-hover:border-amber-500', text: 'text-amber-500', shadow: '#f59e0b' },
  pink:   { bg: 'group-hover:bg-pink-500/10', border: 'group-hover:border-pink-500', text: 'text-pink-500', shadow: '#ec4899' },
};

// --- 2. 3D BACKGROUND COMPONENT ---
// Floating cubes + Stars
const FloatingShapes = () => {
  return (
    <div className="absolute inset-0 overflow-hidden -z-0 pointer-events-none opacity-40">
      <Canvas camera={{ position: [0, 0, 10], fov: 50 }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        
        {/* 2. ADDED STARS HERE */}
        <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />

        <Float speed={2} rotationIntensity={1} floatIntensity={2}>
          <Box position={[-3, 2, 0]} scale={1.5}>
             <MeshWobbleMaterial color="#4f46e5" wireframe speed={1} factor={0.6} />
          </Box>
        </Float>
        <Float speed={3} rotationIntensity={2} floatIntensity={1}>
          <Box position={[4, -2, -2]} scale={1}>
             <MeshWobbleMaterial color="#06b6d4" wireframe speed={1} factor={0.6} />
          </Box>
        </Float>
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <Box position={[-4, -3, 0]} scale={1.2}>
             <MeshWobbleMaterial color="#a855f7" wireframe speed={1} factor={0.6} />
          </Box>
        </Float>
        {/* Tiny particles */}
        {Array.from({ length: 10 }).map((_, i) => (
           <Float key={i} speed={Math.random() * 5} rotationIntensity={Math.random() * 4} floatIntensity={Math.random() * 4}>
             <Box position={[Math.random() * 15 - 7, Math.random() * 10 - 5, Math.random() * 5 - 5]} scale={0.2}>
               <meshStandardMaterial color="white" opacity={0.3} transparent />
             </Box>
           </Float>
        ))}
      </Canvas>
    </div>
  );
};

// --- 3. 3D CARD COMPONENT ---
interface TechCardProps {
  tech: Technology;
}

const TechCard = ({ tech }: TechCardProps) => {
  const colors = colorMap[tech.color] || colorMap.gray;
  
  // 3D Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 150, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    const offset = 20; // Degrees of tilt

    rotateX.set(((clientY - centerY) / height) * -offset);
    rotateY.set(((clientX - centerX) / width) * offset);
    x.set(clientX);
    y.set(clientY);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      style={{ perspective: 1000 }}
      className="relative group"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative w-full h-full p-6 rounded-xl border border-gray-200 dark:border-gray-800 
          bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm shadow-lg 
          transition-colors duration-300 ${colors.border} ${colors.bg}
        `}
      >
        {/* Ambient Background Glow on Hover */}
        <div 
            className="absolute inset-0 -z-10 rounded-xl opacity-0 group-hover:opacity-20 transition-opacity duration-500"
            style={{ background: colors.shadow, filter: 'blur(40px)' }}
        />

        <div style={{ transform: "translateZ(20px)" }} className="flex flex-col items-center">
          <div className={`text-5xl mb-4 ${colors.text} drop-shadow-md transition-transform duration-300 group-hover:scale-110`}>
            {tech.icon}
          </div>
          
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 tracking-wide">
            {tech.name}
          </h2>
          
          <div className="mt-3 w-full bg-gray-200 dark:bg-gray-700 rounded-full h-1.5 overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: tech.proficiency === 'Expert' ? '95%' : tech.proficiency === 'Advanced' ? '75%' : '50%' }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{ backgroundColor: colors.shadow }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1 font-mono uppercase">{tech.proficiency}</p>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 4. MAIN EXPORT ---
export default function TechStack() {
  return (
    <section className="relative w-full py-20 overflow-hidden bg-gray-50 dark:bg-black">
      
      {/* Background Elements */}
      <FloatingShapes />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Tech <span className="text-transparent bg-clip-text bg-blue-400">Arsenal</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            The languages, tools, and frameworks I use to bring ideas to life.
          </p>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.1 // Stagger effect for cards appearing
              }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 sm:gap-8"
        >
          {technologies.map((tech) => (
            <TechCard key={tech.name} tech={tech} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}