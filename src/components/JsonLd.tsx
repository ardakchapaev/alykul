export function OrganizationJsonLd() {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TravelAgency',
    name: 'Алыкул',
    alternateName: 'Alykul',
    url: 'https://alykul.baimuras.pro',
    logo: 'https://alykul.baimuras.pro/images/icon-512.png',
    description: 'Первая платформа онлайн-бронирования водного транспорта на озере Иссык-Куль',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Чолпон-Ата',
      addressRegion: 'Иссык-Кульская область',
      addressCountry: 'KG',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.65,
      longitude: 77.06,
    },
    telephone: '+996555123456',
    email: 'info@alykul.kg',
    sameAs: [
      'https://instagram.com/alykul.kg',
      'https://t.me/alykul',
    ],
    priceRange: '$$',
    openingHours: 'Mo-Su 09:00-21:00',
    areaServed: {
      '@type': 'Lake',
      name: 'Озеро Иссык-Куль',
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function TripJsonLd({ name, price, currency, description, image, date }: {
  name: string; price: number; currency: string; description: string; image: string; date: string;
}) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'TouristTrip',
    name,
    description,
    image: `https://alykul.baimuras.pro${image}`,
    touristType: 'Water tourism',
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
      validFrom: date,
    },
    provider: {
      '@type': 'TravelAgency',
      name: 'Алыкул',
    },
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}

export function FaqJsonLd({ items }: { items: { question: string; answer: string }[] }) {
  const data = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(item => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };

  return (
    <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }} />
  );
}
