import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";






registerStart(start);
function start() {

    spawnPrimitive.plane("Front", new Vector3(0, 1.5, -1.5), new Vector3(3.2, 1.8, 1), Quaternion.one, new Color(0, 0.2, 0.5), 1, "Convex", "Animated", undefined);

}