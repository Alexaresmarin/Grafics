#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const vec4 WHITE = vec4(1);
const vec4 BLACK = vec4(vec3(0), 1);

void main()
{
    if (vtexCoord.s > 0.05 && vtexCoord.s < 0.15) {
        float t;
        if (vtexCoord.t < 0.15) t = 0.1;
        else if (vtexCoord.t < 0.25) t = 0.2;
        else if (vtexCoord.t < 0.35) t = 0.3;
        else if (vtexCoord.t < 0.45) t = 0.4;
        else if (vtexCoord.t < 0.55) t = 0.5;
        else if (vtexCoord.t < 0.65) t = 0.6;
        else if (vtexCoord.t < 0.75) t = 0.7;
        else if (vtexCoord.t < 0.85) t = 0.8;
        vec2 C = vec2(0.1, t);
        float R = 0.05;
        float d = distance(C, vtexCoord);
        //si d < R retorna 0 aixo significa que s'ha de pintar negre 
        fragColor = vec4(step(R, d));
        if (fragColor != vec4(1)) fragColor = WHITE;
        else fragColor = BLACK;
    }
    else if (vtexCoord.s > 0.85 && vtexCoord.s < 0.95) {
        float t;
        if (vtexCoord.t < 0.15) t = 0.1;
        else if (vtexCoord.t < 0.25) t = 0.2;
        else if (vtexCoord.t < 0.35) t = 0.3;
        else if (vtexCoord.t < 0.45) t = 0.4;
        else if (vtexCoord.t < 0.55) t = 0.5;
        else if (vtexCoord.t < 0.65) t = 0.6;
        else if (vtexCoord.t < 0.75) t = 0.7;
        else if (vtexCoord.t < 0.85) t = 0.8;
        vec2 C = vec2(0.9, t);
        float R = 0.05;
        float d = distance(C, vtexCoord);
        //si d < R retorna 0 aixo significa que s'ha de pintar negre 
        fragColor = vec4(step(R, d));
        if (fragColor != vec4(1)) fragColor = WHITE;
        else fragColor = BLACK;
    }
    else if (vtexCoord.t > 0.85 && vtexCoord.t < 0.95) {
        float s;
        if (vtexCoord.s < 0.25) s = 0.2;
        else if (vtexCoord.s < 0.35) s = 0.3;
        else if (vtexCoord.s < 0.45) s = 0.4;
        else if (vtexCoord.s < 0.55) s = 0.5;
        else if (vtexCoord.s < 0.65) s = 0.6;
        else if (vtexCoord.s < 0.75) s = 0.7;
        else if (vtexCoord.s < 0.85) s = 0.8;
        vec2 C = vec2(s, 0.9);
        float R = 0.05;
        float d = distance(C, vtexCoord);
        //si d < R retorna 0 aixo significa que s'ha de pintar negre 
        fragColor = vec4(step(R, d));
        if (fragColor != vec4(1)) fragColor = WHITE;
        else fragColor = BLACK;
    }
    else if (vtexCoord.t > 0.35 && vtexCoord.t < 0.45) {
        float s;
        if (vtexCoord.s < 0.25) s = 0.2;
        else if (vtexCoord.s < 0.35) s = 0.3;
        else if (vtexCoord.s < 0.45) s = 0.4;
        else if (vtexCoord.s < 0.55) s = 0.5;
        else if (vtexCoord.s < 0.65) s = 0.6;
        else if (vtexCoord.s < 0.75) s = 0.7;
        else if (vtexCoord.s < 0.85) s = 0.8;
        vec2 C = vec2(s, 0.4);
        float R = 0.05;
        float d = distance(C, vtexCoord);
        //si d < R retorna 0 aixo significa que s'ha de pintar negre 
        fragColor = vec4(step(R, d));
        if (fragColor != vec4(1)) fragColor = WHITE;
        else fragColor = BLACK;
    }
    /*
        || (vtexCoord.t > 0.45 && vtexCoord.t < 0.65 && vtexCoord.s > 0.05 && vtexCoord.s < 0.95))fragColor = WHITE;
    */
    else fragColor = BLACK;
}
