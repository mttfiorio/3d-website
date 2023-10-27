import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import ISceneObject from "./ISceneObject";
import World from "./World";

class Cube implements ISceneObject {
  mesh: THREE.Mesh;
  private rigidBody: RAPIER.RigidBody;
  private collider: RAPIER.Collider;
  private initialRotation: {};
  private initialPosition: { x: number; y: number; z: number };

  constructor() {
    const geometry = new THREE.BoxGeometry(1, 1, 1);
    const material = new THREE.MeshLambertMaterial({ color: 0xffcc00 });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.castShadow = true;
    this.mesh.receiveShadow = true;

    const coefficient = 5;
    this.initialPosition = {
      x: coefficient * Math.random(),
      y: coefficient * Math.random(),
      z: coefficient * Math.random(),
    };

    const rigidBodyDesc = RAPIER.RigidBodyDesc.dynamic()
      .setTranslation(
        this.initialPosition.x,
        this.initialPosition.y,
        this.initialPosition.z
      )
      .setRotation({
        w: Math.random(),
        x: Math.random(),
        y: Math.random(),
        z: Math.random(),
      });
    const colliderDesc = RAPIER.ColliderDesc.cuboid(0.5, 0.5, 0.5);

    this.rigidBody = World.getInstance().world.createRigidBody(rigidBodyDesc);
    this.collider = World.getInstance().world.createCollider(
      colliderDesc,
      this.rigidBody
    );
  }

  getMesh = () => this.mesh;

  update = () => {
    const rbPosition = this.rigidBody.translation();
    const rbRotation = this.rigidBody.rotation();
    this.mesh.position.set(rbPosition.x, rbPosition.y, rbPosition.z);
    this.mesh.rotation.setFromQuaternion(
      new THREE.Quaternion(
        rbRotation.x,
        rbRotation.y,
        rbRotation.z,
        rbRotation.w
      )
    );
    /*
     this.step += this.speed;
    this.mesh.position.x =
      Math.abs(Math.sin(this.step)) + this.startingPosition.x;
    */
  };
}

export default Cube;
