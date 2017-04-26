# The FROM instruction sets the Base Image for subsequent instructions.
# 这里我们想要运行最新的mongodb，我们需要添加10gen repo到我们的源
FROM ubuntu:latest
MAINTAINER Rex he <helianwen@hotmail.com>

FROM ubuntu:latest


# 添加10 gen正式apt源来源列表
RUN apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv 7F0CEB10
RUN echo 'deb http://downloads-distro.mongodb.org/repo/ubuntu-upstart dist 10gen' | tee /etc/apt/sources.list.d/10gen.list
#这里我们不希望ubuntu报出init不可用，我们需要转移专一/sbin/initctl 到 /bin/true，认为一切都是可以正常工作的


# Install MongoDB
RUN apt-get update
RUN apt-get install -y -q mongodb-org
#我们需要创建一个数据库目录运行mongodb(因为我们希望它运行还需要提供一个特殊的配置文件)

# MongoDB需要数据目录，让我们在最后一步中执行 Create the MongoDB data directory
RUN mkdir -p /data/db
# 安装 NodeJS 和 npm
RUN apt-get install -y nodejs npm yarn
#设置淘宝镜像
RUN npm config set registry https://registry.npm.taobao.org

# 将目录中的文件添加至镜像的 /app 目录中
ADD . /app

# 设置工作目录
WORKDIR /app

#最后我们需要开放mongodb运行的端口27107，我们用ENTRYPOINT指令来定义这个容器

EXPOSE 80

ENTRYPOINT ["run.sh"]