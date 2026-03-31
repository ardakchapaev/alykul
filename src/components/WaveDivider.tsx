'use client';

import { useTheme } from '@/lib/theme-context';

/**
 * Sailey-style wave divider.
 * Sits at the BOTTOM of a section (position:relative required).
 * Paints the NEXT section's color with organic coastline-like edges.
 * Two layers: static rough coastline + animated gentle wave on top.
 */
export default function WaveDivider({ nextColor = 'white', withYacht = false }: { nextColor?: string; withYacht?: boolean }) {
  const { theme } = useTheme();
  if (theme !== 'M2' && theme !== 'M3') return null;

  const cm: Record<string, string> = {
    white: '#ffffff', sand: '#F9FBFD', navy: '#182F48', foam: '#D6EEF5', stone: '#F4F8FB', blue: '#1E88C7',
  };
  const fill = cm[nextColor] || nextColor;
  const isLight = ['#ffffff', '#F9FBFD', '#F4F8FB', '#D6EEF5'].includes(fill);

  // Rough coastline path (like Sailey reference — irregular, organic, not smooth sine)
  const coastline1 = "M0,40 C60,35 90,50 150,38 C200,28 260,55 340,42 C400,30 480,52 560,36 C640,22 720,48 800,40 C880,32 960,55 1040,38 C1120,25 1200,50 1280,42 C1360,30 1440,52 1520,35 C1600,22 1680,48 1760,40 C1840,32 1920,52 2000,38 C2080,25 2160,50 2240,42 C2320,30 2400,52 2480,35 C2560,22 2640,48 2720,40 C2800,32 2880,45 2880,40 L2880,120 L0,120Z";

  const coastline2 = "M0,50 C80,42 120,58 200,48 C280,38 360,60 440,45 C520,32 600,55 680,48 C760,38 840,58 920,42 C1000,30 1080,55 1160,48 C1240,38 1320,58 1400,42 C1480,30 1560,55 1640,48 C1720,38 1800,58 1880,42 C1960,30 2040,55 2120,48 C2200,38 2280,58 2360,42 C2440,30 2520,55 2600,48 C2680,38 2760,55 2880,45 L2880,120 L0,120Z";

  const coastline3 = "M0,55 C100,48 160,62 240,52 C320,42 400,65 480,50 C560,38 640,58 720,52 C800,42 880,62 960,48 C1040,35 1120,58 1200,52 C1280,42 1360,62 1440,48 C1520,35 1600,58 1680,52 C1760,42 1840,62 1920,48 C2000,35 2080,58 2160,52 C2240,42 2320,62 2400,48 C2480,35 2560,58 2640,52 C2720,42 2800,58 2880,50 L2880,120 L0,120Z";

  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '120px', zIndex: 10 }}>
      {/* Layer 3 — deepest, static, full opacity */}
      <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d={coastline3} fill={fill} />
      </svg>

      {/* Layer 2 — middle, slow drift */}
      <svg className="absolute bottom-0 h-full" style={{ width: '200%', animation: 'waveSlide 12s linear infinite' }}
        viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d={coastline2} fill={fill} opacity="0.7" />
      </svg>

      {/* Layer 1 — top, gentle animated wave */}
      <svg className="absolute bottom-0 h-full" style={{ width: '200%', animation: 'waveSlide 8s linear infinite reverse' }}
        viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d={coastline1} fill={fill} opacity="0.4" />
      </svg>

      {/* Luxury Yacht riding the waves */}
      {withYacht && (
        <svg className="absolute" style={{
          bottom: '45px', width: '80px', height: '40px', zIndex: 11,
          animation: 'sailboatWave 24s ease-in-out infinite',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
        }} viewBox="0 0 200 80" fill="none">
          {/* Hull */}
          <path d="M10,55 L25,70 L175,70 L190,55 L185,52 L15,52 Z" fill={isLight ? '#0B5FA5' : '#ffffff'} />
          <path d="M20,60 L30,70 L170,70 L180,60 Z" fill="#ffffff" />
          {/* Deck */}
          <path d="M30,52 L35,42 L160,42 L170,52 Z" fill={isLight ? '#E8F4F8' : '#f0f0f0'} />
          {/* Cabin */}
          <path d="M55,42 L60,28 L130,28 L140,42 Z" fill="#ffffff" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="1" />
          {/* Bridge */}
          <path d="M70,28 L75,20 L120,20 L125,28 Z" fill="#ffffff" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          {/* Flybridge roof */}
          <path d="M72,20 L74,16 L122,16 L124,20 Z" fill={isLight ? '#0B5FA5' : '#333'} />
          {/* Windows */}
          {[65, 78, 91, 104, 117].map(x => (
            <rect key={x} x={x} y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          ))}
          {[80, 96].map(x => (
            <rect key={x} x={x} y="22" width="12" height="4" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.7" />
          ))}
          {/* Portholes */}
          {[50, 65, 80].map(x => (
            <circle key={x} cx={x} cy="56" r="2.5" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.6" />
          ))}
          {/* Antenna */}
          <line x1="98" y1="16" x2="98" y2="8" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          <line x1="95" y1="10" x2="101" y2="10" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.5" />
          {/* Bow */}
          <line x1="30" y1="42" x2="15" y2="52" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
        </svg>
      )}
    </div>
  );
}
