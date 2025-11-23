# XAUUSD Platform - Master Integration Plan

## Executive Summary

This document provides a **comprehensive, prioritized implementation roadmap** for building the complete XAUUSD Gold Prediction platform by integrating:

1. ✅ **Scraper Infrastructure** (Crawlee + Playwright + MiroFlow) - Data collection & AI predictions
2. ✅ **Dashboard** (TailAdmin) - Analytics and metrics visualization
3. ✅ **News System** (Hybrid scraping + APIs) - Financial news aggregation
4. ✅ **Trading Journal** (Deltalytix) - Trade logging and analysis
5. ✅ **Unified Theme** (Liquid Tinted iOS 26) - Consistent design across all components

**Timeline:** 12 weeks  
**Deployment:** 3 Proxmox LXC containers  
**Tech Stack:** Next.js 15, React 19, Tailwind CSS 4, Crawlee, Playwright, MiroFlow

---

## 🎯 Implementation Philosophy

### **Priorities:**

1. **Infrastructure First** - Set up LXC containers and data pipeline
2. **Core Functionality** - Get scraping and predictions working
3. **User Interface** - Build dashboard and news feed
4. **Enhanced Features** - Add trading journal and advanced analytics
5. **Polish** - Unify theme and optimize performance

### **Approach:**

- **Incremental deployment** - Each phase produces working features
- **Parallel development** - Multiple components can be built simultaneously
- **Testing at each phase** - Validate before moving forward
- **User feedback loop** - Test with real trading scenarios

---

## 📊 Phased Implementation Plan

### **Phase 1: Foundation & Infrastructure** (Weeks 1-2)

**Goal:** Set up all infrastructure and deploy base applications

#### **Week 1: Proxmox LXC Setup**

**LXC 1: Web Application Container**
```bash
# Provision container
- OS: Debian 12
- CPU: 2-4 vCPU
- RAM: 4-8 GB
- Disk: 20-40 GB
- Features: nesting=1, keyctl=1
```

**Tasks:**
- [ ] Create LXC 1 container
- [ ] Install Node.js 22 LTS
- [ ] Install pnpm
- [ ] Set up PostgreSQL database
- [ ] Configure static IP (e.g., 192.168.1.101)
- [ ] Clone Fumadocs project
- [ ] Run `pnpm install`
- [ ] Test dev server (`pnpm dev`)

**LXC 2: Scraper Container**
```bash
# Provision container
- OS: Debian 12
- CPU: 4-6 vCPU
- RAM: 8-16 GB
- Disk: 20-30 GB
```

**Tasks:**
- [ ] Create LXC 2 container
- [ ] Install Node.js 22 LTS
- [ ] Install Playwright + dependencies (`npx playwright install --with-deps`)
- [ ] Install fonts for better rendering
- [ ] Configure proxies (if available)
- [ ] Configure static IP (e.g., 192.168.1.102)
- [ ] Test Playwright installation

**LXC 3: MiroFlow AI Container**
```bash
# Provision container
- OS: Debian 12
- CPU: 4-8 vCPU
- RAM: 16-32 GB
- Disk: 40-100 GB
```

**Tasks:**
- [ ] Create LXC 3 container
- [ ] Install Python 3.11+
- [ ] Create virtual environment
- [ ] Clone MiroFlow repository
- [ ] Install dependencies (`pip install -r requirements.txt`)
- [ ] Install Playwright for MiroFlow
- [ ] Configure API keys (OpenAI/Anthropic/Google)
- [ ] Configure static IP (e.g., 192.168.1.103)
- [ ] Test MiroFlow installation

#### **Week 2: Network & Initial Deployment**

**Tasks:**
- [ ] Configure network bridge (vmbr0 or dedicated)
- [ ] Set up firewall rules
- [ ] Test inter-container communication
- [ ] Deploy Fumadocs to LXC 1
- [ ] Set up systemd services for all containers
- [ ] Configure Nginx/Caddy reverse proxy (if needed)
- [ ] Test access to web app from local network

