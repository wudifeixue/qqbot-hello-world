# qqbot hello world

## 关于此项目
此项目就是一个hello-world来展示直接使用已经搭建好的CoolQ HTTP API插件的接口。  

在群里大家都看到了我给出的基础REST API的GET接口。有群友已经会熟练的使用发送消息和禁言解禁了。  

在这里我只展示一下最基本的连接API，如何发送私有消息，以及监听群消息的方法。我相信作为初学者项目是越简单越好，接下来你们想多写东西，就一步步看文档吧。先看node-cq-websocket的文档，有什么不明白了就去看CoolQ HTTP API插件的文档。  

## 如何开启自己项目和使用
```
git clone https://github.com/wudifeixue/qqbot-hello-world.git qqbot
cd qqbot  
```
更改index.js里面的配置
```
npm install  
node index.js  
```

## 正式部署此应用
推荐使用pm2  
`npm install pm2 -g`  
`pm2 start index.js --name "qqbot"`  

记住当前应用开启设定  
`pm2 save`  
在非windows操作系统上开机自动运行服务  
`pm2 startup`  
重启后恢复应用列表  
`pm2 resurrect`  

其他命令请参考[pm2文档](https://pm2.io/doc/en/runtime/quick-start/)  

## 完整部署
首先安装酷Q并且登陆QQ,需要图片功能必须安装Pro版  
然后给酷Q安装CoolQ HTTP API插件  
配置好插件接口  
配置好并再运行此程序  

## 项目依赖
[酷Q](https://cqp.cc/)  
[CoolQ HTTP API 插件](https://github.com/richardchien/coolq-http-api)  
[node-cq-websocket](https://github.com/momocow/node-cq-websocket)

## 其他基础依赖
安装[git](https://git-scm.com/)  
安装新版[nodejs](https://nodejs.org/en/)(我只测试过10+)  
