# XAUUSD Gold Prediction AI Agent - Hybrid Architecture Plan

## Crawlee + Playwright + MiroFlow — Proxmox LXC Deployment

This plan implements a **hybrid architecture** combining:
1. **Crawlee + Playwright** for robust data collection (scraping)
2. **MiroFlow** for AI-powered analysis and gold price predictions
3. Production-ready **Proxmox LXC deployment** across multiple containers

---

## 🎯 Goals and Scope

### Data Collection Layer (Crawlee + Playwright)
- Replace `server/services/sentimentScraper.ts`, `server/services/sentimentScraperSimple.ts`, and `server/services/newsScraper.ts` with modular Crawlee-based scrapers
- Scrape gold prices, market sentiment, economic calendars, news from multiple sources
- Support headless browser operations (Playwright), proxies, browser fingerprinting, and CAPTCHA challenge solving via 2Captcha
- Produce clean, structured data outputs validated against schemas (TypeScript + Zod)
- Implement resilient error handling, retry/backoff, rate limiting, and observability

### AI Prediction Layer (MiroFlow)
- Integrate MiroFlow AI agent framework for deep research and future event prediction
- Analyze collected data to generate gold price predictions
- Provide reasoning and confidence scores for predictions
- Research real-time events and their impact on gold prices
- Generate comprehensive prediction reports

### Infrastructure
- Deploy across **3 dedicated Proxmox LXC containers** (detailed below)
- Ensure high availability, scalability, and fault tolerance
- Implement efficient data pipeline between components

---

## 🏗️ Hybrid Architecture Overview

### System Diagram

```
┌─────────────────────────────────────────────────────────────────────┐
│                        Proxmox Hypervisor                            │
├─────────────────────────────────────────────────────────────────────┤
│                                                                       │
│  ┌──────────────────────┐  ┌──────────────────────┐  ┌────────────┐│
│  │  LXC 1: Web App      │  │  LXC 2: Scraper      │  │ LXC 3:     ││
│  │  + API Server        │  │  (Crawlee+Playwright)│  │ MiroFlow   ││
│  ├──────────────────────┤  ├──────────────────────┤  │ AI Agent   ││
│  │ - Express/Vite       │◄─┤ - Crawlee framework  │◄─┤            ││
│  │ - Client UI          │  │ - Playwright browser │  │ - Research ││
│  │ - API endpoints      │  │ - 2Captcha solver    │  │ - Predict  ││
│  │ - Database           │  │ - Data collection    │  │ - Analyze  ││
│  │                      │  │ - Proxies/Anti-bot   │  │            ││
│  │ CPU: 2-4 vCPU       │  │ CPU: 4-6 vCPU       │  │ CPU: 4-8   ││
│  │ RAM: 4-8 GB         │  │ RAM: 8-16 GB        │  │ RAM: 16-32 ││
│  │ Disk: 20-40 GB      │  │ Disk: 20-30 GB      │  │ Disk: 40+  ││
│  └──────────────────────┘  └──────────────────────┘  └────────────┘│
│           │                          │                      │        │
└───────────┼──────────────────────────┼──────────────────────┼────────┘
            │                          │                      │
            └──────────────────────────┴──────────────────────┘
                         Internal Network Bridge
                      (vmbr0 or dedicated bridge)
```

### Data Flow

```
1. User Request → LXC 1 (Web App)
                    ↓
2. API triggers → LXC 2 (Scraper) for fresh data
                    ↓
3. Scraper collects data → Stores in LXC 1 database
                    ↓
4. LXC 1 requests prediction → LXC 3 (MiroFlow)
                    ↓
5. MiroFlow analyzes data + does additional research
                    ↓
6. Returns prediction with reasoning → LXC 1
                    ↓
7. LXC 1 delivers to user
```

---

## 📦 LXC Container Requirements

You need **3 dedicated LXC containers** for this architecture:

### LXC 1: Web Application + API Server

**Purpose**: Main application serving the frontend and API endpoints

**Specifications**:
- **OS**: Debian 12 (bookworm) or Ubuntu 22.04 LTS
- **CPU**: 2-4 vCPU
- **RAM**: 4-8 GB
- **Disk**: 20-40 GB
- **Features**: `nesting=1`, `keyctl=1`
- **Network**: Bridge with static IP or DHCP

**Components**:
- Node.js 22 LTS
- Express backend
- Vite frontend
- PostgreSQL database (or use external DB)
- API routers and services

**Responsibilities**:
- Serve web UI to users
- Handle API requests
- Store scraped data in database
- Orchestrate scraper and MiroFlow requests
- Cache predictions and manage user sessions

---

### LXC 2: Data Scraper (Crawlee + Playwright)

**Purpose**: High-performance web scraping with browser automation

**Specifications**:
- **OS**: Debian 12 (bookworm) - recommended for stability
- **CPU**: 4-6 vCPU (browser automation is CPU-intensive)
- **RAM**: 8-16 GB (multiple browser instances)
- **Disk**: 20-30 GB
- **Features**: `nesting=1`, `keyctl=1`
- **Network**: Bridge with outbound internet + proxy support

**Components**:
- Node.js 22 LTS
- Crawlee framework
- Playwright (Chromium, Firefox, WebKit browsers)
- 2Captcha integration
- Proxy rotation system

**Responsibilities**:
- Scrape gold prices from multiple exchanges
- Collect market sentiment data (MyFxBook, Dukascopy, FXSSI)
- Fetch economic calendar events (Trading Economics, Investing.com)
- Scrape financial news (Reuters, Kitco, Bloomberg)
- Handle CAPTCHAs and anti-bot measures
- Send structured data to LXC 1 via API

