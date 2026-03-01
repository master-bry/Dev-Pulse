📊 DevPulse — CI/CD Monitoring Dashboard
A real-time DevOps dashboard that aggregates GitHub Actions pipelines, Docker build logs, and AWS CloudWatch metrics into one clean interface.








🚀 What is DevPulse?
DevPulse is a developer tool built to solve a common frustration — having to check GitHub, Docker Hub, AWS Console, and Slack separately just to know if your deployment is healthy.
Instead of switching between 5 tabs, DevPulse gives you one screen that shows everything:
·	⚡ GitHub Actions — Live workflow run statuses, commit messages, durations, and branches
·	🐳 Docker Builds — Image build history, registry pushes, cache hits, and failures
·	☁️ AWS CloudWatch — CPU, memory, request rate, and latency metrics with alarm detection

✨ Features
GitHub Actions (Live Data)
·	Connects to the real GitHub API using your Personal Access Token
·	Shows all workflow runs with status, branch, commit message, and duration
·	Colour-coded status dots: 🟢 success · 🔵 running · 🔴 failed · 🟡 queued
·	Pulsing animation for in-progress runs
·	Auto-refreshes every 30 seconds
·	Manual refresh button with "last updated X minutes ago"
Docker Builds
·	Build history with image name, tag, registry, size, and layer count
·	Status tracking: pushed, building, failed, cached
·	Ready to wire to AWS ECR or Docker Hub via a backend proxy
AWS CloudWatch
·	Four metric cards: CPU Utilisation, Memory Usage, Request Rate, P99 Latency
·	Area charts with 24-point time series
·	Live delta indicators (▲ up / ▼ down vs 5 data points ago)
·	WARN and CRIT alarm badges when metrics cross thresholds
·	Glowing alarm animation for critical alerts
General
·	🌑 Dark terminal-noir UI with JetBrains Mono + Syne fonts
·	Live UTC clock in the header
·	Staggered entrance animations
·	Token stored in memory only — never saved to localStorage or any server
·	Fully component-based MVC architecture

🖥️ Preview
┌──────────────────────────────────────────────────────┐
│ 📊 DevPulse          master-bry/FloodAlertApp  LIVE  │
├──────────────────────────────────────────────────────┤
│ ⚡ master-bry/FloodAlertApp — Actions                 │
│  ● CI          master  Add CI workflow   success  7s │
├─────────────────────────┬────────────────────────────┤
│ 🐳 Docker Builds        │ ☁️  AWS CloudWatch         │
│  ● api-gateway  pushed  │  CPU  44%  ▲ 3%   [OK]     │
│  ● frontend     building│  MEM  67%  ▼ 1%   [OK]     │
│  ● worker       failed  │  RPS  1240 ▲ 80   [OK]     │
│                         │  P99  82ms ▲ 12ms [CRIT]   │
└─────────────────────────┴────────────────────────────┘


🗂️ Project Structure
This project follows an MVC pattern adapted for React — every file has one clear job.
devpulse/
├── src/
│   ├── services/              # MODEL — API calls only
│   │   ├── githubService.js   # GitHub REST API
│   │   ├── dockerService.js   # Docker builds (mock → real)
│   │   └── cloudwatchService.js # AWS CloudWatch (mock → real)
│   │
│   ├── hooks/                 # MODEL — State & business logic
│   │   ├── useAuth.jsx        # Auth context, login/logout
│   │   ├── usePipelines.js    # GitHub runs + auto-refresh polling
│   │   ├── useDockerBuilds.js # Docker state management
│   │   ├── useMetrics.js      # CloudWatch metrics state
│   │   └── useClock.js        # Live UTC clock
│   │
│   ├── components/            # VIEW — All JSX/UI
│   │   ├── shared/            # Reusable atoms
│   │   │   ├── StatusDot.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Spinner.jsx
│   │   │   ├── Sparkline.jsx
│   │   │   ├── AreaChart.jsx
│   │   │   ├── SectionCard.jsx
│   │   │   ├── StatBar.jsx
│   │   │   └── TableHeader.jsx
│   │   ├── layout/
│   │   │   ├── Header.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── auth/
│   │   │   ├── LoginForm.jsx
│   │   │   └── ProtectedRoute.jsx
│   │   ├── pipelines/
│   │   │   ├── PipelinesPanel.jsx
│   │   │   └── PipelineRow.jsx
│   │   ├── docker/
│   │   │   ├── DockerPanel.jsx
│   │   │   └── DockerRow.jsx
│   │   └── cloudwatch/
│   │       ├── CloudWatchPanel.jsx
│   │       └── MetricCard.jsx
│   │
│   ├── pages/                 # CONTROLLER — Page composers
│   │   ├── LoginPage.jsx
│   │   └── DashboardPage.jsx
│   │
│   ├── styles/
│   │   ├── global.css         # CSS variables + animations
│   │   └── theme.js           # JS colour + font constants
│   │
│   └── utils/
│       ├── formatters.js      # formatDuration, timeAgo, truncate
│       └── chartHelpers.js    # SVG point generation
│
├── index.html
├── vite.config.js
└── package.json


