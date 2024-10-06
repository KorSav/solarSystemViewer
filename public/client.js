import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { FlyControls } from 'three/examples/jsm/controls/FlyControls.js'
import { Star } from './objects/star.js';
import { Planet } from './objects/planet.js';
import { Orbit } from './objects/orbit.js';
import { OrbitParameters } from './postitionCalculators/orbitParameters.js';
import { SystemScene } from './systemScene.js';
import { planetTraveler } from './spaceTraveler/planetTraveler.js';

window.TIME = 2460588;
let sun = new Star(0.09, 0, 0, 0, window.TIME, 'sun', 0xf5c542);

let earth = new Planet(8.52e-3, 'earth', window.TIME, 0x34b7eb);
let earthOrbitParams = new OrbitParameters().from_params(
  1.00000261, 0.00000562,
  0.01671123, -0.00004392,
  -0.00001531, -0.01294668,
  100.46457166, 35999.37244981,
  102.93768193, 0.32327364,
  0.0, 0.0,
  365.25
)
sun.add_orbit(new Orbit(earth, earthOrbitParams, 0x34b7eb, 100));

let mercury = new Planet(3.26e-3, 'mercury', window.TIME, 0xb7b8b9);
let mercuryOrbitParams = new OrbitParameters().from_params(
  0.38709927, 0.00000037,
  0.20563593, 0.00001906,
  7.00497902, -0.00594749,
  252.25032350, 149472.67411175,
  77.45779628, 0.16047689,
  48.33076593, -0.12534081,
  15
)
sun.add_orbit(new Orbit(mercury, mercuryOrbitParams, 0xb7b8b9, 100));

let venus = new Planet(8e-3, 'venus', window.TIME, 0xffc649);
let venusOrbitParams = new OrbitParameters().from_params(
  0.72333566, 0.00000390,
  0.00677672, -0.00004107,
  3.39467605, -0.00078890,
  181.97909950, 58517.81538729,
  131.60246718, 0.00268329,
  76.67984255, -0.27769418,
  225
)
sun.add_orbit(new Orbit(venus, venusOrbitParams, 0xffc649, 100));

let mars = new Planet(4.54e-3, 'mars', window.TIME, 0xFF4500);
let marsOrbitParams = new OrbitParameters().from_params(
  1.52371034, 0.00001847,
  0.09339410, 0.00007882,
  1.84969142, -0.00813131,
  -4.55343205, 19140.30268499,
  -23.94362959, 0.44441088,
  49.55953891, -0.29257343,
  687
)
sun.add_orbit(new Orbit(mars, marsOrbitParams, 0xFF4500, 100));

let jupiter = new Planet(9.56e-2, 'jupiter', window.TIME, 0xD2B48C);
let jupiterOrbitParams = new OrbitParameters().from_params(
  5.20288700, -0.00011607,
  0.04838624, -0.00013253,
  1.30439695, -0.00183714,
  34.39644051, 3034.74612775,
  14.72847983, 0.21252668,
  100.47390909, 0.20469106,
  4333
)
sun.add_orbit(new Orbit(jupiter, jupiterOrbitParams, 0xD2B48C, 100));

let saturn = new Planet(8e-2, 'saturn', window.TIME, 0xF4A460);
let saturnOrbitParams = new OrbitParameters().from_params(
  9.53667594, -0.00125060,
  0.05386179, -0.00050991,
  2.48599187, 0.00193609,
  49.95424423, 1222.49362201,
  92.59887831, -0.41897216,
  113.66242448, -0.28867794,
  10756
)
sun.add_orbit(new Orbit(saturn, saturnOrbitParams, 0xF4A460, 100));

let uranus = new Planet(3.4e-2, 'uranus', window.TIME, 0xAFEEEE);
let uranusOrbitParams = new OrbitParameters().from_params(
  19.18916464, -0.00196176,
  0.04725744, -0.00004397,
  0.77263783, -0.00242939,
  313.23810451, 428.48202785,
  170.95427630, 0.40805281,
  74.01692503, 0.04240589,
  30687
)
sun.add_orbit(new Orbit(uranus, uranusOrbitParams, 0xAFEEEE, 100));

let neptune = new Planet(3.3e-2, 'neptune', window.TIME, 0x000080);
let neptuneOrbitParams = new OrbitParameters().from_params(
  30.06992276, 0.00026291,
  0.00859048, 0.00005105,
  1.77004347, 0.00035372,
  -55.12002969, 218.45945325,
  44.96476227, -0.32241464,
  131.78422574, -0.00508664,
  60190
)
sun.add_orbit(new Orbit(neptune, neptuneOrbitParams, 0x000080, 100));


let scene = new SystemScene(sun, window.TIME)
scene.background = new THREE.Color(0x021631)
scene.add_planets()
scene.add_orbits()

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({ antialias: true, canvas });
renderer.setSize(canvas.clientWidth, canvas.clientHeight)

const fov = 75;
const aspect = 2;  // the canvas default
const near = 0.000001;
const far = 30;
const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
const orbitControls = new OrbitControls(camera, renderer.domElement);
camera.position.set(0, 0, 3);

const flyControls = new FlyControls(camera, renderer.domElement);
flyControls.rollSpeed = 0.01
flyControls.dragToLook = true
const pt = new planetTraveler(camera, flyControls, orbitControls);
pt.back()

requestAnimationFrame(render);
function render(time) {
  window.TIME += 0.01
  const canvas = renderer.domElement;
  camera.aspect = canvas.clientWidth / canvas.clientHeight;
  camera.updateProjectionMatrix();
  scene.update_time(window.TIME)
  pt.update()
  renderer.render(scene, camera);
  requestAnimationFrame(render);
}

document.querySelector('.planet#mercury .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(mercury, sun)
})
document.querySelector('.planet#mercury .look').addEventListener('click', () => {
  pt.look_at(mercury)
})

document.querySelector('.planet#venus .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(venus, sun)
})
document.querySelector('.planet#venus .look').addEventListener('click', () => {
  pt.look_at(venus)
})

document.querySelector('.planet#earth .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(earth, sun)
})
document.querySelector('.planet#earth .look').addEventListener('click', () => {
  pt.look_at(earth)
})

document.querySelector('.planet#mars .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(mars, sun)
})
document.querySelector('.planet#mars .look').addEventListener('click', () => {
  pt.look_at(mars)
})

document.querySelector('.planet#jupiter .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(jupiter, sun)
})
document.querySelector('.planet#jupiter .look').addEventListener('click', () => {
  pt.look_at(jupiter)
})

document.querySelector('.planet#saturn .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(saturn, sun)
})
document.querySelector('.planet#saturn .look').addEventListener('click', () => {
  pt.look_at(saturn)
})

document.querySelector('.planet#uranus .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(uranus, sun)
})
document.querySelector('.planet#uranus .look').addEventListener('click', () => {
  pt.look_at(uranus)
})

document.querySelector('.planet#neptune .go').addEventListener('click', () => {
  pt.back()
  pt.travel_to(neptune, sun)
})
document.querySelector('.planet#neptune .look').addEventListener('click', () => {
  pt.look_at(neptune)
})
document.querySelector('button.all-button').addEventListener('click', () => {
  pt.back()
})
document.querySelector('button.orbit-button').addEventListener('click', () => {
  scene.toggle_orbits()
})