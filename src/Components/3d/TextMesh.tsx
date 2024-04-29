import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { isBrowser } from "react-device-detect";
import { extend, useFrame } from "@react-three/fiber";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import useStore3d from "../../store/store3d";
import Altasi from "../../assets/Alatsi_Regular.json";
import { SCENE, SCENE_POSITION } from "./helpers/sceneConst";

extend({ TextGeometry });

interface TextMeshProps {
  isDarkMode: boolean;
}

const TextMesh = ({ isDarkMode }: TextMeshProps) => {
  const sceneRef = useStore3d((state) => state.sceneRef);
  const textMeshRef = useRef<THREE.Mesh>(null!);
  const textGeoRef = useRef(null!);
  const textMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const showingSceneTextRef = useRef<number>(-1);
  const [color, setColor] = useState(isDarkMode ? "white" : "black");

  const font = new FontLoader().parse(Altasi);
  const sysPos = SCENE_POSITION[SCENE.system];
  const oceanPos = SCENE_POSITION[SCENE.ocean];
  const sceneText: {
    [key: number]: {
      timeDelay?: number;
      startPosition: { x: number; y: number; z: number };
      position: { x: number; y: number; z: number };
      text: string;
      textOptions: {
        font: object; // JSON font data
        size: number;
        height: number;
        curveSegments: number;
        bevelEnabled: boolean;
      };
    };
  } = {
    [SCENE.preSys]: {
      startPosition: {
        x: isBrowser ? -10 + sysPos.x : -4 + sysPos.x,
        y: -8 + sysPos.y,
        z: 10 + sysPos.z,
      },
      position: {
        x: isBrowser ? -30 + sysPos.x : -11 + sysPos.x,
        y: -14 + sysPos.y,
        z: -10 + sysPos.z,
      },
      text: "CREATIVE IDEAS",
      textOptions: {
        font,
        size: isBrowser ? 3 : 2,
        height: isBrowser ? 0.2 : 0.15,
        curveSegments: 12,
        bevelEnabled: false,
      },
    },
    [SCENE.system]: {
      startPosition: {
        x: isBrowser ? -30 + sysPos.x : -11 + sysPos.x,
        y: -14 + sysPos.y,
        z: -10 + sysPos.z,
      },
      position: {
        x: isBrowser ? 10 + sysPos.x : -10 + sysPos.x,
        y: 14 + sysPos.y,
        z: -10 + sysPos.z,
      },
      text: "TAKING FORM",
      textOptions: {
        font,
        size: isBrowser ? 3 : 2,
        height: isBrowser ? 0.2 : 0.15,
        curveSegments: 12,
        bevelEnabled: false,
      },
    },
    [SCENE.ocean]: {
      startPosition: {
        x: isBrowser ? -40 + oceanPos.x : -16 + oceanPos.x,
        y: -40 + oceanPos.y,
        z: 100 + oceanPos.z,
      },
      position: {
        x: isBrowser ? -40 + oceanPos.x : -16 + oceanPos.x,
        y: 40 + oceanPos.y,
        z: 100 + oceanPos.z,
      },
      text: "IMAGINE POSSIBILITIES",
      textOptions: {
        font,
        size: isBrowser ? 3 : 2,
        height: isBrowser ? 0.2 : 0.15,
        curveSegments: 12,
        bevelEnabled: false,
      },
    },
  };

  useEffect(() => {
    const newColor = isDarkMode ? "white" : "black";
    setColor(newColor);
  }, [isDarkMode]);

  /*
  // example of scroll effect
  useEffect(() => {
    const handleScroll = () => {
      if (textMeshRef.current) {
        textMeshRef.current.rotation.y = window.scrollY * 0.01; // Adjust the multiplier as needed
      }
    };
  }, []);
  */

  useFrame(() => {
    if (sceneText[sceneRef.current]) {
      if (showingSceneTextRef.current !== sceneRef.current) {
        showingSceneTextRef.current = sceneRef.current;
        textMeshRef.current.position.x =
          sceneText[sceneRef.current].startPosition.x;
        textMeshRef.current.position.y =
          sceneText[sceneRef.current].startPosition.y;
        textMeshRef.current.position.z =
          sceneText[sceneRef.current].startPosition.z;
      }
      if (sceneText[sceneRef.current].timeDelay) {
        textMatRef.current.opacity = 0;
        setTimeout(() => {
          textMatRef.current.opacity = 1;
        }, sceneText[sceneRef.current].timeDelay);
      } else {
        textMatRef.current.opacity +=
          textMatRef.current.opacity === 1 ? 0 : 0.05;
      }
      if (sceneText[sceneRef.current].startPosition) {
        textMeshRef.current.position.x +=
          (sceneText[sceneRef.current].position.x -
            textMeshRef.current.position.x) *
          0.05;
        textMeshRef.current.position.y +=
          (sceneText[sceneRef.current].position.y -
            textMeshRef.current.position.y) *
          0.05;
        textMeshRef.current.position.z +=
          (sceneText[sceneRef.current].position.z -
            textMeshRef.current.position.z) *
          0.05;
      } else {
        textMeshRef.current.position.x = sceneText[sceneRef.current].position.x;
        textMeshRef.current.position.y = sceneText[sceneRef.current].position.y;
        textMeshRef.current.position.z = sceneText[sceneRef.current].position.z;
      }
    } else {
      textMatRef.current.opacity = 0;
    }
  });

  return (
    <>
      <mesh ref={textMeshRef}>
        {/* Property 'textGeometry' does not exist on type 'JSX.IntrinsicElements'. */}
        {/* @ts-ignore */}
        <textGeometry
          ref={textGeoRef}
          attach="geometry"
          args={[
            sceneText[sceneRef.current]?.text,
            sceneText[sceneRef.current]?.textOptions,
          ]}
        />
        <meshBasicMaterial
          ref={textMatRef}
          attach="material"
          color={color}
          transparent={true}
          opacity={1}
        />
      </mesh>
    </>
  );
};

export default TextMesh;
