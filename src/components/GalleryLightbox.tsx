'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Image from 'next/image';

interface GalleryLightboxProps {
  images: { src: string; alt: string }[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

export default function GalleryLightbox({ images, initialIndex = 0, isOpen, onClose }: GalleryLightboxProps) {
  const [index, setIndex] = useState(initialIndex);
  const [zoomed, setZoomed] = useState(false);
  const [fade, setFade] = useState(true);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Reset index when opened with new initialIndex
  useEffect(() => {
    if (isOpen) {
      setIndex(initialIndex);
      setZoomed(false);
      setFade(true);
    }
  }, [isOpen, initialIndex]);

  const goTo = useCallback((newIndex: number) => {
    setFade(false);
    setTimeout(() => {
      setIndex(newIndex);
      setZoomed(false);
      setFade(true);
    }, 150);
  }, []);

  const goPrev = useCallback(() => {
    if (images.length === 0) return;
    goTo(index === 0 ? images.length - 1 : index - 1);
  }, [index, images.length, goTo]);

  const goNext = useCallback(() => {
    if (images.length === 0) return;
    goTo(index === images.length - 1 ? 0 : index + 1);
  }, [index, images.length, goTo]);

  // Keyboard navigation
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      switch (e.key) {
        case 'Escape': onClose(); break;
        case 'ArrowLeft': goPrev(); break;
        case 'ArrowRight': goNext(); break;
        case 'Home': goTo(0); break;
        case 'End': goTo(images.length - 1); break;
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [isOpen, goPrev, goNext, goTo, images.length, onClose]);

  // Lock body scroll when open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  // Preload adjacent images
  useEffect(() => {
    if (!isOpen || images.length <= 1) return;
    const preload = (i: number) => {
      const img = new window.Image();
      img.src = images[i].src;
    };
    if (index > 0) preload(index - 1);
    if (index < images.length - 1) preload(index + 1);
  }, [isOpen, index, images]);

  // Touch swipe handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    const dx = touchStartX.current - touchEndX.current;
    if (Math.abs(dx) > 50) {
      if (dx > 0) { goNext(); } else { goPrev(); }
    }
  };

  if (!isOpen || images.length === 0) return null;

  const current = images[index];

  return (
    <div
      className="fixed inset-0 z-[10005] bg-black/95 flex flex-col select-none"
      onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
    >
      {/* Top bar */}
      <div className="flex items-center justify-between px-4 py-3 text-white/80 shrink-0">
        <span className="text-sm font-medium tabular-nums">{index + 1} / {images.length}</span>
        <button
          onClick={onClose}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors text-2xl leading-none"
          aria-label="Close"
        >
          &times;
        </button>
      </div>

      {/* Main image area */}
      <div
        className="flex-1 flex items-center justify-center relative overflow-hidden px-12"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        onDoubleClick={() => setZoomed(z => !z)}
      >
        {/* Left arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goPrev(); }}
            className="absolute left-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white text-xl transition-colors"
            aria-label="Previous"
          >
            &#8249;
          </button>
        )}

        {/* Image */}
        <div
          className={`relative w-full h-full transition-opacity duration-150 ${fade ? 'opacity-100' : 'opacity-0'}`}
          style={{ cursor: zoomed ? 'zoom-out' : 'zoom-in' }}
        >
          <Image
            src={current.src}
            alt={current.alt}
            fill
            className={`transition-transform duration-300 ${zoomed ? 'scale-150' : 'scale-100'}`}
            style={{ objectFit: 'contain' }}
            sizes="100vw"
            priority
          />
        </div>

        {/* Right arrow */}
        {images.length > 1 && (
          <button
            onClick={(e) => { e.stopPropagation(); goNext(); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 z-10 w-10 h-10 flex items-center justify-center rounded-full bg-black/40 hover:bg-black/60 text-white text-xl transition-colors"
            aria-label="Next"
          >
            &#8250;
          </button>
        )}
      </div>

      {/* Thumbnail strip */}
      {images.length > 1 && (
        <div className="shrink-0 px-4 py-3 overflow-x-auto">
          <div className="flex gap-2 justify-center">
            {images.map((img, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`relative w-14 h-14 md:w-16 md:h-16 rounded-lg overflow-hidden shrink-0 border-2 transition-all ${
                  i === index ? 'border-white opacity-100 scale-105' : 'border-transparent opacity-50 hover:opacity-80'
                }`}
              >
                <Image src={img.src} alt={img.alt} fill className="object-cover" sizes="64px" />
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
