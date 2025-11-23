# XAUUSD Gold News Aggregation System - Recommendations

## Overview

This document provides comprehensive recommendations for building a **financial news aggregation system** specifically for XAUUSD/Gold-related news. The system will:

- **Aggregate news** from multiple financial sources
- **Filter for gold/XAUUSD relevance** using AI or keywords
- **Display in a clean news feed** on your platform
- **Provide sentiment analysis** (bullish/bearish for gold)
- **Update in real-time** or scheduled intervals
- **Integrate with MiroFlow** for AI-powered news summarization

---

## 🎯 Dual Approach: Scraping + API Hybrid

Based on your ScraperImplementPlan.md (Crawlee + Playwright) and available solutions, I recommend a **hybrid approach**:

### **Approach 1: News Scraping (Crawlee + Playwright)** 
For sources without APIs (already planned in your scraper)

### **Approach 2: Financial News APIs**
For reliable, structured data with sentiment analysis

### **Approach 3: RSS Feed Aggregation**
For quick implementation and maintenance

---

## 📰 News Sources for XAUUSD/Gold

### **Primary Sources (High Impact on Gold)**

1. **Reuters - Commodities & Markets**
   - URL: `https://www.reuters.com/markets/commodities/`
   - Method: Scraping (Crawlee) or API
   - Coverage: Global news, central bank policy, inflation data

2. **Kitco News**
   - URL: `https://www.kitco.com/news/`
   - Method: Scraping (already in your plan)
   - Coverage: Gold-specific news, expert analysis

3. **Bloomberg Commodities**
   - URL: `https://www.bloomberg.com/markets/commodities`
   - Method: Scraping (premium) or Terminal API
   - Coverage: Institutional-grade gold market news

4. **World Gold Council**
   - URL: `https://www.gold.org/news-and-research`
   - Method: RSS Feed or scraping
   - Coverage: Supply/demand reports, industry insights

5. **FXStreet - Gold News**
   - URL: `https://www.fxstreet.com/precious-metals/gold`
   - Method: RSS Feed or FXStreet API
   - Coverage: Technical analysis, forecasts

6. **Investing.com - Gold News**
   - URL: `https://www.investing.com/commodities/gold-news`
   - Method: Scraping
   - Coverage: Real-time news, economic calendar

### **Secondary Sources (Economic Events Affecting Gold)**

7. **Federal Reserve News**
8. **European Central Bank**
9. **Trading Economics**
10. **ForexLive**
11. **MarketWatch - Commodities**

---

## 🏆 Recommended Solutions

### **Option 1: Custom Scraper (Your Existing Plan) ⭐⭐⭐⭐⭐**

**Leverage your ScraperImplementPlan.md infrastructure:**

```
LXC 2 (Scraper) already includes:
- Crawlee + Playwright framework
- News scrapers (Reuters, Kitco, Bloomberg)
- Anti-bot measures (proxies, CAPTCHA solving)
- Structured data output (ScrapedNews schema)
```

**Implementation Path:**
1. Use the existing news scrapers in your plan:
   ```
   server/services/scraping/news/
     reuters.ts
     kitco.ts
     bloomberg.ts
     index.ts → scrapeAllNews()
   ```

2. Add gold-specific filtering:
   ```typescript
   // Filter news for gold relevance
   const goldKeywords = ['gold', 'xauusd', 'bullion', 'precious metals'];
   const filteredNews = news.filter(article => 
     goldKeywords.some(keyword => 
       article.title.toLowerCase().includes(keyword) ||
       article.content?.toLowerCase().includes(keyword)
     )
   );
   ```

3. Connect to MiroFlow for AI analysis:
   ```typescript
   // Use MiroFlow to:
   // - Summarize articles
   // - Extract sentiment (bullish/bearish)
   // - Determine gold price impact
   const newsAnalysis = await miroflow.analyzeNews({
     articles: filteredNews,
     task: 'analyze_gold_impact'
   });
   ```

**Pros:**
- ✅ Already planned in your architecture
- ✅ Full control over data collection
- ✅ No API costs
- ✅ Can scrape any source

**Cons:**
- ⚠️ Requires maintenance (website changes)
- ⚠️ CAPTCHA challenges
- ⚠️ Rate limiting

---

### **Option 2: Financial News APIs (Hybrid) ⭐⭐⭐⭐⭐**

**Combine your scrapers with news APIs for reliability:**

