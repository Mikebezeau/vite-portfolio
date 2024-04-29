import { memo } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
//@ts-ignore
import mech from "../../assets/3d/mech.gltf";

const PreMechMesh = () => {
  const gltf = useLoader(GLTFLoader, mech);
  // mesh
  const mechMaterial = new THREE.MeshPhongMaterial({
    polygonOffset: true,
    polygonOffsetFactor: 1, // positive value pushes polygon further away
    polygonOffsetUnits: 1,
    //color: 0xff0000,
    //emissive: "gray",
    //emissiveIntensity: 0.1,
  });

  return (
    <group rotation={[0, Math.PI, 0]}>
      <mesh geometry={gltf.nodes.mech.geometry} material={mechMaterial}>
        {/*<meshNormalMaterial
        attach="material"
        wireframe={true}
        side={THREE.FrontSide}
  />*/}
      </mesh>
      <lineSegments geometry={gltf.nodes.mech.geometry}>
        <lineBasicMaterial color={"#555"} />
      </lineSegments>
    </group>
  );
};

export const MechMesh = memo(PreMechMesh);
