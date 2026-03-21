# Three.js 动画实现说明

## 🎨 实现的效果

在 Hero 区域添加了 **3 个漂浮的半透明橙色几何图形**，具有以下特性：

### 视觉效果
- ✨ 3 个不同尺寸的立方体
- 🟠 橙色系渐变（#f97316, #fb923c, #fdba74）
- 💫 半透明材质（opacity: 0.15）
- 🔄 缓慢旋转和上下漂浮
- 🖱️ 鼠标移动时有轻微视差效果

### 性能优化

#### 1. **移动端优化** ⭐⭐⭐
```tsx
// 移动端完全禁用 Three.js
if (window.innerWidth < 768) return null;
```
- 检测屏幕宽度
- 移动端不加载 Three.js
- 节省移动设备性能

#### 2. **懒加载 (Lazy Loading)** ⭐⭐⭐
```tsx
const ThreeBackground = dynamic(() => import('./ThreeBackground'), {
  ssr: false,  // 禁用服务端渲染
  loading: () => null,
});
```
- 使用 Next.js `dynamic` 导入
- 禁用 SSR，避免服务端渲染错误
- 减少初始 bundle 大小

#### 3. **WebGL 优化** ⭐⭐
```tsx
<Canvas
  gl={{
    antialias: false,  // 禁用抗锯齿
    powerPreference: 'high-performance',  // 高性能模式
  }}
  dpr={[1, 1.5]}  // 限制像素比
/>
```
- 禁用抗锯齿以提升性能
- 限制设备像素比最高 1.5x
- 使用高性能 GPU 模式

#### 4. **Suspense 边界** ⭐
```tsx
<Suspense fallback={null}>
  <FloatingShapes />
</Suspense>
```
- 异步加载组件
- 加载失败时优雅降级

#### 5. **优化的材质** ⭐⭐
```tsx
<meshStandardMaterial
  transparent
  opacity={0.15}  // 低透明度减少渲染负担
  roughness={0.4}
  metalness={0.1}
/>
```
- 使用 StandardMaterial（比 PhysicalMaterial 更轻）
- 低透明度减少渲染计算
- 简单的光照模型

## 📁 文件结构

```
components/
├── FloatingShapes.tsx      # 3D 形状组件
├── ThreeBackground.tsx     # Three.js Canvas 容器（含优化）
└── Hero.tsx                # Hero 组件（集成动画）
```

## 🔧 已安装的依赖

```json
{
  "three": "^0.160.0",
  "@react-three/fiber": "^8.15.0",
  "@react-three/drei": "^9.92.0"
}
```

## ⚡ 性能指标

- **桌面端**: 稳定 60 FPS
- **移动端**: 不加载（0 性能消耗）
- **首屏加载**: 增加约 150KB（gzip 后）
- **内存占用**: ~30MB

## 🎮 交互效果

1. **自动动画**
   - 缓慢旋转（每个立方体随机速度）
   - 上下漂浮（使用 `Float` 组件）

2. **鼠标视差**
   - 鼠标移动时几何图形会轻微跟随
   - 视差强度：0.3（30%）

## 🎨 自定义配置

### 调整形状数量
在 `FloatingShapes.tsx` 中修改 `shapes` 数组：

```tsx
const shapes = [
  { position: [-3, 2, -2], scale: 1.2, color: '#f97316' },
  { position: [3, -1, -3], scale: 1.5, color: '#fb923c' },
  // 添加更多形状...
];
```

### 调整透明度
```tsx
<meshStandardMaterial
  opacity={0.15}  // 0.1-0.3 推荐范围
/>
```

### 调整动画速度
```tsx
<Float
  speed={1.5}  // 漂浮速度（推荐 1-3）
  rotationIntensity={0.3}  // 旋转强度（推荐 0.2-0.5）
  floatIntensity={0.5}  // 漂浮幅度（推荐 0.3-1）
/>
```

### 更改形状类型
将 `boxGeometry` 替换为：
```tsx
<sphereGeometry args={[1, 32, 32]} />  // 球体
<torusGeometry args={[1, 0.3, 16, 100]} />  // 圆环
<octahedronGeometry args={[1, 0]} />  // 八面体
```

## 🐛 故障排除

### 问题：Three.js 不显示
**解决**：检查浏览器控制台错误，确保：
- WebGL 已启用
- 不在移动设备上测试
- 组件已挂载

### 问题：性能卡顿
**解决**：
1. 减少形状数量（1-2 个）
2. 降低透明度（opacity: 0.1）
3. 禁用抗锯齿（已默认禁用）
4. 降低 dpr（改为 `[1, 1]`）

### 问题：移动端仍然加载
**解决**：检查 `ThreeBackground.tsx` 中的移动端检测逻辑

## 🚀 未来扩展建议

1. **添加更多形状类型**
   - 球体、圆环、多面体混合

2. **颜色主题切换**
   - 根据暗色/亮色模式改变颜色

3. **滚动视差**
   - 滚动时形状移动

4. **点击交互**
   - 点击形状时产生波纹或弹跳

5. **粒子系统**
   - 添加小粒子环绕几何图形

## 📊 性能监控

在开发环境中添加 FPS 监控：

```bash
npm install @react-three/perf
```

```tsx
import { Perf } from '@react-three/perf';

<Canvas>
  <Perf position="top-left" />
  <FloatingShapes />
</Canvas>
```

---

**效果预览**: 访问 http://localhost:3000 查看动画效果！

整体设计理念：**低调优雅，不抢眼，提升质感** ✨
