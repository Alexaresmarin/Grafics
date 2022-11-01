#version 330 core

in vec4 frontColor;
in vec2 vtexCoord;
out vec4 fragColor;

const vec4 BLACK = vec4(0);
const vec4 WHITE = vec4(1);
const vec4 PELL = vec4 (1.0, 0.8, 0.6, 1);
const vec4 GRIS = vec4(0.8);
uniform int mode = 2;

vec4 dinsDist(vec2 centre, float radi, float mody, float modx) {
    float d;
    if (mody == 0 && modx == 0) d = distance(centre, vtexCoord);
    else if (mody != 0) d = distance(centre, vec2(vtexCoord.x, vtexCoord.y*mody));
    else if (modx != 0) d = distance(centre, vec2(vtexCoord.x*modx, vtexCoord.y));
    else d = distance(centre, vec2(vtexCoord.x*modx, vtexCoord.y*mody));
    return vec4(step(radi, d));
}

void main()
{
    if (dinsDist(vec2(0.5,0.4), 0.35, 0, 0) != vec4(1)) fragColor = BLACK;
    else if (dinsDist(vec2(0.8), 0.2, 0, 0) != vec4(1)) fragColor = BLACK;
    else if (dinsDist(vec2(0.2, 0.8), 0.2, 0, 0) != vec4(1)) fragColor = BLACK;
    else fragColor = GRIS;
    if (mode > 0) {
        if (dinsDist(vec2(0.5, 0.6), 0.3, 2, 0) != vec4(1)) fragColor = PELL;
        else if (dinsDist(vec2(0.9, 0.45), 0.25, 0, 2) != vec4(1)) fragColor = PELL;
        else if (dinsDist(vec2(1.1, 0.45), 0.25, 0, 2) != vec4(1)) fragColor = PELL;
        if (mode == 2) {
            if (dinsDist(vec2(0.9, 0.45), 0.075, 0, 2) != vec4(1)) fragColor = BLACK;
            else if (dinsDist(vec2(1.1, 0.45), 0.075, 0, 2) != vec4(1)) fragColor = BLACK;
            else if (dinsDist(vec2(0.9, 0.5), 0.15, 0, 2) != vec4(1)) fragColor = WHITE;
            else if (dinsDist(vec2(1.1, 0.5), 0.15, 0, 2) != vec4(1)) fragColor = WHITE;
        }
    }
}