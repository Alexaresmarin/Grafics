#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

uniform vec3 boundingBoxMin;
uniform vec3 boundingBoxMax;
uniform mat4 modelViewProjectionMatrix;
uniform mat4 modelViewMatrix;

bool dins_capsa() {
	vec4 bmin = modelViewMatrix*vec4(boundingBoxMin,1);
	vec4 bmax = modelViewMatrix*vec4(boundingBoxMax,1);
	vec4 camera = vec4(0.0);
	return (camera.x >= bmin.x && camera.x <= bmax.x && camera.y >= bmin.y && camera.y <= bmax.y
		&& camera.z >= bmin.z && camera.z <= bmax.z);
}

void main( void )
{
	for( int i = 0 ; i < 3 ; i++ )
	{
		if (dins_capsa()) gfrontColor = 2.0 * vfrontColor[i];
		else gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		EmitVertex();
	}
	EndPrimitive();

	if (gl_PrimitiveIDIn == 0) {
        vec3 C = (boundingBoxMin + boundingBoxMax)/2;
        float R = distance(boundingBoxMin, boundingBoxMax)/2;

		float ymin = boundingBoxMin.y;
		float ymax = boundingBoxMax.y;
		float xmin = boundingBoxMin.x;
		float xmax = boundingBoxMax.x;
		float zmin = boundingBoxMin.z;
		float zmax = boundingBoxMax.z;
        
		//base
		gfrontColor = vec4(0,1,0,1);		
        gl_Position = modelViewProjectionMatrix*vec4(xmax, ymin, zmax, 1);EmitVertex();
		gl_Position = modelViewProjectionMatrix*vec4(xmax, ymin, zmin, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmin, ymin, zmax, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmin, ymin, zmin, 1);EmitVertex();
		EndPrimitive();
		
		//dreta
		gfrontColor = vec4(1,0,0,1);
		gl_Position = modelViewProjectionMatrix*vec4(xmax, ymax, zmax, 1);EmitVertex();
		gl_Position = modelViewProjectionMatrix*vec4(xmax, ymax, zmin, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmax, ymin, zmax, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmax, ymin, zmin, 1);EmitVertex();
		EndPrimitive();

		//esquerra
		gl_Position = modelViewProjectionMatrix*vec4(xmin, ymax, zmax, 1);EmitVertex();
		gl_Position = modelViewProjectionMatrix*vec4(xmin, ymax, zmin, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmin, ymin, zmax, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmin, ymin, zmin, 1);EmitVertex();
		EndPrimitive();
        
		gfrontColor = vec4(0,0,1,1);
		gl_Position = modelViewProjectionMatrix*vec4(xmax, ymax, zmin, 1);EmitVertex();
		gl_Position = modelViewProjectionMatrix*vec4(xmin, ymax, zmin, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmax, ymin, zmin, 1);EmitVertex();
        gl_Position = modelViewProjectionMatrix*vec4(xmin, ymin, zmin, 1);EmitVertex();
		EndPrimitive();
	}
}
