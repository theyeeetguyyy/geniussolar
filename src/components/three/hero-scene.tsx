"use client";

import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Environment, Lightformer, Sparkles } from "@react-three/drei";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import type { MotionValue } from "motion/react";
import { createCellTexture, createGlowTexture } from "./textures";
import { ARRAY, CALLOUTS, sun, updateSun } from "./sun-state";

export type Quality = "high" | "low";

interface SceneProps {
  progress?: MotionValue<number>;
  pointer: React.RefObject<{ x: number; y: number }>;
  quality: Quality;
  reduced: boolean;
  layout: "desktop" | "mobile";
}

/* ------------------------------------------------------------------ */
/* Materials                                                            */
/* ------------------------------------------------------------------ */

function useMaterials() {
  return useMemo(() => {
    const cells = createCellTexture(1024);
    return {
      slab: new THREE.MeshStandardMaterial({ color: "#d6cdbd", roughness: 0.95 }),
      wall: new THREE.MeshStandardMaterial({ color: "#f5f2ec", roughness: 0.9 }),
      block: new THREE.MeshStandardMaterial({ color: "#eeeae2", roughness: 1 }),
      pedestal: new THREE.MeshStandardMaterial({ color: "#cfc9bd", roughness: 0.95 }),
      steel: new THREE.MeshStandardMaterial({ color: "#c4c9cf", metalness: 0.85, roughness: 0.32, envMapIntensity: 1.2 }),
      frame: new THREE.MeshStandardMaterial({ color: "#dfe2e6", metalness: 0.9, roughness: 0.22, envMapIntensity: 1.3 }),
      glass: new THREE.MeshPhysicalMaterial({
        map: cells,
        color: "#ffffff",
        metalness: 0,
        roughness: 0.24,
        clearcoat: 0.7,
        clearcoatRoughness: 0.06,
        envMapIntensity: 0.85,
        reflectivity: 0.32,
      }),
      backsheet: new THREE.MeshStandardMaterial({ color: "#2a2f36", roughness: 0.7 }),
      tank: new THREE.MeshStandardMaterial({ color: "#1d1f22", roughness: 0.55 }),
      inverter: new THREE.MeshStandardMaterial({ color: "#c81f2e", roughness: 0.38, metalness: 0.1 }),
      screen: new THREE.MeshStandardMaterial({ color: "#10151c", roughness: 0.2, emissive: "#6ee7a1", emissiveIntensity: 0.25 }),
      cable: new THREE.MeshStandardMaterial({ color: "#141518", roughness: 0.6 }),
      door: new THREE.MeshStandardMaterial({ color: "#8f887c", roughness: 0.8 }),
      spark: new THREE.MeshBasicMaterial({ color: "#ffc53d", toneMapped: false }),
    };
  }, []);
}

type Mats = ReturnType<typeof useMaterials>;

/* ------------------------------------------------------------------ */
/* Geometry helpers                                                     */
/* ------------------------------------------------------------------ */

function Box({
  size,
  position,
  rotation,
  material,
  cast = true,
  receive = true,
}: {
  size: [number, number, number];
  position: [number, number, number];
  rotation?: [number, number, number];
  material: THREE.Material;
  cast?: boolean;
  receive?: boolean;
}) {
  return (
    <mesh position={position} rotation={rotation} material={material} castShadow={cast} receiveShadow={receive}>
      <boxGeometry args={size} />
    </mesh>
  );
}

const TILT = (ARRAY.tilt * Math.PI) / 180;
const COLS = 5;
const ROWS = 2;
const PW = 1.134;
const PH = 2.278;
const GAP = 0.025;
/** Array plane pivot: centre of the tilted panel field. */
const PIVOT: [number, number, number] = [0, 3.05, 0.1];

/** World-space height of the array underside at a given world z (for column tops). */
const undersideAt = (zWorld: number) => PIVOT[1] - (zWorld - PIVOT[2]) * Math.tan(TILT) - 0.2;

/* ------------------------------------------------------------------ */
/* The building                                                         */
/* ------------------------------------------------------------------ */

