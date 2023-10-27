import Cube from "./3dEngine/Cube";
import initObjects from "./initObjects";
import initScene from "./initScene";

const cubes: Cube[] = [];
for (let index = 0; index < 20; index++) {
  const cube = new Cube();
  cubes.push(cube);
}

const scene = initScene(cubes);
