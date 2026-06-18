'use client';

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import {
  Float,
  MeshDistortMaterial,
  PerspectiveCamera,
} from '@react-three/drei';
import * as THREE from 'three';

function GlossyCollectible({
  color = '#f8fafc',
  shape = 'sphere',
  scale = 1,
  speed = 1,
  position = [0, 0, 0],
}) {
  const mesh = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!mesh.current) return;
    const t = state.clock.getElapsedTime() * speed;
    mesh.current.rotation.y = t * 0.15;
    mesh.current.rotation.x = Math.sin(t * 0.08) * 0.2;
  });

  const geometry = useMemo(() => {
    switch (shape) {
      case 'sphere': return new THREE.SphereGeometry(1, 24, 24);
      case 'torus': return new THREE.TorusGeometry(1, 0.35, 16, 32);
      case 'icosahedron': return new THREE.IcosahedronGeometry(1, 0);
      case 'octahedron': return new THREE.OctahedronGeometry(1, 0);
      default: return new THREE.SphereGeometry(1, 24, 24);
    }
  }, [shape]);

  return (
    <group position={position as [number, number, number]}>
      <Float speed={1.5 * speed} rotationIntensity={0.4} floatIntensity={0.6}>
        <mesh ref={mesh} scale={scale}>
          <primitive object={geometry} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.1}
            roughness={0.15}
            clearcoat={1}
            clearcoatRoughness={0.2}
            transparent
            opacity={0.75}
            envMapIntensity={0.5}
          />
        </mesh>
      </Float>
    </group>
  );
}

function ToyCharacter({ color = '#7dd3fc', scale = 1, speed = 1 }) {
  const group = useRef<THREE.Group>(null);
  const bodyRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.getElapsedTime() * speed;
    group.current.rotation.y = t * 0.1;
    group.current.position.y = Math.sin(t * 0.5) * 0.15;
    if (bodyRef.current) {
      bodyRef.current.scale.x = 1 + Math.sin(t * 1.2) * 0.02;
      bodyRef.current.scale.z = 1 + Math.cos(t * 1.2) * 0.02;
    }
  });

  return (
    <group ref={group}>
      <Float speed={1.2 * speed} rotationIntensity={0.2} floatIntensity={0.4}>
        <mesh ref={bodyRef} scale={scale}>
          <sphereGeometry args={[1, 24, 24]} />
          <meshPhysicalMaterial
            color={color}
            metalness={0.1}
            roughness={0.15}
            clearcoat={0.8}
            clearcoatRoughness={0.2}
            transparent
            opacity={0.7}
          />
        </mesh>
        <mesh position={[-0.35, 0.2, 0.85]} scale={0.15 * scale}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0.35, 0.2, 0.85]} scale={0.15 * scale}>
          <sphereGeometry args={[1, 12, 12]} />
          <meshStandardMaterial color="#ffffff" emissive="#ffffff" emissiveIntensity={0.3} />
        </mesh>
        <mesh position={[0, -1.1, 0]} scale={[0.6 * scale, 0.08 * scale, 0.45 * scale]}>
          <boxGeometry args={[1, 1, 1]} />
          <meshStandardMaterial color={color} metalness={0.5} roughness={0.3} />
        </mesh>
      </Float>
    </group>
  );
}

export function CollectibleScene({
  color = '#f8fafc',
  shape = 'sphere',
  scale = 1,
  speed = 1,
  className = '',
  position = [0, 0, 0],
}) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas
        dpr={[1, 1]}
        gl={{
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance',
        }}
        camera={{ position: [0, 0, 4.5], fov: 45 }}
      >
        <PerspectiveCamera makeDefault position={[0, 0, 4.5]} fov={45} />
        <ambientLight intensity={0.4} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffffff" />
        <GlossyCollectible color={color} shape={shape} scale={scale} speed={speed} position={position} />
      </Canvas>
    </div>
  );
}

export function CharacterScene({ color = '#7dd3fc', scale = 1, speed = 1, className = '' }) {
  return (
    <div className={`w-full h-full ${className}`}>
      <Canvas dpr={[1, 1]} gl={{ alpha: true, antialias: false, powerPreference: 'high-performance' }} camera={{ position: [0, 0, 4], fov: 45 }}>
        <PerspectiveCamera makeDefault position={[0, 0, 4]} fov={45} />
        <ambientLight intensity={0.5} />
        <directionalLight position={[3, 4, 5]} intensity={1.5} color="#ffffff" />
        <ToyCharacter color={color} scale={scale} speed={speed} />
      </Canvas>
    </div>
  );
}

export function AmbientFloatingShards({ color = '#f8fafc', count = 4 }) {
  const positions = useMemo(() => {
    const pos: [number, number, number][] = [];
    for (let i = 0; i < count; i++) {
      pos.push([
        (Math.random() - 0.5) * 12,
        (Math.random() - 0.5) * 8,
        (Math.random() - 0.5) * 6 - 2,
      ]);
    }
    return pos;
  }, [count]);

  return (
    <>
      {positions.map((pos, i) => (
        <Float key={i} speed={0.5 + Math.random() * 0.8} rotationIntensity={0.3 + Math.random() * 0.4} floatIntensity={0.3 + Math.random() * 0.5}>
          <mesh position={pos} scale={0.3 + Math.random() * 0.4}>
            <icosahedronGeometry args={[1, 0]} />
            <MeshDistortMaterial
              color={color}
              speed={2}
              distort={0.3}
              metalness={1}
              roughness={0.1}
              emissive={color}
              emissiveIntensity={0.15}
              transparent
              opacity={0.08 + Math.random() * 0.06}
            />
          </mesh>
        </Float>
      ))}
    </>
  );
}
