# Jessie Chen - 个人作品集网站

这是一个使用 Next.js 14 和 Tailwind CSS 构建的现代化响应式个人作品集网站，基于 https://zaizaiusedcode.github.io/ 转换而来。

## 技术栈

- **Next.js 14** - React框架
- **TypeScript** - 类型安全
- **Tailwind CSS** - 样式框架
- **React Hooks** - 状态管理

## 项目结构

```
portfolio-website/
├── app/
│   ├── layout.tsx          # 根布局
│   ├── page.tsx            # 主页面
│   └── globals.css         # 全局样式
├── components/
│   ├── Navigation.tsx      # 导航栏组件
│   ├── Hero.tsx            # 英雄区域
│   ├── About.tsx           # 关于部分
│   ├── Skills.tsx          # 技能展示
│   ├── Services.tsx        # 服务项目
│   ├── Portfolio.tsx       # 作品集
│   ├── Contact.tsx         # 联系表单
│   └── Footer.tsx          # 页脚
└── public/                 # 静态资源
```

## 功能特性

### 1. 导航栏 (Navigation)
- 响应式设计
- 移动端菜单
- 平滑滚动到各个部分
- 社交媒体链接

### 2. 英雄区 (Hero)
- 醒目的欢迎标题
- 职位展示
- 行动号召按钮

### 3. 关于 (About)
- 教育背景展示
- 工作经验统计
- 简历下载功能

### 4. 技能 (Skills)
- 前端技能进度条（HTML 90%, CSS 80%, JavaScript 70%, React 85%）
- 后端技能展示
- 设计能力展示
- 可视化进度条动画

### 5. 服务 (Services)
- UI/UX 设计师
- 前端开发者
- 技术支持工程师

### 6. 作品集 (Portfolio)
- 三个精选项目展示
- 项目描述和技术标签
- 悬停效果

### 7. 联系 (Contact)
- 联系信息展示（电话、邮箱、位置）
- 交互式联系表单
- 社交媒体链接

### 8. 页脚 (Footer)
- 版权信息
- 社交媒体链接

## 如何使用

### 安装依赖
```bash
npm install
```

### 启动开发服务器
```bash
npm run dev
```

访问 http://localhost:3000 查看网站

### 构建生产版本
```bash
npm run build
```

### 启动生产服务器
```bash
npm start
```

## 自定义指南

### 修改个人信息

1. **导航栏品牌名称**: 编辑 `components/Navigation.tsx`
2. **英雄区文字**: 编辑 `components/Hero.tsx`
3. **关于信息**: 编辑 `components/About.tsx`
4. **技能百分比**: 编辑 `components/Skills.tsx` 中的 `skills` 对象
5. **服务内容**: 编辑 `components/Services.tsx` 中的 `services` 数组
6. **作品集项目**: 编辑 `components/Portfolio.tsx` 中的 `projects` 数组
7. **联系信息**: 编辑 `components/Contact.tsx`

### 添加项目图片

将项目图片放置在 `public/` 文件夹中，然后在 `Portfolio.tsx` 中更新图片路径。

### 修改颜色主题

主要使用 Tailwind CSS 的紫色系（purple-600）作为主题色。
要更改主题色，在各个组件中搜索并替换颜色类名。

例如：
- `bg-purple-600` → `bg-blue-600`
- `text-purple-600` → `text-blue-600`
- `border-purple-600` → `border-blue-600`

## 响应式设计

网站完全响应式，支持：
- 桌面设备（>= 1024px）
- 平板设备（768px - 1023px）
- 移动设备（< 768px）

使用 Tailwind CSS 的响应式前缀（`sm:`, `md:`, `lg:`）实现。

## 部署

### Vercel（推荐）
```bash
npm install -g vercel
vercel
```

### 其他平台
构建后的静态文件在 `.next` 目录中，可以部署到任何支持 Next.js 的平台。

## 浏览器支持

- Chrome (最新)
- Firefox (最新)
- Safari (最新)
- Edge (最新)

## 许可证

MIT License
