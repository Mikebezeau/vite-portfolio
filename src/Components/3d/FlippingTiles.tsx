import { memo, useRef } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import useStore3d from "../../store/store3d";
import { SCENE, TILE_SCENE_CAMERA_OFFSET } from "./helpers/sceneConst";

const PreFlippingTiles = () => {
  const sceneRef = useStore3d((state) => state.sceneRef);
  const setEndPresentation = useStore3d((state) => state.setEndPresentation);

  const mainGroupRef = useRef<THREE.Group>(null!);
  const boxMatRef = useRef<THREE.MeshBasicMaterial>(null!);
  const tileMeshRefs = useRef<THREE.Mesh[]>([]);
  const addTileRef = (ref: THREE.Mesh) => {
    if (!tileMeshRefs.current.includes(ref)) tileMeshRefs.current.push(ref);
  };
  const floorMatRef = useRef<THREE.MeshBasicMaterial>(null!);

  const boxDepth = 100;
  const boxHeight = boxDepth * 2;
  const boxWidth = boxDepth * 4;
  const tilesDeep = 10;
  const tileSize = boxDepth / tilesDeep;
  const tilesWide = boxWidth / tileSize;
  const matchHorizonY = boxDepth / 9.1;

  const boxOffsetY = TILE_SCENE_CAMERA_OFFSET.y + boxDepth / 4;
  const boxOffsetZ = TILE_SCENE_CAMERA_OFFSET.z - boxDepth / 4;

  const tilesOffsetX = -boxWidth / 2 + tileSize / 2;
  const tilesOffsetY = -boxDepth / 2 + tileSize;
  const tilesOffsetZ = -boxDepth / 2 + tileSize / 2;

  const sceneStartX = 0;
  const sceneStartY = boxOffsetY - matchHorizonY - tileSize;
  const sceneStartZ = boxOffsetZ;
  const sceneStartPosition = new THREE.Vector3(
    sceneStartX,
    sceneStartY,
    sceneStartZ
  );
  const sceneMoveToPosition = new THREE.Vector3(
    sceneStartX,
    sceneStartY,
    sceneStartZ + boxDepth * 0.7
  );

  const sceneRotateTo = Math.PI / 2;

  const renderTiles = () => {
    const tiles = [];
    for (let y = 0; y < tilesDeep; y++) {
      for (let x = 0; x < tilesWide; x++) {
        tiles.push(
          <mesh
            ref={(ref) => {
              if (ref !== null) addTileRef(ref);
            }}
            position={[x * tileSize, y * tileSize, 0]}
            key={`${x}-${y}`}
          >
            <planeGeometry
              attach="geometry"
              args={[tileSize, tileSize, 1, 1]}
            />
            <meshPhongMaterial
              attach="material"
              color="rgb(104, 195, 192)"
              side={THREE.DoubleSide}
              transparent={true}
              opacity={0}
            />
          </mesh>
        );
      }
    }
    return tiles;
  };

  // last scene, so using clock to control animations instead of new timer class
  const clock: THREE.Clock = new THREE.Clock();
  useFrame(() => {
    if (sceneRef.current === SCENE.tiles) {
      const elapsedTime = clock.getElapsedTime();
      //once faded in
      if (elapsedTime >= 1) {
        //begin lerping scene position and rotation
        mainGroupRef.current.position.lerp(sceneMoveToPosition, 0.01);
        mainGroupRef.current.rotation.x +=
          mainGroupRef.current.rotation.x < sceneRotateTo ? 0.04 : 0;
        if (elapsedTime >= 2.5) {
          // start end sequence
          setEndPresentation(true);
        }
        // if there are non flipped tiles, flip three
        if (tileMeshRefs.current.find((tile) => tile.rotation.y === 0)) {
          const nonFlippedTiles: THREE.Mesh[] = tileMeshRefs.current.filter(
            (tile) => tile.rotation.y === 0
          );
          const randomTileIndexs = [
            Math.floor(Math.random() * nonFlippedTiles.length),
            Math.floor(Math.random() * nonFlippedTiles.length),
            Math.floor(Math.random() * nonFlippedTiles.length),
          ];
          randomTileIndexs.forEach((randomTileIndex) => {
            const randomTile = nonFlippedTiles[randomTileIndex];
            randomTile.rotation.y += 0.05;
          });
        }
      } else {
        // fadine in box
        boxMatRef.current.opacity += boxMatRef.current.opacity < 1 ? 0.02 : 0;
        floorMatRef.current.opacity = 1;
      }
      //fade in tiles and flip tiles that are already rotating
      tileMeshRefs.current.forEach((tileMesh) => {
        if (tileMesh) {
          //@ts-ignore
          tileMesh.material.opacity +=
            //@ts-ignore
            tileMesh.material.opacity < 1 ? 0.02 : 0;
          if (
            tileMesh.rotation.y !== 0 &&
            tileMesh.rotation.y !== Math.PI / 2
          ) {
            tileMesh.rotation.y += 0.1;
          }
          if (tileMesh.rotation.y > Math.PI / 2) {
            tileMesh.rotation.y = Math.PI / 2;
          }
        }
      });
    } else {
      clock.start(); //this will reset elapsedTime to 0
      // reset scene
      mainGroupRef.current.position.set(
        sceneStartPosition.x,
        sceneStartPosition.y,
        sceneStartPosition.z
      );
      mainGroupRef.current.rotation.set(0, 0, 0);
      boxMatRef.current.opacity = 0;
      floorMatRef.current.opacity = 0;
      tileMeshRefs.current.forEach((tileMesh) => {
        //@ts-ignore
        tileMesh.material.opacity = 0;
        tileMesh.rotation.y = 0;
      });
    }
  });

  return (
    <>
      <group ref={mainGroupRef} position={sceneStartPosition}>
        {/* main backdrop */}
        <mesh position={[0, 0, 0]}>
          <boxGeometry
            attach="geometry"
            args={[boxWidth, boxHeight, boxDepth, 1, 1, 1]}
          />
          <meshBasicMaterial
            ref={boxMatRef}
            attach="material"
            color="white"
            transparent={true}
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
        {/* tiles */}
        <group
          position={[tilesOffsetX, tilesOffsetY, tilesOffsetZ]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          {renderTiles()}
        </group>
        {/* black floor beneath tiles */}
        <mesh
          position={[0, tilesOffsetY - tileSize + 1, 0]}
          rotation={[Math.PI / 2, 0, 0]}
        >
          <planeGeometry attach="geometry" args={[boxWidth, boxDepth, 1, 1]} />
          <meshBasicMaterial
            ref={floorMatRef}
            attach="material"
            color="white"
            transparent={true}
            opacity={0}
            side={THREE.DoubleSide}
          />
        </mesh>
      </group>
    </>
  );
};

export const FlippingTiles = memo(PreFlippingTiles);
