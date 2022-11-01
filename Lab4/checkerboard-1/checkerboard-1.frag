#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;


const vec4 GREY = vec4(vec3(0.8), 1);
const vec4 BLACK = vec4(vec3(0), 1);

void main() {
    float slice = 1.0/8;
    int x = int(mod(vtexCoord.x/slice, 2));
    int y = int(mod(vtexCoord.y/slice, 2));
    if (x == y) fragColor = GREY;
    else fragColor = BLACK;
}