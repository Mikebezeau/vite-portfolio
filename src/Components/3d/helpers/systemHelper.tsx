import { isBrowser } from "react-device-detect";

const screenScale = isBrowser ? 1 : 0.5;
const distanceScale = 7 * screenScale;
const sizeScale = 2 * screenScale;

export const orbitSpeedScale = 0.00001;
export const rotationSpeedScale = 0.0000000000001;
export const calcAdjustedRadius = (radius: number) =>
  Math.sqrt(radius) * distanceScale;
export const calcAdjustedSize = (size: number) => Math.cbrt(size) * sizeScale;

export const planets = [
  {
    name: "Mercury",
    size: 0.003504,
    tilt: 7,
    rotationPeriod: 58.65 * 24,
    color: "brown",
    orbitRadius: 0.38,
    orbitSpeed: 47.87,
  },
  {
    name: "Venus",
    size: 0.008691,
    tilt: 177,
    rotationPeriod: 243 * 24,
    color: "pink",
    orbitRadius: 0.72,
    orbitSpeed: 35.02,
    orbitReverse: true,
  },
  {
    name: "Earth",
    size: 0.009149,
    tilt: 23,
    rotationPeriod: 23.934,
    color: "blue",
    orbitRadius: 1,
    orbitSpeed: 29.78,
  },
  {
    name: "Mars",
    size: 0.004868,
    tilt: 25,
    rotationPeriod: 24.623,
    color: "red",
    orbitRadius: 1.52,
    orbitSpeed: 24.077,
  },
  {
    name: "Jupiter",
    size: 0.100398,
    tilt: 3,
    rotationPeriod: 9.842,
    color: "brown",
    orbitRadius: 5.2,
    orbitSpeed: 13.07,
  },
  {
    name: "Saturn",
    size: 0.083626,
    tilt: 27,
    rotationPeriod: 10.233,
    color: "yellow",
    orbitRadius: 9.58,
    orbitSpeed: 9.69,
  },
  {
    name: "Uranus",
    size: 0.036422,
    tilt: 98,
    rotationPeriod: 22,
    color: "blue",
    orbitRadius: 19.14,
    orbitSpeed: 6.81,
  },
  {
    name: "Neptune",
    size: 0.035359,
    tilt: 30,
    rotationPeriod: 19,
    color: "blue",
    orbitRadius: 30.2,
    orbitSpeed: 5.43,
  },
];

export const earthPlanetIndex = 2;

export const getPlanetPosition = (index: number) => {
  const planet = planets[index];
  const orbitRadius = planet.orbitRadius;
  const orbitSpeed = planet.orbitSpeed;
  let angle = Date.now() * orbitSpeed * orbitSpeedScale;
  angle = planet.orbitReverse ? -angle : angle;
  const x = calcAdjustedRadius(orbitRadius) * Math.cos(angle);
  const z = calcAdjustedRadius(orbitRadius) * Math.sin(angle);
  return { x, z };
};
