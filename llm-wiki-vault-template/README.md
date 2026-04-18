# LLM Wiki Vault 模板

这个文件夹可以直接作为 **Obsidian 独立 Vault** 使用，也可以被 **Claude Code** 直接打开进行 ingest / query / lint 工作流。

## 目录结构

```text
llm-wiki-vault-template/
├── CLAUDE.md
├── README.md
├── index.md
├── log.md
├── raw/
│   ├── articles/
│   ├── papers/
│   ├── meetings/
│   └── images/
├── wiki/
└── queries/
```

## 推荐使用方式（最稳妥）

1. 复制这个模板文件夹，重命名为你的项目名（例如 `my-ai-wiki`）。
2. 在 Obsidian 中 `Open folder as vault` 打开该文件夹（建议独立 Vault，不要放进个人笔记 Vault）。
3. 在 Claude Code 中打开同一目录，并按 `CLAUDE.md` 的规则执行。
4. 首次导入命令示例：`process all files in raw/`。
5. 导入后让 agent 自动更新 `wiki/`、`index.md`、`log.md`。

## GitHub 与版本控制建议

- 不需要 fork Karpathy 的 gist。
- 应该把你自己的 Wiki 文件夹初始化为独立仓库：

```bash
git init
git add .
git commit -m "init: llm wiki vault"
git branch -M main
git remote add origin <your-private-repo-url>
git push -u origin main
```

## 文件约定

- `raw/`：原始资料输入区（网页、会议纪要、论文、图片）。
- `wiki/`：结构化知识页面输出区（由 LLM 维护）。
- `index.md`：主题导航总入口。
- `log.md`：每次 ingest / lint / query 的执行记录。
- `queries/`：保存可复用的查询模板与输出归档。
