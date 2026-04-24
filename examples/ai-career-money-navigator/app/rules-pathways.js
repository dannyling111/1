// rules-pathways.js
// 9 条赚钱路径。每条包含：硬条件、打分 boosts、一句话定位、工具栈、
// 以及 7/30/90 天行动模板（带占位符）。

window.PATHWAYS = {
  P1: {
    name: '做内容（博客 / 视频 / 小红书 / Newsletter）',
    requires: ['content:yes'],
    boosts: [
      { if: 'hours_gte_15', score: 15 },
      { if: 'risk_not_conservative', score: 10 },
      { if: 'income_gte_mid', score: 5 },
      { if: 'skill:写作|视觉|内容', score: 15 },
      { if: 'skill:研究', score: 10 }
    ],
    one_liner: '把你在【{{career}}】积累的专业判断，通过内容转化为稳定的影响力资产',
    why: '你勾选了"愿意做内容"，加上【{{skill_1}}】作为核心技能，每周【{{hours}}】的投入足以维持单一渠道的高频输出',
    tools: ['Claude Code', 'Obsidian', '剪映 / CapCut', 'Notion', 'Canva'],
    plan_7: [
      '基于【{{career}}】挑一个你常被问的问题，用【{{skill_1}}】的视角写一条 800–1500 字的短文 / 30 秒脚本',
      '每天花 30 分钟刷【{{career}}】相邻赛道 Top10 内容，记录 10 个让你想评论的标题',
      '用【{{skill_1}}】视角定下未来 30 天的单一主题定位（一句话，≤20 字）'
    ],
    plan_30: [
      '产出 8–12 条同主题内容，【{{hours}}】/周的节奏一周 2–3 条',
      '统计每条的停留 / 互动数据，挑出【{{skill_1}}】最擅长的 Top 3 类型集中续作',
      '把最好的 3 条内容改写成长文 / 电子书章节，铺向【{{income_goal}}】的付费路径'
    ],
    plan_90: [
      '积累 30+ 条【{{career}}】相关内容后回看能否形成"系列 / 方法论"，若能即可出付费内容',
      '根据【{{income_goal}}】反推变现路径：内容→咨询/课程/社群/产品',
      '以【{{career}}】视角开一个 Newsletter 或专栏把散点内容集中，作为私域根据地'
    ]
  },
  P2: {
    name: 'AI 增强的自由职业（接项目 / 做服务）',
    requires: [],
    boosts: [
      { if: 'skill:代码|设计|写作|营销|咨询', score: 20 },
      { if: 'hours_gte_15', score: 10 },
      { if: 'code:yes', score: 10 },
      { if: 'risk_not_conservative', score: 5 },
      { if: 'income_gte_mid', score: 5 }
    ],
    one_liner: '把【{{skill_1}}】 + AI 工作流打包成明显比同行快 / 比同行便宜的服务',
    why: '【{{skill_1}}】是你最强变量，加上你愿意投入【{{hours}}】每周，可以在 30 天内积累真实案例',
    tools: ['Claude Code', 'Upwork / 小红书 / 即刻', 'Notion', 'Linear', 'Loom'],
    plan_7: [
      '写一条"我用 AI 帮【{{career}}】同行省了 X 小时"的服务定位说明',
      '针对【{{skill_1}}】做一个可演示的 5 分钟 Loom 视频',
      '从【{{career}}】圈子主动联系 3 位同行 / 潜在客户，请他们免费试用换一条反馈'
    ],
    plan_30: [
      '完成 2–3 个付费小单，价格锚在目标月收入【{{income_goal}}】的 1/10–1/5',
      '把每次【{{skill_1}}】交付中的 AI 工作流沉淀成 SOP，下次复用',
      '把 3 个案例公开给【{{career}}】圈子，作为获客素材'
    ],
    plan_90: [
      '把最常复用的【{{skill_1}}】SOP 做成付费模板包（¥99–¥299）',
      '在【{{career}}】圈子把单价提高 30–50%，用"AI 驱动"的差异化拉开同行差距',
      '选【{{career}}】相邻的 1 个垂直行业深做，避免泛接单陷阱'
    ]
  },
  P3: {
    name: '1v1 咨询 / 定制服务（高客单）',
    requires: ['consult:yes'],
    boosts: [
      { if: 'skill:咨询|研究|营销|产品', score: 20 },
      { if: 'income_gte_high', score: 15 },
      { if: 'risk_not_conservative', score: 5 },
      { if: 'hours_gte_5', score: 5 }
    ],
    one_liner: '把【{{career}}】的深度经验 + AI 分析工作流打包成高客单的 1v1 交付',
    why: '你愿意做咨询，【{{skill_1}}】提供专业深度，目标月收入【{{income_goal}}】适合少量高客单策略',
    tools: ['Claude Code', 'Notion', 'Calendly', 'Loom', 'Miro'],
    plan_7: [
      '写一页"我可以帮你解决的 3 类问题"，基于【{{career}}】过往经历',
      '把一次解决过的【{{career}}】难题写成 500 字案例（含结果数字）',
      '在 1 个合适平台（即刻 / 小红书 / LinkedIn）发一条面向【{{career}}】同行的免费咨询邀请'
    ],
    plan_30: [
      '从【{{career}}】相关场景切入，免费交付 2–3 个 45 分钟咨询换证言',
      '把咨询中最常回答的 5 个问题转成【{{career}}】视角的结构化诊断流程',
      '按目标月收入【{{income_goal}}】反推公开定价（不要模糊表达）'
    ],
    plan_90: [
      '把【{{career}}】咨询流程中可自动化的 40% 用 AI 替代，单次交付压到 2 小时内',
      '在【{{career}}】圈子测试小额付费咨询（¥300–¥800），逐步涨到【{{income_goal}}】水平',
      '产出"咨询结果 → 内容"的复用路径，让【{{career}}】受众反哺客源'
    ]
  },
  P4: {
    name: 'Prompt / SOP / 模板包（低价数字产品）',
    requires: ['product:yes'],
    boosts: [
      { if: 'code:yes', score: 15 },
      { if: 'skill:代码|写作|设计|营销', score: 15 },
      { if: 'hours_gte_15', score: 10 },
      { if: 'risk_not_conservative', score: 5 }
    ],
    one_liner: '把你【{{career}}】日常复用的工作流固化成可卖的 Prompt / SOP / 模板包',
    why: '你愿意做产品，【{{skill_1}}】保证模板有深度，【{{hours}}】/周可以支撑 1 个月内出 1 个包',
    tools: ['Claude Code', 'Gumroad / 小报童 / 知识星球', 'Notion', 'Markdown'],
    plan_7: [
      '列出你用【{{skill_1}}】每周重复 ≥3 次的 5 个动作',
      '选其中 1 个，写成 3 页【{{career}}】同行可跑通的 Prompt 包（含示例输入输出）',
      '找 3 位【{{career}}】同行免费试用，换他们的修改建议'
    ],
    plan_30: [
      '面向【{{career}}】把模板包完善到 10 页，定价 ¥29–¥99，上架平台',
      '用【{{skill_1}}】视角发 3–5 条"我是怎么做的 + 怎么复用"的内容引流',
      '第一个月目标 ≥10 单，累计收入锚定目标【{{income_goal}}】的 1/10'
    ],
    plan_90: [
      '根据反馈迭代 v2，推出面向【{{career}}】的升级包（¥99–¥299）',
      '做一个面向【{{career}}】的配套小网页作为免费试用入口',
      '面向【{{career}}】开始测试月度订阅（¥29/月，每月更新 1 套模板）'
    ]
  },
  P5: {
    name: '单页 Web 工具 / 小应用（免费引流 + 后续变现）',
    requires: ['code:yes', 'product:yes'],
    boosts: [
      { if: 'skill:代码', score: 20 },
      { if: 'hours_gte_15', score: 15 },
      { if: 'risk_not_conservative', score: 5 },
      { if: 'skill:设计|产品', score: 10 }
    ],
    one_liner: '做一个针对【{{career}}】痛点的单页工具（免费 → 付费模板包 / 定制服务）',
    why: '你会写代码、愿意做产品，【{{skill_1}}】提供内容深度；对【{{career}}】而言，单页工具是最短验证路径',
    tools: ['Claude Code', 'GitHub Pages / Vercel / Cloudflare Pages', 'Plausible / 自埋点', 'Gumroad'],
    plan_7: [
      '用【{{hours}}】中 2 天做一个极简单页原型：【{{career}}】视角的输入表单 + 规则化输出（不接 API）',
      '部署到免费托管，拿到可分享链接发给【{{career}}】圈子',
      '发给 5 位【{{career}}】同行试用，记录他们的首 30 秒反应'
    ],
    plan_30: [
      '针对【{{career}}】打磨到"5 分钟填完 + 明显不是套话"的体验',
      '加上低价模板包作为升级入口，锚定【{{income_goal}}】的 1/100–1/50',
      '在 1–2 个【{{career}}】相关社群冷启动，目标 100 次使用'
    ],
    plan_90: [
      '根据【{{career}}】用户数据找到最高使用频次的 3 个场景，做 v0.2 聚焦升级',
      '向【{{career}}】深度客户引入半自动定制服务（¥999+）作为金字塔顶端',
      '如果【{{career}}】圈子 PMF 信号强，再考虑接 LLM API 做实时个性化'
    ]
  },
  P6: {
    name: '垂直信息聚合 Newsletter / 付费订阅',
    requires: ['content:yes'],
    boosts: [
      { if: 'skill:研究|写作|咨询', score: 20 },
      { if: 'hours_gte_15', score: 10 },
      { if: 'risk_balanced_or_aggressive', score: 10 },
      { if: 'income_gte_mid', score: 5 }
    ],
    one_liner: '围绕【{{career}}】相关的"可行动信息流"做 Newsletter，读者愿意付年费',
    why: '你愿意做内容，【{{skill_1}}】让你有筛选信息的品味，【{{hours}}】每周足以维持周更',
    tools: ['Substack / Ghost / 飞书文档', 'Obsidian', 'RSS / 自建抓取', 'Claude Code'],
    plan_7: [
      '定下 1 个极窄选题（"【{{career}}】× AI 自动化"这样的交叉带）',
      '面向【{{career}}】发第一期免费 Newsletter，≤2000 字，结构是"3 个信号 + 3 个动作"',
      '在 2 个【{{career}}】聚集平台冷启动招募前 50 位订阅'
    ],
    plan_30: [
      '以【{{hours}}】/周的节奏周更 4 期，固定结构 + 固定时间',
      '积累到 200 订阅时上线付费档（年费锚 ≤【{{income_goal}}】的 1/50）',
      '每期收集【{{career}}】读者反馈，迭代选题边界'
    ],
    plan_90: [
      '500 【{{career}}】订阅时开始做"读者闭门会议 + 数据库"等高阶形态',
      '把最热的 3 期【{{skill_1}}】相关内容单独包装为付费资料包',
      '面向【{{career}}】做一个配套小工具（参见 P5）作为引流入口'
    ]
  },
  P7: {
    name: 'AI 增强的 B 端服务（面向中小公司）',
    requires: [],
    boosts: [
      { if: 'skill:咨询|营销|销售|产品', score: 20 },
      { if: 'income_gte_high', score: 15 },
      { if: 'risk_not_conservative', score: 5 },
      { if: 'hours_gte_15', score: 5 }
    ],
    one_liner: '把你【{{career}}】行业的经验 + AI 工作流做成企业服务（内训 / 咨询 / 自动化 SOP）',
    why: '【{{skill_1}}】在 B 端单价高，【{{income_goal}}】的目标适合 3–5 个中型客户而非散单',
    tools: ['Claude Code', 'Miro / 飞书', 'LinkedIn / 即刻', 'Loom'],
    plan_7: [
      '盘点【{{career}}】相关行业 3 家有 AI 转型需求的公司，写一页"我能为你解决什么"',
      '做一个【{{career}}】× AI 的 20 分钟公开分享（线上 / 沙龙）建立专业势能',
      '联系 5 位【{{career}}】行业中层，要一次 30 分钟诊断会'
    ],
    plan_30: [
      '完成 1 次【{{career}}】相关付费小项目（¥3k–¥10k 级），积累真实案例',
      '把【{{skill_1}}】交付过程做成 SOP，下次复用',
      '在【{{career}}】行业社群发布 1 份 "AI × 【{{career}}】" 白皮书作为获客素材'
    ],
    plan_90: [
      '锚定【{{career}}】相邻的 1 个垂直（如教育 / 法律 / 金融），做专业化',
      '推出月度咨询 retainer（¥1–3 万 / 月），锚定目标月收入【{{income_goal}}】',
      '把【{{skill_1}}】相关最常复用服务做成 SaaS 雏形或模板包并行变现'
    ]
  },
  P8: {
    name: '付费社群 / 小圈子',
    requires: ['content:yes'],
    boosts: [
      { if: 'risk_aggressive', score: 15 },
      { if: 'skill:咨询|营销|运营', score: 15 },
      { if: 'hours_gte_15', score: 10 },
      { if: 'income_gte_mid', score: 5 }
    ],
    one_liner: '围绕"【{{career}}】× AI 转型"建立小而密的付费社群',
    why: '你愿意做内容 + 风险偏好偏进取，【{{skill_1}}】作为【{{career}}】社群主理人的专业背书',
    tools: ['知识星球 / Discord / Circle', 'Notion', 'Zoom', 'Claude Code'],
    plan_7: [
      '先以【{{career}}】× AI 主题的免费微信群 / Discord 频道测试"每周 1 次讨论 + 1 次资源分享"的节奏',
      '写一段【{{skill_1}}】视角的清晰社群定位（为谁 / 解决什么 / 不做什么）',
      '从【{{career}}】圈子招募 10 位种子用户，做 2 周免费体验'
    ],
    plan_30: [
      '上线付费版，年费锚 ≤【{{income_goal}}】的 1/20，保留 3–5 位深度种子用户作为氛围骨干',
      '固定一周 1 次【{{career}}】× AI 主题话题，避免社群变成工具链分享群',
      '收集【{{career}}】反馈迭代社群定位'
    ],
    plan_90: [
      '300 【{{career}}】会员时推出"进阶小圈子"（¥999+ 年费）做分层',
      '沉淀【{{career}}】社群 → 咨询 / 课程 / 合作 的横向变现',
      '用【{{career}}】社群数据反哺选题和内容方向'
    ]
  },
  P9: {
    name: '在职 AI 提效副业（保守打法）',
    requires: [],
    boosts: [
      { if: 'hours_lt_15', score: 20 },
      { if: 'risk_conservative', score: 20 },
      { if: 'skill:代码|写作|设计|营销|咨询', score: 10 },
      { if: 'code:yes', score: 5 }
    ],
    one_liner: '先不辞职，把 AI 提效先在本职工作里跑通，再选副业方向',
    why: '你每周只能投入【{{hours}}】，风险偏好偏稳，适合先在【{{career}}】内部验证 AI 工作流',
    tools: ['Claude Code', 'Obsidian', 'Notion'],
    plan_7: [
      '列出【{{career}}】日常 5 个最重复动作',
      '选【{{career}}】里最痛的 1 个，用 AI 重做一次，记录【{{hours}}】内的时间对比',
      '向【{{career}}】主管 / 同事分享 1 个提效技巧，建立"AI 小行家"人设'
    ],
    plan_30: [
      '把【{{career}}】3 个动作的 AI 工作流固化为个人 SOP',
      '挑【{{skill_1}}】相邻 1 个方向做 2–4 小时/周的外部学习（微课 / 实验项目）',
      '写 1 篇【{{career}}】视角的公开笔记（公司外），测试哪类内容有人看'
    ],
    plan_90: [
      '评估是否值得把【{{career}}】提效经验转成副业：咨询 / 内容 / 小产品',
      '在【{{hours}}】内不辞职的前提下启动 1 个最小副业试点',
      '按目标【{{income_goal}}】的 3 个月真实数据再决定是否全职转型'
    ]
  }
};
