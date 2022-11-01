#version 330 core

in vec4 frontColor;
out vec4 fragColor;

uniform int n = 8;

void main()
{
    if (floor(mod(gl_FragCoord.y, n)) == 0) fragColor = frontColor;
    else discard;
}
