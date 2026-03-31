'use client';

import { useTheme } from '@/lib/theme-context';

export default function WaveDivider({ color = 'white', flip = false }: { color?: string; flip?: boolean }) {
  const { theme } = useTheme();
  if (theme !== 'M2') return null;

  const colorMap: Record<string, string> = {
    white: '#ffffff',
    sand: '#F7FBFD',
    navy: '#0A4373',
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
        height: '100px',
        zIndex: 5,
        ...(flip ? { top: '-2px' } : { bottom: '-2px' }),
        ...(flip ? { transform: 'rotate(180deg)' } : {}),
      }}
    >
      <svg
        className="absolute bottom-0 w-[200%] h-full"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        style={{ animation: 'waveSlide 7s linear infinite' }}
      >
        <path d="M0,60 C360,100 720,30 1080,70 C1440,100 1800,30 2160,60 C2520,90 2880,40 2880,60 L2880,100 L0,100Z" fill={fill} />
      </svg>
      <svg
        className="absolute bottom-0 w-[200%] h-full opacity-60"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        style={{ animation: 'waveSlide 11s linear infinite reverse', bottom: '3px' }}
      >
        <path d="M0,50 C480,85 960,25 1440,55 C1920,80 2400,30 2880,50 L2880,100 L0,100Z" fill={fill} />
      </svg>
      <svg
        className="absolute bottom-0 w-[200%] h-full opacity-30"
        viewBox="0 0 2880 100"
        preserveAspectRatio="none"
        style={{ animation: 'waveSlide 15s linear infinite', bottom: '6px' }}
      >
        <path d="M0,70 C320,40 640,90 960,55 C1280,25 1600,80 1920,50 C2240,20 2560,75 2880,45 L2880,100 L0,100Z" fill={fill} />
      </svg>
    </div>
  );
}
