#!/bin/bash
WORK_PATH='/usr/projects/LargeVisualScreen'
cd $WORK_PATH
echo "拉取最新代码"
git pull origin main
echo "打包最新代码"
npm run build
echo "开始构建镜像"
docker build -t largevisualvcreen .
echo "删除旧容器"
docker stop largevisualvcreen-container
docker rm largevisualvcreen-container
echo "启动新容器"
docker container run -p 9000:9000 -d --name largevisualvcreen-container largevisualvcreen