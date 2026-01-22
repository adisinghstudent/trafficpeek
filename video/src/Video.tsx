import { AbsoluteFill, Sequence, useCurrentFrame, interpolate, spring, useVideoConfig, Img, staticFile } from 'remotion';

const COLORS = {
  bg: '#F0F0F0',
  coral: '#EB4F3E',
  ink: '#191919',
  muted: '#6B7280',
  white: '#FFFFFF',
  blue: '#2563eb',
  green: '#16a34a',
};

// Typewriter effect component
const Typewriter: React.FC<{
  text: string;
  startFrame: number;
  speed?: number;
  color?: string;
  fontSize?: number;
}> = ({ text, startFrame, speed = 1.2, color = COLORS.ink, fontSize = 32 }) => {
  const frame = useCurrentFrame();
  const elapsed = Math.max(0, frame - startFrame);
  const charsToShow = Math.floor(elapsed * speed);
  const displayText = text.slice(0, charsToShow);
  const isTyping = charsToShow < text.length;
  const cursorOpacity = isTyping ? 1 : interpolate(frame % 30, [0, 15, 30], [1, 0, 1]);

  return (
    <span style={{ fontFamily: 'SF Mono, Monaco, monospace', fontSize, color }}>
      {displayText}
      <span style={{ color: COLORS.coral, opacity: cursorOpacity }}>|</span>
    </span>
  );
};

// Title Scene
const TitleScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const logoScale = spring({ frame, fps, from: 0, to: 1, durationInFrames: 20 });
  const titleOpacity = interpolate(frame, [15, 30], [0, 1], { extrapolateRight: 'clamp' });
  const subtitleOpacity = interpolate(frame, [35, 50], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bg,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
    }}>
      {/* Logo */}
      <div style={{
        width: 120,
        height: 120,
        borderRadius: 28,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transform: `scale(${logoScale})`,
        marginBottom: 40,
        boxShadow: '0 20px 60px rgba(102, 126, 234, 0.4)',
      }}>
        <svg width="70" height="70" viewBox="0 0 70 70" fill="white">
          <rect x="8" y="42" width="10" height="20" rx="3" />
          <rect x="22" y="32" width="10" height="30" rx="3" />
          <rect x="36" y="22" width="10" height="40" rx="3" />
          <rect x="50" y="12" width="10" height="50" rx="3" />
        </svg>
      </div>

      {/* Title */}
      <h1 style={{
        fontFamily: 'Georgia, serif',
        fontSize: 72,
        fontWeight: 400,
        color: COLORS.ink,
        opacity: titleOpacity,
        marginBottom: 20,
      }}>
        TrafficPeek
      </h1>

      {/* Subtitle */}
      <p style={{
        fontFamily: 'Inter, system-ui, sans-serif',
        fontSize: 28,
        color: COLORS.muted,
        opacity: subtitleOpacity,
        textAlign: 'center',
      }}>
        Real website traffic stats in one click
      </p>
    </AbsoluteFill>
  );
};

