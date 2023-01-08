#version 330 core

in vec4 frontColor;
out vec4 fragColor;
in vec2 vtexCoord;

uniform sampler2D colormap;

void main()
{
    float n = 1.0/4.0;
    float m = 1.0/6.0;
    vec2 texCoord = vtexCoord;
    // esquina superior dreta
    if (texCoord.x >= 0.75 && texCoord.y >= 0.75) {
        texCoord.x = fract(vtexCoord.s/n)*m+4*0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
    // esquina superior esquerra
    else if (texCoord.x <= 0.25 && texCoord.y >= 0.75) {
        texCoord.x = fract(vtexCoord.s/n)*m+1*0.17;
        texCoord.y /= n;
        texCoord.x /= -1;
        fragColor = texture(colormap, texCoord);
    }
    // part superior
    else if (texCoord.x > 0.25 && texCoord.x < 0.75 && texCoord.y >= 0.75) {
        texCoord.x = fract(vtexCoord.s/n)*m+3*0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
    // part inferior
    else if (texCoord.x > 0.25 && texCoord.x < 0.75 && texCoord.y <= 0.25) {
        texCoord.x = fract(vtexCoord.s/n)*m+3*0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
    // part dreta
    else if (texCoord.y > 0.25 && texCoord.y < 0.75 && texCoord.x >= 0.75) {
        texCoord.x = fract(vtexCoord.s/n)*m+3*0.17;
        texCoord.y /= -n;
        texCoord.y /= -1;
        fragColor = texture(colormap, texCoord);
    }
    // part esquerra
    else if (texCoord.y > 0.25 && texCoord.y < 0.75 && texCoord.x <= 0.25) {
        texCoord.x = fract(vtexCoord.s/n)*m+3*0.17;
        texCoord.y /= n;
        texCoord.y /= -1;
        fragColor = texture(colormap, texCoord);
    }
    // esquina inferior esquerra
    else if (texCoord.x <= 0.25 && texCoord.y <= 0.25) {
        texCoord.x = fract(vtexCoord.s/n)*m+1*0.17;
        texCoord.y /= -n;
        texCoord.x /= -1;
        fragColor = texture(colormap, texCoord);
    }
    // esquina inferior dreta
    else if (texCoord.x >= 0.75 && texCoord.y <= 0.25) {
        texCoord.x = fract(vtexCoord.s/n)*m+4*0.17;
        texCoord.y /= n;
        texCoord.y /= -1;
        fragColor = texture(colormap, texCoord);
    }
    // centre inferior esquerra
    else if (texCoord.x > 0.25 && texCoord.x <= 0.5 && texCoord.y > 0.25 && texCoord.y <= 0.5) {
        texCoord.x = fract(vtexCoord.s/n)*m+5*0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
    // centre superior esquerra
    else if (texCoord.x > 0.25 && texCoord.x <= 0.5 && texCoord.y > 0.5 && texCoord.y <= 0.75) {
        texCoord.x = fract(vtexCoord.s/n)*m+6*0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
    // centre superior dreta
    else if (texCoord.x > 0.5 && texCoord.x <= 0.75 && texCoord.y > 0.5 && texCoord.y <= 0.75) {
        texCoord.x = fract(vtexCoord.s/n)*m+5*0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
    // centre inferior dreta
    else {
        texCoord.x = fract(vtexCoord.s/n)*m+0.17;
        texCoord.y /= n;
        fragColor = texture(colormap, texCoord);
    }
}
