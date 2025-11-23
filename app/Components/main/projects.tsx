import React from 'react';
import Image, { StaticImageData } from 'next/image';
// Keep your existing image imports
import project1 from "../Images/better.jpeg";
import project3 from "../Images/ndai.jpeg";
import project4 from "../Images/archie.jpeg";
import ganji from "../Images/ganji.png";

import { FaMobile, FaLaptopCode, FaDatabase, FaCode, FaGamepad } from 'react-icons/fa';
import { FiGithub, FiExternalLink } from 'react-icons/fi';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Icosahedron, MeshDistortMaterial, Stars } from '@react-three/drei';

// --- 1. DATA & CONFIG ---
type CategoryType = 'app' | 'webapp' | 'database';
type ColorType = 'green' | 'purple' | 'blue' | 'indigo';

interface Project {
  title: string;
  description: string;
  image: StaticImageData;
  category: CategoryType;
  github: string;
  color: ColorType;
  link: string;
}

interface ColorMapItem {
  border: string;
  shadow: string;
  text: string;
  bg: string;
  badge: string;
}

const projects: Project[] = [
  {
    title: 'Better Farm',
    description: 'This is a farming AI assistant with an inbuilt chat bot.',
    image: project1,
    category: 'app',
    github: 'https://github.com/mfalme0/betterFarm',
    color: 'green',
    link: ''
  },
  {
    title: 'Ganji',
    description: 'Financial Tracker app to monitor expenses and income.',
    image: ganji,
    category: 'app',
    github: 'https://github.com/mfalme0/ganji',
    color: 'purple',
    link: ''
  },
  {
    title: 'Ndai',
    description: 'A comprehensive vehicle management system.',
    image: project3,
    category: 'webapp',
    github: 'https://github.com/mfalme0/ndai.com',
    color: 'blue',
    link: ''
  },
  {
    title: 'Archie',
    description: 'A secure file archival and retrieval system.',
    image: project4,
    category: 'webapp',
    github: 'https://github.com/mfalme0/Archiewebapp',
    color: 'indigo',
    link: ''
  },
];

const getCategoryIcon = (category: string): React.ReactElement => {
  switch(category.toLowerCase()) {
    case 'app': return <FaMobile />;
    case 'webapp': return <FaLaptopCode />;
    case 'database': return <FaDatabase />;
    default: return <FaCode />;
  }
};

// Map colors to Tailwind/Hex values for glows
const colorMap: Record<ColorType, ColorMapItem> = {
  green:  { border: 'group-hover:border-green-500', shadow: 'group-hover:shadow-green-500/50', text: 'text-green-400', bg: 'bg-green-500', badge: 'bg-green-500/20 text-green-300' },
  purple: { border: 'group-hover:border-purple-500', shadow: 'group-hover:shadow-purple-500/50', text: 'text-purple-400', bg: 'bg-purple-500', badge: 'bg-purple-500/20 text-purple-300' },
  blue:   { border: 'group-hover:border-blue-500', shadow: 'group-hover:shadow-blue-500/50', text: 'text-blue-400', bg: 'bg-blue-500', badge: 'bg-blue-500/20 text-blue-300' },
  indigo: { border: 'group-hover:border-indigo-500', shadow: 'group-hover:shadow-indigo-500/50', text: 'text-indigo-400', bg: 'bg-indigo-500', badge: 'bg-indigo-500/20 text-indigo-300' },
};

// --- 2. 3D BACKGROUND (Icosahedrons + Stars) ---
const BackgroundScene = () => {
  return (
    <div className="absolute inset-0 -z-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <Stars radius={100} count={3000} factor={4} fade speed={1} />
        
        {/* Floating Wireframe Blueprints */}
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Icosahedron args={[1, 0]} position={[-6, 3, -5]} scale={2.5}>
             <MeshDistortMaterial color="#4ade80" wireframe distort={0.1} speed={1} />
          </Icosahedron>
        </Float>
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <Icosahedron args={[1, 0]} position={[6, -4, -5]} scale={3}>
             <MeshDistortMaterial color="#6366f1" wireframe distort={0.2} speed={1.5} />
          </Icosahedron>
        </Float>
      </Canvas>
    </div>
  );
};

// --- 3. 3D CARD COMPONENT ---
interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard = ({ project, index }: ProjectCardProps) => {
  const theme = colorMap[project.color] || colorMap.blue;

  // Tilt Logic
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useSpring(useTransform(y, [-100, 100], [10, -10]), { stiffness: 150, damping: 15 });
  const rotateY = useSpring(useTransform(x, [-100, 100], [-10, 10]), { stiffness: 150, damping: 15 });

  function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    x.set(event.clientX - centerX);
    y.set(event.clientY - centerY);
  }

  function handleMouseLeave() {
    x.set(0);
    y.set(0);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      viewport={{ once: true }}
      style={{ perspective: 1000 }}
      className="w-full"
    >
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        className={`
          group relative flex flex-col h-full bg-white/5 dark:bg-gray-900/60 
          backdrop-blur-md border border-gray-200/50 dark:border-gray-800/50 
          rounded-2xl overflow-hidden transition-all duration-300 hover:scale-[1.02]
          ${theme.border} hover:border-opacity-100 shadow-xl ${theme.shadow}
        `}
      >
        {/* Image Area */}
        <div className="relative h-48 w-full overflow-hidden border-b border-gray-700/50">
          <Image 
            src={project.image} 
            alt={project.title} 
            fill 
            className="object-cover transition-transform duration-700 group-hover:scale-110" 
          />
          
          {/* Overlay Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-80" />
          
          {/* Category Badge */}
          <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider backdrop-blur-md flex items-center gap-2 border border-white/10 ${theme.badge}`}>
            {getCategoryIcon(project.category)}
            {project.category}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-6 flex flex-col flex-grow" style={{ transform: "translateZ(20px)" }}>
          <h3 className="text-2xl font-bold text-gray-800 dark:text-gray-100 mb-2 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-400 transition-all">
            {project.title}
          </h3>
          
          <div className="h-1 w-12 rounded-full mb-4 bg-gradient-to-r from-gray-500 to-transparent" />
          
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed mb-6 flex-grow">
            {project.description}
          </p>
          
          {/* Action Buttons */}
          <div className="flex gap-4 mt-auto">
            {project.github && (
              <a 
                href={project.github} 
                target="_blank" 
                rel="noopener noreferrer" 
                className="flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg bg-gray-800/50 hover:bg-gray-800 text-white border border-gray-700 hover:border-gray-500 transition-all duration-300 hover:-translate-y-1"
              >
                <FiGithub /> <span className="text-sm font-medium">Code</span>
              </a>
            )}
            {project.link && (
              <a 
                href={project.link} 
                target="_blank" 
                rel="noopener noreferrer" 
                className={`flex-1 flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-white border border-transparent transition-all duration-300 hover:-translate-y-1 ${theme.bg} hover:brightness-110`}
              >
                <FiExternalLink /> <span className="text-sm font-medium">Demo</span>
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 4. MAIN EXPORT ---
export function Projects() {
  return (
    <section className="relative w-full py-20 bg-black overflow-hidden">
      
      {/* 3D Background */}
      <BackgroundScene />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Featured <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500 neon-text">Projects</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            Showcasing innovative solutions and creative experiments.
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard key={index} project={project} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}