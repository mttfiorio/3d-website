import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import ISceneObject from "./ISceneObject";
import World from "./World";

class Cube implements ISceneObject {
  mesh: THREE.Mesh;
  rigidBody: RAPIER.RigidBody;
  collider: RAPIER.Collider;
  private step: number;
  private speed: number;
  private initialPosition: { x: number; y: number; z: number };

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.step = 0;
    this.speed = Math.random() * 0.02;

    const coefficient = 5;
    this.initialPosition = {
      x: coefficient * Math.random(),
      y: coefficient * Math.random(),
      z: coefficient * Math.random(),
    };

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic().setTranslation(
      this.initialPosition.x,
      this.initialPosition.y,
      this.initialPosition.z
    );
    const colliderDesc = RAPIER.ColliderDesc.cuboid(1, 1, 1);

    this.rigidBody = World.getInstance().world.createRigidBody(rigidBodyDesc);
    this.collider = World.getInstance().world.createCollider(colliderDesc);
  }

  getMesh = () => this.mesh;

  getRigidBody = () => this.rigidBody;

  getCollider = () => this.collider;

  update = () => {
    const rbPosition = this.rigidBody.translation();
    this.mesh.position.set(rbPosition.x, rbPosition.y, rbPosition.z);
    console.log(rbPosition);
    /*
     this.step += this.speed;
    this.mesh.position.x =
      Math.abs(Math.sin(this.step)) + this.startingPosition.x;
    */
  };
}

export default Cube;
