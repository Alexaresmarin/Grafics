#ifndef _SHOW_DEGREE_H
#define _SHOW_DEGREE_H

#include "plugin.h" 
#include<QPainter>

class Show_degree: public QObject, public Plugin
{
	Q_OBJECT
	Q_PLUGIN_METADATA(IID "Plugin") 
	Q_INTERFACES(Plugin)

  public:
	 void onPluginLoad();
	 void postFrame();
	 void onObjectAdd();
	 void onSceneClear();
  private:
	double degree;
    void degreeInfo();
    QPainter painter;
};
#endif
