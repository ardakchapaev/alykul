'use client';

import { useEffect, useRef, useState } from 'react';

/* eslint-disable @typescript-eslint/no-explicit-any */
declare global {
  interface Window {
    YT: any;
    onYouTubeIframeAPIReady: () => void;
  }
}

const VIDEO_ID = 'ALq1avfUkmQ';

export default function HeroVideo() {
  const playerRef = useRef<any>(null);
  const [ready, setReady] = useState(false);
  const durationRef = useRef(0);

  useEffect(() => {
    // Load YouTube IFrame API
    if (!document.getElementById('yt-api')) {
      const tag = document.createElement('script');
      tag.id = 'yt-api';
      tag.src = 'https://www.youtube.com/iframe_api';
      document.head.appendChild(tag);
    }

    window.onYouTubeIframeAPIReady = () => {
      playerRef.current = new window.YT.Player('yt-player', {
        videoId: VIDEO_ID,
        playerVars: {
          autoplay: 1, mute: 1, controls: 0, showinfo: 0, rel: 0,
          loop: 1, playlist: VIDEO_ID, modestbranding: 1,
          iv_load_policy: 3, disablekb: 1, fs: 0, playsinline: 1,
        },
        events: {
          onReady: (e: any) => {
            durationRef.current = e.target.getDuration();
            e.target.playVideo();
            setReady(true);
          },
          onStateChange: (e: any) => {
            if (e.data === window.YT.PlayerState.ENDED) {
              e.target.seekTo(0);
              e.target.playVideo();
            }
          },
        },
      });
    };

    // If API already loaded
    if (window.YT?.Player) {
      window.onYouTubeIframeAPIReady();
    }
  }, []);

  // Scroll-linked video scrubbing
  useEffect(() => {
    if (!ready) return;

    let ticking = false;
    const handleScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const player = playerRef.current;
        const duration = durationRef.current;
        if (!player || !duration) { ticking = false; return; }

        const scrollY = window.scrollY;
        const heroH = window.innerHeight;

        // Map scroll to video time
        const progress = Math.min(scrollY / (heroH * 2), 1);
        const targetTime = progress * duration;
        const currentTime = player.getCurrentTime();

        if (Math.abs(currentTime - targetTime) > 0.5) {
          player.seekTo(targetTime, true);
        }

        // Pause when scrolling, play at top
        if (scrollY > 10) {
          player.pauseVideo();
        } else {
          player.playVideo();
        }

        ticking = false;
      });
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [ready]);

  return (
    <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none" style={{ backgroundImage: 'url(/images/hero.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      <div
        id="yt-player"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
        style={{
          width: '100vw',
          height: '56.25vw',
          minHeight: '100vh',
          minWidth: '177.78vh',
        }}
      />
    </div>
  );
}
