import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1a1a2e] to-[#16213e] text-white">
      {/* Header */}
      <header className="container mx-auto px-6 py-6">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-xl flex items-center justify-center text-xl">
              📊
            </div>
            <span className="text-xl font-bold">TrafficPeek</span>
          </div>
          <div className="flex items-center gap-6">
            <a
              href="https://github.com/anthropics/trafficpeek"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-white/70 hover:text-white transition-colors"
            >
              <GitHubIcon />
              <span className="hidden sm:inline">GitHub</span>
            </a>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
            Website Traffic Stats at a Glance
          </h1>
          <p className="text-xl text-white/70 mb-10 max-w-2xl mx-auto">
            Free, open-source Chrome extension that shows estimated monthly visits and 30-day traffic graphs for any website you browse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <a
              href="#install"
              className="px-8 py-4 bg-gradient-to-r from-[#667eea] to-[#764ba2] rounded-xl font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
            >
              <ChromeIcon />
              Install for Chrome
            </a>
            <a
              href="https://github.com/anthropics/trafficpeek"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-colors flex items-center justify-center gap-2"
            >
              <GitHubIcon />
              View Source
            </a>
          </div>

          {/* Screenshot */}
          <div className="relative max-w-sm mx-auto">
            <div className="bg-[#1a1a2e] rounded-2xl shadow-2xl border border-white/10 overflow-hidden">
              <div className="p-5">
                <div className="flex items-center gap-3 mb-5 pb-4 border-b border-white/10">
                  <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center">
                    📊
                  </div>
                  <span className="font-semibold">TrafficPeek</span>
                </div>
                <div className="bg-white/5 rounded-xl p-4 mb-4">
                  <div className="text-[#667eea] font-semibold mb-1">github.com</div>
                  <div className="text-sm text-white/50">Global Rank: #50</div>
                </div>
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                      892M
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wide mt-1">Monthly Visits</div>
                    <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-500/20 text-green-400 mt-2">
                      ↑ 12%
                    </span>
                  </div>
                  <div className="bg-white/5 rounded-xl p-4 text-center">
                    <div className="text-2xl font-bold bg-gradient-to-r from-[#667eea] to-[#764ba2] bg-clip-text text-transparent">
                      29.7M
                    </div>
                    <div className="text-xs text-white/50 uppercase tracking-wide mt-1">Avg Daily Visits</div>
                  </div>
                </div>
                <div className="bg-white/5 rounded-xl p-4">
                  <div className="text-sm font-semibold mb-3 text-white/80">Last 30 Days</div>
                  <div className="flex items-end gap-1 h-20">
                    {[40, 45, 38, 52, 48, 55, 42, 58, 62, 55, 68, 72, 65, 78, 82, 75, 88, 85, 92, 88, 95, 90, 85, 92, 88, 95, 100, 92, 88, 95].map((h, i) => (
                      <div
                        key={i}
                        className="flex-1 bg-gradient-to-t from-[#667eea] to-[#764ba2] rounded-t"
                        style={{ height: `${h}%` }}
                      />
                    ))}
                  </div>
                  <div className="flex justify-between mt-2 text-xs text-white/40">
                    <span>30 days ago</span>
                    <span>Today</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="max-w-4xl mx-auto mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-xl font-semibold mb-2">Instant Stats</h3>
              <p className="text-white/60">Get traffic estimates for any website with a single click. No account required.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">📈</div>
              <h3 className="text-xl font-semibold mb-2">30-Day Graph</h3>
              <p className="text-white/60">Visualize traffic trends over the past month with an interactive chart.</p>
            </div>
            <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
              <div className="text-3xl mb-4">🔓</div>
              <h3 className="text-xl font-semibold mb-2">100% Open Source</h3>
              <p className="text-white/60">Free forever. View the source code, contribute, or self-host.</p>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section id="install" className="max-w-4xl mx-auto mt-32">
          <h2 className="text-3xl font-bold text-center mb-12">Install</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="#"
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <ChromeIcon className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-semibold">Chrome</h3>
                  <p className="text-white/50 text-sm">Chrome Web Store</p>
                </div>
              </div>
              <p className="text-white/60 group-hover:text-white/80 transition-colors">
                Install from the Chrome Web Store →
              </p>
            </a>
            <a
              href="#"
              className="bg-white/5 rounded-2xl p-6 border border-white/10 hover:bg-white/10 transition-colors group"
            >
              <div className="flex items-center gap-4 mb-4">
                <ArcIcon className="w-12 h-12" />
                <div>
                  <h3 className="text-xl font-semibold">Arc</h3>
                  <p className="text-white/50 text-sm">Works with Arc Browser</p>
                </div>
              </div>
              <p className="text-white/60 group-hover:text-white/80 transition-colors">
                Install from Chrome Web Store →
              </p>
            </a>
          </div>

          <div className="mt-8 bg-white/5 rounded-2xl p-6 border border-white/10">
            <h3 className="text-xl font-semibold mb-4">Manual Installation</h3>
            <p className="text-white/60 mb-4">Or install directly from source:</p>
            <div className="bg-black/30 rounded-xl p-4 font-mono text-sm">
              <div className="flex items-center justify-between">
                <code>git clone https://github.com/anthropics/trafficpeek.git</code>
                <button className="text-white/50 hover:text-white transition-colors">
                  📋
                </button>
              </div>
            </div>
            <ol className="mt-4 space-y-2 text-white/60 text-sm">
              <li>1. Clone the repository</li>
              <li>2. Open Chrome → Extensions → Enable Developer Mode</li>
              <li>3. Click &quot;Load unpacked&quot; → Select the <code className="bg-white/10 px-1.5 py-0.5 rounded">extension</code> folder</li>
            </ol>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="max-w-4xl mx-auto mt-32 text-center">
          <h2 className="text-3xl font-bold mb-6">100% Open Source</h2>
          <p className="text-xl text-white/70 mb-8 max-w-2xl mx-auto">
            TrafficPeek is free and open source under the MIT license. View the code, report issues, or contribute on GitHub.
          </p>
          <a
            href="https://github.com/anthropics/trafficpeek"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 rounded-xl font-semibold hover:bg-white/20 transition-colors"
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-12 mt-20 border-t border-white/10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-br from-[#667eea] to-[#764ba2] rounded-lg flex items-center justify-center text-sm">
              📊
            </div>
            <span className="font-semibold">TrafficPeek</span>
          </div>
          <nav className="flex items-center gap-6 text-sm text-white/50">
            <a href="https://github.com/anthropics/trafficpeek" className="hover:text-white transition-colors">GitHub</a>
            <a href="https://github.com/anthropics/trafficpeek/issues" className="hover:text-white transition-colors">Issues</a>
            <a href="https://github.com/anthropics/trafficpeek/discussions" className="hover:text-white transition-colors">Discussions</a>
          </nav>
          <p className="text-sm text-white/30">MIT License</p>
        </div>
      </footer>
    </div>
  );
}

function GitHubIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}

function ChromeIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0C8.21 0 4.831 1.757 2.632 4.501l3.953 6.848A5.454 5.454 0 0 1 12 6.545h10.691A12 12 0 0 0 12 0zM1.931 5.47A11.943 11.943 0 0 0 0 12c0 6.012 4.42 10.991 10.189 11.864l3.953-6.847a5.45 5.45 0 0 1-6.865-2.29zm13.342 2.166a5.446 5.446 0 0 1 1.45 7.09l.002.001h-.002l-3.952 6.848a12.014 12.014 0 0 0 9.26-9.667H15.28l-.007-.001v.001z M12 16.364a4.364 4.364 0 1 1 0-8.728 4.364 4.364 0 0 1 0 8.728z"/>
    </svg>
  );
}

function ArcIcon({ className = "w-5 h-5" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2zm0 18c-4.418 0-8-3.582-8-8s3.582-8 8-8 8 3.582 8 8-3.582 8-8 8zm-1-13h2v6h-2zm0 8h2v2h-2z"/>
    </svg>
  );
}