**Why Separate Container**:
- Isolates resource-heavy browser processes
- Allows independent scaling
- Prevents browser crashes from affecting main application
- Easier to restart/update without downtime

---

### LXC 3: MiroFlow AI Agent

**Purpose**: AI-powered research and gold price predictions

**Specifications**:
- **OS**: Debian 12 or Ubuntu 22.04 LTS
- **CPU**: 4-8 vCPU (for concurrent agent operations)
- **RAM**: 16-32 GB (LLM inference if using local models)
- **Disk**: 40-100 GB (depends on model storage)
- **GPU**: Optional RTX 4090 or similar (if using MiroThinker locally)
- **Features**: `nesting=1`, `keyctl=1`
- **Network**: Bridge with outbound internet (API access)

**Components**:
- Python 3.11+
- MiroFlow framework
- LLM clients (OpenAI GPT, Anthropic Claude, or local MiroThinker)
- Research tools (Google Search, web scraping, reasoning)
- Model Context Protocol (MCP) servers

**Responsibilities**:
- Analyze collected data for patterns
- Research current events affecting gold prices
- Generate price predictions with confidence scores
- Provide detailed reasoning for predictions
- Answer complex queries about gold market trends

**Why Separate Container**:
- Resource isolation (AI workloads are compute-intensive)
- Independent scaling based on prediction demand
- Can run GPU passthrough if using local models
- Enables independent updates to AI models

---

### LXC Container Summary Table

| Container | Purpose | CPU | RAM | Disk | Key Software |
|-----------|---------|-----|-----|------|--------------|
| **LXC 1** | Web App + API | 2-4 vCPU | 4-8 GB | 20-40 GB | Node.js, Express, Vite, PostgreSQL |
| **LXC 2** | Data Scraper | 4-6 vCPU | 8-16 GB | 20-30 GB | Node.js, Crawlee, Playwright, 2Captcha |
| **LXC 3** | AI Predictions | 4-8 vCPU | 16-32 GB | 40-100 GB | Python, MiroFlow, LLM APIs/Models |

**Total Resources**: 10-18 vCPU, 28-56 GB RAM, 80-170 GB Disk

> [!TIP]
> Start with lower resource allocations and scale up based on actual usage. Proxmox allows dynamic resource adjustment without rebuilding containers.

---

## 🔄 Inter-Container Communication

### Network Architecture Options

**Option 1: Shared Bridge (Simpler)**
- All 3 containers on same Proxmox bridge (e.g., `vmbr0`)
- Assign static IPs or use DNS
- Containers communicate via HTTP APIs
- Example: 
  - LXC 1: `192.168.1.101`
  - LXC 2: `192.168.1.102`
  - LXC 3: `192.168.1.103`

**Option 2: Dedicated Internal Network (More Secure)**
- Create separate bridge for internal communication
- Public bridge for LXC 1 only (user-facing)
- Internal bridge for all 3 containers
- More secure, reduces attack surface

### API Endpoints

**LXC 2 (Scraper) exposes**:
```
POST /scrape/sentiment     → Scrape market sentiment
POST /scrape/prices        → Fetch latest gold prices  
POST /scrape/news          → Get recent news
POST /scrape/calendar      → Economic calendar events
GET  /health               → Health check
```

**LXC 3 (MiroFlow) exposes**:
```
POST /predict              → Generate gold price prediction
POST /research             → Deep research on topic
POST /analyze              → Analyze provided data
GET  /health               → Health check
```

**LXC 1 (Web App) consumes both APIs**

---

## 🎨 Updated Architecture with Core Stack

- **Data Collection**: Crawlee (TypeScript) + PlaywrightCrawler for JS-rendered pages, CheerioCrawler for static/HTML pages
- **AI Prediction**: MiroFlow multi-agent system with hierarchical orchestration
- **Anti-bot**: Browser fingerprints (Crawlee), rotating proxies, realistic headers/user agents, randomized timing
- **CAPTCHA**: 2Captcha integration (reCAPTCHA v2/v3, hCaptcha, Cloudflare Turnstile) with detection, provider request/polling, and token injection
- **Data layer**: Structured outputs with schemas for SentimentData, EconomicCalendarEvent, and ScrapedNews. PostgreSQL persistence via Drizzle
- **Observability**: Structured logs, error counters, success rates, latency metrics, and per-source parse completeness

### Proposed Project Structure (server side)

```
server/services/scraping/
  core/
    config.ts              # Env + typed config
    schemas.ts             # Zod schemas for outputs
    crawlerBase.ts         # Common crawler settings (Playwright/Cheerio), proxies, fingerprints
    errorHandling.ts       # Standardized retry/backoff and failure handling
    rateLimiter.ts         # Per-host throttling and concurrency
  captcha/
    detect.ts              # Detect reCAPTCHA v2/v3, hCaptcha, Turnstile
    twoCaptcha.ts          # 2Captcha API wrapper (solve & poll)
    inject.ts              # Token injection utilities per CAPTCHA type
  sentiment/
    myfxbook.ts
    dukascopy.ts
    fxssi.ts
    index.ts               # fetchAllSentiment(), calculateAverageSentiment()
  fundamentals/
    tradingEconomics.ts
    fred.ts                # optional
    worldGoldCouncil.ts    # optional
  news/
    reuters.ts
    kitco.ts
    bloomberg.ts           # optional
    index.ts               # scrapeAllNews()
  prices/
    kitco.ts               # Live gold prices
    investing.ts           # Gold spot prices
    goldprice.ts           # Gold price org
  social/
    twitter.ts             # only if ToS permits, otherwise use official APIs
    reddit.ts              # optional

miroflow/
  client/
    api.ts                 # MiroFlow API client
    types.ts               # TypeScript types
  services/
    prediction.ts          # Gold prediction service
    research.ts            # Research orchestration
    analysis.ts            # Data analysis
```

