# Claude.ai UI 风格设计说明

## 🎨 设计理念

参考 Claude.ai 的设计风格，打造了一个现代、温暖、简洁的个人作品集网站。

## 主要设计特点

### 1. **配色方案**
- **主题色**: 琥珀色/橙色 (#d97706, #f59e0b)
  - 从紫色改为温暖的琥珀色系
  - 渐变效果：`from-amber-400 to-orange-500`
- **背景色**: 温暖的渐变浅色
  - 从 `#fafaf9` 到 `#fff7ed`
  - 局部使用 `orange-50/30` 创建层次感
- **文字颜色**:
  - 主文本：`stone-800`
  - 副文本：`stone-600`
  - 辅助文本：`stone-500`

### 2. **圆角设计**
- **大圆角**: 使用 `rounded-3xl` (24px) 和 `rounded-2xl` (16px)
- **按钮**: `rounded-xl` (12px) 和 `rounded-full`
- 创建柔和、友好的视觉效果

### 3. **阴影与边框**
- **柔和阴影**: `shadow-lg` 和 `shadow-xl`
- **细边框**: `border border-stone-200`
- **悬停效果**: `hover:shadow-2xl` + `hover:-translate-y-1`

### 4. **渐变效果**
- **背景渐变**:
  ```css
  bg-gradient-to-r from-amber-500 to-orange-500
  bg-gradient-to-br from-amber-400 to-orange-500
  ```
- **文字渐变**:
  ```css
  bg-gradient-to-r from-amber-600 to-orange-500 bg-clip-text text-transparent
  ```

### 5. **图标与表情符号**
- 使用表情符号 (Emoji) 代替图标库
  - 📚 📱 ✉️ 📍 🎨 💻 🚀 ⚡ 🛡️ 🌤️
- 更加友好、直观、跨平台兼容

### 6. **排版**
- **字体**: 系统默认字体栈
  ```css
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif
  ```
- **大标题**: `text-4xl md:text-5xl` (36px/48px)
- **间距**: 使用 `py-24` (96px) 创建充足的空间感

### 7. **交互动画**
- **悬停缩放**: `hover:scale-105`
- **平滑过渡**: `transition-all duration-300`
- **向上浮动**: `hover:-translate-y-1`
- **图标缩放**: `group-hover:scale-110`

### 8. **自定义滚动条**
```css
::-webkit-scrollbar {
  width: 10px;
}
::-webkit-scrollbar-thumb {
  background: #d97706;
  border-radius: 5px;
}
```

## 组件设计亮点

### 导航栏 (Navigation)
- ✨ 半透明背景 `bg-white/80` + 毛玻璃效果 `backdrop-blur-xl`
- ✨ 细边框 `border-b border-stone-200`
- ✨ 悬停时橙色背景 `hover:bg-amber-50`

### 英雄区 (Hero)
- ✨ 圆形头像占位符，渐变背景
- ✨ 渐变文字效果
- ✨ 两个行动号召按钮，一个渐变，一个描边
- ✨ 箭头图标悬停动画

### 关于我 (About)
- ✨ 白色卡片 + 柔和阴影
- ✨ 渐变装饰条分隔标题
- ✨ 统计卡片使用渐变文字
- ✨ 琥珀色强调元素

### 技能 (Skills)
- ✨ 表情符号图标
- ✨ 渐变进度条
- ✨ 卡片悬停阴影效果

### 工作经历 (Experience)
- ✨ 大表情符号图标
- ✨ 时间标签使用琥珀色背景
- ✨ 子弹点使用琥珀色

### 项目作品 (Portfolio)
- ✨ 渐变头部背景
- ✨ 卡片悬停上浮效果
- ✨ 标签使用淡琥珀色背景

### 联系表单 (Contact)
- ✨ 表单输入框使用 `stone-50` 背景
- ✨ 聚焦时琥珀色环形效果
- ✨ 联系信息卡片化展示

### 页脚 (Footer)
- ✨ 渐变背景 `from-stone-50 to-orange-50/30`
- ✨ 简洁的版权信息

## 响应式设计

- **移动优先**: 所有组件都优先考虑移动端
- **断点**:
  - `md:` - 768px 以上
  - 网格自动适配: `grid md:grid-cols-2` / `grid md:grid-cols-3`

## 性能优化

- ✅ 使用 Tailwind CSS 的 JIT 模式
- ✅ 最小化 CSS 输出
- ✅ 优化的过渡动画
- ✅ 按需加载组件

## 可访问性

- ✅ 语义化 HTML
- ✅ 适当的颜色对比度
- ✅ Focus 状态样式
- ✅ ARIA 标签

## 与 Claude.ai 的相似之处

1. **温暖的配色** - 琥珀色/橙色主题
2. **大圆角** - 柔和的边角
3. **渐变效果** - 微妙的渐变背景
4. **充足留白** - 清晰的空间感
5. **简洁现代** - 极简主义设计
6. **流畅动画** - 平滑的过渡效果

## 浏览器支持

- ✅ Chrome (最新)
- ✅ Firefox (最新)
- ✅ Safari (最新)
- ✅ Edge (最新)

---

**访问网站**: http://localhost:3000

体验全新的 Claude.ai 风格设计！ 🎨✨
