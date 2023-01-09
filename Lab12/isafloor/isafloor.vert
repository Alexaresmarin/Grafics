#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec3 texCoord;

out vec4 frontColor;
out vec3 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform float lambda;

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    //vermell tenint en compte lambda, si lambda =  1 llavors verd
    vec3 floorColor = vec3 (1-lambda, lambda, 0)*N.z;
    frontColor = vec4(floorColor, 1);
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}