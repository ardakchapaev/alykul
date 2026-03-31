'use client';

import { useTheme } from '@/lib/theme-context';

/**
 * Top wave — sits at the TOP of a section.
 * Paints the PREVIOUS section's color hanging down into current section.
 * Creates the "incoming wave" effect from above.
 */
export default function WaveTop({ prevColor = 'navy' }: { prevColor?: string }) {
  const { theme } = useTheme();
  if (theme !== 'M2' && theme !== 'M3') return null;

  const cm: Record<string, string> = {
    white: '#ffffff', sand: '#F9FBFD', navy: '#182F48', foam: '#D6EEF5', stone: '#F4F8FB', blue: '#1E88C7',
  };
  const fill = cm[prevColor] || prevColor;

  const coastline = "M0,0 L2880,0 L2880,55 C2800,65 2720,50 2640,60 C2560,70 2480,52 2400,62 C2320,72 2240,50 2160,58 C2080,68 2000,48 1920,60 C1840,70 1760,50 1680,58 C1600,68 1520,48 1440,60 C1360,70 1280,50 1200,58 C1120,68 1040,48 960,60 C880,70 800,50 720,58 C640,68 560,48 480,60 C400,70 320,50 240,58 C160,68 80,48 0,60 Z";

  const coastline2 = "M0,0 L2880,0 L2880,50 C2760,62 2640,45 2520,55 C2400,65 2280,45 2160,55 C2040,65 1920,45 1800,55 C1680,65 1560,45 1440,55 C1320,65 1200,45 1080,55 C960,65 840,45 720,55 C600,65 480,45 360,55 C240,65 120,45 0,55 Z";

  return (
    <div className="absolute top-0 left-0 w-full pointer-events-none" style={{ height: '80px', zIndex: 10 }}>
      <svg className="absolute top-0 w-full h-full" viewBox="0 0 2880 80" preserveAspectRatio="none">
        <path d={coastline} fill={fill} />
      </svg>
      <svg className="absolute top-0 h-full" style={{ width: '200%', animation: 'waveSlide 10s linear infinite' }}
        viewBox="0 0 2880 80" preserveAspectRatio="none">
        <path d={coastline2} fill={fill} opacity="0.5" />
      </svg>
    </div>
  );
}
