# AI Venture OS

一个把"想法"自动推进到"MVP 网页上线"的可复用项目执行系统。

---

## 这是什么

不是聊天模板，不是提示词库，不是 Agent 秀。

**是一个"让 Claude Code 在 GitHub 上像一家小型咨询公司 + 产品公司一样工作"的文件仓库。**

你输入一个主题，系统按阶段推进：

```
想法 → Brief → 市场研究 → 机会评分 → PRD → 网页 MVP → 测试 → 发布 → 复盘 → Obsidian 知识资产
```

每一步都是文件。每个文件都有固定位置和通过条件。

---

## 三条核心原则

1. **GitHub 执行，Obsidian 沉淀。** 执行过程在 GitHub，沉淀出来的可复用知识进 Obsidian。
2. **阶段门不可跳过。** 没有 Brief 不做研究，没有 PRD 不写代码。见 [CLAUDE.md](./CLAUDE.md) §1。
3. **第一版只做单页网页。** 不做登录、数据库、支付。验证再谈扩展。

---

## 目录

```
00_inbox/            原始想法暂存（便签、语音转文字等）
01_briefs/           Gate 0 — 项目 Brief
02_research/         Gate 1 — 市场研究 + 竞品
03_strategy/         Gate 2 — 机会评分 + 方向选择
04_product/          Gate 3 — PRD + 用户流程 + 页面结构
05_build/            Gate 4 — 工程代码（MVP）
06_test/             Gate 5 — 测试报告 + Bug 列表
07_growth/           Gate 6 — 发布与传播
08_review/           Gate 7 — 项目复盘
09_obsidian_export/  Gate 7 — Obsidian 可沉淀文件
templates/           可复用模板（随项目沉淀，不预先塞满）
examples/            样板项目（每个项目一个子目录）
```

**多项目并行**：每个项目建一个 `examples/<project-name>/` 子目录，内部再按 `01_briefs ... 09_obsidian_export` 组织。顶层目录主要用于单项目起步。

---

## 怎么用

### 启动一个新项目

1. 把想法写进 `00_inbox/` 的一个 Markdown 文件（几行就够）。
2. 给 Claude Code 一条指令：
   > 按 CLAUDE.md 的规则，从 `00_inbox/<想法>.md` 启动新项目，先执行 Gate 0。
3. Claude 产出 `project_brief.md`，你审批。
4. 通过后继续 `Gate 1`；不通过就改。

### 每次回复的标准结尾

Claude Code 会在每次推进项目的回复末尾附上：

```
当前 Gate：Gx
完成文件：<列表>
核心结论：<一句话>
下一步：<一句话>
风险/缺口：<一句话>
```

这是"状态报告"，不是"聊天收尾"。

---

## 评分模型

所有机会对比统一用 7 维评分（0–10）：

| 维度 | 含义 |
|---|---|
| 痛点强度 | 用户是否真的痛 |
| 付费意愿 | 是否可能花钱 |
| 市场增长 | 趋势是否向上 |
| MVP 速度 | 能否快速做出网页原型 |
| 差异化 | 是否明显不同于已有方案 |
| 自动化适配度 | 是否适合 AI 生成/执行 |
| 个人资源匹配 | 适合 Claude Code + GitHub + 前端 |

总分分级、评分规则见 [CLAUDE.md](./CLAUDE.md) §7。

---

## 第一个样板项目

[`examples/ai-career-money-navigator/`](./examples/ai-career-money-navigator/)

主题："AI 时代，我的工作是 xxx，未来我该如何工作赚钱？"

这是用户提出的最初问题，也是验证整个系统能否跑通的第一个真实用例。

目前完成状态：**Gate 0–3 文档完成，Gate 4 代码未开始。**

---

## 本仓库其他内容

根目录下的 `streamlit_app.py`、`requirements.txt`、`llm-wiki-vault-template/` 是此前的遗留项目，与 AI Venture OS 无关，保留不动。