Routers (`server/routers/*.ts`) will call new service functions and return structured data.

## Environment & Configuration

Create/update `.env`:

```
NODE_ENV=production
PLAYWRIGHT_HEADLESS=true
CRAWLEE_MAX_CONCURRENCY=6
CRAWLEE_NAVIGATION_TIMEOUT_MS=45000
CRAWLEE_MAX_REQUEST_RETRIES=3

PROXY_URLS=http://user:pass@proxy1:port,http://user:pass@proxy2:port

CAPTCHA_PROVIDER=2captcha
CAPTCHA_API_KEY=your-2captcha-key
CAPTCHA_POLL_INTERVAL_MS=3000
CAPTCHA_MAX_WAIT_MS=120000

LOG_LEVEL=info
```

Note: Keep secrets in a secure store for production. In LXC, use `/etc/environment` or a dedicated secrets file with appropriate permissions.

---

## 🤖 MiroFlow Integration

### Overview

MiroFlow is added as a separate Python-based service that provides AI-powered predictions and research capabilities. It runs independently in LXC 3 and communicates with the main application via REST API.

### MiroFlow Environment Variables

Add to LXC 3's `.env`:

```bash
# LLM Provider Selection
MIROFLOW_LLM_PROVIDER=openai         # Options: openai, anthropic, google, mirothinker
OPENAI_API_KEY=sk-...                # If using OpenAI
ANTHROPIC_API_KEY=sk-ant-...         # If using Anthropic Claude
GOOGLE_API_KEY=...                   # If using Google Gemini

# MiroFlow Configuration
MIROFLOW_PORT=8080
MIROFLOW_MAX_WORKERS=4
MIROFLOW_RESEARCH_DEPTH=3            # 1-5, higher = more thorough
MIROFLOW_CONFIDENCE_THRESHOLD=0.7

# Tool Configuration
GOOGLE_SEARCH_API_KEY=...            # For web search
GOOGLE_SEARCH_ENGINE_ID=...
ENABLE_BROWSER_TOOL=true             # For web scraping in research
ENABLE_PYTHON_TOOL=true              # For data analysis

# Optional: Local Model (if using MiroThinker)
MIROTHINKER_MODEL_PATH=/opt/models/mirothinker
GPU_DEVICE=cuda:0
```

### MiroFlow Setup (LXC 3)

```bash
# Install Python 3.11+
apt update && apt install -y python3.11 python3.11-venv python3-pip git

# Create virtual environment
cd /opt
python3.11 -m venv miroflow-env
source miroflow-env/bin/activate

# Clone and install MiroFlow
git clone https://github.com/MiroMindAI/MiroFlow.git
cd MiroFlow
pip install -r requirements.txt
pip install -e .

# Install Playwright for browser automation (used by MiroFlow)
playwright install --with-deps

# Copy and configure environment
cp .env.template .env
# Edit .env with your API keys and settings

# Test installation
python main.py --help
```

### MiroFlow API Server

Create a FastAPI wrapper for MiroFlow in `/opt/MiroFlow/api_server.py`:

```python
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional, Dict
import asyncio
from src.agent import MiroFlowAgent

app = FastAPI(title="MiroFlow Gold Prediction API")

class PredictionRequest(BaseModel):
    data: Dict  # Historical prices, sentiment, news, etc.
    forecast_days: int = 7
    include_reasoning: bool = True

class PredictionResponse(BaseModel):
    prediction: Dict
    confidence: float
    reasoning: str
    research_summary: Optional[str]

@app.post("/predict", response_model=PredictionResponse)
async def generate_prediction(request: PredictionRequest):
    """Generate gold price prediction using MiroFlow"""
    try:
        agent = MiroFlowAgent(
            provider=os.getenv("MIROFLOW_LLM_PROVIDER", "openai"),
            model="gpt-4" if os.getenv("MIROFLOW_LLM_PROVIDER") == "openai" else "claude-3-sonnet"
        )
        
        prompt = f"""
        Analyze the following gold market data and generate a price prediction:
        
        Historical Data: {request.data}
        Forecast Period: {request.forecast_days} days
        
        Conduct deep research on:
        1. Current geopolitical events affecting gold
        2. Economic indicators (inflation, interest rates, USD strength)
        3. Market sentiment and technical patterns
        4. Supply and demand factors
        
        Provide:
        - Price prediction with confidence score
        - Detailed reasoning for the prediction
        - Key factors influencing the forecast
        """
        
        result = await agent.run(prompt)
        
        return PredictionResponse(
            prediction=result.get("prediction", {}),
            confidence=result.get("confidence", 0.0),
            reasoning=result.get("reasoning", ""),
            research_summary=result.get("summary", None)
        )
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "miroflow"}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8080)
```

Run with systemd:

```ini
# /etc/systemd/system/miroflow.service
[Unit]
Description=MiroFlow AI Prediction Service
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/MiroFlow
Environment="PATH=/opt/miroflow-env/bin:$PATH"
EnvironmentFile=/opt/MiroFlow/.env
ExecStart=/opt/miroflow-env/bin/python api_server.py
Restart=always
RestartSec=10
User=miroflow

[Install]
WantedBy=multi-user.target
```