function Rooftop({ m }: { m: Mats }) {
  const W = 11.2;
  const D = 9.4;
  const ph = 0.95;
  const t = 0.16;
  return (
    <group>
      {/* Building body and slab */}
      <Box size={[W, 12, D]} position={[0, -6.2, 0]} material={m.wall} cast={false} />
      <Box size={[W + 0.02, 0.36, D + 0.02]} position={[0, -0.18, 0]} material={m.slab} cast={false} />
      {/* Parapets */}
      <Box size={[W, ph, t]} position={[0, ph / 2, D / 2 - t / 2]} material={m.wall} />
      <Box size={[W, ph, t]} position={[0, ph / 2, -D / 2 + t / 2]} material={m.wall} />
      <Box size={[t, ph, D]} position={[W / 2 - t / 2, ph / 2, 0]} material={m.wall} />
      <Box size={[t, ph, D]} position={[-W / 2 + t / 2, ph / 2, 0]} material={m.wall} />
      {/* Parapet cap */}
      <Box size={[W + 0.1, 0.06, t + 0.1]} position={[0, ph + 0.03, D / 2 - t / 2]} material={m.slab} />
      {/* Stair headroom (mumty) with door and water tank */}
      <Box size={[2.2, 2.5, 2.3]} position={[-4.0, 1.25, -3.05]} material={m.wall} />
      <Box size={[2.35, 0.08, 2.45]} position={[-4.0, 2.54, -3.05]} material={m.slab} />
      <Box size={[0.9, 1.95, 0.04]} position={[-3.3, 0.98, -1.88]} material={m.door} cast={false} />
      <mesh position={[-4.3, 3.2, -3.2]} material={m.tank} castShadow receiveShadow>
        <cylinderGeometry args={[0.58, 0.62, 1.2, 28]} />
      </mesh>
      <mesh position={[-4.3, 3.84, -3.2]} material={m.tank} castShadow>
        <cylinderGeometry args={[0.22, 0.3, 0.1, 20]} />
      </mesh>
      {/* Inverter on the mumty wall */}
      <group position={[-4.55, 1.45, -1.87]}>
        <Box size={[0.46, 0.56, 0.18]} position={[0, 0, 0.09]} material={m.inverter} />
        <Box size={[0.2, 0.08, 0.01]} position={[0, 0.08, 0.185]} material={m.screen} cast={false} />
        <Box size={[0.52, 0.36, 0.12]} position={[0.62, -0.1, 0.06]} material={m.wall} />
      </group>
    </group>
  );
}

function ElevatedArray({ m }: { m: Mats }) {
  const fieldW = COLS * PW + (COLS - 1) * GAP;
  const fieldD = ROWS * PH + (ROWS - 1) * GAP;
  const colX = [-2.55, 0, 2.55];
  const colZ = [1.55, -1.55];
  return (
    <group>
      {/* Columns on pedestals, following the slope */}
      {colX.map((x) =>
        colZ.map((z) => {
          const top = undersideAt(z);
          return (
            <group key={`${x}${z}`}>
              <Box size={[0.36, 0.28, 0.36]} position={[x, 0.14, z]} material={m.pedestal} />
              <Box size={[0.1, top, 0.1]} position={[x, top / 2, z]} material={m.steel} />
            </group>
          );
        }),
      )}
      {/* Diagonal braces between front and back columns */}
      {colX.map((x) => {
        const y1 = 0.9;
        const y2 = undersideAt(-1.55) - 0.35;
        const dy = y2 - y1;
        const len = Math.hypot(dy, 3.1);
        return (
          <Box
            key={`brace${x}`}
            size={[0.05, 0.05, len]}
            position={[x, (y1 + y2) / 2, 0]}
            rotation={[Math.atan2(dy, 3.1), 0, 0]}
            material={m.steel}
          />
        );
      })}
      {/* Tilted field: rafters, purlins, modules */}
      <group position={PIVOT} rotation={[TILT, 0, 0]}>
        {colX.map((x) => (
          <Box key={`raf${x}`} size={[0.08, 0.14, fieldD + 0.3]} position={[x, -0.2, 0]} material={m.steel} />
        ))}
        {[-1.6, -0.55, 0.55, 1.6].map((z) => (
          <Box key={`pur${z}`} size={[fieldW + 0.2, 0.06, 0.06]} position={[0, -0.1, z]} material={m.steel} />
        ))}
        {Array.from({ length: COLS }).map((_, c) =>
          Array.from({ length: ROWS }).map((__, r) => {
            const x = -fieldW / 2 + PW / 2 + c * (PW + GAP);
            const z = -fieldD / 2 + PH / 2 + r * (PH + GAP);
            return (
              <group key={`p${c}${r}`} position={[x, 0, z]}>
                <mesh material={m.glass} rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.018, 0]} castShadow receiveShadow>
                  <planeGeometry args={[PW - 0.04, PH - 0.04]} />
                </mesh>
                <Box size={[PW - 0.02, 0.03, PH - 0.02]} position={[0, 0, 0]} material={m.backsheet} receive={false} />
                {/* Aluminium frame */}
                <Box size={[PW, 0.04, 0.03]} position={[0, 0.012, PH / 2 - 0.015]} material={m.frame} receive={false} />
                <Box size={[PW, 0.04, 0.03]} position={[0, 0.012, -PH / 2 + 0.015]} material={m.frame} receive={false} />
                <Box size={[0.03, 0.04, PH]} position={[PW / 2 - 0.015, 0.012, 0]} material={m.frame} receive={false} />
                <Box size={[0.03, 0.04, PH]} position={[-PW / 2 + 0.015, 0.012, 0]} material={m.frame} receive={false} />
              </group>
            );
          }),
        )}
      </group>
    </group>
  );
}

