#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D colorMap;

void main() {
    float n = 1.0/6.0;
    float m = 1.0/10.0;
    vec2 texCoord = vtexCoord;

    if (vtexCoord.s <= n) {
        texCoord.x = fract(vtexCoord.s/n)*m+0.4;
    }
    else if (vtexCoord.s <= 2*n) {
        texCoord.x = fract(vtexCoord.s/n)*m+0.7;
    }
    else if (vtexCoord.s <= 3*n) {
        texCoord.x = fract(vtexCoord.s/n)*m+0.9;
    }
    else if (vtexCoord.s <= 4*n) {
        texCoord.x = fract(vtexCoord.s/n)*m+0.9;
    }
    else if (vtexCoord.s <= 5*n) {
        texCoord.x = fract(vtexCoord.s/n)*m+0.8;
    }
    else if (vtexCoord.s <= 6*n) {
        texCoord.x = fract(vtexCoord.s/n)*m+0.4;
    }

    fragColor = frontColor;
    vec4 C = texture(colorMap, texCoord);
    //si C.a < 0.5 el color es negre per tant ho descartem
    if (C.a != 1) discard;
}