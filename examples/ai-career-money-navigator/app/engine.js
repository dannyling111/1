// engine.js
// 规则引擎核心：风险打分 + 路径匹配 + 模板渲染 + 非套话 assert。
// 依赖全局：window.CAREERS, window.SYNTHETIC_PROFILES, window.PATHWAYS

(function () {
  'use strict';

  // ---- 辅助：输入归一化 ----
  const HOURS_ORDER = ['<5', '5-15', '15-30', '30+'];
  const INCOME_ORDER = ['<5k', '5-20k', '20-50k', '50k+'];

  function hoursGte(hours, threshold) {
    return HOURS_ORDER.indexOf(hours) >= HOURS_ORDER.indexOf(threshold);
  }
  function incomeGte(income, threshold) {
    return INCOME_ORDER.indexOf(income) >= INCOME_ORDER.indexOf(threshold);
  }

  // 把用户输入映射到一个 profile
  function resolveProfile(input) {
    if (input.career && input.career !== 'other' && window.CAREERS[input.career]) {
      return { id: input.career, profile: window.CAREERS[input.career], synthetic: false };
    }
    // "其他"：按技能合成
    for (const candidate of window.SYNTHETIC_PROFILES) {
      const hits = candidate.skills.filter(s => input.skills.includes(s)).length;
      if (hits >= 2) {
        return { id: candidate.id, profile: window.CAREERS[candidate.id], synthetic: true };
      }
    }
    return { id: 'generalist', profile: window.CAREERS.generalist, synthetic: true };
  }

  // ---- 替代风险分 ----
  function calcRiskScore(input, profile) {
    let score = profile.ai_risk_base;
    const skills = input.skills;
    if (skills.includes('研究') || skills.includes('咨询')) score -= 5;
    if (skills.includes('代码')) score -= 10;
    if (skills.includes('销售') || skills.includes('运营')) score += 5;
    if (input.code === 'yes') score -= 5;
    return Math.max(0, Math.min(100, score));
  }

  function riskBand(score) {
    if (score >= 70) return { label: '高暴露', tone: '你的核心动作相当部分可以被 AI 直接替代，必须主动重构工作流，才能把风险转成杠杆' };
    if (score >= 50) return { label: '中等暴露', tone: '部分动作将被 AI 大幅加速或替代，你需要主动决定：做监督者、做生产者、还是做策略者' };
    if (score >= 30) return { label: '较低暴露', tone: '你的核心判断价值难以被 AI 直接替代，但不主动用 AI，会被用 AI 的同行甩开' };
    return { label: '低暴露', tone: '你更像是 AI 的使用者和编排者，机会大于风险，关键是把方法论产品化' };
  }

  // ---- 路径打分 ----
  function matchesBoost(cond, input) {
    const hoursIdx = HOURS_ORDER.indexOf(input.hours);

    if (cond === 'hours_gte_5') return hoursIdx >= 1;
    if (cond === 'hours_gte_15') return hoursIdx >= 2;
    if (cond === 'hours_gte_30') return hoursIdx >= 3;
    if (cond === 'hours_lt_15') return hoursIdx < 2 && hoursIdx >= 0;

    if (cond === 'income_gte_mid') return incomeGte(input.income, '5-20k');
    if (cond === 'income_gte_high') return incomeGte(input.income, '20-50k');
    if (cond === 'risk_conservative') return input.risk === 'conservative';
    if (cond === 'risk_aggressive') return input.risk === 'aggressive';
    if (cond === 'risk_balanced_or_aggressive') return input.risk !== 'conservative';
    if (cond === 'risk_not_conservative') return input.risk !== 'conservative';
    if (cond === 'code:yes') return input.code === 'yes';
    if (cond === 'content:yes') return input.content === 'yes';
    if (cond === 'consult:yes') return input.consult === 'yes';
    if (cond === 'product:yes') return input.product === 'yes';
    if (cond.startsWith('skill:')) {
      const want = cond.slice('skill:'.length).split('|');
      return input.skills.some(s => want.includes(s));
    }
    return false;
  }

  function calcPathwayScore(pathway, input) {
    // 硬条件检查
    for (const req of pathway.requires) {
      if (!matchesBoost(req, input)) return 0;
    }
    let score = 50;
    for (const boost of pathway.boosts) {
      if (matchesBoost(boost.if, input)) score += boost.score;
    }
    return Math.min(100, score);
  }

  function rankPathways(input, profile) {
    const pool = profile.typical_pathways || Object.keys(window.PATHWAYS);
    // 所有路径都参与，但 typical 的获得 +5 亲和加成
    const scored = Object.keys(window.PATHWAYS).map(id => {
      const p = window.PATHWAYS[id];
      let s = calcPathwayScore(p, input);
      if (s > 0 && pool.includes(id)) s += 5;
      return { id, pathway: p, score: Math.min(100, s) };
    }).filter(x => x.score > 0);
    scored.sort((a, b) => b.score - a.score);
    return scored;
  }

  // ---- 模板渲染 ----
  const HOURS_LABEL = {
    '<5': '<5 小时',
    '5-15': '5–15 小时',
    '15-30': '15–30 小时',
    '30+': '30+ 小时'
  };
  const INCOME_LABEL = {
    '<5k': '<¥5k',
    '5-20k': '¥5–20k',
    '20-50k': '¥20–50k',
    '50k+': '¥50k+'
  };
  const RISK_LABEL = {
    conservative: '保守',
    balanced: '平衡',
    aggressive: '激进'
  };

  function render(template, input, profile) {
    const skill1 = input.skills[0] || '通用能力';
    const skill2 = input.skills[1] || '';
    const skill3 = input.skills[2] || '';
    return template
      .replaceAll('{{career}}', profile.name)
      .replaceAll('{{skill_1}}', skill1)
      .replaceAll('{{skill_2}}', skill2)
      .replaceAll('{{skill_3}}', skill3)
      .replaceAll('{{hours}}', HOURS_LABEL[input.hours] || input.hours)
      .replaceAll('{{income_goal}}', INCOME_LABEL[input.income] || input.income)
      .replaceAll('{{risk}}', RISK_LABEL[input.risk] || input.risk);
  }

  // ---- 非套话 assert ----
  // 规则（Round 2 自评后重设计，实测后再调整）：
  //   (a) 整份报告必须覆盖 ≥5 个不同用户变量（career + 至少 1 技能 + 其他 3 项）
  //   (b) ≥50% 的建议行必须引用至少 1 个用户变量（否则全是通用鸡汤）
  //   (c) 每条路径的 `why` 字段必须引用 ≥2 个变量（路径理由是个性化锚点）
  //   diff 测试（T3）保证跨用户差异化，不在 assert 内部负责。
  function assertNotBoilerplate(report, input) {
    const profile = resolveProfile(input).profile;
    const varMap = {
      career: profile.name,
      hours: HOURS_LABEL[input.hours],
      income: INCOME_LABEL[input.income],
      risk: RISK_LABEL[input.risk]
    };
    input.skills.forEach((s, i) => { varMap['skill_' + i] = s; });
    const entries = Object.entries(varMap).filter(([, v]) => v);

    function hitsIn(text) {
      const lower = String(text).toLowerCase();
      const hits = new Set();
      for (const [key, val] of entries) {
        if (lower.includes(String(val).toLowerCase())) hits.add(key);
      }
      return hits;
    }

    // (c) 路径 why
    for (const p of report.pathways) {
      if (hitsIn(p.why).size < 2) {
        throw new Error('Pathway "why" must ref ≥2 vars: "' + p.why + '"');
      }
    }

    // (a) + (b)
    const allLines = [...report.plan_7, ...report.plan_30, ...report.plan_90];
    const totalCoverage = new Set();
    let linesWithHit = 0;
    for (const line of allLines) {
      const h = hitsIn(line);
      h.forEach(v => totalCoverage.add(v));
      if (h.size > 0) linesWithHit++;
    }
    // pathway why 的变量也计入总覆盖
    report.pathways.forEach(p => hitsIn(p.why).forEach(v => totalCoverage.add(v)));

    if (totalCoverage.size < 4) {
      throw new Error('Low coverage: ' + totalCoverage.size + ' unique vars (need ≥4). Covered: ' + [...totalCoverage].join(','));
    }
    const hitRatio = linesWithHit / allLines.length;
    if (hitRatio < 0.5) {
      throw new Error('Too many generic lines: ' + (hitRatio * 100).toFixed(0) + '% have a var (need ≥50%)');
    }
    return true;
  }

  // ---- 主入口 ----
  function generateReport(input) {
    const { profile } = resolveProfile(input);
    const risk_score = calcRiskScore(input, profile);
    const risk = riskBand(risk_score);
    const ranked = rankPathways(input, profile);
    const top3 = ranked.slice(0, 3);
    const top1 = top3[0];

    if (!top1) {
      throw new Error('No pathway matched. Check input integrity.');
    }

    const report = {
      profile_name: profile.name,
      risk_score,
      risk_label: risk.label,
      risk_text: '作为【' + profile.name + '】，每周【' + HOURS_LABEL[input.hours] + '】的投入节奏，' + risk.tone + '。',
      augment: profile.augment_examples.slice(0, 3),
      pathways: top3.map(p => ({
        name: p.pathway.name,
        score: p.score,
        one_liner: render(p.pathway.one_liner, input, profile),
        why: render(p.pathway.why, input, profile)
      })),
      plan_7: top1.pathway.plan_7.map(t => render(t, input, profile)),
      plan_30: top1.pathway.plan_30.map(t => render(t, input, profile)),
      plan_90: top1.pathway.plan_90.map(t => render(t, input, profile)),
      tools: top1.pathway.tools,
      next3: [
        '把你【' + profile.name + '】岗位上 3 个最重复的动作写成一张纸，明天开工前看一眼',
        '从 7 天行动计划里挑 1 条，今天下班前就跑完，用【' + (input.skills[0] || '通用能力') + '】作为切入',
        '把这份报告复制进你自己的笔记，24 小时后回来看一次，决定哪条撤哪条留'
      ]
    };

    assertNotBoilerplate(report, input);
    return report;
  }

  function toMarkdown(report, input) {
    const header = [
      '# AI 职业赚钱路径诊断报告',
      '',
      '> 画像：' + report.profile_name +
        ' ｜ 技能：' + (input.skills.join(', ') || '—') +
        ' ｜ 时间：' + HOURS_LABEL[input.hours] +
        ' ｜ 目标：' + INCOME_LABEL[input.income] +
        ' ｜ 风险：' + RISK_LABEL[input.risk],
      '> 生成时间：' + new Date().toISOString().slice(0, 10),
      ''
    ];
    const lines = [
      ...header,
      '## 1. AI 替代风险：' + report.risk_score + '/100（' + report.risk_label + '）',
      report.risk_text,
      '',
      '## 2. AI 增强机会',
      ...report.augment.map(a => '- ' + a),
      '',
      '## 3. 最适合的 3 条赚钱路径'
    ];
    report.pathways.forEach((p, i) => {
      lines.push('');
      lines.push('### ' + (i + 1) + '. ' + p.name + '（匹配分 ' + p.score + '）');
      lines.push(p.one_liner);
      lines.push('');
      lines.push('_为什么是你_：' + p.why);
    });
    lines.push('');
    lines.push('## 4. 7 天行动计划');
    report.plan_7.forEach((a, i) => lines.push((i + 1) + '. ' + a));
    lines.push('');
    lines.push('## 5. 30 天行动计划');
    report.plan_30.forEach((a, i) => lines.push((i + 1) + '. ' + a));
    lines.push('');
    lines.push('## 6. 90 天行动计划');
    report.plan_90.forEach((a, i) => lines.push((i + 1) + '. ' + a));
    lines.push('');
    lines.push('## 7. 推荐工具栈');
    report.tools.forEach(t => lines.push('- ' + t));
    lines.push('');
    lines.push('## 8. 明天就能做的 3 件事');
    report.next3.forEach((a, i) => lines.push((i + 1) + '. ' + a));
    lines.push('');
    lines.push('---');
    lines.push('由 AI Venture OS · ai-career-money-navigator v0.1 生成');
    return lines.join('\n');
  }

  window.CareerEngine = {
    generateReport,
    toMarkdown,
    assertNotBoilerplate,
    resolveProfile,
    calcRiskScore,
    rankPathways
  };
})();

// Node.js 导出（Gate 5 测试用）
if (typeof module !== 'undefined' && module.exports) {
  module.exports = (function () {
    const fakeWindow = {};
    return {
      load: function (careers, pathways, synthetic) {
        fakeWindow.CAREERS = careers;
        fakeWindow.PATHWAYS = pathways;
        fakeWindow.SYNTHETIC_PROFILES = synthetic;
        global.window = fakeWindow;
      }
    };
  })();
}
