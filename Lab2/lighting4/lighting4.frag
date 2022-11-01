#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec3 N, L, V;

uniform vec4 lightAmbient;  // similar a gl_LightSource[0].ambient
uniform vec4 lightDiffuse;  // similar a gl_LightSource[0].diffuse
uniform vec4 lightSpecular;  // similar a gl_LightSource[0].specular
// (sempre estarà en eye space)
uniform vec4 matAmbient; // similar a gl_FrontMaterial.ambient
uniform vec4 matDiffuse; // similar a gl_FrontMaterial.diffuse
uniform vec4 matSpecular; // similar a gl_FrontMaterial.specular
uniform float matShininess; // similar a gl_FrontMaterial.shininess

vec4 light(vec3 nN, vec3 nV, vec3 nL) {
    nN = normalize(nN);
    nV = normalize(nV);
    nL = normalize(nL);
    vec3 R = normalize(2*dot(nN, nL)*nN-nL);
    float NdotL = max(0.0, dot(nN, nL));
    float RdotV = max(0.0, dot(R, nV));

    if (NdotL < 0.0) return matAmbient*lightAmbient + matDiffuse*lightDiffuse*NdotL;
    return matAmbient*lightAmbient + matDiffuse*lightDiffuse*NdotL + matSpecular*lightSpecular*pow(RdotV, matShininess);
}

void main()
{
    vec3 nN = normalize(N);
    vec3 nL = normalize(L);
    vec3 nV = normalize(V);
    fragColor = light(nN, nV, nL);
}