**Deliverable:** All 3 LXC containers operational with base applications running

---

### **Phase 2: Data Collection Layer** (Weeks 3-5)

**Goal:** Implement scraping infrastructure and data collection

#### **Week 3: Core Scraper Framework**

**Reference:** ScraperImplementPlan.md - Phase 2

**Tasks in LXC 2:**
- [ ] Create project structure (server/services/scraping/core/)
- [ ] Implement base Crawlee configuration
- [ ] Set up 2Captcha integration
- [ ] Create Zod schemas for SentimentData, EconomicCalendarEvent, ScrapedNews, GoldPrice
- [ ] Test CAPTCHA solving with sample site

#### **Week 4: Sentiment & Price Scrapers**

**Tasks in LXC 2:**
- [ ] Implement sentiment scrapers (MyFxB ook, Dukascopy, FXSSI)
- [ ] Implement price scrapers (Kitco, Investing.com, GoldPrice.org)
- [ ] Create aggregation function: `fetchAllSentiment()`
- [ ] Create Express API server for scrapers
- [ ] Create endpoints: POST /scrape/sentiment, POST /scrape/prices
- [ ] Test scrapers individually

#### **Week 5: News Scrapers & Fundamentals**

**Reference:** NewsSystemRecommendations.md

**Tasks in LXC 2:**
- [ ] Implement news scrapers (Reuters, Kitco, Bloomberg)
- [ ] Implement fundamentals (Trading Economics)
- [ ] Add gold keyword filtering
- [ ] Create endpoint: POST /scrape/news
- [ ] Set up scheduled scraping (cron jobs)
- [ ] Test full scraping pipeline

**Alternative: News APIs**
- [ ] Sign up for Alpha Vantage (FREE)
- [ ] Sign up for Finnhub (FREE)
- [ ] Create API clients in LXC 1
- [ ] Test API integration

**Deliverable:** Fully functional scraper service collecting gold prices, sentiment, and news

---

### **Phase 3: AI Prediction Layer** (Week 6)

**Goal:** Integrate MiroFlow for AI-powered predictions

**Reference:** ScraperImplementPlan.md - Phase 8

#### **Week 6: MiroFlow Integration**

**Tasks in LXC 3:**
- [ ] Create FastAPI wrapper with endpoints: /predict, /research, /analyze, /health
- [ ] Implement gold prediction logic
- [ ] Test predictions with sample data
- [ ] Set up systemd service for MiroFlow API

**Tasks in LXC 1:**
- [ ] Create MiroFlow client (server/services/miroflow/client.ts)
- [ ] Implement `generateGoldPrediction()` function
- [ ] Test connection between LXC 1 and LXC 3
- [ ] Create prediction cache (Redis or in-memory)

**Deliverable:** Working AI prediction system generating gold forecasts

---

### **Phase 4: Dashboard Implementation** (Weeks 7-8)

**Goal:** Build analytics dashboard with real-time data

**Reference:** DashboardRecommendations.md

#### **Week 7: TailAdmin Setup & Theme Integration**

**Tasks in LXC 1:**
- [ ] Clone TailAdmin Next.js
- [ ] Extract dashboard components (MetricCard, ChartCard, DataTable, StatWidget)
- [ ] Create Liquid Tinted theme overrides (packages/ui/css/tailadmin-liquid.css)
- [ ] Apply theme tokens to TailAdmin components
- [ ] Test components in isolation

#### **Week 8: Dashboard Pages & Financial Charts**

**Tasks:**
- [ ] Create dashboard routes (dashboard/page.tsx, predictions/, analysis/)
- [ ] Install chart library (react-financial-charts or lightweight-charts)
- [ ] Create chart components (PriceChart, SentimentChart, PerformanceChart)
- [ ] Connect dashboard to scraper API (LXC 2)
- [ ] Connect dashboard to MiroFlow API (LXC 3)
- [ ] Implement real-time data updates

