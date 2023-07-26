#!/bin/bash
# 自动部署后台代码，打包镜像，创建容器，启动容器
WORK_PATH='/usr/projects/cool-admin-midway'
cd $WORK_PATH
# echo "先清理老代码"
# git reset --hard origin/master   #丢弃本地的所有未提交的更改
# git clean -f       #删除本地仓库中未跟踪的文件和目录
echo "拉取最新代码"
git pull origin main
echo "开始构建镜像"
docker build -t cool-admin-midway .
echo "删除旧容器"
docker stop cool-admin-midway-container
docker rm cool-admin-midway-container
echo "启动新容器"
docker container run -p 8001:8001 -d --name cool-admin-midway-container cool-admin-midway