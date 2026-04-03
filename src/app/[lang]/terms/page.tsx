'use client';

import Link from 'next/link';
import { useParams } from 'next/navigation';
import Breadcrumbs from '@/components/Breadcrumbs';

const t = {
  ru: {
    title: 'Условия использования',
    updated: 'Обновлено: 1 апреля 2026',
    back: '← На главную',
    sections: [
      {
        heading: '1. Общие положения',
        body: 'Настоящие Условия использования (далее — «Условия») регулируют порядок доступа и использования платформы бронирования водных прогулок «Алыкул» (далее — «Платформа»), принадлежащей ООО «Nomad Marine Group», зарегистрированному в Кыргызской Республике. Используя Платформу, вы подтверждаете, что ознакомились с настоящими Условиями и принимаете их в полном объёме. Если вы не согласны с какими-либо положениями, пожалуйста, прекратите использование Платформы.',
      },
      {
        heading: '2. Описание услуг',
        body: 'Платформа предоставляет услуги онлайн-бронирования водного транспорта на озере Иссык-Куль, включая:\n\n• Круизные прогулки (закатные, утренние, тематические)\n• Частные чартеры и аренду яхт\n• Скоростные туры на катерах\n• Детские программы и праздники на борту\n• Корпоративные мероприятия и групповые бронирования\n\nПеречень доступных услуг может изменяться в зависимости от сезона и погодных условий.',
      },
      {
        heading: '3. Регистрация и аккаунт',
        body: 'Для бронирования рейсов необходима регистрация на Платформе. Регистрация осуществляется по номеру телефона с подтверждением через одноразовый код (OTP). Вы обязуетесь:\n\n• Предоставлять достоверные и актуальные данные\n• Не передавать доступ к своему аккаунту третьим лицам\n• Немедленно уведомлять нас о несанкционированном доступе\n• Нести ответственность за все действия, совершённые через ваш аккаунт\n\nМы оставляем за собой право заблокировать аккаунт при нарушении настоящих Условий.',
      },
      {
        heading: '4. Бронирование и оплата',
        body: 'При бронирования рейса вы получаете подтверждение на указанный номер телефона и/или электронную почту. Условия бронирования:\n\n• Бронирование считается подтверждённым после получения подтверждения от системы\n• Холд (предварительное бронирование) действует 24 часа — после истечения срока бронирование автоматически отменяется\n• Оплата принимается через банковские карты (Visa, MasterCard), мобильные платежи (MBank, O!Деньги, Balance.kg) и наличными на причале\n• Цены указаны в киргизских сомах (KGS) и включают все применимые налоги\n• Администрация оставляет за собой право изменять цены без предварительного уведомления; изменения не затрагивают уже подтверждённые бронирования',
      },
      {
        heading: '5. Отмена и возврат',
        body: 'Политика отмены и возврата средств:\n\n• Отмена за 24 часа и более до отправления — полный возврат 100%\n• Отмена за 12–24 часа до отправления — возврат 50%\n• Отмена менее чем за 12 часов до отправления — возврат не предусмотрен\n• Отмена рейса по погодным условиям (штормовое предупреждение) — полный возврат 100% или бесплатный перенос на другую дату\n• Перенос даты возможен бесплатно при уведомлении за 6+ часов до отправления\n\nВозврат средств осуществляется тем же способом, которым была произведена оплата, в течение 5–10 рабочих дней.',
      },
      {
        heading: '6. Ответственность и безопасность',
        body: 'Безопасность пассажиров является нашим приоритетом:\n\n• Все суда оборудованы спасательными жилетами и средствами безопасности\n• Экипаж проходит обязательную сертификацию и обучение\n• Пассажиры обязаны соблюдать правила безопасности на борту и выполнять указания экипажа\n• Запрещено нахождение на борту в состоянии алкогольного или наркотического опьянения\n• Дети до 12 лет допускаются на борт только в сопровождении взрослых\n• Страхование пассажиров включено в стоимость билета\n\nВ случае форс-мажорных обстоятельств (стихийные бедствия, чрезвычайные ситуации) мы не несём ответственности за задержки или отмены рейсов.',
      },
      {
        heading: '7. Интеллектуальная собственность',
        body: 'Весь контент, размещённый на Платформе, включая тексты, изображения, логотипы, дизайн интерфейса, программный код и базы данных, является интеллектуальной собственностью ООО «Nomad Marine Group» или используется на законных основаниях.\n\nЗапрещается:\n\n• Копирование, воспроизведение или распространение материалов Платформы без письменного согласия\n• Использование товарного знака «Алыкул» без разрешения\n• Автоматический сбор данных (scraping) с Платформы',
      },
      {
        heading: '8. Ограничение ответственности',
        body: 'Платформа «Алыкул» не несёт ответственности за:\n\n• Погодные условия и связанные с ними изменения в расписании\n• Задержки рейсов по причинам, не зависящим от нас\n• Потерю или повреждение личных вещей пассажиров на борту\n• Технические неполадки сервиса, вызванные обстоятельствами непреодолимой силы\n• Действия или бездействие третьих лиц, включая платёжных провайдеров\n\nМаксимальная совокупная ответственность Платформы ограничивается суммой, уплаченной пользователем за конкретное бронирование.',
      },
      {
        heading: '9. Разрешение споров',
        body: 'Все споры и разногласия, возникающие в связи с использованием Платформы, разрешаются следующим образом:\n\n• В первую очередь — путём переговоров. Обращайтесь в службу поддержки по email или телефону\n• При невозможности урегулирования — в судебном порядке в соответствии с законодательством Кыргызской Республики\n• Подсудность: суд города Бишкек, Кыргызская Республика\n\nПрименимое право: законодательство Кыргызской Республики.',
      },
      {
        heading: '10. Контактная информация',
        body: 'По всем вопросам, связанным с настоящими Условиями, обращайтесь:\n\n• Email: info@alykul.kg\n• Телефон: +996 555 123 456\n• Адрес: Кыргызская Республика, Иссык-Кульская область, г. Чолпон-Ата\n• Часы работы поддержки: ежедневно с 08:00 до 20:00 (летний сезон), пн–пт 09:00–18:00 (зимний сезон)',
      },
    ],
  },
  en: {
    title: 'Terms of Service',
    updated: 'Updated: April 1, 2026',
    back: '← Home',
    sections: [
      {
        heading: '1. General Provisions',
        body: 'These Terms of Service ("Terms") govern access to and use of the Alykul water tour booking platform ("Platform"), owned by Nomad Marine Group LLC, registered in the Kyrgyz Republic. By using the Platform, you confirm that you have read and accept these Terms in full. If you disagree with any provisions, please stop using the Platform.',
      },
      {
        heading: '2. Description of Services',
        body: 'The Platform provides online booking services for water transport on Lake Issyk-Kul, including:\n\n• Cruise tours (sunset, morning, themed)\n• Private charters and yacht rentals\n• Speed boat tours\n• Kids programs and onboard celebrations\n• Corporate events and group bookings\n\nAvailable services may vary depending on season and weather conditions.',
      },
      {
        heading: '3. Registration and Account',
        body: 'Registration is required to book trips. Registration is done via phone number with OTP verification. You agree to:\n\n• Provide accurate and up-to-date information\n• Not share account access with third parties\n• Immediately report unauthorized access\n• Be responsible for all actions performed through your account\n\nWe reserve the right to block accounts that violate these Terms.',
      },
      {
        heading: '4. Booking and Payment',
        body: 'When booking a trip, you receive confirmation to your phone number and/or email. Booking terms:\n\n• A booking is confirmed upon system confirmation\n• Hold (preliminary booking) is valid for 24 hours — after expiry, it is automatically cancelled\n• Payment is accepted via bank cards (Visa, MasterCard), mobile payments (MBank, O!Money, Balance.kg), and cash at the pier\n• Prices are in Kyrgyz Soms (KGS) and include all applicable taxes\n• We reserve the right to change prices without notice; changes do not affect confirmed bookings',
      },
      {
        heading: '5. Cancellation and Refund',
        body: 'Cancellation and refund policy:\n\n• Cancellation 24+ hours before departure — full 100% refund\n• Cancellation 12–24 hours before departure — 50% refund\n• Cancellation less than 12 hours before departure — no refund\n• Cancellation due to weather (storm warning) — full 100% refund or free reschedule\n• Free date change with 6+ hours notice before departure\n\nRefunds are processed via the original payment method within 5–10 business days.',
      },
      {
        heading: '6. Liability and Safety',
        body: 'Passenger safety is our priority:\n\n• All vessels are equipped with life jackets and safety equipment\n• Crew members hold required certifications\n• Passengers must follow onboard safety rules and crew instructions\n• Boarding under the influence of alcohol or drugs is prohibited\n• Children under 12 must be accompanied by adults\n• Passenger insurance is included in the ticket price\n\nWe are not liable for delays or cancellations due to force majeure (natural disasters, emergencies).',
      },
      {
        heading: '7. Intellectual Property',
        body: 'All content on the Platform, including texts, images, logos, interface design, code, and databases, is the intellectual property of Nomad Marine Group LLC or used under license.\n\nProhibited:\n\n• Copying, reproducing, or distributing Platform materials without written consent\n• Using the "Alykul" trademark without permission\n• Automated data collection (scraping) from the Platform',
      },
      {
        heading: '8. Limitation of Liability',
        body: 'The Alykul Platform is not responsible for:\n\n• Weather conditions and related schedule changes\n• Delays beyond our control\n• Loss or damage to personal belongings onboard\n• Technical issues caused by force majeure\n• Actions or inactions of third parties, including payment providers\n\nMaximum aggregate liability is limited to the amount paid for the specific booking.',
      },
      {
        heading: '9. Dispute Resolution',
        body: 'All disputes arising from use of the Platform shall be resolved as follows:\n\n• First — through negotiation. Contact our support via email or phone\n• If unresolved — through courts in accordance with the laws of the Kyrgyz Republic\n• Jurisdiction: courts of Bishkek, Kyrgyz Republic\n\nGoverning law: legislation of the Kyrgyz Republic.',
      },
      {
        heading: '10. Contact Information',
        body: 'For questions regarding these Terms:\n\n• Email: info@alykul.kg\n• Phone: +996 555 123 456\n• Address: Kyrgyz Republic, Issyk-Kul Region, Cholpon-Ata\n• Support hours: daily 08:00–20:00 (summer), Mon–Fri 09:00–18:00 (winter)',
      },
    ],
  },
  ky: {
    title: 'Колдонуу шарттары',
    updated: 'Жаңыланды: 1 апрель 2026',
    back: '← Башкы бет',
    sections: [
      {
        heading: '1. Жалпы жоболор',
        body: 'Бул Колдонуу шарттары (мындан ары — «Шарттар») «Алыкул» суу сейилдөөлөрүн брондоо платформасына (мындан ары — «Платформа») жетүүнү жана колдонууну жөнгө салат. Платформа Кыргыз Республикасында катталган «Nomad Marine Group» ЖЧКсына таандык. Платформаны колдонуу менен, сиз бул Шарттар менен толук таанышканыңызды жана аларды кабыл алганыңызды ырастайсыз.',
      },
      {
        heading: '2. Кызмат көрсөтүүлөрдүн сүрөттөмөсү',
        body: 'Платформа Ысык-Көлдө суу транспортун онлайн брондоо кызматтарын сунуштайт:\n\n• Круиздик сейилдөөлөр (кечки, эртеңки, тематикалык)\n• Жеке чартерлер жана яхта ижарасы\n• Ылдам катер турлары\n• Балдар программалары\n• Корпоративдик иш-чаралар',
      },
      {
        heading: '3. Каттоо жана аккаунт',
        body: 'Рейстерди брондоо үчүн Платформада каттоо зарыл. Каттоо телефон номери аркылуу OTP ырастоо менен жүргүзүлөт. Сиз:\n\n• Так жана актуалдуу маалымат берүүгө\n• Аккаунтка үчүнчү жактарга кирүү мүмкүнчүлүгүн бербөөгө\n• Уруксатсыз кирүү жөнүндө дароо кабарлоого милдеттенесиз',
      },
      {
        heading: '4. Брондоо жана төлөм',
        body: '• Брондоо системадан ырастоо алгандан кийин ырасталат\n• Холд 24 саат иштейт — мөөнөт аяктагандан кийин автоматтык түрдө жокко чыгарылат\n• Төлөм банк карталары, мобилдик төлөмдөр жана причалда накталай кабыл алынат\n• Баалар кыргыз сомунда (KGS) көрсөтүлгөн',
      },
      {
        heading: '5. Жокко чыгаруу жана кайтаруу',
        body: '• Жөнөөгө чейин 24+ саат мурун жокко чыгаруу — толук 100% кайтаруу\n• 12–24 саат мурун — 50% кайтаруу\n• 12 сааттан аз — кайтаруу каралган эмес\n• Аба ырайы боюнча жокко чыгаруу (бороон) — толук 100% кайтаруу же акысыз которуу\n• 6+ саат мурун билдирүү менен күндү акысыз которуу',
      },
      {
        heading: '6. Жоопкерчилик жана коопсуздук',
        body: '• Бардык кемелер куткаруу жилеттери менен жабдылган\n• Экипаж сертификатталган\n• Жүргүнчүлөр борттогу коопсуздук эрежелерин сактоого милдеттүү\n• 12 жашка чейинки балдар чоңдор менен гана киргизилет\n• Жүргүнчүлөрдү камсыздандыруу билеттин баасына кирет',
      },
      {
        heading: '7. Интеллектуалдык менчик',
        body: 'Платформадагы бардык мазмун «Nomad Marine Group» ЖЧКнын интеллектуалдык менчиги болуп саналат. Жазуу түрүндөгү уруксатсыз көчүрүү, жайылтуу тыюу салынат.',
      },
      {
        heading: '8. Жоопкерчиликти чектөө',
        body: '«Алыкул» Платформасы төмөнкүлөр үчүн жооп бербейт:\n\n• Аба ырайы шарттары\n• Биздин контролдон тышкаркы кечигүүлөр\n• Борттогу жеке буюмдардын жоголушу\n• Форс-мажор шарттары',
      },
      {
        heading: '9. Талаш-тартыштарды чечүү',
        body: '• Биринчиден — сүйлөшүүлөр аркылуу\n• Чечилбесе — Кыргыз Республикасынын мыйзамдарына ылайык сот аркылуу\n• Юрисдикция: Бишкек шаарынын соттору',
      },
      {
        heading: '10. Байланыш маалыматтары',
        body: '• Email: info@alykul.kg\n• Телефон: +996 555 123 456\n• Дарек: Кыргыз Республикасы, Ысык-Көл облусу, Чолпон-Ата\n• Колдоо сааттары: күн сайын 08:00–20:00 (жайкы мезгил), дш–жм 09:00–18:00 (кышкы мезгил)',
      },
    ],
  },
};

export default function TermsPage() {
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

      {/* Breadcrumbs + Content */}
      <div className="max-w-3xl mx-auto px-6 py-12">
        <Breadcrumbs items={[{ label: lang === 'ru' ? 'Условия' : lang === 'ky' ? 'Шарттар' : 'Terms' }]} />

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
