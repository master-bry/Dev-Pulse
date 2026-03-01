<div align="center">

```
██████╗ ███████╗██╗   ██╗██████╗ ██╗   ██╗██╗     ███████╗███████╗
██╔══██╗██╔════╝██║   ██║██╔══██╗██║   ██║██║     ██╔════╝██╔════╝
██║  ██║█████╗  ██║   ██║██████╔╝██║   ██║██║     ███████╗█████╗  
██║  ██║██╔══╝  ╚██╗ ██╔╝██╔═══╝ ██║   ██║██║     ╚════██║██╔══╝  
██████╔╝███████╗ ╚████╔╝ ██║     ╚██████╔╝███████╗███████║███████╗
╚═════╝ ╚══════╝  ╚═══╝  ╚═╝      ╚═════╝ ╚══════╝╚══════╝╚══════╝
```

**CI/CD Monitoring Dashboard**

*Real-time GitHub Actions · Docker Builds · AWS CloudWatch — all in one screen*

![version](https://img.shields.io/badge/version-1.0.0-00dcbe?style=flat-square)
![react](https://img.shields.io/badge/react-18.2.0-61dafb?style=flat-square&logo=react&logoColor=white)
![vite](https://img.shields.io/badge/vite-5.1.0-646cff?style=flat-square&logo=vite&logoColor=white)
![router](https://img.shields.io/badge/react--router-6.22.0-ca4245?style=flat-square&logo=reactrouter&logoColor=white)
![license](https://img.shields.io/badge/license-MIT-00e676?style=flat-square)

</div>

---

## `$ whoami` &nbsp;—&nbsp; About The Project

```
DevPulse is a developer-first CI/CD dashboard built with React + Vite.

Problem:   Developers check GitHub, Docker Hub, AWS Console, and Slack
           separately just to know if a deployment is healthy.

Solution:  One screen. Three panels. Everything at a glance.
```

```yaml
panels:
  - name: "⚡ GitHub Actions"
    data: LIVE via GitHub REST API
    shows: workflow runs, statuses, commit messages, branches, durations

  - name: "🐳 Docker Builds"
    data: Mock (ECR / DockerHub backend-ready)
    shows: image builds, tags, registries, sizes, push status

  - name: "☁️  AWS CloudWatch"
    data: Mock (AWS SDK backend-ready)
    shows: CPU, memory, request rate, P99 latency, alarm states
```

---

## `$ cat features.md`

```diff
+ GitHub Actions
+   Live workflow runs pulled from the real GitHub API
+   Colour-coded status dots — success / running / failed / queued / cancelled
+   Pulsing animation on in-progress runs
+   Auto-refresh every 30 seconds
+   Summary stats: Total Runs · Running · Failed
+   Manual refresh with "last updated X ago" indicator

+ Docker Builds
+   Image name, tag, registry (ECR / DockerHub)
+   Status tracking: pushed · building · failed · cached
+   Build duration, image size, layer count

+ AWS CloudWatch
+   Four metric cards: CPU · Memory · Request Rate · P99 Latency
+   Area charts with 24-point time series
+   Delta indicators: ▲ up / ▼ down vs 5 points ago
+   WARN and CRIT alarm badges with glow animations
+   Threshold lines on each chart

+ UI / UX
+   Dark terminal-noir aesthetic
+   JetBrains Mono + Syne fonts
+   Live UTC clock in header (updates every second)
+   Staggered entrance animations
+   Responsive layout
!   Token stored in browser memory only — never in localStorage or any server
```

---

## `$ tree src/`

```
src/
│
├── services/                   # ── MODEL: API communication layer
│   ├── githubService.js        #    GitHub REST API calls
│   ├── dockerService.js        #    Docker builds  (mock → swap for real)
│   └── cloudwatchService.js    #    CloudWatch metrics (mock → swap for real)
│
├── hooks/                      # ── MODEL: State & business logic
│   ├── useAuth.jsx             #    Auth context, login, logout
│   ├── usePipelines.js         #    Fetch runs + 30s polling
│   ├── useDockerBuilds.js      #    Docker state management
│   ├── useMetrics.js           #    CloudWatch state + alarm detection
│   └── useClock.js             #    Live UTC clock (1s interval)
│
├── components/                 # ── VIEW: All UI components
│   ├── shared/                 #    Reusable atomic components
│   │   ├── StatusDot.jsx       #      Coloured pulsing status circle
│   │   ├── Badge.jsx           #      Pill label (success / failed / etc.)
│   │   ├── Spinner.jsx         #      Loading spinner
│   │   ├── Sparkline.jsx       #      Compact SVG line chart
│   │   ├── AreaChart.jsx       #      Responsive SVG area chart
│   │   ├── SectionCard.jsx     #      Card shell with header bar
│   │   ├── StatBar.jsx         #      Summary stats row
│   │   └── TableHeader.jsx     #      Column headers for data tables
│   │
│   ├── layout/
│   │   ├── Header.jsx          #    Sticky top bar + clock + disconnect
│   │   └── DashboardLayout.jsx #    Root layout with scan-line overlay
│   │
│   ├── auth/
│   │   ├── LoginForm.jsx       #    Token + owner + repo input form
│   │   └── ProtectedRoute.jsx  #    Redirects to /login if no credentials
│   │
│   ├── pipelines/
│   │   ├── PipelinesPanel.jsx  #    GitHub Actions section
│   │   └── PipelineRow.jsx     #    Single workflow run row
│   │
│   ├── docker/
│   │   ├── DockerPanel.jsx     #    Docker builds section
│   │   └── DockerRow.jsx       #    Single build row
│   │
│   └── cloudwatch/
│       ├── CloudWatchPanel.jsx #    CloudWatch section
│       └── MetricCard.jsx      #    Single metric card + area chart
│
├── pages/                      # ── CONTROLLER: Page-level composers
│   ├── LoginPage.jsx           #    Login screen (owns useAuth call)
│   └── DashboardPage.jsx       #    Dashboard (composes the 3 panels)
│
├── styles/
│   ├── global.css              #    CSS variables, reset, keyframe animations
│   └── theme.js                #    JS colour + font constants + statusColor()
│
└── utils/
    ├── formatters.js           #    formatDuration · timeAgo · truncate
    └── chartHelpers.js         #    SVG polyline point generation
```

---

## `$ cat stack.json`

```json
{
  "frontend": {
    "framework":  "React 18.2",
    "bundler":    "Vite 5.1",
    "routing":    "React Router 6.22",
    "language":   "JavaScript ES2022",
    "styling":    "Inline CSS + CSS Custom Properties",
    "charts":     "Hand-built SVG — zero chart libraries"
  },
  "fonts": {
    "monospace": "JetBrains Mono (code, tables, timestamps)",
    "display":   "Syne (headings, labels, values)"
  },
  "data": {
    "pipelines": "GitHub REST API v3 — LIVE",
    "docker":    "Mock service — backend-ready for ECR / DockerHub",
    "metrics":   "Mock service — backend-ready for AWS CloudWatch SDK"
  },
  "architecture": "MVC — services / hooks / components / pages",
  "security":     "Token in React state only — never persisted anywhere"
}
```

---

## `$ npm install && npm run dev`

### Prerequisites

```bash
node --version   # must be v18 or higher
npm --version    # comes with Node
```

### Quick Start

```bash
# Clone
git clone https://github.com/master-bry/devpulse.git
cd devpulse

# Install
npm install

# Run
npm run dev
# → Local:   http://localhost:5173
```

### Available Scripts

```bash
npm run dev       # Start dev server with hot-reload
npm run build     # Build for production  →  dist/
npm run preview   # Preview production build locally
npm run lint      # Run ESLint on all source files
```

---

## `$ gh auth setup`

DevPulse needs a **GitHub Fine-Grained Personal Access Token** to fetch your live Actions data.

```bash
# Step 1 — Go to:
https://github.com/settings/tokens?type=beta

# Step 2 — Click "Generate new token", then set:
Name:        devpulse-dashboard
Expiration:  30 days (your preference)
Access:      Select your target repository

# Step 3 — Under "Repository permissions" enable:
Actions   →  Read-only   ✅
Contents  →  Read-only   ✅  (for commit messages)

# Step 4 — Copy your token immediately!
# It looks like: github_pat_11ABCDEF...
```

```
┌─────────────────────────────────────────────┐
│           DevPulse Login Screen             │
├─────────────────────────────────────────────┤
│  GitHub Token   │  github_pat_11ABCDEF...   │
│  Owner          │  master-bry               │
│  Repository     │  FloodAlertApp            │
│                 │                           │
│        [ Connect & Load Dashboard ]         │
└─────────────────────────────────────────────┘
```

> **Security:** Your token is stored in React state (RAM only). It is never written to `localStorage`, cookies, a database, or any external server. Closing or refreshing the tab clears it completely.

---

## `$ curl -X GET /api/live-data`

```
How data flows through the app:
─────────────────────────────────────────────────────────────

  Browser
    │
    ├── / (login)
    │     LoginPage ──► useAuth ──► validateCredentials()
    │                                    │
    │                              GET /repos/{owner}/{repo}
    │                                    │
    │                           ✅ 200 OK → setCreds → navigate('/')
    │                           ❌ 401   → "Invalid token"
    │                           ❌ 404   → "Repo not found"
    │
    └── / (dashboard)
          │
          ├── PipelinesPanel
          │     usePipelines ──► fetchWorkflowRuns()
          │                           │
          │                     GET /repos/{owner}/{repo}/actions/runs
          │                           │
          │                     setRuns([...]) → render rows
          │                     ↺ repeat every 30 seconds
          │
          ├── DockerPanel
          │     useDockerBuilds ──► fetchDockerBuilds()
          │                              │
          │                        returns MOCK_BUILDS array
          │                        (swap for fetch('/api/builds'))
          │
          └── CloudWatchPanel
                useMetrics ──► fetchMetrics()
                                    │
                              returns MOCK_METRICS array
                              (swap for fetch('/api/metrics'))
                              ↺ repeat every 60 seconds
```

---

## `$ docker build -t devpulse:live .`  &nbsp;—&nbsp; Connecting Real APIs

Docker and CloudWatch use mock data because browser security blocks direct calls to AWS/Docker APIs. To go live, create a small backend proxy:

### 1 — Setup the proxy server

```bash
mkdir server && cd server
npm init -y
npm install express cors @aws-sdk/client-ecr @aws-sdk/client-cloudwatch dotenv
```

### 2 — Wire Docker (AWS ECR)

```js
// server/routes/builds.js
import { ECRClient, DescribeImagesCommand } from '@aws-sdk/client-ecr'

const ecr = new ECRClient({ region: process.env.AWS_REGION })

export async function getBuilds(req, res) {
  try {
    const result = await ecr.send(new DescribeImagesCommand({
      repositoryName: process.env.ECR_REPO_NAME
    }))
    res.json(result.imageDetails)
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
}
```

### 3 — Wire CloudWatch Metrics

```js
// server/routes/metrics.js
import { CloudWatchClient, GetMetricDataCommand } from '@aws-sdk/client-cloudwatch'

const cw = new CloudWatchClient({ region: process.env.AWS_REGION })

export async function getMetrics(req, res) {
  const now = new Date()
  const start = new Date(now - 60 * 60 * 1000)   // last 1 hour

  const result = await cw.send(new GetMetricDataCommand({
    StartTime: start,
    EndTime: now,
    MetricDataQueries: [
      { Id: 'cpu', MetricStat: { Metric: { Namespace: 'AWS/EC2', MetricName: 'CPUUtilization' }, Period: 300, Stat: 'Average' } },
    ]
  }))
  res.json(result.MetricDataResults)
}
```

### 4 — Update the frontend services

```js
// src/services/dockerService.js  — replace mock:
export async function fetchDockerBuilds() {
  const res = await fetch('/api/builds')
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}

// src/services/cloudwatchService.js  — replace mock:
export async function fetchMetrics() {
  const res = await fetch('/api/metrics')
  if (!res.ok) throw new Error(`API ${res.status}`)
  return res.json()
}
```

---

## `$ npm run build && vercel --prod`

```bash
# Build
npm run build
# → output: dist/

# Deploy to Vercel
npx vercel
# → https://devpulse.vercel.app

# Deploy to Netlify
npx netlify deploy --prod --dir=dist
# → https://devpulse.netlify.app
```

---

## `$ tail -f error.log` &nbsp;—&nbsp; Troubleshooting

```
┌─────────────────────────────────────┬────────────────────────────────────────────────────┐
│ Error                               │ Fix                                                │
├─────────────────────────────────────┼────────────────────────────────────────────────────┤
│ npm install → ERR_SOCKET_TIMEOUT    │ Retry: npm install --timeout=60000                 │
│ Still timing out                    │ npm config set registry https://registry.npmmirror │
│ CORS blocked on login               │ Ctrl+Shift+R  or  open incognito tab               │
│ Dashboard blank after login         │ rm -rf node_modules/.vite  then npm run dev        │
│ GitHub API 401                      │ Token expired → regenerate at github.com/settings  │
│ GitHub API 404                      │ owner/repo is case-sensitive — double-check it     │
│ @/ import not found                 │ Check vite.config.js alias, restart server         │
│ useAuth context error               │ Replace useAuth.jsx + LoginForm.jsx (latest ver.)  │
│ White screen / crash                │ F12 → Console tab → read the red error             │
└─────────────────────────────────────┴────────────────────────────────────────────────────┘
```

---

## `$ git log --oneline` &nbsp;—&nbsp; Roadmap

```
[ ] feat: node.js backend proxy for real Docker + CloudWatch data
[ ] feat: slack / email alerts on pipeline failures
[ ] feat: multi-repo support — monitor several repos at once
[ ] feat: deployment timeline with rollback detection
[ ] feat: mobile responsive layout optimisation
[ ] feat: light / dark theme toggle
[ ] feat: export pipeline history as CSV
[ ] feat: configurable refresh intervals per panel
[ ] chore: TypeScript migration
```

---

## `$ git clone && git push` &nbsp;—&nbsp; Contributing

```bash
# 1. Fork the repo on GitHub

# 2. Clone your fork
git clone https://github.com/YOUR_USERNAME/devpulse.git
cd devpulse

# 3. Create a feature branch
git checkout -b feature/your-feature-name

# 4. Make your changes, then commit
git add .
git commit -m "feat: describe your change here"

# 5. Push and open a Pull Request
git push origin feature/your-feature-name
```

```
Commit message format:
  feat:     new feature
  fix:      bug fix
  docs:     documentation only
  style:    formatting, no logic change
  refactor: code restructure, no behaviour change
  chore:    build / config changes
```

---

## `$ cat LICENSE`

```
MIT License

Copyright (c) 2026 Brayan Ngowi

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT.
```

---

<div align="center">

```
╔══════════════════════════════════════════════════════╗
║                                                      ║
║   Built by Brayan Ngowi  ·  github.com/master-bry   ║
║                                                      ║
║   Built for developers tired of checking 5 tabs     ║
║   just to know if the build is green. 🟢             ║
║                                                      ║
╚══════════════════════════════════════════════════════╝
```

</div>