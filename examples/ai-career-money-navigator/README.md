# AI 职业赚钱路径诊断器

**项目代号**：`ai-career-money-navigator`
**原始问题**：AI 时代，我的工作是 xxx，未来我该如何工作赚钱？
**当前阶段**：Gate 3 完成（产品定义），Gate 4（工程）未开始。

---

## 项目概述

用户输入自己的职业、技能、每周可投入时间、目标收入、风险偏好，系统生成：
- AI 对该职业的替代 / 增强风险评估
- 3 条最适合的赚钱路径
- 7 / 30 / 90 天行动计划
- 推荐工具栈
- 一键复制为 Markdown 的完整报告

**v0.1 只做纯前端单页网页**。不登录、不接库、不付费。

---

## 文件索引

| Gate | 文件 | 状态 |
|---|---|---|
| G0 | [`01_briefs/project_brief.md`](./01_briefs/project_brief.md) | ✅ |
| G1 | [`02_research/research_report.md`](./02_research/research_report.md) | ✅ |
| G1 | [`02_research/competitor_map.md`](./02_research/competitor_map.md) | ✅ |
| G2 | [`03_strategy/opportunity_scorecard.md`](./03_strategy/opportunity_scorecard.md) | ✅ |
| G2 | [`03_strategy/selected_direction.md`](./03_strategy/selected_direction.md) | ✅ |
| G3 | [`04_product/prd.md`](./04_product/prd.md) | ✅ |
| G3 | [`04_product/user_flow.md`](./04_product/user_flow.md) | ✅ |
| G3 | [`04_product/page_structure.md`](./04_product/page_structure.md) | ✅ |
| G4 | `app/` | ⏳ 未开始 |

---

## 主要假设（需用户确认）

- 目标用户 xxx 被假设为"想用 AI + 内容 + 网页产品赚钱的个人创作者 / 独立开发者 / 研究型创业者"。原始输入里 xxx 未填写，这是基于对话上下文的推断。
- 技术栈假设：纯 HTML + JS + CSS，不用框架；后续可升级 Next.js 部署到 Vercel / Cloudflare Pages。
- 价格和市场规模数据来自公开行业报告，以 `[需核实]` 标签标出。
