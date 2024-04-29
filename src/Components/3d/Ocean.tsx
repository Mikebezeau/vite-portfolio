import { useEffect, useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";
import useStore3d from "../../store/store3d";
import { SCENE } from "./helpers/sceneConst";
import cloudsImg from "../../assets/3d/sunset.jpg";
import { Birds } from "./Birds";

const Ocean = () => {
  const sceneRef = useStore3d((state) => state.sceneRef);
  const oceanWidth = 1600;
  const oceanLength = 300;

  const cloudImageMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const CloudsImagePlane = () => {
    const texture = useLoader(THREE.TextureLoader, cloudsImg);
    const ratio = texture.image.width / texture.image.height;
    return (
      <group position={[0, 50, -250]}>
        <mesh>
          <planeGeometry attach="geometry" args={[2200, 2200 / ratio, 1, 1]} />
          <meshBasicMaterial
            ref={cloudImageMatRef}
            attach="material"
            map={texture}
            toneMapped={false}
            transparent={true}
            opacity={sceneRef.current === SCENE.ocean ? 1 : 0}
          />
        </mesh>
      </group>
    );
  };

  const oceanMesh = useRef<THREE.Mesh>(null!);

  interface WaveProps {
    x: number;
    y: number;
    z: number;
    ang: number;
    speed: number;
  }
  const waves = useRef<WaveProps[]>([]);
  const geom = new THREE.PlaneGeometry(oceanWidth, oceanLength, 30, 20);
  geom.deleteAttribute("normal");
  geom.deleteAttribute("uv");
  const geometry = BufferGeometryUtils.mergeVertices(geom);

  useEffect(() => {
    const positionAttribute = geometry.getAttribute("position");
    //@ts-ignore
    positionAttribute.setUsage(THREE.DynamicDrawUsage);
    const v = new THREE.Vector3();
    if (waves.current.length === 0) {
      for (let i = 0; i < positionAttribute.array.length; i++) {
        v.fromBufferAttribute(positionAttribute, i);
        waves.current.push({
          y: v.y,
          x: v.x,
          z: v.z,
          ang: Math.random() * Math.PI,
          speed: 0.016 + Math.random() * 0.032,
        });
      }
    }
  }, []);

  const moveWaves = () => {
    //@ts-ignore
    const positionAttribute =
      oceanMesh.current.geometry.getAttribute("position");
    const v = new THREE.Vector3();
    for (let i = 0; i < positionAttribute.array.length; i++) {
      v.fromBufferAttribute(positionAttribute, i);
      const vprops = waves.current[i];
      // make waves move less when they are further from the camera
      const distanceRatio = (oceanLength / 2 + vprops.y) / oceanLength; // y distance start at *oceanLength/2* to *- oceanLength/2*
      v.x = vprops.x + Math.cos(vprops.ang) * 3 * distanceRatio;
      v.z = vprops.z + Math.sin(vprops.ang) * 5 * distanceRatio;
      vprops.ang += vprops.speed;
      positionAttribute.setXYZ(i, v.x, vprops.y, v.z);
    }
    positionAttribute.needsUpdate = true;
  };

  useFrame(() => {
    if (sceneRef.current === SCENE.ocean || sceneRef.current === SCENE.tiles) {
      moveWaves();
      cloudImageMatRef.current.opacity = 1;
    } else {
      cloudImageMatRef.current.opacity = 0;
    }
  });

  const mat = new THREE.MeshPhongMaterial({
    color: "rgb(104, 195, 192)", // 104	195	192
    transparent: true,
    opacity: 0.9,
    flatShading: true,
    side: THREE.DoubleSide,
  });

  return (
    <>
      <CloudsImagePlane />
      <Birds />
      <mesh
        ref={oceanMesh}
        position={[0, -35, -45] /*0, -35, -45*/}
        rotation={[Math.PI / 2 - 0.35, 0, 0] /*-0.35, 0, 0*/}
        geometry={geometry}
        material={mat}
      />
    </>
  );
};

export default Ocean;
