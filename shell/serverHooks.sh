#!/bin/bash

echo "开始部署"
cd '/webServer/dl-blog-node-server'

echo "正在拉源代码…"
git pull origin master
yarn

echo "完成"
