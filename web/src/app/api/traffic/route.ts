import { NextRequest, NextResponse } from 'next/server';

const RAPIDAPI_KEY = process.env.RAPIDAPI_KEY;
const RAPIDAPI_HOST = 'similar-web.p.rapidapi.com';

interface TrafficData {
  domain: string;
  globalRank: number | null;
  countryRank: number | null;
  categoryRank: number | null;
  monthlyVisits: number | null;
  avgVisitDuration: number | null;
  pagesPerVisit: number | null;
  bounceRate: number | null;
  trafficHistory: Array<{ date: string; visits: number }>;
  isEstimate: boolean;
  source: string;
}

// Fallback estimation based on domain characteristics
function estimateFromDomain(domain: string): TrafficData {
  // Known domains with approximate traffic
  const knownDomains: Record<string, { rank: number; visits: number }> = {
    'google.com': { rank: 1, visits: 85000000000 },
    'youtube.com': { rank: 2, visits: 35000000000 },
    'facebook.com': { rank: 3, visits: 15000000000 },
    'twitter.com': { rank: 5, visits: 6000000000 },
    'x.com': { rank: 5, visits: 6000000000 },
    'instagram.com': { rank: 4, visits: 6500000000 },
    'linkedin.com': { rank: 15, visits: 1500000000 },
    'reddit.com': { rank: 20, visits: 1700000000 },
    'amazon.com': { rank: 10, visits: 2500000000 },
    'github.com': { rank: 50, visits: 500000000 },
    'stackoverflow.com': { rank: 100, visits: 100000000 },
    'vercel.app': { rank: 5000, visits: 50000000 },
  };

  const domainLower = domain.toLowerCase();

  // Check known domains
  for (const [known, data] of Object.entries(knownDomains)) {
    if (domainLower === known || domainLower.endsWith('.' + known)) {
      return createEstimateResponse(domain, data.rank, data.visits);
    }
  }

  // Estimate based on TLD and characteristics
  let estimatedRank = 500000;

  // TLD adjustments
  if (domain.endsWith('.com')) estimatedRank = 200000;
  else if (domain.endsWith('.org')) estimatedRank = 300000;
  else if (domain.endsWith('.net')) estimatedRank = 350000;
  else if (domain.endsWith('.io')) estimatedRank = 400000;
  else if (domain.endsWith('.dev')) estimatedRank = 450000;
  else if (domain.endsWith('.app')) estimatedRank = 400000;
  else if (domain.endsWith('.ai')) estimatedRank = 300000;

  // Shorter domains tend to be more popular
  const parts = domain.split('.');
  const mainPart = parts[0];
  if (mainPart.length <= 4) estimatedRank *= 0.5;
  else if (mainPart.length <= 8) estimatedRank *= 0.8;
  else estimatedRank *= 1.2;

  // Add some consistent variance based on domain name
  const hash = domain.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  estimatedRank = Math.round(estimatedRank * (0.8 + (hash % 100) / 250));

  // Estimate visits from rank using power law
  const estimatedVisits = Math.round(1000000000 * Math.pow(estimatedRank, -0.7));

  return createEstimateResponse(domain, estimatedRank, Math.max(1000, estimatedVisits));
}

function createEstimateResponse(domain: string, rank: number, visits: number): TrafficData {
  // Generate 30-day history with some variance
  const history = [];
  const dailyBase = visits / 30;
  const now = new Date();

  for (let i = 29; i >= 0; i--) {
    const date = new Date(now);
    date.setDate(date.getDate() - i);
    const dayOfWeek = date.getDay();
    const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.85 : 1;
    // Use consistent random based on date
    const seed = date.getDate() + date.getMonth() * 31 + domain.length;
    const randomFactor = 0.85 + ((seed * 17) % 30) / 100;

    history.push({
      date: date.toISOString().split('T')[0],
      visits: Math.round(dailyBase * weekendFactor * randomFactor),
    });
  }

  return {
    domain,
    globalRank: rank,
    countryRank: null,
    categoryRank: null,
    monthlyVisits: visits,
    avgVisitDuration: 60 + Math.round((1000000 / rank) * 10), // seconds
    pagesPerVisit: 1.5 + (1000000 / rank) * 0.00001,
    bounceRate: Math.min(0.8, Math.max(0.3, 0.5 + rank / 10000000)),
    trafficHistory: history,
    isEstimate: true,
    source: 'estimate',
  };
}

