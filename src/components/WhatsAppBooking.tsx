'use client';

const WHATSAPP_NUMBER = '996555123456';

export function openWhatsApp(message: string) {
  window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`, '_blank');
}

export function BookButton({
  service,
  price,
  label,
  className = '',
}: {
  service: string;
  price: string;
  label: string;
  className?: string;
}) {
  return (
    <button
      onClick={() => openWhatsApp(`${label}:\n\n🚢 ${service}\n💰 ${price}\n\n${label}!`)}
      className={`w-full py-2.5 bg-ocean text-white rounded-lg font-semibold text-sm hover:bg-ocean-dark transition-colors ${className}`}
    >
      {label}
    </button>
  );
}
