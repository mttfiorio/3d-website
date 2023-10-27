import * as RAPIER from "@dimforge/rapier3d-compat";
import Cube from "./3dEngine/Cube";
import initScene from "./initScene";
import World from "./3dEngine/World";

await RAPIER.init();

setInterval(() => {
  const cube = new Cube();
  World.getInstance().sceneObjects.push(cube);
}, 1000);

window.addEventListener("click", () => {
  const cube = new Cube();
  World.getInstance().sceneObjects.push(cube);
  console.log("test");
});

initScene();