**Dashboard Features:**
- [ ] Current gold price (from scraper)
- [ ] Latest AI prediction (from MiroFlow)
- [ ] Market sentiment gauge
- [ ] News feed preview
- [ ] Performance metrics

**Deliverable:** Fully functional dashboard displaying live gold data and predictions

---

### **Phase 5: News System** (Week 9)

**Goal:** Build news aggregation and display system

**Reference:** NewsSystemRecommendations.md

#### **Week 9: News Page & Feed**

**Tasks in LXC 1:**
- [ ] Create news routes (news/page.tsx, [slug]/page.tsx)
- [ ] Create news components (NewsCard, NewsFeed, NewsFilter, SentimentBadge)
- [ ] Apply Liquid Tinted theme (packages/ui/css/news-liquid.css)
- [ ] Connect to scraper news endpoint
- [ ] Add MiroFlow news summarization
- [ ] Implement filtering (by source, sentiment, date)
- [ ] Add pagination

**News Features:**
- [ ] Real-time news feed
- [ ] Sentiment badges (bullish/bearish/neutral)
- [ ] AI-generated summaries
- [ ] Impact on gold indicators
- [ ] Related articles

**Deliverable:** News aggregation system with AI-enhanced articles

---

### **Phase 6: Trading Journal** (Week 10)

**Goal:** Implement trading journal for daily trade logging

**Reference:** TradingJournalRecommendations.md

#### **Week 10: Deltalytix Integration**

**Tasks in LXC 1:**
- [ ] Clone Deltalytix
- [ ] Extract journal components (journal routes, TradeForm, DiaryEditor, etc.)
- [ ] Apply Liquid Tinted theme (packages/ui/css/journal-liquid.css)
- [ ] Set up database schema (trades, diary_entries tables)

**Journal Features:**
- [ ] Manual trade entry
- [ ] CSV import from broker
- [ ] Daily diary with rich text editor
- [ ] Screenshot upload and annotation
- [ ] Performance analytics dashboard
- [ ] AI insights from MiroFlow

**Deliverable:** Full-featured trading journal with AI analysis

---

### **Phase 7: Unified Theme & Polish** (Week 11)

**Goal:** Apply consistent Liquid Tinted theme across all components

**Reference:** UnifiedThemePlan.md

#### **Week 11: Theme Unification**

**Tasks:**
- [ ] Create platform-specific tokens (packages/ui/css/xauusd-tokens.css)
- [ ] Define trading colors (gold, bullish, bearish)
- [ ] Update global.css with all theme imports
- [ ] Audit all components for theme consistency
- [ ] Update Tailwind config with custom tokens
- [ ] Test theme modes (light/dark/AMOLED)
- [ ] Optimize animations (ensure 60fps)
- [ ] Add loading states and skeletons
- [ ] Improve error messages and empty states
- [ ] Ensure accessibility (ARIA labels, keyboard nav)

**Deliverable:** Visually consistent, polished platform with premium iOS 26 aesthetic

---

### **Phase 8: Navigation & Integration** (Week 11-12)

**Goal:** Connect all components with unified navigation

#### **Week 11-12: Complete Integration**

**Tasks:**
- [ ] Create main navigation (Dashboard, News, Journal, Docs)
- [ ] Implement layout with sidebar
- [ ] Add breadcrumbs for all pages
- [ ] Add global search (fuzzy search across all content)
- [ ] Implement notifications system (breaking news alerts)
- [ ] Add shortcuts (e.g., Cmd+K for search)

**Integration Points:**
- [ ] Dashboard → News (click sentiment to see related news)
- [ ] News → Journal (log trade based on news)
- [ ] Journal → Dashboard (view trade on chart)
- [ ] All pages → MiroFlow (AI assistant via chat interface)

**Deliverable:** Fully integrated platform with seamless navigation

---

### **Phase 9: Testing & Optimization** (Week 12)

**Goal:** Comprehensive testing and performance optimization

#### **Week 12: Testing**