#### **A. Alpha Vantage News API (FREE)**

**Why Use:**
- ✅ **FREE tier** with 25 requests/day
- ✅ Global market news with **AI sentiment scores**
- ✅ Filter by topics: `gold`, `commodities`, `forex`
- ✅ Historical news data
- ✅ Easy integration

**API Endpoint:**
```
https://www.alphavantage.co/query?function=NEWS_SENTIMENT
&topics=commodity&apikey=YOUR_API_KEY
```

**Example Response:**
```json
{
  "feed": [{
    "title": "Gold Prices Surge as Fed Signals Rate Cuts",
    "summary": "...",
    "url": "...",
    "time_published": "20241122T120000",
    "overall_sentiment_score": 0.75,
    "overall_sentiment_label": "Bullish"
  }]
}
```

**GitHub:** https://github.com/alphavantage (unofficial clients)

---

#### **B. Finnhub News API (FREE)**

**Why Use:**
- ✅ **FREE tier** with 60 API calls/minute
- ✅ Real-time market news
- ✅ Crypto, forex, and commodities coverage
- ✅ Simple REST API

**API Endpoint:**
```
https://finnhub.io/api/v1/news?category=forex&token=YOUR_TOKEN
```

**Best For:** Real-time news updates

**Pricing:** Free tier available  
**Website:** https://finnhub.io

---

#### **C. Marketaux News API (FREE)**

**Why Use:**
- ✅ **FREE tier** (100 requests/day)
- ✅ 5,000+ sources in 30+ languages
- ✅ **Sentiment analysis** included
- ✅ Filter by entities (gold, commodities)
- ✅ Historical news archive

**API Endpoint:**
```
https://api.marketaux.com/v1/news/all?filter_entities=true
&symbols=XAUUSD&api_token=YOUR_TOKEN
```

**GitHub:** Community wrappers available  
**Website:** https://marketaux.com

---

#### **D. Financial Modeling Prep (FMP) Forex News**

**Why Use:**
- ✅ Dedicated forex/gold news endpoint
- ✅ Daily updates
- ✅ Date range filtering
- ✅ Clean JSON format

**API Endpoint:**
```
https://financialmodelingprep.com/api/v4/forex_news
?page=0&apikey=YOUR_KEY
```

**Pricing:** Starter plan $14/month  
**Website:** https://financialmodelingprep.com

---

### **Option 3: RSS Feed Aggregator (FASTEST) ⭐⭐⭐⭐**

**Use an opensource RSS reader + custom frontend:**

#### **FreshRSS (Self-Hosted)**

**Why Use:**
- ✅ **100% FREE** and opensource
- ✅ Self-hosted (LXC 1 or separate container)
- ✅ Multi-user support
- ✅ API for mobile clients
- ✅ Basic web scraping for non-RSS sources
- ✅ Custom tags and filtering

**GitHub:** https://github.com/FreshRSS/FreshRSS

**Setup:**
```bash
# Docker deployment
docker run -d \
  --name freshrss \
  -p 8080:80 \
  -v freshrss_data:/var/www/FreshRSS/data \
  freshrss/freshrss
```

**Gold News RSS Feeds to Add:**
```
https://www.kitco.com/rss/marketalerts.xml
https://www.gold.org/feed
https://www.fxstreet.com/rss/gold.xml
https://www.investing.com/rss/commodities_gold.rss
https://www.reuters.com/rssFeed/commodities
```

**Integration with Your Platform:**
```typescript
// Fetch from FreshRSS API
const response = await fetch('http://freshrss:8080/api/greader.php/reader/api/0/stream/contents', {
  headers: { 'Authorization': 'Bearer YOUR_TOKEN' }
});
const goldNews = await response.json();
```

---

### **Option 4: AI-Powered News with MiroFlow ⭐⭐⭐⭐⭐**

**Use MiroFlow to generate curated gold news summaries:**

#### **How It Works:**

1. **MiroFlow researches** current gold-related news
2. **AI filters** for relevance and impact
3. **Generates summaries** with key takeaways
4. **Provides sentiment** (bullish/bearish)

**Example Workflow:**
```typescript
// server/services/news/miroflow-news.ts
export async function getGoldNewsFromMiroFlow() {
  const response = await miroflowClient.research({
    query: `
      Research the latest news affecting gold prices (XAUUSD) in the past 24 hours.
      Focus on:
      - Federal Reserve policy
      - Inflation data
      - Geopolitical events
      - USD strength
      - Central bank gold purchases
      
      Provide:
      1. Top 5 most impactful news items
      2. Summary of each (2-3 sentences)
      3. Expected impact on gold (bullish/bearish/neutral)
      4. Confidence score
    `,
    depth: 3
  });
  
  return response.results;
}
```

