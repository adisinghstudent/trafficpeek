export default function Home() {
  return (
    <div className="min-h-screen bg-[#F0F0F0] text-[#191919]">
      {/* Header */}
      <header className="container mx-auto px-6 py-8">
        <nav className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="font-serif text-2xl tracking-tight">TrafficPeek</span>
          </div>
          <a
            href="https://github.com/adisinghstudent/trafficpeek"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-[#4A5565] hover:text-[#191919] transition-colors"
          >
            <GitHubIcon />
            <span className="hidden sm:inline">GitHub</span>
          </a>
        </nav>
      </header>

      {/* Hero */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="font-serif text-[clamp(48px,10vw,120px)] leading-[0.95] tracking-tight mb-8">
            Website traffic,{" "}
            <span className="relative inline-block">
              <span className="relative z-10">at a glance</span>
              <span
                className="absolute left-0 right-0 bottom-[0.1em] h-[0.35em] bg-[#FEF08A] -z-0"
                style={{ transform: "rotate(-1deg)" }}
              />
            </span>
          </h1>
          <p className="text-2xl text-[#4A5565] mb-12 max-w-2xl mx-auto leading-relaxed">
            A <em>free</em>, open-source Chrome extension that shows estimated monthly visits and 30-day traffic graphs for any website you browse.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-20">
            <a
              href="#install"
              className="group px-8 py-4 bg-[#EB4F3E] text-white rounded-full text-lg hover:bg-[#D4453A] transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2"
            >
              <ChromeIcon />
              Install for Chrome
            </a>
            <a
              href="https://github.com/adisinghstudent/trafficpeek"
              target="_blank"
              rel="noopener noreferrer"
              className="px-8 py-4 bg-white/60 backdrop-blur-xl border border-white/50 rounded-full text-lg hover:bg-white/80 transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 shadow-sm"
              style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)" }}
            >
              <GitHubIcon />
              View Source
            </a>
          </div>

          {/* Extension Preview */}
          <div className="relative max-w-sm mx-auto">
            <div
              className="bg-white rounded-3xl p-6 shadow-lg border border-black/5"
              style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.08)" }}
            >
              <div className="flex items-center gap-3 mb-6 pb-4 border-b border-black/5">
                <div className="w-10 h-10 bg-[#EB4F3E] rounded-xl flex items-center justify-center text-white text-lg">
                  📊
                </div>
                <span className="font-serif text-xl">TrafficPeek</span>
              </div>
              <div className="bg-[#FAF9F7] rounded-2xl p-4 mb-4">
                <div className="text-[#EB4F3E] font-medium text-lg mb-1">github.com</div>
                <div className="text-sm text-[#6B7280]">Global Rank: #50</div>
              </div>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-[#FAF9F7] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-serif text-[#EB4F3E]">892M</div>
                  <div className="text-xs text-[#6B7280] uppercase tracking-wide mt-1">Monthly Visits</div>
                  <span className="inline-flex items-center gap-1 text-xs px-2 py-0.5 rounded-full bg-green-100 text-green-700 mt-2">
                    ↑ 12%
                  </span>
                </div>
                <div className="bg-[#FAF9F7] rounded-2xl p-4 text-center">
                  <div className="text-3xl font-serif text-[#EB4F3E]">29.7M</div>
                  <div className="text-xs text-[#6B7280] uppercase tracking-wide mt-1">Avg Daily</div>
                </div>
              </div>
              <div className="bg-[#FAF9F7] rounded-2xl p-4">
                <div className="text-sm font-medium mb-3 text-[#4A5565]">Last 30 Days</div>
                <div className="flex items-end gap-1 h-16">
                  {[40, 45, 38, 52, 48, 55, 42, 58, 62, 55, 68, 72, 65, 78, 82, 75, 88, 85, 92, 88, 95, 90, 85, 92, 88, 95, 100, 92, 88, 95].map((h, i) => (
                    <div
                      key={i}
                      className="flex-1 bg-[#EB4F3E] rounded-t opacity-80"
                      style={{ height: `${h}%` }}
                    />
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-xs text-[#6B7280]">
                  <span>30 days ago</span>
                  <span>Today</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Features */}
        <section className="max-w-4xl mx-auto mt-32">
          <h2 className="font-serif text-[clamp(36px,6vw,64px)] text-center mb-16">
            Why you&apos;ll{" "}
            <span className="relative inline-block">
              <span className="relative z-10">love it</span>
              <span
                className="absolute left-0 right-0 bottom-[0.1em] h-[0.3em] bg-[#FEF08A] -z-0"
                style={{ transform: "rotate(0.5deg)" }}
              />
            </span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white rounded-3xl p-8 border border-black/5">
              <div className="text-4xl mb-4">⚡</div>
              <h3 className="font-serif text-2xl mb-3">Instant Stats</h3>
              <p className="text-[#4A5565] text-lg leading-relaxed">
                Get traffic estimates for <em>any website</em> with a single click. No account required.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-black/5">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="font-serif text-2xl mb-3">30-Day Graph</h3>
              <p className="text-[#4A5565] text-lg leading-relaxed">
                Visualize traffic trends over the past month with an interactive chart.
              </p>
            </div>
            <div className="bg-white rounded-3xl p-8 border border-black/5">
              <div className="text-4xl mb-4">🔓</div>
              <h3 className="font-serif text-2xl mb-3">100% Open Source</h3>
              <p className="text-[#4A5565] text-lg leading-relaxed">
                Free forever. View the source code, contribute, or self-host.
              </p>
            </div>
          </div>
        </section>

        {/* API Key Section */}
        <section className="max-w-4xl mx-auto mt-32">
          <h2 className="font-serif text-[clamp(36px,6vw,64px)] text-center mb-16">
            Want{" "}
            <span className="relative inline-block">
              <span className="relative z-10">real data</span>
              <span
                className="absolute left-0 right-0 bottom-[0.1em] h-[0.3em] bg-[#FEF08A] -z-0"
                style={{ transform: "rotate(0.5deg)" }}
              />
            </span>
            ?
          </h2>
          <div className="bg-white rounded-3xl p-8 border border-black/5">
            <p className="text-xl text-[#4A5565] mb-8 leading-relaxed">
              By default, TrafficPeek shows <em>estimated</em> traffic based on domain rankings.
              Want real data from SimilarWeb? Add your free RapidAPI key!
            </p>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-serif text-2xl mb-4">How to get real data</h3>
                <ol className="space-y-4 text-lg text-[#4A5565]">
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#EB4F3E] text-white rounded-full flex items-center justify-center text-sm font-medium">1</span>
                    <span>Create a free account at <a href="https://rapidapi.com" target="_blank" rel="noopener noreferrer" className="text-[#EB4F3E] hover:underline">rapidapi.com</a></span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#EB4F3E] text-white rounded-full flex items-center justify-center text-sm font-medium">2</span>
                    <span>Subscribe to the <a href="https://rapidapi.com/apidojo/api/similar-web" target="_blank" rel="noopener noreferrer" className="text-[#EB4F3E] hover:underline">Similar Web API</a> (free tier available)</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#EB4F3E] text-white rounded-full flex items-center justify-center text-sm font-medium">3</span>
                    <span>Copy your API key from RapidAPI</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex-shrink-0 w-7 h-7 bg-[#EB4F3E] text-white rounded-full flex items-center justify-center text-sm font-medium">4</span>
                    <span>Click the ⚙️ icon in TrafficPeek and paste your key</span>
                  </li>
                </ol>
              </div>
              <div className="bg-[#FAF9F7] rounded-2xl p-6">
                <h4 className="font-medium text-lg mb-3">Without API Key</h4>
                <ul className="space-y-2 text-[#6B7280] mb-6">
                  <li>✓ Estimated traffic data</li>
                  <li>✓ Global ranking</li>
                  <li>✓ 30-day trend chart</li>
                  <li className="text-[#9CA3AF]">✗ Real SimilarWeb data</li>
                </ul>
                <h4 className="font-medium text-lg mb-3">With API Key</h4>
                <ul className="space-y-2 text-[#22c55e]">
                  <li>✓ Real SimilarWeb traffic data</li>
                  <li>✓ Accurate monthly visits</li>
                  <li>✓ Engagement metrics</li>
                  <li>✓ Country & category rankings</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Install Section */}
        <section id="install" className="max-w-4xl mx-auto mt-32">
          <h2 className="font-serif text-[clamp(36px,6vw,64px)] text-center mb-16">
            Get started
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <a
              href="#"
              className="group bg-white rounded-3xl p-8 border border-black/5 hover:border-[#EB4F3E]/30 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4 mb-4">
                <ChromeIcon className="w-12 h-12 text-[#4285F4]" />
                <div>
                  <h3 className="font-serif text-2xl">Chrome</h3>
                  <p className="text-[#6B7280]">Chrome Web Store</p>
                </div>
              </div>
              <p className="text-[#4A5565] group-hover:text-[#EB4F3E] transition-colors text-lg">
                Install from the Chrome Web Store →
              </p>
            </a>
            <a
              href="#"
              className="group bg-white rounded-3xl p-8 border border-black/5 hover:border-[#EB4F3E]/30 transition-all hover:scale-[1.01]"
            >
              <div className="flex items-center gap-4 mb-4">
                <ArcIcon className="w-12 h-12 text-[#FC60A8]" />
                <div>
                  <h3 className="font-serif text-2xl">Arc</h3>
                  <p className="text-[#6B7280]">Works with Arc Browser</p>
                </div>
              </div>
              <p className="text-[#4A5565] group-hover:text-[#EB4F3E] transition-colors text-lg">
                Install from Chrome Web Store →
              </p>
            </a>
          </div>

          <div className="mt-8 bg-white rounded-3xl p-8 border border-black/5">
            <h3 className="font-serif text-2xl mb-4">Manual Installation</h3>
            <p className="text-[#4A5565] mb-6 text-lg">Or install directly from source:</p>
            <div className="bg-[#FAF9F7] rounded-2xl p-5 font-mono text-base">
              <code className="text-[#191919]">git clone https://github.com/adisinghstudent/trafficpeek.git</code>
            </div>
            <ol className="mt-6 space-y-3 text-[#4A5565] text-lg">
              <li>1. Clone the repository</li>
              <li>2. Open Chrome → Extensions → Enable Developer Mode</li>
              <li>3. Click &quot;Load unpacked&quot; → Select the <code className="bg-[#FAF9F7] px-2 py-1 rounded-lg text-base">extension</code> folder</li>
            </ol>
          </div>
        </section>

        {/* Open Source Section */}
        <section className="max-w-4xl mx-auto mt-32 text-center">
          <h2 className="font-serif text-[clamp(36px,6vw,64px)] mb-6">
            <span className="relative inline-block">
              <span className="relative z-10">100% Open Source</span>
              <span
                className="absolute left-0 right-0 bottom-[0.1em] h-[0.3em] bg-[#FEF08A] -z-0"
                style={{ transform: "rotate(-0.5deg)" }}
              />
            </span>
          </h2>
          <p className="text-2xl text-[#4A5565] mb-10 max-w-2xl mx-auto leading-relaxed">
            TrafficPeek is <em>free and open source</em> under the MIT license. View the code, report issues, or contribute on GitHub.
          </p>
          <a
            href="https://github.com/adisinghstudent/trafficpeek"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 bg-white/60 backdrop-blur-xl border border-white/50 rounded-full text-lg hover:bg-white/80 transition-all hover:scale-[1.02] active:scale-[0.98] shadow-sm"
            style={{ boxShadow: "0 1px 3px rgba(0,0,0,0.08), inset 0 1px 0 rgba(255,255,255,0.6)" }}
          >
            <GitHubIcon />
            View on GitHub
          </a>
        </section>
      </main>

      {/* Footer */}
      <footer className="container mx-auto px-6 py-16 mt-20 border-t border-black/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <span className="font-serif text-xl">TrafficPeek</span>
          <nav className="flex items-center gap-8 text-[#4A5565]">
            <a href="https://github.com/adisinghstudent/trafficpeek" className="hover:text-[#EB4F3E] transition-colors">GitHub</a>
            <a href="https://github.com/adisinghstudent/trafficpeek/issues" className="hover:text-[#EB4F3E] transition-colors">Issues</a>
          </nav>
          <p className="text-[#6B7280]">MIT License</p>
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
