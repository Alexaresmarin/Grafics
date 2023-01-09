#ifndef _ISAFLOOR_H
#define _ISAFLOOR_H

#include "plugin.h" 

class Isafloor: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void preFrame();
	 void onObjectAdd();

  private:
	float surface(Point v1, Point v2, Point v3);
	// add private methods and attributes here
	QOpenGLShaderProgram* program;
	QOpenGLShader* vs;
	QOpenGLShader* fs;

	float surface_relation;
};

#endif
