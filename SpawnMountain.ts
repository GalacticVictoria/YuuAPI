import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";


registerStart(start);
function start() {
  spawnCircle(0.25, 0.5, 10, 50);
}

function spawnCircle(yPos:number, height:number, radius:number, count:number) {
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

    const blockRadius = 1.5 + Math.random();

    spawnPrimitive.cube(pos, new Vector3(blockRadius, height, blockRadius), Quaternion.fromEuler(new Vector3(0, Math.random() * Math.PI, 0)), new Color(0.15, 0.25 + (Math.random() * 0.75), 0.15), 1, true, 'Static', undefined);

  }
}