#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;

const float areamax = 0.0005;
uniform mat4 projectionMatrix;

void main( void )
{
	vec3 u = gl_in[1].gl_Position.xyz - gl_in[0].gl_Position.xyz;
	vec3 v = gl_in[2].gl_Position.xyz - gl_in[0].gl_Position.xyz;

	float area = length(cross(u,v))/2;
	area /= areamax;

	//clamp: constrain a value to lie between two further values
	gfrontColor = mix(vec4(1,0,0,1), vec4(1,1,0,1), clamp(area, 0, 1));

	for( int i = 0 ; i < 3 ; i++ )
	{
		gl_Position = projectionMatrix*gl_in[i].gl_Position;
		EmitVertex();
	}
    EndPrimitive();
}
