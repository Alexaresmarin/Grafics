#version 330 core

in vec4 gfrontColor;
in vec2 gtexCoord;
out vec4 fragColor;
uniform sampler2D colorMap;

void main()
{
    if (gtexCoord.x >= 0 && gtexCoord.y >= 0 && gtexCoord.x <= 1 && gtexCoord.y <= 1) {
        fragColor = texture(colorMap, gtexCoord);
        if (fragColor.w < 0.1) discard;
        fragColor *= fragColor.w;
    }
    else fragColor = gfrontColor;
}
