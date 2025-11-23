import React from 'react';
import { BsCodeSlash } from "react-icons/bs";
import { PiNetwork } from "react-icons/pi";
import { MdHowToVote } from "react-icons/md";
import { GrCloudComputer } from "react-icons/gr";
import { FaCalendarAlt, FaBriefcase } from "react-icons/fa";
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Float, Tetrahedron, MeshDistortMaterial, Stars } from '@react-three/drei';

// --- 1. DATA & COLORS ---
type ColorType = 'blue' | 'indigo' | 'purple' | 'green' | 'red';

interface Experience {
  company: string;
  role: string;
  duration: string;
  description: string;
  icon: React.ReactElement;
  color: ColorType;
}

interface ColorMapItem {
  border: string;
  shadow: string;
  text: string;
  bg: string;
}

const experiences: Experience[] = [
  {
    company: 'SteadFast Academy',
    role: 'Head of IT', // Updated Role
    duration: 'April 2025 - Present',
    description: 'Leading the technological strategy and managing the institutions digital infrastructure. I oversee the creation and maintenance of internal tools to automate departmental workflows and ensure system efficiency.',
    icon: <GrCloudComputer />,
    color: 'blue'
  },
  {
    company: 'Gituamba Girls Secondary School',
    role: 'Volunteer IT Consultant',
    duration: 'Sep 2024 - Present',
    description: 'Managing network/cyber security infrastructure and setting up devices to serve the community.',
    icon: <GrCloudComputer />,
    color: 'indigo'
  },
  {
    company: 'VisionFund Kenya',
    role: 'Software Engineer Intern',
    duration: 'Oct 2023 - Dec 2023',
    description: 'Maintained internal tools and learned cloud service frameworks in a fast-paced financial environment.',
    icon: <BsCodeSlash />,
    color: 'purple'
  },
  {
    company: 'IEBC',
    role: 'Clerk',
    duration: 'Aug 2023',
    description: 'Coordinated voter lookup processes with the KIEMS kit, achieving 100% accurate data retrieval.',
    icon: <MdHowToVote />,
    color: 'green'
  },
  {
    company: 'Tangible Air Solutions',
    role: 'Network Associate',
    duration: 'Apr 2021 - Aug 2021',
    description: 'Provided technical support and network maintenance prior to university enrollment.',
    icon: <PiNetwork />,
    color: 'red'
  },
];

const colorMap: Record<ColorType, ColorMapItem> = {
  blue:   { border: 'group-hover:border-blue-500', shadow: 'group-hover:shadow-blue-500/50', text: 'text-blue-400', bg: 'bg-blue-500/10' },
  indigo: { border: 'group-hover:border-indigo-500', shadow: 'group-hover:shadow-indigo-500/50', text: 'text-indigo-400', bg: 'bg-indigo-500/10' },
  purple: { border: 'group-hover:border-purple-500', shadow: 'group-hover:shadow-purple-500/50', text: 'text-purple-400', bg: 'bg-purple-500/10' },
  green:  { border: 'group-hover:border-green-500', shadow: 'group-hover:shadow-green-500/50', text: 'text-green-400', bg: 'bg-green-500/10' },
  red:    { border: 'group-hover:border-rose-500', shadow: 'group-hover:shadow-rose-500/50', text: 'text-rose-400', bg: 'bg-rose-500/10' },
};

// --- 2. 3D BACKGROUND (Floating Pyramids) ---
const BackgroundScene = () => {
  return (
    <div className="absolute inset-0 -z-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <directionalLight position={[0, 10, 5]} intensity={1} />
        <Stars radius={50} count={1000} factor={4} fade speed={1} />
        
        {/* Floating Tetrahedrons representing Milestones */}
        <Float speed={2} rotationIntensity={2} floatIntensity={1}>
          <Tetrahedron args={[1]} position={[-5, 3, -2]} scale={2}>
             <MeshDistortMaterial color="#3b82f6" wireframe distort={0.2} speed={2} />
          </Tetrahedron>
        </Float>
        <Float speed={1.5} rotationIntensity={1.5} floatIntensity={2}>
          <Tetrahedron args={[1]} position={[6, -2, -4]} scale={2.5}>
             <MeshDistortMaterial color="#a855f7" wireframe distort={0.2} speed={1.5} />
          </Tetrahedron>
        </Float>
        <Float speed={3} rotationIntensity={3} floatIntensity={1}>
           <Tetrahedron args={[1]} position={[0, -4, 0]} scale={1}>
             <MeshDistortMaterial color="#10b981" wireframe distort={0} speed={1} />
           </Tetrahedron>
        </Float>
      </Canvas>
    </div>
  );
};

// --- 3. 3D CARD COMPONENT ---
interface ExperienceCardProps {
  data: Experience;
  index: number;
}

const ExperienceCard = ({ data, index }: ExperienceCardProps) => {
  const theme = colorMap[data.color] || colorMap.blue;

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
      initial={{ opacity: 0, y: 30 }}
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
          group relative flex flex-col h-full p-6 sm:p-8 rounded-2xl
          bg-white/5 dark:bg-gray-900/60 backdrop-blur-md 
          border border-gray-200/50 dark:border-gray-800/50
          transition-all duration-300 hover:scale-[1.02] shadow-xl
          ${theme.border} hover:border-opacity-100 ${theme.shadow}
        `}
      >
        {/* HUD Decoration Corners */}
        <div className={`absolute top-0 left-0 w-8 h-8 border-t-2 border-l-2 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity ${theme.text.replace('text', 'border')}`} />
        <div className={`absolute bottom-0 right-0 w-8 h-8 border-b-2 border-r-2 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity ${theme.text.replace('text', 'border')}`} />

        <div style={{ transform: "translateZ(20px)" }} className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`flex items-center justify-center w-14 h-14 rounded-xl ${theme.bg} ${theme.text} text-3xl shadow-inner`}>
              {data.icon}
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100 tracking-tight">
                {data.company}
              </h2>
              <div className={`text-sm font-mono font-semibold ${theme.text} flex items-center gap-2`}>
                 <FaBriefcase className="text-xs" /> {data.role}
              </div>
            </div>
          </div>
          
          {/* Divider */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent mb-4 opacity-50" />

          {/* Description */}
          <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed flex-grow">
            {data.description}
          </p>

          {/* Footer / Date */}
          <div className="mt-6 pt-4 border-t border-dashed border-gray-200 dark:border-gray-800 flex items-center justify-between text-xs font-mono text-gray-400">
             <span className="flex items-center gap-2">
                <FaCalendarAlt /> {data.duration}
             </span>
             <span className={`px-2 py-0.5 rounded ${theme.bg} ${theme.text}`}>Log #{experiences.length - index}</span>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// --- 4. MAIN COMPONENT ---
export function WorkExperience() {
  return (
    <div className="relative w-full py-20 bg-black overflow-hidden">
      
      {/* 3D Background */}
      <BackgroundScene />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 dark:text-white tracking-tight mb-4">
            Career <span className="text-transparent bg-clip-text bg-cyan-400 neon-text">Chronicles</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-400">
            A timeline of professional missions and deployed solutions.
          </p>
        </motion.div>
        
        {/* Experience Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {experiences.map((experience, index) => (
            <ExperienceCard key={experience.company} data={experience} index={index} />
          ))}
        </div>
      </div>
    </div>
  );
}