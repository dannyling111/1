# app/ — AI 职业赚钱路径诊断器 v0.1

Gate 4 产出。纯前端单页，零依赖。

## 运行

**本地直接开**：双击 `index.html`，或：

```bash
# 任选：
open examples/ai-career-money-navigator/app/index.html   # macOS
xdg-open examples/ai-career-money-navigator/app/index.html  # Linux
```

**本地起一个 HTTP 服务器**（可选）：

```bash
cd examples/ai-career-money-navigator/app
python3 -m http.server 8000
# 打开 http://localhost:8000
```

## 部署到 GitHub Pages / Vercel / Cloudflare Pages

- GitHub Pages：把 `app/` 目录里的内容作为发布根。Settings → Pages → Source = Branch + `/examples/ai-career-money-navigator/app`，或者把这个目录复制到仓库根或 `/docs`。
- Vercel / Cloudflare Pages：一键导入 repo，Root Directory 设为 `examples/ai-career-money-navigator/app`，Build command 留空，Output dir 留空。

没有 build 步骤。静态文件直接发。

## 文件说明

| 文件 | 作用 |
|---|---|
| `index.html` | 页面结构 |
| `style.css` | 全部样式 |
| `rules-careers.js` | 15 标准职业 + 9 合成画像 |
| `rules-pathways.js` | 9 条赚钱路径 + 7/30/90 天模板 |
| `engine.js` | 规则引擎（打分、匹配、模板渲染、非套话 assert） |
| `app.js` | DOM 交互、表单、复制 Markdown、localStorage |

## 不做什么

- 不接任何 API，不调用 LLM
- 不收集用户数据（localStorage 只存上次输入，本地）
- 不登录、不付费、不用框架

## 修改常见场景

- 加新职业：在 `rules-careers.js` 里加 profile，在 `app.js` 的 `standard` 数组里加 id
- 加新路径：在 `rules-pathways.js` 里加 P10，定义 requires / boosts / 模板
- 改打分权重：编辑 `rules-pathways.js` 里各 `boosts` 的 score 值
- 改风险解读文案：编辑 `engine.js` 里 `riskBand`
