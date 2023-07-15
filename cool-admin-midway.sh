#!/bin/bash
WORK_PATH='/usr/projects/cool-admin-midway
cd $WORK_PATH
echo "先清理老代码"
git reset --hard origin/master
git clean -f
echo "拉取最新代码"
git pull origin master
echo "开始构建镜像"
docker build -t cool-admin-midway .
echo "删除旧容器"
docker stop cool-admin-midway-container
docker rm cool-admin-midway-container
echo "启动新容器"
docker container run -p 8001:8001 -d --name cool-admin-midway-container cool-admin-midway