### Calling MiroFlow from Node.js (LXC 1)

```typescript
// server/services/miroflow/client.ts
import axios from 'axios';

const MIROFLOW_URL = process.env.MIROFLOW_API_URL || 'http://192.168.1.103:8080';

export interface GoldPrediction {
  prediction: {
    targetPrice: number;
    priceRange: { min: number; max: number };
    trend: 'bullish' | 'bearish' | 'neutral';
    timeframe: string;
  };
  confidence: number;
  reasoning: string;
  researchSummary?: string;
}

export async function generateGoldPrediction(data: {
  prices: any[];
  sentiment: any[];
  news: any[];
  forecastDays?: number;
}): Promise<GoldPrediction> {
  try {
    const response = await axios.post(`${MIROFLOW_URL}/predict`, {
      data,
      forecast_days: data.forecastDays || 7,
      include_reasoning: true,
    }, {
      timeout: 120000, // 2 minutes (AI research takes time)
    });
    
    return response.data;
  } catch (error) {
    console.error('MiroFlow prediction error:', error);
    throw new Error('Failed to generate AI prediction');
  }
}

export async function checkMiroFlowHealth(): Promise<boolean> {
  try {
    const response = await axios.get(`${MIROFLOW_URL}/health`, { timeout: 5000 });
    return response.data.status === 'healthy';
  } catch {
    return false;
  }
}
```

### Why MiroFlow for Gold Predictions?

1. **State-of-the-Art Performance**: #1 on FutureX benchmark for future event prediction
2. **Deep Research**: Autonomously researches current events, geopolitics, economic factors
3. **Multi-Source Analysis**: Combines your scraped data with real-time web research
4. **Explainable AI**: Provides detailed reasoning for predictions
5. **Adaptive**: Continuously learns from new data and events

---

## Environment & Configuration

Create/update `.env` for **LXC 1** (Web App):

```bash
NODE_ENV=production

# Database
DATABASE_URL=postgresql://user:pass@localhost:5432/xauusd

# MiroFlow API
MIROFLOW_API_URL=http://192.168.1.103:8080

# Scraper API
SCRAPER_API_URL=http://192.168.1.102:3001

LOG_LEVEL=info
```

## Core Implementation Details

### PlaywrightCrawler baseline (TypeScript outline)

```ts
// server/services/scraping/core/crawlerBase.ts
import { PlaywrightCrawler, ProxyConfiguration } from 'crawlee';

export function createPlaywrightCrawler(opts?: Partial<ConstructorParameters<typeof PlaywrightCrawler>[0]>) {
  const proxyConfiguration = new ProxyConfiguration({
    proxyUrls: process.env.PROXY_URLS?.split(',').map(s => s.trim()).filter(Boolean) ?? [],
  });

  const crawler = new PlaywrightCrawler({
    proxyConfiguration,
    headless: process.env.PLAYWRIGHT_HEADLESS !== 'false',
    maxConcurrency: Number(process.env.CRAWLEE_MAX_CONCURRENCY ?? 6),
    maxRequestRetries: Number(process.env.CRAWLEE_MAX_REQUEST_RETRIES ?? 3),
    browserPoolOptions: { useFingerprints: true },
    navigationTimeoutSecs: Number(process.env.CRAWLEE_NAVIGATION_TIMEOUT_MS ?? 45000) / 1000,
    ...opts,
  });

  return crawler;
}
```

### CAPTCHA detection + 2Captcha integration (TypeScript outline)

