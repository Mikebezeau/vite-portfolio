import { useRef } from "react";
import * as THREE from "three";
import useStore3d from "../../store/store3d";
import { useFrame } from "@react-three/fiber";
import {} from "./System";
import {
  SCENE,
  SCENE_POSITION,
  SCENE_CAMERA_POSITION,
} from "./helpers/sceneConst";

export default function Lights() {
  const sceneRef = useStore3d((state) => state.sceneRef);

  const ambientLightRef = useRef<THREE.AmbientLight>(null!);
  const lightsRef = useRef<THREE.PointLight[]>([]);
  const addLightRef = (ref: THREE.PointLight) => {
    if (!lightsRef.current.includes(ref)) lightsRef.current.push(ref);
  };

  //lights const
  type Light = {
    color: string;
    decay: number;
    position: THREE.Vector3;
    scenes: number[];
  };
  const lights: Light[] = [
    // Light from sun
    {
      color: "white",
      decay: 0,
      position: SCENE_POSITION[SCENE.system],
      scenes: [SCENE.preSys, SCENE.system, SCENE.zoomInEarth],
    },
    //for ocean scene
    {
      color: "white",
      decay: 0.03,
      position: new THREE.Vector3(
        SCENE_POSITION[SCENE.ocean].x,
        SCENE_POSITION[SCENE.ocean].y + 150,
        SCENE_POSITION[SCENE.ocean].z
      ),
      scenes: [SCENE.ocean, SCENE.tiles],
    },
    //for tiles scene, must be inside the box
    {
      color: "white",
      decay: 0.03,
      position: new THREE.Vector3(
        SCENE_CAMERA_POSITION[SCENE.tiles].x,
        SCENE_CAMERA_POSITION[SCENE.tiles].y,
        SCENE_CAMERA_POSITION[SCENE.tiles].z
      ),
      scenes: [SCENE.tiles],
    },
  ];

  useFrame(() => {
    lightsRef.current.forEach((light, i) => {
      if (lights[i].scenes.includes(sceneRef.current)) {
        if (light.intensity === 0) {
          light.intensity = 1;
        }
      } else {
        if (light.intensity === 1) {
          light.intensity = 0;
        }
      }
    });
  });

  return (
    <>
      <ambientLight ref={ambientLightRef} color="white" intensity={0.15} />
      {lights.map((light, i) => (
        <pointLight
          key={i}
          ref={(ref) => {
            if (ref !== null) addLightRef(ref);
          }}
          position={light.position}
          color={light.color}
          distance={1000}
          decay={light.decay}
          intensity={0}
        />
      ))}
    </>
  );
}
