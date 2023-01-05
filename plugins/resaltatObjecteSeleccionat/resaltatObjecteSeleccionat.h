#ifndef _RESALTATOBJECTESELECCIONAT_H
#define _RESALTATOBJECTESELECCIONAT_H

#include "plugin.h" 

class ResaltatObjecteSeleccionat: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void postFrame();

  private:
	// add private methods and attributes here
	QOpenGLShaderProgram* program;
    QOpenGLShader* vs;
    QOpenGLShader* fs;
    
    bool created;
    GLuint cubeVAO;
    GLuint verticesVBO;
    GLuint colorVBO;
};

#endif
