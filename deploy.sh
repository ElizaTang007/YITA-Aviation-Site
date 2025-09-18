#!/bin/bash

echo "🚀 开始部署YITA Aviation网站..."

# 检查Git状态
echo "📋 检查Git状态..."
git status

# 推送最新更改
echo "📤 推送最新更改到GitHub..."
git push origin main

echo "✅ 部署完成！"
echo "🌐 网站地址: https://www.yitaaviation.com"
echo "🛒 市场平台: https://www.yitaaviation.com/marketplace"

# 等待部署完成
echo "⏳ 等待部署完成（通常需要1-2分钟）..."
sleep 30

echo "🎉 部署完成！请访问网站查看更新。"
