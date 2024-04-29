import { Suspense, useMemo, useRef } from "react";
import * as THREE from "three";
import { useLoader } from "@react-three/fiber";
import useStore3d from "../../store/store3d";
import { SCENE } from "./helpers/sceneConst";
//@ts-ignore
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { useFrame } from "@react-three/fiber";
import earthMap from "../../assets/3d/system/earthMap4k.jpg";
import jupitermap from "../../assets/3d/system/jupitermap.jpg";
import marsmap from "../../assets/3d/system/marsmap.jpg";
import mercurymap from "../../assets/3d/system/mercurymap.jpg";
//import moonmap from "../../assets/3d/system/moonmap.jpg";
import neptunmap from "../../assets/3d/system/neptunmap.jpg";
//import plutomap from "../../assets/3d/system/plutomap.jpg";
import saturnmap from "../../assets/3d/system/saturnmap.jpg";
import sunmap from "../../assets/3d/system/sunmap.jpg";
import uranusmap from "../../assets/3d/system/uranusmap.jpg";
import venusmap from "../../assets/3d/system/venusmap.jpg";

import {
  rotationSpeedScale,
  calcAdjustedRadius,
  calcAdjustedSize,
  planets,
  getPlanetPosition,
  earthPlanetIndex,
} from "./helpers/systemHelper";

