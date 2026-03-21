# 双语功能说明 / Bilingual Features

## 功能概述 / Overview

个人作品集网站现已支持中英文双语切换，所有内容均根据真实简历信息更新。

The portfolio website now supports bilingual switching between Chinese and English, with all content updated based on real resume information.

## 实现功能 / Features Implemented

### 1. 语言切换系统 / Language Toggle System

- **Context API**: 使用 React Context 管理全局语言状态
- **语言切换按钮**: 位于导航栏右侧，点击即可切换中英文
- **持久化**: 当前语言状态在整个应用中保持一致

### 2. 双语内容 / Bilingual Content

#### 个人信息 / Personal Information
- **中文**: Jessie (陈艳)
- **英文**: Jessie (Yan Chen)
- **邮箱**: JC2015080419@gmail.com
- **Vercel**: https://vercel.com/jessies-projects-30765941

#### 教育背景 / Education
- **学校**: 渥太华大学 (QS 189) / University of Ottawa (QS 189)
- **专业**: 信息与计算科学 / B.Sc. in Information and Computing Science
- **时间**: 2019.09-2023.06 / Sep 2019-Jun 2023
- **奖项**: Merit 奖学金 / Merit Scholarship

#### 工作经历 / Professional Experience

**4 段工作经历，完整双语翻译：**

1. **易读信息技术有限公司 / YiRead Information Technology**
   - 前端工程师 / Frontend Engineer
   - 2025.12-2026.03 / Dec 2025-Mar 2026
   - YiRead AI 阅读系统开发

2. **独立前端开发 / Independent Developer**
   - 前端工程师 / Frontend Engineer
   - 2025.03-2025.11 / Mar 2025-Nov 2025
   - Next.js 全栈应用 & Weather Board

3. **Microsoft via Vendor**
   - Defender 支持工程师 / Defender Technical Support Engineer
   - 2023.12-2024.10 / Dec 2023-Oct 2024
   - 企业级安全技术支持

4. **Knowlecy**
   - 前端工程师 / Frontend Engineer
   - 2023.05-2023.09 / May 2023-Sep 2023
   - React 组件化重构

#### 技能专长 / Technical Skills

**前端开发 / Frontend Development:**
- React / Next.js (90%)
- TypeScript (85%)
- Tailwind CSS (88%)
- Zustand / React Query (82%)

**后端开发 / Backend Development:**
- Node.js (75%)
- PostgreSQL / Prisma (70%)
- RESTful API (80%)

**开发工具 / Development Tools:**
- Git / GitHub (85%)
- Claude / ChatGPT (90%)
- Vite / Webpack (75%)

#### 项目作品 / Projects

1. **YiRead - AI 阅读笔记系统 / AI Reading & Note System**
2. **Next.js 全栈应用 / Next.js Full-Stack Application**
3. **Weather Board** (实时天气仪表板 / Real-time Weather Dashboard)

### 3. 更新的组件 / Updated Components

所有主要组件均已支持双语：

✅ **Navigation** - 导航栏（含语言切换按钮）
✅ **Hero** - 英雄区
✅ **About** - 关于我
✅ **Skills** - 技能专长
✅ **Experience** - 工作经历（完整双语内容）
✅ **Services** - 我的服务
✅ **Portfolio** - 项目作品
✅ **Contact** - 联系我
✅ **Footer** - 页脚

## 使用方法 / How to Use

### 切换语言 / Switch Language

1. **桌面端**: 点击导航栏右侧的语言按钮
2. **移动端**: 打开菜单，在底部找到语言切换按钮
3. **按钮显示**:
   - 中文模式显示 "EN"
   - 英文模式显示 "中文"

### 技术实现 / Technical Implementation

```typescript
// Language Context
const { language, setLanguage, t } = useLanguage();

// 使用翻译函数
t('中文文本', 'English Text')

// 切换语言
setLanguage('zh') // 中文
setLanguage('en') // English
```

## 文件结构 / File Structure

```
portfolio-website/
├── contexts/
│   └── LanguageContext.tsx      # 语言上下文
├── components/
│   ├── LanguageToggle.tsx       # 语言切换按钮
│   ├── Navigation.tsx           # 导航栏（双语）
│   ├── Hero.tsx                 # 英雄区（双语）
│   ├── About.tsx                # 关于（双语）
│   ├── Skills.tsx               # 技能（双语）
│   ├── Experience.tsx           # 经历（双语）
│   ├── Services.tsx             # 服务（双语）
│   ├── Portfolio.tsx            # 作品（双语）
│   ├── Contact.tsx              # 联系（双语）
│   └── Footer.tsx               # 页脚（双语）
└── app/
    └── layout.tsx               # 添加 LanguageProvider
```

## 特色功能 / Highlights

✨ **无缝切换**: 即时语言切换，无需刷新页面
✨ **完整翻译**: 所有内容均有专业的中英文版本
✨ **真实信息**: 基于真实简历PDF的准确信息
✨ **专业排版**: 保持暗色主题的专业设计风格
✨ **响应式**: 桌面和移动端均完美支持

## 数据来源 / Data Sources

- **中文简历**: `/Users/jessie/Desktop/AI_claude/前端简历.pdf`
- **英文简历**: `/Users/jessie/Desktop/AI_claude/前端英文简历.pdf`

## 访问网站 / Visit Website

🌐 **本地开发**: http://localhost:3000

点击右上角的语言切换按钮即可体验中英文切换功能！
Click the language toggle button in the top right corner to experience bilingual switching!
