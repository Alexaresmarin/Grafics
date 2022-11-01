#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 N;

void main()
{
    fragColor = frontColor * N.z;
}
