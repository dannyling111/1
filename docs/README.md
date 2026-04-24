# docs/ — GitHub Pages 发布目录

本目录是 `examples/ai-career-money-navigator/app/` 的复制，用于 GitHub Pages 直接发布。

**真实开发位置**：`/examples/ai-career-money-navigator/app/`

修改请在那边改，再重新同步到本目录。或者把 Pages 改用 build 流水线自动同步（v0.2 再说）。

---

## 启用 Pages

仓库 → **Settings → Pages**：

- Source: `Deploy from a branch`
- Branch: `main`（或默认分支）
- Folder: `/docs`
- Save

1–2 分钟后会拿到 URL：`https://dannyling111.github.io/1/`

---

## 同步方式（目前是手工）

```bash
cp examples/ai-career-money-navigator/app/{index.html,style.css,app.js,engine.js,rules-careers.js,rules-pathways.js} docs/
```
