import { Async } from "./Yuu API/Async";
import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


registerStart(start);
async function start() {
  spawnCircle(0.35, 0.7, 10, 50, 1.5, 2, 0.1, 0.05, 0.25, 0.75, 0.1, 0.05);

  await Async.wait(250);

  spawnCircle(1, 1.5, 9, 40, 1.5, 2, 0.05, 0.05, 0.25, 0.5, 0.05, 0.05);
}

function spawnCircle(yPos:number, height:number, radius:number, count:number, blockRadiusStart: number, blockRadiusMultipier: number, redColorStart: number, redColorMultiplier: number, greenColorStart: number, greenColorMultiplier: number, blueColorStart: number, blueColorMultiplier: number) {
  for (let i = 0; i < count; i++) {
    // sin & cos x & y
    // i and throw it into sin and cos

    const lerpPercent = i / count;
    const radianPos = Math.PI * 2 * lerpPercent;

    const x = Math.cos(radianPos);
    const z = Math.sin(radianPos);

    const dir = new Vector3(x, 0, z);
    const pos = dir.multiply(radius);
    pos.y = yPos + (-0.5 * Math.random());

    const blockRadius = blockRadiusStart + (blockRadiusMultipier * Math.random());

    spawnPrimitive.cube(pos, new Vector3(blockRadius, height, blockRadius), Quaternion.fromEuler(new Vector3(0, Math.random() * Math.PI, 0)), new Color(redColorStart + (redColorMultiplier * Math.random()), greenColorStart + (greenColorMultiplier * Math.random()), blueColorStart + (blueColorMultiplier * Math.random())), 1, true, 'Static', undefined);

  }
}