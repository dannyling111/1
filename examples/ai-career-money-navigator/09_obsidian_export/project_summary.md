---
tags: [ai-venture-os, project-log, v0.1, career-tool]
type: project-summary
status: launched-pending-validation
date: 2026-04-24
gate: G7
---

# AI 职业赚钱路径诊断器 v0.1

## 一句话

单页网页 + 规则引擎，输入 9 个字段，5 分钟生成"AI 时代你的赚钱路径"报告。纯前端、不调 LLM、可复制 Markdown。

## 项目意义

本项目是 [[AI Venture OS]] 的第一个样板项目，用来验证"阶段门 + 强制文件产出 + 反过度工程"的工作流能否跑通。

## 关键指标（Gate 5 冷启动档）

- **72 个自动化断言** 全部通过
- 24 个职业 profile（15 标准 + 9 合成）覆盖完整
- 9 条赚钱路径，确定性打分
- 同职业不同技能的报告 Top 1 路径必不同
- 每份报告覆盖 ≥4 个用户变量 + ≥50% 行有变量引用 + 每路径 why ≥2 变量

## 文件地图

```
examples/ai-career-money-navigator/
├── 01_briefs/project_brief.md                 # Gate 0
├── 02_research/research_report.md             # Gate 1
├── 02_research/competitor_map.md              # Gate 1
├── 03_strategy/opportunity_scorecard.md       # Gate 2
├── 03_strategy/selected_direction.md          # Gate 2
├── 04_product/prd.md                          # Gate 3
├── 04_product/user_flow.md                    # Gate 3
├── 04_product/page_structure.md               # Gate 3
├── app/                                       # Gate 4
│   ├── index.html
│   ├── style.css
│   ├── rules-careers.js
│   ├── rules-pathways.js
│   ├── engine.js
│   ├── app.js
│   └── README.md
├── 06_test/test_engine.js                     # Gate 5
├── 06_test/test_report.md                     # Gate 5
├── 06_test/bug_list.md                        # Gate 5
├── 07_growth/launch_plan.md                   # Gate 6
├── 07_growth/content_plan.md                  # Gate 6
├── 07_growth/seo_keywords.md                  # Gate 6
├── 08_review/round_1_self_critique.md         # Round 1 自评
├── 08_review/project_review.md                # Gate 7
└── 08_review/next_iteration.md                # v0.2 规划
```

## 下一步

见 [[next_iteration]]。v0.2 启动门槛 = v0.1 上线 ≥4 周 + ≥100 次真实使用。

## 核心结晶

> 把"主观的质量感"变成"客户端机器可断言的规则"。  
> 这是 AI 时代做个人工具的最大杠杆。

## 相关

- [[AI Venture OS]] · 系统层
- [[reusable_prompt]] · 可复用给下个项目
- [[knowledge_card]] · 核心洞察卡
