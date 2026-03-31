'use client';

import { useTheme } from '@/lib/theme-context';

export default function WaveDivider({ color = 'white', flip = false, withBoat = false }: { color?: string; flip?: boolean; withBoat?: boolean }) {
  const { theme } = useTheme();
  if (theme !== 'M2') return null;

  const colorMap: Record<string, string> = {
    white: '#ffffff',
    sand: '#F7FBFD',
    navy: '#1E88C7',
    foam: '#D6EEF5',
    stone: '#F4F8FB',
  };
  const fill = colorMap[color] || color;

  // Sailey-style wave: textured, organic, like torn paper/water edge
  const isLight = fill === '#ffffff' || fill === '#F7FBFD' || fill === '#F4F8FB' || fill === '#E8F4F8';
  const boatFill = isLight ? '#0B5FA5' : 'rgba(255,255,255,0.85)';
  const sailMain = isLight ? '#1E88C7' : 'rgba(255,255,255,0.6)';
  const sailJib = isLight ? '#4ABFAD' : 'rgba(255,255,255,0.4)';

  return (
    <div
      className="pointer-events-none overflow-hidden"
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '80px',
        zIndex: 5,
        ...(flip ? { top: '-1px' } : { bottom: '-1px' }),
        ...(flip ? { transform: 'rotate(180deg)' } : {}),
      }}
    >
      {/* Sailey-style wave 1 — main, textured */}
      <svg
        className="absolute bottom-0 h-full"
        style={{ width: '200%', animation: 'waveSlide 5s linear infinite' }}
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
      >
        <path d="M0,45 C120,65 240,25 360,45 C480,65 600,25 720,45 C840,65 960,25 1080,45 C1200,65 1320,25 1440,45 C1560,65 1680,25 1800,45 C1920,65 2040,25 2160,45 C2280,65 2400,25 2520,45 C2640,65 2760,25 2880,45 L2880,80 L0,80Z" fill={fill} />
      </svg>

      {/* Wave 2 — offset, faster */}
      <svg
        className="absolute bottom-0 h-full opacity-50"
        style={{ width: '200%', animation: 'waveSlide 3.5s linear infinite reverse' }}
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
      >
        <path d="M0,50 C160,30 320,60 480,40 C640,20 800,55 960,35 C1120,15 1280,55 1440,35 C1600,15 1760,55 1920,35 C2080,15 2240,55 2400,35 C2560,15 2720,50 2880,35 L2880,80 L0,80Z" fill={fill} />
      </svg>

      {/* Wave 3 — subtle, slow */}
      <svg
        className="absolute bottom-0 h-full opacity-25"
        style={{ width: '200%', animation: 'waveSlide 8s linear infinite' }}
        viewBox="0 0 2880 80"
        preserveAspectRatio="none"
      >
        <path d="M0,55 C200,35 400,65 600,45 C800,25 1000,60 1200,40 C1400,20 1600,58 1800,38 C2000,18 2200,55 2400,38 C2600,20 2800,50 2880,42 L2880,80 L0,80Z" fill={fill} />
      </svg>

      {/* Sailboat — large, rides the wave with bobbing motion */}
      {withBoat && (
        <svg
          className="absolute"
          style={{
            bottom: '22px',
            width: '64px',
            height: '64px',
            animation: 'sailboat 22s linear infinite, boatBob 2.5s ease-in-out infinite',
            filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.15))',
          }}
          viewBox="0 0 60 60"
          fill="none"
        >
          {/* Hull */}
          <path d="M8,44 C10,50 20,52 30,52 C40,52 50,50 52,44 L48,44 C46,48 38,50 30,50 C22,50 14,48 12,44 Z" fill={boatFill} />
          {/* Deck */}
          <path d="M12,44 L16,38 L44,38 L48,44 Z" fill={boatFill} opacity="0.7" />
          {/* Mast */}
          <line x1="30" y1="10" x2="30" y2="38" stroke={boatFill} strokeWidth="2" />
          {/* Main sail */}
          <path d="M30,10 L30,36 L48,32 Z" fill={sailMain} />
          {/* Jib sail */}
          <path d="M30,12 L30,32 L14,28 Z" fill={sailJib} />
          {/* Flag */}
          <path d="M30,10 L30,6 L36,8 L30,10Z" fill={sailMain} />
          {/* Window dots */}
          <circle cx="22" cy="42" r="1.5" fill={isLight ? '#ffffff' : 'rgba(0,0,0,0.2)'} />
          <circle cx="30" cy="42" r="1.5" fill={isLight ? '#ffffff' : 'rgba(0,0,0,0.2)'} />
          <circle cx="38" cy="42" r="1.5" fill={isLight ? '#ffffff' : 'rgba(0,0,0,0.2)'} />
        </svg>
      )}
    </div>
  );
}
