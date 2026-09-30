"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, Lightformer } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { createCellTexture } from "./textures";

export const LAYER_COUNT = 7;

const W = 1.7;
const H = 3.0;

function smooth(e0: number, e1: number, x: number) {
  const t = Math.min(1, Math.max(0, (x - e0) / (e1 - e0)));
  return t * t * (3 - 2 * t);
}

function Panel({ progress, reduced }: { progress: MotionValue<number>; reduced: boolean }) {
  const group = useRef<THREE.Group>(null);
  const halo = useRef<THREE.LineSegments>(null);
  const haloGeo = useMemo(() => new THREE.EdgesGeometry(new THREE.BoxGeometry(W + 0.16, 0.04, H + 0.16)), []);
  const l0 = useRef<THREE.Group>(null);
  const l1 = useRef<THREE.Group>(null);
  const l2 = useRef<THREE.Group>(null);
  const l3 = useRef<THREE.Group>(null);
  const l4 = useRef<THREE.Group>(null);
  const l5 = useRef<THREE.Group>(null);
  const l6 = useRef<THREE.Group>(null);
  const mats = useMemo(() => {
    const cells = createCellTexture(1024);
    return {
      glass: new THREE.MeshPhysicalMaterial({
        color: "#dff1ff",
        transparent: true,
        opacity: 0.18,
        roughness: 0.05,
        metalness: 0,
        clearcoat: 1,
        envMapIntensity: 2,
        side: THREE.DoubleSide,
        depthWrite: false,
      }),
      eva: new THREE.MeshStandardMaterial({ color: "#ffffff", transparent: true, opacity: 0.22, roughness: 0.4, depthWrite: false }),
      cells: new THREE.MeshPhysicalMaterial({ map: cells, roughness: 0.3, clearcoat: 0.4, envMapIntensity: 0.8 }),
      back: new THREE.MeshStandardMaterial({ color: "#eef0f3", roughness: 0.6 }),
      frame: new THREE.MeshStandardMaterial({ color: "#d9dce1", metalness: 0.9, roughness: 0.25, envMapIntensity: 1.4 }),
      jbox: new THREE.MeshStandardMaterial({ color: "#1b1d21", roughness: 0.5 }),
      cable: new THREE.MeshStandardMaterial({ color: "#111214", roughness: 0.6 }),
      mc4: new THREE.MeshStandardMaterial({ color: "#2a2d33", roughness: 0.4, metalness: 0.2 }),
    };
  }, []);

  useFrame((state, delta) => {
    const p = reduced ? 0.55 : progress.get();
    const explode = smooth(0.04, 0.3, p);
    const active = Math.min(LAYER_COUNT - 1, Math.floor(smooth(0.14, 0.96, p) * LAYER_COUNT));
    const spread = 0.52;
    const layers = [l0.current, l1.current, l2.current, l3.current, l4.current, l5.current, l6.current];
    layers.forEach((l, i) => {
      if (!l) return;
      // Top layer (glass) index 0 rises highest.
      const targetY = (LAYER_COUNT - 1 - i) * spread * explode - (i === 5 ? 0 : 0);
      l.position.y += (targetY - l.position.y) * Math.min(1, delta * 6);
      const s = i === active && explode > 0.5 ? 1.035 : 1;
      l.scale.x += (s - l.scale.x) * Math.min(1, delta * 6);
      l.scale.z += (s - l.scale.z) * Math.min(1, delta * 6);
    });
    if (halo.current) {
      const target = layers[active];
      if (target) halo.current.position.y += (target.position.y - halo.current.position.y) * Math.min(1, delta * 8);
      const mat = halo.current.material as THREE.LineBasicMaterial;
      mat.opacity += ((explode > 0.5 ? 1 : 0) - mat.opacity) * Math.min(1, delta * 5);
    }
    if (group.current) {
      const t = state.clock.elapsedTime;
      group.current.rotation.y = -0.75 + p * 0.7 + (reduced ? 0 : Math.sin(t * 0.3) * 0.04);
      group.current.rotation.x = 0.3 - p * 0.08;
    }
  });

  return (
    <group ref={group} position={[0, -1.35, 0]}>
      <lineSegments ref={halo} geometry={haloGeo}>
        <lineBasicMaterial color="#f5a300" transparent opacity={0} toneMapped={false} />
      </lineSegments>
      {/* 0 Glass */}
      <group ref={l0}>
        <mesh material={mats.glass}>
          <boxGeometry args={[W, 0.03, H]} />
        </mesh>
      </group>
      {/* 1 EVA front */}
      <group ref={l1}>
        <mesh material={mats.eva}>
          <boxGeometry args={[W - 0.02, 0.012, H - 0.02]} />
        </mesh>
      </group>
      {/* 2 Cells */}
      <group ref={l2}>
        <mesh rotation={[-Math.PI / 2, 0, 0]} material={mats.cells} position={[0, 0.006, 0]}>
          <planeGeometry args={[W - 0.06, H - 0.06]} />
        </mesh>
        <mesh material={mats.back} position={[0, -0.002, 0]}>
          <boxGeometry args={[W - 0.06, 0.008, H - 0.06]} />
        </mesh>
      </group>
      {/* 3 EVA rear */}
      <group ref={l3}>
        <mesh material={mats.eva}>
          <boxGeometry args={[W - 0.02, 0.012, H - 0.02]} />
        </mesh>
      </group>
      {/* 4 Backsheet */}
      <group ref={l4}>
        <mesh material={mats.back}>
          <boxGeometry args={[W, 0.02, H]} />
        </mesh>
      </group>
      {/* 5 Frame */}
      <group ref={l5}>
        {[
          { s: [W + 0.08, 0.14, 0.05], p: [0, 0, H / 2 + 0.02] },
          { s: [W + 0.08, 0.14, 0.05], p: [0, 0, -H / 2 - 0.02] },
          { s: [0.05, 0.14, H], p: [W / 2 + 0.02, 0, 0] },
          { s: [0.05, 0.14, H], p: [-W / 2 - 0.02, 0, 0] },
        ].map((b, i) => (
          <mesh key={i} material={mats.frame} position={b.p as [number, number, number]}>
            <boxGeometry args={b.s as [number, number, number]} />
          </mesh>
        ))}
      </group>
      {/* 6 Junction box + MC4 leads */}
      <group ref={l6} position={[0, 0, -H / 2 + 0.45]}>
        <mesh material={mats.jbox} position={[0, -0.02, 0]}>
          <boxGeometry args={[0.56, 0.14, 0.36]} />
        </mesh>
        {[-0.5, 0.5].map((x) => (
          <group key={x}>
            <mesh material={mats.cable} position={[x * 0.9, -0.06, 0.08]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.018, 0.018, 0.5, 8]} />
            </mesh>
            <mesh material={mats.mc4} position={[x * 1.45, -0.06, 0.08]} rotation={[0, 0, Math.PI / 2]}>
              <cylinderGeometry args={[0.04, 0.04, 0.16, 12]} />
            </mesh>
          </group>
        ))}
      </group>
    </group>
  );
}

export default function PanelExplode({ progress, reduced, active }: { progress: MotionValue<number>; reduced: boolean; active: boolean }) {
  return (
    <Canvas
      dpr={[1, 1.75]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true }}
      camera={{ position: [0, 2.6, 9.2], fov: 30 }}
      onCreated={({ camera }) => camera.lookAt(0, 0.35, 0)}
    >
      <ambientLight intensity={0.5} />
      <directionalLight position={[4, 8, 5]} intensity={2.2} />
      <Environment resolution={128} frames={1}>
        <color attach="background" args={["#9fb2c4"]} />
        <Lightformer form="rect" intensity={2} scale={[10, 4, 1]} position={[0, 6, 2]} rotation={[Math.PI / 2, 0, 0]} />
        <Lightformer form="rect" intensity={1.2} color="#ffe2b0" scale={[2, 8, 1]} position={[6, 2, 0]} rotation={[0, -Math.PI / 2, 0]} />
        <Lightformer form="rect" intensity={0.8} scale={[20, 1.5, 1]} position={[0, 0.5, 8]} />
      </Environment>
      <Panel progress={progress} reduced={reduced} />
    </Canvas>
  );
}
