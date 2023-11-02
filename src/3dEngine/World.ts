import * as RAPIER from "@dimforge/rapier3d-compat";
import ISceneObject from "./ISceneObject";

class World {
  private static instance: World;
  world: RAPIER.World;
  sceneObjects: ISceneObject[];

  constructor() {
    if (World.instance) {
      throw new Error("Error - use Singleton.getInstance()");
    }
    // Setup physics
    const gravity = { x: 0.0, y: -9.81, z: 0.0 };
    this.world = new RAPIER.World(gravity);
    this.world.debugRender();
    this.sceneObjects = [];
  }

  static getInstance(): World {
    World.instance = World.instance || new World();
    return World.instance;
  }
}

export default World;
