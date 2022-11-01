#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float angle = 0.5;

void main() {
    vec4 norm = vec4(normal, 0);
    vec4 vert = vec4(vertex, 1);
    if (vertex.y > 1.45 && vertex.x < 1.55) {
        mat4 rotate = mat4( vec4(cos(angle), 0.0, -sin(angle), 0.0),
                        vec4(0.0, 1.0, 0.0, 0.0),
                        vec4(sin(angle), 0.0, cos(angle), 0.0),
                        vec4(0.0, 0.0, 0.0, 1.0));
        vec4 rvert = rotate*vec4(vertex, 1.0);
        vec4 rnorm = rotate*vec4(normal, 0.0);

        float t = smoothstep(1.45, 1.55, rvert.y);
        vert = rvert*t + vec4(vertex, 1.0)*(1-t);
        norm = rnorm*t + vec4(normal, 0.0)*(1-t);
    }
    vec3 N = normalize(normalMatrix*norm.xyz);
    frontColor = vec4(1.0)*N.z;
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix*vec4(vert.xyz, 1.0);
}