function makeRng(seed: number) {
  let s = seed;
  return () => {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

/** Pseudo-random but deterministic neighbourhood of white massing blocks. */
function Neighbourhood({ m, quality }: { m: Mats; quality: Quality }) {
  const blocks = useMemo(() => {
    const out: { p: [number, number, number]; s: [number, number, number]; tank: boolean; solar: boolean }[] = [];
    const rnd = makeRng(7);
    const range = quality === "high" ? 3 : 2;
    for (let gx = -range; gx <= range; gx++) {
      for (let gz = -range; gz <= range; gz++) {
        if (gx === 0 && gz === 0) continue;
        const leftSide = gx < 0;
        const w = 8.5 + rnd() * 3;
        const d = 8 + rnd() * 3;
        const top = -1.4 - rnd() * 6 + (rnd() > 0.9 ? 2.2 : 0);
        const h = 24 + top;
        out.push({
          p: [gx * 13.2 + (rnd() - 0.5) * 1.2, top - h / 2, gz * 12.6 + (rnd() - 0.5) * 1.2],
          s: [w, h, d],
          tank: rnd() > 0.4 && !leftSide,
          solar: rnd() > 0.78,
        });
      }
    }
    return out;
  }, [quality]);

  return (
    <group>
      {blocks.map((b, i) => {
        const top = b.p[1] + b.s[1] / 2;
        return (
          <group key={i}>
            <mesh position={b.p} material={m.block} receiveShadow>
              <boxGeometry args={b.s} />
            </mesh>
            {b.tank ? (
              <mesh position={[b.p[0] - b.s[0] * 0.28, top + 0.5, b.p[2] - b.s[2] * 0.25]} material={m.tank}>
                <cylinderGeometry args={[0.5, 0.55, 1, 16]} />
              </mesh>
            ) : null}
            {b.solar ? (
              <mesh position={[b.p[0] + 1, top + 0.9, b.p[2] + 0.5]} rotation={[TILT - Math.PI / 2, 0, 0]} material={m.backsheet}>
                <planeGeometry args={[4.6, 3.6]} />
              </mesh>
            ) : null}
          </group>
        );
      })}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -24, 0]}>
        <planeGeometry args={[400, 400]} />
        <meshBasicMaterial color="#fbfaf7" />
      </mesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Energy: cable with flowing current + ambient photons                 */
/* ------------------------------------------------------------------ */

function EnergyFlow({ m, reduced }: { m: Mats; reduced: boolean }) {
  const { curve, tube } = useMemo(() => {
    const pts = [
      new THREE.Vector3(-2.55, undersideAt(-1.55) - 0.05, -1.62),
      new THREE.Vector3(-2.55, 0.12, -1.62),
      new THREE.Vector3(-2.9, 0.08, -1.74),
      new THREE.Vector3(-4.35, 0.08, -1.74),
      new THREE.Vector3(-4.55, 0.12, -1.74),
      new THREE.Vector3(-4.55, 1.12, -1.74),
    ];
    const path = new THREE.CurvePath<THREE.Vector3>();
    for (let i = 0; i < pts.length - 1; i++) path.add(new THREE.LineCurve3(pts[i], pts[i + 1]));
    return { curve: path, tube: new THREE.TubeGeometry(path, 120, 0.022, 6, false) };
  }, []);

  const count = 16;
  const inst = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);
  const t = useRef(0);

  useFrame((_, delta) => {
    const mesh = inst.current;
    if (!mesh) return;
    const out = sun.output;
    if (!reduced) t.current = (t.current + delta * (0.08 + out * 0.22)) % 1;
    for (let i = 0; i < count; i++) {
      const u = (t.current + i / count) % 1;
      const p = curve.getPointAt(u);
      dummy.position.copy(p);
      const s = 0.035 + out * 0.05;
      dummy.scale.setScalar(out > 0.02 ? s : 0.0001);
      dummy.updateMatrix();
      mesh.setMatrixAt(i, dummy.matrix);
    }
    mesh.instanceMatrix.needsUpdate = true;
  });

  return (
    <group>
      <mesh geometry={tube} material={m.cable} castShadow />
      <instancedMesh ref={inst} args={[undefined, undefined, count]} material={m.spark}>
        <sphereGeometry args={[1, 10, 10]} />
      </instancedMesh>
    </group>
  );
}

/* ------------------------------------------------------------------ */
/* Sun, sky light and camera                                            */
/* ------------------------------------------------------------------ */

const warm = new THREE.Color("#ffb45e");
const noon = new THREE.Color("#fff4e2");
const skyLow = new THREE.Color("#f3dcc0");
const skyHigh = new THREE.Color("#dbe8f3");

function SunRig({ quality, reduced }: { quality: Quality; reduced: boolean }) {
  const light = useRef<THREE.DirectionalLight>(null);
  const hemi = useRef<THREE.HemisphereLight>(null);
  const disc = useRef<THREE.Group>(null);
  const glow = useMemo(() => createGlowTexture(), []);
  const target = useMemo(() => {
    const o = new THREE.Object3D();
    o.position.set(0, 1, 0);
    return o;
  }, []);

  useFrame((_, delta) => {
    if (sun.auto && !reduced && performance.now() - sun.lastTouch > 5000) {
      sun.hour += delta * 0.32;
      if (sun.hour > 18.4) sun.hour = 6.1;
    }
    const d = updateSun(sun.hour);
    const el = Math.max(0, sun.elevation);
    const k = Math.min(1, el / 40);
    if (light.current) {
      light.current.position.set(d.x * 30, Math.max(0.5, d.y * 30), d.z * 30);
      light.current.color.copy(warm).lerp(noon, k);
      light.current.intensity = sun.elevation > 0 ? 0.9 + 3.4 * Math.pow(Math.sin((el * Math.PI) / 180), 0.6) : 0.25;
    }
    if (hemi.current) {
      hemi.current.color.copy(skyLow).lerp(skyHigh, k);
      hemi.current.intensity = 0.32 + 0.3 * k;
    }
    if (disc.current) {
      disc.current.position.set(d.x * 90, d.y * 90, d.z * 90);
    }
  });

  const map = quality === "high" ? 2048 : 1024;
  return (
    <>
      <primitive object={target} />
      <directionalLight
        ref={light}
        target={target}
        castShadow
        shadow-mapSize={[map, map]}
        shadow-bias={-0.0004}
        shadow-normalBias={0.03}
        shadow-radius={quality === "high" ? 6 : 3}
        shadow-camera-left={-11}
        shadow-camera-right={11}
        shadow-camera-top={11}
        shadow-camera-bottom={-11}
        shadow-camera-near={1}
        shadow-camera-far={80}
      />
      <hemisphereLight ref={hemi} groundColor="#e8e0d2" />
      <ambientLight intensity={0.05} />
      <group ref={disc}>
        <mesh>
          <sphereGeometry args={[2.4, 24, 24]} />
          <meshBasicMaterial color="#ffe2a0" toneMapped={false} fog={false} />
        </mesh>
        <sprite scale={[26, 26, 1]}>
          <spriteMaterial map={glow} transparent depthWrite={false} blending={THREE.AdditiveBlending} fog={false} opacity={0.9} />
        </sprite>
      </group>
    </>
  );
}

function CameraRig({ progress, pointer, reduced, layout }: Pick<SceneProps, "progress" | "pointer" | "reduced" | "layout">) {
  const { camera } = useThree();
  const look = useMemo(() => new THREE.Vector3(), []);
  const want = useMemo(() => new THREE.Vector3(), []);
  const smooth = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const p = progress?.get() ?? 0;
    const px = reduced ? 0 : pointer.current?.x ?? 0;
    const py = reduced ? 0 : pointer.current?.y ?? 0;
    smooth.current.x += (px - smooth.current.x) * 0.05;
    smooth.current.y += (py - smooth.current.y) * 0.05;
    const base = layout === "desktop" ? [14.2, 9.6, 18] : [15, 12.5, 22];
    want.set(
      base[0] + smooth.current.x * 1.6 - p * 5,
      base[1] - smooth.current.y * 0.9 + p * 7,
      base[2] - p * 4,
    );
    camera.position.lerp(want, 0.08);
    look.set(0, 1.4 + p * 0.4, 0);
    camera.lookAt(look);
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Engineering callouts                                                 */
/* ------------------------------------------------------------------ */

/** Projects callout anchors to screen space; the DOM overlay in HeroExperience draws them. */
function CalloutProjector() {
  const v = useMemo(() => new THREE.Vector3(), []);
  useFrame(({ camera, size }) => {
    CALLOUTS.forEach((c, i) => {
      v.set(...c.p).project(camera);
      sun.callouts[i] = { x: ((v.x + 1) / 2) * size.width, y: ((1 - v.y) / 2) * size.height, visible: v.z < 1 };
    });
  });
  return null;
}

/* ------------------------------------------------------------------ */
/* Scene                                                                */
/* ------------------------------------------------------------------ */

function Scene(props: SceneProps) {
  const m = useMaterials();
  const envSun = useRef<THREE.Group>(null);

  useFrame(() => {
    if (envSun.current) {
      const d = updateSun(sun.hour);
      envSun.current.position.set(d.x * 14, Math.max(0.5, d.y * 14), d.z * 14);
      envSun.current.lookAt(0, 0, 0);
    }
  });

  return (
    <>
      <fog attach="fog" args={["#fbfaf7", 38, 95]} />
      <Environment resolution={props.quality === "high" ? 256 : 128} frames={props.quality === "high" && !props.reduced ? Infinity : 1}>
        <color attach="background" args={["#8fa3b8"]} />
        <Lightformer form="rect" intensity={1.4} color="#ffffff" scale={[18, 6, 1]} position={[0, 12, -6]} rotation={[Math.PI / 2.4, 0, 0]} />
        <Lightformer form="rect" intensity={0.9} color="#eef3f8" scale={[40, 2, 1]} position={[0, 2, 14]} />
        <Lightformer form="rect" intensity={0.6} color="#f6efe4" scale={[3, 20, 1]} position={[-14, 4, 0]} rotation={[0, Math.PI / 2, 0]} />
        <group ref={envSun}>
          <Lightformer form="circle" intensity={7} color="#ffd89a" scale={3.2} />
        </group>
      </Environment>

      <SunRig quality={props.quality} reduced={props.reduced} />
      <CameraRig progress={props.progress} pointer={props.pointer} reduced={props.reduced} layout={props.layout} />

      <Rooftop m={m} />
      <ElevatedArray m={m} />
      <EnergyFlow m={m} reduced={props.reduced} />
      {props.layout === "desktop" ? <CalloutProjector /> : null}
      <Neighbourhood m={m} quality={props.quality} />

      {!props.reduced ? (
        <Sparkles
          count={props.quality === "high" ? 46 : 18}
          scale={[7.5, 2.4, 5.5]}
          position={[0, 4.4, 0]}
          size={2.6}
          speed={0.35}
          opacity={0.85}
          color="#ffc24a"
          noise={0.6}
        />
      ) : null}
    </>
  );
}

export default function HeroCanvas(props: SceneProps & { active: boolean; onReady?: () => void }) {
  const { active, onReady, ...scene } = props;
  return (
    <Canvas
      shadows="percentage"
      dpr={scene.quality === "high" ? [1, 1.75] : [1, 1.35]}
      frameloop={active ? "always" : "never"}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      camera={{ position: [15.5, 10.2, 19.5], fov: scene.layout === "desktop" ? 30 : 34, near: 0.5, far: 260, filmOffset: scene.layout === "desktop" ? -7.5 : 0 }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.ACESFilmicToneMapping;
        gl.toneMappingExposure = 1.0;
        onReady?.();
      }}
      style={{ touchAction: "pan-y" }}
    >
      <Scene {...scene} />
    </Canvas>
  );
}
