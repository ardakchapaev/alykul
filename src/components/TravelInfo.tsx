'use client';

export default function TravelInfo({ lang = 'en' }: { lang?: string }) {
  if (lang === 'ru') return null;

  const en = lang === 'en';

  return (
    <div className="bg-sky-50 border border-sky-200 rounded-2xl p-6 my-8">
      <h3 className="font-bold text-lg mb-4 text-sky-900">
        {en ? 'Essential Travel Info' : 'Саякат маалыматы'}
      </h3>
      <div className="grid md:grid-cols-2 gap-4 text-sm text-sky-800">
        <div>
          <h4 className="font-semibold mb-1">{en ? 'Location' : 'Жайгашуу'}</h4>
          <p>
            {en
              ? "Lake Issyk-Kul, Kyrgyzstan \u2014 the world\u2019s 2nd largest alpine lake (1,607m altitude). Crystal-clear water surrounded by the Tian Shan mountains."
              : "\u042B\u0441\u044B\u043A-\u041A\u04E9\u043B, \u041A\u044B\u0440\u0433\u044B\u0437\u0441\u0442\u0430\u043D \u2014 \u0434\u04AF\u0439\u043D\u04E9\u0434\u04E9\u0433\u04AF 2-\u0447\u043E\u04A3 \u0442\u043E\u043E \u043A\u04E9\u043B\u04AF (1607\u043C). \u0422\u0443\u043D\u0443\u043A \u0441\u0443\u0443, \u0422\u044F\u043D\u044C-\u0428\u0430\u043D\u044C \u0442\u043E\u043E\u043B\u043E\u0440\u0443 \u043C\u0435\u043D\u0435\u043D \u043A\u0443\u0440\u0448\u0430\u043B\u0433\u0430\u043D."}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">{en ? 'Getting There' : 'Кантип жет\u04AF\u04AF'}</h4>
          <p>
            {en
              ? 'From Bishkek airport: ~4 hours by car. We can arrange transfers from Bishkek or Almaty.'
              : 'Бишкек аэропортунан: ~4 саат машина менен. Бишкек же Алматыдан трансфер уюштурабыз.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">{en ? 'Best Season' : 'Мыкты мезгил'}</h4>
          <p>
            {en
              ? 'June\u2013September. Water temp: 20\u201323\u00B0C (68\u201373\u00B0F). Air: 25\u201330\u00B0C (77\u201386\u00B0F).'
              : 'Июнь\u2013Сентябрь. Суунун температурасы: 20\u201323\u00B0C. Аба: 25\u201330\u00B0C.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">{en ? 'Visa' : 'Виза'}</h4>
          <p>
            {en
              ? 'Visa-free for 60+ countries (incl. USA, EU, UK, Russia, Kazakhstan, China). Just bring your passport.'
              : '60+ \u04E9\u043B\u043A\u04E9 \u04AF\u0447\u04AF\u043D визасыз (АКШ, ЕБ, Россия, Казакстан, Кытай). Паспорт жетиштүү.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">{en ? 'Currency' : 'Валюта'}</h4>
          <p>
            {en
              ? 'Kyrgyz Som (KGS). 1 USD \u2248 87 KGS. Cards accepted at most places, ATMs available.'
              : 'Кыргыз сому (KGS). 1 USD \u2248 87 KGS. Карталар кабыл алынат, банкоматтар бар.'}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-1">{en ? 'Safety' : 'Коопсуздук'}</h4>
          <p>
            {en
              ? 'All vessels are certified. Life vests, insurance, and trained captains on every trip.'
              : 'Бардык кемелер сертификатталган. Куткаруу жилеттери, камсыздандыруу жана тажрыйбалуу капитандар.'}
          </p>
        </div>
      </div>
    </div>
  );
}
