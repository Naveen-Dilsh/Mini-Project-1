"use client"

import { useRef, useState } from "react"
import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Environment, PerspectiveCamera } from "@react-three/drei"
import * as THREE from "three"

// Improved Suit 3D Model Component
function SuitModel({ design }) {
  const groupRef = useRef()
  const [hovered, setHovered] = useState(false)

  useFrame((state) => {
    if (groupRef.current && !hovered) {
      groupRef.current.rotation.y = Math.sin(state.clock.elapsedTime * 0.3) * 0.05
    }
  })

  // Convert hex color to THREE.Color
  const jacketColor = new THREE.Color(design.jacket.color)
  const trouserColor = new THREE.Color(design.trousers.color)

  // Material properties based on fabric type
  const getMaterialProps = (material) => {
    switch (material) {
      case "silk":
        return { roughness: 0.1, metalness: 0.3 }
      case "cashmere":
        return { roughness: 0.2, metalness: 0.1 }
      case "wool":
        return { roughness: 0.6, metalness: 0.1 }
      case "cotton":
        return { roughness: 0.8, metalness: 0.05 }
      case "linen":
        return { roughness: 0.9, metalness: 0.05 }
      default:
        return { roughness: 0.7, metalness: 0.1 }
    }
  }

  const jacketMaterialProps = getMaterialProps(design.jacket.material)
  const trouserMaterialProps = getMaterialProps(design.trousers.material)

  return (
    <group ref={groupRef} onPointerEnter={() => setHovered(true)} onPointerLeave={() => setHovered(false)}>
      {/* Main Jacket Body */}
      <mesh position={[0, 0.8, 0]}>
        <boxGeometry args={[2.2, 1.8, 0.5]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={jacketMaterialProps.roughness}
          metalness={jacketMaterialProps.metalness}
        />
      </mesh>

      {/* Jacket Shoulders - More realistic shape */}
      <mesh position={[-1.2, 1.5, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.5]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={jacketMaterialProps.roughness}
          metalness={jacketMaterialProps.metalness}
        />
      </mesh>
      <mesh position={[1.2, 1.5, 0]}>
        <boxGeometry args={[0.4, 0.6, 0.5]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={jacketMaterialProps.roughness}
          metalness={jacketMaterialProps.metalness}
        />
      </mesh>

      {/* Jacket Arms */}
      <mesh position={[-1.5, 0.5, 0]} rotation={[0, 0, 0.2]}>
        <cylinderGeometry args={[0.25, 0.22, 1.5, 8]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={jacketMaterialProps.roughness}
          metalness={jacketMaterialProps.metalness}
        />
      </mesh>
      <mesh position={[1.5, 0.5, 0]} rotation={[0, 0, -0.2]}>
        <cylinderGeometry args={[0.25, 0.22, 1.5, 8]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={jacketMaterialProps.roughness}
          metalness={jacketMaterialProps.metalness}
        />
      </mesh>

      {/* Jacket Collar */}
      <mesh position={[0, 1.6, 0.1]}>
        <boxGeometry args={[1.0, 0.3, 0.15]} />
        <meshStandardMaterial
          color={jacketColor}
          roughness={jacketMaterialProps.roughness}
          metalness={jacketMaterialProps.metalness}
        />
      </mesh>

      {/* Lapels - Different styles */}
      {design.jacket.lapelStyle === "notched" && (
        <>
          <mesh position={[-0.4, 1.3, 0.26]} rotation={[0, 0, 0.3]}>
            <boxGeometry args={[0.6, 0.15, 0.02]} />
            <meshStandardMaterial color={jacketColor} />
          </mesh>
          <mesh position={[0.4, 1.3, 0.26]} rotation={[0, 0, -0.3]}>
            <boxGeometry args={[0.6, 0.15, 0.02]} />
            <meshStandardMaterial color={jacketColor} />
          </mesh>
        </>
      )}

      {design.jacket.lapelStyle === "peaked" && (
        <>
          <mesh position={[-0.3, 1.4, 0.26]} rotation={[0, 0, 0.5]}>
            <boxGeometry args={[0.7, 0.12, 0.02]} />
            <meshStandardMaterial color={jacketColor} />
          </mesh>
          <mesh position={[0.3, 1.4, 0.26]} rotation={[0, 0, -0.5]}>
            <boxGeometry args={[0.7, 0.12, 0.02]} />
            <meshStandardMaterial color={jacketColor} />
          </mesh>
        </>
      )}

      {design.jacket.lapelStyle === "shawl" && (
        <mesh position={[0, 1.3, 0.26]}>
          <torusGeometry args={[0.5, 0.08, 8, 16, Math.PI]} />
          <meshStandardMaterial color={jacketColor} />
        </mesh>
      )}

      {/* Jacket Buttons */}
      {Array.from({ length: design.jacket.buttonCount }).map((_, i) => (
        <mesh key={i} position={[0.3, 1.2 - i * 0.25, 0.26]}>
          <cylinderGeometry args={[0.04, 0.04, 0.02, 8]} />
          <meshStandardMaterial color="#2a2a2a" metalness={0.8} roughness={0.2} />
        </mesh>
      ))}

      {/* Button holes */}
      {Array.from({ length: design.jacket.buttonCount }).map((_, i) => (
        <mesh key={i} position={[-0.3, 1.2 - i * 0.25, 0.26]}>
          <boxGeometry args={[0.08, 0.02, 0.01]} />
          <meshStandardMaterial color={new THREE.Color(jacketColor).multiplyScalar(0.7)} />
        </mesh>
      ))}

      {/* Jacket Pockets */}
      <mesh position={[-0.6, 0.3, 0.25]}>
        <boxGeometry args={[0.3, 0.15, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(jacketColor).multiplyScalar(0.9)} />
      </mesh>
      <mesh position={[0.6, 0.3, 0.25]}>
        <boxGeometry args={[0.3, 0.15, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(jacketColor).multiplyScalar(0.9)} />
      </mesh>

      {/* Chest Pocket */}
      <mesh position={[-0.5, 1.1, 0.25]}>
        <boxGeometry args={[0.2, 0.1, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(jacketColor).multiplyScalar(0.9)} />
      </mesh>

      {/* Trousers - Main body */}
      <mesh position={[0, -0.8, 0]}>
        <boxGeometry args={[1.8, 1.2, 0.4]} />
        <meshStandardMaterial
          color={trouserColor}
          roughness={trouserMaterialProps.roughness}
          metalness={trouserMaterialProps.metalness}
        />
      </mesh>

      {/* Trouser Legs - More realistic shape */}
      <mesh position={[-0.45, -2.2, 0]}>
        <cylinderGeometry args={[0.35, 0.32, 2.0, 8]} />
        <meshStandardMaterial
          color={trouserColor}
          roughness={trouserMaterialProps.roughness}
          metalness={trouserMaterialProps.metalness}
        />
      </mesh>
      <mesh position={[0.45, -2.2, 0]}>
        <cylinderGeometry args={[0.35, 0.32, 2.0, 8]} />
        <meshStandardMaterial
          color={trouserColor}
          roughness={trouserMaterialProps.roughness}
          metalness={trouserMaterialProps.metalness}
        />
      </mesh>

      {/* Trouser Cuffs (if enabled) */}
      {design.trousers.cuffs && (
        <>
          <mesh position={[-0.45, -3.15, 0]}>
            <cylinderGeometry args={[0.33, 0.35, 0.1, 8]} />
            <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.8)} />
          </mesh>
          <mesh position={[0.45, -3.15, 0]}>
            <cylinderGeometry args={[0.33, 0.35, 0.1, 8]} />
            <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.8)} />
          </mesh>
        </>
      )}

      {/* Trouser Pleats (if enabled) */}
      {design.trousers.pleats && (
        <>
          <mesh position={[-0.2, -0.5, 0.21]}>
            <boxGeometry args={[0.02, 0.8, 0.01]} />
            <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.8)} />
          </mesh>
          <mesh position={[0.2, -0.5, 0.21]}>
            <boxGeometry args={[0.02, 0.8, 0.01]} />
            <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.8)} />
          </mesh>
        </>
      )}

      {/* Belt area */}
      <mesh position={[0, -0.1, 0]}>
        <cylinderGeometry args={[0.92, 0.92, 0.08, 16]} />
        <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.1} />
      </mesh>

      {/* Trouser Pockets */}
      <mesh position={[-0.7, -0.6, 0.21]}>
        <boxGeometry args={[0.25, 0.3, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.9)} />
      </mesh>
      <mesh position={[0.7, -0.6, 0.21]}>
        <boxGeometry args={[0.25, 0.3, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.9)} />
      </mesh>

      {/* Back pockets */}
      <mesh position={[-0.5, -0.8, -0.21]}>
        <boxGeometry args={[0.2, 0.25, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.9)} />
      </mesh>
      <mesh position={[0.5, -0.8, -0.21]}>
        <boxGeometry args={[0.2, 0.25, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.9)} />
      </mesh>

      {/* Trouser Fly */}
      <mesh position={[0, -0.5, 0.21]}>
        <boxGeometry args={[0.02, 0.4, 0.01]} />
        <meshStandardMaterial color={new THREE.Color(trouserColor).multiplyScalar(0.8)} />
      </mesh>
    </group>
  )
}

// Main 3D Viewer Component
const Suit3DModel = ({ design }) => {
  return (
    <div className="w-full h-96 bg-gradient-to-b from-gray-100 to-gray-200 rounded-lg overflow-hidden">
      <Canvas shadows>
        <PerspectiveCamera makeDefault position={[0, 0, 6]} />
        <OrbitControls
          enablePan={false}
          enableZoom={true}
          minDistance={4}
          maxDistance={10}
          maxPolarAngle={Math.PI / 1.8}
          minPolarAngle={Math.PI / 6}
        />

        <ambientLight intensity={0.6} />
        <directionalLight
          position={[5, 8, 5]}
          intensity={1.2}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
        />
        <pointLight position={[-5, 5, 5]} intensity={0.4} />
        <spotLight position={[0, 10, 0]} intensity={0.3} angle={0.3} penumbra={0.2} />

        <Environment preset="studio" />

        <SuitModel design={design} />

        {/* Ground plane for better visual context */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -4, 0]} receiveShadow>
          <planeGeometry args={[20, 20]} />
          <meshStandardMaterial color="#f0f0f0" transparent opacity={0.3} />
        </mesh>
      </Canvas>
    </div>
  )
}

export default Suit3DModel
