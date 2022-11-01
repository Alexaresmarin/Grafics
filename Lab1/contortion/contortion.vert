#version 330 core

layout (location = 0) in vec3 vertex;
layout (location = 1) in vec3 normal;
layout (location = 2) in vec3 color;
layout (location = 3) in vec2 texCoord;

out vec4 frontColor;
out vec2 vtexCoord;

uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix;

uniform float time;

mat4 rotate(float A) {
    return mat4 ( vec4(1.0, 0.0, 0.0, 0.0),
                  vec4(0.0, cos(A), sin(A), 0.0),
                  vec4(0.0, -sin(A), cos(A), 0.0),
                  vec4(0.0, 0.0, 0.0, 1.0));
}

mat4 translate(float x, float y, float z) {
    return mat4 ( vec4(1.0, 0.0, 0.0, 0.0),
                  vec4(0.0, 1.0, 0.0, 0.0),
                  vec4(0.0, 0.0, 1.0, 0.0),
                  vec4(x, y, z, 1.0));
}

void main()
{
    vec3 N = normalize(normalMatrix * normal);
    frontColor = vec4(color,1.0) * N.z;

    float A = (vertex.y - 0.5) * sin(time);
    if (vertex.y <= 0.5) A = 0.0;

    //la rotació en l'eix x, es fa en el punt (0,1,0)
    //el moure al (0,1,0) aplico la transformació i el tornaré a moure
    vec4 myvertex = translate(0,1,0) * rotate(A) * translate(0,-1,0) * vec4(vertex,1.0);
    gl_Position = modelViewProjectionMatrix * myvertex;
}
