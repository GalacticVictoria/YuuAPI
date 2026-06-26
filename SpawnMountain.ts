import { Async } from "./Yuu API/Async";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


//registerStart(start);
async function start() {
  //grass block rings
  spawnCircle(0.35, 0.7, 0.15, 3, 5, 2.5, 2, 0.1, 0.05, 0.25, 0.75, 0.1, 0.05, false);
  await Async.wait(250);
  spawnCircle(0.35, 0.7, 0.15, 6, 10, 2.5, 2, 0.1, 0.05, 0.25, 0.75, 0.1, 0.05, false);
  await Async.wait(250);
  spawnCircle(0.35, 0.7, 0.15, 10, 30, 2.5, 2, 0.1, 0.05, 0.25, 0.75, 0.1, 0.05, false);

  await Async.wait(250);
  spawnCircle(0.75, 2, 1, 8, 45, 1, 1, 0.05, 0.05, 0.25, 0.25, 0.05, 0.05, true);
  await Async.wait(250);
  spawnCircle(2.5, 2.5, 2.5, 7, 40, 1, 1, 0.05, 0.05, 0.15, 0.25, 0.05, 0.05, true);

  let i = 6;

  while (i > 0) {
    await Async.wait(250);
    const counter = (7 - i);

    const colorBase = (i / 7) * 0.25;
    const colorMultiplier = (i / 7) * 0.05;

    spawnCircle(2.5 + (counter * ((counter + 2) / 3) * 2), counter + 1, 2.5 + counter, i, i * 6, 1, 1, colorBase, colorMultiplier, colorBase, colorMultiplier, colorBase, colorMultiplier, (i === 6));
    i--;
  }

}

function spawnCircle(yPos: number, height: number, heightMultiplier: number, radius: number, count: number, blockRadiusStart: number, blockRadiusMultipier: number, redColorStart: number, redColorMultiplier: number, greenColorStart: number, greenColorMultiplier: number, blueColorStart: number, blueColorMultiplier: number, hasEntrance: boolean) {
  for (let i = 0; i < count; i++) {
    const lerpPercent = i / count;
    if (!(hasEntrance && ((lerpPercent > 0.5) && (lerpPercent < 0.575)))) {

      const radianPos = Math.PI * 2 * lerpPercent;

      const z = Math.cos(radianPos);
      const x = Math.sin(radianPos);

      const dir = new Vector3(x, 0, z);
      const pos = dir.multiply(radius);
      pos.y = yPos + (-0.5 * Math.random());

      const blockRadius = blockRadiusStart + (blockRadiusMultipier * Math.random());

      spawnPrimitive.cube(pos, new Vector3(blockRadius, height + (heightMultiplier * Math.random()), blockRadius), Quaternion.fromEuler(new Vector3(0, Math.random() * Math.PI, 0)), new Color(redColorStart + (redColorMultiplier * Math.random()), greenColorStart + (greenColorMultiplier * Math.random()), blueColorStart + (blueColorMultiplier * Math.random())), 1, true, 'Static', undefined);
    }


  }
}