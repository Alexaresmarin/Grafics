#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

in vec2 vtexCoord[];
out vec2 gtexCoord;

uniform float step = 0.2;
uniform mat4 modelViewProjectionMatrix;

vec4 C;

void fer_cara(vec4 v1, vec4 v2, vec4 v3, vec4 v4, int i) {
    gfrontColor = vec4(0.4+i*0.1);
    gl_Position = modelViewProjectionMatrix*v1; 
	EmitVertex();
    gl_Position = modelViewProjectionMatrix*v2; 
	EmitVertex();
    gl_Position = modelViewProjectionMatrix*v3; 
	EmitVertex();
    gl_Position = modelViewProjectionMatrix*v4; 
	EmitVertex();
    EndPrimitive();
}

vec4 calcular_vert(float Rx, float Ry, float Rz) {
    return C + vec4(Rx,Ry,Rz,0);
}

void main( void )
{        
    vec4 bari = (gl_in[0].gl_Position + gl_in[1].gl_Position + gl_in[2].gl_Position)/3.0;
    float R = step/2.0;
    C = round(bari/step)*step;

    fer_cara(calcular_vert(-R,-R,R), calcular_vert(R,-R,R), calcular_vert(-R,R,R), calcular_vert(R,R,R), 0);         //frontal
    fer_cara(calcular_vert(R,R,R), calcular_vert(R,R,-R), calcular_vert(-R,R,R), calcular_vert(-R,R,-R), 1);         //superior
    fer_cara(calcular_vert(R,-R,R), calcular_vert(R,-R,-R), calcular_vert(-R,-R,R), calcular_vert(-R,-R,-R), 2);     //inferior
    fer_cara(calcular_vert(-R,-R,-R), calcular_vert(R,-R,-R), calcular_vert(-R,R,-R), calcular_vert(R,R,-R), 3);     //darrere
    fer_cara(calcular_vert(-R,-R,R), calcular_vert(-R,-R,-R), calcular_vert(-R,R,R), calcular_vert(-R,R,-R), 4);     //esquerre
    fer_cara(calcular_vert(R,-R,-R), calcular_vert(R,-R,R), calcular_vert(R,R,-R), calcular_vert(R,R,R), 5);         //dreta
}
