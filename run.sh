#!/bin/bash
#chown www-data:www-data /app -R
#安装依赖
#运行mongodb
/usr/bin/mongod --fork
#编译前端代码
npm run build
#运行项目
npm run start

