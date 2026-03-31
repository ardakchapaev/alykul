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

  return (
    <div
      className="pointer-events-none overflow-hidden"
      style={{
        position: 'absolute',
        left: 0,
        width: '100%',
        height: '70px',
        zIndex: 5,
        ...(flip ? { top: '-1px' } : { bottom: '-1px' }),
        ...(flip ? { transform: 'rotate(180deg)' } : {}),
      }}
    >
      {/* Wave layer 1 — main */}
      <svg
        className="absolute bottom-0 h-full"
        style={{ width: '200%', animation: 'waveSlide 6s linear infinite' }}
        viewBox="0 0 2880 70"
        preserveAspectRatio="none"
      >
        <path d="M0,35 C180,55 360,15 540,35 C720,55 900,15 1080,35 C1260,55 1440,15 1620,35 C1800,55 1980,15 2160,35 C2340,55 2520,15 2700,35 C2790,45 2880,25 2880,35 L2880,70 L0,70Z" fill={fill} />
      </svg>

      {/* Wave layer 2 — offset */}
      <svg
        className="absolute bottom-0 h-full opacity-50"
        style={{ width: '200%', animation: 'waveSlide 9s linear infinite reverse' }}
        viewBox="0 0 2880 70"
        preserveAspectRatio="none"
      >
        <path d="M0,40 C240,20 480,50 720,30 C960,10 1200,50 1440,30 C1680,10 1920,50 2160,30 C2400,10 2640,50 2880,30 L2880,70 L0,70Z" fill={fill} />
      </svg>

      {/* Wave layer 3 — subtle */}
      <svg
        className="absolute bottom-0 h-full opacity-25"
        style={{ width: '200%', animation: 'waveSlide 13s linear infinite' }}
        viewBox="0 0 2880 70"
        preserveAspectRatio="none"
      >
        <path d="M0,45 C300,25 600,55 900,35 C1200,15 1500,50 1800,30 C2100,10 2400,48 2700,28 L2880,38 L2880,70 L0,70Z" fill={fill} />
      </svg>

      {/* Sailboat silhouette floating on waves */}
      {withBoat && (
        <svg
          className="absolute"
          style={{
            bottom: '18px',
            width: '36px',
            height: '36px',
            animation: 'sailboat 18s linear infinite, boatBob 3s ease-in-out infinite',
          }}
          viewBox="0 0 40 40"
          fill="none"
        >
          {/* Hull */}
          <path d="M6,30 Q8,35 20,35 Q32,35 34,30 Z" fill={fill === '#ffffff' || fill === '#F7FBFD' || fill === '#F4F8FB' ? '#0A4373' : 'rgba(255,255,255,0.7)'} />
          {/* Mast */}
          <line x1="20" y1="8" x2="20" y2="30" stroke={fill === '#ffffff' || fill === '#F7FBFD' || fill === '#F4F8FB' ? '#0A4373' : 'rgba(255,255,255,0.7)'} strokeWidth="1.5" />
          {/* Main sail */}
          <path d="M20,8 L20,28 L32,26 Z" fill={fill === '#ffffff' || fill === '#F7FBFD' || fill === '#F4F8FB' ? '#1E88C7' : 'rgba(255,255,255,0.5)'} />
          {/* Jib sail */}
          <path d="M20,10 L20,24 L10,22 Z" fill={fill === '#ffffff' || fill === '#F7FBFD' || fill === '#F4F8FB' ? '#4ABFAD' : 'rgba(255,255,255,0.35)'} />
        </svg>
      )}
    </div>
  );
}
