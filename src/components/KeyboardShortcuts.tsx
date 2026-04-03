'use client';

import { useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';

export default function KeyboardShortcuts() {
  const router = useRouter();
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(tag)) return;

      // / -> Focus search (go to trips)
      if (e.key === '/' && !e.ctrlKey && !e.metaKey) {
        e.preventDefault();
        router.push(`/${lang}/trips`);
      }

      // Shift+? -> Show keyboard shortcuts help
      if (e.key === '?' && e.shiftKey) {
        e.preventDefault();
        const existing = document.getElementById('keyboard-shortcuts-help');
        if (existing) {
          existing.remove();
          return;
        }

        const modal = document.createElement('div');
        modal.id = 'keyboard-shortcuts-help';
        modal.className = 'fixed inset-0 z-[10006] bg-black/50 flex items-center justify-center p-4';
        modal.onclick = (ev) => {
          if (ev.target === modal) modal.remove();
        };
        modal.innerHTML = `
          <div class="bg-white rounded-2xl p-6 max-w-md w-full shadow-2xl" onclick="event.stopPropagation()">
            <h3 class="font-bold text-lg mb-4">${lang === 'en' ? 'Keyboard Shortcuts' : lang === 'ky' ? 'Баскычтар' : 'Горячие клавиши'}</h3>
            <div class="space-y-2 text-sm">
              <div class="flex justify-between"><span class="text-gray-600">${lang === 'en' ? 'Search trips' : lang === 'ky' ? 'Каттамдарды издөө' : 'Поиск рейсов'}</span><kbd class="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">/</kbd></div>
              <div class="flex justify-between"><span class="text-gray-600">${lang === 'en' ? 'Home' : lang === 'ky' ? 'Башкы бет' : 'Главная'}</span><kbd class="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">H</kbd></div>
              <div class="flex justify-between"><span class="text-gray-600">${lang === 'en' ? 'My Account' : lang === 'ky' ? 'Менин кабинетим' : 'Мой кабинет'}</span><kbd class="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">A</kbd></div>
              <div class="flex justify-between"><span class="text-gray-600">${lang === 'en' ? 'This help' : lang === 'ky' ? 'Бул жардам' : 'Эта справка'}</span><kbd class="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">Shift + ?</kbd></div>
              <div class="flex justify-between"><span class="text-gray-600">${lang === 'en' ? 'Close modal' : lang === 'ky' ? 'Жабуу' : 'Закрыть модал'}</span><kbd class="px-2 py-0.5 bg-gray-100 rounded text-xs font-mono">Esc</kbd></div>
            </div>
            <button onclick="this.closest('#keyboard-shortcuts-help').remove()" class="mt-4 w-full py-2 bg-gray-100 rounded-lg text-sm hover:bg-gray-200 transition-colors">${lang === 'en' ? 'Close' : lang === 'ky' ? 'Жабуу' : 'Закрыть'}</button>
          </div>
        `;
        document.body.appendChild(modal);
      }

      // H -> Home
      if (e.key === 'h' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        router.push(`/${lang}`);
      }

      // A -> Account
      if (e.key === 'a' && !e.ctrlKey && !e.metaKey && !e.shiftKey) {
        router.push(`/${lang}/account`);
      }

      // Esc -> Close any open modal/overlay
      if (e.key === 'Escape') {
        const helpModal = document.getElementById('keyboard-shortcuts-help');
        if (helpModal) helpModal.remove();
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [router, lang]);

  return null;
}
