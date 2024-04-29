import { memo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
//@ts-ignore
import { useGLTF } from "@react-three/drei";
import { isBrowser } from "react-device-detect";
//@ts-ignore
import bird from "../../assets/3d/bird.glb";
import useStore3d from "../../store/store3d";
import { SCENE, SCENE_POSITION } from "./helpers/sceneConst";

const PreBirds = () => {
  const sceneRef = useStore3d((state) => state.sceneRef);
  const { nodes } = useGLTF(bird);

  const birdGroupRefs = useRef<THREE.Group[]>([]);
  const addBirdRef = (ref: THREE.Group) => {
    if (!birdGroupRefs.current.includes(ref)) birdGroupRefs.current.push(ref);
  };

  const birdList = [
    { x: -20, y: 50, z: 90 },
    { x: -10, y: 80, z: 80 },
    { x: 20, y: 40, z: 50 },
    { x: 40, y: 30, z: 20 },

    { x: 120, y: 40, z: 150 },
    { x: 140, y: 30, z: 120 },
  ];
  const birdMoveMultiplier = isBrowser ? 100 : 60;
  const moveBird = () => {
    birdGroupRefs.current.forEach((birdMesh, i) => {
      if (birdMesh) {
        const newPos = {
          x:
            birdList[i].x -
            Math.cos((Date.now() + i * 1000) * 0.0006) *
              (birdMoveMultiplier + 10),
          y: birdList[i].y,
          z:
            birdList[i].z -
            Math.sin((Date.now() + i * 1000) * 0.0006) * birdMoveMultiplier,
        };

        birdMesh.lookAt(
          SCENE_POSITION[SCENE.ocean].x + newPos.x,
          SCENE_POSITION[SCENE.ocean].y,
          SCENE_POSITION[SCENE.ocean].z + newPos.z
        );
        birdMesh.position.setX(newPos.x);
        birdMesh.position.setY(newPos.y);
        birdMesh.position.setZ(newPos.z);
      }
    });
  };

  useFrame(() => {
    if (sceneRef.current === SCENE.ocean) {
      moveBird();
    } else {
      // hide the birds when not in ocean scene
      birdGroupRefs.current.forEach((birdMesh, i) => {
        if (birdMesh) {
          birdMesh.position.setX(0);
          birdMesh.position.setY(-100);
          birdMesh.position.setZ(0);
        }
      });
    }
  });

  return (
    <>
      {birdList.map((bird, i) => (
        <group
          key={i}
          position={[bird.x, bird.y, bird.z]}
          ref={(ref) => {
            if (ref !== null) addBirdRef(ref);
          }}
        >
          <mesh
            position={[0, 0, 0]}
            rotation={[Math.PI, -0.4, 0]}
            geometry={nodes.canadian_g.geometry}
          >
            <meshStandardMaterial
              attach="material"
              color={"#DDA"}
              side={THREE.DoubleSide}
            />
          </mesh>
        </group>
      ))}
    </>
  );
};

export const Birds = memo(PreBirds);
