// TrafficPeek - Website Traffic Statistics Extension
// Uses backend API for real traffic data

const API_BASE_URL = 'https://trafficpeek.vercel.app/api/traffic';

// State
let currentView = 'stats'; // 'stats' or 'settings'
let apiKey = null;

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

// Load settings from chrome.storage
async function loadSettings() {
  try {
    const result = await chrome.storage.local.get(['rapidApiKey']);
    apiKey = result.rapidApiKey || null;
    updateApiStatus();
  } catch (error) {
    console.error('Failed to load settings:', error);
  }
}

// Save settings to chrome.storage
async function saveSettings() {
  try {
    const input = document.getElementById('apiKeyInput');
    apiKey = input.value.trim() || null;
    await chrome.storage.local.set({ rapidApiKey: apiKey });
    updateApiStatus();
    showSaveFeedback();
  } catch (error) {
    console.error('Failed to save settings:', error);
  }
}

// Update API status indicator
function updateApiStatus() {
  const statusEl = document.getElementById('apiStatus');
  if (!statusEl) return;

  if (apiKey) {
    statusEl.innerHTML = `
      <span class="api-status-dot connected"></span>
      <span>API key configured</span>
    `;
  } else {
    statusEl.innerHTML = `
      <span class="api-status-dot disconnected"></span>
      <span>Using estimates (no API key)</span>
    `;
  }
}

// Show save feedback
function showSaveFeedback() {
  const feedback = document.getElementById('saveFeedback');
  if (feedback) {
    feedback.classList.add('show');
    setTimeout(() => feedback.classList.remove('show'), 2000);
  }
}

// Toggle between stats and settings view
function toggleView(view) {
  currentView = view;
  const content = document.getElementById('content');
  const settings = document.getElementById('settings');
  const settingsBtn = document.getElementById('settingsBtn');

  if (view === 'settings') {
    content.style.display = 'none';
    settings.classList.add('active');
    settingsBtn.classList.add('active');
    // Load current API key into input
    const input = document.getElementById('apiKeyInput');
    if (input && apiKey) {
      input.value = apiKey;
    }
  } else {
    content.style.display = 'block';
    settings.classList.remove('active');
    settingsBtn.classList.remove('active');
  }
}

// Fetch traffic data from backend API
async function fetchTrafficData(domain) {
  const headers = {
    'Content-Type': 'application/json',
  };

  // Add API key header if available
  if (apiKey) {
    headers['X-RapidAPI-Key'] = apiKey;
  }

  const response = await fetch(`${API_BASE_URL}?domain=${encodeURIComponent(domain)}`, {
    headers,
  });

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
      Traffic data is estimated. <a href="#" id="addApiKeyLink">Add API key</a> for real data.
    </div>
    ` : ''}
  `;

  // Add click handler for "Add API key" link
  const addApiKeyLink = document.getElementById('addApiKeyLink');
  if (addApiKeyLink) {
    addApiKeyLink.addEventListener('click', (e) => {
      e.preventDefault();
      toggleView('settings');
    });
  }
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

// Setup event listeners
function setupEventListeners() {
  // Settings button
  const settingsBtn = document.getElementById('settingsBtn');
  if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
      toggleView(currentView === 'settings' ? 'stats' : 'settings');
    });
  }

  // Back button
  const backBtn = document.getElementById('backBtn');
  if (backBtn) {
    backBtn.addEventListener('click', () => {
      toggleView('stats');
      init(); // Refresh data with new settings
    });
  }

  // Save button
  const saveBtn = document.getElementById('saveBtn');
  if (saveBtn) {
    saveBtn.addEventListener('click', saveSettings);
  }
}

// Main initialization
async function init() {
  try {
    // Load settings first
    await loadSettings();

    // Setup event listeners
    setupEventListeners();

    // Update API status in settings panel
    updateApiStatus();

    // Only fetch data if we're in stats view
    if (currentView !== 'settings') {
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
    }

  } catch (error) {
    console.error('TrafficPeek error:', error);
    renderError('Failed to fetch traffic data. Please try again.');
  }
}

// Initialize when popup opens
document.addEventListener('DOMContentLoaded', init);

// Make init available globally for retry button
window.init = init;
