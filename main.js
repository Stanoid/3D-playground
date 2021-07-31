import './style.css'

import * as THREE from 'three'
import { Color } from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';


const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000);
const renderer = new THREE.WebGL1Renderer({
  canvas: document.querySelector('#bg')
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth,window.innerHeight);

camera.position.setZ(2);

renderer.render(scene,camera);

const geometry = new THREE.OctahedronGeometry(1,0);
const material = new THREE.MeshPhysicalMaterial({color: 0x324453});
const torus = new THREE.Mesh(geometry,material);


scene.add(torus);

const pointlight = new THREE.PointLight(0xffffff,4);
const pointlightr = new THREE.PointLight(0xff0000,4);
const amblight = new THREE.AmbientLight(0xffffff)
pointlight.position.set(10,5,0);
pointlight.rotation.x= 10;

const pointhelp = new THREE.PointLightHelper(pointlight);
const grid = new THREE.GridHelper(200,500);
scene.add(pointhelp);

scene.add(pointlight,amblight);

const control = new OrbitControls(camera,renderer.domElement);



function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const star = new THREE.Mesh(geometry, material);

  const [x, y, z] = Array(3)
    .fill()
    .map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x, y, z);
  scene.add(star);
}


// const spaceTexture = new THREE.TextureLoader().load('ss.jpg');
// scene.background = spaceTexture;



function animate(){
requestAnimationFrame(animate);


torus.rotation.y += 0.01;

control.update();

renderer.render(scene,camera);

}


animate();