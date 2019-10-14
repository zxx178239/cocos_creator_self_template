# cocos_creator_self_template
一个自己写的基于cocos creator的模板，不断完善中

/************ UIManager ************/
UI管理器主要用于处理弹窗的需求

/************ LogManager ************/
Log管理器主要用于打印日志的需求，每个模块的日志等级按模块自己管理，同时有个总的管理器，
来控制所有的日志是否打印

/************ startpopui ************/
写了一个简单的启动弹窗的控制逻辑

/************ guide ************/
写了一个比较简单的引导框架，分别对应到强引导和弱引导两种情况
该引导参考了他人的实现方式
https://blog.csdn.net/operhero1990/article/details/51482734
https://blog.csdn.net/qq_26999509/article/details/80947128
结合两者进行实现的