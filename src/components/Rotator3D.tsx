"use client"
import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls } from '@react-three/drei'
import { useRef, useState } from 'react'
import * as THREE from 'three'

function Spindle({ color }: { color: string }) {
  const meshRef = useRef<THREE.Mesh>(null)
  useFrame((_, delta) => {
    if (!meshRef.current) return
    meshRef.current.rotation.y += delta * 0.5
  })
  return (
    <mesh ref={meshRef}>
      <torusKnotGeometry args={[1, 0.32, 128, 16]} />
      <meshStandardMaterial color={color} metalness={0.7} roughness={0.25} />
    </mesh>
  )
}

const COLORS = ['#7c5cff', '#1fb6ff', '#20f0a8']

export default function Rotator3D({ colorIndex = 0 }: { colorIndex?: number }) {
  const [hovered, setHovered] = useState(false)
  return (
    <Canvas camera={{ position: [0, 0, 3.5], fov: 40 }} onPointerOver={()=>setHovered(true)} onPointerOut={()=>setHovered(false)}>
      <ambientLight intensity={0.6} />
      <directionalLight position={[2, 2, 3]} intensity={1.2} />
      <group position={[0, 0, 0]}>
        <Spindle color={COLORS[colorIndex % COLORS.length]} />
      </group>
      <OrbitControls enablePan={false} enableZoom={false} autoRotate={hovered} autoRotateSpeed={0.6} />
    </Canvas>
  )
}
