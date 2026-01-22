# TrafficPeek

![TrafficPeek](https://img.shields.io/badge/TrafficPeek-Website%20Traffic%20Stats-667eea?style=for-the-badge)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)
[![Chrome Extension](https://img.shields.io/badge/Chrome-Extension-4285F4?style=for-the-badge&logo=googlechrome&logoColor=white)](#install)

**Free, open-source Chrome extension that shows estimated monthly visits and 30-day traffic graphs for any website you browse.**

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
   git clone https://github.com/anthropics/trafficpeek.git
   cd trafficpeek
   ```

2. Open Chrome and go to `chrome://extensions/`

3. Enable **Developer mode** (toggle in top right)

4. Click **Load unpacked** and select the `extension` folder

## How It Works

TrafficPeek estimates website traffic using:

1. **Tranco List Rankings** - A research-based domain ranking list combining Alexa, Majestic, Umbrella, and Quantcast data
2. **Traffic Estimation Model** - Exponential decay model that estimates monthly visits based on global ranking
3. **Trend Simulation** - Realistic 30-day traffic patterns with weekend variance and noise

> Note: Traffic estimates are approximations based on ranking data, not actual analytics. For precise data, use the website's own analytics.

## Tech Stack

- **Extension**: Vanilla JavaScript, Chrome Extension Manifest V3
- **Landing Page**: Next.js 14, TypeScript, Tailwind CSS
- **Hosting**: Vercel
- **Data**: Tranco List (research-based domain ranking)

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
- **Issues**: [GitHub Issues](https://github.com/anthropics/trafficpeek/issues)
- **Discussions**: [GitHub Discussions](https://github.com/anthropics/trafficpeek/discussions)

## License

MIT License - see [LICENSE](LICENSE) for details.

---

<p align="center">
  Made with care by the open source community
</p>
