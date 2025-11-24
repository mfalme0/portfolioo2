import React from "react";
import Image from "next/image";
import profilePic from "../Images/Mfalme.jpg"; // Keep your path
import { motion } from "framer-motion";
import { Canvas } from "@react-three/fiber";
import { Float, Octahedron, MeshDistortMaterial, Stars } from "@react-three/drei";
import { FaLaptopCode, FaServer, FaMobileAlt, FaDatabase, FaGamepad } from "react-icons/fa";
import { SiLinux } from "react-icons/si";

// --- 1. DATA ORGANIZATION (RPG Style Attributes) ---
// Instead of a list, we group skills into "Domains"
type ColorType = "blue" | "purple" | "orange" | "green";

interface Domain {
  title: string;
  icon: React.ReactElement;
  desc: string;
  color: ColorType;
}

const domains: Domain[] = [
  { 
    title: "Frontend Artistry", 
    icon: <FaLaptopCode />, 
    desc: "React, Next.js, Vue, Tailwind, Styled Components", 
    color: "blue" 
  },
  { 
    title: "Backend Logic", 
    icon: <FaServer />, 
    desc: "Node.js, Express, C#, Python, C++", 
    color: "purple" 
  },
  { 
    title: "Mobile Realm", 
    icon: <FaMobileAlt />, 
    desc: "Kotlin, Flutter, Cross-platform Dev", 
    color: "orange" 
  },
  { 
    title: "Infrastructure", 
    icon: <SiLinux />, 
    desc: "Proxmox, Docker, Linux Systems", 
    color: "green" 
  },
];

const colorMap: Record<ColorType, string> = {
  blue: "text-blue-400 border-blue-500/30 bg-blue-500/10",
  purple: "text-purple-400 border-purple-500/30 bg-purple-500/10",
  orange: "text-orange-400 border-orange-500/30 bg-orange-500/10",
  green: "text-green-400 border-green-500/30 bg-green-500/10",
};

// --- 2. 3D BACKGROUND (Floating Crystals) ---
const BackgroundScene = () => {
  return (
    <div className="absolute inset-0 -z-0 opacity-30 pointer-events-none">
      <Canvas camera={{ position: [0, 0, 8] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <Stars radius={50} count={1500} factor={4} fade speed={1} />
        
        <Float speed={2} rotationIntensity={1.5} floatIntensity={2}>
          <Octahedron args={[1]} position={[-3, 2, -2]} scale={1.5}>
             <MeshDistortMaterial color="#3b82f6" wireframe distort={0.2} speed={2} />
          </Octahedron>
        </Float>
        <Float speed={1.5} rotationIntensity={2} floatIntensity={1}>
          <Octahedron args={[1]} position={[4, -2, -3]} scale={2}>
             <MeshDistortMaterial color="#a855f7" wireframe distort={0.4} speed={1.5} />
          </Octahedron>
        </Float>
      </Canvas>
    </div>
  );
};

// --- 3. MAIN COMPONENT ---
export default function AboutMe() {
  return (
    <section id="about-me" className="relative w-full py-20 bg-black overflow-hidden">
      
      {/* 3D Layer */}
      <BackgroundScene />

      <div className="relative z-10 container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* LEFT: Character Card (Profile Pic) */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-1/3 flex justify-center"
          >
            <div className="relative group w-72 h-72 sm:w-80 sm:h-80">
              {/* Spinning Ring */}
              <div className="absolute inset-0 rounded-full border-2 border-dashed border-gray-300 dark:border-gray-700 animate-[spin_10s_linear_infinite] group-hover:border-indigo-500 transition-colors" />
              
              {/* Profile Container */}
              <div className="absolute inset-2 rounded-full overflow-hidden border-4 border-white dark:border-gray-800 shadow-2xl z-10">
                <Image
                  src={profilePic}
                  alt="Joseph Gitau"
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                />
              </div>

              {/* "Level" Badge */}
              <motion.div 
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ delay: 0.5, type: "spring" }}
                className="absolute -bottom-4 right-8 z-20 bg-indigo-600 text-white px-4 py-1 rounded-full border-2 border-white dark:border-gray-900 shadow-lg flex items-center gap-2"
              >
                <FaGamepad />
                <span className="font-bold text-sm">Lvl. 22</span>
              </motion.div>
            </div>
          </motion.div>

          {/* RIGHT: Bio & Stats */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="w-full lg:w-2/3"
          >
            {/* Header */}
            <div className="mb-8 text-center lg:text-left">
              <h2 className="text-sm font-bold text-indigo-500 tracking-widest uppercase mb-2">
                Character Profile
              </h2>
              <h1 className="text-4xl font-extrabold text-gray-800 dark:text-gray-100 mb-6">
                About <span className="neon-text text-transparent bg-clip-text bg-cyan-400">Joseph</span>
              </h1>
              
              <div className="p-6 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm rounded-xl border-l-4 border-indigo-500 shadow-sm">
                <p className="text-lg text-gray-700 dark:text-gray-300 leading-relaxed italic">
                  &quot;Hi, I&lsquo;m Joseph Gitau. I&apos;m a software developer who views every bug as a puzzle and every deployment as a victory. I build modern web and mobile applications with a focus on clean code and user impact.&quot;
                </p>
              </div>
            </div>

            {/* Attributes Grid (Skills) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {domains.map((domain, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + (index * 0.1) }}
                  whileHover={{ scale: 1.02 }}
                  className={`p-4 rounded-lg border ${colorMap[domain.color]} backdrop-blur-md transition-all shadow-sm hover:shadow-md`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-2xl">{domain.icon}</span>
                    <h3 className="font-bold text-gray-800 dark:text-gray-200">{domain.title}</h3>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-400 font-mono">
                    {domain.desc}
                  </p>
                </motion.div>
              ))}
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}