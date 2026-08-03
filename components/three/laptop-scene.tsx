'use client';

import { Canvas, useFrame, type ThreeElements } from '@react-three/fiber';
import { Float, RoundedBox } from '@react-three/drei';
import { useRef } from 'react';
import type { Group, Mesh, MeshStandardMaterial } from 'three';
import { MathUtils } from 'three';

import { useMediaQuery } from '@/hooks/use-media-query';

/**
 * Stylised laptop built from primitives rather than a downloaded GLB.
 *
 * Rationale: a real model would be several hundred KB over the wire for a
 * decorative element. Six rounded boxes with an emissive screen read the same
 * at this scale, cost ~0 bytes, and never block first paint.
 */
function Laptop(props: ThreeElements['group']) {
  const group = useRef<Group>(null);
  const screenGlow = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (!group.current) return;

    // Subtle parallax toward the pointer — capped so it never feels twitchy.
    const { x, y } = state.pointer;
    group.current.rotation.y = MathUtils.damp(group.current.rotation.y, x * 0.35, 3, delta);
    group.current.rotation.x = MathUtils.damp(group.current.rotation.x, -y * 0.18 - 0.08, 3, delta);

    if (screenGlow.current) {
      // Slow breathing pulse on the display, like an idle machine.
      const material = screenGlow.current.material as MeshStandardMaterial;
      material.emissiveIntensity = 1.4 + Math.sin(state.clock.elapsedTime * 1.4) * 0.35;
    }
  });

  return (
    <group ref={group} {...props}>
      {/* Base / keyboard deck */}
      <RoundedBox args={[3.2, 0.12, 2.2]} radius={0.05} smoothness={4} position={[0, -0.75, 0.55]}>
        <meshStandardMaterial color="#0E1630" metalness={0.85} roughness={0.28} />
      </RoundedBox>

      {/* Trackpad */}
      <RoundedBox args={[0.9, 0.02, 0.6]} radius={0.01} position={[0, -0.68, 1.25]}>
        <meshStandardMaterial color="#131C3A" metalness={0.6} roughness={0.5} />
      </RoundedBox>

      {/* Lid */}
      <group position={[0, -0.7, -0.5]} rotation={[-0.28, 0, 0]}>
        <RoundedBox args={[3.2, 2.1, 0.1]} radius={0.06} smoothness={4} position={[0, 1.02, 0]}>
          <meshStandardMaterial color="#0B1226" metalness={0.9} roughness={0.25} />
        </RoundedBox>

        {/* Emissive display */}
        <mesh ref={screenGlow} position={[0, 1.02, 0.056]}>
          <planeGeometry args={[2.96, 1.86]} />
          <meshStandardMaterial
            color="#0A1B3D"
            emissive="#2563EB"
            emissiveIntensity={1.5}
            toneMapped={false}
          />
        </mesh>

        {/* Abstract "code lines" on the display — varied widths read as syntax. */}
        {[0, 1, 2, 3, 4, 5].map((row) => (
          <mesh
            key={row}
            position={[-0.95 + (row % 2) * 0.18, 1.72 - row * 0.22, 0.062]}
          >
            <planeGeometry args={[[1.0, 0.62, 1.25, 0.48, 0.86, 1.1][row], 0.055]} />
            <meshBasicMaterial
              color={row % 3 === 0 ? '#22D3EE' : row % 3 === 1 ? '#60A5FA' : '#94A3B8'}
              toneMapped={false}
              transparent
              opacity={0.85}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

/** Wireframe solids drifting behind the laptop for depth. */
function AmbientSolids() {
  const icosahedron = useRef<Mesh>(null);
  const torus = useRef<Mesh>(null);

  useFrame((_, delta) => {
    if (icosahedron.current) icosahedron.current.rotation.y += delta * 0.12;
    if (torus.current) {
      torus.current.rotation.x += delta * 0.18;
      torus.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <>
      <Float speed={1.1} rotationIntensity={0.6} floatIntensity={1.2}>
        <mesh ref={icosahedron} position={[-2.6, 1.5, -1.6]}>
          <icosahedronGeometry args={[0.62, 0]} />
          <meshBasicMaterial color="#3B82F6" wireframe transparent opacity={0.35} />
        </mesh>
      </Float>

      <Float speed={0.9} rotationIntensity={0.8} floatIntensity={1.4}>
        <mesh ref={torus} position={[2.7, -1.1, -1.2]}>
          <torusGeometry args={[0.42, 0.11, 12, 40]} />
          <meshBasicMaterial color="#22D3EE" wireframe transparent opacity={0.32} />
        </mesh>
      </Float>
    </>
  );
}

/**
 * The scene is `dpr`-capped and `frameloop`-frozen under reduced motion so the
 * GPU cost stays predictable on laptops and integrated graphics.
 */
export default function LaptopScene() {
  const prefersReducedMotion = useMediaQuery('(prefers-reduced-motion: reduce)');

  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.75]}
      camera={{ position: [0, 0.6, 6.2], fov: 40 }}
      frameloop={prefersReducedMotion ? 'demand' : 'always'}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      aria-hidden
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[4, 6, 5]} intensity={1.6} color="#93C5FD" />
      <pointLight position={[-4, -2, 3]} intensity={22} color="#22D3EE" distance={12} />
      <pointLight position={[0, 1.5, 2]} intensity={10} color="#3B82F6" distance={9} />

      <Float speed={1.4} rotationIntensity={0.25} floatIntensity={0.7}>
        <Laptop scale={0.95} position={[0, 0.15, 0]} />
      </Float>

      <AmbientSolids />
    </Canvas>
  );
}
