# Round 1 Self-Critique · Gate 0–3 审阅

**日期**：2026-04-24
**审阅对象**：`examples/ai-career-money-navigator/` 的 Gate 0–3 全部文档
**审阅者**：Claude（系统自审）
**目的**：在进入 Gate 4 写代码前，发现并修正前三阶段的真实漏洞。不是盖章仪式。

---

## 发现的 7 个真实问题

### P1 · 评分表有"倾向性 inflation"

**问题**：`opportunity_scorecard.md` 里给 O1 打出 8.57 分，其中 "MVP 速度 10"、"个人匹配 10"、"差异化 8" 略有自我合理化嫌疑。尤其"差异化 8" —— 市面上 "Will AI Replace Me" 类小站虽然浅，但不能完全当作不存在。

**修正**：把差异化从 8 降到 7。新平均 **8.43**，仍然过 8 分门槛，但更诚实。同时 O3（定制报告）的"差异化 8" 也过乐观，调为 7，平均降至 7.29（仍 7.0+ 可小测）。

### P2 · 声称"无直接竞品"但没实际搜索

**问题**：`competitor_map.md` 写"截至目前未发现明确直接竞品"，然而我没有联网实测，只凭训练数据记忆。这是把 `[需核实]` 伪装成结论。

**修正**：改为"训练数据内未发现代表性直接竞品，但未做 2025–2026 年实时搜索核实 `[需核实]`"。Gate 6（发布前）必须做关键词搜索：`"AI career diagnosis"`、`"AI 职业转型 诊断"`、`"will AI replace my job test"`，并把结果回写本文件。

### P3 · 规则引擎算法模糊

**问题**：PRD §5.3 说 "+10~-20 分修正"，但没说基准分是多少，加减规则也没列清。工程师看了没法直接实现。

**修正**：本文件 §附录 A 给出**确定性打分公式**，PRD 同步更新。

### P4 · "输出不像套话"是约束，但没测试方法

**问题**：PRD §5.4 提出"每段建议必须引用 ≥2 个用户输入字段的值"，但没给出机器检查方法。Gate 5 QA 会变成主观判断。

**修正**：在 Gate 4 代码里加一个 `assertNotBoilerplate(report, userInput)` 函数，Gate 5 测试脚本自动验证该约束。本文件 §附录 B 定义检查算法。

### P5 · 职业列表和兜底规则自相矛盾

**问题**：
- `research_report.md` §重要风险 4 担心"只覆盖 3–5 个职业不够"
- PRD 写 15 个职业 + "其他"兜底
- 但 PRD 没定义"其他"走什么规则 —— 兜底等于失败

**修正**：
- 维持 15 职业初始库
- "其他" 职业**不要求填职业名称**，而是根据用户勾选的**核心技能**动态合成一个"technical skill-based profile"：代码 + 写作 → `indie_maker`，设计 + 写作 → `content_designer`，等等
- 在本文件 §附录 C 列出技能组合 → 合成画像的映射表（9 个），PRD 同步更新

### P6 · 付费意愿假设偏乐观

**问题**：`research_report.md` 3.2 的付费价格带（¥29–¥99 低价包、¥999+ 定制）全部 `[需核实]`，但 Gate 2 评分时"付费意愿 6"可能把未核实的价格乐观化了。

**修正**：明确"v0.1 不做商业化"，评分表中的"付费"维度在 v0.1 阶段**不作为决策依据**，仅供 v0.2+ 路线参考。修改 `selected_direction.md` 加一条说明。

### P7 · 成功标准可测但不可自动化

**问题**：Brief §6 的 5 个成功指标全部依赖"5–10 人用户测试访谈"。这对个人开发者门槛过高（招募难、耗时），会导致 Gate 5 拖延或造假。

**修正**：把 5 个指标拆成两档：
- **冷启动档**（可自测）：埋点计算完成率、复制率、页面停留时间 —— 不需要访谈
- **热启动档**（≥20 真实用户时再用）：理解度、有用性、分享意愿 —— 保留访谈

