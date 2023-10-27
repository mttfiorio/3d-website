import * as THREE from "three";

class Cube implements ISceneObject {
  mesh: THREE.Mesh;
  private step: number;
  private speed: number;
  private startingPosition: { x: number; y: number; z: number };

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.step = 0;
    this.speed = Math.random() * 0.02;

    this.setRandomPosition();
    this.startingPosition = { ...this.mesh.position };
  }

  getMesh = () => this.mesh;

  setRandomPosition = () => {
    const coefficient = 5;
    this.mesh.position.set(
      coefficient * Math.random(),
      coefficient * Math.random(),
      coefficient * Math.random()
    );
  };

  update = () => {
    this.step += this.speed;
    this.mesh.position.x =
      Math.abs(Math.sin(this.step)) + this.startingPosition.x;
  };
}

export default Cube;