// Demo Scene - showing the extension popup
const DemoScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const popupScale = spring({ frame, fps, from: 0.8, to: 1, durationInFrames: 15 });
  const popupOpacity = interpolate(frame, [0, 10], [0, 1], { extrapolateRight: 'clamp' });

  // Animated stats
  const statsProgress = interpolate(frame, [20, 60], [0, 1], { extrapolateRight: 'clamp' });
  const visits = Math.round(statsProgress * 21865051);
  const rank = Math.round(7242 + (1 - statsProgress) * 1000);

  const formatNumber = (num: number) => {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
  };

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bg,
      justifyContent: 'center',
      alignItems: 'center',
    }}>
      {/* Browser mockup */}
      <div style={{
        transform: `scale(${popupScale})`,
        opacity: popupOpacity,
      }}>
        {/* Extension popup */}
        <div style={{
          width: 360,
          backgroundColor: COLORS.bg,
          borderRadius: 16,
          padding: 20,
          boxShadow: '0 25px 80px rgba(0,0,0,0.15)',
          border: '1px solid rgba(0,0,0,0.08)',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            marginBottom: 20,
            paddingBottom: 16,
            borderBottom: '1px solid rgba(0,0,0,0.06)',
          }}>
            <div style={{
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <svg width="20" height="20" viewBox="0 0 70 70" fill="white">
                <rect x="8" y="42" width="10" height="20" rx="3" />
                <rect x="22" y="32" width="10" height="30" rx="3" />
                <rect x="36" y="22" width="10" height="40" rx="3" />
                <rect x="50" y="12" width="10" height="50" rx="3" />
              </svg>
            </div>
            <span style={{
              fontFamily: 'Georgia, serif',
              fontSize: 22,
              color: COLORS.ink,
            }}>TrafficPeek</span>
          </div>

          {/* Domain info */}
          <div style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            padding: 16,
            marginBottom: 16,
          }}>
            <div style={{
              fontFamily: 'Georgia, serif',
              fontSize: 20,
              fontWeight: 600,
              color: COLORS.coral,
              marginBottom: 4,
            }}>lovable.dev</div>
            <div style={{
              fontSize: 13,
              color: COLORS.muted,
              display: 'flex',
              alignItems: 'center',
              gap: 8,
            }}>
              Global Rank: #{formatNumber(rank)}
              <span style={{
                background: 'rgba(59, 130, 246, 0.15)',
                color: COLORS.blue,
                padding: '2px 6px',
                borderRadius: 4,
                fontSize: 9,
                fontWeight: 600,
                textTransform: 'uppercase',
              }}>Tranco</span>
            </div>
          </div>

          {/* Stats grid */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 12,
            marginBottom: 16,
          }}>
            <div style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 16,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28,
                color: COLORS.coral,
              }}>{formatNumber(visits)}</div>
              <div style={{
                fontSize: 10,
                color: COLORS.muted,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 6,
              }}>Monthly Visits</div>
            </div>
            <div style={{
              backgroundColor: COLORS.white,
              borderRadius: 16,
              padding: 16,
              textAlign: 'center',
            }}>
              <div style={{
                fontFamily: 'Georgia, serif',
                fontSize: 28,
                color: COLORS.coral,
              }}>{formatNumber(Math.round(visits / 30))}</div>
              <div style={{
                fontSize: 10,
                color: COLORS.muted,
                textTransform: 'uppercase',
                letterSpacing: 0.5,
                marginTop: 6,
              }}>Avg Daily</div>
            </div>
          </div>

          {/* Chart */}
          <div style={{
            backgroundColor: COLORS.white,
            borderRadius: 16,
            padding: 16,
          }}>
            <div style={{ fontSize: 13, fontWeight: 500, color: '#4A5565', marginBottom: 12 }}>
              Last 30 Days
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 3, height: 60 }}>
              {Array.from({ length: 30 }, (_, i) => {
                const barProgress = interpolate(frame, [30 + i * 1.5, 45 + i * 1.5], [0, 1], { extrapolateRight: 'clamp' });
                const height = (0.5 + Math.sin(i * 0.3) * 0.3 + Math.random() * 0.2) * 100 * barProgress;
                return (
                  <div
                    key={i}
                    style={{
                      flex: 1,
                      height: `${height}%`,
                      backgroundColor: COLORS.coral,
                      borderRadius: '3px 3px 0 0',
                      opacity: 0.8,
                    }}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </AbsoluteFill>
  );
};

// Features Scene
const FeaturesScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const features = [
    { icon: '📊', text: 'Real traffic data from Tranco & SimilarWeb' },
    { icon: '🌍', text: 'Global rankings for top 1M sites' },
    { icon: '📈', text: '30-day traffic trends' },
    { icon: '🔓', text: '100% open source' },
  ];

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.bg,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
    }}>
      <h2 style={{
        fontFamily: 'Georgia, serif',
        fontSize: 48,
        color: COLORS.ink,
        marginBottom: 50,
        opacity: interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' }),
      }}>
        Features
      </h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
        {features.map((feature, i) => {
          const delay = 20 + i * 15;
          const opacity = interpolate(frame, [delay, delay + 15], [0, 1], { extrapolateRight: 'clamp' });
          const translateX = interpolate(frame, [delay, delay + 15], [-30, 0], { extrapolateRight: 'clamp' });

          return (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 20,
                opacity,
                transform: `translateX(${translateX}px)`,
                backgroundColor: COLORS.white,
                padding: '20px 30px',
                borderRadius: 16,
                boxShadow: '0 4px 20px rgba(0,0,0,0.05)',
              }}
            >
              <span style={{ fontSize: 36 }}>{feature.icon}</span>
              <span style={{
                fontFamily: 'Inter, system-ui, sans-serif',
                fontSize: 24,
                color: COLORS.ink,
              }}>{feature.text}</span>
            </div>
          );
        })}
      </div>
    </AbsoluteFill>
  );
};

// End Scene
const EndScene: React.FC = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({ frame, fps, from: 0.9, to: 1, durationInFrames: 20 });
  const opacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });

  return (
    <AbsoluteFill style={{
      backgroundColor: COLORS.coral,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 60,
    }}>
      <div style={{
        transform: `scale(${scale})`,
        opacity,
        textAlign: 'center',
      }}>
        <h2 style={{
          fontFamily: 'Georgia, serif',
          fontSize: 56,
          color: COLORS.white,
          marginBottom: 30,
        }}>
          Try it free
        </h2>

        <div style={{
          backgroundColor: 'rgba(255,255,255,0.2)',
          padding: '20px 40px',
          borderRadius: 100,
          marginBottom: 40,
        }}>
          <span style={{
            fontFamily: 'SF Mono, Monaco, monospace',
            fontSize: 28,
            color: COLORS.white,
          }}>
            trafficpeek.vercel.app
          </span>
        </div>

        <p style={{
          fontFamily: 'Inter, system-ui, sans-serif',
          fontSize: 22,
          color: 'rgba(255,255,255,0.8)',
        }}>
          Open source Chrome extension
        </p>
      </div>
    </AbsoluteFill>
  );
};

// Main Video Composition
export const Video: React.FC = () => {
  return (
    <AbsoluteFill>
      {/* Title: 0-90 frames (3s) */}
      <Sequence from={0} durationInFrames={90}>
        <TitleScene />
      </Sequence>

      {/* Demo: 90-240 frames (5s) */}
      <Sequence from={90} durationInFrames={150}>
        <DemoScene />
      </Sequence>

      {/* Features: 240-360 frames (4s) */}
      <Sequence from={240} durationInFrames={120}>
        <FeaturesScene />
      </Sequence>

      {/* End: 360-450 frames (3s) */}
      <Sequence from={360} durationInFrames={90}>
        <EndScene />
      </Sequence>
    </AbsoluteFill>
  );
};