Brief 会被更新。

---

## 附录 A · 规则引擎打分公式（用于 Gate 4）

```
用户输入 → 匹配分
──────────────────────────────────────

输入：career, skills[], hours, income_goal, risk, content, code, consult, product

STEP 1: 替代风险基础分 ai_risk_base (0–100)
    - 从 careers 表读取 career.ai_risk_base
    - 技能加减修正：
        + 技能包含 "研究" / "咨询"：-5（降低替代风险）
        + 技能包含 "代码"：-10
        + 技能包含 "销售" / "运营"（纯执行）：+5
    - code=Yes：-5（能自己改造工作流）
    - 限制到 [0, 100]

STEP 2: 9 条路径分别打匹配分 (0–100)
    每条路径 pathway 定义 `requires` 和 `boosts`：
    - requires：硬条件，不满足则路径分 = 0（直接被过滤）
    - boosts：软加成，每命中 +10–20

    例：P1 (做内容)
        requires: content=Yes
        boosts:
            hours >= 15h/周: +15
            risk ∈ {平衡, 激进}: +10
            income_goal >= ¥20-50k: +5
            技能包含 "写作" 或 "视觉": +15
            技能包含 "研究": +10

    基础分 50，最高 100。

STEP 3: 取路径分 Top 3，作为报告§3 输出
STEP 4: 针对 Top 1 路径展开 7/30/90 天行动计划
    - 行动计划模板里带 {{career}}, {{skill_1}}, {{hours}}, {{income_goal}} 占位符
    - 渲染时必须注入至少 2 个用户输入
```

**确定性保证**：同样的输入必须产出完全相同的报告。种子测试用例见 Gate 5。

---

## 附录 B · 非套话自动检查算法

```js
function assertNotBoilerplate(report, userInput) {
    const requiredRefs = 2;  // 每段至少引用 2 个用户输入
    const sections = [report.pathways, report.plan_7d, report.plan_30d, report.plan_90d];
    const vars = [
        userInput.career,
        ...userInput.skills,
        userInput.hours,
        userInput.income_goal,
        userInput.risk
    ].map(v => String(v).toLowerCase());

    for (const section of sections) {
        for (const item of section) {
            const text = item.toLowerCase();
            const hits = vars.filter(v => v && text.includes(v)).length;
            if (hits < requiredRefs) {
                throw new Error(`Boilerplate detected: "${item}" hits ${hits} vars`);
            }
        }
    }
    return true;
}
```

**触发时机**：每次生成报告后自动 assert。失败则拒绝渲染，提示工程师改模板。

---

## 附录 C · "其他"职业 → 合成画像映射

| 技能组合（命中 ≥2 项） | 合成画像 ID | 说明 |
|---|---|---|
| 代码 + 写作 | `indie_maker` | 独立开发者 |
| 代码 + 设计 | `designer_dev` | 设计型开发者 |
| 写作 + 设计 | `content_designer` | 内容设计 |
| 写作 + 营销 | `content_marketer` | 内容营销 |
| 咨询 + 研究 | `analyst_consultant` | 分析型咨询 |
| 销售 + 营销 | `growth_operator` | 增长运营 |
| 设计 + 产品 | `product_designer` | 产品设计 |
| 数据 + 研究 | `data_analyst` | 数据分析 |
| 其他 | `generalist` | 泛通用兜底 |

`generalist` 兜底规则：`ai_risk_base = 50`（中位），`typical_pathways = [P1, P2, P9]`（内容、自由职业、在职副业）。

---

## 审阅结论

- 7 个真实问题已识别，全部给出可执行修正。
- 修正全部集中在 PRD 和 rules 定义层，**不需要重做 Gate 0–2**。
- 本次审阅产出的 3 个附录（A/B/C）直接喂给 Gate 4 作为实现规格。

**判决**：Gate 0–3 不需要重开门。PRD 文件将被原地修订（加补丁章节 §5.5–5.7）。Gate 4 基于修订版 PRD 开工。
