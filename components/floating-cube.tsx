"use client"

import { useRef } from "react"
import { useFrame } from "@react-three/fiber"
import { MeshTransmissionMaterial } from "@react-three/drei"
import type { Mesh } from "three"

interface FloatingCubeProps {
  position: [number, number, number]
  mouseX: number
  mouseY: number
}

export default function FloatingCube({ position, mouseX, mouseY }: FloatingCubeProps) {
  const meshRef = useRef<Mesh>(null)

  useFrame((state, delta) => {
    if (!meshRef.current) return

    // Rotate based on time
    meshRef.current.rotation.x += delta * 0.2
    meshRef.current.rotation.y += delta * 0.3

    // Subtle movement based on mouse position
    meshRef.current.position.x = position[0] + mouseX * 2
    meshRef.current.position.y = position[1] + mouseY * 2
  })

  return (
    <mesh ref={meshRef} position={position}>
      <boxGeometry args={[2.5, 2.5, 2.5]} />
      <MeshTransmissionMaterial
        backside
        samples={4}
        thickness={0.5}
        roughness={0.1}
        clearcoat={0.1}
        clearcoatRoughness={0.1}
        transmission={0.95}
        ior={1.5}
        chromaticAberration={0.06}
        distortion={0.4}
        distortionScale={0.6}
        temporalDistortion={0.2}
        color="#00ffff"
        attenuationDistance={0.5}
        attenuationColor="#ff00ff"
      />
    </mesh>
  )
}

