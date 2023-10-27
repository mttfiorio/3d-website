import * as THREE from "three";

const initScene = async () => {
  const renderer = new THREE.WebGLRenderer({ antialias: true });
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

  window.addEventListener("resize", () => {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateMatrix();
  });

  renderer.render(scene, camera);
};

export default initScene;