async function fetchFromRapidAPI(domain: string, apiKey?: string): Promise<TrafficData | null> {
  const key = apiKey || RAPIDAPI_KEY;
  if (!key) {
    return null;
  }

  try {
    const response = await fetch(
      `https://${RAPIDAPI_HOST}/get-analysis?domain=${encodeURIComponent(domain)}`,
      {
        method: 'GET',
        headers: {
          'X-RapidAPI-Key': key,
          'X-RapidAPI-Host': RAPIDAPI_HOST,
        },
      }
    );

    if (!response.ok) {
      console.error('RapidAPI error:', response.status);
      return null;
    }

    const data = await response.json();

    // Parse the response (structure depends on API)
    if (data && data.EstimatedMonthlyVisits) {
      // Get the most recent month's visits
      const visits = Object.values(data.EstimatedMonthlyVisits as Record<string, number>);
      const latestVisits = visits[visits.length - 1] || 0;

      // Build history from API data
      const history: Array<{ date: string; visits: number }> = [];
      const monthlyData = data.EstimatedMonthlyVisits as Record<string, number>;

      // If we have monthly data, interpolate to daily
      const entries = Object.entries(monthlyData).slice(-3);
      if (entries.length > 0) {
        const lastMonth = entries[entries.length - 1];
        const dailyVisits = lastMonth[1] / 30;
        const now = new Date();

        for (let i = 29; i >= 0; i--) {
          const date = new Date(now);
          date.setDate(date.getDate() - i);
          const dayOfWeek = date.getDay();
          const weekendFactor = (dayOfWeek === 0 || dayOfWeek === 6) ? 0.85 : 1;
          const randomFactor = 0.9 + Math.random() * 0.2;

          history.push({
            date: date.toISOString().split('T')[0],
            visits: Math.round(dailyVisits * weekendFactor * randomFactor),
          });
        }
      }

      return {
        domain,
        globalRank: data.GlobalRank?.Rank || null,
        countryRank: data.CountryRank?.Rank || null,
        categoryRank: data.CategoryRank?.Rank || null,
        monthlyVisits: latestVisits,
        avgVisitDuration: data.Engagments?.TimeOnSite || null,
        pagesPerVisit: data.Engagments?.PagePerVisit || null,
        bounceRate: data.Engagments?.BounceRate || null,
        trafficHistory: history,
        isEstimate: false,
        source: 'similarweb',
      };
    }

    return null;
  } catch (error) {
    console.error('RapidAPI fetch error:', error);
    return null;
  }
}

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const domain = searchParams.get('domain');

  if (!domain) {
    return NextResponse.json(
      { error: 'Domain parameter is required' },
      { status: 400 }
    );
  }

  // Extract API key from header or fall back to environment variable
  const apiKey = request.headers.get('X-RapidAPI-Key') || process.env.RAPIDAPI_KEY;

  // Clean the domain
  const cleanDomain = domain.toLowerCase().replace(/^www\./, '');

  // Try to fetch real data first
  let data = await fetchFromRapidAPI(cleanDomain, apiKey || undefined);

  // Fall back to estimation if API fails or no key
  if (!data) {
    data = estimateFromDomain(cleanDomain);
  }

  // Add CORS headers for extension
  return NextResponse.json(data, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-RapidAPI-Key',
    },
  });
}

export async function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, X-RapidAPI-Key',
    },
  });
}