```ts
// server/services/scraping/captcha/detect.ts
import type { Page } from 'playwright';

export type CaptchaType = 'recaptcha_v2' | 'recaptcha_v3' | 'hcaptcha' | 'turnstile';

export async function detectCaptcha(page: Page): Promise<{ type: CaptchaType; sitekey: string } | null> {
  // reCAPTCHA v2
  const v2Key = await page.locator('.g-recaptcha').first().getAttribute('data-sitekey').catch(() => null)
    || await page.locator('iframe[src*="google.com/recaptcha/api2"]').first().evaluate(el => new URL(el.src).searchParams.get('k')).catch(() => null);
  if (v2Key) return { type: 'recaptcha_v2', sitekey: v2Key };

  // hCaptcha
  const hKey = await page.locator('.h-captcha').first().getAttribute('data-sitekey').catch(() => null)
    || await page.locator('iframe[src*="hcaptcha.com"]').first().evaluate(el => new URL(el.src).searchParams.get('sitekey')).catch(() => null);
  if (hKey) return { type: 'hcaptcha', sitekey: hKey };

  // Cloudflare Turnstile
  const tKey = await page.locator('iframe[src*="challenges.cloudflare.com"]').first()
    .evaluate(el => new URL(el.src).searchParams.get('k')).catch(() => null);
  if (tKey) return { type: 'turnstile', sitekey: tKey };

  // reCAPTCHA v3 often requires site-specific parsing; add custom detection per site if needed.
  return null;
}

// server/services/scraping/captcha/twoCaptcha.ts
import axios from 'axios';

const API_KEY = process.env.CAPTCHA_API_KEY ?? '';
const POLL_MS = Number(process.env.CAPTCHA_POLL_INTERVAL_MS ?? 3000);
const MAX_WAIT_MS = Number(process.env.CAPTCHA_MAX_WAIT_MS ?? 120000);

export async function solveWith2Captcha(type: 'recaptcha_v2' | 'recaptcha_v3' | 'hcaptcha' | 'turnstile', sitekey: string, pageurl: string, extra?: Record<string, string>) {
  if (!API_KEY) throw new Error('2Captcha API key missing');
  const params: Record<string, string> = {
    key: API_KEY,
    method: type === 'hcaptcha' ? 'hcaptcha' : type === 'turnstile' ? 'turnstile' : 'userrecaptcha',
    googlekey: sitekey,
    pageurl,
    json: '1',
    soft_id: '3340', // optional affiliate ID
    ...extra,
  };

  // For v3: include version=v3 and action/min_score if known
  if (type === 'recaptcha_v3') Object.assign(params, { version: 'v3', action: extra?.action ?? 'verify', min_score: extra?.min_score ?? '0.3' });

  const inRes = await axios.get('https://2captcha.com/in.php', { params });
  if (inRes.data.status !== 1) throw new Error(`2Captcha in.php error: ${inRes.data.request}`);
  const id = inRes.data.request;

  const start = Date.now();
  while (Date.now() - start < MAX_WAIT_MS) {
    await new Promise(r => setTimeout(r, POLL_MS));
    const res = await axios.get('https://2captcha.com/res.php', { params: { key: API_KEY, action: 'get', id, json: 1 } });
    if (res.data.status === 1) return String(res.data.request);
    if (res.data.request !== 'CAPCHA_NOT_READY') throw new Error(`2Captcha res.php error: ${res.data.request}`);
  }
  throw new Error('2Captcha timeout');
}

// server/services/scraping/captcha/inject.ts
import type { Page } from 'playwright';
import type { CaptchaType } from './detect';

export async function injectToken(page: Page, type: CaptchaType, token: string) {
  if (type === 'recaptcha_v2') {
    await page.evaluate((t) => {
      const textarea = document.createElement('textarea');
      textarea.name = 'g-recaptcha-response';
      textarea.style.display = 'none';
      textarea.value = t;
      document.body.appendChild(textarea);
      const hidden = document.querySelector('input[name="g-recaptcha-response"]') as HTMLInputElement | null;
      if (hidden) hidden.value = t;
      document.dispatchEvent(new Event('change'));
    }, token);
  } else if (type === 'hcaptcha') {
    await page.evaluate((t) => {
      const textarea = document.createElement('textarea');
      textarea.name = 'h-captcha-response';
      textarea.style.display = 'none';
      textarea.value = t;
      document.body.appendChild(textarea);
      document.dispatchEvent(new Event('change'));
    }, token);
  } else if (type === 'turnstile') {
    await page.evaluate((t) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'cf-turnstile-response';
      input.value = t;
      document.body.appendChild(input);
      document.dispatchEvent(new Event('change'));
    }, token);
  } else if (type === 'recaptcha_v3') {
    await page.evaluate((t) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = 'g-recaptcha-response';
      input.value = t;
      document.body.appendChild(input);
    }, token);
  }
}
```

### Usage in a crawler request handler (outline)

```ts
import { detectCaptcha } from '../captcha/detect';
import { solveWith2Captcha } from '../captcha/twoCaptcha';
import { injectToken } from '../captcha/inject';

// inside requestHandler
const cap = await detectCaptcha(page);
if (cap) {
  const token = await solveWith2Captcha(cap.type, cap.sitekey, request.url);
  await injectToken(page, cap.type, token);
  await Promise.race([
    page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => null),
    page.waitForTimeout(2000),
  ]);
}
```

## Error Handling, Retries, and Rate Limiting

- Configure `maxRequestRetries`, exponential backoff, and per-host rate limits.
- Distinguish parse errors, anti-bot errors, HTTP errors, and CAPTCHA failures; log with source and URL.
- Add circuit breakers: temporarily pause crawling of hosts with high block rates.
- Persist failed request metadata for later inspection.

## Data Output and Validation

- Define Zod schemas for:
  - `SentimentData`: symbol, source, longPercentage, shortPercentage, volume?, longPositions?, shortPositions?, timestamp.
  - `EconomicCalendarEvent`: id, source, title, country?, impact?, eventTime, forecast?, previous?, actual?.
  - `ScrapedNews`: id, sourceId, title, content?, url?, author?, publishedAt?, scrapedAt.
- Validate before returning to routers; include `sourceCount` and averages for sentiment aggregation.

## Proxmox LXC Deployment Plan

### Container creation (Debian 12 recommended)

1. In Proxmox UI or CLI, download Debian 12 template (e.g., `debian-12-standard`).
2. Create an unprivileged LXC container:
   - Features: `nesting=1`, `keyctl=1`.
   - Resources: CPU 2–4 vCPU, RAM 4–8 GB (depending on concurrency).
   - Disk: 10–20 GB.
   - Network: veth + outbound internet access.
3. Start the container and access shell.

### System setup inside LXC

```bash
apt update && apt -y upgrade
apt -y install curl ca-certificates git unzip build-essential

# Install Node.js 22 LTS (NodeSource)
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt -y install nodejs

# Enable corepack for pnpm
corepack enable

# Optional: create non-root app user
useradd -m -s /bin/bash appuser || true
mkdir -p /opt/xpa && chown -R appuser:appuser /opt/xpa

# Clone or copy project into /opt/xpa
cd /opt/xpa

# Install Playwright and its OS dependencies
npx playwright install --with-deps

# Fonts (for better rendering) — optional but recommended
apt -y install fonts-noto fonts-noto-color-emoji fonts-liberation
```

### App deployment workflow

