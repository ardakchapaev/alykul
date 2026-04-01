'use client';

import { useState, useMemo } from 'react';

interface SeatMapProps {
  vesselType: string; // 'steamship' | 'yacht' | 'speedboat'
  capacity: number;
  availableSeats: number;
  selectedSeats: number[];
  onSelectSeat: (seatId: number) => void;
  maxSelect: number;
}

const COLORS = {
  available: '#E0F7FA',
  availableBorder: '#80DEEA',
  selected: '#00B4D8',
  selectedBorder: '#0096C7',
  occupied: '#E5E7EB',
  occupiedBorder: '#D1D5DB',
  crew: '#FEE2E2',
  crewBorder: '#FECACA',
};

function generateOccupied(capacity: number, availableSeats: number): Set<number> {
  const occupied = new Set<number>();
  const totalOccupied = capacity - availableSeats;
  // Deterministic pseudo-random occupied seats
  const seed = capacity * 7 + availableSeats * 13;
  let idx = seed;
  while (occupied.size < totalOccupied && occupied.size < capacity) {
    idx = (idx * 31 + 17) % capacity;
    occupied.add(idx + 1);
  }
  return occupied;
}

interface SeatProps {
  id: number;
  size: number;
  status: 'available' | 'selected' | 'occupied' | 'crew';
  onClick: () => void;
}