⚙️ Tech Stack
Layer	Technology
Frontend Framework	React 18
Build Tool	Vite 5
Routing	React Router v6
Styling	Inline CSS + CSS Variables
Charts	Custom SVG (no chart library)
Fonts	JetBrains Mono + Syne (Google Fonts)
Data — Pipelines	GitHub REST API v3 (live)
Data — Docker	Mock service (ECR / DockerHub ready)
Data — Metrics	Mock service (AWS SDK ready)
Language	JavaScript ES2022


🛠️ Getting Started
Prerequisites
·	Node.js v18 or higher
·	npm (comes with Node)
·	A GitHub account with at least one repo that has Actions workflows
Installation
# 1. Clone the repo
git clone https://github.com/master-bry/devpulse.git
cd devpulse

# 2. Install dependencies
npm install

# 3. Start the dev server
npm run dev

# 4. Open in browser
# → http://localhost:5173

Creating a GitHub Personal Access Token
1.	Go to https://github.com/settings/tokens?type=beta
2.	Click Generate new token
3.	Set a name (e.g. devpulse) and an expiry date
4.	Under Repository permissions set:
o	Actions → Read-only ✅
o	Contents → Read-only ✅
5.	Click Generate token — copy it immediately, it won't be shown again
Then on the DevPulse login screen enter your token, GitHub username, and repo name.
🔒 Security note: Your token is stored only in browser memory (React state). It is never saved to localStorage, cookies, or sent to any server. Refreshing the page clears it completely.

🔌 Connecting Real APIs
Docker and CloudWatch use mock data by default because their APIs require server-side auth — browsers cannot call AWS or Docker registries directly. To connect real data you need a small backend proxy.
1. Create a backend proxy
mkdir server && cd server
npm init -y
npm install express cors @aws-sdk/client-ecr @aws-sdk/client-cloudwatch

2. Wire Docker (AWS ECR)
// server/index.js
import { ECRClient, DescribeImagesCommand } from '@aws-sdk/client-ecr'
const ecr = new ECRClient({ region: 'us-east-1' })

app.get('/api/builds', async (req, res) => {
  const data = await ecr.send(new DescribeImagesCommand({ repositoryName: 'your-repo' }))
  res.json(data.imageDetails)
})

3. Update the frontend service
In src/services/dockerService.js, replace the mock with:
export async function fetchDockerBuilds() {
  const res = await fetch('/api/builds')
  return res.json()
}

Do the same for cloudwatchService.js → /api/metrics.

📦 Build for Production
npm run build
# Output in dist/

Deploy to Vercel:
npx vercel

Deploy to Netlify:
npx netlify deploy --prod --dir=dist


🐛 Troubleshooting
Problem	Fix
npm install times out	Retry, or run npm install --timeout=60000
Still failing	npm config set registry https://registry.npmmirror.com
CORS error on login	Hard refresh Ctrl+Shift+R or open incognito tab
Dashboard blank after login	rm -rf node_modules/.vite then npm run dev
GitHub 401 error	Token expired — regenerate at github.com/settings/tokens
GitHub 404 error	Check owner/repo spelling — it is case-sensitive
@/ import not resolving	Check vite.config.js has the path alias, then restart server
White screen / crash	Open DevTools F12 → Console tab for the exact error


🗺️ Roadmap
·	Node.js backend for real Docker + CloudWatch data
·	Slack / email alerts on pipeline failures
·	Multi-repo support — monitor several repos at once
·	Deployment timeline with rollback indicators
·	Mobile responsive layout
·	Light / dark theme toggle
·	Export pipeline history as CSV

🤝 Contributing
Contributions are welcome! Please open an issue first to discuss what you would like to change.
# 1. Fork the repo
# 2. Create a feature branch
git checkout -b feature/your-feature

# 3. Commit your changes
git commit -m 'feat: add your feature'

# 4. Push and open a Pull Request
git push origin feature/your-feature


📄 License
MIT © Brayan Ngowi


  Built with ❤️ for developers who are tired of checking 5 tabs to know if their build is green.
