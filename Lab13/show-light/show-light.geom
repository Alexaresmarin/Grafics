#version 330 core
        
layout(triangles) in;
layout(triangle_strip, max_vertices = 36) out;

in vec4 vfrontColor[];
out vec4 gfrontColor;
out vec2 gtexCoord;

uniform float w = 0.3;
uniform vec4 lightPosition;
uniform mat4 projectionMatrix;

void main( void )
{
	for( int i = 0 ; i < 3 ; i++ )
	{
		gfrontColor = vfrontColor[i];
		gl_Position = gl_in[i].gl_Position;
		gtexCoord = vec2(-1,-1);
		EmitVertex();
	}
    EndPrimitive();

	if (gl_PrimitiveIDIn == 0) {
		vec4 lightPos = projectionMatrix*lightPosition;
		gl_Position = vec4(lightPos.x/lightPos.w + w, lightPos.y/lightPos.w - w, lightPos.zw/lightPos.w);
		gtexCoord = vec2(1,0);
		EmitVertex();

		gl_Position = vec4(lightPos.x/lightPos.w - w, lightPos.y/lightPos.w - w, lightPos.zw/lightPos.w);
		gtexCoord = vec2(0,0);
		EmitVertex();

		gl_Position = vec4(lightPos.x/lightPos.w - w, lightPos.y/lightPos.w + w, lightPos.zw/lightPos.w);
		gtexCoord = vec2(0,1);
		EmitVertex();
		EndPrimitive();

		gl_Position = vec4(lightPos.x/lightPos.w + w, lightPos.y/lightPos.w - w, lightPos.zw/lightPos.w);
		gtexCoord = vec2(1,0);
		EmitVertex();

		gl_Position = vec4(lightPos.x/lightPos.w - w, lightPos.y/lightPos.w + w, lightPos.zw/lightPos.w);
		gtexCoord = vec2(0,1);
		EmitVertex();

		gl_Position = vec4(lightPos.x/lightPos.w + w, lightPos.y/lightPos.w + w, lightPos.zw/lightPos.w);
		gtexCoord = vec2(1,1);
		EmitVertex();
		EndPrimitive();
	}
}
