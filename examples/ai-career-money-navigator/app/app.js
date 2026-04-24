// app.js — DOM 交互层（表单 / 校验 / 渲染报告 / 复制 Markdown / localStorage）
(function () {
  'use strict';

  const STORAGE_KEY = 'acmn_v01_input';
  const SKILL_LIST = [
    '写作', '视觉', '代码', '数据', '营销', '咨询',
    '运营', '设计', '产品', '研究', '销售', '内容'
  ];
  const MAX_SKILLS = 3;

  const state = {
    career: '',
    skills: [],
    hours: '',
    income: '',
    risk: '',
    content: '',
    code: '',
    consult: '',
    product: ''
  };

  // ---- 初始化职业下拉 ----
  function initCareerSelect() {
    const sel = document.getElementById('career-select');
    const standard = [
      'programmer', 'pm', 'designer', 'ops', 'marketing', 'sales',
      'creator', 'video', 'writer', 'consultant', 'finance',
      'legal', 'teacher', 'researcher'
    ];
    standard.forEach(id => {
      const opt = document.createElement('option');
      opt.value = id;
      opt.textContent = window.CAREERS[id].name;
      sel.appendChild(opt);
    });
    const other = document.createElement('option');
    other.value = 'other';
    other.textContent = '其他（按技能自动匹配）';
    sel.appendChild(other);

    sel.addEventListener('change', e => {
      state.career = e.target.value;
      clearError('career');
      persist();
    });
  }

  // ---- 初始化技能 tags ----
  function initSkillTags() {
    const wrap = document.getElementById('skill-tags');
    SKILL_LIST.forEach(skill => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.textContent = skill;
      btn.dataset.value = skill;
      btn.setAttribute('aria-pressed', 'false');
      btn.addEventListener('click', () => toggleSkill(btn, skill));
      wrap.appendChild(btn);
    });
  }
  function toggleSkill(btn, skill) {
    const idx = state.skills.indexOf(skill);
    if (idx >= 0) {
      state.skills.splice(idx, 1);
      btn.setAttribute('aria-pressed', 'false');
    } else {
      if (state.skills.length >= MAX_SKILLS) return;
      state.skills.push(skill);
      btn.setAttribute('aria-pressed', 'true');
    }
    refreshSkillDisabled();
    clearError('skills');
    persist();
  }
  function refreshSkillDisabled() {
    const btns = document.querySelectorAll('#skill-tags button');
    const atMax = state.skills.length >= MAX_SKILLS;
    btns.forEach(b => {
      const pressed = b.getAttribute('aria-pressed') === 'true';
      b.disabled = atMax && !pressed;
    });
  }

  // ---- 通用 choice-group ----
  function initChoiceGroups() {
    const groups = document.querySelectorAll('.choice-group[data-group]');
    groups.forEach(group => {
      const key = group.dataset.group;
      group.querySelectorAll('button').forEach(btn => {
        btn.addEventListener('click', () => {
          group.querySelectorAll('button').forEach(b => b.setAttribute('aria-pressed', 'false'));
          btn.setAttribute('aria-pressed', 'true');
          state[key] = btn.dataset.value;
          clearError(key);
          persist();
        });
      });
    });
  }

  // ---- 校验 ----
  const REQUIRED = ['career', 'hours', 'income', 'risk', 'content', 'code', 'consult', 'product'];
  function validate() {
    let ok = true;
    REQUIRED.forEach(k => {
      if (!state[k]) {
        setError(k, '需要选择');
        ok = false;
      }
    });
    if (state.skills.length === 0) {
      setError('skills', '至少选 1 项');
      ok = false;
    }
    if (!ok) {
      const firstErr = document.querySelector('.error-text:not(:empty)');
      if (firstErr) firstErr.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
    return ok;
  }
  function setError(key, msg) {
    const el = document.querySelector('[data-error-for="' + key + '"]');
    if (el) el.textContent = msg;
  }
  function clearError(key) {
    setError(key, '');
  }

  // ---- 持久化 ----
  function persist() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch (e) { /* ignore */ }
  }
  function restore() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return;
      const data = JSON.parse(raw);
      Object.keys(state).forEach(k => {
        if (data[k] !== undefined) state[k] = data[k];
      });
      applyRestoredState();
    } catch (e) { /* ignore */ }
  }
  function applyRestoredState() {
    if (state.career) document.getElementById('career-select').value = state.career;
    state.skills.forEach(s => {
      const btn = document.querySelector('#skill-tags button[data-value="' + s + '"]');
      if (btn) btn.setAttribute('aria-pressed', 'true');
    });
    refreshSkillDisabled();
    ['hours', 'income', 'risk', 'content', 'code', 'consult', 'product'].forEach(key => {
      if (state[key]) {
        const btn = document.querySelector('.choice-group[data-group="' + key + '"] button[data-value="' + state[key] + '"]');
        if (btn) btn.setAttribute('aria-pressed', 'true');
      }
    });
  }

  // ---- 生成 & 渲染 ----
  function handleSubmit(e) {
    e.preventDefault();
    if (!validate()) return;
    let report;
    try {
      report = window.CareerEngine.generateReport(state);
    } catch (err) {
      alert('生成失败：' + err.message + '\n\n开发者请查看 engine.js 的 assertNotBoilerplate。');
      return;
    }
    renderReport(report);
    currentReport = { report: report, input: JSON.parse(JSON.stringify(state)) };
    const reportEl = document.getElementById('report');
    reportEl.classList.add('visible');
    reportEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  let currentReport = null;

  function renderReport(report) {
    const body = document.getElementById('report-body');
    body.innerHTML = '';

    const meta = document.createElement('p');
    meta.className = 'meta';
    const skillsStr = state.skills.join(' / ');
    meta.textContent = '画像：' + report.profile_name
      + ' ｜ 技能：' + skillsStr
      + ' ｜ 时间：' + hoursLabel(state.hours)
      + ' ｜ 目标：' + incomeLabel(state.income)
      + ' ｜ 风险：' + riskLabel(state.risk);
    body.appendChild(meta);

    // §1 风险
    body.appendChild(h3('1. AI 替代风险' + scoreBadge(report.risk_score, report.risk_label)));
    body.appendChild(p(report.risk_text));

    // §2 增强机会
    body.appendChild(h3('2. AI 增强机会'));
    body.appendChild(ul(report.augment));

    // §3 路径
    body.appendChild(h3('3. 最适合你的 3 条赚钱路径'));
    report.pathways.forEach((pth, i) => {
      const div = document.createElement('div');
      div.className = 'pathway';
      const title = document.createElement('h4');
      const pill = document.createElement('span');
      pill.className = 'score-pill';
      pill.textContent = '匹配 ' + pth.score;
      title.textContent = (i + 1) + '. ' + pth.name + ' ';
      title.appendChild(pill);
      div.appendChild(title);
      div.appendChild(p(pth.one_liner));
      const why = document.createElement('p');
      why.className = 'why';
      why.textContent = '为什么是你：' + pth.why;
      div.appendChild(why);
      body.appendChild(div);
    });

    // §4/5/6 plans
    body.appendChild(h3('4. 7 天行动计划'));
    body.appendChild(ol(report.plan_7));
    body.appendChild(h3('5. 30 天行动计划'));
    body.appendChild(ol(report.plan_30));
    body.appendChild(h3('6. 90 天行动计划'));
    body.appendChild(ol(report.plan_90));

    // §7 工具
    body.appendChild(h3('7. 推荐工具栈'));
    body.appendChild(ul(report.tools));

    // §8 明天做的事
    body.appendChild(h3('8. 明天就能做的 3 件事'));
    body.appendChild(ol(report.next3));
  }

  // ---- DOM 小工具 ----
  function h3(text) {
    const el = document.createElement('h3');
    el.textContent = text;
    return el;
  }
  function p(text) {
    const el = document.createElement('p');
    el.textContent = text;
    return el;
  }
  function ul(items) {
    const el = document.createElement('ul');
    items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = it;
      el.appendChild(li);
    });
    return el;
  }
  function ol(items) {
    const el = document.createElement('ol');
    items.forEach(it => {
      const li = document.createElement('li');
      li.textContent = it;
      el.appendChild(li);
    });
    return el;
  }
  function scoreBadge(score, label) {
    return ' · ' + score + ' / 100（' + label + '）';
  }
  function hoursLabel(v) {
    return ({ '<5': '<5h/周', '5-15': '5–15h/周', '15-30': '15–30h/周', '30+': '30h+/周' })[v] || v;
  }
  function incomeLabel(v) {
    return ({ '<5k': '<¥5k', '5-20k': '¥5–20k', '20-50k': '¥20–50k', '50k+': '¥50k+' })[v] || v;
  }
  function riskLabel(v) {
    return ({ conservative: '保守', balanced: '平衡', aggressive: '激进' })[v] || v;
  }

  // ---- 复制 Markdown ----
  async function handleCopy() {
    if (!currentReport) return;
    const md = window.CareerEngine.toMarkdown(currentReport.report, currentReport.input);
    const btn = document.getElementById('copy-btn');
    try {
      await navigator.clipboard.writeText(md);
      btn.textContent = '已复制 ✓';
      btn.classList.add('copied');
      setTimeout(() => {
        btn.textContent = '复制 Markdown';
        btn.classList.remove('copied');
      }, 1800);
    } catch (e) {
      fallbackCopy(md);
    }
  }
  function fallbackCopy(md) {
    const ta = document.createElement('textarea');
    ta.value = md;
    ta.style.position = 'fixed';
    ta.style.top = '10%';
    ta.style.left = '5%';
    ta.style.width = '90%';
    ta.style.height = '60%';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    alert('自动复制失败，请在弹出的文本框里手动全选复制。关闭后框会消失。');
    setTimeout(() => ta.remove(), 100);
  }

  // ---- 启动 ----
  document.addEventListener('DOMContentLoaded', function () {
    initCareerSelect();
    initSkillTags();
    initChoiceGroups();
    restore();
    document.getElementById('diag-form').addEventListener('submit', handleSubmit);
    document.getElementById('copy-btn').addEventListener('click', handleCopy);
  });
})();