**Pros:**
- ✅ AI-curated and filtered
- ✅ Contextual summaries
- ✅ Impact analysis
- ✅ No scraping maintenance

**Cons:**
- ⚠️ API costs (OpenAI/Claude)
- ⚠️ Rate limits
- ⚠️ Requires MiroFlow setup

---

## 🎨 News Page UI Components

### **Recommended Stack:**

```
Frontend: Next.js (your existing Fumadocs)
Components: TailAdmin news components
Styling: Tailwind CSS (Liquid Tinted theme)
Data: From LXC 2 (Scraper) or APIs
```

### **Component Structure:**

```tsx
// app/(news)/news/page.tsx
export default function NewsPage() {
  return (
    <div className="news-container">
      <NewsHero /> {/* Latest headline */}
      <NewsTabs /> {/* All, Breaking, Analysis, Forecasts */}
      <NewsFeed /> {/* Card grid of articles */}
      <NewsSidebar /> {/* Trending topics, sentiment gauge */}
    </div>
  );
}

// components/news/NewsCard.tsx
export function NewsCard({ article }: { article: GoldNews }) {
  return (
    <div className="news-card">
      <img src={article.image} alt={article.title} />
      <div className="news-content">
        <span className={`sentiment-badge ${article.sentiment}`}>
          {article.sentiment === 'bullish' ? '📈' : '📉'} {article.sentiment}
        </span>
        <h3>{article.title}</h3>
        <p className="summary">{article.summary}</p>
        <div className="meta">
          <span>{article.source}</span>
          <span>{formatDate(article.publishedAt)}</span>
        </div>
      </div>
    </div>
  );
}
```

---

## 📊 Data Schema

```typescript
// lib/types/news.ts
export interface GoldNews {
  id: string;
  title: string;
  summary: string;
  content?: string;
  url: string;
  image?: string;
  source: string;
  author?: string;
  publishedAt: Date;
  scrapedAt: Date;
  
  // Gold-specific fields
  sentiment: 'bullish' | 'bearish' | 'neutral';
  sentimentScore: number; // -1 to 1
  goldImpact: 'high' | 'medium' | 'low';
  relatedSymbols: string[]; // ['XAUUSD', 'USD', 'GLD']
  
  // AI analysis (from MiroFlow)
  aiSummary?: string;
  keyTakeaways?: string[];
  priceTarget?: {
    direction: 'up' | 'down' | 'sideways';
    confidence: number;
  };
}
```

---

## 🚀 Implementation Roadmap

### **Phase 1: Choose Your Approach (Week 1)**

**Option A: Use Your Existing Scrapers (Recommended)**
- Already defined in ScraperImplementPlan.md
- Implement `server/services/scraping/news/*`
- Add gold filtering logic

**Option B: Use APIs (Fast Start)**
- Sign up for Alpha Vantage (FREE)
- Integrate Finnhub API
- Create API wrapper clients

**Option C: RSS + FreshRSS (Easiest)**
- Deploy FreshRSS in Docker
- Add gold RSS feeds
- Build custom frontend

### **Phase 2: Data Collection (Week 1-2)**

```bash
# If using scrapers:
# Already in your plan at server/services/scraping/news/

# If using APIs:
pnpm add axios
# Create API clients for Alpha Vantage, Finnhub, etc.

# If using RSS:
# Deploy FreshRSS and configure feeds
```

### **Phase 3: News Page UI (Week 2)**

1. Create news routes:
```
app/(news)/
  news/
    page.tsx          # Main news feed
    [slug]/
      page.tsx        # Individual article
    layout.tsx        # News-specific layout
```

2. Build components:
   - NewsCard
   - NewsFeed (grid or list)
   - NewsFilter (by date, source, sentiment)
   - NewsSidebar (trending, sentiment gauge)

3. Add to navigation:
```tsx
// Update main navigation
const navItems = [
  { name: 'Dashboard', href: '/dashboard' },
  { name: 'News', href: '/news' }, // ← NEW
  { name: 'Journal', href: '/journal' },
  { name: 'Docs', href: '/docs' }
];
```

