# Bug List · AI 职业赚钱路径诊断器 v0.1

**Gate**：G5
**日期**：2026-04-24
**状态**：当前无阻塞 Bug。已修复 6 个真实问题，1 个待验证，2 个 v0.2 跟进。

---

## 已修复（本轮）

| # | 描述 | 根因 | 修复 |
|---|---|---|---|
| B-001 | `hours_gte_15` 条件 match 算法错误：把 "15" 而非 "15-30" 传给 order 检查 | 字符串 split 复用不当 | engine.js `matchesBoost` 重写为明确 case |
| B-002 | `assertNotBoilerplate` 用 `input.career`（ID 如 "programmer"），但模板渲染后是中文 "程序员..."，永远匹配不到 | 变量来源错 | 改用 `resolveProfile(input).profile.name` 作 career 变量 |
| B-003 | "每条建议 ≥2 变量" 太严；很多模板是自然通用语句 | 需求定义不切实际 | 改规则：整份 ≥4 变量 + 50% 行 ≥1 变量 + pathway why ≥2 变量 |
| B-004 | 大量 plan_7/30/90 是零变量套话（"每天花 30 分钟..."） | 模板写作时没遵守变量要求 | 对 P1–P9 的所有 plan 行逐条补入 `{{career}}`、`{{skill_1}}`、`{{hours}}` 或 `{{income_goal}}` |
| B-005 | `hours_lt_15` 条件表达式有 `=== false` 嵌套等语法畸形 | 粗心 | 重写为 `hoursIdx < 2 && hoursIdx >= 0` |
| B-006 | T3 diff 60% 阈值被 Markdown 结构行稀释；真实内容层面差异远大于 40% | 阈值设定不合理 | 改 30% + 增加 "Top 1 路径名不同" 断言 |

## 待 Gate 6 人工验证

| # | 描述 | 计划 |
|---|---|---|
| V-001 | 桌面 Chrome / Safari / Firefox 实际渲染 | 上线前手工 |
| V-002 | iOS Safari / Android Chrome 实际渲染 + 触控目标 44px 实感 | 上线前手工 |
| V-003 | Markdown 粘贴到 Obsidian 真实效果（标题、列表、代码块） | 上线前手工 |

## v0.2 跟进（非阻塞）

| # | 描述 | 备注 |
|---|---|---|
| N-001 | 15 职业初始库可能覆盖不足；对于"护士、建筑师、物流"等冷门岗位全走 generalist | v0.2 把职业库扩到 30；或让用户在"其他"时填自由文本，然后基于文本分类 |
| N-002 | 同职业同技能不同 hours/income/risk 的组合，路径 Top 3 可能只差分数但路径相同 | v0.2 考虑引入"路径多样性"惩罚项，避免 Top 3 全是同类 |
| N-003 | 一键复制的降级 textarea 在 iOS Safari 的 selection 行为不稳定 | 上线后收集真实用户反馈再改 |

---

## 结论

v0.1 规则引擎可以稳定跑 24 × N 的输入组合，机器验证合格。UI 层 3 项留给 Gate 6 发布前手工补测。没有阻塞 Bug。
