import * as RAPIER from "@dimforge/rapier3d-compat";
import Cube from "./3dEngine/Cube";
import initScene from "./initScene";
import World from "./3dEngine/World";
import Coin from "./3dEngine/Coin";

await RAPIER.init();

setInterval(() => {
  const cube = new Coin();
  World.getInstance().sceneObjects.push(cube);
}, 200);

window.addEventListener("click", () => {
  const cube = new Coin();
  World.getInstance().sceneObjects.push(cube);
});

initScene();
