#version 330 core

in vec2 vtexCoord;
out vec4 fragColor;

uniform sampler2D colorMap;

bool esquina(int x, int y) {
    return (x == 0 && y == 0) || (x == 0 && y == 10) || (x == 10 && y == 0) || (x == 10 && y == 10);
}

void main()
{
    int quadX = int(vtexCoord.s * 11.0);
    int quadY = int(vtexCoord.t * 11.0);
    float x, y, offset;
    vec2 coords;
    // bordes laterales
    if ((quadX == 0 || quadX == 10) && !esquina(quadX, quadY)) {
        x = fract(vtexCoord.s * 11.0);
        y = fract(vtexCoord.t * 11.0)/6.0; 
        offset = 3.0/6.0;
        coords = vec2(y+offset, x);
        fragColor = texture(colorMap, coords);
    }
    // bordes superior&inferior
    else if ((quadY == 0 || quadY == 10) && !esquina(quadX, quadY)) { 
        x = fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 3.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
    // esquina superior derecha
    else if (quadX == 10 && quadY == 10) {
        x = fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 4.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
    // esquina superior izquierda
    else if (quadX == 0 && quadY == 10) {
        x = 1.0 - fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 5.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
    // esquina inferior izquierda
    else if (quadX == 0 && quadY == 0) {
        x = 1.0 - fract(vtexCoord.s * 11.0);
        y = 1.0 - fract(vtexCoord.t * 11.0)/6.0;
        offset = 5.0/6.0;
        coords = vec2(y+offset, x);
        fragColor = texture(colorMap, coords);
    }
    // esquina inferior derecha
    else if (quadX == 10 && quadY == 0) {
        x = fract(vtexCoord.s * 11.0);
        y = 1.0 - fract(vtexCoord.t * 11.0)/6.0;
        offset = 5.0/6.0;
        coords = vec2(y+offset, x);
        fragColor = texture(colorMap, coords);
    }
    // fantasmas
    else if ((quadX == 1 && quadY == 3) || (quadX == 4 && quadY == 3)) {
        x = fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 0.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
    // come-cocos
    else if (quadX == 3 && quadY == 3) {
        x = fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 1.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
    // suelo-intermedio
    else if ((quadX >= 2 && quadX <= 4 && quadY%2 == 0) || (quadX >= 6 && quadX <= 8 && quadY%2 == 0)) {
        x = fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 3.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
    // bolitas
    else {
        x = fract(vtexCoord.s * 11.0)/6.0;
        y = fract(vtexCoord.t * 11.0); 
        offset = 5.0/6.0;
        coords = vec2(x+offset, y);
        fragColor = texture(colorMap, coords);
    }
}