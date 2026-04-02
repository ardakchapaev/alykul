'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';

const t = {
  ru: {
    title: 'Политика конфиденциальности',
    updated: 'Обновлено: 1 апреля 2026',
    back: '← На главную',
    sections: [
      {
        heading: '1. Общие положения',
        body: 'ООО «Nomad Marine Group» (далее — «Алыкул», «мы», «наш сервис»), зарегистрированное в Кыргызской Республике, осуществляет сбор и обработку персональных данных пользователей в соответствии с Законом КР «О персональных данных». Настоящая Политика конфиденциальности описывает, какие данные мы собираем, как их используем и защищаем. Используя наш сайт и сервисы бронирования, вы соглашаетесь с условиями настоящей Политики.',
      },
      {
        heading: '2. Какие данные мы собираем',
        body: 'Мы собираем следующие категории данных:\n\n• Контактные данные: имя, номер телефона, адрес электронной почты\n• Данные бронирования: выбранные рейсы, даты, количество гостей, история поездок\n• Платёжные данные: информация о транзакциях (номер карты не хранится на наших серверах)\n• Технические данные: IP-адрес, тип устройства и браузера, операционная система, данные cookies\n• Данные обратной связи: отзывы, оценки, загруженные фотографии',
      },
      {
        heading: '3. Цели обработки данных',
        body: '• Обработка и подтверждение бронирований водных прогулок\n• Отправка уведомлений о статусе бронирования, изменениях в расписании и погодных условиях\n• Улучшение качества сервиса и пользовательского опыта\n• Аналитика посещаемости и популярности маршрутов\n• Выполнение требований законодательства Кыргызской Республики\n• Предотвращение мошенничества и обеспечение безопасности',
      },
      {
        heading: '4. Хранение и защита данных',
        body: 'Персональные данные хранятся на защищённых серверах, расположенных в Кыргызской Республике. Мы применяем SSL-шифрование для передачи данных, а также современные методы защиты от несанкционированного доступа. Срок хранения персональных данных составляет 3 (три) года с момента последнего взаимодействия с сервисом, после чего данные автоматически удаляются или обезличиваются.',
      },
      {
        heading: '5. Передача данных третьим лицам',
        body: 'Мы не продаём и не передаём ваши персональные данные третьим лицам, за исключением случаев, необходимых для оказания услуг:\n\n• Платёжные системы — для обработки оплаты бронирований\n• SMS и email-провайдеры — для отправки уведомлений и подтверждений\n• Государственные органы — по запросу в соответствии с законодательством КР\n\nВсе партнёры обязаны соблюдать конфиденциальность переданных данных.',
      },
      {
        heading: '6. Файлы cookie',
        body: 'Наш сайт использует файлы cookie для обеспечения корректной работы, сохранения языковых предпочтений и сбора аналитических данных. Вы можете отключить cookies в настройках браузера, однако это может ограничить функциональность сайта. Мы используем:\n\n• Необходимые cookies — для работы бронирования и авторизации\n• Аналитические cookies — для понимания посещаемости и улучшения сервиса\n• Функциональные cookies — для запоминания ваших предпочтений (язык, валюта)',
      },
      {
        heading: '7. Права пользователя',
        body: 'Вы имеете право:\n\n• Запросить доступ к своим персональным данным\n• Потребовать исправления неточных данных\n• Запросить удаление своих данных из нашей системы\n• Отказаться от получения маркетинговых рассылок\n• Отозвать согласие на обработку персональных данных\n\nДля реализации своих прав свяжитесь с нами по контактам, указанным ниже.',
      },
      {
        heading: '8. Контактная информация',
        body: 'По всем вопросам, связанным с обработкой персональных данных, обращайтесь:\n\n• Email: info@alykul.kg\n• Телефон: +996 555 123 456\n• Адрес: Кыргызская Республика, Иссык-Кульская область, г. Чолпон-Ата',
      },
      {
        heading: '9. Изменения в Политике',
        body: 'Мы оставляем за собой право вносить изменения в настоящую Политику конфиденциальности. Актуальная версия всегда доступна на данной странице. При существенных изменениях мы уведомим вас через email или уведомление на сайте. Рекомендуем периодически проверять эту страницу.',
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    updated: 'Updated: April 1, 2026',
    back: '← Home',
    sections: [
      {
        heading: '1. General Provisions',
        body: 'Nomad Marine Group LLC ("Alykul", "we", "our service"), registered in the Kyrgyz Republic, collects and processes personal data of users in accordance with the KR Law "On Personal Data". This Privacy Policy describes what data we collect, how we use and protect it. By using our website and booking services, you agree to the terms of this Policy.',
      },
      {
        heading: '2. Data We Collect',
        body: 'We collect the following categories of data:\n\n• Contact information: name, phone number, email address\n• Booking data: selected trips, dates, number of guests, trip history\n• Payment data: transaction information (card numbers are not stored on our servers)\n• Technical data: IP address, device type and browser, operating system, cookie data\n• Feedback data: reviews, ratings, uploaded photos',
      },
      {
        heading: '3. Purpose of Data Processing',
        body: '• Processing and confirming water tour bookings\n• Sending notifications about booking status, schedule changes, and weather conditions\n• Improving service quality and user experience\n• Analyzing traffic and route popularity\n• Complying with the legislation of the Kyrgyz Republic\n• Fraud prevention and security',
      },
      {
        heading: '4. Data Storage and Protection',
        body: 'Personal data is stored on secure servers located in the Kyrgyz Republic. We use SSL encryption for data transmission and modern methods to prevent unauthorized access. Personal data is retained for 3 (three) years from the last interaction with the service, after which it is automatically deleted or anonymized.',
      },
      {
        heading: '5. Data Sharing with Third Parties',
        body: 'We do not sell or share your personal data with third parties, except when necessary to provide services:\n\n• Payment systems — for processing booking payments\n• SMS and email providers — for sending notifications and confirmations\n• Government authorities — upon request in accordance with KR legislation\n\nAll partners are required to maintain confidentiality of shared data.',
      },
      {
        heading: '6. Cookies',
        body: 'Our website uses cookies to ensure proper operation, save language preferences, and collect analytics. You can disable cookies in your browser settings, but this may limit site functionality. We use:\n\n• Essential cookies — for booking and authorization\n• Analytics cookies — for understanding traffic and improving the service\n• Functional cookies — for remembering your preferences (language, currency)',
      },
      {
        heading: '7. User Rights',
        body: 'You have the right to:\n\n• Request access to your personal data\n• Demand correction of inaccurate data\n• Request deletion of your data from our system\n• Opt out of marketing communications\n• Withdraw consent for data processing\n\nTo exercise your rights, contact us using the information below.',
      },
      {
        heading: '8. Contact Information',
        body: 'For questions regarding personal data processing:\n\n• Email: info@alykul.kg\n• Phone: +996 555 123 456\n• Address: Kyrgyz Republic, Issyk-Kul Region, Cholpon-Ata',
      },
      {
        heading: '9. Policy Changes',
        body: 'We reserve the right to modify this Privacy Policy. The current version is always available on this page. For significant changes, we will notify you via email or a site notification. We recommend checking this page periodically.',
      },
    ],
  },
  ky: {
    title: 'Купуялуулук саясаты',
    updated: 'Жаңыланды: 1 апрель 2026',
    back: '← Башкы бет',
    sections: [
      {
        heading: '1. Жалпы жоболор',
        body: '«Nomad Marine Group» ЖЧК (мындан ары — «Алыкул», «биз», «биздин сервис»), Кыргыз Республикасында катталган, колдонуучулардын жеке маалыматтарын КР «Жеке маалыматтар жөнүндө» Мыйзамына ылайык чогултат жана иштетет. Бул Купуялуулук саясаты биз кандай маалыматтарды чогултарыбызды, аларды кантип колдонорубузду жана коргоорубузду сүрөттөйт.',
      },
      {
        heading: '2. Кандай маалыматтарды чогултабыз',
        body: '• Байланыш маалыматтары: аты-жөнү, телефон номери, электрондук почта\n• Брондоо маалыматтары: тандалган рейстер, күндөр, конокторуң саны, саякат тарыхы\n• Төлөм маалыматтары: транзакция маалыматы\n• Техникалык маалыматтар: IP-дарек, түзмөк түрү, браузер, cookie маалыматтары\n• Пикирлер: бааалоолор, сүрөттөр, комментарийлер',
      },
      {
        heading: '3. Маалыматтарды иштетүү максаттары',
        body: '• Суу сейилдөөлөрүн брондоону иштетүү жана ырастоо\n• Брондоо статусу, расписание өзгөрүүлөрү жөнүндө билдирүүлөрдү жөнөтүү\n• Сервис сапатын жана колдонуучу тажрыйбасын жакшыртуу\n• Аналитика жана маршруттардын популярдуулугу\n• Кыргыз Республикасынын мыйзамдарын аткаруу',
      },
      {
        heading: '4. Маалыматтарды сактоо жана коргоо',
        body: 'Жеке маалыматтар Кыргыз Республикасында жайгашкан корголгон серверлерде сакталат. Биз SSL-шифрлөөнү колдонобуз. Маалыматтарды сактоо мөөнөтү — сервис менен акыркы байланыштан 3 (үч) жыл.',
      },
      {
        heading: '5. Үчүнчү тарапка маалымат берүү',
        body: '• Төлөм системалары — брондоо төлөмдөрүн иштетүү үчүн\n• SMS жана email-провайдерлер — билдирүүлөрдү жөнөтүү үчүн\n• Мамлекеттик органдар — КР мыйзамдарына ылайык суроо-талап боюнча',
      },
      {
        heading: '6. Cookie файлдары',
        body: 'Биздин сайт cookie файлдарын туура иштөө, тил тандоолорун сактоо жана аналитика чогултуу үчүн колдонот.',
      },
      {
        heading: '7. Колдонуучунун укуктары',
        body: '• Жеке маалыматтарыңызга жетки суроо\n• Так эмес маалыматтарды оңдоону талап кылуу\n• Маалыматтарыңызды жок кылууну суроо\n• Маркетинг жөнөтүүлөрдөн баш тартуу',
      },
      {
        heading: '8. Байланыш маалыматтары',
        body: '• Email: info@alykul.kg\n• Телефон: +996 555 123 456\n• Дарек: Кыргыз Республикасы, Ысык-Көл облусу, Чолпон-Ата шаары',
      },
      {
        heading: '9. Саясаттагы өзгөрүүлөр',
        body: 'Биз бул Купуялуулук саясатына өзгөртүүлөрдү киргизүү укугубузду сактайбыз. Актуалдуу версия дайыма бул бетте жеткиликтүү.',
      },
    ],
  },
};

export default function PrivacyPage() {
  const params = useParams();
  const lang = (params.lang as string) || 'ru';
  const labels = t[lang as keyof typeof t] || t.ru;

  return (
    <main className="min-h-screen bg-sand">
      {/* Header */}
      <div className="bg-navy text-white py-16 px-6">
        <div className="max-w-3xl mx-auto">
          <Link
            href={`/${lang}`}
            className="inline-block text-foam/70 hover:text-white text-sm mb-6 transition-colors"
          >
            {labels.back}
          </Link>
          <h1 className="font-heading font-bold text-3xl md:text-5xl italic">
            {labels.title}
          </h1>
          <p className="text-foam/60 text-sm mt-4">{labels.updated}</p>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <div className="space-y-10">
          {labels.sections.map((section, i) => (
            <section key={i}>
              <h2 className="font-heading font-bold text-xl md:text-2xl text-navy mb-4">
                {section.heading}
              </h2>
              <div className="text-navy/80 leading-relaxed whitespace-pre-line text-[15px]">
                {section.body}
              </div>
            </section>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-navy/10 flex items-center justify-between">
          <Link
            href={`/${lang}`}
            className="text-ocean hover:text-ocean-dark font-medium transition-colors"
          >
            {labels.back}
          </Link>
          <span className="text-muted text-sm">{labels.updated}</span>
        </div>
      </div>
    </main>
  );
}
