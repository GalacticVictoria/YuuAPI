import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";






registerStart(start);
function start() {

    spawnPrimitive.plane("Front", new Vector3(1, 3, 2), new Vector3(1, 3, 1), new Quaternion, new Color(0.8, 0.2, 0), 1, "Convex", "Animated", undefined)


}