#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const vec4 CIAN = vec4(2.0/255.0, 181.0/255.0, 242.0/255.0, 1);
const vec4 RED = vec4(255.0/255.0, 0.0/255.0, 0.0/255.0, 1);
const vec4 YELLOW = vec4(255.0/255.0, 255.0/255.0, 5.0/255.0, 1);

void main()
{
    if (vtexCoord.s < 0.5) fragColor = CIAN;
    else if (vtexCoord.t > 0.5) fragColor = RED;
    else fragColor = YELLOW;
}
