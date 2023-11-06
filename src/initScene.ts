import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import World from "./3dEngine/World";
import ISceneObject from "./3dEngine/ISceneObject";

const initScene = () => {
  const debugColliders = false;

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

  camera.position.set(20, 20, 20);
  orbit.update();

  const aLight = new THREE.AmbientLight(0xffffff, 0.1);
  scene.add(aLight);

  const pLight = new THREE.PointLight(0xffffff, 300, 1600);
  pLight.shadow.bias = -0.00001;
  pLight.shadow.mapSize.width = 2048;
  pLight.shadow.mapSize.height = 2048;
  pLight.position.set(-10, 10, -10);
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

  var lines: any;

  // Renderer loop
  renderer.setAnimationLoop(() => {
    // Remove objects that have fallen down
    const itemsToRemove = [];
    const itemsToKeep = World.getInstance().sceneObjects.reduce(
      (previousValue: ISceneObject[], obj) => {
        const object3d = obj.getMesh();

        if (object3d && object3d.position.y < -100) {
          itemsToRemove.push(obj);
          scene.remove(object3d);
          return previousValue;
        }

        return [...previousValue, obj];
      },
      []
    );

    World.getInstance().sceneObjects = itemsToKeep;
    let sceneObjects = itemsToKeep;

    // Add objects that were not added yet
    sceneObjects.forEach((obj) => {
      const object3d = obj.getMesh();

      if (object3d) {
        scene.add(object3d);
      }
    });

    // Update physics simulation
    World.getInstance().world.step();

    // Update all objects
    sceneObjects.forEach((obj) => obj.update());

    // Update light to follow camera
    //pLight.position.copy(camera.position);

    if (debugColliders) {
      if (!lines) {
        let material = new THREE.LineBasicMaterial({
          color: 0xffffff,
          vertexColors: true,
        });
        let geometry = new THREE.BufferGeometry();
        lines = new THREE.LineSegments(geometry, material);
        scene.add(lines);
      }

      let buffers = World.getInstance().world.debugRender();
      lines.geometry.setAttribute(
        "position",
        new THREE.BufferAttribute(buffers.vertices, 3)
      );
      lines.geometry.setAttribute(
        "color",
        new THREE.BufferAttribute(buffers.colors, 4)
      );
    }

    renderer.render(scene, camera);
  });
};

export default initScene;
