#include "Show_degree.h"
#include "glwidget.h"

void Show_degree::degreeInfo() 
{
    const Object &obj =scene()->objects()[0];
    int nVertsFace = obj.faces().size()*3; //verts x face, face => 3 verts
    int nVerts = obj.vertices().size();
	degree = (double) nVertsFace/nVerts;
}

void Show_degree::onPluginLoad()
{
	degreeInfo();
}

void Show_degree::postFrame()
{
	QFont font;
    font.setPixelSize(32);
    painter.begin(glwidget());
    painter.setFont(font);
    int x = 10;
    int y = 40;
    painter.drawText(x, y, QString::number(degree));    
    painter.end();
}

void Show_degree::onObjectAdd()
{
	degreeInfo();
}

void Show_degree::onSceneClear()
{
	degree = 0;
}

