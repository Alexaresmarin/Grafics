#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

const vec4 BLUE = vec4(51.0/255.0, 124.0/255.0, 186.0/255.0, 1);
const vec4 YELLOW = vec4(255.0/255.0, 255.0/255.0, 5.0/255.0, 1);
const vec4 GREEN = vec4(2.0/255.0, 181.0/255.0, 87.0/255.0, 1);
const vec4 RED = vec4(255.0/255.0, 0.0/255.0, 0.0/255.0, 1);

void main()
{
    vec2 C = vec2(0.5*(4.0/3.0), 0.5*(3.0/4.0));
    float R = 0.25;
    float d = distance(C, vec2(vtexCoord.x*(4.0/3.0), vtexCoord.y*(3.0/4.0)));
    //si d < R retorna 0 aixo significa que s'ha de pintar negre 
    fragColor = vec4(step(R, d));
    if (fragColor != vec4(1)) fragColor = RED; 
    else if (vtexCoord.t < 1/3.0) fragColor = BLUE;
    else if (vtexCoord.t < 2.0/3.0) fragColor = YELLOW;
    else fragColor = GREEN;
}
