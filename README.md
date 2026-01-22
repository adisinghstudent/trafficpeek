# TrafficPeek

![TrafficPeek](https://img.shields.io/badge/TrafficPeek-Website%20Traffic%20Stats-667eea?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](#install)

**Free, open-source Chrome extension that shows real monthly visits and 30-day traffic graphs for any website you browse.**

<p align="center">
  <img src="https://trafficpeek.vercel.app/screenshot.png" alt="TrafficPeek Screenshot" width="360" />
</p>

## Features

- **Instant Stats** - Get traffic estimates for any website with a single click. No account required.
- **30-Day Graph** - Visualize traffic trends over the past month with an interactive chart.
- **Global Ranking** - See how websites rank globally based on Tranco list data.
- **100% Open Source** - Free forever. View the source code, contribute, or self-host.

## Install

### Browser Extensions

| Browser | Install |
|---------|---------|
| ![Chrome](https://img.shields.io/badge/Chrome-4285F4?style=flat&logo=googlechrome&logoColor=white) | [Chrome Web Store](#) (Coming Soon) |
| ![Arc](https://img.shields.io/badge/Arc-FC60A8?style=flat&logo=arc&logoColor=white) | Works via Chrome Web Store |
| ![Brave](https://img.shields.io/badge/Brave-FB542B?style=flat&logo=brave&logoColor=white) | Works via Chrome Web Store |
| ![Edge](https://img.shields.io/badge/Edge-0078D7?style=flat&logo=microsoftedge&logoColor=white) | Works via Chrome Web Store |

### Manual Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/adisinghstudent/trafficpeek.git
   cd trafficpeek
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked** and select the `extension` folder

## How It Works

TrafficPeek provides website traffic data through two sources:

**1. Tranco List (Top 1 Million Sites)**
- Uses the [Tranco List](https://tranco-list.eu/) - a research-based domain ranking combining Alexa, Majestic, Umbrella, and Quantcast data
- Provides real global rankings for the top 1 million websites
- Traffic estimates calibrated against SimilarWeb data

**2. SimilarWeb API (Any Website)**
- Add your free RapidAPI key to get real SimilarWeb data for any website
- Includes accurate monthly visits, bounce rate, pages per visit, and more
- Works for sites outside the top 1 million

> **Note:** For sites outside the Tranco top 1M, you'll need a SimilarWeb API key to see traffic data.

## Getting Real Traffic Data

Add a free RapidAPI key to get real SimilarWeb data for any website (including sites outside the top 1M).

### Setup Instructions

1. **Go to the SimilarWeb Insights API** on RapidAPI:

   👉 **[similarweb-insights.p.rapidapi.com](https://rapidapi.com/raynalddrapeau/api/similarweb-insights)**

2. **Subscribe to the free tier** (click "Subscribe to Test")

3. **Copy your API key** from the "X-RapidAPI-Key" field

4. **Open TrafficPeek extension** and click the ⚙️ settings icon

5. **Paste your API key** and save

> **Note:** The free tier includes 100 requests/month. TrafficPeek will fall back to Tranco data for top 1M sites if you run out.

## Tech Stack

- **Extension**: Vanilla JavaScript, Chrome Extension Manifest V3
- **Landing Page**: Next.js 14, TypeScript, Tailwind CSS
- **Hosting**: Vercel
- **Data**: [Tranco List](https://tranco-list.eu/) (top 1M) + [SimilarWeb API](https://rapidapi.com/raynalddrapeau/api/similarweb-insights) (optional)

## Project Structure

```
trafficpeek/
├── extension/           # Chrome extension
│   ├── manifest.json    # Extension manifest
│   ├── popup.html       # Popup UI
│   ├── popup.js         # Main logic
│   ├── background.js    # Service worker
│   └── icons/           # Extension icons
├── web/                 # Next.js landing page
│   └── src/
│       └── app/
│           └── page.tsx
├── LICENSE
└── README.md
```

## Development

### Extension

The extension is vanilla JavaScript - no build step required. Edit files in `extension/` and reload the extension in Chrome.

### Landing Page

```bash
cd web
bun install
bun run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Contributing

Contributions welcome! Feel free to:

1. Fork the repo
2. Create a feature branch (`git checkout -b feature/amazing`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing`)
5. Open a Pull Request

## Links

- **Website**: [trafficpeek.vercel.app](https://trafficpeek.vercel.app)
- **Issues**: [GitHub Issues](https://github.com/adisinghstudent/trafficpeek/issues)
- **Discussions**: [GitHub Discussions](https://github.com/adisinghstudent/trafficpeek/discussions)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with care by the open source community
</p>