function Seat({ id, size, status, onClick }: SeatProps) {
  const [hovered, setHovered] = useState(false);

  const fill = COLORS[status];
  const stroke = status === 'available' ? COLORS.availableBorder
    : status === 'selected' ? COLORS.selectedBorder
    : status === 'occupied' ? COLORS.occupiedBorder
    : COLORS.crewBorder;

  const isClickable = status === 'available' || status === 'selected';

  return (
    <div
      className="relative inline-flex items-center justify-center"
      style={{ width: size, height: size }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <button
        onClick={isClickable ? onClick : undefined}
        disabled={!isClickable}
        className="w-full h-full rounded-md transition-all duration-200 border-2 flex items-center justify-center text-[10px] font-medium"
        style={{
          backgroundColor: fill,
          borderColor: stroke,
          cursor: isClickable ? 'pointer' : 'not-allowed',
          transform: status === 'selected' ? 'scale(1.05)' : 'scale(1)',
          animation: status === 'selected' ? 'seatPulse 2s ease-in-out infinite' : 'none',
          opacity: status === 'occupied' ? 0.5 : 1,
        }}
        aria-label={`Seat ${id}`}
      >
        <span className={status === 'selected' ? 'text-white font-bold' : 'text-gray-600'}>
          {id}
        </span>
      </button>
      {hovered && (
        <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-[10px] px-2 py-1 rounded whitespace-nowrap z-10 pointer-events-none">
          Место {id}
        </div>
      )}
    </div>
  );
}

function SteamshipLayout({ capacity, occupiedSeats, selectedSeats, onSelectSeat }: {
  capacity: number;
  occupiedSeats: Set<number>;
  selectedSeats: number[];
  onSelectSeat: (id: number) => void;
}) {
  const [activeDeck, setActiveDeck] = useState(0);
  const seatsPerRow = 10;
  const seatsPerDeck = Math.ceil(capacity / 2);
  const rowsPerDeck = Math.ceil(seatsPerDeck / seatsPerRow);

  const decks = [
    { name: 'Палуба 1', startId: 1 },
    { name: 'Палуба 2', startId: seatsPerDeck + 1 },
  ];

  const currentDeck = decks[activeDeck];

  return (
    <div>
      {/* Deck tabs */}
      <div className="flex gap-2 mb-4">
        {decks.map((deck, i) => (
          <button
            key={i}
            onClick={() => setActiveDeck(i)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeDeck === i
                ? 'bg-[#0077B6] text-white'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {deck.name}
          </button>
        ))}
      </div>

      {/* Vessel outline */}
      <div className="relative bg-gradient-to-b from-sky-50 to-blue-50 rounded-2xl p-4 border border-sky-100">
        {/* Bow indicator */}
        <div className="text-center text-xs text-gray-400 mb-3 uppercase tracking-wider">Нос</div>

        {/* Seat grid */}
        <div className="flex flex-col gap-1.5 items-center">
          {Array.from({ length: rowsPerDeck }, (_, rowIdx) => {
            const leftSeats = Array.from({ length: 5 }, (_, colIdx) => {
              const seatId = currentDeck.startId + rowIdx * seatsPerRow + colIdx;
              if (seatId > capacity) return null;
              return seatId;
            }).filter(Boolean) as number[];

            const rightSeats = Array.from({ length: 5 }, (_, colIdx) => {
              const seatId = currentDeck.startId + rowIdx * seatsPerRow + 5 + colIdx;
              if (seatId > capacity) return null;
              return seatId;
            }).filter(Boolean) as number[];

            return (
              <div key={rowIdx} className="flex items-center gap-1">
                {/* Row number */}
                <span className="w-5 text-[10px] text-gray-400 text-right mr-1">{rowIdx + 1}</span>
                {/* Left seats */}
                <div className="flex gap-1">
                  {leftSeats.map(seatId => {
                    const status = occupiedSeats.has(seatId) ? 'occupied'
                      : selectedSeats.includes(seatId) ? 'selected'
                      : 'available';
                    return (
                      <Seat
                        key={seatId}
                        id={seatId}
                        size={28}
                        status={status}
                        onClick={() => onSelectSeat(seatId)}
                      />
                    );
                  })}
                </div>
                {/* Aisle */}
                <div className="w-6" />
                {/* Right seats */}
                <div className="flex gap-1">
                  {rightSeats.map(seatId => {
                    const status = occupiedSeats.has(seatId) ? 'occupied'
                      : selectedSeats.includes(seatId) ? 'selected'
                      : 'available';
                    return (
                      <Seat
                        key={seatId}
                        id={seatId}
                        size={28}
                        status={status}
                        onClick={() => onSelectSeat(seatId)}
                      />
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>

        {/* Stern indicator */}
        <div className="text-center text-xs text-gray-400 mt-3 uppercase tracking-wider">Корма</div>
      </div>
    </div>
  );
}

function YachtLayout({ capacity, occupiedSeats, selectedSeats, onSelectSeat }: {
  capacity: number;
  occupiedSeats: Set<number>;
  selectedSeats: number[];
  onSelectSeat: (id: number) => void;
}) {
  const half = Math.ceil(capacity / 2);

  return (
    <div className="relative bg-gradient-to-b from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">
      <div className="text-center text-xs text-gray-400 mb-4 uppercase tracking-wider">Нос</div>
      <div className="flex justify-center gap-8">
        {/* Left side */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: half }, (_, i) => {
            const seatId = i + 1;
            const status = occupiedSeats.has(seatId) ? 'occupied'
              : selectedSeats.includes(seatId) ? 'selected'
              : 'available';
            return (
              <Seat key={seatId} id={seatId} size={40} status={status} onClick={() => onSelectSeat(seatId)} />
            );
          })}
        </div>
        {/* Aisle */}
        <div className="w-4 bg-sky-100 rounded-full" />
        {/* Right side */}
        <div className="flex flex-col gap-2">
          {Array.from({ length: capacity - half }, (_, i) => {
            const seatId = half + i + 1;
            const status = occupiedSeats.has(seatId) ? 'occupied'
              : selectedSeats.includes(seatId) ? 'selected'
              : 'available';
            return (
              <Seat key={seatId} id={seatId} size={40} status={status} onClick={() => onSelectSeat(seatId)} />
            );
          })}
        </div>
      </div>
      <div className="text-center text-xs text-gray-400 mt-4 uppercase tracking-wider">Корма</div>
    </div>
  );
}

function SpeedboatLayout({ capacity, occupiedSeats, selectedSeats, onSelectSeat }: {
  capacity: number;
  occupiedSeats: Set<number>;
  selectedSeats: number[];
  onSelectSeat: (id: number) => void;
}) {
  const rows = Math.ceil(capacity / 2);

  return (
    <div className="relative bg-gradient-to-b from-sky-50 to-blue-50 rounded-2xl p-6 border border-sky-100">
      <div className="text-center text-xs text-gray-400 mb-4 uppercase tracking-wider">Нос</div>
      <div className="flex flex-col gap-3 items-center">
        {Array.from({ length: rows }, (_, rowIdx) => (
          <div key={rowIdx} className="flex gap-3">
            {Array.from({ length: 2 }, (_, colIdx) => {
              const seatId = rowIdx * 2 + colIdx + 1;
              if (seatId > capacity) return <div key={colIdx} className="w-12 h-12" />;
              const status = occupiedSeats.has(seatId) ? 'occupied'
                : selectedSeats.includes(seatId) ? 'selected'
                : 'available';
              return (
                <Seat key={seatId} id={seatId} size={48} status={status} onClick={() => onSelectSeat(seatId)} />
              );
            })}
          </div>
        ))}
      </div>
      <div className="text-center text-xs text-gray-400 mt-4 uppercase tracking-wider">Корма</div>
    </div>
  );
}

export default function SeatMap({ vesselType, capacity, availableSeats, selectedSeats, onSelectSeat }: Omit<SeatMapProps, 'maxSelect'>) {
  const occupiedSeats = useMemo(() => generateOccupied(capacity, availableSeats), [capacity, availableSeats]);

  return (
    <div>
      <style>{`
        @keyframes seatPulse {
          0%, 100% { box-shadow: 0 0 0 0 rgba(0, 180, 216, 0.4); }
          50% { box-shadow: 0 0 0 4px rgba(0, 180, 216, 0); }
        }
      `}</style>

      {vesselType === 'steamship' && (
        <SteamshipLayout
          capacity={capacity}
          occupiedSeats={occupiedSeats}
          selectedSeats={selectedSeats}
          onSelectSeat={onSelectSeat}
        />
      )}
      {vesselType === 'yacht' && (
        <YachtLayout
          capacity={capacity}
          occupiedSeats={occupiedSeats}
          selectedSeats={selectedSeats}
          onSelectSeat={onSelectSeat}
        />
      )}
      {(vesselType === 'speedboat' || (vesselType !== 'steamship' && vesselType !== 'yacht')) && (
        <SpeedboatLayout
          capacity={capacity}
          occupiedSeats={occupiedSeats}
          selectedSeats={selectedSeats}
          onSelectSeat={onSelectSeat}
        />
      )}

      {/* Legend */}
      <div className="flex flex-wrap gap-4 mt-4 text-xs text-gray-600">
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.available, border: `1px solid ${COLORS.availableBorder}` }} />
          <span>Свободно</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded" style={{ backgroundColor: COLORS.selected, border: `1px solid ${COLORS.selectedBorder}` }} />
          <span>Выбрано</span>
        </div>
        <div className="flex items-center gap-1.5">
          <div className="w-4 h-4 rounded opacity-50" style={{ backgroundColor: COLORS.occupied, border: `1px solid ${COLORS.occupiedBorder}` }} />
          <span>Занято</span>
        </div>
      </div>
    </div>
  );
}