**Automated Tests:**
- [ ] Unit tests for scraper functions
- [ ] Integration tests for API endpoints
- [ ] E2E tests for critical user flows
- [ ] Visual regression tests

**Manual Testing:**
- [ ] Test all scraper sources
- [ ] Verify prediction accuracy
- [ ] Test theme modes on all pages
- [ ] Test responsive design (mobile, tablet, desktop)
- [ ] Test across browsers (Chrome, Safari, Firefox)
- [ ] Load testing (concurrent users)

**Performance Optimization:**
- [ ] Optimize images (WebP, lazy loading)
- [ ] Code splitting for faster initial load
- [ ] Cache API responses appropriately
- [ ] Minimize bundle size
- [ ] Optimize database queries

**Security:**
- [ ] Environment variables secured
- [ ] API rate limiting
- [ ] Input validation on all forms
- [ ] CORS configuration
- [ ] HTTPS enforcement

**Deliverable:** Production-ready platform passing all tests

---

## 🗓️ Implementation Timeline (Gantt Chart)

```
Week  Phase                   LXC 1        LXC 2        LXC 3
------------------------------------------------------------
1     Foundation              [Setup]      [Setup]      [Setup]
2     Deployment              [Deploy]     [Deploy]     [Deploy]
3     Data Collection         [Wait]       [Scrapers]   [Wait]
4     Scrapers                [API]        [Scrapers]   [Wait]
5     News                    [API]        [News]       [Wait]
6     AI Integration          [Client]     [Done]       [MiroFlow]
7     Dashboard               [Dashboard]  [Done]       [Done]
8     Dashboard Charts        [Charts]     [Done]       [Done]
9     News System             [News UI]    [Done]       [AI News]
10    Trading Journal         [Journal]    [Done]       [AI Insights]
11    Theme & Polish          [Theme]      [Done]       [Done]
12    Testing                 [Test All]   [Test]       [Test]
```

---

## 🚀 Quick Start (First Steps)

**This Week:**
1. ✅ Review all 5 documentation files
2. ⬜ Provision Proxmox LXC containers
3. ⬜ Set up LXC 1 with Fumadocs
4. ⬜ Test dev server runs successfully

**Next Week:**
1. ⬜ Set up LXC 2 and test Playwright
2. ⬜ Set up LXC 3 and test MiroFlow
3. ⬜ Implement first scraper (Kitco price)
4. ⬜ Test inter-container communication

---

## 📚 Reference Documents

| Component | Document | Location |
|-----------|----------|----------|
| **Scraper** | ScraperImplementPlan.md | docs/ folder |
| **Dashboard** | DashboardRecommendations.md | docs/ folder |
| **News** | NewsSystemRecommendations.md | docs/ folder |
| **Journal** | TradingJournalRecommendations.md | docs/ folder |
| **Theme** | UnifiedThemePlan.md | docs/ folder |

---

## ✅ Success Criteria

**Platform is ready when:**
- [ ] Dashboard shows live gold price and AI prediction
- [ ] News feed displays latest gold-related articles with sentiment
- [ ] Trading journal allows logging trades and viewing analytics
- [ ] All components use Liquid Tinted theme consistently
- [ ] All theme modes work (light/dark/AMOLED)
- [ ] Platform is responsive on mobile, tablet, desktop
- [ ] All API endpoints are functional and tested
- [ ] MiroFlow predictions are accurate and helpful
- [ ] Platform passes performance benchmarks (< 3s load time)
- [ ] Documentation is complete and up-to-date

---

## 🎓 Next Steps

**Ready to start?**

1. **Choose your sprint:** MVP Dashboard (fastest), or Full Platform (comprehensive)
2. **Provision LXC containers:** Start with LXC 1 for immediate progress
3. **Begin Phase 1:** Set up infrastructure and deploy base applications
4. **Follow the checklist:** Complete tasks sequentially within each phase
5. **Test at each milestone:** Ensure each phase works before moving on

Let's build an amazing XAUUSD prediction platform! 🚀📈
