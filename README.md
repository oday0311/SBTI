SBTI Personality TestMBTI is outdated; SBTI has arrived.An open-source, entertainment-oriented personality test project based on the original test by Bilibili creator @蛆肉儿串儿.Live Demo👉 Click here to start the testOnline sample: https://cctor.com/sbti.htmlFeatures🧠 27 Personality Types — 25 standard types + 2 hidden/fallback types.📊 15 Assessment Dimensions — Covering five core models: Self, Emotion, Attitude, Action, and Social.🎯 Manhattan Distance Matching — A "scientific" matching algorithm based on a 15-dimensional vector.🍺 Hidden Easter Egg — Special trigger mechanism for the "Alcoholic" personality.📱 Mobile First — Responsive design optimized for smartphone experiences.🔧 Highly Customizable — Separation of data and code; customize the test simply by editing JSON files.Project StructurePlaintext├── data/                    # Test data (edit here to customize)
│   ├── questions.json       # Questions and options
│   ├── dimensions.json      # Definitions for the 15 dimensions
│   ├── types.json           # Personality types and matching patterns
│   └── config.json          # Scoring parameters and display config
├── src/                     # Source code
│   ├── engine.js            # Scoring algorithm (pure functions)
│   ├── quiz.js              # Quiz flow control
│   ├── result.js            # Result page rendering
│   ├── chart.js             # Radar chart (Canvas API)
│   ├── utils.js             # Utility functions
│   ├── main.js              # Entry point
│   └── style.css            # Styles (Themed via CSS variables)
├── docs/
│   └── analysis.md          # Data analysis report
└── index.html
Quick StartBash# Clone the project
git clone https://github.com/pingfanfan/SBTI.git
cd SBTI

# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
Customize Your Own TestAll test content is located in the data/ directory. You can customize the entire experience by modifying JSON files without touching the core logic.1. Modify QuestionsEdit data/questions.json. Each question follows this structure:JSON{
  "id": "q1",
  "dim": "S1",
  "text": "Your question text here",
  "options": [
    { "label": "Option A", "value": 1 },
    { "label": "Option B", "value": 2 },
    { "label": "Option C", "value": 3 }
  ]
}
dim: Specifies which dimension the question belongs to.value: Scoring: 1 = Low, 2 = Medium, 3 = High.Note: Each dimension requires exactly 2 questions.2. Add New Personality TypesEdit data/types.json and add an entry to the standard array:JSON{
  "code": "YOUR_CODE",
  "pattern": "HHH-HMH-MHH-HHH-MHM",
  "cn": "Type Name",
  "intro": "One-line introduction",
  "desc": "Detailed description..."
}
The pattern is a 15-letter L/M/H combination (mapped to dimensions: S1-S3, E1-E3, A1-A3, Ac1-Ac3, So1-So3), separated by hyphens.Scoring AlgorithmSummation: Scores from the 2 questions in each dimension are added (range: 2–6).Grading: $\le 3 \to L$ (Low), $4 \to M$ (Medium), $\ge 5 \to H$ (High).Vectorization: $L=1, M=2, H=3$ to generate a 15-dimensional numerical vector.Matching: Calculates the Manhattan Distance between the user's vector and every personality type.Ranking: Sorted by Distance (ascending) $\to$ Precise Hits (descending) $\to$ Similarity (descending).Override Priority: "Alcoholic" Egg > Standard Match > "Happy Fool" Fallback ($<60\%$ similarity).For details, see the Data Analysis Report.DeploymentGitHub Pages (Recommended): Fork the repo, go to Settings → Pages, and select GitHub Actions for automatic deployment.Vercel / Netlify: Connect your GitHub repo; it will recognize the Vite project with zero configuration.Manual: Run npm run build and deploy the dist/ folder to any static server.Tech StackVite — Build toolVanilla JavaScript — Framework-freeCanvas API — Radar chart renderingCSS Custom Properties — ThemingCreditsOriginal Test: Bilibili Creator @蛆肉儿串儿 (UID: 417038183)Original Version: Official Bilibili SBTI PageDisclaimerThis test is for entertainment purposes only. Do not use it for serious psychological assessment. This project is an open-source fan creation; please contact the maintainers if there are any copyright concerns.LicenseMIT



# SBTI 人格测试

> MBTI已经过时，SBTI来了。

