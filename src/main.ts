import * as RAPIER from "@dimforge/rapier3d-compat";
import Cube from "./3dEngine/Cube";
import initScene from "./initScene";

await RAPIER.init();

const cubes: Cube[] = [];
for (let index = 0; index < 1; index++) {
  const cube = new Cube();
  cubes.push(cube);
}

initScene(cubes);
