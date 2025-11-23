import React from "react";
import { GitHubCalendar } from "react-github-calendar";
import { motion } from "framer-motion";
import { Canvas, useFrame, RootState } from "@react-three/fiber";
import { Float, Box, Stars } from "@react-three/drei";
import { FaGithubAlt, FaCodeBranch } from "react-icons/fa";
import * as THREE from "three";

// --- 3D VOXEL BACKGROUND ---
interface VoxelProps {
  position: [number, number, number];
  color: string;
  speed: number;
}

const Voxel = ({ position, color, speed }: VoxelProps) => {
  const mesh = React.useRef<THREE.Mesh>(null);

  useFrame((state: RootState) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime();
    mesh.current.position.y += Math.sin(t * speed) * 0.002;
    mesh.current.rotation.x = t * 0.5;
    mesh.current.rotation.y = t * 0.2;
  });

  return (
    <Float speed={speed} rotationIntensity={1} floatIntensity={1}>
      <Box ref={mesh} position={position} args={[0.4, 0.4, 0.4]}>
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.8} />
      </Box>
    </Float>
  );
};

const BackgroundScene = () => {
  const voxels = Array.from({ length: 30 }).map((_, i) => ({
    id: i,
    position: [
      (Math.random() - 0.5) * 15,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 5,
    ] as [number, number, number],
    color: "#26a641", // GitHub green
    speed: Math.random() * 2 + 0.5,
  }));

  return (
    <div className="absolute inset-0 -z-0 opacity-30">
      <Canvas camera={{ position: [0, 0, 10] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Stars radius={50} count={1000} factor={4} fade speed={1} />
        {voxels.map((v) => (
          <Voxel key={v.id} position={v.position} color={v.color} speed={v.speed} />
        ))}
      </Canvas>
    </div>
  );
};

// --- MAIN COMPONENT ---
export default function Github() {
  return (
    <section className="relative w-full py-20 bg-black overflow-hidden">
      <BackgroundScene />

      <div className="relative z-10 flex flex-col items-center px-4">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-10"
        >
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-gray-900/70 backdrop-blur-md rounded-full border border-gray-700 shadow-lg shadow-green-500/20">
              <FaGithubAlt className="text-4xl text-white" />
            </div>
          </div>
          <h1 className="text-3xl md:text-4xl font-extrabold text-gray-100">
            Days I <span className="text-green-500 animate-pulse">Code</span>
          </h1>
          <p className="text-gray-400 mt-2 flex items-center justify-center gap-2">
            <FaCodeBranch /> My Contribution Quest Log
          </p>
        </motion.div>

        {/* GitHub Calendar */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="w-full max-w-5xl"
        >
          <div className="bg-gray-900/70 backdrop-blur-md border border-gray-700 rounded-3xl p-4 sm:p-8 shadow-2xl relative overflow-hidden group">
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-green-500/20 blur-[100px] rounded-full -z-10 group-hover:bg-green-500/30 transition-colors duration-700" />

            <div className="flex justify-center overflow-x-auto pb-4 custom-scrollbar">
              <GitHubCalendar
                username="mfalme0"
                blockSize={16}
                blockMargin={4}
                fontSize={16}
                colorScheme="dark"
              />
            </div>

            <div className="mt-6 flex justify-between items-center text-xs text-gray-400 font-mono border-t border-gray-700 pt-4">
              <span>Syncing with GitHub API...</span>
              <div className="flex gap-2 items-center">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-ping" />
                <span>Live</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