1. Copy environment file to LXC (`/opt/xpa/.env` or `/etc/environment`).
2. Install dependencies: `pnpm install` (or `npm ci`).
3. Build if needed: `pnpm build`.
4. Run scrapers via Node (systemd or PM2):

```bash
# systemd unit example: /etc/systemd/system/xpa-scraper.service
[Unit]
Description=XPA Crawlee Scraper Service
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/xpa
EnvironmentFile=/opt/xpa/.env
ExecStart=/usr/bin/node ./server/index.js
Restart=always
RestartSec=5
User=appuser

[Install]
WantedBy=multi-user.target

systemctl daemon-reload
systemctl enable --now xpa-scraper
```

### Proxies and networking

- Confirm outbound proxy reachability from LXC (`curl https://api.ipify.org` via proxy).
- Use residential/mobile proxies when permissible for reduced CAPTCHA frequency.

## Implementation Phases & Tasks

### Phase 0 — Planning & Schemas ✅
- [x] Define hybrid architecture (Crawlee + MiroFlow)
- [x] Plan 3-container LXC deployment
- [x] Define Zod schemas for sentiment, fundamentals, news outputs
- [ ] Confirm target sources and ToS-compliant scraping approach

### Phase 1 — LXC Infrastructure Setup
**LXC 1: Web Application**
- [ ] Provision Debian 12 LXC (2-4 vCPU, 4-8 GB RAM, 20-40 GB disk)
- [ ] Install Node.js 22 LTS
- [ ] Set up PostgreSQL database
- [ ] Configure network and static IP

**LXC 2: Scraper Service**
- [ ] Provision Debian 12 LXC (4-6 vCPU, 8-16 GB RAM, 20-30 GB disk)
- [ ] Install Node.js 22 LTS
- [ ] Install Playwright + OS dependencies
- [ ] Configure proxies and network
- [ ] Configure `.env` secrets (2Captcha key, proxies)

**LXC 3: MiroFlow AI**
- [ ] Provision Debian 12 LXC (4-8 vCPU, 16-32 GB RAM, 40-100 GB disk)
- [ ] Install Python 3.11+
- [ ] Clone and install MiroFlow
- [ ] Install Playwright for MiroFlow
- [ ] Configure LLM API keys (OpenAI/Anthropic/Google)
- [ ] Set up Google Search API
- [ ] Test MiroFlow installation

**Network Configuration**
- [ ] Set up internal bridge network or configure vmbr0
- [ ] Assign static IPs to all containers
- [ ] Configure firewall rules
- [ ] Test inter-container communication

### Phase 2 — Core Scaffolding (LXC 2: Scraper)
- [ ] Implement `crawlerBase.ts`, `config.ts`, `errorHandling.ts`, `rateLimiter.ts`
- [ ] Implement CAPTCHA modules: `detect.ts`, `twoCaptcha.ts`, `inject.ts`
- [ ] Create API server for scraper service (Express)
- [ ] Set up systemd service for scraper

### Phase 3 — Sentiment Scrapers (LXC 2)
- [ ] Implement MyFxBook scraper with cookie handling, selectors + fallbacks
- [ ] Implement Dukascopy scraper
- [ ] Implement FXSSI scraper
- [ ] Add CAPTCHA solve path and retry logic
- [ ] Implement `fetchAllSentiment()` + aggregation
- [ ] Create `/scrape/sentiment` endpoint

### Phase 4 — Price Scrapers (LXC 2)
- [ ] Implement Kitco live gold price scraper
- [ ] Implement Investing.com spot price scraper
- [ ] Implement GoldPrice.org scraper
- [ ] Aggregate prices from multiple sources
- [ ] Create `/scrape/prices` endpoint

### Phase 5 — Fundamentals Scrapers (LXC 2)
- [ ] Implement Trading Economics scraper (CheerioCrawler preferred, Playwright fallback)
- [ ] Add optional sources (FRED, World Gold Council)
- [ ] Create `/scrape/calendar` endpoint

### Phase 6 — News Scrapers (LXC 2)
- [ ] Implement Reuters news scraper
- [ ] Implement Kitco news scraper
- [ ] Implement Bloomberg scraper (optional)
- [ ] Normalize outputs across sources
- [ ] Create `/scrape/news` endpoint

### Phase 7 — Social Research (LXC 2, Optional)
- [ ] Implement Twitter/X scraper with login flows (if ToS compliant)
- [ ] Implement Reddit scraper (r/investing, r/gold)
- [ ] Strict rate limiting and proxy rotation
- [ ] Prefer official APIs where available

### Phase 8 — MiroFlow Integration (LXC 3)
- [ ] Create FastAPI wrapper for MiroFlow (`api_server.py`)
- [ ] Implement `/predict` endpoint for gold predictions
- [ ] Implement `/research` endpoint for deep research
- [ ] Implement `/analyze` endpoint for data analysis
- [ ] Set up systemd service for MiroFlow API
- [ ] Test predictions with sample data

### Phase 9 — Web App Integration (LXC 1)
- [ ] Create MiroFlow client (`server/services/miroflow/client.ts`)
- [ ] Create Scraper client (`server/services/scraper/client.ts`)
- [ ] Update API routers to use new services
- [ ] Implement caching for predictions
- [ ] Add health check endpoints
- [ ] Replace old scrapers with new module exports

### Phase 10 — Observability & Benchmarks
- [ ] Add logging, metrics, error counters, and latencies (all containers)
- [ ] Set up centralized logging (optional: ELK stack or Loki)
- [ ] Run benchmarks: success rates, time-to-data, output completeness
- [ ] Monitor MiroFlow prediction accuracy
- [ ] Set up alerts for service failures

