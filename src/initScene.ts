import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import World from "./3dEngine/World";

const initScene = () => {
  const sceneObjects = World.getInstance().sceneObjects;

  // Setup scene
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.shadowMap.enabled = true;
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight);
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const orbit = new OrbitControls(camera, renderer.domElement);

  camera.position.set(5, 5, 5);
  orbit.update();

  const aLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(aLight);

  const pLight = new THREE.PointLight(0xffffff, 100, 1600);
  pLight.shadow.radius = 2;
  pLight.position.set(0, 10, 0);
  pLight.castShadow = true;
  scene.add(pLight);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  // Create the ground
  const planeGeometry = new THREE.PlaneGeometry(20, 20);
  const planeMaterial = new THREE.MeshStandardMaterial({
    color: 0xeeeeee,
    side: THREE.DoubleSide,
  });
  const plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.rotation.x = -0.5 * Math.PI;
  const groundColliderDesc = RAPIER.ColliderDesc.cuboid(10.0, 0.0001, 10.0);
  plane.receiveShadow = true;
  const floorCollider =
    World.getInstance().world.createCollider(groundColliderDesc);
  const floorPos = floorCollider.translation();
  plane.position.set(floorPos.x, floorPos.y, floorPos.z);
  scene.add(plane);

  //Window resize
  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  // Renderer loop
  renderer.setAnimationLoop(() => {
    // Add objects that were not added yet
    sceneObjects.forEach((obj) => scene.add(obj.getMesh()));

    // Update physics simulation
    World.getInstance().world.step();

    // Update all objects
    sceneObjects.forEach((obj) => obj.update());

    // Update light to follow camera
    //pLight.position.copy(camera.position);

    renderer.render(scene, camera);
  });
};

export default initScene;
