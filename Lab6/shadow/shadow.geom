#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform vec3 boundingBoxMin;
uniform mat4 modelViewProjectionMatrix;

void main( void )
{
	for( int i = 0 ; i < 3 ; i++ ) {
		gfrontColor = vfrontColor[i];
		//pasem els vertexs a clip space
		gl_Position = modelViewProjectionMatrix*gl_in[i].gl_Position;
		EmitVertex();
	}
	EndPrimitive();

	//color negre
	gfrontColor = vec4(0);
    for( int i = 0 ; i < 3 ; i++ ) {
	    vec4 P = gl_in[i].gl_Position;
	    P.y = boundingBoxMin.y;
		//pasem a clip space
		gl_Position = modelViewProjectionMatrix*P;
		EmitVertex();
	}
    EndPrimitive();
}
