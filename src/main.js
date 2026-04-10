import { calcDimensionScores, scoresToLevels, determineResult } from './engine.js'
import { createQuiz } from './quiz.js'
import { renderResult } from './result.js'
import { i18n, currentLang, setLang, t } from './i18n.js'
import './style.css'

async function loadJSON(path) {
  const res = await fetch(path)
  return res.json()
}

function updateStaticUI() {
  const keys = Object.keys(i18n[currentLang])
  keys.forEach(key => {
    const el = document.getElementById(key)
    if (el) {
      if (el.tagName === 'H1') el.innerHTML = t(key)
      else el.textContent = t(key)
    }
  })
  
  document.title = t('doc-title')

  // Update lang switch buttons
  document.getElementById('btn-lang-zh').classList.toggle('active', currentLang === 'zh')
  document.getElementById('btn-lang-en').classList.toggle('active', currentLang === 'en')
}

let currentQuiz = null

async function init() {
  updateStaticUI()

  // Load JSON based on current lang
  const langDir = currentLang === 'zh' ? 'zh' : 'en'
  const [questions, dimensions, types, config] = await Promise.all([
    loadJSON(new URL(`../data/${langDir}/questions.json`, import.meta.url).href),
    loadJSON(new URL(`../data/${langDir}/dimensions.json`, import.meta.url).href),
    loadJSON(new URL(`../data/${langDir}/types.json`, import.meta.url).href),
    loadJSON(new URL(`../data/${langDir}/config.json`, import.meta.url).href),
  ])

  const pages = {
    intro: document.getElementById('page-intro'),
    quiz: document.getElementById('page-quiz'),
    result: document.getElementById('page-result'),
  }

  function showPage(name) {
    Object.values(pages).forEach((p) => p.classList.remove('active'))
    pages[name].classList.add('active')
    window.scrollTo(0, 0)
  }

  function onQuizComplete(answers, isDrunk) {
    const scores = calcDimensionScores(answers, questions.main)
    const levels = scoresToLevels(scores, config.scoring.levelThresholds)
    const result = determineResult(levels, dimensions.order, types.standard, types.special, { isDrunk })
    renderResult(result, levels, dimensions.order, dimensions.definitions, config)
    showPage('result')
  }

  currentQuiz = createQuiz(questions, config, onQuizComplete)

  document.getElementById('btn-start').addEventListener('click', () => {
    currentQuiz.start()
    showPage('quiz')
  })

  document.getElementById('btn-restart').addEventListener('click', () => {
    currentQuiz.start()
    showPage('quiz')
  })
}

document.getElementById('btn-lang-zh').addEventListener('click', () => {
  if (currentLang !== 'zh') {
    setLang('zh')
    location.reload()
  }
})

document.getElementById('btn-lang-en').addEventListener('click', () => {
  if (currentLang !== 'en') {
    setLang('en')
    location.reload()
  }
})

init()
