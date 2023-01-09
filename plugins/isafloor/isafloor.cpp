#include "isafloor.h"
#include "glwidget.h"
#include <cmath>

void Isafloor::onPluginLoad()
{
	vector<Object> o = scene()->objects();
	int objectes = o.size();
	float totalSurface = 0;
	float floorSurface = 0;
	for (int i = 0; i < objectes; ++i) {
		vector<Face> face = o[i].faces();
		vector<Vertex> vertex = o[i].vertices();
		for (int j = 0; j < face.size(); ++j) {
			Vector a = face[j].normal();
			// Calculem la superfaceicie de la cara
			// Producte escalar -> saber si la cara es floor o no
			Vector b {0,0,1};
			float product = a[0]*b[0] + a[1]*b[1] + a[2]*b[2];
			float superficie_cara = surface(vertex[face[j].vertexIndex(0)].coord(), vertex[face[j].vertexIndex(1)].coord(), vertex[face[j].vertexIndex(2)].coord());
			if (product >= 0.7) floorSurface += superficie_cara;
			totalSurface += superficie_cara;
		}
	}
	
	GLWidget & g = *glwidget();
	g.makeCurrent();

	// Carregar shader, compile & link 
    vs = new QOpenGLShader(QOpenGLShader::Vertex, this);
    vs->compileSourceFile(glwidget()->getPluginPath()+"/../isafloor/isafloor.vert");

    fs = new QOpenGLShader(QOpenGLShader::Fragment, this);
    fs->compileSourceFile(glwidget()->getPluginPath()+"/../isafloor/isafloor.frag");

    program = new QOpenGLShaderProgram(this);
    program->addShader(vs);
    program->addShader(fs);
    program->link();
    if (!program->isLinked()) cout << "Shader link error" << endl; 
	program->setUniformValue("lambda", floorSurface/totalSurface);
	surface_relation = floorSurface/totalSurface;
	std::cout << "Superficie total: " << totalSurface << " Superficie terra: " << floorSurface << " Relacio: " << surface_relation << std::endl;
}

void Isafloor::preFrame()
{
	program->bind();
	QMatrix3x3 NM = camera()->viewMatrix().normalMatrix();
	QMatrix4x4 MVP = camera()->projectionMatrix() * camera()->viewMatrix();
	program->setUniformValue("normalMatrix", NM);
	program->setUniformValue("modelViewProjectionMatrix", MVP);
	program->setUniformValue("lambda", surface_relation);
}

float Isafloor::surface(Point v1, Point v2, Point v3) {
	Vector u = v1-v2;
	Vector v = v1-v3;
	Vector cross;
	cross[0] = u[1]*v[2] - u[2]*v[1];
	cross[1] = -(u[0]*v[2] - u[2]*v[0]);
	cross[2] = u[0]*v[1] - u[1]*v[0];
	float module = sqrt(cross[0]*cross[0] + cross[1]*cross[1] + cross[2]*cross[2]);
	return module/2;
}

void Isafloor::onObjectAdd()
{
	onPluginLoad();
}