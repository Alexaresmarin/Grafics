#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

in vec2 vtexCoord[];
out vec2 gtexCoord;
out float top;

uniform float step = 0.2;
uniform mat4 modelViewProjectionMatrix;
uniform mat3 normalMatrix; 

vec4 C;

float light(vec3 a, vec3 b, vec3 c) {
	return normalize(normalMatrix*cross(b-a,c-a)).z;
}

void fer_cara(vec4 v1, vec4 v2, vec4 v3, vec4 v4, int i) {
    gfrontColor = vfrontColor[0]*light(v1.xyz,v2.xyz,v3.xyz);
    if (i == 1) {
		top = 1;
		gtexCoord = vec2(0,0);
		gl_Position = modelViewProjectionMatrix*v1; 
		EmitVertex();
		gtexCoord = vec2(1,0);
		gl_Position = modelViewProjectionMatrix*v2; 
		EmitVertex();
		gtexCoord = vec2(0,1);
		gl_Position = modelViewProjectionMatrix*v3; 
		EmitVertex();
		gtexCoord = vec2(1,1);
		gl_Position = modelViewProjectionMatrix*v4; 
		EmitVertex();
		EndPrimitive();
	}
	else {
		top = 0;
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
