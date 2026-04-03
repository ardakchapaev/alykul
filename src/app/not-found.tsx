import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0F2B46] via-[#1a4a6e] to-[#246DC9] flex items-center justify-center px-4">
      <div className="text-center text-white max-w-md">
        {/* Large 404 with wave decoration */}
        <div className="relative mb-8">
          <h1 className="text-[120px] md:text-[180px] font-bold opacity-10 leading-none select-none">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <div>
              <div className="text-6xl mb-4">🚢</div>
              <h2 className="text-2xl md:text-3xl font-bold">Страница не найдена</h2>
            </div>
          </div>
        </div>
        <p className="text-white/60 mb-8 text-lg">
          Похоже, этот корабль уплыл. Но у нас есть другие маршруты!
        </p>
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/ru" className="px-6 py-3 bg-white text-[#0F2B46] rounded-xl font-semibold hover:bg-white/90 transition-colors">
            На главную
          </Link>
          <Link href="/ru/trips" className="px-6 py-3 border border-white/30 text-white rounded-xl font-semibold hover:bg-white/10 transition-colors">
            Найти рейс
          </Link>
        </div>
        <div className="mt-12 text-white/30 text-sm">
          alykul.baimuras.pro
        </div>
      </div>
    </div>
  );
}
