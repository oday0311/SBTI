export const i18n = {
  zh: {
    'doc-title': 'SBTI 人格测试',
    'intro-title': 'MBTI已经过时，<br/>SBTI来了。',
    'btn-start': '开始测试',
    'intro-credit': '开源项目 · 基于 B站UP主@蛆肉儿串儿 原创测试',
    'intro-note': '本测试仅供娱乐',
    'result-kicker-main': '你的主类型',
    'result-kicker-drunk': '隐藏人格已激活',
    'result-kicker-fallback': '系统强制兜底',
    'secondary-label': '次要匹配',
    'title-dimensions': '十五维度评分',
    'title-top5': '最佳匹配 TOP 5',
    'btn-download': '保存分享图片',
    'btn-restart': '重新测试',
    'agent-title': '想自己搭一个？',
    'btn-agent': '复制一键部署命令',
    'btn-agent-copied': '已复制!',
    'agent-hint': '粘贴到 Claude Code / OpenClaw 即可一键运行并自定义',
    'level-L': '低',
    'level-M': '中',
    'level-H': '高'
  },
  en: {
    'doc-title': 'SBTI Personality Test',
    'intro-title': 'MBTI is out,<br/>SBTI is here.',
    'btn-start': 'Start Test',
    'intro-credit': 'Open Source · Based on @蛆肉儿串儿 original test',
    'intro-note': 'For entertainment purposes only',
    'result-kicker-main': 'Your Main Type',
    'result-kicker-drunk': 'Hidden Persona Activated',
    'result-kicker-fallback': 'System Fallback',
    'secondary-label': 'Secondary Match',
    'title-dimensions': '15 Dimensions Score',
    'title-top5': 'Top 5 Matches',
    'btn-download': 'Save Image',
    'btn-restart': 'Restart Test',
    'agent-title': 'Want to build your own?',
    'btn-agent': 'Copy Deploy Command',
    'btn-agent-copied': 'Copied!',
    'agent-hint': 'Paste into Claude Code / OpenClaw to run and customize',
    'level-L': 'Low',
    'level-M': 'Mid',
    'level-H': 'High'
  }
}

export let currentLang = localStorage.getItem('sbti_lang') || (navigator.language.startsWith('zh') ? 'zh' : 'en')

export function setLang(lang) {
  currentLang = lang
  localStorage.setItem('sbti_lang', lang)
  document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en'
}

export function t(key) {
  return i18n[currentLang][key] || key
}
