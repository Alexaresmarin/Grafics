#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform int mode = 2; 
uniform vec4 matAmbient, matDiffuse, matSpecular;
uniform float matShininess;
uniform vec4 lightAmbient, lightDiffuse, lightSpecular, lightPosition;

uniform mat3 normalMatrix;
uniform mat4 modelViewMatrix;

const vec4 BLACK = vec4(0);
const vec4 GREY = vec4(0.8);

vec4 light(vec3 N, vec3 V, vec3 L) {
    N = normalize(N);
    V = normalize(V);
    L = normalize(L);
    vec3 R = normalize(2.0*dot(N,L)*N-L);
    float NdotL = max(0.0,dot(N,L));
    float RdotV = max(0.0,dot(R,V));
    float Idiff = NdotL;
    float Ispec = 0;
    if (NdotL > 0) Ispec=pow(RdotV,matShininess);
    return matAmbient*lightAmbient + matDiffuse*lightDiffuse*Idiff + matSpecular*lightSpecular*Ispec;
}

void main() {
    vec2 C = vec2(0,0);
    float R = 1;
    float d = distance(C, vtexCoord);
    
    if (mode == 0) {
        if (vec4(step(R, d)) != vec4(1)) fragColor = BLACK;
        else discard;
    }
    
    if (mode > 0) {
        vec3 P, N;
        P = N = vec3(vtexCoord.s, vtexCoord.t, sqrt(1-(vtexCoord.x*vtexCoord.x)-(vtexCoord.y*vtexCoord.y)));
        if (mode == 1) {
            if (vec4(step(R, d)) != vec4(1)) fragColor = GREY*N.z;
            else discard;
        }

        if (mode == 2) {
            //pasar a eyeSpace
            N = normalMatrix * N;
            P = (modelViewMatrix*vec4(P, 1.0)).xyz;
            
            vec3 V = -P;
            vec3 L = lightPosition.xyz - P;
            if (vec4(step(R,d)) != vec4(1)) fragColor = light(N, V, L);
            else discard;
        }
    }
}