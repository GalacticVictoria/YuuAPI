import { Color } from "./Yuu API/Basic Types/Color";
import { Quaternion } from "./Yuu API/Basic Types/Quaternion";
import { Vector3 } from "./Yuu API/Basic Types/Vector3";
import { registerStart } from "./Yuu API/RegisterStart";
import { spawnPrimitive } from "./Yuu API/SpawnPrimitive";






registerStart(start);
function start() {

    const plane = spawnPrimitive.plane(
        "Front",
        new Vector3(0, 1.5, -1.5),
        new Vector3(3.2, 1.8, 1),
        Quaternion.one, new Color(0, 0.2, 0.5),
        1,
        "Convex",
        "Animated",
        undefined);


    const shaderCode = `shader_type spatial;
    
    uniform vec2 resolution = vec2(1920.0,1080.0);
    uniform vec3 line_color: source_color = vec3(0.0,1.0,0.0);
    uniform float direction: hint_range(-1.0, 1.0, 0.01) = 0.5;
    uniform float brightness: hint_range(0.0, 30.0, 0.01) = 15.0;
    uniform float speed: hint_range(0.0, 10.0, 0.01) = 1.0;
    uniform float octaves: hint_range(1.0, 200.0, 0.1) = 100.0;
    uniform float shift: hint_range(0.0, 10.0, 0.01) = 1.0;
    uniform float strech: hint_range(1.0, 100.0, 0.1) = 10.0;
    uniform float alpha_threshold: hint_range(0.0, 1.0, 0.01) = 0;
    
    mat2 rotate(float a) {
        float sa = sin(a);
        float ca = cos(a);
        return mat2(vec2(ca, sa), vec2(-sa,ca));
        }
        
        vec3 fbm(vec3 ray) { //fbm = fractal brownian motion
        vec3 result = vec3(0.0);
        float time = TIME * speed;
        for (float i = 0.0; i < octaves; i++) {
            vec3 p = result;
            p.z += time + i * shift * 0.01;
            p.z /= strech * 1.0;
            p.xy *= rotate(p.z);
            result += length(sin(p.yx + time) + cos(p.xz + time)) * ray;
            }
            return result;
            }
            
            void fragment() {
                vec2 uv = UV - 0.5; //moves coordinate origin to center
                uv.x *= resolution.x / resolution.y;
                vec3 ray = vec3(uv, direction);
                vec3 result = fbm(ray);
                vec3 color = vec3(brightness / length(result)) * line_color;
                float avg = (color.r + color.g + color.b) / 3.0;
                
                
                ALBEDO = color;
                ALPHA = avg <= alpha_threshold ? 0.0 : 1.0;
                }`;

    if (plane.mesh.nodeID) {
        Godot.shader.applyToMesh(plane.mesh.nodeID, shaderCode)
    }




    const plane2 = spawnPrimitive.plane(
        "Front",
        new Vector3(-4.0, 1.5, -1.5),
        new Vector3(3.2, 1.8, 1),
        Quaternion.one, new Color(0, 0.2, 0.5),
        1,
        "Convex",
        "Animated",
        undefined);

    const fractalFlower = `shader_type spatial;

uniform vec2 resolution = vec2(1920.0, 1080.0);
uniform float speed: hint_range(0.0, 10.0, 0.01) = 1.0;
uniform float iterations: hint_range(0.0, 10.0, 1.0) = 1.0;
uniform float slices: hint_range(1.0, 100.0, 1.0) = 10.0;
uniform float warp: hint_range(1.0, 100.0, 0.1) = 10.0;

uniform vec3 a: source_color = vec3(0.5, 0.5, 0.5);
uniform vec3 b: source_color = vec3(0.5, 0.5, 0.5);
uniform vec3 c: source_color = vec3(1.0, 1.0, 1.0);
uniform vec3 d: source_color = vec3(0.0, 0.33, 0.67);

vec3 palette(float t) {
	return a + b * cos(TAU * (c * t + d));
}


void fragment() {
	vec2 uv = UV - 0.5;
	uv.x *= resolution.x / resolution.y;
	float time = TIME * speed;
	vec3 result = vec3(0.0);
	vec2 polar = vec2(atan(uv.x, uv.y), length(uv));
	
	for (float i = 0.0; i < iterations; i++) {
		float angle = polar.x * (slices + i);
		float shape = abs(sin(angle)) + 1.0;
		uv = fract(uv * shape) - 0.5;
		float dist = length(uv) * exp(-polar.y) * shape;
		dist = 0.01 / abs(sin(dist * warp + angle + time) / warp);
		vec3 color = palette(polar.y + shape + i + time * 0.1);
		result += color * dist * shape;
	}
	
	ALBEDO = result;
	ALPHA = 1.0;
}

                
`
    if (plane2.mesh.nodeID) {
        Godot.shader.applyToMesh(plane2.mesh.nodeID, fractalFlower)
    }

}

