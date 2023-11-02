import * as THREE from "three";

interface ISceneObject {
  update: () => void;
  getMesh: () => THREE.Mesh | THREE.Group | undefined;
}

export default ISceneObject;
