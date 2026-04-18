# LLM Wiki 运行规范（Schema）

## 1) Project Goal
本项目是一个由 LLM 维护的 Markdown 知识库。
目标：把 `raw/` 中的原始资料转换为 `wiki/` 中可复用、可导航、可校验的知识页面。

## 2) File Layout Contract
- `raw/articles/`: 网页、博客、新闻等文本来源
- `raw/papers/`: 论文、PDF 摘录
- `raw/meetings/`: 会议纪要、转录稿
- `raw/images/`: 图片、图表截图
- `wiki/`: 结构化知识页（主题页、概念页、人物页）
- `index.md`: 全局导航入口（主题树 + 关键页面）
- `log.md`: 每次处理记录（时间、输入、输出、问题）
- `queries/`: 预设查询与答案归档

## 3) Ingest Operation
当收到 ingest 请求时：
1. 扫描 `raw/` 下新增或未处理的内容。
2. 为每份内容提取：核心观点、关键事实、术语、行动建议、来源信息。
3. 写入/更新 `wiki/` 下对应页面，优先复用已有页面，避免重复新建。
4. 在页面间补齐 WikiLinks（双向可导航）。
5. 更新 `index.md`（新增主题节点、更新入口链接）。
6. 在 `log.md` 追加本次处理记录。

## 4) Query Operation
当收到 query 请求时：
1. 先读 `index.md` 定位最相关主题。
2. 再读取 `wiki/` 相关页面并交叉核对。
3. 输出时区分：确定事实 / 推断结论 / 待确认项。
4. 如有必要，把查询结果归档到 `queries/`。

## 5) Lint Operation
当收到 lint 请求时：
1. 检查互相矛盾的断言。
2. 检查孤立页面（无入链或无出链）。
3. 检查过时内容（时间敏感信息）。
4. 提出修复建议并在必要时自动修复。
5. 将 lint 结果写入 `log.md`。

## 6) Writing Rules
- 语言默认中文，可保留英文术语。
- 先结论后细节；每页结构尽量统一。
- 不编造来源；不确定信息要标注“待确认”。
- 每页建议包含：摘要、要点、来源、关联页面。

## 7) Git Workflow (Recommended)
每次 ingest/lint 完成后建议执行：
- `git add .`
- `git commit -m "ingest: <topic>"` 或 `"lint: <scope>"`
- `git push`