### Phase 11 — Testing & Validation
- [ ] Test scraper endpoints independently
- [ ] Test MiroFlow predictions with various data inputs
- [ ] Integration test: Full pipeline from scraping → prediction
- [ ] Load testing on all containers
- [ ] Failover testing (container restarts)
- [ ] Network isolation testing

### Phase 12 — Migration & Rollout
- [ ] Stage rollout with feature flags
- [ ] Monitor metrics and error rates
- [ ] Backstop with fallbacks to old services
- [ ] Gradual migration of traffic
- [ ] Full cutover after validation

---

## Deployment Steps for Each LXC

### LXC 1 Deployment (Web App)

```bash
# Initial setup
apt update && apt -y upgrade
apt -y install curl ca-certificates git build-essential

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt -y install nodejs

# Enable corepack for pnpm
corepack enable

# Install PostgreSQL
apt -y install postgresql postgresql-contrib
sudo -u postgres psql -c "CREATE DATABASE xauusd;"
sudo -u postgres psql -c "CREATE USER xauuser WITH PASSWORD 'yourpassword';"
sudo -u postgres psql -c "GRANT ALL PRIVILEGES ON DATABASE xauusd TO xauuser;"

# Clone project
mkdir -p /opt/xauusd && cd /opt/xauusd
# (Copy your project files here)

# Install dependencies and build
pnpm install
pnpm build

# Set up systemd service
# (Use the systemd config from existing plan)
systemctl enable --now xauusd-app
```

### LXC 2 Deployment (Scraper)

```bash
# System setup
apt update && apt -y upgrade
apt -y install curl ca-certificates git unzip build-essential

# Install Node.js 22
curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
apt -y install nodejs
corepack enable

# Create app directory
mkdir -p /opt/scraper && cd /opt/scraper

# Install Playwright and dependencies
npx playwright install --with-deps
apt -y install fonts-noto fonts-noto-color-emoji fonts-liberation

# Copy scraper code and install
pnpm install

# Create scraper service
cat > /etc/systemd/system/scraper.service << 'EOF'
[Unit]
Description=XAUUSD Scraper Service
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/scraper
EnvironmentFile=/opt/scraper/.env
ExecStart=/usr/bin/node ./dist/server.js
Restart=always
RestartSec=5
User=scraper

[Install]
WantedBy=multi-user.target
EOF

systemctl daemon-reload
systemctl enable --now scraper
```

### LXC 3 Deployment (MiroFlow)

```bash
# System setup
apt update && apt -y upgrade
apt -y install python3.11 python3.11-venv python3-pip git curl

# Install additional dependencies
apt -y install build-essential libssl-dev libffi-dev python3-dev

# Create app directory and virtual environment
cd /opt
python3.11 -m venv miroflow-env
source miroflow-env/bin/activate

# Clone MiroFlow
git clone https://github.com/MiroMindAI/MiroFlow.git
cd MiroFlow

# Install dependencies
pip install --upgrade pip
pip install -r requirements.txt
pip install -e .
pip install fastapi uvicorn[standard]

# Install Playwright for browser tools
playwright install --with-deps

# Create API server (use the code from MiroFlow Integration section)
# Copy api_server.py to /opt/MiroFlow/

# Set up environment
cp .env.template .env
# Edit .env with your configurations

# Create MiroFlow service
cat > /etc/systemd/system/miroflow.service << 'EOF'
[Unit]
Description=MiroFlow AI Prediction Service
After=network.target

[Service]
Type=simple
WorkingDirectory=/opt/MiroFlow
Environment="PATH=/opt/miroflow-env/bin:$PATH"
EnvironmentFile=/opt/MiroFlow/.env
ExecStart=/opt/miroflow-env/bin/python api_server.py
Restart=always
RestartSec=10
User=miroflow

[Install]
WantedBy=multi-user.target
EOF

# Create miroflow user
useradd -r -s /bin/false miroflow
chown -R miroflow:miroflow /opt/MiroFlow /opt/miroflow-env

# Start service
systemctl daemon-reload
systemctl enable --now miroflow
```

---

## Benchmarks & Acceptance Criteria

- Throughput: >= 2× baseline for static pages with CheerioCrawler; >= 1.5× successful extractions for JS pages.
- Stability: < 2% unhandled failures per source; retries cover transient errors.
- Data quality: >= 98% schema validation pass rate on structured outputs.
- Anti-bot resilience: measurable reduction in immediate blocks and CAPTCHA frequency vs baseline.

## Risks & Mitigations

- CAPTCHA variability (v3 scores): Implement site-specific handling and accept variability; escalate to alternate sources when needed.
- Legal/ToS: Respect site policies; prefer official APIs where available.
- Proxy reliability: Use multiple providers; add health checks and rotation.
- Dynamic UI changes: Use robust selectors; implement text-based fallbacks; add alerts for parse drop-offs.

## Rollback Plan

- Keep old scrapers callable behind a feature flag for one release cycle.
- On severe failures, revert to previous services and pause new crawlers.

## Example: Sentiment request handler integrating CAPTCHA (outline)

