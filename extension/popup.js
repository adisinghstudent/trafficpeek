// TrafficPeek - Website Traffic Statistics Extension
// Uses backend API for real traffic data

const API_BASE_URL = 'https://trafficpeek.vercel.app/api/traffic';

// Format large numbers
function formatNumber(num) {
  if (num >= 1000000000) {
    return (num / 1000000000).toFixed(1) + 'B';
  }
  if (num >= 1000000) {
    return (num / 1000000).toFixed(1) + 'M';
  }
  if (num >= 1000) {
    return (num / 1000).toFixed(1) + 'K';
  }
  return num.toString();
}

// Format duration in seconds to readable format
function formatDuration(seconds) {
  if (!seconds) return 'N/A';
  const mins = Math.floor(seconds / 60);
  const secs = Math.round(seconds % 60);
  if (mins > 0) {
    return `${mins}m ${secs}s`;
  }
  return `${secs}s`;
}

// Calculate trend from history data
function calculateTrend(history) {
  if (!history || history.length < 14) return { direction: 'neutral', percent: 0 };

  const midpoint = Math.floor(history.length / 2);
  const firstHalf = history.slice(0, midpoint).reduce((a, b) => a + b.visits, 0);
  const secondHalf = history.slice(midpoint).reduce((a, b) => a + b.visits, 0);

  const change = ((secondHalf - firstHalf) / firstHalf) * 100;

  if (change > 5) return { direction: 'up', percent: Math.round(change) };
  if (change < -5) return { direction: 'down', percent: Math.round(Math.abs(change)) };
  return { direction: 'neutral', percent: 0 };
}

// Extract root domain from URL
function extractDomain(url) {
  try {
    const hostname = new URL(url).hostname;
    return hostname.replace(/^www\./, '');
  } catch {
    return null;
  }
}

// Fetch traffic data from backend API
async function fetchTrafficData(domain) {
  const response = await fetch(`${API_BASE_URL}?domain=${encodeURIComponent(domain)}`);

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

// Render the stats UI
function renderStats(data) {
  const trend = calculateTrend(data.trafficHistory);
  const avgDailyVisits = data.monthlyVisits ? Math.round(data.monthlyVisits / 30) : null;
  const maxDaily = data.trafficHistory ? Math.max(...data.trafficHistory.map(d => d.visits)) : 1;

  const trendClass = trend.direction;
  const trendIcon = trend.direction === 'up' ? '↑' : trend.direction === 'down' ? '↓' : '→';
  const trendText = trend.percent > 0 ? `${trendIcon} ${trend.percent}%` : `${trendIcon} Stable`;

  // Data source indicator
  const sourceLabel = data.isEstimate ?
    '<span class="source-badge estimate">Estimate</span>' :
    '<span class="source-badge real">SimilarWeb</span>';

  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="domain-info">
      <div class="domain-name">${data.domain}</div>
      <div class="domain-rank">
        Global Rank: ${data.globalRank ? '#' + formatNumber(data.globalRank) : 'N/A'}
        ${sourceLabel}
      </div>
    </div>

    <div class="stats-grid">
      <div class="stat-card">
        <div class="stat-value">${data.monthlyVisits ? formatNumber(data.monthlyVisits) : 'N/A'}</div>
        <div class="stat-label">Monthly Visits</div>
        <span class="trend ${trendClass}">${trendText}</span>
      </div>
      <div class="stat-card">
        <div class="stat-value">${avgDailyVisits ? formatNumber(avgDailyVisits) : 'N/A'}</div>
        <div class="stat-label">Avg Daily Visits</div>
      </div>
    </div>

    ${data.avgVisitDuration || data.pagesPerVisit || data.bounceRate ? `
    <div class="engagement-stats">
      ${data.avgVisitDuration ? `
        <div class="engagement-item">
          <span class="engagement-value">${formatDuration(data.avgVisitDuration)}</span>
          <span class="engagement-label">Avg Visit</span>
        </div>
      ` : ''}
      ${data.pagesPerVisit ? `
        <div class="engagement-item">
          <span class="engagement-value">${data.pagesPerVisit.toFixed(1)}</span>
          <span class="engagement-label">Pages/Visit</span>
        </div>
      ` : ''}
      ${data.bounceRate ? `
        <div class="engagement-item">
          <span class="engagement-value">${(data.bounceRate * 100).toFixed(0)}%</span>
          <span class="engagement-label">Bounce Rate</span>
        </div>
      ` : ''}
    </div>
    ` : ''}

    <div class="chart-container">
      <div class="chart-title">Last 30 Days</div>
      <div class="chart">
        ${data.trafficHistory ? data.trafficHistory.map((day, i) => {
          const height = maxDaily > 0 ? (day.visits / maxDaily) * 100 : 0;
          return `<div class="chart-bar" style="height: ${height}%" data-value="${formatNumber(day.visits)}" data-date="${day.date}"></div>`;
        }).join('') : '<div class="no-data">No history available</div>'}
      </div>
      <div class="chart-labels">
        <span>30 days ago</span>
        <span>Today</span>
      </div>
    </div>

    ${data.isEstimate ? `
    <div class="disclaimer">
      Traffic data is estimated based on domain ranking.
      <a href="https://trafficpeek.vercel.app" target="_blank">Learn more</a>
    </div>
    ` : ''}
  `;
}

// Render loading state
function renderLoading() {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="loading">
      <div class="loading-spinner"></div>
      <p>Fetching traffic data...</p>
    </div>
  `;
}

// Render error state
function renderError(message) {
  const content = document.getElementById('content');
  content.innerHTML = `
    <div class="error">
      <div class="error-icon">⚠️</div>
      <p>${message}</p>
      <button onclick="init()" class="retry-btn">Retry</button>
    </div>
  `;
}

// Main initialization
async function init() {
  try {
    renderLoading();

    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    if (!tab?.url) {
      renderError('Unable to access current tab');
      return;
    }

    const domain = extractDomain(tab.url);

    if (!domain) {
      renderError('Invalid URL');
      return;
    }

    // Check for special URLs
    if (tab.url.startsWith('chrome://') || tab.url.startsWith('chrome-extension://')) {
      renderError('Cannot analyze browser pages');
      return;
    }

    // Fetch traffic data from API
    const data = await fetchTrafficData(domain);
    renderStats(data);

  } catch (error) {
    console.error('TrafficPeek error:', error);
    renderError('Failed to fetch traffic data. Please try again.');
  }
}

// Initialize when popup opens
document.addEventListener('DOMContentLoaded', init);

// Make init available globally for retry button
window.init = init;
