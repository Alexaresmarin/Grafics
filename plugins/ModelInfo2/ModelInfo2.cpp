#include "ModelInfo2.h"
#include "glwidget.h"

void ModelInfo2::sceneInfo() 
{
    nPolig = nVerts = percTri = 0;
    for (unsigned int i = 0; i < nObjs; ++i) { 
        const Object& obj = scene()->objects()[i];
        nPolig += obj.faces().size();
        for (unsigned int j = 0; j < obj.faces().size(); ++j) {
            int verts = obj.faces()[j].numVertices();
            nVerts += verts;
            if (verts == 3) ++percTri;
        }
    }
    percTri = percTri/nPolig * 100;
}

void ModelInfo2::onPluginLoad()
{
    nObjs = scene() -> objects().size();
    sceneInfo();
}

void ModelInfo2::postFrame()
{
    QFont font;
    font.setPixelSize(15);
    painter.begin(glwidget());
    painter.setFont(font);
    painter.drawText(10, 20, QString("Objectes: " + QString::number(nObjs))); 
    painter.drawText(10, 40, QString("Poligons: " + QString::number(nPolig))); 
    painter.drawText(10, 60, QString("Vertexs: " + QString::number(nVerts)));
    painter.drawText(10, 80, QString("Percentatge de triangles: " + QString::number(percTri) + "%"));  
    painter.end();
}


void ModelInfo2::onObjectAdd()
{
	nObjs += 1;
	sceneInfo();
}

void ModelInfo2::onSceneClear()
{
    nObjs = 0;
    nPolig = 0;
    nVerts = 0;
    percTri = 0; 
}