```ts
import { PlaywrightCrawler } from 'crawlee';
import { detectCaptcha } from '../captcha/detect';
import { solveWith2Captcha } from '../captcha/twoCaptcha';
import { injectToken } from '../captcha/inject';

const crawler = new PlaywrightCrawler({
  // ... base options (see crawlerBase.ts)
  requestHandler: async ({ page, request, log }) => {
    // Consent/cookie banners (best-effort)
    await page.evaluate(() => {
      const candidates = Array.from(document.querySelectorAll('button, a, [role="button"], .cc-accept, .cookie-accept')) as HTMLElement[];
      candidates.find(el => /accept|agree|ok|allow all|i agree/i.test(el.textContent || '') || /accept|agree|cookie/i.test(el.className || ''))?.click?.();
    }).catch(() => {});

    const cap = await detectCaptcha(page);
    if (cap) {
      const token = await solveWith2Captcha(cap.type, cap.sitekey, request.url);
      await injectToken(page, cap.type, token);
      await Promise.race([
        page.waitForNavigation({ waitUntil: 'networkidle', timeout: 15000 }).catch(() => null),
        page.waitForTimeout(2000),
      ]);
      log.info(`CAPTCHA solved: ${cap.type}`);
    }

    // TODO: extract sentiment fields, validate with Zod, push data
  },
  failedRequestHandler: async ({ request, log }) => {
    log.error(`Failed after retries: ${request.url}`);
  },
});
```

## Timeline (Indicative)

### Initial Setup Phase (Week 1-2)
- **Week 1**: LXC provisioning for all 3 containers, network setup, base OS configuration
- **Week 2**: Install Node.js/Python environments, Playwright, MiroFlow, database setup

### Development Phase (Week 3-6)
- **Week 3**: Core scraper scaffolding (LXC 2), CAPTCHA integration, sentiment scrapers
- **Week 4**: Price and fundamentals scrapers, news scrapers
- **Week 5**: MiroFlow integration (LXC 3), API wrapper, test predictions
- **Week 6**: Web app integration (LXC 1), client libraries, API routing updates

### Testing & Optimization Phase (Week 7-8)
- **Week 7**: Testing all endpoints, integration testing, load testing
- **Week 8**: Observability setup, benchmarking, optimization

### Deployment Phase (Week 9)
- Staged rollout with feature flags
- Monitoring and validation
- Full migration and cutover

**Total Estimated Timeline: 9-10 weeks**

---

## Cost Analysis

### Infrastructure Costs

**Proxmox Server Requirements**:
- Total vCPU needed: 10-18 cores
- Total RAM: 28-56 GB
- Total Disk: 80-170 GB
- Typical server: Ryzen 9 or Intel Xeon with 32-64 GB RAM
- Cost: $1,000-3,000 (one-time) or cloud alternative ~$150-300/month

**API Services** (Monthly):
- 2Captcha: $3-10/1,000 CAPTCHAs (~$30-100/month depending on volume)
- OpenAI API (GPT-4): ~$100-500/month (for MiroFlow predictions)
  - Alternative: Use Anthropic Claude ($75-400/month) or Google Gemini ($50-300/month)
  - Budget option: Local MiroThinker model (requires RTX 4090, ~$1,500 one-time + $0/month API)
- Google Search API: $5/1,000 queries (~$20-50/month)
- Proxies (optional): $50-200/month for residential proxies

**Total Monthly Operating Cost**:
- With Cloud LLM APIs: $200-900/month
- With Local MiroThinker: $100-400/month (after initial GPU investment)

### Cost Optimization Options

1. **Use Local MiroThinker**: Deploy on LXC 3 with GPU passthrough (requires RTX 4090)
   - Saves $100-500/month on LLM API costs
   - One-time GPU cost: ~$1,500

2. **Use Cheaper LLM APIs**: Switch from GPT-4 to GPT-4o-mini, Claude Haiku, or Gemini Flash
   - Reduces API costs by 60-80%

3. **Cache Predictions**: Implement aggressive caching for predictions
   - Reduces redundant API calls

4. **Reduce Scraping Frequency**: Schedule scrapers instead of real-time
   - Reduces CAPTCHA solving costs

---

## Maintenance

### Daily
- Monitor service health across all 3 containers
- Check error rates and CAPTCHA solve rates
- Review MiroFlow prediction logs

### Weekly
- Analyze scraper success rates and parse completeness
- Update selectors if parse failures detected
- Review prediction accuracy metrics
- Backup databases

### Monthly
- Proxy service audits and rotation
- Update browser fingerprints and user agents
- Review and optimize resource usage (CPU, RAM, disk)
- Update Playwright browsers
- Security patches for all containers

### Quarterly
- Major selector updates for site-specific changes
- Performance benchmarking
- Cost analysis and optimization review
- MiroFlow model updates (if using local models)

---

## Quick Start Guide

### For Development/Testing (Minimal Setup)

If you just want to test locally before deploying to Proxmox:

```bash
# 1. Clone the project
git clone <your-repo>
cd XAUUSD-prediction-AI-agent

# 2. Install dependencies
pnpm install

# 3. Set up environment variables
cp .env.example .env
# Edit .env and add your API keys

# 4. Install Playwright
npx playwright install --with-deps

# 5. Start the development server
pnpm dev

# 6. In a separate terminal, clone and run MiroFlow
git clone https://github.com/MiroMindAI/MiroFlow.git
cd MiroFlow
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
pip install fastapi uvicorn
# Create api_server.py from the guide above
python api_server.py
```

This runs everything on your local machine for development. When ready for production, deploy to the 3 LXC containers as described above.

---

## Maintenance

- Weekly monitoring of success rates and parse completeness.
- Monthly proxy audits; update fingerprints/user agents.
- Add site-specific overrides when major UI changes occur.

---

Prepared to proceed with Phase 1 (LXC & environment) and Phase 2 (core scaffolding). Once approved, we will implement modules under `server/services/scraping/` and wire them to existing routers.