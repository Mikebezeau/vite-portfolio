import * as THREE from "three";
export const SCENE = {
  preSys: 0,
  system: 1,
  zoomInEarth: 2,
  //earthToOceanTransition: 3,
  ocean: 4,
  tiles: 5,
};

export const FIRST_SCENE = Object.values(SCENE)[0];
export const LAST_SCENE = Object.values(SCENE)[Object.values(SCENE).length - 1];

const oceanScenePos = new THREE.Vector3(0, 400, 0);
export const SCENE_POSITION = {
  [SCENE.preSys]: new THREE.Vector3(0, 0, -30),
  [SCENE.system]: new THREE.Vector3(0, 0, -30),
  [SCENE.zoomInEarth]: new THREE.Vector3(0, 0, -30),
  [SCENE.ocean]: oceanScenePos,
  [SCENE.tiles]: oceanScenePos,
};

export const TILE_SCENE_CAMERA_OFFSET = { x: 0, y: 70, z: 140 };
const oceanSceneCamPos = new THREE.Vector3(
  SCENE_POSITION[SCENE.ocean].x,
  SCENE_POSITION[SCENE.ocean].y + TILE_SCENE_CAMERA_OFFSET.y,
  SCENE_POSITION[SCENE.ocean].z + TILE_SCENE_CAMERA_OFFSET.z
);
export const SCENE_CAMERA_POSITION = {
  [SCENE.preSys]: new THREE.Vector3(0, 0, 0),
  [SCENE.system]: new THREE.Vector3(0, 0, 0),
  //[SCENE.zoomInEarth]: new THREE.Vector3(0, 0, 0),
  [SCENE.ocean]: oceanSceneCamPos,
  [SCENE.tiles]: oceanSceneCamPos,
};
