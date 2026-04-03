'use client';
import Link from 'next/link';
import { useParams } from 'next/navigation';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumbs({ items }: { items: BreadcrumbItem[] }) {
  const params = useParams();
  const lang = (params?.lang as string) || 'ru';
  const home = lang === 'ru' ? 'Главная' : lang === 'ky' ? 'Башкы бет' : 'Home';

  return (
    <nav aria-label="Breadcrumb" className="text-sm text-muted mb-4">
      <ol className="flex items-center gap-1.5 flex-wrap">
        <li>
          <Link href={`/${lang}`} className="hover:text-ocean transition-colors">{home}</Link>
        </li>
        {items.map((item, i) => (
          <li key={i} className="flex items-center gap-1.5">
            <span className="text-gray-300">/</span>
            {item.href ? (
              <Link href={item.href} className="hover:text-ocean transition-colors">{item.label}</Link>
            ) : (
              <span className="text-navy font-medium">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}
