---
tags: [ai-venture-os, knowledge-card, insight]
type: knowledge-card
source: ai-career-money-navigator v0.1
date: 2026-04-24
---

# 知识卡 · 规则化诊断工具的最小正确姿势

## 核心洞察

> 在 AI 话题严重饱和的时代，**不接 LLM 的规则化单页工具**比"调用 ChatGPT 的华丽 demo"更容易赢得信任，因为用户能感知到"不是套话"。

## 三个最反直觉的发现

1. **"个性化"不等于"调用大模型"**
   只要每份输出引用 ≥4 个用户输入变量，用户就会觉得"是为我写的"。LLM 在这件事上对 v0.1 没有增量价值。

2. **"反套话"可以机器化**
   把主观的"感觉是套话"变成 `assertNotBoilerplate(report, input)` —— 一个 120 行的函数。这个函数上线后永远在跑，永远在保护质量。

3. **自评必须在代码里跑，不是在文档里想**
   Round 1 纯文档自评发现了 6 个问题（对）。Round 2 跑测试又发现了 6 个问题（全新，全是真 Bug）。**静态审阅和动态测试找到的不是同一类 Bug**。

## 三个可复用的结构

### 规则引擎的三层

```
规则数据 (rules-*.js)
    ↓
引擎 (engine.js: match + score + render + assert)
    ↓
DOM 层 (app.js: form + report + copy + storage)
```

数据和逻辑彻底分离，改职业只改数据，不改引擎。

### 评分模型的三要素

```
base (固定)
 + requires (硬条件，失败则 0)
 + boosts (软加成，命中则加)
 → clamp [0, 100]
```

### 阶段门的五格状态

```
当前 Gate：Gx
完成文件：<列表>
核心结论：<一句话>
下一步：<一句话>
风险/缺口：<一句话>
```

## 反面教材

v0.1 早期的 `hours_gte_15` 条件 match 代码：

```js
if (cond.startsWith('hours_gte_')) {
  return hoursGte(input.hours, cond.replace('hours_gte_', ''));
}
```

看起来对，其实 `hours_gte_15` 会调用 `hoursGte(input.hours, "15")`，但 `HOURS_ORDER` 里没有 "15"（只有 "5-15", "15-30"）。**跑测试前永远发现不了**。

教训：**每一个字符串 parsing 都必须对应一个测试用例**。

## 可迁移到别的项目

- 任何需要"输入 → 个性化输出"的工具
- 任何需要"机器保证质量下限"的生成器
- 任何需要"低成本快速验证形态"的 MVP

## 不可迁移的

- 开放式对话场景（LLM 仍是王）
- 需要实时数据的场景（纯前端搞不定）
- 强 UGC 社区（本模式是单次工具，非社交）

## 链接

- [[project_summary]]
- [[reusable_prompt]]
- [[AI Venture OS]]
