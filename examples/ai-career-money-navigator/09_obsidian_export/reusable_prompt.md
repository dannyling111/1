---
tags: [ai-venture-os, reusable-prompt, v0.1, career-tool]
type: reusable-prompt
---

# 可复用 Prompt · 职业诊断类单页工具启动指令

## 适用场景

当你想把一个"垂直人群痛点"做成规则化诊断单页工具时，直接用这条母指令。

---

## 母指令（给 Claude Code）

> 按 CLAUDE.md 规则和 `examples/ai-career-money-navigator/` 的结构，启动一个新的诊断类单页工具项目。
>
> **项目主题**：<在这里写一句话痛点，例如"独立开发者该做什么产品最可能赚到第一块钱">
>
> **目标用户**：<主画像，例如"会用 Claude Code 的独立开发者，月收入目标 ¥5k–¥20k 副业">
>
> **必须遵守**：
> 1. 阶段门顺序推进：Gate 0 → Gate 7，每个 Gate 必须产出文件
> 2. Gate 2 必须用 7 维评分选出唯一 MVP
> 3. Gate 3 PRD 必须定义 "机器可测的非套话" 规则
> 4. Gate 4 技术栈锁死：原生 HTML + 原生 JS + 原生 CSS，零依赖
> 5. Gate 5 必须写 Node.js 测试脚本，自动断言 ≥50 项
> 6. 每完成一轮推进，写一份 `round_N_self_critique.md` 找漏洞
> 7. 禁止：登录 / 数据库 / LLM API / 付费墙（v0.1）
>
> **复用资源**：
> - `engine.js` 里的 `assertNotBoilerplate` 思路
> - `rules-pathways.js` 的"硬 requires + 软 boosts + 模板"结构
> - `test_engine.js` 的 T1–T9 测试套件模板
>
> **输出**：
> - 新建 `examples/<project-slug>/` 子目录
> - 按 AI Venture OS 目录约定推进
> - 每次回复末尾附"当前 Gate / 完成文件 / 核心结论 / 下一步 / 风险"

---

## 变体：其他方向

- "为 {职业}（例：律师、护士、教师）量身做的 AI 转型诊断" → 把 `ai-career-money-navigator` fork 一份，改职业库和路径库
- "给 {人群}（例：留学生、应届生、转行者）做的 {决策}（例：选专业、谈薪水）" → 同样 fork，改输入字段和输出模板
- "给 {创业者} 的 {任务}（例：评估产品、选第一个功能）规则化诊断" → 同样

核心 insight：**同一个"诊断 → 路径 → 行动"三层结构可以套任何单次决策类场景**。

---

## 使用注意

- 不要改变"规则化输出"这个原则，即使很想接 LLM
- 不要扩展到"多页 + 登录"，即使用户这么要求
- 每次 fork 必须重做 Gate 1 市场研究，不要跨项目复用研究结论
