interface ISceneObject {
  update: () => void;
  getMesh: () => THREE.Mesh;
}
