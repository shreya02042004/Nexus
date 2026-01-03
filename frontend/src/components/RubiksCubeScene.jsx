import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, Float } from '@react-three/drei';
import * as THREE from 'three';

// Glass cube piece - dark elegant style
const GlassCube = ({ position, size = 0.75, color = '#3b82f6', opacity = 0.8 }) => {
    return (
        <RoundedBox position={position} args={[size, size, size]} radius={0.05} smoothness={4}>
            <meshPhysicalMaterial
                color={color}
                metalness={0.3}
                roughness={0.1}
                transmission={0.2}
                transparent
                opacity={opacity}
                clearcoat={0.8}
                clearcoatRoughness={0.1}
            />
        </RoundedBox>
    );
};

// Orbiting ring - subtle glow
const OrbitRing = ({ radius, speed, tilt, color = '#60a5fa' }) => {
    const ringRef = useRef();

    useFrame((state) => {
        if (ringRef.current) {
            ringRef.current.rotation.z = state.clock.elapsedTime * speed;
        }
    });

    return (
        <group rotation={[tilt, 0, 0]}>
            <mesh ref={ringRef}>
                <torusGeometry args={[radius, 0.015, 16, 100]} />
                <meshStandardMaterial
                    color={color}
                    transparent
                    opacity={0.5}
                    emissive={color}
                    emissiveIntensity={0.3}
                />
            </mesh>
        </group>
    );
};

// Small floating particle
const FloatingParticle = ({ position, size = 0.08, delay = 0 }) => {
    const meshRef = useRef();

    useFrame((state) => {
        if (meshRef.current) {
            meshRef.current.rotation.y = state.clock.elapsedTime * 0.5;
            meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + delay) * 0.15;
        }
    });

    return (
        <mesh ref={meshRef} position={position}>
            <octahedronGeometry args={[size]} />
            <meshStandardMaterial
                color="#60a5fa"
                transparent
                opacity={0.6}
                emissive="#3b82f6"
                emissiveIntensity={0.5}
            />
        </mesh>
    );
};

// Central cube structure
const CentralCube = () => {
    const groupRef = useRef();

    useFrame((state) => {
        if (groupRef.current) {
            groupRef.current.rotation.y = state.clock.elapsedTime * 0.15;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0} floatIntensity={0.2}>
            <group ref={groupRef}>
                {/* Main cube pieces - 2x2x2 arrangement with dark elegant colors */}
                <GlassCube position={[-0.42, 0.42, 0.42]} color="#1e3a5f" opacity={0.9} />
                <GlassCube position={[0.42, 0.42, 0.42]} color="#2563eb" opacity={0.8} />
                <GlassCube position={[-0.42, -0.42, 0.42]} color="#3b82f6" opacity={0.7} />
                <GlassCube position={[0.42, -0.42, 0.42]} color="#1e40af" opacity={0.85} />
                <GlassCube position={[-0.42, 0.42, -0.42]} color="#2563eb" opacity={0.75} />
                <GlassCube position={[0.42, 0.42, -0.42]} color="#1e3a5f" opacity={0.8} />
                <GlassCube position={[-0.42, -0.42, -0.42]} color="#3b82f6" opacity={0.9} />
                <GlassCube position={[0.42, -0.42, -0.42]} color="#1e40af" opacity={0.7} />

                {/* Orbiting rings */}
                <OrbitRing radius={1.6} speed={0.25} tilt={Math.PI / 5} color="#60a5fa" />
                <OrbitRing radius={1.8} speed={-0.15} tilt={Math.PI / 3} color="#3b82f6" />
            </group>
        </Float>
    );
};

// Main Scene - Dark theme matching form side
const IsometricScene = () => {
    return (
        <div
            className="w-full h-full"
            style={{
                background: 'linear-gradient(135deg, #0a0a0f 0%, #0f172a 50%, #0a0a0f 100%)'
            }}
        >
            <Canvas
                camera={{ position: [4.5, 3.5, 4.5], fov: 38 }}
                gl={{ alpha: true, antialias: true }}
            >
                {/* Subtle dark ambient */}
                <ambientLight intensity={0.3} />

                {/* Main light - subtle blue tint */}
                <directionalLight position={[5, 8, 5]} intensity={0.8} color="#e0f2fe" />
                <directionalLight position={[-3, 3, -3]} intensity={0.3} color="#3b82f6" />

                {/* Accent lights */}
                <pointLight position={[0, 4, 0]} intensity={15} color="#60a5fa" />
                <pointLight position={[3, 0, 3]} intensity={8} color="#3b82f6" />
                <pointLight position={[-3, 0, -3]} intensity={8} color="#1e40af" />

                {/* Central cube structure */}
                <CentralCube />

                {/* Floating decorative particles */}
                <FloatingParticle position={[-2, 0.8, 0.5]} size={0.1} delay={0} />
                <FloatingParticle position={[2.2, 1.2, -0.3]} size={0.08} delay={1.5} />
                <FloatingParticle position={[1.2, -0.5, 2]} size={0.06} delay={3} />
                <FloatingParticle position={[-1.5, 1.5, -1.5]} size={0.07} delay={2} />
            </Canvas>

            {/* Subtle grid pattern overlay */}
            <div
                className="absolute inset-0 pointer-events-none opacity-[0.03]"
                style={{
                    backgroundImage: 'linear-gradient(rgba(59, 130, 246, 0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(59, 130, 246, 0.5) 1px, transparent 1px)',
                    backgroundSize: '50px 50px'
                }}
            />
        </div>
    );
};

export default IsometricScene;
