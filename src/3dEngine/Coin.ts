import * as THREE from "three";
import * as RAPIER from "@dimforge/rapier3d-compat";
import ISceneObject from "./ISceneObject";
import World from "./World";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { coinUrl } from "../assets";

class Coin implements ISceneObject {
  model: THREE.Group | undefined;
  private collider: RAPIER.Collider;
  private rigidBody: RAPIER.RigidBody;
  private initialPosition: { x: number; y: number; z: number };

  constructor() {
    const assetLoader = new GLTFLoader();
    assetLoader.load(
      coinUrl.href,
      (gltf: any) => {
        this.model = gltf.scene;
        if (this.model) {
          this.model.scale.set(4, 4, 4);
          gltf.scene.traverse((node: any) => {
            if (node.isMesh) {
              node.material = new THREE.MeshStandardMaterial({
                roughness: 0.3,
                metalness: 0.5,
                color: 0xffd500,
                flatShading: true,
              });
              node.castShadow = true;
              node.receiveShadow = true;
            }
          });
        }
      },
      undefined,
      (e: Error) => console.error(e)
    );

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
    const colliderDesc = RAPIER.ColliderDesc.cylinder(0.15, 0.32 * Math.PI);

    this.rigidBody = World.getInstance().world.createRigidBody(rigidBodyDesc);
    this.collider = World.getInstance().world.createCollider(
      colliderDesc,
      this.rigidBody
    );
    this.collider.castShape;
  }

  getMesh = () => this.model;

  update = () => {
    const rbPosition = this.rigidBody.translation();
    const rbRotation = this.rigidBody.rotation();
    if (this.model) {
      this.model.position.set(rbPosition.x, rbPosition.y, rbPosition.z);
      this.model.rotation.setFromQuaternion(
        new THREE.Quaternion(
          rbRotation.x,
          rbRotation.y,
          rbRotation.z,
          rbRotation.w
        )
      );
    }

    /*
     this.step += this.speed;
    this.mesh.position.x =
      Math.abs(Math.sin(this.step)) + this.startingPosition.x;
    */
  };
}

export default Coin;
