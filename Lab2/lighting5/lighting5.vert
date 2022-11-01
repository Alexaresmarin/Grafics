#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;
out vec3 N, V, L;

uniform bool world;
uniform mat4 modelViewMatrix;
uniform mat4 modelViewMatrixInverse;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;
uniform vec4 lightPosition;

void main()
{
    if (world) {
        N = normal;
        V = (modelViewMatrixInverse*vec4(0,0,0,1)).xyz-vertex.xyz;
        L = (modelViewMatrixInverse*lightPosition).xyz-vertex.xyz;
    }
    else {
        vec3 P = (modelViewMatrix * vec4(vertex, 1.0)).xyz;
        N = normalize(normalMatrix * normal);
        V = -P;
        L = lightPosition.xyz - P;
    }
    vtexCoord = texCoord;
    gl_Position = modelViewProjectionMatrix * vec4(vertex, 1.0);
}
