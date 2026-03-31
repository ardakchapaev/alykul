'use client';

import { useTheme } from '@/lib/theme-context';

/**
 * Animated wave overlay at the BOTTOM of a section.
 * Paints the color of the NEXT section, creating seamless flow.
 * Place inside each section with position:relative.
 */
export default function WaveDivider({ nextColor = 'white', withYacht = false }: { nextColor?: string; withYacht?: boolean }) {
  const { theme } = useTheme();
  if (theme !== 'M2') return null;

  const cm: Record<string, string> = {
    white: '#ffffff', sand: '#F9FBFD', navy: '#182F48', foam: '#D6EEF5', stone: '#F4F8FB', blue: '#1E88C7',
  };
  const fill = cm[nextColor] || nextColor;
  const isLight = ['#ffffff', '#F9FBFD', '#F4F8FB', '#D6EEF5'].includes(fill);

  return (
    <div className="absolute bottom-0 left-0 w-full pointer-events-none" style={{ height: '100px', zIndex: 10, overflow: 'hidden' }}>
      {/* Wave layer 1 */}
      <svg className="absolute bottom-0 h-full" style={{ width: '200%', animation: 'waveSlide 6s linear infinite' }}
        viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path d="M0,50 C240,90 480,10 720,50 C960,90 1200,10 1440,50 C1680,90 1920,10 2160,50 C2400,90 2640,10 2880,50 L2880,100 L0,100Z" fill={fill} />
      </svg>
      {/* Wave layer 2 */}
      <svg className="absolute bottom-0 h-full opacity-50" style={{ width: '200%', animation: 'waveSlide 4s linear infinite reverse' }}
        viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path d="M0,60 C200,25 400,80 600,40 C800,5 1000,75 1200,35 C1400,0 1600,70 1800,35 C2000,0 2200,65 2400,35 C2600,5 2800,60 2880,40 L2880,100 L0,100Z" fill={fill} />
      </svg>
      {/* Wave layer 3 */}
      <svg className="absolute bottom-0 h-full opacity-20" style={{ width: '200%', animation: 'waveSlide 9s linear infinite' }}
        viewBox="0 0 2880 100" preserveAspectRatio="none">
        <path d="M0,65 C360,30 720,80 1080,45 C1440,10 1800,75 2160,40 C2520,5 2700,55 2880,35 L2880,100 L0,100Z" fill={fill} />
      </svg>

      {/* Luxury Yacht */}
      {withYacht && (
        <svg className="absolute" style={{
          bottom: '28px', width: '80px', height: '40px', zIndex: 11,
          animation: 'sailboatWave 24s ease-in-out infinite',
          filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.2))',
        }} viewBox="0 0 200 80" fill="none">
          {/* Hull */}
          <path d="M10,55 L25,70 L175,70 L190,55 L185,52 L15,52 Z" fill={isLight ? '#0B5FA5' : '#ffffff'} />
          {/* Hull bottom white stripe */}
          <path d="M20,60 L30,70 L170,70 L180,60 Z" fill="#ffffff" />
          {/* Deck */}
          <path d="M30,52 L35,42 L160,42 L170,52 Z" fill={isLight ? '#E8F4F8' : '#f0f0f0'} />
          {/* Cabin */}
          <path d="M55,42 L60,28 L130,28 L140,42 Z" fill="#ffffff" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="1" />
          {/* Upper deck / bridge */}
          <path d="M70,28 L75,20 L120,20 L125,28 Z" fill="#ffffff" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          {/* Flybridge roof */}
          <path d="M72,20 L74,16 L122,16 L124,20 Z" fill={isLight ? '#0B5FA5' : '#333'} />
          {/* Windows — main cabin */}
          <rect x="65" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="78" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="91" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="104" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          <rect x="117" y="32" width="8" height="6" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.8" />
          {/* Windows — bridge */}
          <rect x="80" y="22" width="12" height="4" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.7" />
          <rect x="96" y="22" width="12" height="4" rx="1" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.7" />
          {/* Portholes on hull */}
          <circle cx="50" cy="56" r="2.5" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.6" />
          <circle cx="65" cy="56" r="2.5" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.6" />
          <circle cx="80" cy="56" r="2.5" fill={isLight ? '#1E88C7' : '#4a90d9'} opacity="0.6" />
          {/* Bow railing */}
          <line x1="30" y1="42" x2="15" y2="52" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          <line x1="35" y1="42" x2="22" y2="48" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.5" />
          {/* Stern details */}
          <line x1="160" y1="42" x2="170" y2="52" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          {/* Antenna */}
          <line x1="98" y1="16" x2="98" y2="8" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.8" />
          <line x1="95" y1="10" x2="101" y2="10" stroke={isLight ? '#0B5FA5' : '#333'} strokeWidth="0.5" />
          {/* Waterline spray */}
          <path d="M5,58 Q8,54 12,56" stroke="rgba(255,255,255,0.6)" strokeWidth="1" fill="none" />
          <path d="M3,62 Q7,57 11,60" stroke="rgba(255,255,255,0.4)" strokeWidth="0.8" fill="none" />
        </svg>
      )}
    </div>
  );
}
