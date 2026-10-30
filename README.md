# 王卓的旅行手账 · 课表之外

奶油纸张、手绘拼贴、可互动地图和可爱动画组成的个人旅行网站，时间口径为「大学以来」。纯 HTML/CSS/JavaScript，无构建依赖和第三方运行服务。

## 字体

根据本人指定的参考网站 https://chuweimin.com/ 核实：中文展示文字使用 Noto Serif SC，英文和界面字使用 Manrope / Geist。字体来自 Google Fonts 官方仓库，随站点本地托管，附 SIL OFL 授权；未复制参考网站照片、文字或页面代码。

字体文件按本站现有 HTML/JavaScript 文案制作了字符子集以控制体积。增加新的中文文案后，应重新制作 Noto Serif SC 子集；子集外字符会退回宋体系统字体。源字体与授权见 https://github.com/google/fonts/tree/main/ofl/notoserifsc 、https://github.com/google/fonts/tree/main/ofl/manrope 、https://github.com/google/fonts/tree/main/ofl/geist 。

## 内容与来源

- 姓名和时间口径由本人提供。
- 70 个城市、198 个角落、约 2.1 万公里摘自提供的足迹截图，属于记录快照，不代表实时或完整统计。
- 原始截图为 `assets/footprints.jpg`，经本人授权用于该个人网站；未提取精确 GPS 数据。地图按截图整理为地区索引，非完整城市清单、真实导航线路或准确行程顺序。
- 风景 SVG 是本网站创作的主题插画，不是旅行实拍。正文没有虚构出行日期、同行人或具体经历。
- 后续在 `script.js` 的 `regions` 中编辑地区介绍，在 `index.html` 中添加真实故事与照片即可。

## 本地打开

直接打开 `index.html`，或在本目录用任意静态 HTTP 服务器预览。所有站内资源均使用相对路径，可部署到 GitHub Pages 子路径。

## GitHub Pages 发布

仅把本目录的文件上传到独立仓库 `Mcdull581/wangzhuo-travel` 的根目录。不要上传上级工作区或上级 Git 历史。

仓库 Settings → Pages → Build and deployment，Source 选择 **Deploy from a branch**，Branch 选择 **main**，目录 **/(root)**，点击 Save。GitHub 完成部署后网站地址为：

https://mcdull581.github.io/wangzhuo-travel/

如仓库默认分支不是 main，请选择实际默认分支。本网站不需要 GitHub Actions 自定义工作流或额外密钥。

## 交互与可访问性

- 点击或键盘选择地图标记，更新地区手记并播放盖章动画。
- 目录分类按钮筛选卡片，点击卡片打开手记弹窗。
- 查看原始足迹图、Esc 关闭弹窗、弹窗内焦点管理由原生 dialog 提供。
- 领取旅行小纸条，轮换六条短句并播放纸屑动画。
- 自动摇晃的拼贴、火车、路线流动等动画尊重 `prefers-reduced-motion`。
- 无账号系统、分析追踪、浏览器存储或访客数据上传。

## 验证

`node --check script.js` 检查脚本语法。其余实际检查记录见 `VALIDATION.md`。照片和故事仍可继续补充；浏览器交互与视觉验收若受工具限制，应明确记录，不能把静态检查称作完整视觉验收。
