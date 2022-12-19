import * as THREE from 'three'
import {
    OrbitControls
} from 'three/addons/controls/OrbitControls.js';
import { EffectComposer } from "three/addons/postprocessing/EffectComposer.js";
import { RenderPass } from "three/addons/postprocessing/RenderPass.js";

import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
  powerPreference: "high-performance",
  antialias: true, 
  alpha: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
var lastTime

const controls = new OrbitControls(camera, renderer.domElement);
controls.minDistance = 2;
controls.maxDistance = 10;
controls.enablePan = false;

camera.position.set(5, 5, 5);

const ambientlight = new THREE.AmbientLight(0xffffff, 0.01);
scene.add(ambientlight);

// point light
const light = new THREE.PointLight(0xffffff, 1)
light.position.set(1,1,5)

scene.add(light);

// point light helper
const Helper = new THREE.PointLightHelper(light);
//scene.add(Helper);



const starGeometry = new THREE.SphereGeometry(80, 64, 64);

// galaxy material
const starMaterial = new THREE.MeshBasicMaterial({
    map : new THREE.TextureLoader().load('https://raw.githubusercontent.com/EnayetHossain/Earth/main/public/texture/galaxy.png'),
    side: THREE.BackSide
});

const starMesh = new THREE.Mesh(starGeometry, starMaterial);
scene.add(starMesh);


const earthTexture = new THREE.TextureLoader().load("https://www.solarsystemscope.com/textures/download/2k_earth_daymap.jpg")
//const earthBump = new THREE.TextureLoader().load("")
const earthSpecular = new THREE.TextureLoader().load("http://www.celestiamotherlode.net/catalog/images/screenshots/earth/earthspec__buzz.jpg")
const cloudsTexture = new THREE.TextureLoader().load("https://www.solarsystemscope.com/textures/download/2k_earth_clouds.jpg")


const geometry = new THREE.SphereGeometry(1, 100, 100);

const material = new THREE.MeshPhongMaterial({
  color: 0xaaaaaa,
  map: earthTexture,
  /*bumpMap: earthBump,
  bumpScale: 0.2,
  specularMap: earthSpecular,
  specular: 0x333333,*/
  
  side: THREE.DoubleSide
});

/*const material = new THREE.MeshPhongMaterial({
    
    lightMap: nightTexture,
    side: THREE.DoubleSide
});*/
/*material.bumpMap = earthBump;
material.bumpScale = 0.5;*/

const sphere = new THREE.Mesh(geometry, material);

const cloudgeometry = new THREE.SphereGeometry(1, 100, 100);
const cloudmaterial = new THREE.MeshPhongMaterial({
    map: cloudsTexture,
    transparent: true,
    opacity: 0.1
});

const cloudsphere = new THREE.Mesh(cloudgeometry, cloudmaterial);

sphere.add(cloudsphere)

scene.add(sphere);


var angularSpeed = 0.2;
var lastTime = 0;

function degToRad(deg) {
    return deg * (Math.PI / 180.0);
}
var timenow = new Date().getTime();
lastTime = timenow - 365;
var rotation = (timenow-lastTime) / 1000
sphere.rotation.y = degToRad(rotation);

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    
    sphere.rotation.x = degToRad(-23)
    sphere.rotation.y += degToRad(0.0041781)

    console.log(sphere.rotation.y)
  
    renderer.render(scene, camera);
}
animate()