const System = () => {
  const pageNumberRef = useStore3d((state) => state.pageNumberRef);
  const sceneRef = useStore3d((state) => state.sceneRef);
  const earthMapTexture = useLoader(TextureLoader, earthMap);
  const jupiterMapTexture = useLoader(TextureLoader, jupitermap);
  const marsMapTexture = useLoader(TextureLoader, marsmap);
  const mercuryMapTexture = useLoader(TextureLoader, mercurymap);
  //const moonMapTexture = useLoader(TextureLoader, moonmap);
  const neptuneMapTexture = useLoader(TextureLoader, neptunmap);
  //const plutoMapTexture = useLoader(TextureLoader, plutomap);
  const saturnMapTexture = useLoader(TextureLoader, saturnmap);
  const sunMapTexture = useLoader(TextureLoader, sunmap);
  const uranusMapTexture = useLoader(TextureLoader, uranusmap);
  const venusMapTexture = useLoader(TextureLoader, venusmap);
  const planetTextures = [
    mercuryMapTexture,
    venusMapTexture,
    earthMapTexture,
    marsMapTexture,
    jupiterMapTexture,
    saturnMapTexture,
    uranusMapTexture,
    neptuneMapTexture,
  ];

  const systemGroupRef = useRef<THREE.Group>(null!);
  const starsRef = useRef<THREE.MeshBasicMaterial[]>([]);
  const addStarRef = (ref: THREE.MeshBasicMaterial) => {
    if (!starsRef.current.includes(ref)) starsRef.current.push(ref);
  };

  const planetDistance = (planet: {
    orbitRadius: number;
    orbitSpeed: number;
  }) => {
    const center = new THREE.Vector3(0, 0, 0);
    const distance = center.distanceTo(
      new THREE.Vector3(
        calcAdjustedRadius(planet.orbitRadius) * Math.cos(1),
        0,
        calcAdjustedRadius(planet.orbitRadius) * Math.sin(1)
      )
    );
    return distance;
  };

  useFrame(() => {
    //initial zoom in on system
    systemGroupRef.current.position.z -=
      systemGroupRef.current.position.z * 0.05;
    //show or hide stars
    starsRef.current.forEach((star) => {
      star.opacity = sceneRef.current === SCENE.preSys ? 0 : 1;
    });

    if (pageNumberRef.current <= 2) {
      //rotate system back and forth on pages 0 and 1
      //rotate system to flat position to zoom in on earth for page 2
      let rotateX;
      switch (pageNumberRef.current) {
        case 0:
          rotateX = Math.PI / 2;
          break;
        case 1:
          rotateX = Math.PI / 5;
          break;
        case 2:
          rotateX = 0;
          break;
        default:
          rotateX = 0;
      }
      systemGroupRef.current.rotation.x +=
        (rotateX - systemGroupRef.current.rotation.x) *
        (pageNumberRef.current === 2 ? 0.1 : 0.05);
      //set rings to opaque or trasparent
      ringMaterialsRef.current.forEach((material) => {
        material.opacity +=
          (pageNumberRef.current === 0 ? 1 : 0 - material.opacity) * 0.15;
      });
      //set planet basic materials to opaque or trasparent
      planetBasicMatRefs.current.forEach((material) => {
        material.opacity +=
          (pageNumberRef.current === 0 ? 1 : 0 - material.opacity) * 0.15;
      });
    }

    if (pageNumberRef.current <= 3) {
      //planets orbiting sun
      planets.forEach((planet, index) => {
        const group = planetGroupRefs.current[index];
        if (group) {
          //position
          const { x, z } = getPlanetPosition(index);
          group.position.set(x, 0, z);
          //rotation (slowing down rotation for page 2)
          const rotationSpeed = (2 * Math.PI) / planet.rotationPeriod;
          group.rotation.y +=
            (Date.now() *
              rotationSpeed *
              rotationSpeedScale *
              (pageNumberRef.current === 2 ? 0.2 : 1)) %
            Math.PI;
        }
      });
    }
  });

  const planetGroupRefs = useRef<THREE.Group[]>([]);
  const addPlanetRef = (ref: THREE.Group) => {
    if (!planetGroupRefs.current.includes(ref))
      planetGroupRefs.current.push(ref);
  };

  const planetBasicMatRefs = useRef<THREE.MeshBasicMaterial[]>([]);
  const addPlanetBasicMatRef = (ref: THREE.MeshBasicMaterial) => {
    if (!planetBasicMatRefs.current.includes(ref))
      planetBasicMatRefs.current.push(ref);
  };

  const ringMaterialsRef = useRef<THREE.Material[]>([]);
  const addRingMaterialRef = (ref: THREE.Material) => {
    if (!ringMaterialsRef.current.includes(ref))
      ringMaterialsRef.current.push(ref);
  };

  const starSize = 0.2;
  const starPositions = useMemo(() => {
    const starCount = 500;
    const starDistanceX = 400;
    const starDistanceY = 250;
    const starDistanceZ = 50;
    const starPositions: [number, number, number][] = [];
    for (let i = 0; i < starCount; i++) {
      const x = Math.random() * starDistanceX - starDistanceX / 2;
      const y = Math.random() * starDistanceY - starDistanceY / 2;
      const z = Math.random() * starDistanceZ - starDistanceZ / 2 - 100;

      starPositions.push([x, y, z]);
    }
    return starPositions;
  }, []);

  return (
    <group
      ref={systemGroupRef}
      position={[0, 0, -100]}
      rotation={[Math.PI / 2, 0, 0]}
    >
      <Suspense fallback={null}>
        <group rotation={[-0.32, 0, 0]}>
          {starPositions.map((position, index) => (
            <mesh key={index} position={position}>
              <sphereGeometry attach="geometry" args={[starSize]} />
              <meshBasicMaterial
                ref={(ref) => {
                  if (ref !== null) addStarRef(ref);
                }}
                attach="material"
                color="white"
                transparent={true}
                opacity={0}
              />
            </mesh>
          ))}
        </group>
      </Suspense>
      <mesh position={[0, 0, 0]}>
        <sphereGeometry
          attach="geometry"
          args={[calcAdjustedSize(1), 32, 32]}
        />
        <meshPhongMaterial
          attach="material"
          color="white"
          emissive="white"
          emissiveIntensity={10}
          map={sunMapTexture}
          side={THREE.DoubleSide}
        />
      </mesh>
      {/* LOADING EARTH HIGH RES TEXTUREMAP*/}
      <mesh position={[100, 100, 0]}>
        <sphereGeometry
          attach="geometry"
          args={[calcAdjustedSize(1), 32, 32]}
        />
        <meshPhongMaterial attach="material" map={earthMapTexture} />
      </mesh>
      {planets.map((planet, index) => (
        <group key={index}>
          <mesh position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
            <ringGeometry
              attach="geometry"
              args={[
                planetDistance(planet) - 0.1,
                planetDistance(planet) + 0.1,
                64,
              ]}
            />
            <meshBasicMaterial
              ref={(ref) => {
                if (ref !== null) addRingMaterialRef(ref);
              }}
              color="white"
              side={THREE.DoubleSide}
              transparent={true}
              opacity={1}
            />
          </mesh>
          <group
            ref={(ref) => {
              if (ref !== null) addPlanetRef(ref);
            }}
          >
            <mesh>
              {/*  rotation={[0, 0, THREE.MathUtils.degToRad(planet.tilt)]} */}
              <sphereGeometry
                attach="geometry"
                args={[
                  calcAdjustedSize(planet.size) + 0.2,
                  index === earthPlanetIndex ? 128 : 32,
                  index === earthPlanetIndex ? 128 : 32,
                ]}
              />
              <meshBasicMaterial
                ref={(ref) => {
                  if (ref !== null) addPlanetBasicMatRef(ref);
                }}
                attach="material"
                color="white"
                transparent={true}
                opacity={1}
              />
            </mesh>
            <mesh>
              {/*  rotation={[0, 0, THREE.MathUtils.degToRad(planet.tilt)]} */}
              <sphereGeometry
                attach="geometry"
                args={[
                  calcAdjustedSize(planet.size),
                  index === earthPlanetIndex ? 128 : 32,
                  index === earthPlanetIndex ? 128 : 32,
                ]}
              />
              <meshLambertMaterial
                attach="material"
                color="white"
                map={planetTextures[index]}
              />
            </mesh>
          </group>
        </group>
      ))}
    </group>
  );
};

export default System;
