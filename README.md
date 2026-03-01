# DevPulse — CI/CD Dashboard
### Setup Guide for VS Code

---

## What You're Building

A real-time DevOps monitoring dashboard with three panels:
- **GitHub Actions** — live workflow runs pulled from the real GitHub API
- **Docker Builds** — build history (mock data, ready to wire to ECR/DockerHub)
- **AWS CloudWatch** — metrics with alarm indicators (mock data, ready to wire to AWS SDK)

**Stack:** React 18 + Vite + React Router v6  
**No backend required** to get started.

---

## Prerequisites

Install these before starting:

| Tool | Version | Download |
|------|---------|---------|
| Node.js | 18 or higher | https://nodejs.org |
| npm | comes with Node | — |
| VS Code | latest | https://code.visualstudio.com |

**Verify installation:**
```bash
node --version   # should print v18.x.x or higher
npm --version    # should print 9.x.x or higher
```

---

## Step 1 — Open the Project in VS Code

1. Copy the entire `devpulse/` folder to wherever you keep your projects (e.g. `~/projects/devpulse`)
2. Open VS Code
3. Go to **File → Open Folder…** and select the `devpulse` folder
4. Open the integrated terminal: **Terminal → New Terminal** (or press `` Ctrl+` ``)

---

## Step 2 — Install Dependencies

In the VS Code terminal, run:

```bash
npm install
```

This installs React, Vite, and React Router. It takes ~30 seconds.  
You'll see a `node_modules/` folder appear — that's normal.

---

## Step 3 — Start the Dev Server

```bash
npm run dev
```

You should see:

```
  VITE v5.x.x  ready in 300ms

  ➜  Local:   http://localhost:5173/
  ➜  Network: use --host to expose
```

Open **http://localhost:5173** in your browser.  
You'll see the DevPulse login page. 🎉

The dev server supports **hot module replacement** — any file you save
instantly updates in the browser without a full reload.

---

## Step 4 — Create a GitHub Personal Access Token

To load real GitHub Actions data you need a **fine-grained PAT**:

1. Go to → **https://github.com/settings/tokens?type=beta**
2. Click **"Generate new token"**
3. Fill in:
   - **Token name:** `devpulse-dashboard`
   - **Expiration:** 30 days (or your preference)
   - **Repository access:** Select the specific repo you want to monitor
4. Under **Permissions → Repository permissions**, set:
   - **Actions** → Read-only ✅
   - **Contents** → Read-only ✅ (optional, for commit messages)
5. Click **Generate token** and **copy it immediately** (you won't see it again)

---

## Step 5 — Connect the Dashboard

Back in the browser at http://localhost:5173:

1. Paste your GitHub token in the **Token** field
2. Enter your **owner** (GitHub username or org, e.g. `microsoft`)
3. Enter the **repository name** (e.g. `vscode`)
4. Click **Connect & Load Workflows**

Your live GitHub Actions runs will load within a few seconds!

---

## Project Structure (MVC Pattern)

```
devpulse/
├── index.html                    ← HTML entry point
├── vite.config.js                ← Vite config (path aliases)
├── package.json
├── public/
│   └── favicon.svg
└── src/
    ├── main.jsx                  ← React bootstrap
    ├── App.jsx                   ← Router setup
    │
    ├── styles/
    │   ├── global.css            ← CSS variables, animations, reset
    │   └── theme.js              ← JS colour/font constants + statusColor()
    │
    ├── services/                 ← MODEL: API calls & data fetching
    │   ├── githubService.js      ← GitHub REST API
    │   ├── dockerService.js      ← Docker builds (mock → real)
    │   └── cloudwatchService.js  ← AWS CloudWatch (mock → real)
    │
    ├── hooks/                    ← MODEL: state management
    │   ├── useAuth.jsx           ← Auth context + provider
    │   ├── usePipelines.js       ← GitHub runs + polling
    │   ├── useDockerBuilds.js    ← Docker builds state
    │   ├── useMetrics.js         ← CloudWatch metrics state
    │   └── useClock.js           ← Live UTC clock
    │
    ├── utils/                    ← Pure helper functions
    │   ├── formatters.js         ← formatDuration, timeAgo, truncate
    │   └── chartHelpers.js       ← SVG point generation
    │
    ├── components/               ← VIEW: UI components
    │   ├── shared/               ← Reusable atoms
    │   │   ├── StatusDot.jsx
    │   │   ├── Badge.jsx
    │   │   ├── Spinner.jsx
    │   │   ├── Sparkline.jsx
    │   │   ├── AreaChart.jsx
    │   │   ├── SectionCard.jsx
    │   │   ├── StatBar.jsx
    │   │   └── TableHeader.jsx
    │   ├── layout/
    │   │   ├── Header.jsx
    │   │   └── DashboardLayout.jsx
    │   ├── auth/
    │   │   ├── LoginForm.jsx
    │   │   └── ProtectedRoute.jsx
    │   ├── pipelines/
    │   │   ├── PipelinesPanel.jsx
    │   │   └── PipelineRow.jsx
    │   ├── docker/
    │   │   ├── DockerPanel.jsx
    │   │   └── DockerRow.jsx
    │   └── cloudwatch/
    │       ├── CloudWatchPanel.jsx
    │       └── MetricCard.jsx
    │
    └── pages/                    ← CONTROLLER: page-level composition
        ├── LoginPage.jsx
        └── DashboardPage.jsx
```

---

## Recommended VS Code Extensions

Install these for the best development experience:

1. **ESLint** (`dbaeumer.vscode-eslint`) — live linting
2. **Prettier** (`esbenp.prettier-vscode`) — auto-formatting
3. **ES7+ React/Redux/React-Native snippets** (`dsznajder.es7-react-js-snippets`) — `rafce` shortcut for components
4. **Auto Rename Tag** (`formulahendry.auto-rename-tag`) — rename JSX tags in pairs
5. **Path Intellisense** (`christian-kohler.path-intellisense`) — `@/` alias autocomplete

To install: press `Ctrl+Shift+X` → search the name → click Install.

---

## Going Live — Wiring Real APIs

### Docker (AWS ECR or Docker Hub)

You need a **backend proxy** because Docker Registry APIs require server-side auth.

1. Create a `server/` folder with a Node/Express app
2. Install: `npm install express @aws-sdk/client-ecr cors`
3. Create a `/api/builds` endpoint that calls ECR:
```js
import { ECRClient, DescribeImagesCommand } from '@aws-sdk/client-ecr'
const ecr = new ECRClient({ region: 'us-east-1' })
// ...serve results at /api/builds
```
4. In `src/services/dockerService.js`, replace the mock with:
```js
const res = await fetch('/api/builds')
return res.json()
```

### AWS CloudWatch

Same pattern — the AWS SDK must run server-side:

1. In your backend, install `@aws-sdk/client-cloudwatch`
2. Create a `/api/metrics` endpoint
3. In `src/services/cloudwatchService.js`, replace the mock with:
```js
const res = await fetch('/api/metrics')
return res.json()
```

---

## Build for Production

```bash
npm run build
```

Output goes to `dist/`. Deploy to Vercel, Netlify, or any static host:

```bash
# Vercel (one command deploy)
npx vercel

# Netlify
npx netlify deploy --prod --dir=dist
```

---

## Troubleshooting

| Problem | Fix |
|---------|-----|
| `npm install` fails | Make sure Node ≥ 18: `node --version` |
| Port 5173 already in use | `npm run dev -- --port 3000` |
| GitHub API 401 error | Token expired or wrong scope — regenerate it |
| GitHub API 404 error | Check owner/repo spelling (case-sensitive) |
| `@/` import not found | Make sure `vite.config.js` is in root with the alias |
| Blank page after login | Open browser DevTools (F12) → Console tab for errors |

---

## Available Scripts

```bash
npm run dev      # Start development server (http://localhost:5173)
npm run build    # Build for production → dist/
npm run preview  # Preview production build locally
npm run lint     # Run ESLint on all source files
```
