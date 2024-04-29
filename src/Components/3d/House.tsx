import { memo } from "react";
import * as THREE from "three";
//@ts-ignore
import { useGLTF } from "@react-three/drei";
//@ts-ignore
import house from "../../assets/3d/house.glb";

const PreHouseMesh = () => {
  const { nodes } = useGLTF(house);
  return (
    <group rotation={[-Math.PI / 2, 0, Math.PI / 5]}>
      <mesh geometry={nodes.Object_2.geometry} />
      <meshStandardMaterial color={"#555"} side={THREE.DoubleSide} />
    </group>
  );
};

export const HouseMesh = memo(PreHouseMesh);
