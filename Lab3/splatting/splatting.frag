#version 330 core

in vec4 frontColor;
out vec4 fragColor;

in vec2 vtexCoord;

uniform sampler2D noise0;
uniform sampler2D rock1;
uniform sampler2D grass2;

void main()
{
    //f sera el soroll
    float f=texture(noise0, vtexCoord).x;
    //si f < 1 es fara un mix de les dues textures, sino sera l'herba
    vec4 frontColor;
    if (f<1) frontColor = mix(texture(rock1, vtexCoord), texture(grass2, vtexCoord), fract(f)); 
    else frontColor = texture(grass2, vtexCoord);
    fragColor=frontColor;
}
