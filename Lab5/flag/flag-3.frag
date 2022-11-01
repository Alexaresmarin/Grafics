#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;
const vec4 GREEN = vec4(130.0/256.0, 172.0/256.0, 102.0/256.0, 1);
const vec4 WHITE = vec4(1);

void main()
{
    //cuadrat
    if (vtexCoord.x > 0.7-(0.175*3.0/4.0) 
            && vtexCoord.x < 0.7+(0.175*3.0/4.0)
            && vtexCoord.y > 0.5-(0.175*4.0/3.0)
            && vtexCoord.y < 0.5+(0.175*4.0/3.0)) fragColor = WHITE;
    else {
        vec2 C = vec2(0.275*(4.0/3.0), 0.5*(3.0/4.0));
        float R = 0.3;
        float d = distance(C, vec2(vtexCoord.x*(4.0/3.0), vtexCoord.y*(3.0/4.0)));
        //si d < R retorna 0 aixo significa que s'ha de pintar negre 
        fragColor = vec4(step(R, d));
        if (fragColor != vec4(1)) {
            C = vec2(0.4*(4.0/3.0), 0.5*(3.0/4.0));
            R = 0.3;
            d = distance(C, vec2(vtexCoord.x*(4.0/3.0), vtexCoord.y*(3.0/4.0)));
            //si d < R retorna 0 aixo significa que s'ha de pintar negre 
            fragColor = vec4(step(R, d));
            if (fragColor != vec4(1)) fragColor = GREEN;
        }
        else fragColor = GREEN;
    }
}
