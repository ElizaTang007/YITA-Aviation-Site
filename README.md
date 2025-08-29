# StratoOS - 低空经济的操作系统标准

## 项目简介

StratoOS 是一个现代化的公司网站，展示了我们作为低空经济操作系统标准提供商的愿景和技术实力。网站采用响应式设计，参考了 BlueYard、Supernal 和 Anduril 等顶级科技公司的设计风格。

## 核心特性

### 🎯 产品定位
- **双平面操作系统架构**：安全控制平面 + 应用体验平面
- **超视距（BVLOS）支持**：突破视觉限制，实现远程任务执行
- **游戏化交互**：指挥官模式，让复杂操作变得直观简单
- **群体智能**：分布式 MPC，支持多机协同与自主决策

### 🛠 技术亮点
1. **安全关键内核**：seL4 微内核 + 实时调度，形式化验证
2. **BVLOS 支持**：远程链路、冗余定位、加密通信
3. **任务编排**：Mission Orchestration + 运动原语 API
4. **群体智能**：分布式 MPC，支持多无人机/车协同
5. **开发者生态**：开放 SDK，第三方插件/应用
6. **合规保障**：DO-178C / ISO 26262 / U-Space 标准

### 🎨 设计特色
- **现代化 UI/UX**：深色主题，科技感十足
- **响应式设计**：完美适配桌面端和移动端
- **流畅动画**：滚动动画、悬停效果、交互反馈
- **性能优化**：图片预加载、防抖处理、懒加载

## 网站结构

### 主要页面
1. **英雄区域**：核心价值主张和平台预览
2. **平台介绍**：双平面架构详解
3. **技术亮点**：六大核心技术展示
4. **应用场景**：四大解决方案展示
5. **开发者生态**：SDK 和应用商店
6. **关于我们**：公司介绍和数据统计
7. **招聘信息**：职位列表和联系方式

### 交互功能
- **平滑滚动**：锚点导航和页面内跳转
- **滚动动画**：元素进入视口时的淡入效果
- **悬停效果**：按钮、卡片、链接的交互反馈
- **平台预览**：动态展示指挥中心界面
- **数字动画**：统计数据的动态计数效果

## 技术栈

- **前端框架**：原生 HTML5 + CSS3 + JavaScript
- **字体**：Inter 字体家族
- **动画**：CSS3 动画 + JavaScript 交互
- **响应式**：CSS Grid + Flexbox
- **性能**：图片预加载、防抖优化

## 文件结构

```
YITA-Aviation-Site/
├── index.html          # 主页面
├── style.css           # 样式文件
├── script.js           # 交互脚本
├── images/             # 图片资源
│   ├── team.jpg        # 团队照片
│   ├── bridge.jpg      # 桥梁图片
│   └── ...             # 其他图片
├── videos/             # 视频资源
│   └── hero.mp4        # 英雄区域背景视频
└── README.md           # 项目说明
```

## 使用方法

1. **本地运行**：
   ```bash
   # 克隆项目
   git clone [repository-url]
   cd YITA-Aviation-Site
   
   # 使用本地服务器运行（推荐）
   python -m http.server 8000
   # 或
   npx serve .
   ```

2. **访问网站**：
   - 打开浏览器访问 `http://localhost:8000`
   - 支持所有现代浏览器

## 自定义配置

### 修改颜色主题
在 `style.css` 中修改 CSS 变量：
```css
:root {
  --primary-color: #00d4ff;
  --secondary-color: #0099cc;
  --background-dark: #000000;
  --text-light: #ffffff;
}
```

### 添加新页面
1. 在 `index.html` 中添加新的 `<section>`
2. 在 `style.css` 中添加对应样式
3. 在 `script.js` 中添加交互效果

### 更新内容
- 修改 `index.html` 中的文本内容
- 替换 `images/` 目录中的图片
- 更新 `videos/` 目录中的视频

## 浏览器支持

- ✅ Chrome 60+
- ✅ Firefox 55+
- ✅ Safari 12+
- ✅ Edge 79+
- ✅ 移动端浏览器

## 性能优化

- **图片优化**：使用 WebP 格式，适当压缩
- **代码分割**：CSS 和 JS 文件分离
- **缓存策略**：静态资源缓存
- **懒加载**：图片和视频按需加载
- **防抖处理**：滚动事件优化

## 贡献指南

1. Fork 项目
2. 创建功能分支：`git checkout -b feature/new-feature`
3. 提交更改：`git commit -am 'Add new feature'`
4. 推送分支：`git push origin feature/new-feature`
5. 提交 Pull Request

## 许可证

© 2025 StratoOS. 保留所有权利。

## 联系我们

- **网站**：https://stratoos.com
- **邮箱**：contact@stratoos.com
- **地址**：[公司地址]

---

*StratoOS - 让低空经济的操作像玩游戏一样直观* 