一个开源的娱乐性人格测试项目，基于 B站UP主 [@蛆肉儿串儿](https://space.bilibili.com/417038183) 的原创测试。

## 在线体验

👉 [点击开始测试](https://pingfanfan.github.io/SBTI/)

online sample:   (https://cctor.com/sbti.html)


## 特性

- 🧠 **27种人格类型** — 25种标准类型 + 2种隐藏/兜底类型
- 📊 **15个评估维度** — 自我、情感、态度、行动、社交五大模型
- 🎯 **曼哈顿距离匹配** — 基于15维向量的科学匹配算法
- 🍺 **隐藏彩蛋** — 酒鬼人格触发机制
- 📱 **移动端优先** — 响应式设计，手机体验友好
- 🔧 **易于定制** — 数据与代码分离，改 JSON 即可创建你自己的测试

## 项目结构

```
├── data/                    # 测试数据（修改这里来定制）
│   ├── questions.json       # 题目和选项
│   ├── dimensions.json      # 15个维度定义
│   ├── types.json           # 人格类型和匹配模式
│   └── config.json          # 评分参数和显示配置
├── src/                     # 源代码
│   ├── engine.js            # 评分算法（纯函数）
│   ├── quiz.js              # 答题流程控制
│   ├── result.js            # 结果页渲染
│   ├── chart.js             # 雷达图（Canvas API）
│   ├── utils.js             # 工具函数
│   ├── main.js              # 入口
│   └── style.css            # 样式（CSS变量主题化）
├── docs/
│   └── analysis.md          # 数据分析报告
└── index.html
```

## 快速开始

```bash
# 克隆项目
git clone https://github.com/pingfanfan/SBTI.git
cd SBTI

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build
```

## 定制你自己的测试

所有测试内容都在 `data/` 目录下，修改 JSON 文件即可定制，无需改动代码。

### 修改题目

编辑 `data/questions.json`，每道题的结构：

```json
{
  "id": "q1",
  "dim": "S1",
  "text": "你的题目文字",
  "options": [
    { "label": "选项A", "value": 1 },
    { "label": "选项B", "value": 2 },
    { "label": "选项C", "value": 3 }
  ]
}
```

- `dim` 指定该题属于哪个维度
- `value` 分值：1=低, 2=中, 3=高
- 每个维度需要恰好2道题

### 添加新人格类型

编辑 `data/types.json`，在 `standard` 数组中添加：

```json
{
  "code": "YOUR",
  "pattern": "HHH-HMH-MHH-HHH-MHM",
  "cn": "你的类型名",
  "intro": "一句话简介",
  "desc": "详细描述..."
}
```

`pattern` 是15个字母的L/M/H组合（按维度顺序：S1-S3, E1-E3, A1-A3, Ac1-Ac3, So1-So3），用 `-` 分隔每个模型。

### 调整评分参数

编辑 `data/config.json`：

```json
{
  "scoring": {
    "levelThresholds": { "L": [2, 3], "M": [4, 4], "H": [5, 6] },
    "fallbackThreshold": 60
  }
}
```

### 修改主题样式

编辑 `src/style.css` 顶部的 CSS 变量：

```css
:root {
  --bg: #f0f4f1;
  --accent: #4c6752;
  /* ... */
}
```

## 评分算法

1. **求和**：每维度2题分值相加（范围2-6）
2. **分级**：≤3 → L（低），4 → M（中），≥5 → H（高）
3. **向量化**：L=1, M=2, H=3，生成15维数值向量
4. **匹配**：计算用户向量与每种类型的曼哈顿距离
5. **排名**：距离升序 → 精准命中降序 → 相似度降序
6. **特殊覆盖**：酒鬼彩蛋 > 正常匹配 > 傻乐者兜底（<60%）

详见 [数据分析报告](docs/analysis.md)。

## 部署

### GitHub Pages（推荐）

Fork 本项目后，在 Settings → Pages → Source 选择 GitHub Actions 即可自动部署。

### Vercel / Netlify

直接连接 GitHub 仓库，零配置自动识别 Vite 项目。

### 手动部署

```bash
npm run build
# 将 dist/ 目录部署到任何静态服务器
```

## 技术栈

- [Vite](https://vitejs.dev/) — 构建工具
- 原生 JavaScript — 无框架依赖
- Canvas API — 雷达图渲染
- CSS Custom Properties — 主题化

## 致谢

- 原创测试：B站UP主 [@蛆肉儿串儿](https://space.bilibili.com/417038183)（UID: 417038183）
- 原版地址：[B站SBTI测试页面](https://www.bilibili.com/blackboard/era/VxiCX2CRqcqzPK9F.html)

## 声明

本测试仅供娱乐，请勿用于任何严肃场景。本项目为开源二创，如有侵权请联系删除。

## License

[MIT](LICENSE)




