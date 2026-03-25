'use client';

import { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BookOpen, Zap, Cloud, Check, ChevronDown, ChevronUp } from 'lucide-react';

export default function Portfolio() {
  const { language } = useLanguage();
  const [expandedProject, setExpandedProject] = useState<number | null>(null);

  const iconMap = { book: BookOpen, zap: Zap, cloud: Cloud };

  const projects = language === 'zh' ? [
    {
      title: 'YiRead - AI 阅读笔记系统',
      company: '易读信息技术有限公司',
      period: '2025.12 - 2026.03',
      description: 'PDF 阅读 + AI 聊天软件，支持书本记忆、随问随答，实现 SSE 流式传输与富文本编辑',
      highlights: [
        '基于 EmbedPDF 深度定制标注系统，支持高亮、下划线、矩形、直线等多种标注类型',
        '设计标注数据规范与后端序列化兼容方案，实现标注与便签双向关联',
        '实现 SSE 流式传输，支持 AI 回复增量渲染与思维链实时展示',
        '基于 TipTap 深度定制富文本编辑器，开发 Markdown 快捷语法、单回车换行等自定义扩展',
        '实现好友共读系统，包括好友便签聚合视图、在线状态实时指示',
        '实现文档分片上传与队列调度（最大 2 并发），提升上传稳定性',
        '使用 Dynamic Import 按需加载 PDF 组件，优化首屏性能',
      ],
      tags: ['Next.js', 'TypeScript', 'Zustand', 'React Query', 'SSE', 'TipTap'],
      icon: 'book',
    },
    {
      title: 'Next.js 全栈应用',
      company: '独立开发项目',
      period: '2025.03 - 2025.11',
      description: '基于 Next.js App Router 的前后端一体化应用，实现用户认证与数据管理',
      highlights: [
        '基于 Next.js App Router 构建前后端一体化应用，实现注册、登录、Dashboard 等核心功能',
        '使用 API Routes + RESTful 设计搭建用户服务，结合状态码实现前后端统一错误处理',
        '通过 Prisma + PostgreSQL 设计用户数据模型，完成多环境（SQLite → Postgres）迁移',
        '实现 JWT + HttpOnly Cookie 认证机制，构建 /api/auth/me 接口保障用户会话安全',
        '实现基础权限控制与会话管理机制，支持用户登录态校验与接口访问保护',
      ],
      tags: ['Next.js', 'PostgreSQL', 'Prisma', 'JWT', 'API Routes'],
      icon: 'zap',
    },
    {
      title: 'Weather Board - 天气仪表板',
      company: '独立开发项目',
      period: '2025.03 - 2025.11',
      description: '实时天气仪表板，使用 React 和 OpenWeather API 构建',
      highlights: [
        '使用 React 和 OpenWeather API 构建实时天气数据展示系统',
        '实现请求去重与并发控制机制，将 API 请求减少约 30%',
        '优化 ECharts 图表渲染性能，通过管理组件生命周期与增量更新提升渲染效率',
        '设计响应式界面，支持多设备访问',
      ],
      tags: ['React', 'ECharts', 'OpenWeather API', 'Performance'],
      icon: 'cloud',
    },
  ] : [
    {
      title: 'YiRead - AI Reading & Note System',
      company: 'YiRead Information Technology',
      period: 'Dec 2025 - Mar 2026',
      description: 'PDF reader with AI chat, supporting book memory, Q&A, SSE streaming, and rich text editing',
      highlights: [
        'Built PDF annotation system (highlight, underline, shapes) with precise text anchoring and coordinate transformation',
        'Designed annotation data spec compatible with backend serialization, enabling stable annotation-note mapping',
        'Implemented SSE-based streaming chat with real-time AI response rendering and reasoning chain display',
        'Extended TipTap editor with custom Markdown shortcuts and single-enter line break behavior',
        'Developed collaborative reading features with shared annotations aggregation and real-time presence',
        'Optimized performance with chunked file uploads (max 2 concurrent) and dynamic imports for PDF components',
      ],
      tags: ['Next.js', 'TypeScript', 'Zustand', 'React Query', 'SSE', 'TipTap'],
      icon: 'book',
    },
    {
      title: 'Next.js Full-Stack Application',
      company: 'Independent Project',
      period: 'Mar 2025 - Nov 2025',
      description: 'Integrated frontend-backend app with Next.js App Router, featuring authentication and data management',
      highlights: [
        'Developed integrated app using Next.js App Router with registration, login, and dashboard features',
        'Designed RESTful APIs for user services with unified error handling using status codes',
        'Built user data model with Prisma + PostgreSQL, completed multi-environment migration (SQLite → Postgres)',
        'Implemented JWT + HttpOnly Cookie authentication with /api/auth/me endpoint for secure session management',
        'Developed basic permission control and session validation for protected API access',
      ],
      tags: ['Next.js', 'PostgreSQL', 'Prisma', 'JWT', 'API Routes'],
      icon: 'zap',
    },
    {
      title: 'Weather Board',
      company: 'Independent Project',
      period: 'Mar 2025 - Nov 2025',
      description: 'Real-time weather dashboard built with React and OpenWeather APIs',
      highlights: [
        'Designed and developed real-time weather dashboard using React and OpenWeather APIs',
        'Implemented request deduplication and concurrency control, reducing API requests by ~30%',
        'Optimized ECharts chart rendering performance by managing component lifecycle and incremental updates',
        'Built responsive interface supporting multiple devices',
      ],
      tags: ['React', 'ECharts', 'OpenWeather API', 'Performance'],
      icon: 'cloud',
    },
  ];

  const title = language === 'zh' ? '项目作品' : 'Projects';

  return (
    <section id="portfolio" data-section="portfolio" className="py-20 px-6 bg-orange-50/30">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12 text-stone-800">{title}</h2>

        <div className="grid md:grid-cols-3 gap-6 items-start">
          {projects.map((project, index) => {
            const IconComponent = iconMap[project.icon as keyof typeof iconMap];
            const isExpanded = expandedProject === index;

            return (
              <div
                key={index}
                data-project-id={project.title}
                className={`group flex flex-col overflow-hidden rounded-2xl border border-orange-100 bg-white transition-all duration-300 hover:scale-105 hover:border-orange-300 hover:shadow-xl ${
                  isExpanded ? 'h-auto' : 'h-[21.5rem] md:h-[24rem]'
                }`}
              >
                {/* 项目头部 */}
                <div className="h-32 bg-orange-50 flex items-center justify-center relative overflow-hidden group-hover:bg-orange-100 transition-colors">
                  <IconComponent
                    className="w-12 h-12 text-orange-500 transition-transform group-hover:scale-110"
                    strokeWidth={1.5}
                  />
                </div>

                <div className="flex flex-1 flex-col p-5">
                  {/* 标题和公司 */}
                  <h3 className="font-semibold mb-1 text-stone-800 group-hover:text-orange-600 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-xs text-orange-600 mb-1">{project.company}</p>
                  <p className="text-xs text-stone-500 mb-3">{project.period}</p>

                  {/* 简短描述 */}
                  <p className="mb-4 text-sm leading-relaxed text-stone-600">
                    {project.description}
                  </p>

                  {/* 展开/折叠的详细内容 */}
                  {isExpanded && (
                    <div className="mb-4 space-y-2 animate-fadeIn">
                      <p className="text-xs font-semibold text-stone-700 mb-2">
                        {language === 'zh' ? '核心功能：' : 'Key Features:'}
                      </p>
                      <ul className="space-y-1.5">
                        {project.highlights.map((highlight, i) => (
                          <li key={i} className="flex items-start text-xs text-stone-600">
                            <Check className="w-3 h-3 text-orange-500 mr-1.5 flex-shrink-0 mt-0.5" />
                            <span className="leading-relaxed">{highlight}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  {/* 技术标签 */}
                  <div className="mb-3 flex flex-wrap gap-1.5">
                    {project.tags.slice(0, isExpanded ? project.tags.length : 3).map((tag, i) => (
                      <span
                        key={i}
                        className="px-2 py-0.5 bg-orange-50 text-orange-600 text-xs rounded-md border border-orange-100"
                      >
                        {tag}
                      </span>
                    ))}
                    {!isExpanded && project.tags.length > 3 && (
                      <span className="px-2 py-0.5 text-orange-500 text-xs">
                        +{project.tags.length - 3}
                      </span>
                    )}
                  </div>

                  {/* 展开/折叠按钮 */}
                  <button
                    onClick={() => setExpandedProject(isExpanded ? null : index)}
                    className="mt-auto flex w-full items-center justify-center gap-1 rounded-lg py-2 text-xs font-medium text-orange-600 transition-colors hover:bg-orange-50 hover:text-orange-700"
                  >
                    {isExpanded ? (
                      <>
                        {language === 'zh' ? '收起详情' : 'Show Less'}
                        <ChevronUp className="w-3 h-3" />
                      </>
                    ) : (
                      <>
                        {language === 'zh' ? '查看详情' : 'Show More'}
                        <ChevronDown className="w-3 h-3" />
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out;
        }
      `}</style>
    </section>
  );
}
