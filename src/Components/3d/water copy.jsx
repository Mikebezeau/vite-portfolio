import * as THREE from "three";
import * as BufferGeometryUtils from "three/addons/utils/BufferGeometryUtils.js";

var scene,
  camera,
  fieldOfView,
  aspectRatio,
  nearPlane,
  farPlane,
  HEIGHT,
  WIDTH,
  renderer;

function createScene() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;

  scene = new THREE.Scene();

  scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);

  aspectRatio = WIDTH / HEIGHT;
  fieldOfView = 60;
  nearPlane = 1;
  farPlane = 10000;
  camera = new THREE.PerspectiveCamera(
    fieldOfView,
    aspectRatio,
    nearPlane,
    farPlane
  );

  camera.position.x = 0;
  camera.position.z = 250;
  camera.position.y = 250;

  renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(WIDTH, HEIGHT);

  renderer.shadowMap.enabled = true;

  document.body.appendChild(renderer.domElement);

  window.addEventListener("resize", handleWindowResize, false);
}

function handleWindowResize() {
  HEIGHT = window.innerHeight;
  WIDTH = window.innerWidth;
  renderer.setSize(WIDTH, HEIGHT);
  camera.aspect = WIDTH / HEIGHT;
  camera.updateProjectionMatrix();
}

var hemisphereLight, shadowLight;

function createLights() {
  hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 3);

  shadowLight = new THREE.DirectionalLight(0xffffff, 3);

  shadowLight.position.set(-150, 350, 350);

  shadowLight.castShadow = true;

  shadowLight.shadow.camera.left = -400;
  shadowLight.shadow.camera.right = 400;
  shadowLight.shadow.camera.top = 400;
  shadowLight.shadow.camera.bottom = -400;
  shadowLight.shadow.camera.near = 1;
  shadowLight.shadow.camera.far = 1000;

  shadowLight.shadow.mapSize.width = 2048;
  shadowLight.shadow.mapSize.height = 2048;

  scene.add(hemisphereLight);
  scene.add(shadowLight);
}

const Ocean = function () {
  let geom = new THREE.PlaneGeometry(350, 250, 10, 10);

  geom.applyMatrix4(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
  geom.deleteAttribute("normal");
  geom.deleteAttribute("uv");

  const geometry = BufferGeometryUtils.mergeVertices(geom);

  const positionAttribute = geometry.getAttribute("position");
  positionAttribute.setUsage(THREE.DynamicDrawUsage);

  this.waves = [];
  const v = new THREE.Vector3();

  for (var i = 0; i < positionAttribute.count; i++) {
    v.fromBufferAttribute(positionAttribute, i);

    this.waves.push({
      y: v.y,
      x: v.x,
      z: v.z,
      ang: Math.random() * Math.PI * 2,
      speed: 0.016 + Math.random() * 0.032,
    });
  }

  let mat = new THREE.MeshPhongMaterial({
    color: 0x68c3c0,
    transparent: true,
    // opacity: .8,
    flatShading: true,
  });

  this.mesh = new THREE.Mesh(geometry, mat);

  this.mesh.receiveShadow = true;
};

Ocean.prototype.moveWaves = function () {
  const positionAttribute = this.mesh.geometry.getAttribute("position");

  const v = new THREE.Vector3();

  for (var i = 0; i < positionAttribute.count; i++) {
    v.fromBufferAttribute(positionAttribute, i);

    const vprops = this.waves[i];

    v.x = vprops.x + Math.cos(vprops.ang);
    v.y = vprops.y + Math.sin(vprops.ang) * 2;

    vprops.ang += vprops.speed;

    positionAttribute.setXY(i, v.x, v.y);
  }

  positionAttribute.needsUpdate = true;
};

var ocean;
function createOcean() {
  ocean = new Ocean();

  ocean.mesh.position.y = 200;
  ocean.mesh.position.z = -35;

  scene.add(ocean.mesh);
}

function loop() {
  ocean.moveWaves();

  renderer.render(scene, camera);

  requestAnimationFrame(loop);
}

function init() {
  createScene();

  createLights();

  createOcean();

  loop();
}

window.addEventListener("load", init, false);
