'use client';

import { useTheme } from '@/lib/theme-context';

export default function WaveDivider({ color = 'white', flip = false }: { color?: string; flip?: boolean }) {
  const { theme } = useTheme();
  if (theme !== 'M2') return null;

  const fill = color === 'white' ? '#ffffff' : color === 'sand' ? '#F0FDFA' : color;

  return (
    <div className={`waves-container ${flip ? 'rotate-180 top-0 bottom-auto' : ''}`}>
      <svg className="wave" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d="M0,80 C360,120 720,40 1080,80 C1440,120 1800,40 2160,80 C2520,120 2880,40 2880,80 L2880,120 L0,120Z" fill={fill} />
      </svg>
      <svg className="wave" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d="M0,60 C480,100 960,20 1440,60 C1920,100 2400,20 2880,60 L2880,120 L0,120Z" fill={fill} />
      </svg>
      <svg className="wave" viewBox="0 0 2880 120" preserveAspectRatio="none">
        <path d="M0,90 C320,50 640,110 960,70 C1280,30 1600,100 1920,60 C2240,20 2560,90 2880,50 L2880,120 L0,120Z" fill={fill} />
      </svg>
    </div>
  );
}
