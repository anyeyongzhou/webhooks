#!/bin/bash
WORK_PATH='/usr/projects/LargeVisualScreen'
cd $WORK_PATH
echo "清理代码"
git reset --hard origin/master
git clean -f
echo "拉取最新代码"
git pull origin master
echo "打包最新代码"
npm run build
echo "开始构建镜像"
docker build -t LargeVisualScreen .
echo "删除旧容器"
docker stop LargeVisualScreen-container
docker rm LargeVisualScreen-container
echo "启动新容器"
docker container run -p 9000:9000 -d --name LargeVisualScreen-container LargeVisualScreen