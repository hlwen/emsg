#!/bin/bash
#chown www-data:www-data /app -R
#安装依赖
yarn || npm install

#运行mongodb
/usr/bin/mongod --fork
#编译前端代码
npm run build
#运行项目
npm run start

#source /etc/apache2/envvars
#tail -F /var/log/apache2/* &
#exec apache2 -D FOREGROUND
