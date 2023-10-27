import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";

interface ISceneObject {
  update: () => void;
  getMesh: () => THREE.Mesh;
}

export default ISceneObject;
