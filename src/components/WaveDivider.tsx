'use client';

import { useTheme } from '@/lib/theme-context';

/**
 * Wave transition between two sections.
 * - Top of wave = currentColor (background of section above)
 * - Bottom/fill of wave = nextColor (background of section below)
 * - No straight lines: wave fills from top with currentColor, curves reveal nextColor
 */
export default function WaveDivider({ currentColor = 'navy', nextColor = 'white', withYacht = false }: {
  currentColor?: string;
  nextColor?: string;
  withYacht?: boolean;
}) {
  const { theme } = useTheme();
  if (theme !== 'M2') return null;

  const cm: Record<string, string> = {
    white: '#ffffff', sand: '#F9FBFD', navy: '#182F48', foam: '#D6EEF5',
    stone: '#F4F8FB', blue: '#1E88C7', hero: '#182F48',
  };
  const top = cm[currentColor] || currentColor;
  const bot = cm[nextColor] || nextColor;
  const isLight = ['#ffffff', '#F9FBFD', '#F4F8FB', '#D6EEF5'].includes(bot);

  return (
    <div style={{ position: 'relative', width: '100%', height: '120px', overflow: 'hidden', marginTop: '-1px', marginBottom: '-1px' }}>
      {/* Full background = next section color */}
      <div style={{ position: 'absolute', inset: 0, background: bot }} />

      {/* Wave layers painting CURRENT section color on top, revealing NEXT below */}
      <svg
        style={{ position: 'absolute', top: 0, width: '200%', height: '100%', animation: 'waveSlide 6s linear infinite' }}
        viewBox="0 0 2880 120" preserveAspectRatio="none"
      >
        <path d="M0,0 L2880,0 L2880,60 C2640,100 2400,20 2160,60 C1920,100 1680,20 1440,60 C1200,100 960,20 720,60 C480,100 240,20 0,60 Z" fill={top} />
      </svg>
      <svg
        style={{ position: 'absolute', top: 0, width: '200%', height: '100%', animation: 'waveSlide 4s linear infinite reverse', opacity: 0.5 }}
        viewBox="0 0 2880 120" preserveAspectRatio="none"
      >
        <path d="M0,0 L2880,0 L2880,55 C2700,85 2500,15 2300,50 C2100,85 1900,15 1700,50 C1500,85 1300,15 1100,50 C900,85 700,15 500,50 C300,85 100,15 0,55 Z" fill={top} />
      </svg>
      <svg
        style={{ position: 'absolute', top: 0, width: '200%', height: '100%', animation: 'waveSlide 9s linear infinite', opacity: 0.3 }}
        viewBox="0 0 2880 120" preserveAspectRatio="none"
      >
        <path d="M0,0 L2880,0 L2880,50 C2600,80 2300,20 2000,55 C1700,85 1400,15 1100,50 C800,80 500,20 200,55 L0,65 Z" fill={top} />
      </svg>

      {/* Yacht */}
      {withYacht && (
        <svg style={{
          position: 'absolute', top: '35px', width: '80px', height: '40px', zIndex: 11,
          animation: 'sailboatWave 24s ease-in-out infinite',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
        }} viewBox="0 0 200 80" fill="none">
          <path d="M10,55 L25,70 L175,70 L190,55 L185,52 L15,52 Z" fill={isLight ? '#0B5FA5' : '#ffffff'} />
          <path d="M20,60 L30,70 L170,70 L180,60 Z" fill="#ffffff" />
          <path d="M30,52 L35,42 L160,42 L170,52 Z" fill={isLight ? '#E8F4F8' : '#f0f0f0'} />
          <path d="M55,42 L60,28 L130,28 L140,42 Z" fill="#ffffff" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="1" />
          <path d="M70,28 L75,20 L120,20 L125,28 Z" fill="#ffffff" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          <path d="M72,20 L74,16 L122,16 L124,20 Z" fill={isLight ? '#0B5FA5' : '#333'} />
          <rect x="65" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="78" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="91" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="104" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="117" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="80" y="22" width="12" height="4" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.7" />
          <rect x="96" y="22" width="12" height="4" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.7" />
          <circle cx="50" cy="56" r="2.5" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.6" />
          <circle cx="65" cy="56" r="2.5" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.6" />
          <line x1="98" y1="16" x2="98" y2="8" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
        </svg>
      )}
    </div>
  );
}
