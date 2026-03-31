'use client';

import { useTheme } from '@/lib/theme-context';

export default function WaveDivider({ color = 'white', withBoat = false }: { color?: string; withBoat?: boolean }) {
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
  const isLight = ['#ffffff', '#F7FBFD', '#F4F8FB', '#D6EEF5', '#E8F4F8'].includes(fill);
  const boatHull = isLight ? '#0B5FA5' : '#ffffff';
  const sailA = isLight ? '#1E88C7' : 'rgba(255,255,255,0.8)';
  const sailB = isLight ? '#4ABFAD' : 'rgba(255,255,255,0.5)';

  return (
    <div style={{ position: 'relative', width: '100%', height: '150px', marginTop: '-1px', overflow: 'hidden', pointerEvents: 'none' }}>
      {/* Layer 1 — big wave, fast */}
      <svg
        style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveSlide 6s linear infinite' }}
        viewBox="0 0 2880 150" preserveAspectRatio="none"
      >
        <path d={`M0,80 C240,140 480,20 720,80 C960,140 1200,20 1440,80 C1680,140 1920,20 2160,80 C2400,140 2640,20 2880,80 L2880,150 L0,150Z`} fill={fill} />
      </svg>

      {/* Layer 2 — medium wave, reverse */}
      <svg
        style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveSlide 4s linear infinite reverse', opacity: 0.5 }}
        viewBox="0 0 2880 150" preserveAspectRatio="none"
      >
        <path d={`M0,90 C200,30 400,130 600,70 C800,10 1000,120 1200,60 C1400,0 1600,110 1800,50 C2000,0 2200,110 2400,60 C2600,10 2800,100 2880,70 L2880,150 L0,150Z`} fill={fill} />
      </svg>

      {/* Layer 3 — subtle slow wave */}
      <svg
        style={{ position: 'absolute', bottom: 0, width: '200%', height: '100%', animation: 'waveSlide 9s linear infinite', opacity: 0.25 }}
        viewBox="0 0 2880 150" preserveAspectRatio="none"
      >
        <path d={`M0,100 C360,40 720,120 1080,60 C1440,0 1800,130 2160,70 C2520,10 2700,90 2880,60 L2880,150 L0,150Z`} fill={fill} />
      </svg>

      {/* Sailboat — follows a wave path, NOT straight line */}
      {withBoat && (
        <svg
          style={{
            position: 'absolute',
            bottom: '50px',
            width: '56px',
            height: '56px',
            animation: 'sailboatWave 20s ease-in-out infinite',
            filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.2))',
            zIndex: 10,
          }}
          viewBox="0 0 60 60" fill="none"
        >
          <path d="M8,44 C10,50 20,52 30,52 C40,52 50,50 52,44 L48,44 C46,48 38,50 30,50 C22,50 14,48 12,44 Z" fill={boatHull} />
          <path d="M12,44 L16,38 L44,38 L48,44 Z" fill={boatHull} opacity="0.7" />
          <line x1="30" y1="10" x2="30" y2="38" stroke={boatHull} strokeWidth="2" />
          <path d="M30,10 L30,36 L48,32 Z" fill={sailA} />
          <path d="M30,12 L30,32 L14,28 Z" fill={sailB} />
          <path d="M30,10 L30,6 L36,8 L30,10Z" fill={sailA} />
          <circle cx="22" cy="42" r="1.5" fill={isLight ? '#fff' : 'rgba(0,0,0,0.2)'} />
          <circle cx="30" cy="42" r="1.5" fill={isLight ? '#fff' : 'rgba(0,0,0,0.2)'} />
          <circle cx="38" cy="42" r="1.5" fill={isLight ? '#fff' : 'rgba(0,0,0,0.2)'} />
        </svg>
      )}
    </div>
  );
}