### **Phase 4: MiroFlow Integration (Week 3)**

```typescript
// Enhance news with AI:
// 1. Summarize long articles
const summary = await miroflow.summarize(article.content);

// 2. Analyze sentiment
const sentiment = await miroflow.analyzeSentiment(article.title + article.content);

// 3. Extract impact on gold
const impact = await miroflow.analyzeGoldImpact(article);

// 4. Generate trading insights
const insights = await miroflow.generateInsights({
  news: articles,
  currentPrice: goldPrice,
  sentiment: marketSentiment
});
```

### **Phase 5: Advanced Features (Week 4+)**

1. **Real-time Updates:**
   - WebSocket connection for live news
   - Browser notifications for breaking news

2. **Personalization:**
   - Save favorite sources
   - Custom news alerts
   - Reading history

3. **Analytics:**
   - Track which news moves gold prices most
   - Correlation analysis (news sentiment vs price change)

---

## 💡 My Top Recommendation

### **Hybrid Approach (BEST):**

```
1. Use your existing Crawlee scrapers (Reuters, K itco, Bloomberg)
   ↓
2. Supplement with FREE APIs (Alpha Vantage, Finnhub)
   ↓
3. Filter for gold relevance with keywords + AI
   ↓
4. Enhance with MiroFlow analysis (sentiment, impact)
   ↓
5. Display in TailAdmin-style news feed
```

### **Why This Works:**

- ✅ **Reliable**: APIs provide fallback when scrapers fail
- ✅ **Cost-effective**: Use free API tiers
- ✅ **Comprehensive**: More sources = better coverage
- ✅ **AI-enhanced**: MiroFlow adds context and analysis
- ✅ **Maintainable**: Less scraper breakage

---

## 📁 Project Structure

```
fumadocs/
├── apps/
│   └── docs/
│       ├── app/
│       │   ├── (news)/                # News routes
│       │   │   ├── news/
│       │   │   │   ├── page.tsx       # News feed
│       │   │   │   ├── [slug]/
│       │   │   │   │   └── page.tsx   # Article page
│       │   │   │   └── layout.tsx
│       │   │   └── api/
│       │   │       └── news/
│       │   │           └── route.ts   # News API endpoint
│       │   ├── (dashboard)/
│       │   ├── (journal)/
│       │   └── (docs)/
│       ├── components/
│       │   └── news/                  # News components
│       │       ├── NewsCard.tsx
│       │       ├── NewsFeed.tsx
│       │       ├── NewsFilter.tsx
│       │       ├── NewsSidebar.tsx
│       │       └── SentimentBadge.tsx
│       └── lib/
│           ├── api/
│           │   ├── news-api.ts        # Alpha Vantage client
│           │   ├── finnhub.ts         # Finnhub client
│           │   └── scraper-news.ts    # LXC 2 scraper client
│           └── types/
│               └── news.ts            # GoldNews interface
└── server/                            # (LXC 2 - Already planned)
    └── services/
        └── scraping/
            └── news/
                ├── reuters.ts
                ├── kitco.ts
                ├── bloomberg.ts
                └── index.ts
```

---

## 🔗 Quick Start Resources

### **APIs:**
- **Alpha Vantage**: https://www.alphavantage.co
- **Finnhub**: https://finnhub.io
- **Marketaux**: https://marketaux.com
- **FMP**: https://financialmodelingprep.com

### **RSS Readers:**
- **FreshRSS**: https://github.com/FreshRSS/FreshRSS
- **Tiny Tiny RSS**: https://tt-rss.org

### **Gold News RSS Feeds:**
```
https://www.kitco.com/rss/marketalerts.xml
https://www.gold.org/feed
https://www.fxstreet.com/rss/gold.xml
https://www.reuters.com/rssFeed/commodities
https://www.investing.com/rss/commodities_gold.rss
```

### **Example Projects:**
- **News-Pulse (Next.js)**: https://github.com/lucasferrazlima/news-pulse
- **fin-thread(AI News)**: https://github.com/samgozman/fin-thread

---

## 📞 Next Steps

Would you like me to:

1. **Integrate Alpha Vantage API** for quick gold news?
2. **Build the News page UI** with TailAdmin components?
3. **Set up FreshRSS** for RSS aggregation?
4. **Create MiroFlow news analysis** endpoint?
5. **Implement the complete hybrid approach**?

Let me know which direction you'd like to explore! 🚀
