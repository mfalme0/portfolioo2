import React from 'react';
import { FaJava, FaPython, FaJs, FaReact, FaNodeJs, FaHtml5, FaCss3Alt, FaVuejs } from 'react-icons/fa';
import {  SiFlutter, SiKotlin, SiNextdotjs, SiCplusplus } from 'react-icons/si';
import { motion, useMotionValue, useSpring } from 'framer-motion';
import { TbBrandCSharp } from "react-icons/tb";
import { Canvas } from '@react-three/fiber';
import { Float, TorusKnot, MeshDistortMaterial, Stars } from '@react-three/drei';

// --- 1. DATA & COLOR MAPPING ---
type ColorType = 'orange' | 'blue' | 'yellow' | 'cyan' | 'green' | 'purple' | 'gray';

interface Language {
  name: string;
  icon: React.ReactElement;
  proficiency: number;
  color: ColorType;
}

interface ColorMapItem {
  text: string;
  border: string;
  shadow: string;
  bg: string;
}

const languages: Language[] = [
  { name: 'Java', icon: <FaJava />, proficiency: 60, color: 'orange' }, // Converted proficiency to %
  { name: 'Python', icon: <FaPython />, proficiency: 65, color: 'blue' },
  { name: 'JavaScript', icon: <FaJs />, proficiency: 90, color: 'yellow' },
  { name: 'React', icon: <FaReact />, proficiency: 90, color: 'cyan' }, // Changed to cyan for React blue
  { name: 'Node.js', icon: <FaNodeJs />, proficiency: 85, color: 'green' },
  { name: 'HTML5', icon: <FaHtml5 />, proficiency: 95, color: 'orange' },
  { name: 'CSS3', icon: <FaCss3Alt />, proficiency: 90, color: 'blue' },
  { name: 'C#', icon: <TbBrandCSharp />, proficiency: 80, color: 'purple' },
  { name: 'Flutter', icon: <SiFlutter />, proficiency: 75, color: 'cyan' },
  { name: 'Kotlin', icon: <SiKotlin />, proficiency: 70, color: 'orange' },
  { name: 'NextJS', icon: <SiNextdotjs />, proficiency: 85, color: 'gray' },
  { name: 'C++', icon: <SiCplusplus />, proficiency: 75, color: 'blue' },
  { name: 'VueJS', icon: <FaVuejs />, proficiency: 60, color: 'green' },
];

const colorMap: Record<ColorType, ColorMapItem> = {
  orange: { text: 'text-orange-500', border: 'group-hover:border-orange-500', shadow: '#f97316', bg: 'bg-orange-500' },
  blue:   { text: 'text-blue-600', border: 'group-hover:border-blue-600', shadow: '#2563eb', bg: 'bg-blue-600' },
  yellow: { text: 'text-yellow-400', border: 'group-hover:border-yellow-400', shadow: '#facc15', bg: 'bg-yellow-400' },
  cyan:   { text: 'text-cyan-400', border: 'group-hover:border-cyan-400', shadow: '#22d3ee', bg: 'bg-cyan-400' },
  green:  { text: 'text-green-500', border: 'group-hover:border-green-500', shadow: '#22c55e', bg: 'bg-green-500' },
  purple: { text: 'text-purple-500', border: 'group-hover:border-purple-500', shadow: '#a855f7', bg: 'bg-purple-500' },
  gray:   { text: 'text-gray-400', border: 'group-hover:border-gray-400', shadow: '#94a3b8', bg: 'bg-gray-400' },
};

// --- 2. 3D BACKGROUND COMPONENT ---
const AnimatedBackground = () => {
  return (
    <div className="absolute inset-0 -z-0 opacity-20 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <Stars radius={50} depth={50} count={3000} factor={4} fade speed={1} />
        
        {/* A complex knot representing logic/code structure */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={1.5}>
          <TorusKnot args={[1, 0.3, 128, 16]} scale={1.2}>
            <MeshDistortMaterial 
              color="#4f46e5" 
              wireframe 
              distort={0.3} 
              speed={2} 
              roughness={0} 
            />
          </TorusKnot>
        </Float>
      </Canvas>
    </div>
  );
};

// --- 3. 3D CARD COMPONENT ---
interface LanguageCardProps {
  lang: Language;
}

const LanguageCard = ({ lang }: LanguageCardProps) => {
  const colors = colorMap[lang.color] || colorMap.gray;
  
  // Physics Tilt
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });
  const rotateY = useSpring(useMotionValue(0), { stiffness: 200, damping: 20 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const { currentTarget, clientX, clientY } = event;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();
    const centerX = left + width / 2;
    const centerY = top + height / 2;
    
    rotateX.set(((clientY - centerY) / height) * -25);
    rotateY.set(((clientX - centerX) / width) * 25);
  }

  function handleMouseLeave() {
    rotateX.set(0);
    rotateY.set(0);
  }

  // Calculate Label based on %
  const getLabel = (pct: number): string => {
    if (pct >= 90) return "Master";
    if (pct >= 75) return "Advanced";
    return "Intermediate";
  };

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, scale: 0.8 },
        visible: { opacity: 1, scale: 1 }
      }}
      style={{ perspective: 1000 }}
      className="relative group h-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          relative flex flex-col items-center justify-between p-5 h-full rounded-2xl 
          bg-black  border border-gray-200/50 dark:border-gray-700/50 
          backdrop-blur-md shadow-xl transition-all duration-300 ${colors.border}
        `}
      >
        {/* Dynamic Glow Background */}
        <div 
           className="absolute inset-0 -z-10 rounded-2xl opacity-0 group-hover:opacity-15 transition-opacity duration-500"
           style={{ background: colors.shadow, filter: 'blur(30px)' }}
        />

        <div style={{ transform: "translateZ(30px)" }} className="flex flex-col items-center w-full">
          {/* Icon with spin effect */}
          <motion.div 
            whileHover={{ rotate: 360, scale: 1.2 }}
            transition={{ type: "spring", stiffness: 200, damping: 10 }}
            className={`text-5xl mb-3 ${colors.text} drop-shadow-sm`}
          >
            {lang.icon}
          </motion.div>
          
          <h2 className="text-lg font-bold text-gray-800 dark:text-gray-100 mb-4">
            {lang.name}
          </h2>

          {/* XP Bar */}
          <div className="w-full bg-gray-200 dark:bg-gray-700 h-2 rounded-full overflow-hidden relative">
             <motion.div 
               initial={{ width: 0 }}
               whileInView={{ width: `${lang.proficiency}%` }}
               transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
               className={`h-full ${colors.bg}`}
             />
          </div>
          
          <div className="flex justify-between w-full mt-2 text-xs font-mono text-gray-500 dark:text-gray-400">
             <span>Level</span>
             <span className={`${colors.text} font-bold`}>{getLabel(lang.proficiency)}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 4. MAIN EXPORT ---
export default function ProgrammingLanguages() {
  return (
    <section className="relative w-full py-20 bg-black overflow-hidden">
      
      {/* 3D Background */}
      <AnimatedBackground />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 dark:text-white mb-4">
             Code <span className="text-indigo-500 neon-text">Fluency</span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            Speaking the languages of the web, mobile, and backend systems.
          </p>
        </motion.div>

        <motion.div 
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: { staggerChildren: 0.08 }
            }
          }}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-7 gap-5"
        >
          {languages.map((lang) => (
            <LanguageCard key={lang.name} lang={lang} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}