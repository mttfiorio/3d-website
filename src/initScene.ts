import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

const initScene = (sceneObjects: ISceneObject[]) => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setClearColor("#e5e5e5");
  renderer.setSize(window.innerWidth, window.innerHeight);
  //renderer.useLegacyLights = true;
  document.body.appendChild(renderer.domElement);

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  const orbit = new OrbitControls(camera, renderer.domElement);

  camera.position.set(0, 0, 5);
  orbit.update();

  const aLight = new THREE.AmbientLight(0xffffff, 0.2);
  scene.add(aLight);

  const pLight = new THREE.PointLight(0xffffff, 3000, 1600);
  pLight.position.set(10, 0, 25);
  scene.add(pLight);

  const pLightHelper = new THREE.PointLightHelper(pLight);
  scene.add(pLightHelper);

  const axesHelper = new THREE.AxesHelper(5);
  scene.add(axesHelper);

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
  });

  sceneObjects.forEach((obj) => scene.add(obj.getMesh()));

  renderer.setAnimationLoop(() => {
    sceneObjects.forEach((obj) => obj.update());

    renderer.render(scene, camera);
  });
};

export default initScene;
