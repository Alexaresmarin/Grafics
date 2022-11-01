#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 vert;

void main()
{
    vec3 J = dFdx(vert);
    vec3 K = dFdy(vert);
    
    vec3 N = normalize(cross(J,K));
    fragColor = frontColor*N.z;
}