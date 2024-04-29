import { Suspense, useRef } from "react";
import * as THREE from "three";
import { isBrowser } from "react-device-detect";
import useStore3d from "../../store/store3d";
import {
  SCENE,
  SCENE_POSITION,
  SCENE_CAMERA_POSITION,
} from "./helpers/sceneConst";
import { useFrame } from "@react-three/fiber";
import Lights from "./Lights";
import TextMesh from "./TextMesh";
import System from "./System";
import { earthPlanetIndex, getPlanetPosition } from "./helpers/systemHelper";
import Ocean from "./Ocean";
import { FlippingTiles } from "./FlippingTiles";

interface Presentation3dProps {
  isDarkMode: boolean;
}

const PresentationScenes = ({ isDarkMode }: Presentation3dProps) => {
  const sceneRef = useStore3d((state) => state.sceneRef);
  const setSceneRef = useStore3d((state) => state.setSceneRef);
  const setFadeToWhite = useStore3d((state) => state.setFadeToWhite);

  // for transition to ocean scene
  const isEarthZoomedIn = useRef(false);
  const earthZoomToSurface = useRef(0);
  useFrame((state) => {
    if (sceneRef.current === SCENE.zoomInEarth) {
      //rotating camera
      const rotate = state.camera.rotation.z + (Math.PI / 2) * 0.005;
      state.camera.rotation.set(0, 0, rotate);

      let lerpAlpha = 0;
      const { x, z } = getPlanetPosition(earthPlanetIndex);
      const earthX = x;
      const earthY = 0;
      const earthZ = z;
      const worldPlanetPosition = new THREE.Vector3(
        SCENE_POSITION[SCENE.system].x + earthX,
        SCENE_POSITION[SCENE.system].y + earthY,
        SCENE_POSITION[SCENE.system].z + earthZ
      );
      const zoomToEarthOffsetX = isBrowser ? -0.3 : -0.2;
      const zoomToEarthOffsetY = isBrowser ? 0.3 : 0;
      const zoomToEarthOffsetZ = 0.7;
      const zoomToX = worldPlanetPosition.x + zoomToEarthOffsetX;
      const zoomToY = worldPlanetPosition.y + zoomToEarthOffsetY;
      const zoomToZ = worldPlanetPosition.z + zoomToEarthOffsetZ;
      const planetDistanceFromCameraStart =
        SCENE_CAMERA_POSITION[SCENE.system].distanceTo(worldPlanetPosition);

      lerpAlpha =
        (planetDistanceFromCameraStart /
          state.camera.position.distanceTo(
            new THREE.Vector3(zoomToX, 0, zoomToZ)
          ) -
          1) /
        75;

      lerpAlpha = lerpAlpha < 0.05 ? 0.05 : lerpAlpha;
      lerpAlpha = lerpAlpha > 0.9 ? 1 : lerpAlpha;
      if (!isEarthZoomedIn.current && lerpAlpha < 1) {
        //zooming into earth from system view
        state.camera.position.lerp(
          new THREE.Vector3(zoomToX, zoomToY, zoomToZ),
          lerpAlpha
        );
        // setting base camera zoom speed for final approach
        earthZoomToSurface.current = 0;
      } else {
        // close up zoom to earth while fade transition to ocean scene
        isEarthZoomedIn.current = true;
        setFadeToWhite(true);
        // zooming to surface of earth further while fade transitioning
        const maxZoom = 1.2;
        earthZoomToSurface.current +=
          earthZoomToSurface.current < maxZoom ? 0.03 : 0;
        // setting camera to follow earth and zoom closer in
        state.camera.position.set(
          zoomToX,
          zoomToY,
          zoomToZ - earthZoomToSurface.current
        );
        if (earthZoomToSurface.current >= maxZoom) {
          // reset scene to ocean transition variables and change scene
          isEarthZoomedIn.current = false;
          earthZoomToSurface.current = 0;
          setSceneRef(SCENE.ocean);
        }
      }
    } else if (sceneRef.current === SCENE.ocean) {
      state.camera.position.set(
        SCENE_CAMERA_POSITION[SCENE.ocean].x,
        SCENE_CAMERA_POSITION[SCENE.ocean].y,
        SCENE_CAMERA_POSITION[SCENE.ocean].z
      );
      state.camera.rotation.set(0, 0, 0);
    } else if (sceneRef.current === SCENE.tiles) {
      state.camera.position.set(
        SCENE_CAMERA_POSITION[SCENE.tiles].x,
        SCENE_CAMERA_POSITION[SCENE.tiles].y,
        SCENE_CAMERA_POSITION[SCENE.tiles].z
      );
      state.camera.rotation.set(0, 0, 0);
    } else {
      state.camera.position.lerp(new THREE.Vector3(0, 0, 0), 1);
      state.camera.rotation.set(0, 0, 0);
    }
  });

  return (
    <>
      <Lights />
      <TextMesh isDarkMode={isDarkMode} />
      <group position={SCENE_POSITION[SCENE.system]}>
        <System />
      </group>

      <group position={SCENE_POSITION[SCENE.ocean]}>
        {/*<HouseMesh />*/}
        <Suspense fallback={null}>
          <Ocean />
        </Suspense>
      </group>

      <group position={SCENE_POSITION[SCENE.tiles]}>
        <FlippingTiles />
      </group>
    </>
  );
};

export default PresentationScenes;
