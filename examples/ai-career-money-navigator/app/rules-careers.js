// rules-careers.js
// 15 个标准职业 + 9 个合成画像（共 24 个 profile）。
// 每个 profile 声明: ai_risk_base, augment_examples, typical_pathways。

window.CAREERS = {
  programmer: {
    name: '程序员 / 软件工程师',
    ai_risk_base: 55,
    augment_examples: [
      '把重复的脚手架、CRUD、单元测试生成流程用 Claude Code 标准化，单任务时间砍到原 20%',
      'Code Review 流程打包成可复用 Prompt，团队产出质量更稳定',
      '技术文档 + changelog 接入自动生成，发版成本降到十分钟级'
    ],
    typical_pathways: ['P5', 'P4', 'P2', 'P9']
  },
  pm: {
    name: '产品经理',
    ai_risk_base: 45,
    augment_examples: [
      '用户访谈转录 + 痛点聚类从 2 天压到 2 小时',
      '竞品分析、用户画像、PRD 草稿用结构化 Prompt 一次生成',
      '数据看板问题排查用 AI 辅助做假设 → 验证 → 结论全链路'
    ],
    typical_pathways: ['P7', 'P3', 'P1', 'P9']
  },
  designer: {
    name: '设计师',
    ai_risk_base: 60,
    augment_examples: [
      '初稿/配色/图标批量探索从手工切换到 AI 生成 + 筛选',
      'Figma 工作流接 Claude Code 脚本，自动生成组件变体',
      '把个人风格做成 AI 模板包，对外卖给中小团队'
    ],
    typical_pathways: ['P2', 'P4', 'P1', 'P3']
  },
  ops: {
    name: '运营',
    ai_risk_base: 55,
    augment_examples: [
      '日常报表、内容排期、用户分群 SQL 自动化',
      '社群日志 + 周报用 AI 归纳，只人工审终稿',
      '活动 SOP 打包成可复用 Prompt 包'
    ],
    typical_pathways: ['P7', 'P4', 'P1', 'P9']
  },
  marketing: {
    name: '市场营销',
    ai_risk_base: 50,
    augment_examples: [
      '内容矩阵（长文/短视频/小红书）用 AI 串联产出，一稿多渠改写',
      'SEO 选题 + 关键词矩阵自动化',
      '投放创意/落地页 A/B 素材批量生成'
    ],
    typical_pathways: ['P1', 'P7', 'P4', 'P3']
  },
  sales: {
    name: '销售',
    ai_risk_base: 40,
    augment_examples: [
      '客户资料抓取 + 背景摘要自动化',
      '跟进邮件 / 话术个性化模板',
      'CRM 备注一键转结构化 insight'
    ],
    typical_pathways: ['P7', 'P3', 'P9', 'P1']
  },
  creator: {
    name: '内容创作者',
    ai_risk_base: 50,
    augment_examples: [
      '选题矩阵 + 标题批量生产，释放 70% 时间给创作',
      '长文 → 短视频 / 图文 一稿多形态自动改写',
      '把个人方法论封装成小工具网页发给读者'
    ],
    typical_pathways: ['P1', 'P5', 'P4', 'P8']
  },
  video: {
    name: '视频博主',
    ai_risk_base: 45,
    augment_examples: [
      '脚本大纲 + 分镜 + 字幕流程用 AI 全链路加速',
      '素材库打标签、快速检索',
      '二创 / 多平台剪辑用模板批量处理'
    ],
    typical_pathways: ['P1', 'P4', 'P8', 'P3']
  },
  writer: {
    name: '自媒体 / 专栏作者',
    ai_risk_base: 60,
    augment_examples: [
      '资料整理 + 论点对撞用 AI 做第一轮',
      '专栏选题数据驱动（搜索热词 + 读者反馈聚类）',
      '出一个网页小工具放入自己的专栏引流'
    ],
    typical_pathways: ['P1', 'P6', 'P8', 'P4']
  },
  consultant: {
    name: '咨询顾问',
    ai_risk_base: 35,
    augment_examples: [
      '行业数据 + 竞品资料预研时间压缩 80%',
      '访谈录音 → 结论框架自动生成，只人工补洞察',
      '把自己的分析框架封装成付费工具'
    ],
    typical_pathways: ['P3', 'P7', 'P4', 'P6']
  },
  finance: {
    name: '财务 / 会计',
    ai_risk_base: 65,
    augment_examples: [
      'Excel / 报表自动化工作流（脚本 + LLM 校验）',
      '合规文件起草 + 核查',
      '财务培训 SOP 打包 + 对外变现'
    ],
    typical_pathways: ['P9', 'P3', 'P4', 'P7']
  },
  legal: {
    name: '律师 / 法务',
    ai_risk_base: 45,
    augment_examples: [
      '合同审阅初稿 + 条款对比',
      '案例检索 + 关键判例摘要',
      '面向特定人群的合规工具网页'
    ],
    typical_pathways: ['P3', 'P7', 'P5', 'P9']
  },
  teacher: {
    name: '教师 / 培训师',
    ai_risk_base: 50,
    augment_examples: [
      '课件 + 练习题 + 作业批改辅助',
      '个性化学习路径生成',
      '把课程变成自助工具网页销售'
    ],
    typical_pathways: ['P1', 'P4', 'P5', 'P8']
  },
  researcher: {
    name: '研究 / 学术',
    ai_risk_base: 40,
    augment_examples: [
      '文献梳理 + 摘要 + 引用图',
      '实验设计 / 数据分析辅助',
      '把方法论变成可复用工具'
    ],
    typical_pathways: ['P5', 'P3', 'P6', 'P1']
  },
  generalist: {
    name: '其他（通用兜底）',
    ai_risk_base: 50,
    augment_examples: [
      '先拆出 3 个最重复的工作动作，用 AI 替代或加速',
      '把沟通 / 写作 / 资料整理三个环节用固定 Prompt 标准化',
      '用 1 个月观察哪个动作压缩最大，再深化'
    ],
    typical_pathways: ['P1', 'P2', 'P9']
  },
  // 合成画像（"其他" + 技能组合时使用）
  indie_maker: {
    name: '独立开发者',
    ai_risk_base: 35,
    augment_examples: [
      '全栈脚手架 + 部署 + 基础运维全部用 Claude Code 驱动',
      '把每个试错的小产品标准化成 24 小时上线的 MVP 工作流',
      '围绕自己的产品做工具化内容（网页 + Newsletter）积累用户'
    ],
    typical_pathways: ['P5', 'P4', 'P2', 'P1']
  },
  designer_dev: {
    name: '设计型开发者',
    ai_risk_base: 40,
    augment_examples: [
      '把设计 → 代码的切图 / 组件生成环节全自动',
      '个人风格做成 UI kit，配合 AI 生成变体出售',
      '把自己的设计系统做成可嵌入小工具'
    ],
    typical_pathways: ['P5', 'P2', 'P4', 'P1']
  },
  content_designer: {
    name: '内容设计',
    ai_risk_base: 55,
    augment_examples: [
      '视觉 + 文字一稿多形态自动改写',
      '个人图文模板包对外销售',
      '把选题 / 配图 / 排版流程封装成 Prompt 包'
    ],
    typical_pathways: ['P1', 'P4', 'P5', 'P2']
  },
  content_marketer: {
    name: '内容营销',
    ai_risk_base: 50,
    augment_examples: [
      'SEO + 社媒 + 邮件矩阵联动',
      '把自己的冷启动方法论打包成付费课程 / 报告',
      '做单页内容工具帮企业获客'
    ],
    typical_pathways: ['P1', 'P7', 'P4', 'P6']
  },
  analyst_consultant: {
    name: '分析型咨询',
    ai_risk_base: 35,
    augment_examples: [
      '行业 / 公司分析预研流程半自动化',
      '研报自动抓取 + 结构化摘要',
      '把分析框架封装成付费工具'
    ],
    typical_pathways: ['P3', 'P7', 'P6', 'P4']
  },
  growth_operator: {
    name: '增长运营',
    ai_risk_base: 45,
    augment_examples: [
      '获客渠道测试自动化（文案 × 素材 × 落地页）',
      '用户分群 + 精细化运营脚本化',
      '把增长 SOP 打包卖给中小团队'
    ],
    typical_pathways: ['P7', 'P4', 'P1', 'P3']
  },
  product_designer: {
    name: '产品设计',
    ai_risk_base: 45,
    augment_examples: [
      '用户研究 → 原型 → 交互全链路 AI 辅助',
      '用 Claude Code 把自己的交互规范做成可运行 Demo',
      '把设计方法论打包成行业工具'
    ],
    typical_pathways: ['P2', 'P7', 'P5', 'P3']
  },
  data_analyst: {
    name: '数据分析',
    ai_risk_base: 50,
    augment_examples: [
      'SQL / Notebook 起稿全部 AI 辅助',
      '定制报表 + 自然语言查询工具',
      '把某一行业的分析模板做成付费工具'
    ],
    typical_pathways: ['P5', 'P7', 'P3', 'P4']
  }
};

window.SYNTHETIC_PROFILES = [
  { skills: ['代码', '写作'], id: 'indie_maker' },
  { skills: ['代码', '设计'], id: 'designer_dev' },
  { skills: ['写作', '设计'], id: 'content_designer' },
  { skills: ['写作', '营销'], id: 'content_marketer' },
  { skills: ['咨询', '研究'], id: 'analyst_consultant' },
  { skills: ['销售', '营销'], id: 'growth_operator' },
  { skills: ['设计', '产品'], id: 'product_designer' },
  { skills: ['数据', '研究'], id: 'data_analyst' }
];
